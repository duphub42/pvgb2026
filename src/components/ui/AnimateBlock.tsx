'use client'

import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface AnimateBlockProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  variants: Variants
  initial?: string
  whileInView?: string
  viewport?: { once: boolean; amount: number }
  transition?: { duration: number; ease: number[]; delay: number }
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
