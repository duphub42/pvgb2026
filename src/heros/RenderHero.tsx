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

// ⚡ Kompatibel mit beiden Aufruf-Varianten!
export const RenderHero: React.FC<any> = (props) => {
  // Funktioniert egal ob {...hero} oder { hero }
  const heroData = props.hero || props
  
  if (!heroData?.type) return null

  const HeroToRender = heroes[heroData.type]
  if (!HeroToRender) return null

  return <HeroToRender {...heroData} />
}
