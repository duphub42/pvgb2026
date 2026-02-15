import React from 'react'
import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

/**
 * Mapping der Hero-Komponenten.
 * Wir verwenden 'any' für die Komponenten-Werte im Mapping, 
 * um den strikten String-Abgleich-Fehler im Build zu vermeiden.
 */
const heroes: Record<string, React.FC<any>> = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

export const RenderHero: React.FC<{ hero: Page['hero'] }> = ({ hero }) => {
  // 1. Sicherheitscheck
  if (!hero || !hero.type || hero.type === 'none') {
    return null
  }

  // 2. Komponente anhand des Typs auswählen
  const HeroComponent = heroes[hero.type]

  // 3. Falls der Typ im Mapping nicht existiert (z.B. Tippfehler im CMS)
  if (!HeroComponent) {
    console.warn(`Keine Hero-Komponente für Typ "${hero.type}" gefunden.`)
    return null
  }

  // 4. Daten übergeben
  // Wir casten hero zu 'any', damit TypeScript nicht versucht, 
  // den inkompatiblen 'type' String mit den Erwartungen der Unterkomponenten zu validieren.
  const heroProps = hero as any

  return <HeroComponent {...heroProps} />
}
