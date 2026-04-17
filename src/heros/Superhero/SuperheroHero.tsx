'use client'

import { CMSLink } from '@/components/Link'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React from 'react'
import PopoutPortrait from '@/components/PopoutPortrait'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CMSLinkProps = React.ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<
    CMSLinkProps,
    | 'url'
    | 'label'
    | 'appearance'
    | 'newTab'
    | 'type'
    | 'reference'
    | 'icon'
    | 'enableIconSwap'
    | 'iconSwapFrom'
    | 'iconSwapTo'
  >
}

type MediaRef =
  | number
  | {
      id?: number | null
      url?: string | null
      alt?: string | null
      focalX?: number | null
      focalY?: number | null
    }
  | null

export interface SuperheroHeroProps {
  // ─── Copy ──────────────────────────────────────────────────────────────────
  subheadline?: string | null
  /**
   * Supports '\n' for manual line breaks.
   * Takes precedence over headlineLine1/2/3 if provided.
   */
  headline?: string | null
  /** @deprecated Use headline with '\n' line breaks instead. */
  headlineLine1?: string | null
  /** @deprecated Use headline with '\n' line breaks instead. */
  headlineLine2?: string | null
  /** @deprecated Use headline with '\n' line breaks instead. */
  headlineLine3?: string | null
  description?: string | null
  links?: LinkItem[] | null

  // ─── Media ─────────────────────────────────────────────────────────────────
  media?: MediaRef
  backgroundImage?: MediaRef

  // ─── Marquee ───────────────────────────────────────────────────────────────
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null

  // ─── Meta ─────────────────────────────────────────────────────────────────
  sectionAriaLabel?: string | null
  dataHeroType?: string | null
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export const SuperheroHero: React.FC<SuperheroHeroProps> = ({
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  media,
  backgroundImage,
  marqueeHeadline,
  marqueeLogos,
  sectionAriaLabel,
  dataHeroType,
}) => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const portraitRef = React.useRef<HTMLDivElement | null>(null)
  const dividerGradientId = React.useId().replace(/:/g, '')

  const mediaSrc = resolveHeroImageSrc(media)
  const bgSrc = resolveHeroImageSrc(backgroundImage)

  // Fokuspunkt für Hintergrundbild (Payload: 0-1, CSS: 0%-100%)
  const bgFocus = React.useMemo(() => {
    let focalX = 0.5
    let focalY = 0.5

    if (typeof backgroundImage === 'object' && backgroundImage !== null) {
      focalX = backgroundImage.focalX ?? 0.5
      focalY = backgroundImage.focalY ?? 0.5
    }

    const x = Math.min(1, Math.max(0, focalX)) * 100
    const y = Math.min(1, Math.max(0, focalY)) * 100

    return {
      x,
      y,
      objectPosition: `${x}% ${y}%`,
    }
  }, [backgroundImage])

  const headlineLines: string[] = (() => {
    if (headline) return headline.split('\n').filter(Boolean)
    return [headlineLine1, headlineLine2, headlineLine3].filter((l): l is string => Boolean(l))
  })()

  const ctaLinks = (links ?? []).filter((e) => Boolean(e?.link?.label)).slice(0, 2)
  const portraitSrc = mediaSrc

  return (
    <section
      ref={sectionRef}
      aria-label={sectionAriaLabel ?? 'Hero'}
      className={cn(
        'hero-offset relative overflow-hidden hero-offset--popout text-foreground',
        !bgSrc && 'bg-background',
      )}
      style={{ isolation: 'isolate', minHeight: 'min(100vh, 800px)' }}
      data-hero-variant="popout"
      data-hero-type={dataHeroType ?? 'superhero'}
    >
      {/* Hintergrundbild - füllt die Section */}
      {bgSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <Image
            src={bgSrc}
            alt=""
            fill
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: bgFocus.objectPosition,
            }}
            onError={(e) => {
              // Gracefully hide image on error (e.g., 404 when media doesn't exist)
              console.warn('[BG IMG] Failed to load:', bgSrc)
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              // Prevent further error propagation
              img.onerror = null
            }}
            onLoad={() => console.log('[BG IMG] Loaded:', bgSrc)}
            priority
            unoptimized={Boolean(bgSrc?.startsWith('/api/') || bgSrc?.startsWith('http'))}
          />
        </div>
      )}

      {/* Overlay für Text-Lesbarkeit – theme-aware: --background hell in Light, dunkel in Dark */}
      {bgSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hero-superhero-image-overlay"
          style={{
            zIndex: 12,
            '--hero-focus-x': `${bgFocus.x}%`,
            '--hero-focus-y': `${bgFocus.y}%`,
          } as React.CSSProperties}
        />
      )}

      <>
        <div className="hero-section-surface" aria-hidden />
        <div
          className="hero-background-overlay hero-background-overlay--style-preview-portrait"
          aria-hidden
        />
        <div
          className="hero-section-foreground-tint hero-section-foreground-tint--above-decor"
          aria-hidden
        />
        <div
          className="hero-popout-structure-layer pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{ display: 'none' }}
        />

        {/* Shape Divider: weich von transparent (Bild) zu voll deckendem Theme-Background */}
        <div
          className="hero-shape-divider hero-shape-divider--viewport pointer-events-none absolute z-[22] h-[clamp(120px,20vh,260px)]"
          style={{ bottom: '-1px' }}
          aria-hidden
        >
          <div
            className="absolute inset-x-0 top-0 h-[72%]"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 30%, transparent) 40%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 62%, transparent) 100%)',
              filter: 'blur(16px)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: bgSrc
                ? 'linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 34%, transparent) 34%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 74%, transparent) 60%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 94%, transparent) 82%, var(--hero-next-section-bg, hsl(var(--background))) 100%)'
                : 'linear-gradient(to bottom, transparent 0%, hsl(var(--foreground) / 0.05) 30%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 68%, transparent) 58%, color-mix(in srgb, var(--hero-next-section-bg, hsl(var(--background))) 90%, transparent) 82%, var(--hero-next-section-bg, hsl(var(--background))) 100%)',
            }}
          />
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            style={{ display: 'block', filter: 'blur(2px)' }}
          >
            <defs>
              <linearGradient id={dividerGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--hero-next-section-bg, hsl(var(--background)))" stopOpacity="0" />
                <stop offset="28%" stopColor="var(--hero-next-section-bg, hsl(var(--background)))" stopOpacity="0.3" />
                <stop offset="56%" stopColor="var(--hero-next-section-bg, hsl(var(--background)))" stopOpacity="0.66" />
                <stop offset="78%" stopColor="var(--hero-next-section-bg, hsl(var(--background)))" stopOpacity="0.92" />
                <stop offset="100%" stopColor="var(--hero-next-section-bg, hsl(var(--background)))" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0,188C360,70,1080,306,1440,188L1440,320L0,320Z"
              fill={`url(#${dividerGradientId})`}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--hero-next-section-bg,hsl(var(--background)))]" />
        </div>
      </>

      <div
        className="relative container flex w-full min-w-0 flex-col px-[clamp(1rem,4vw,2rem)] pb-[clamp(3rem,8vh,7rem)] pt-[clamp(1.5rem,6vh,2.5rem)]"
        style={{ zIndex: 40 }}
      >
        <div
          className={cn(
            'grid min-w-0 gap-0 overflow-visible md:items-start max-md:flex max-md:flex-col max-md:h-[clamp(500px,90vh,800px)]',
            portraitSrc
              ? 'md:grid-cols-[clamp(280px,40%,460px)_auto] md:gap-[clamp(1rem,3vw,3rem)]'
              : 'md:grid-cols-1 md:max-w-3xl',
          )}
          style={{ overflow: 'visible' }}
        >
          <div
            className="relative min-w-0 space-y-[clamp(1rem,2.5vh,1.5rem)] max-md:z-[16] max-md:order-2 max-md:flex-shrink-0 md:min-h-0 lg:min-h-[clamp(400px,62vh,680px)] hero-mobile-glass max-md:-mx-4 max-md:rounded-t-2xl max-md:px-4 max-md:pt-[clamp(1.5rem,6vh,2rem)] max-md:pb-[clamp(1rem,4vh,1.5rem)] max-md:-mt-[clamp(100px,24vw,152px)]"
            style={{ overflow: 'visible' }}
          >
            {subheadline && (
              <Badge
                variant="secondary"
                className="w-fit px-1.5 py-px text-[10px] font-medium uppercase leading-tight tracking-[0.1em] hero-subheading-contrast"
              >
                {subheadline}
              </Badge>
            )}

            {headlineLines.length > 0 && (
              <h1 className="text-pretty text-hero-display hero-heading-gradient tracking-tight">
                {headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            )}

            {description && (
              <p className="max-w-2xl text-base leading-relaxed hero-content-contrast md:text-lg">
                {description}
              </p>
            )}

            {ctaLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {ctaLinks.map((item, index) => (
                  <CMSLink
                    key={`${item?.link?.label ?? 'cta'}-${index}`}
                    type={item?.link?.type}
                    url={item?.link?.url}
                    reference={item?.link?.reference}
                    label={item?.link?.label}
                    newTab={item?.link?.newTab}
                    icon={item?.link?.icon}
                    enableIconSwap={item?.link?.enableIconSwap ?? true}
                    iconSwapFrom={item?.link?.iconSwapFrom}
                    iconSwapTo={item?.link?.iconSwapTo}
                    appearance={item?.link?.appearance ?? (index === 0 ? 'default' : 'outline')}
                    className="rounded-[var(--style-radius-l)]"
                  />
                ))}
              </div>
            )}

            <HeroLogoMarquee
              marqueeHeadline={marqueeHeadline}
              marqueeLogos={marqueeLogos}
              className="mt-1 pt-3 border-t border-border/60"
            />
          </div>

          {portraitSrc && (
            <div
              ref={portraitRef}
              className="hero-desktop-parallax-portrait hero-mobile-sticky-portrait order-first md:order-none"
              style={{
                position: 'sticky',
                top: 'calc(var(--header-height, 72px) + 5vh)',
                height: 'calc(90vh - var(--header-height, 72px))',
                aspectRatio: '600 / 720',
                minWidth: '320px',
                flexShrink: 0,
                overflow: 'visible',
              }}
            >
              <div className="relative overflow-visible h-full">
                <div className="hero-portrait-gradient-blob" aria-hidden />

                <div className="relative z-[1] w-full h-full flex items-end justify-center">
                  <PopoutPortrait imageSrc={portraitSrc} fillRowHeight />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
