import React from 'react'
import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher'

/**
 * Mapping der Hero-Typen aus Payload CMS zu den React-Komponenten.
 * Stelle sicher, dass die Keys exakt mit den Slugs in deiner 
 * Payload-Konfiguration (Collection 'pages', Field 'hero.type') übereinstimmen.
 */
const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
  philippBacher: PhilippBacherHero,
}

type HeroType = keyof typeof heroes

export const RenderHero: React.FC<{ hero: Page['hero'] }> = (props) => {
  const { hero } = props

  // 1. Sicherheitscheck: Wenn kein Hero oder Typ definiert ist, rendere nichts.
  if (!hero || !hero.type) {
    return null
  }

  // 2. Dynamische Komponente auswählen
  // Wir casten vorsichtig, um Build-Fehler bei unbekannten Typen zu vermeiden
  const HeroToRender = heroes[hero.type as HeroType]

  // 3. WICHTIG FÜR CI-BUILD: 
  // Falls in der DB ein Typ steht, den der Code noch nicht kennt,
  // loggen wir das und geben null zurück, statt den Build crashen zu lassen.
  if (!HeroToRender) {
    console.warn(`RenderHero: Hero-Typ "${hero.type}" wurde im Code nicht gefunden.`)
    return null
  }

  // 4. Komponente rendern und alle Props des Heros übergeben
  return <HeroToRender {...hero} />
}
