'use client'

import React, { useRef, useEffect, useState } from 'react'

/** Prüft, ob WebGL verfügbar ist (wird z. B. im DuckDuckGo-Browser blockiert). */
function isWebGLSupported(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')
    return Boolean(gl)
  } catch {
    return false
  }
}

const HALO_DEFAULTS = {
  amplitudeFactor: 1.8,
  backgroundAlpha: 1,
  backgroundColor: 0,
  baseColor: 0,
  color2: 15918901,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  mouseControls: false,
  mouseEase: false,
  ringFactor: 1,
  rotationFactor: 1,
  scale: 0.85,
  scaleMobile: 0.75,
  size: 1.4,
  speed: 1,
  touchControls: false,
  xOffset: 0.15,
  yOffset: -0.03,
}

export type HaloOptions = Partial<{
  amplitudeFactor: number
  size: number
  speed: number
  color2: number
  xOffset: number
  yOffset: number
}>

type VantaEffect = { destroy: () => void }

export function HeroBackgroundVantaHalo({
  className = '',
  options: optionsProp,
}: {
  className?: string
  options?: HaloOptions
}) {
  const elRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const haloOptions = { ...HALO_DEFAULTS, ...optionsProp }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !elRef.current) return
    if (!isWebGLSupported()) return

    let effect: VantaEffect | null = null
    let cancelled = false

    const init = async () => {
      const el = elRef.current
      if (!el || cancelled) return
      try {
        // Three und Vanta sind lokale npm-Pakete (gebündelt), keine externen CDN-Skripte
        const threeModule = await import('three')
        if (cancelled) return
        const THREE = (threeModule as { default: typeof threeModule }).default ?? threeModule
        if (typeof window !== 'undefined') (window as unknown as { THREE: typeof THREE }).THREE = THREE
        const vantaModule = await import('vanta/dist/vanta.halo.min.js')
        if (cancelled) return
        const HALO = (vantaModule as { default: (opts: Record<string, unknown>) => VantaEffect }).default
        effect = HALO({
          el,
          THREE,
          ...haloOptions,
        })
        if (cancelled && effect) effect.destroy()
      } catch {
        // WebGL blockiert oder Vanta/Three fehlgeschlagen (z. B. DuckDuckGo) → Fallback: Hintergrundfarbe bleibt
      }
    }

    const t = setTimeout(() => init(), 80)
    return () => {
      cancelled = true
      clearTimeout(t)
      if (effect) effect.destroy()
    }
  }, [mounted])

  return (
    <div
      ref={elRef}
      className={className}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0b0f19',
      }}
    />
  )
}
