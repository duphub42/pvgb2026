'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

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
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true)
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'footer-bounce-root',
        inView && 'footer-bounce-visible',
        className,
      )}
    >
      {children}
    </div>
  )
}
