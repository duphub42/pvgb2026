'use client'

import { cn } from '@/utilities/ui'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Milchglas unter dem fixierten Header: als direktes Kind von document.body,
 * damit backdrop-filter den scrollenden Seiteninhalt zuverlässig sieht (nicht
 * bei verschachteltem React-Tree / Compositor-Einschränkungen am <header>).
 */
export function HeaderGlassPlate({
  glassActive,
  isVisible,
  hideToTop,
  revealFromTop,
}: {
  glassActive: boolean
  isVisible: boolean
  hideToTop: boolean
  revealFromTop: boolean
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return createPortal(
    <div
      className={cn(
        'header-glass-plate pointer-events-none fixed top-0 right-0 left-0 z-[45]',
        'h-[var(--header-height)] w-full max-w-none',
        'bg-white/[0.28] dark:bg-[rgba(18,18,18,0.34)] backdrop-blur-[28px]',
        'transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.12,0.95,0.22,1)]',
        !glassActive && 'hidden',
        glassActive &&
          (isVisible || hideToTop
            ? 'translate-y-0 opacity-100'
            : '-translate-y-[115%] opacity-0 invisible'),
        revealFromTop && 'header-reveal-from-top',
        hideToTop && 'header-hide-to-top',
      )}
      aria-hidden
    />,
    document.body,
  )
}
