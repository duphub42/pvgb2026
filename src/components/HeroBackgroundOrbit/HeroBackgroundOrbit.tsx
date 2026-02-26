'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

/**
 * CSS-basierter Orbit-Hintergrund (inspiriert von ReactBits Orb),
 * komplett ohne WebGL/Shader.
 */
export function HeroBackgroundOrbit({ className = '' }: { className?: string }) {
  return (
    <div className={cn('hero-orbit absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="hero-orbit__core" />
      <div className="hero-orbit__ring" />
      <div className="hero-orbit__flare" />
    </div>
  )
}
