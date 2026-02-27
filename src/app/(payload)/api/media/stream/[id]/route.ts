/**
 * Proxy für Media-Dateien: Holt von externem Storage (R2, S3, Blob) und streamt über unsere Origin.
 * Ermöglicht EWWW Easy IO (ExactDN), da das CDN von unserer Origin ziehen muss.
 *
 * Aufruf: GET /api/media/stream/[id] oder GET /api/media/stream/[id]?size=thumbnail
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const size = request.nextUrl.searchParams.get('size')

  try {
    const payload = await getPayload({ config })
    const doc = await payload.findByID({
      collection: 'media',
      id,
      depth: 0,
      overrideAccess: true,
      context: { skipUrlRewrite: true },
    })

    let url: string | undefined
    if (size && doc?.sizes && typeof doc.sizes === 'object' && size in doc.sizes) {
      const sizeData = (doc.sizes as Record<string, { url?: string }>)[size]
      url = sizeData?.url
    }
    if (!url) url = doc?.url as string | undefined

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Relative URLs (z.B. Payload-Pass-through) → absolute machen
    if (url.startsWith('/')) {
      const origin = getServerSideURL()
      url = origin ? `${origin.replace(/\/$/, '')}${url}` : undefined
    }

    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    const res = await fetch(url, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })

    if (!res.ok || !res.body) {
      return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream'
    const contentDisposition = res.headers.get('content-disposition')

    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    if (contentDisposition) headers.set('Content-Disposition', contentDisposition)
    if (contentType === 'image/svg+xml') {
      headers.set('Content-Security-Policy', "script-src 'none'")
    }

    return new Response(res.body, { headers, status: 200 })
  } catch (e) {
    console.error('[media/stream]', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
