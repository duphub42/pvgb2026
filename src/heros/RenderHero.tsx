import React from 'react'
import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact' // <-- ADD THIS IMPORT
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher' // Ensure this path is correct (capital P)

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero, // <-- ADD THIS LINE
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type as keyof typeof heroes] // Type assertion for safety

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
