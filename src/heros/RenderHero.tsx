import React from 'react'
import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'  // <-- WICHTIG: Import hinzufügen!
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,  // <-- WICHTIG: Hier hinzufügen!
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type as keyof typeof heroes]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
