'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'

export type PopoutFloatingPosition =
  | 'topLeft'
  | 'topRight'
  | 'midLeft'
  | 'midRight'
  | 'bottomLeft'
  | 'bottomRight'

export interface PopoutHeroFloatingItem {
  id?: string | null
  label?: string | null
  floatingDescription?: string | null
  icon?: number | { id?: number | null; url?: string | null } | null
  linkUrl?: string | null
  linkNewTab?: boolean | null
  position: PopoutFloatingPosition
  offsetX?: number | null
  offsetY?: number | null
}

const POSITION_CLASSES: Record<PopoutFloatingPosition, string> = {
  topLeft: 'top-[10%] left-[8%]',
  topRight: 'top-[10%] right-[8%]',
  midLeft: 'top-1/2 left-[8%]',
  midRight: 'top-1/2 right-[8%]',
  bottomLeft: 'bottom-[18%] left-[8%]',
  bottomRight: 'bottom-[18%] right-[8%]',
}

const STAR_POSITION_CLASSES: Record<PopoutFloatingPosition, string> = {
  topLeft: 'top-[10%] right-[42%]',
  topRight: 'top-[6%] right-[4%]',
  midLeft: 'top-[44%] right-[50%]',
  midRight: 'top-[40%] right-[1%]',
  bottomLeft: 'bottom-[22%] right-[40%]',
  bottomRight: 'bottom-[26%] right-[5%]',
}

const VERTICAL_CENTER_POSITIONS: ReadonlySet<PopoutFloatingPosition> = new Set(['midLeft', 'midRight'])

function offsetTransform(ox: number, oy: number, verticalCenter: boolean): string {
  const x = `calc(${ox} * 0.45vw)`
  const y = verticalCenter
    ? `calc(-50% + ${oy} * 0.35vh)`
    : `calc(${oy} * 0.35vh)`
  return `translate(${x}, ${y})`
}

function useWideLayout() {
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1250px)')
    const update = () => setWide(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  return wide
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  return reduced
}

function isRenderable(f: PopoutHeroFloatingItem): boolean {
  return Boolean(
    (f.label && f.label.trim()) ||
      (f.floatingDescription && f.floatingDescription.trim()) ||
      resolveHeroImageSrc(f.icon),
  )
}

function FloatingCardBody({
  f,
  idx,
  reducedMotion,
  baseDelayMs,
}: {
  f: PopoutHeroFloatingItem
  idx: number
  reducedMotion: boolean
  baseDelayMs: number
}) {
  const iconSrc = resolveHeroImageSrc(f.icon)
  const title = f.label?.trim()
  const desc = f.floatingDescription?.trim()

  const content = (
    <div
      className={cn(
        'flex gap-2.5 rounded-xl border border-border/60 bg-background/90 px-2.5 py-2 shadow-sm backdrop-blur-md transition-colors',
        f.linkUrl && 'hover:bg-accent/25',
      )}
    >
      {iconSrc ? (
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-muted/40">
          <Image src={iconSrc} alt="" fill className="object-cover" sizes="36px" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1 text-left">
        {title ? <p className="text-xs font-semibold leading-tight text-foreground">{title}</p> : null}
        {desc ? (
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">{desc}</p>
        ) : null}
      </div>
    </div>
  )

  const delay = reducedMotion ? 0 : baseDelayMs + idx * 100
  const animClass = reducedMotion ? '' : 'hero-floating-card-reveal'

  const wrapped = (
    <div
      className={cn(animClass, 'pointer-events-auto max-w-[13rem]')}
      style={reducedMotion ? undefined : { animationDelay: `${delay}ms` }}
    >
      {content}
    </div>
  )

  if (f.linkUrl) {
    return (
      <a
        href={f.linkUrl}
        target={f.linkNewTab ? '_blank' : undefined}
        rel={f.linkNewTab ? 'noopener noreferrer' : undefined}
        className="block min-w-0 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      >
        {wrapped}
      </a>
    )
  }

  return wrapped
}

export function filterPopoutFloatingElements(
  elements: PopoutHeroFloatingItem[] | null | undefined,
): PopoutHeroFloatingItem[] {
  if (!Array.isArray(elements)) return []
  return elements.filter(isRenderable)
}

export function PopoutHeroFloatingElementsFlow({
  elements,
}: {
  elements: PopoutHeroFloatingItem[]
}) {
  const reducedMotion = useReducedMotion()
  if (elements.length === 0) return null

  return (
    <div
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden"
      aria-label="Highlights"
    >
      {elements.map((f, idx) => (
        <FloatingCardBody
          key={f.id ?? `${f.position}-${idx}`}
          f={f}
          idx={idx}
          reducedMotion={reducedMotion}
          baseDelayMs={200}
        />
      ))}
    </div>
  )
}

export function PopoutHeroFloatingElementsAbsolute({
  elements,
}: {
  elements: PopoutHeroFloatingItem[]
}) {
  const isWide = useWideLayout()
  const reducedMotion = useReducedMotion()

  const posMap = useMemo(
    () => (isWide ? STAR_POSITION_CLASSES : POSITION_CLASSES),
    [isWide],
  )

  if (elements.length === 0) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[24] hidden lg:block" aria-hidden>
      {elements.map((f, idx) => {
        const posClasses = posMap[f.position] ?? POSITION_CLASSES.bottomRight
        const ox = f.offsetX ?? 0
        const oy = f.offsetY ?? 0
        const vCenter = !isWide && VERTICAL_CENTER_POSITIONS.has(f.position)
        return (
          <div
            key={f.id ?? `${f.position}-${idx}`}
            className={cn('absolute', posClasses)}
            style={{
              transform: offsetTransform(ox, oy, vCenter),
            }}
          >
            <FloatingCardBody
              f={f}
              idx={idx}
              reducedMotion={reducedMotion}
              baseDelayMs={400}
            />
          </div>
        )
      })}
    </div>
  )
}
