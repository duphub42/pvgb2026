import React from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

export type HeroData = {
  type: keyof typeof heroes
} & Record<string, any> // erlaubt beliebige weitere Props

interface RenderHeroProps {
  hero?: HeroData
}

/**
 * Dynamisches Rendern der Hero-Komponente
 */
export const RenderHero: React.FC<RenderHeroProps & Record<string, any>> = ({ hero, ...props }) => {
  const heroData: HeroData = hero || props

  if (!heroData?.type) return null

  const HeroComponent = heroes[heroData.type]
  if (!HeroComponent) return null

  return <HeroComponent {...heroData} />
}
