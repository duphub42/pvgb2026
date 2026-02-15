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
} & Record<string, any>

interface RenderHeroProps {
  hero?: HeroData
}

export const RenderHero: React.FC<RenderHeroProps & Record<string, any>> = ({ hero, ...props }) => {
  // 🟢 Der Fix: as HeroData
  const heroData = (hero || props) as HeroData

  if (!heroData?.type) return null

  const HeroComponent = heroes[heroData.type]
  if (!HeroComponent) return null

  return <HeroComponent {...heroData} />
}
