'use client'

import { CMSLink } from '@/components/Link'
import { Badge } from '@/components/ui/badge'
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
  link?: Pick<CMSLinkProps, 'url' | 'label' | 'appearance' | 'newTab' | 'type' | 'reference'>
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

  const mediaSrc = resolveHeroImageSrc(media)
  const bgSrc = resolveHeroImageSrc(backgroundImage)

  // Debug: Prüfe was Payload liefert
  if (typeof window !== 'undefined') {
    console.log('[SuperheroHero] backgroundImage:', backgroundImage)
    console.log('[SuperheroHero] bgSrc:', bgSrc)
  }

  // Fokuspunkt für Hintergrundbild (Payload: 0-1, CSS: 0%-100%)
  const bgFocalPoint = React.useMemo(() => {
    if (typeof backgroundImage === 'object' && backgroundImage !== null) {
      const focalX = backgroundImage.focalX ?? 0.5
      const focalY = backgroundImage.focalY ?? 0.5
      return `${focalX * 100}% ${focalY * 100}%`
    }
    return '50% 50%'
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
      {/* DEBUG: Zeige wenn bgSrc null/undefined */}
      {!bgSrc && (
        <div className="absolute inset-0 bg-red-500 flex items-center justify-center text-white font-bold z-[999]">
          KEIN HINTERGRUNDBILD (bgSrc ist null/undefined)
        </div>
      )}

      {/* Hintergrundbild - immer 100vh hoch, unabhängig von Section padding */}
      {bgSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: 0, height: '100vh' }}
        >
          <img
            src={bgSrc}
            alt=""
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: bgFocalPoint,
            }}
          />
        </div>
      )}

      {/* Overlay für Text-Lesbarkeit */}
      {bgSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 1,
            background: [
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%)',
              'linear-gradient(to top, hsl(var(--background)) 0%, transparent 40%)',
              'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 50%)',
            ].join(', '),
          }}
        />
      )}

      <>
        <div className="hero-section-surface" aria-hidden style={{ display: 'none' }} />
        <div
          className="hero-background-overlay hero-background-overlay--style-preview-portrait"
          aria-hidden
          style={{ display: 'none' }}
        />
        <div
          className="hero-section-foreground-tint hero-section-foreground-tint--above-decor"
          aria-hidden
          style={{ display: 'none' }}
        />
        <div
          className="hero-popout-structure-layer pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{ display: 'none' }}
        />

        {/* Shape Divider: S-Kurve mit Fade zu Seitenhintergrund */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            zIndex: 2,
            height: 'clamp(80px, 15vh, 200px)',
            background: `linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)`,
            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            maskSize: '100% 100%',
            outline: '4px dashed purple',
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
            WebkitMaskSize: '100% 100%',
          }}
          aria-hidden
        />
      </>

      <div
        className="relative container flex w-full min-w-0 flex-col px-[clamp(1rem,4vw,2rem)] pb-[clamp(3rem,8vh,7rem)] pt-[clamp(1.5rem,6vh,2.5rem)]"
        style={{ zIndex: 3 }}
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
