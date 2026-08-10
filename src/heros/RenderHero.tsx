import type { ComponentType, FC } from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SuperheroHero } from '@/heros/Superhero/SuperheroHero'
import { translateStringForLocale } from '@/i18n/translationOverlay'
import type { Locale } from '@/utilities/locale'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  superhero: SuperheroHero,
}

/** Legacy CMS hero types still stored in older page rows. */
const LEGACY_HERO_TYPE_ALIASES: Record<string, HeroType> = {
  heroStylePreview: 'superhero',
  philippBacher: 'superhero',
}

export type HeroType = keyof typeof heroes

type HeroRenderProps = {
  hero?: Record<string, unknown> | null
  type?: string | null
} & Record<string, unknown>

function toTitleFromSlug(slug: string | null, locale: Locale): string {
  if (!slug) return translateStringForLocale('Digitale Lösungen mit Substanz', locale)
  if (slug === 'home') return translateStringForLocale('Digitale Lösungen mit Substanz', locale)
  if (slug === 'lei' || slug === 'leistungen') {
    return translateStringForLocale('Leistungen', locale)
  }

  return (
    slug
      .split('/')
      .filter(Boolean)
      .pop()
      ?.split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || translateStringForLocale('Digitale Lösungen mit Substanz', locale)
  )
}

function hasNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

function withFallbackHeroContent(
  heroData: Record<string, unknown>,
  pageSlug: string | null,
  locale: Locale,
) {
  const hasMainCopy =
    hasNonEmptyString(heroData.subheadline) ||
    hasNonEmptyString(heroData.headline) ||
    hasNonEmptyString(heroData.description)
  const hasRichText =
    typeof heroData.richText === 'object' &&
    heroData.richText !== null &&
    'root' in heroData.richText
  const hasMedia = heroData.media != null || heroData.backgroundImage != null
  const hasLinks = Array.isArray(heroData.links) && heroData.links.length > 0

  if (hasMainCopy || hasRichText || hasMedia || hasLinks) {
    return heroData
  }

  return {
    ...heroData,
    subheadline: translateStringForLocale('Strategie · Design · Entwicklung', locale),
    headline: toTitleFromSlug(pageSlug, locale),
    description: translateStringForLocale(
      'Ich gestalte digitale Erlebnisse, die sichtbar machen, was Ihr Angebot einzigartig macht.',
      locale,
    ),
  }
}

export const RenderHero: FC<HeroRenderProps> = (props) => {
  const pageSlug = hasNonEmptyString(props.pageSlug) ? String(props.pageSlug).trim() : null
  const heroData =
    props.hero && typeof props.hero === 'object'
      ? (props.hero as Record<string, unknown>)
      : (props as Record<string, unknown>)

  const rawType = typeof heroData.type === 'string' ? heroData.type : null
  if (!rawType || rawType === 'none') return null

  const normalizedType =
    rawType in heroes ? rawType : rawType.charAt(0).toLowerCase() + rawType.slice(1)
  const resolvedType =
    LEGACY_HERO_TYPE_ALIASES[rawType] ?? LEGACY_HERO_TYPE_ALIASES[normalizedType] ?? normalizedType
  const HeroToRender = (
    heroes as unknown as Record<string, ComponentType<Record<string, unknown>>>
  )[resolvedType]

  if (!HeroToRender) return null

  const locale: Locale = props.locale === 'en' ? 'en' : 'de'
  const heroDataWithFallback = withFallbackHeroContent(heroData, pageSlug, locale)

  return <HeroToRender {...heroDataWithFallback} pageSlug={pageSlug} locale={locale} />
}
