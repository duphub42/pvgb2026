import React from 'react'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

// Alle Hero-Komponenten
const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
} as const

// Hero-Typen
export type HeroType = keyof typeof heroes

export type HeroData = {
  type: HeroType
} & Record<string, any>

interface RenderHeroProps {
  hero?: HeroData
}

/**
 * Flexible Hero-Komponente:
 * - Akzeptiert `hero`-Prop oder direkte Props
 * - Unterstützt alle Hero-Typen inkl. Philipp Bacher
 */
export const RenderHero: React.FC<RenderHeroProps & Record<string, any>> = ({ hero, ...props }) => {
  const heroData = (hero || props) as HeroData

  if (!heroData?.type) return null

  // Hole die richtige Hero-Komponente mit explizitem Type-Cast für den Key
  const HeroComponent = heroes[heroData.type as HeroType]
  
  if (!HeroComponent) return null

  // Wir reichen alle Daten an die Zielkomponente weiter
  return <HeroComponent {...heroData} />
}
