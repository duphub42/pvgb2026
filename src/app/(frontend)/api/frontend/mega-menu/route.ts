import { NextResponse } from 'next/server'

import { getMegaMenuItems } from '@/utilities/getMegaMenu'

export const dynamic = 'force-static'
export const revalidate = 300

export async function GET() {
  const items = await getMegaMenuItems()

  return NextResponse.json(
    { docs: items },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  )
}
