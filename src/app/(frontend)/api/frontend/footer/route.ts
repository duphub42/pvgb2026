import { NextResponse } from 'next/server'

import { translateValueForLocale } from '@/i18n/translationOverlay'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer, Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

export const dynamic = 'force-dynamic'
export const revalidate = 300

export async function GET(request: Request) {
  const url = new URL(request.url)
  const locale: Locale = url.searchParams.get('locale') === 'en' ? 'en' : 'de'

  const [footerResult, headerResult] = await Promise.allSettled([
    getCachedGlobal('footer', 4)(),
    getCachedGlobal('header', 1)(),
  ])

  const footer =
    footerResult.status === 'fulfilled' ? translateValueForLocale(footerResult.value, locale) : null
  const header =
    headerResult.status === 'fulfilled' ? translateValueForLocale(headerResult.value, locale) : null

  return NextResponse.json(
    {
      footer: footer as Footer | null,
      header: header as Header | null,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  )
}
