'use client'

import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Transition, Variants, ViewportOptions } from 'framer-motion'

interface AnimateBlockProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  variants: Variants
  initial?: string
  whileInView?: string
  viewport?: ViewportOptions
  transition?: Transition
}

export function AnimateBlock({
  children,
  className,
  style,
  variants,
  initial = 'hidden',
  whileInView = 'visible',
  viewport,
  transition,
}: AnimateBlockProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
