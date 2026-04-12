'use client'

import { getMediaUrlSafe } from '@/utils/media'
import { Marquee } from '@/components/ui/marquee'
import { ResilientImage } from '@/components/ui/resilient-image'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'

/** Logo-Zeile aus CMS (Payload upload / ID). */
export interface HeroMarqueeLogoRow {
  logo?: unknown
  alt?: string | null
}

export interface HeroLogoMarqueeProps {
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null
  className?: string
  /** High-Impact-Hero: zentrierte Ausrichtung. */
  align?: 'start' | 'center'
  /**
   * true = gleiche lange Delays wie im Philipp-Bacher-Hero (nach Scramble/CTA).
   * false (Standard) = kurze Delays, keine „6s unsichtbar“ auf Desktop in Style Preview / Impact-Heros.
   */
  syncWithPhilippBacherTimeline?: boolean
}

/** Nur Philipp-Bacher-Hero: an Headline/CTA-Sequenz gekoppelt (Desktop sonst ~6s unsichtbar). */
const MARQUEE_ANIM_PHILIPP = {
  headlineStartMs: 4200,
  letterMs: 38,
  logosStartMs: 6000,
  logoMs: 95,
} as const

const MARQUEE_ANIM_STANDALONE = {
  headlineStartMs: 80,
  letterMs: 18,
  logosStartMs: 120,
  logoMs: 45,
} as const

const getDelay = (ms: number, reduced: boolean) => (reduced ? 0 : ms)

const MARQUEE_CONTAINER_STYLE: React.CSSProperties = {
  backdropFilter: 'none',
  background: 'unset',
  backgroundColor: 'rgba(255,255,255,0)',
  color: 'rgba(10, 10, 10, 1)',
  borderTopWidth: 0,
  borderTopStyle: 'none',
  borderTopColor: 'rgba(0, 0, 0, 0)',
  borderImage: 'none',
}

const MARQUEE_EDGE_FADE_STYLE: React.CSSProperties = {
  overflow: 'hidden',
  maskImage:
    'linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 4rem), transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 4rem), transparent 100%)',
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
}

function resolveLogoSrc(logoField: unknown): string {
  if (logoField == null) return ''
  if (typeof logoField === 'number' && Number.isFinite(logoField)) {
    return `/api/media/stream/${logoField}`
  }
  const directUrl = getMediaUrlSafe(logoField)
  if (directUrl) return directUrl
  if (typeof logoField === 'object' && logoField !== null && 'id' in logoField) {
    const id = (logoField as { id?: unknown }).id
    if (typeof id === 'number' && Number.isFinite(id)) {
      return `/api/media/stream/${id}`
    }
  }
  return ''
}

/**
 * Logo-Laufzeile + optionale Überschrift (Philipp-Bacher-Verhalten, wiederverwendbar für Impact-Heros).
 */
export function HeroLogoMarquee({
  marqueeHeadline,
  marqueeLogos,
  className,
  align = 'start',
  syncWithPhilippBacherTimeline = false,
}: HeroLogoMarqueeProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const anim = syncWithPhilippBacherTimeline ? MARQUEE_ANIM_PHILIPP : MARQUEE_ANIM_STANDALONE
  const instantReveal = !syncWithPhilippBacherTimeline

  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(motionMql.matches)
    update()
    motionMql.addEventListener('change', update)
    return () => motionMql.removeEventListener('change', update)
  }, [])

  const showBand =
    Boolean(marqueeHeadline?.trim()) || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)

  if (!showBand) return null

  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'hero-marquee-band hero-marquee-band--cta relative z-[50] flex flex-col gap-3 w-full min-w-0 max-w-full md:max-w-2xl pb-2 pr-[50px]',
        isCenter ? 'items-center text-center self-center' : 'items-start text-left',
        className,
      )}
      style={MARQUEE_CONTAINER_STYLE}
    >
      {marqueeHeadline?.trim() &&
        (instantReveal ? (
          <span
            className={cn(
              'text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 mt-1 mb-0.5 block',
              isCenter && 'text-center',
            )}
          >
            {marqueeHeadline.trim()}
          </span>
        ) : (
          <span
            className={cn(
              'text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 mt-1 mb-0.5 inline-flex flex-wrap',
              isCenter && 'justify-center',
            )}
          >
            {marqueeHeadline.split('').map((char, idx) => (
              <span
                key={idx}
                className="hero-reveal-letter inline-block"
                style={{
                  animationDelay: `${getDelay(
                    anim.headlineStartMs + idx * anim.letterMs,
                    reducedMotion,
                  )}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && !reducedMotion && (
        <Marquee
          duration={40}
          pauseOnHover
          fadeEdges
          fadeEdgeInsetRem={{ start: 3, end: 4 }}
          gapClassName="gap-8"
          className={cn('w-full min-w-0 py-1', isCenter && 'self-stretch')}
        >
          {marqueeLogos.map((row, idx) => {
            const url = resolveLogoSrc(row?.logo)
            if (!url) return null
            const key = `hero-logo-${url}-${idx}`
            return (
              <div
                key={key}
                className={cn(
                  'hero-logo-marquee-item flex h-10 md:h-12 min-w-[5rem] shrink-0 items-center justify-center',
                  !instantReveal && 'hero-reveal-logo',
                )}
                style={
                  instantReveal
                    ? undefined
                    : {
                        animationDelay: `${getDelay(
                          anim.logosStartMs + idx * anim.logoMs,
                          reducedMotion,
                        )}ms`,
                      }
                }
              >
                <ResilientImage
                  src={url}
                  alt={row?.alt ?? ''}
                  width={112}
                  height={42}
                  className="hero-logo-grayscale filter grayscale w-auto max-w-[112px] h-auto max-h-[42px] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )
          })}
        </Marquee>
      )}
      {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && reducedMotion && (
        <div
          className={cn('flex w-full min-w-0 flex-wrap gap-4 py-1', isCenter && 'justify-center')}
          style={MARQUEE_EDGE_FADE_STYLE}
        >
          {marqueeLogos.slice(0, 6).map((row, idx) => {
            const url = resolveLogoSrc(row?.logo)
            if (!url) return null
            const key = `hero-logo-reduced-${url}-${idx}`
            return (
              <img
                key={key}
                src={url}
                alt={row?.alt ?? ''}
                width={112}
                height={42}
                className="hero-logo-grayscale filter grayscale w-auto max-w-[112px] h-auto max-h-[42px] object-contain"
                loading="lazy"
                decoding="async"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
