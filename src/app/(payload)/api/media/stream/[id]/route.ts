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

    // Schutz gegen Endlosschleife: Manche Datensaetze speichern bereits /api/media/stream/:id als URL.
    // Dann wuerde dieser Endpoint sich selbst erneut fetchen. Fallback auf lokale Datei-URL.
    if (url.includes('/api/media/stream/')) {
      const fallbackFilename =
        size && doc?.sizes && typeof doc.sizes === 'object' && size in doc.sizes
          ? ((doc.sizes as Record<string, { filename?: string }>)[size]?.filename ?? doc?.filename)
          : doc?.filename

      if (fallbackFilename && typeof fallbackFilename === 'string') {
        url = `/media/${encodeURIComponent(fallbackFilename)}`
      }
    }

    // Relative URLs (z.B. Payload-Pass-through) → absolute machen
    if (url.startsWith('/')) {
      const origin = request.nextUrl.origin || getServerSideURL()
      url = origin ? `${origin.replace(/\/$/, '')}${url}` : undefined
    }

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Check if this is a local file (contains /api/media/file/)
    const isLocalFile = url.includes('/api/media/file/')

    if (isLocalFile) {
      // Delegate local/cloud delivery to /api/media/file/:filename.
      // That endpoint now supports both local files and R2 fallback.
      const fileRes = await fetch(url, {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })

      if (!fileRes.ok || !fileRes.body) {
        return NextResponse.json(
          { error: fileRes.status === 404 ? 'File not found' : 'Upstream error' },
          { status: fileRes.status === 404 ? 404 : 502 },
        )
      }

      const contentType = fileRes.headers.get('content-type') || 'application/octet-stream'
      const contentDisposition = fileRes.headers.get('content-disposition')

      const headers = new Headers()
      headers.set('Content-Type', contentType)
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      if (contentDisposition) headers.set('Content-Disposition', contentDisposition)
      if (contentType === 'image/svg+xml') {
        headers.set('Content-Security-Policy', "script-src 'none'")
      }

      return new Response(fileRes.body, { headers, status: fileRes.status })
    }

    // For external URLs, fetch and proxy
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
    const errorMsg = e instanceof Error ? `${e.name}: ${e.message}` : String(e)
    const isNotFound = errorMsg.includes('NotFound') || errorMsg.includes('not found')

    if (isNotFound) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    console.error('[media/stream] Error for id:', id, '-', errorMsg)
    return NextResponse.json({ error: 'Internal error', details: errorMsg }, { status: 500 })
  }
}
