import React from 'react'
import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'  // <-- Großes P!

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
