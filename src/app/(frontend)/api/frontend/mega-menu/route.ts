import { NextResponse } from 'next/server'

import { translateValueForLocale } from '@/i18n/translationOverlay'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import type { Locale } from '@/utilities/locale'

export const dynamic = 'force-dynamic'
export const revalidate = 300

const EN_MEGA_MENU_TEXT_FIXES: Record<string, string> = {
  'Web Design & Entwicklung': 'Web Design & Development',
}

function normalizeEnglishMegaMenuText(value: string): string {
  const fixed = EN_MEGA_MENU_TEXT_FIXES[value] ?? value

  return fixed
    .replace(
      /Echtzeit-Daten,\s*nahtlose Verbindungen:\s*Ich verbinde Ihre Tools und automatisier(?:e|en) Prozesse direkt über Webhooks\.?/gi,
      '',
    )
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function normalizeEnglishMegaMenuPayload<T>(value: T): T {
  if (typeof value === 'string') return normalizeEnglishMegaMenuText(value) as T
  if (Array.isArray(value)) return value.map(normalizeEnglishMegaMenuPayload) as T
  if (value != null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, normalizeEnglishMegaMenuPayload(child)]),
    ) as T
  }
  return value
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const locale: Locale = url.searchParams.get('locale') === 'en' ? 'en' : 'de'
  const items = await getMegaMenuItems()
  const localizedItems = translateValueForLocale(items, locale)
  const normalizedItems =
    locale === 'en' ? normalizeEnglishMegaMenuPayload(localizedItems) : localizedItems

  return NextResponse.json(
    { docs: normalizedItems },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  )
}
