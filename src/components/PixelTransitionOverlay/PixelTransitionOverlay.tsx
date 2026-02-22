'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

const DEFAULT_GRID_SIZE = 18
const DEFAULT_DURATION_MS = 900
const CELL_ANIMATION_MS = 120

export interface PixelTransitionOverlayProps {
  /** Wenn true, Overlay wird angezeigt und Pixel-Animation läuft */
  active: boolean
  /** Nach Ende der Animation (alle Pixel eingeblendet) */
  onComplete: () => void
  /** Anzahl Zellen pro Zeile/Spalte (z. B. 18 → 18×18 Grid) */
  gridSize?: number
  /** Gesamtdauer der gestaffelten Delays in ms (ca. 0.9s wie React Bits) */
  durationMs?: number
  className?: string
}

/**
 * Pixel-Transition wie https://www.reactbits.dev/animations/pixel-transition:
 * Grid von Zellen, jede blendet mit zufälligem Delay ein und überdeckt den Inhalt.
 */
export function PixelTransitionOverlay({
  active,
  onComplete,
  gridSize = DEFAULT_GRID_SIZE,
  durationMs = DEFAULT_DURATION_MS,
  className,
}: PixelTransitionOverlayProps) {
  const [visible, setVisible] = useState(active)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const delays = useMemo(() => {
    const count = gridSize * gridSize
    return Array.from({ length: count }, () => Math.random() * durationMs)
  }, [gridSize, durationMs])

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return
    }
    setVisible(true)
    const totalMs = durationMs + CELL_ANIMATION_MS + 50
    const t = setTimeout(() => {
      onCompleteRef.current()
    }, totalMs)
    return () => clearTimeout(t)
  }, [active, durationMs])

  if (!visible) return null

  return (
    <div
      className={cn('logo-pixel-transition pointer-events-none', className)}
      aria-hidden
    >
      <div
        className="logo-pixel-transition-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {delays.map((delay, i) => (
          <div
            key={i}
            className="logo-pixel-transition-cell"
            style={{
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
