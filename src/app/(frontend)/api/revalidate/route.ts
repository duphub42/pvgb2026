/**
 * Invalidiert Next.js Cache-Tags (z. B. nach Import oder Webhook).
 * Aufruf: GET /api/revalidate?tag=global_header&tag=global_footer&secret=DEIN_SECRET
 * In Production: CRON_SECRET oder REVALIDATE_SECRET in .env setzen, Secret im Request mitschicken.
 */
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET?.trim() || process.env.CRON_SECRET?.trim()
const REQUIRE_SECRET_IN_PROD = process.env.NODE_ENV === 'production'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const tags = searchParams.getAll('tag').filter(Boolean)

  const secretValid = !REQUIRE_SECRET_IN_PROD || (REVALIDATE_SECRET && secret === REVALIDATE_SECRET)
  if (!secretValid) {
    return NextResponse.json(
      { error: 'Unauthorized. Set REVALIDATE_SECRET or CRON_SECRET and pass ?secret=... in production.' },
      { status: 401 },
    )
  }

  if (tags.length === 0) {
    return NextResponse.json(
      { error: 'Missing tag(s). Example: ?tag=global_header&tag=global_footer' },
      { status: 400 },
    )
  }

  for (const tag of tags) {
    revalidateTag(tag)
  }

  return NextResponse.json({ revalidated: true, tags })
}
