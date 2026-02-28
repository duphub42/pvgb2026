import React from 'react'

import type { HeroBackgrounds } from '@/payload-types'

type Preset = HeroBackgrounds | number | null | undefined

export function HeroBackgroundPresetLayer({ preset }: { preset: Preset }) {
  if (!preset || typeof preset === 'number') return null

  const type = preset.type ?? 'cssHalo'
  const intensity = typeof preset.intensity === 'number' ? preset.intensity : 1
  const hue = typeof preset.hue === 'number' ? preset.hue : 220
  const patternColor1 =
    typeof preset.patternColor1 === 'string' && preset.patternColor1.trim() !== ''
      ? preset.patternColor1.trim()
      : undefined
  const patternColor2 =
    typeof preset.patternColor2 === 'string' && preset.patternColor2.trim() !== ''
      ? preset.patternColor2.trim()
      : undefined

  const style: React.CSSProperties = {
    ['--hero-orbit-intensity' as string]: String(intensity),
    ['--hero-orbit-hue' as string]: String(hue),
    ...(patternColor1 && { ['--hero-pattern-c1' as string]: patternColor1 }),
    ...(patternColor2 && { ['--hero-pattern-c2' as string]: patternColor2 }),
  }

  if (type === 'cssHalo') {
    return <div className="hero-css-halo absolute inset-0 z-0" style={style} aria-hidden />
  }

  if (type === 'patternSquare') {
    return <div className="hero-pattern-square absolute inset-0 z-0" style={style} aria-hidden />
  }

  if (type === 'goldRadial') {
    return <div className="hero-pattern-gold-radial absolute inset-0 z-0" style={style} aria-hidden />
  }

  // gradient / customCss: nur leere Ebene, CSS kommt aus globalen Styles/customCss
  return <div className="hero-gradient-bg absolute inset-0 z-0" aria-hidden />
}

