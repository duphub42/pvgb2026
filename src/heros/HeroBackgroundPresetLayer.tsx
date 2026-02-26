import React from 'react'

import type { HeroBackgrounds } from '@/payload-types'

type Preset = HeroBackgrounds | number | null | undefined

export function HeroBackgroundPresetLayer({ preset }: { preset: Preset }) {
  if (!preset || typeof preset === 'number') return null

  const type = preset.type ?? 'orbit'
  const intensity = typeof preset.intensity === 'number' ? preset.intensity : 1
  const hue = typeof preset.hue === 'number' ? preset.hue : 220

  const style: React.CSSProperties = {
    ['--hero-orbit-intensity' as string]: String(intensity),
    ['--hero-orbit-hue' as string]: String(hue),
  }

  if (type === 'orbit') {
    return <div className="hero-orbit absolute inset-0 z-0" style={style} aria-hidden />
  }

  if (type === 'cssHalo') {
    return <div className="hero-css-halo absolute inset-0 z-0" style={style} aria-hidden />
  }

  // gradient / customCss: nur leere Ebene, CSS kommt aus globalen Styles/customCss
  return <div className="hero-gradient-bg absolute inset-0 z-0" aria-hidden />
}

