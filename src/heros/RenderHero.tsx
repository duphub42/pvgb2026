import React from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

const heroes: Record<string, React.FC<any>> = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

// 🟢 KEINE FESTEN PROPS MEHR! Die Komponente nimmt einfach alles.
export const RenderHero: React.FC<any> = (props) => {
  // Entweder wurde ein 'hero'-Prop übergeben, oder die Daten direkt (gespreadet)
  const heroData = props.hero || props

  if (!heroData?.type) return null

  const HeroComponent = heroes[heroData.type]
  if (!HeroComponent) return null

  // Alles an die Zielkomponente durchreichen
  return <HeroComponent {...heroData} />
}
