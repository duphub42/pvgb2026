import type { ComponentType, FC } from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { LeistungenHero } from '@/heros/LeistungenHero'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { ProAthleteHero } from '@/heros/ProAthlete'
import { SuperheroHero } from '@/heros/Superhero/SuperheroHero'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  proAthlete: ProAthleteHero,
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
  const HeroToRender = (heroes as unknown as Record<string, ComponentType<Record<string, unknown>>>)[normalizedType]

  if (!HeroToRender) return null

  return <HeroToRender {...heroData} />
}
