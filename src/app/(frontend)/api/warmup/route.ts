import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const WARMUP_PATHS = ['/', '/leistungen'] as const

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

      return {
        path,
        status: response.status,
        ok: response.ok,
      }
    }),
  )

  const ok = results.every((result) => result.ok)

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
