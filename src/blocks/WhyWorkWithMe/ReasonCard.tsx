'use client'

import React, { useCallback, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utilities/ui'

type ReasonCardProps = {
  title: string
  description: string
  Icon: LucideIcon
}

/* --foreground / --border sind volle rgb()-Farben, keine HSL-Tripel — daher color-mix, nicht hsl(var(--border)/…). */
const graphPaperStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, color-mix(in srgb, var(--foreground) 11%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 11%, transparent) 1px, transparent 1px),
    linear-gradient(to right, color-mix(in srgb, var(--foreground) 22%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 22%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: '4px 4px, 4px 4px, 20px 20px, 20px 20px',
  maskImage: 'radial-gradient(ellipse 135% 110% at 100% 0%, #000 0%, transparent 82%)',
  WebkitMaskImage: 'radial-gradient(ellipse 135% 110% at 100% 0%, #000 0%, transparent 82%)',
}

const borderGlowStyle: React.CSSProperties = {
  padding: 1,
  background:
    'radial-gradient(420px circle at var(--wwm-x, 100%) var(--wwm-y, 0%), hsl(var(--primary) / 0.42), transparent 52%)',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude',
}

export const ReasonCard: React.FC<ReasonCardProps> = ({ title, description, Icon }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const setPointer = useCallback((clientX: number, clientY: number) => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((clientX - r.left) / r.width) * 100
    const y = ((clientY - r.top) / r.height) * 100
    el.style.setProperty('--wwm-x', `${x}%`)
    el.style.setProperty('--wwm-y', `${y}%`)
  }, [])

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setPointer(e.clientX, e.clientY)
    },
    [setPointer],
  )

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setPointer(e.clientX, e.clientY)
    },
    [setPointer],
  )

  return (
    <div
      ref={rootRef}
      className={cn(
        'group relative min-h-[11.5rem] min-w-0 overflow-hidden rounded-2xl border border-border/35 bg-card',
      )}
      style={
        {
          '--wwm-x': '100%',
          '--wwm-y': '0%',
        } as React.CSSProperties
      }
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.138] dark:opacity-[0.132]"
        style={graphPaperStyle}
        aria-hidden
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[1] rounded-[inherit]',
          'opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none',
          'group-hover:opacity-100',
        )}
        style={borderGlowStyle}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-full min-w-0 flex-col p-6 pb-10 pr-8">
        <p className="text-base font-semibold tracking-tight text-card-foreground">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div
        className={cn(
          'pointer-events-none absolute -bottom-6 -right-6 z-0 flex size-[7.5rem] items-center justify-center',
          'text-primary/[0.14] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
          'motion-reduce:transition-none motion-reduce:group-hover:transform-none',
          'group-hover:scale-[1.22]',
          'dark:text-primary/[0.18]',
        )}
        aria-hidden
      >
        <Icon className="size-[5.25rem] shrink-0" strokeWidth={1.15} />
      </div>
    </div>
  )
}
