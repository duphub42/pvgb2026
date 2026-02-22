'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Threads-Hintergrund im Stil von React Bits:
 * Horizontale wellige Linien (Fäden) mit amplitude und Abstand.
 * @see https://www.reactbits.dev/backgrounds/threads?amplitude=3.6&distance=2
 */
const DEFAULT_AMPLITUDE = 3.6
const DEFAULT_DISTANCE = 2
const WIDTH = 600
const HEIGHT = 320

function buildThreadPath(
  y: number,
  width: number,
  amplitude: number,
  wavelength: number,
  phase: number,
): string {
  const points: string[] = []
  const steps = Math.ceil(width / 8) + 1
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const wave = Math.sin((x / wavelength) * Math.PI * 2 + phase) * amplitude
    const py = y + wave
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${py}`)
  }
  return points.join(' ')
}

export function ThreadsBackground({
  className,
  strokeColor = 'currentColor',
  strokeOpacity = 0.12,
  amplitude = DEFAULT_AMPLITUDE,
  distance = DEFAULT_DISTANCE,
}: {
  className?: string
  strokeColor?: string
  strokeOpacity?: number
  amplitude?: number
  distance?: number
}) {
  const amp = amplitude * 4
  const spacing = Math.max(8, distance * 8)
  const wavelength = 80 + (distance * 15)
  const threadCount = Math.ceil(HEIGHT / spacing) + 4
  const paths = Array.from({ length: threadCount }, (_, i) => {
    const y = -spacing + (i * spacing)
    const phase = (i % 3) * 0.7
    return buildThreadPath(y, WIDTH + 100, amp, wavelength, phase)
  })

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox={`${-50} ${-spacing} ${WIDTH + 100} ${HEIGHT + spacing * 2}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((d, i) => {
          const opacity = strokeOpacity * (0.4 + (i % 5) / 10)
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={0.8}
              strokeOpacity={opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-threads-drift"
              style={{
                animationDelay: `${(i * 0.15) % 4}s`,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
