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
import * as fs from 'fs'
import * as path from 'path'

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

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Check if this is a local file (contains /api/media/file/)
    const isLocalFile = url.includes('/api/media/file/')

    if (isLocalFile) {
      // Extract filename from URL and serve directly from filesystem
      const filenameMatch = url.match(/\/api\/media\/file\/(.+)$/)
      if (filenameMatch) {
        const filename = decodeURIComponent(filenameMatch[1])
        const mediaDir = path.join(process.cwd(), 'public/media')
        const filePath = path.join(mediaDir, filename)

        // Security check: ensure file is within media directory
        const resolvedPath = path.resolve(filePath)
        const resolvedMediaDir = path.resolve(mediaDir)
        if (!resolvedPath.startsWith(resolvedMediaDir)) {
          return NextResponse.json({ error: 'Access denied' }, { status: 403 })
        }

        if (!fs.existsSync(filePath)) {
          return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }

        const ext = path.extname(filename).toLowerCase()
        const mimeTypes: Record<string, string> = {
          '.svg': 'image/svg+xml',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
          '.avif': 'image/avif',
          '.ico': 'image/x-icon',
          '.pdf': 'application/pdf',
        }
        const contentType = mimeTypes[ext] || 'application/octet-stream'

        const fileBuffer = fs.readFileSync(filePath)
        const headers = new Headers()
        headers.set('Content-Type', contentType)
        headers.set('Cache-Control', 'public, max-age=31536000, immutable')
        if (ext === '.svg') {
          headers.set('Content-Security-Policy', "script-src 'none'")
        }
        return new Response(fileBuffer, { headers, status: 200 })
      }
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
    console.error('[media/stream]', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
