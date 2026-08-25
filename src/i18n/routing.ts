import type { Locale } from '@/utilities/locale'

const EN_TO_DE_SEGMENTS: Record<string, string> = {
  automation: 'automatisierung',
  'brand-strategy': 'markenstrategie',
  'corporate-identity': 'corporate-identity',
  contact: 'kontakt',
  content: 'content',
  keynotes: 'keynotes',
  legal: 'impressum',
  logo: 'logo',
  'portfolio-branding': 'portfolio-marken',
  'portfolio-marketing': 'portfolio-marketing',
  'portfolio-web-design': 'portfolio-webdesign',
  prices: 'preise',
  print: 'print',
  privacy: 'datenschutz',
  profile: 'profil',
  sem: 'sem',
  services: 'leistungen',
  seo: 'seo',
  'web-design': 'webdesign',
  'wordpress-agency': 'wordpress-agentur',
}

const DE_TO_EN_SEGMENTS = {
  ...Object.fromEntries(Object.entries(EN_TO_DE_SEGMENTS).map(([en, de]) => [de, en])),
  'ci-corporate-identity': 'corporate-identity',
  'content-creation': 'content',
  'logo-entwicklung': 'logo',
  'praesentationen-keynotes': 'keynotes',
  'printmedien-grafikdesign': 'print',
  'sem-online-werbung': 'sem',
  'seo-rankings': 'seo',
} as Record<string, string>

export function getLocaleFromPathname(pathname: string | null | undefined): Locale | null {
  const normalized = pathname?.trim() || '/'
  return normalized === '/en' || normalized.startsWith('/en/') ? 'en' : null
}

export function stripLocaleFromPathname(pathname: string): string {
  const normalized = pathname.trim() || '/'
  if (normalized === '/en') return '/'
  if (normalized.startsWith('/en/')) return normalized.slice(3) || '/'
  return normalized
}

export function getGermanSlugFromEnglishSegments(segments: string[]): string {
  if (segments.length === 0) return 'home'
  const lastSegment = segments[segments.length - 1] ?? 'home'
  return EN_TO_DE_SEGMENTS[lastSegment] ?? lastSegment
}

export function localizePathname(pathname: string, locale: Locale): string {
  const withoutLocale = stripLocaleFromPathname(pathname)
  const segments = withoutLocale.split('/').filter(Boolean)

  if (locale === 'de') {
    const germanSegments = segments.map((segment) => EN_TO_DE_SEGMENTS[segment] ?? segment)
    return `/${germanSegments.join('/')}`.replace(/\/+$/, '') || '/'
  }

  const sourceSegments =
    segments[0] === 'leistungen' && segments.length > 1 ? segments.slice(1) : segments
  const englishSegments = sourceSegments.map((segment) => DE_TO_EN_SEGMENTS[segment] ?? segment)
  const path = `/en/${englishSegments.join('/')}`.replace(/\/+$/, '')
  return path || '/en'
}

export function getCanonicalPath(pathname: string, locale: Locale): string {
  const localized = localizePathname(pathname, locale)
  return localized === '/en' ? '/en' : localized
}
