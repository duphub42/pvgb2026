'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Orb from '@/components/Orb'

/**
 * ReactBits Orb (JS+CSS) als Hero-Hintergrund.
 * Nutzt OGL + Shader, wie auf reactbits.dev.
 */
export function HeroBackgroundOrbit({ className = '' }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-black', className)} aria-hidden>
      <Orb
        hue={0}
        hoverIntensity={0.5}
        rotateOnHover
        forceHoverState={false}
        backgroundColor="#020617"
      />
    </div>
  )
}
