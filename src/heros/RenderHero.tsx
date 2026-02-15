import React from 'react'
import type { Page } from '@/payload-types'
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

// Diese Komponente akzeptiert die gespreadeten Props von page.tsx
export const RenderHero: React.FC<Page['hero']> = (heroData) => {
  if (!heroData?.type) return null

  const HeroToRender = heroes[heroData.type]
  if (!HeroToRender) return null

  return <HeroToRender {...heroData} />
}
