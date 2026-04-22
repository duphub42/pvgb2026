import type { ComponentType, FC } from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SuperheroHero } from '@/heros/Superhero/SuperheroHero'
import type { SuperheroHeroProps } from '@/heros/Superhero/SuperheroHero'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  superhero: SuperheroHero,
}

export type HeroType = keyof typeof heroes

type HeroRenderProps = {
  hero?: Record<string, unknown> | null
  type?: string | null
} & Record<string, unknown>

function toTitleFromSlug(slug: string | null): string {
  if (!slug) return 'Digitale Loesungen mit Substanz'
  if (slug === 'home') return 'Digitale Loesungen mit Substanz'
  if (slug === 'lei' || slug === 'leistungen') return 'Leistungen'

  return (
    slug
      .split('/')
      .filter(Boolean)
      .pop()
      ?.split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Digitale Loesungen mit Substanz'
  )
}

function hasNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

function withFallbackHeroContent(heroData: Record<string, unknown>, pageSlug: string | null) {
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
    subheadline: 'Strategie · Design · Entwicklung',
    headline: toTitleFromSlug(pageSlug),
    description:
      'Wir gestalten digitale Erlebnisse, die sichtbar machen, was dein Angebot einzigartig macht.',
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
  const HeroToRender = (
    heroes as unknown as Record<string, ComponentType<Record<string, unknown>>>
  )[normalizedType]

  if (!HeroToRender) return null

  const heroDataWithFallback = withFallbackHeroContent(heroData, pageSlug)

  return <HeroToRender {...heroDataWithFallback} />
}
