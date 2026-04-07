'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function RootLayoutInner({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('[RootLayoutInner] unhandledrejection', event.reason, typeof event.reason)
    }

    const onError = (event: ErrorEvent) => {
      console.error(
        '[RootLayoutInner] error',
        event.error ?? event.message,
        event.filename,
        event.lineno,
        event.colno,
      )
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection)
    window.addEventListener('error', onError)

    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
      window.removeEventListener('error', onError)
    }
  }, [])

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      <AnimatePresence mode="sync" initial={false}>
        {children}
      </AnimatePresence>
    </MotionConfig>
  )
}
