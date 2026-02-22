'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Paths-Hintergrund im Stil von shadcn/ui Background Paths:
 * Animierte SVG-Bezierkurven mit stroke-dashoffset (Zeichen-Effekt), gestaffeltes Timing.
 * @see https://www.shadcn.io/preview/background/paths
 */
const PATH_COUNT = 18
const DURATION_MIN = 20
const DURATION_MAX = 30

function generatePath(index: number, width: number, height: number, mirror: boolean): string {
  const yBase = (index / (PATH_COUNT + 1)) * height
  const offset = (index % 3) * 8
  const x1 = width * (0.2 + (index % 5) * 0.1) + offset
  const x2 = width * (0.6 + (index % 7) * 0.05) - offset
  const y1 = yBase + (index % 4) * 6
  const y2 = yBase + height * 0.15 + (index % 3) * 10
  if (mirror) {
    return `M ${width} ${y1} C ${width - x1} ${y1} ${width - x2} ${y2} 0 ${y2}`
  }
  return `M 0 ${y1} C ${x1} ${y1} ${x2} ${y2} ${width} ${y2}`
}

export function PathsBackground({
  className,
  strokeColor = 'currentColor',
  strokeOpacity = 0.12,
}: {
  className?: string
  strokeColor?: string
  strokeOpacity?: number
}) {
  const width = 600
  const height = 280
  const pathsLeft = Array.from({ length: PATH_COUNT }, (_, i) => generatePath(i, width, height, false))
  const pathsRight = Array.from({ length: PATH_COUNT }, (_, i) => generatePath(i, width, height, true))

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {[...pathsLeft, ...pathsRight].map((d, i) => {
          const duration = DURATION_MIN + (i % (DURATION_MAX - DURATION_MIN + 1))
          const delay = (i * 0.4) % 5
          const strokeWidth = 0.4 + ((i % PATH_COUNT) / PATH_COUNT) * 0.5
          const opacity = strokeOpacity * (0.4 + ((i % PATH_COUNT) / PATH_COUNT) * 0.6)
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeOpacity={opacity}
              strokeLinecap="round"
              strokeDasharray="200 400"
              style={{
                animation: `paths-draw ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
