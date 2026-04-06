'use client'

import type { ReactNode } from 'react'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function RootLayoutInner({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      <AnimatePresence mode="sync" initial={false}>
        {children}
      </AnimatePresence>
    </MotionConfig>
  )
}
