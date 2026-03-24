'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Wrapper für Footer-Inhalt: Bounce-Effekt beim Erscheinen im Viewport
 * (orientiert an GSAP/GreenSock Bounce, z. B. CodePen bGeZvpO)
 */
export function FooterBounce({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('footer-bounce-root footer-bounce-visible', className)}>
      {children}
    </div>
  )
}
