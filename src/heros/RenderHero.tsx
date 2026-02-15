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

// Diese Komponente akzeptiert BEIDE Varianten:
// - { ...hero } (gespreadet) - von der original page.tsx
// - { hero } (als Prop) - falls jemand das ändert
export const RenderHero: React.FC<any> = (props) => {
  // Fall 1: Wurde als { hero } übergeben?
  const heroData = props.hero || props
  
  if (!heroData?.type) return null
  
  const HeroToRender = heroes[heroData.type]
  if (!HeroToRender) return null
  
  return <HeroToRender {...heroData} />
}
