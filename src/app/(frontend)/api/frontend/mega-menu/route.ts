import { NextResponse } from 'next/server'

import { translateValueForLocale } from '@/i18n/translationOverlay'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import type { Locale } from '@/utilities/locale'

export const dynamic = 'force-dynamic'
export const revalidate = 300

export async function GET(request: Request) {
  const url = new URL(request.url)
  const locale: Locale = url.searchParams.get('locale') === 'en' ? 'en' : 'de'
  const items = await getMegaMenuItems()
  const localizedItems = translateValueForLocale(items, locale)

  return NextResponse.json(
    { docs: localizedItems },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  )
}
