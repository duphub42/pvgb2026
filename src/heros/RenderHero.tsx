import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { PhilippBacherHero } from '@/heros/PhilippBacher' // <--- Unser neuer Import

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  if (type === 'highImpact') {
    return <HighImpactHero {...props} />
  }

  if (type === 'mediumImpact') {
    return <MediumImpactHero {...props} />
  }

  if (type === 'lowImpact') {
    return <LowImpactHero {...props} />
  }

  // Hier ist die neue Weiche:
  if (type === 'philippBacher') {
    return <PhilippBacherHero {...props} />
  }

  return null
}
