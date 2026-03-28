'use client'

import { CMSLink } from '@/components/Link'
import { getMediaUrlSafe } from '@/utils/media'
import React, { type ComponentProps } from 'react'
import PopoutPortrait from '@/components/PopoutPortrait'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import { cn } from '@/utilities/ui'

type CMSLinkProps = ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<CMSLinkProps, 'url' | 'label' | 'appearance' | 'newTab' | 'type'>
}

interface StylePreviewHeroProps {
  subheadline?: string | null
  headline?: string | null
  description?: string | null
  links?: LinkItem[] | null
  media?: number | { id?: number | null; url?: string | null; alt?: string | null } | null
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null
}

const defaultSubheadline = 'Style Concept Test'
const defaultHeadline = 'Einheitlicher Look fuer die gesamte Seite'
const defaultDescription =
  'Dieser Hero ist bewusst isoliert, damit Typografie, Farben, Radius und CTA-Hierarchie getestet werden koennen, ohne bestehende Komponenten zu veraendern.'

function resolveMediaSrc(media: StylePreviewHeroProps['media']): string | null {
  if (media == null) return null
  if (typeof media === 'number' && Number.isFinite(media)) return `/api/media/stream/${media}`
  if (typeof media === 'object' && media !== null && typeof media.id === 'number' && Number.isFinite(media.id)) {
    return `/api/media/stream/${media.id}`
  }
  const safe = getMediaUrlSafe(media)
  return safe || null
}

export const StylePreviewHero: React.FC<StylePreviewHeroProps> = ({
  subheadline,
  headline,
  description,
  links,
  media,
  marqueeHeadline,
  marqueeLogos,
}) => {
  const ctaLinks = Array.isArray(links) ? links.filter((entry) => Boolean(entry?.link?.label)) : []
  const mediaUrl = resolveMediaSrc(media)
  const directMediaUrl = getMediaUrlSafe(media)
  const portraitSrc = mediaUrl || directMediaUrl

  return (
    <section aria-label="Style Preview Hero" className="relative overflow-visible bg-background text-foreground">
      <div className="hero-section-surface" aria-hidden />
      <div
        className={cn(
          'hero-background-overlay hero-background-overlay--style-preview-stack',
          portraitSrc && 'hero-background-overlay--style-preview-portrait',
        )}
        aria-hidden
      />
      <div className="hero-section-foreground-tint hero-section-foreground-tint--above-decor" aria-hidden />
      {/* Gleiche horizontale Hülle wie MegaMenu-Header: container + px-4 (nie breiter als Header-.container). Overflow: globals.css. */}
      <div className="relative z-[2] container flex w-full min-w-0 flex-col px-4 pt-12 pb-14 sm:pt-16 md:pt-36 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="grid min-w-0 gap-0 lg:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="hero-mobile-glass relative min-w-0 space-y-5 max-md:-mt-[18vw] max-md:z-10 max-md:rounded-t-2xl max-md:px-5 max-md:pt-6 max-md:pb-8">
            <div className="flex flex-col gap-1">
              <p className="inline-flex w-fit items-center rounded-full border border-border bg-card px-1.5 py-px text-[10px] font-medium uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {subheadline || defaultSubheadline}
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {headline || defaultHeadline}
              </h1>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description || defaultDescription}
            </p>

            {ctaLinks.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                {ctaLinks.slice(0, 2).map((item, index) => (
                  <CMSLink
                    key={`${item?.link?.label ?? 'cta'}-${index}`}
                    type={item?.link?.type}
                    url={item?.link?.url}
                    label={item?.link?.label}
                    newTab={item?.link?.newTab}
                    appearance={item?.link?.appearance || (index === 0 ? 'default' : 'outline')}
                    className="rounded-[var(--style-radius-l)]"
                  />
                ))}
              </div>
            ) : null}

            <HeroLogoMarquee
              marqueeHeadline={marqueeHeadline}
              marqueeLogos={marqueeLogos}
              className="mt-1 pt-3 border-t border-border/60"
            />
          </div>

          <div className="relative min-w-0 pt-0 order-first lg:order-none">
            <div className="relative overflow-visible">
              {portraitSrc ? (
                <div className="relative w-full max-w-[min(100%,506px)] lg:max-w-[min(100%,440px)] mx-auto">
                  <PopoutPortrait imageSrc={portraitSrc} />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                  Kein Hero-Bild gesetzt. Im Backend das Feld "Media / Hintergrundbild" befuellen.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
