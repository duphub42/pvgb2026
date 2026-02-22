'use client'

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/utilities/ui'

const DEFAULT_GRID_SIZE = 18
const DEFAULT_DURATION_MS = 900
const CELL_ANIMATION_MS = 120

export interface PixelTransitionOverlayProps {
  /** Wenn true, Overlay wird angezeigt und Pixel-Animation läuft */
  active: boolean
  /** Nach Ende der Animation (alle Pixel eingeblendet) */
  onComplete: () => void
  /** Ref auf den zu überdeckenden Container (Logo-Wrapper). Overlay wird per Portal mit position:fixed darüber gelegt. */
  anchorRef: React.RefObject<HTMLElement | null>
  /** Anzahl Zellen pro Zeile/Spalte (z. B. 18 → 18×18 Grid) */
  gridSize?: number
  /** Gesamtdauer der gestaffelten Delays in ms (ca. 0.9s wie React Bits) */
  durationMs?: number
  className?: string
}

/**
 * Pixel-Transition wie https://www.reactbits.dev/animations/pixel-transition:
 * Grid von Zellen, jede blendet mit zufälligem Delay ein und überdeckt den Inhalt.
 * Wird per Portal über anchorRef gerendert, damit die Transition garantiert sichtbar ist.
 */
export function PixelTransitionOverlay({
  active,
  onComplete,
  anchorRef,
  gridSize = DEFAULT_GRID_SIZE,
  durationMs = DEFAULT_DURATION_MS,
  className,
}: PixelTransitionOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [rect, setRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const delays = useMemo(() => {
    const count = gridSize * gridSize
    return Array.from({ length: count }, () => Math.random() * durationMs)
  }, [gridSize, durationMs])

  const MIN_WIDTH = 180
  const MIN_HEIGHT = 40

  useLayoutEffect(() => {
    if (!active || !anchorRef?.current) return
    const el = anchorRef.current
    const updateRect = () => {
      const r = el.getBoundingClientRect()
      setRect({
        top: r.top,
        left: r.left,
        width: Math.max(r.width, MIN_WIDTH),
        height: Math.max(r.height, MIN_HEIGHT),
      })
    }
    updateRect()
    setVisible(true)
    const totalMs = durationMs + CELL_ANIMATION_MS + 50
    const t = setTimeout(() => {
      onCompleteRef.current()
    }, totalMs)
    const observer = new ResizeObserver(updateRect)
    observer.observe(el)
    window.addEventListener('scroll', updateRect, true)
    return () => {
      clearTimeout(t)
      observer.disconnect()
      window.removeEventListener('scroll', updateRect, true)
      setVisible(false)
      setRect(null)
    }
  }, [active, anchorRef, durationMs])

  useEffect(() => {
    if (!active) setVisible(false)
  }, [active])

  if (!visible || !rect || typeof document === 'undefined') return null

  const overlay = (
    <div
      className={cn('logo-pixel-transition logo-pixel-transition-portal pointer-events-none', className)}
      aria-hidden
      style={{
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        zIndex: 99999,
      }}
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

  return createPortal(overlay, document.body)
}
