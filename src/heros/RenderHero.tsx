import React from 'react'
import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

// Alle Hero-Komponenten in einem Objekt für dynamisches Rendering
const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

// Typ für heroData
export type HeroData = {
  type: keyof typeof heroes
} & Record<string, any> // weitere dynamische Props

interface RenderHeroProps {
  hero?: HeroData
}

/**
 * RenderHero rendert dynamisch die passende Hero-Komponente
 * basierend auf dem Typ im hero-Objekt.
 */
export const RenderHero: React.FC<RenderHeroProps> = ({ hero, ...props }) => {
  // hero wird bevorzugt, ansonsten direkt die Props
  const heroData = hero || props

  if (!heroData?.type) return null

  const HeroComponent = heroes[heroData.type as keyof typeof heroes]
  if (!HeroComponent) return null

  return <HeroComponent {...heroData} />
}
