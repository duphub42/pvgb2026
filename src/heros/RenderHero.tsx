import React from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'
import { GridHero } from '@/heros/GridHero'
import SimpleHero from '@/heros/SimpleHero'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
  gridHero: GridHero,
  simpleHero: SimpleHero,
}

export type HeroType = keyof typeof heroes

export const RenderHero: React.FC<any> = (props) => {
  const heroData = props.hero || props

  if (!heroData?.type || heroData.type === 'none') return null

  const HeroToRender = (heroes as any)[heroData.type]

  if (!HeroToRender) return null

  return <HeroToRender {...heroData} />
}
