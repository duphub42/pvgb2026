'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

/**
 * Reine CSS-Orbit-Animation für den Hero-Hintergrund.
 * Kein Three.js, kein Vanta – nur Keyframes + transform. Deutlich leichter als Vanta.
 */
export function HeroBackgroundOrbit({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn('hero-orbit absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div className="hero-orbit__ring hero-orbit__ring--1" />
      <div className="hero-orbit__ring hero-orbit__ring--2" />
      <div className="hero-orbit__ring hero-orbit__ring--3" />
    </div>
  )
}
