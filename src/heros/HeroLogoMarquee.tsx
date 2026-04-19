'use client'

import { getMediaUrlSafe } from '@/utils/media'
import { Marquee } from '@/components/ui/marquee'
import { ResilientImage } from '@/components/ui/resilient-image'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'
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
}

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
}: HeroLogoMarqueeProps) {
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
      {marqueeHeadline?.trim() && (
        <span
          className={cn(
            'text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 mt-1 mb-0.5 block',
            isCenter && 'text-center',
          )}
        >
          {marqueeHeadline.trim()}
        </span>
      )}
      {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && (
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
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <div className="hero-logo-marquee-item flex h-10 md:h-12 min-w-[5rem] shrink-0 items-center justify-center">
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
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6}>
                  {row?.alt || 'Partner logo'}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </Marquee>
      )}
    </div>
  )
}
