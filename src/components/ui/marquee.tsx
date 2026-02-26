'use client'

import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useState } from 'react'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to scroll. Will be duplicated for seamless loop.
   */
  children: React.ReactNode
  /**
   * Animation duration in seconds (default 30). Higher = slower.
   */
  duration?: number
  /**
   * If true, scroll from right to left (default false = left to right).
   */
  reverse?: boolean
  /**
   * Pause animation when hovered (default true).
   */
  pauseOnHover?: boolean
  /**
   * Show gradient fade on edges (default true).
   */
  fadeEdges?: boolean
  /**
   * Vertical alignment of items (default 'center').
   */
  verticalAlign?: 'top' | 'center' | 'bottom'
  /**
   * Gap between items (Tailwind class, e.g. 'gap-3' or 'gap-6'). Default 'gap-12'.
   */
  gapClassName?: string
  /**
   * Lauf erst nach dieser Verzögerung (ms) starten. Bis dahin ist die Animation pausiert.
   */
  startAfterMs?: number
}

export function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  fadeEdges = true,
  verticalAlign = 'center',
  gapClassName = 'gap-12',
  startAfterMs,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [delayElapsed, setDelayElapsed] = useState(!startAfterMs || startAfterMs <= 0)
  useEffect(() => {
    if (!startAfterMs || startAfterMs <= 0) return
    const id = setTimeout(() => setDelayElapsed(true), startAfterMs)
    return () => clearTimeout(id)
  }, [startAfterMs])
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (pauseOnHover) setIsPaused(true)
      onMouseEnter?.(e)
    },
    [pauseOnHover, onMouseEnter],
  )
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (pauseOnHover) setIsPaused(false)
      onMouseLeave?.(e)
    },
    [pauseOnHover, onMouseLeave],
  )

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={
        fadeEdges
          ? {
              maskImage: 'linear-gradient(to right, transparent 0, black 5rem, black calc(100% - 5rem), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 5rem, black calc(100% - 5rem), transparent 100%)',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }
          : undefined
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className={cn(
          'flex w-max animate-marquee',
          gapClassName,
          verticalAlign === 'top' && 'items-start',
          verticalAlign === 'center' && 'items-center',
          verticalAlign === 'bottom' && 'items-end',
        )}
        style={
          {
            '--marquee-duration': `${duration}s`,
            '--marquee-direction': reverse ? '-1' : '1',
            animationPlayState: !delayElapsed || (pauseOnHover && isPaused) ? 'paused' : 'running',
          } as React.CSSProperties
        }
      >
        <div className={cn('flex shrink-0 items-center', gapClassName)}>{children}</div>
        <div className={cn('flex shrink-0 items-center', gapClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
