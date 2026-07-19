import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const WARMUP_PATHS = ['/', '/leistungen'] as const
const MAX_IMAGE_WARMUPS_PER_PATH = 16

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) return true

  return request.headers.get('authorization') === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest): Promise<Response> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const origin = request.nextUrl.origin
  const startedAt = Date.now()

  const results = await Promise.all(
    WARMUP_PATHS.map(async (path) => {
      const response = await fetch(new URL(path, origin), {
        cache: 'no-store',
        headers: {
          'x-warmup': '1',
        },
      })
      const html = await response.text()
      const imageUrls = collectNextImageUrls(html, origin).slice(0, MAX_IMAGE_WARMUPS_PER_PATH)
      const imageResults = await Promise.all(
        imageUrls.map(async (url) => {
          try {
            const imageResponse = await fetch(url, {
              cache: 'no-store',
              headers: {
                'x-warmup': '1',
              },
            })

            return {
              url: url.pathname + url.search,
              status: imageResponse.status,
              ok: imageResponse.ok,
            }
          } catch {
            return {
              url: url.pathname + url.search,
              status: 0,
              ok: false,
            }
          }
        }),
      )

      return {
        path,
        status: response.status,
        ok: response.ok,
        images: imageResults,
      }
    }),
  )

  const ok = results.every(
    (result) => result.ok && result.images.every((imageResult) => imageResult.ok),
  )

  return NextResponse.json(
    {
      ok,
      warmed: results,
      durationMs: Date.now() - startedAt,
    },
    {
      status: ok ? 200 : 207,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}

function collectNextImageUrls(html: string, origin: string): URL[] {
  const decodedHtml = html.replace(/&amp;/g, '&')
  const urls = new Map<string, URL>()
  const addUrl = (rawUrl: string) => {
    try {
      const url = new URL(rawUrl, origin)
      if (url.pathname !== '/_next/image') return
      const sourceUrl = url.searchParams.get('url')
      if (!sourceUrl?.startsWith('/api/media/')) return
      urls.set(url.toString(), url)
    } catch {
      // Ignore malformed warmup candidates.
    }
  }

  for (const match of decodedHtml.matchAll(/(?:imageSrcSet|srcSet)="([^"]+)"/g)) {
    const srcSet = match[1] ?? ''
    for (const candidate of srcSet.split(',')) {
      const [url] = candidate.trim().split(/\s+/)
      addUrl(url ?? '')
    }
  }

  for (const match of decodedHtml.matchAll(/(?:href|src)="([^"]*\/_next\/image\?[^"]+)"/g)) {
    addUrl(match[1] ?? '')
  }

  return Array.from(urls.values())
}
