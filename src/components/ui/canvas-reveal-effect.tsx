'use client'

import { cn } from '@/lib/utils'
import React from 'react'

/** CSS-only reveal effect (no @react-three/fiber). Same API as before for drop-in replacement. */
export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
}) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const color = colors[0]
  const rgb = color ? `rgb(${color[0]}, ${color[1]}, ${color[2]})` : 'rgb(0, 255, 255)'

  return (
    <div className={cn('h-full relative bg-white w-full', containerClassName)}>
      <div className="h-full w-full relative overflow-hidden">
        {mounted && (
          <div
            className="absolute inset-0 opacity-40 transition-opacity duration-500 ease-out"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, ${rgb} 0%, transparent 70%),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent ${dotSize}px,
                  ${rgb} ${dotSize}px,
                  ${rgb} ${dotSize + 1}px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent ${dotSize}px,
                  ${rgb} ${dotSize}px,
                  ${rgb} ${dotSize + 1}px
                )
              `,
              backgroundSize: '100% 100%, 12px 12px, 12px 12px',
            }}
          />
        )}
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  )
}
