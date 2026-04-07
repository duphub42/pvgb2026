'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { blurryFadeIn, staggerContainer } from '@/components/ui/animationVariants'

interface SectionRevealProps {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  return (
    <motion.section
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div variants={blurryFadeIn} className="will-change-[opacity,transform,filter]">
        {children}
      </motion.div>
    </motion.section>
  )
}
