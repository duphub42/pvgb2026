'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

export type TiltEffectProps = {
  children: React.ReactNode
  tiltFactor?: number
  perspective?: number
  transitionDuration?: number
  /** Wenn gesetzt: Tilt erst nach dieser Verzögerung (ms) aktiv – z. B. nach Ende einer Einblend-Animation. */
  enabledAfterMs?: number
  className?: string
}

export const TiltEffect: React.FC<TiltEffectProps> = ({
  children,
  tiltFactor = 12,
  perspective = 1000,
  transitionDuration = 0.5,
  enabledAfterMs = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 })
  const [enabled, setEnabled] = useState(enabledAfterMs <= 0)

  useEffect(() => {
    if (enabledAfterMs <= 0) return
    const t = setTimeout(() => setEnabled(true), enabledAfterMs)
    return () => clearTimeout(t)
  }, [enabledAfterMs])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(
    ySpring,
    [-elementSize.height / 2, elementSize.height / 2],
    [tiltFactor, -tiltFactor],
  )
  const rotateY = useTransform(
    xSpring,
    [-elementSize.width / 2, elementSize.width / 2],
    [-tiltFactor, tiltFactor],
  )

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setElementSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const centerX = elementSize.width / 2
    const centerY = elementSize.height / 2
    x.set(mouseX - centerX)
    y.set(mouseY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="h-full w-full"
        style={{
          rotateX,
          rotateY,
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
        }}
        transition={{
          duration: transitionDuration,
          type: 'spring',
          ...springConfig,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
