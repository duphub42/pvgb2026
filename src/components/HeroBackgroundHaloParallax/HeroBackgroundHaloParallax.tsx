'use client'

import React, { useRef, useEffect } from 'react'

export const HeroBackgroundHaloParallax: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const halos = container.querySelectorAll<HTMLElement>('.halo')
    if (!halos.length) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20

      halos.forEach((halo, idx) => {
        const factor = (idx + 1) * 5
        halo.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`hero-css-halo absolute inset-0 overflow-hidden ${className || ''}`}
    >
      <div className="halo halo-1" />
      <div className="halo halo-2" />
      <div className="halo halo-3" />
      <div className="halo-noise" />
    </div>
  )
}

