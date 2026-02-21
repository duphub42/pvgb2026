/**
 * Invalidiert Next.js Cache-Tags (z. B. nach Import).
 * Aufruf: GET /api/revalidate?tag=global_header&tag=global_footer
 * Optional: ?secret=REVALIDATE_SECRET (erforderlich, wenn REVALIDATE_SECRET gesetzt ist)
 */
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET?.trim()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const tags = searchParams.getAll('tag').filter(Boolean)

  if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
