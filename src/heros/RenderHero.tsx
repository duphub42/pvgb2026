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

// Diese Komponente ist flexibel und funktioniert mit beiden Aufrufarten
export const RenderHero: React.FC<any> = (props) => {
  // 1. Fall: Wurde die Komponente mit einer 'hero'-Prop aufgerufen? (z.B. <RenderHero hero={data} />)
  // 2. Fall: Wurden die Eigenschaften direkt übergeben? (z.B. <RenderHero {...data} />)
  const heroData = props.hero || props

  if (!heroData?.type) return null

  const HeroToRender = heroes[heroData.type as keyof typeof heroes]
  if (!HeroToRender) return null

  return <HeroToRender {...heroData} />
}
