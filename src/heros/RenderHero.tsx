import type { ComponentType, FC } from 'react'
import dynamic from 'next/dynamic'

// Lazy load Hero-Komponenten für bessere Performance (ohne ssr: false für Server Components)
const HighImpactHero = dynamic(
  () => import('@/heros/HighImpact/index').then((mod) => ({ default: mod.HighImpactHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const LeistungenHero = dynamic(
  () => import('@/heros/LeistungenHero').then((mod) => ({ default: mod.LeistungenHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const LowImpactHero = dynamic(
  () => import('@/heros/LowImpact/index').then((mod) => ({ default: mod.LowImpactHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const MediumImpactHero = dynamic(
  () => import('@/heros/MediumImpact/index').then((mod) => ({ default: mod.MediumImpactHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const ProAthleteHero = dynamic(
  () => import('@/heros/ProAthlete/index').then((mod) => ({ default: mod.ProAthleteHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const SimpleHero = dynamic(
  () => import('@/heros/SimpleHero').then((mod) => ({ default: mod.SimpleHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const SuperheroHero = dynamic(
  () => import('@/heros/Superhero/SuperheroHero').then((mod) => ({ default: mod.SuperheroHero })),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  },
)

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  proAthlete: ProAthleteHero,
  simple: SimpleHero,
  superhero: SuperheroHero,
  leistungenHero: LeistungenHero,
}

export type HeroType = keyof typeof heroes

type HeroRenderProps = {
  hero?: Record<string, unknown> | null
  type?: string | null
} & Record<string, unknown>

export const RenderHero: FC<HeroRenderProps> = (props) => {
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

  return <HeroToRender {...heroData} />
}
