'use client'

import { CMSLink } from '@/components/Link'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import Image from 'next/image'
import React from 'react'
import PopoutPortrait from '@/components/PopoutPortrait'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import {
  filterPopoutFloatingElements,
  PopoutHeroFloatingElementsAbsolute,
  PopoutHeroFloatingElementsFlow,
  type PopoutHeroFloatingItem,
} from '@/heros/PopoutHeroFloatingElements'
import { PopoutHeroStackVisual, type HeroStackResolvedLayer } from '@/heros/PopoutHeroStackVisual'
import type { HeroBackground } from '@/payload-types'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { buildHeroCopyFadeStyle, getScrambleLinesRevealDurationMs } from '@/heros/scrambleTiming'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CMSLinkProps = React.ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<CMSLinkProps, 'url' | 'label' | 'appearance' | 'newTab' | 'type' | 'reference'>
}

type MediaRef = number | { id?: number | null; url?: string | null; alt?: string | null } | null

export interface SuperheroHeroProps {
  /**
   * Explicit variant. Replaces the old pathname-based `isProfilPage` check.
   * Defaults to 'popout'.
   */
  variant?: 'popout' | 'profil' | 'standard'

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
  foregroundImage?: MediaRef
  backgroundImage?: MediaRef
  backgroundVideo?: MediaRef

  // ─── Stack layers ──────────────────────────────────────────────────────────
  stackBackImage?: MediaRef
  stackBackOffsetX?: number | null
  stackBackOffsetY?: number | null
  stackMidImage?: MediaRef
  stackMidOffsetX?: number | null
  stackMidOffsetY?: number | null
  stackFrontImage?: MediaRef
  stackFrontOffsetX?: number | null
  stackFrontOffsetY?: number | null

  // ─── Background / decoration ───────────────────────────────────────────────
  mediaType?: ('cssHalo' | 'image' | 'video' | 'animation') | null
  mediaTypeMobile?: ('auto' | 'cssHalo' | 'image' | 'video' | 'animation') | null
  backgroundPreset?: HeroBackground | number | null
  overlayOpacity?: number | null
  surfacePattern?:
    | (
        | 'none'
        | 'honeycomb'
        | 'checker'
        | 'mmPaper'
        | 'dots'
        | 'linesHorizontal'
        | 'linesVertical'
        | 'gridLines'
      )
    | null

  // ─── Marquee ───────────────────────────────────────────────────────────────
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null

  // ─── Floating elements ─────────────────────────────────────────────────────
  floatingElements?: PopoutHeroFloatingItem[] | null

  // ─── Meta ─────────────────────────────────────────────────────────────────
  sectionAriaLabel?: string | null
  dataHeroType?: string | null
  /**
   * @deprecated Pass variant='profil' instead.
   * Kept for backward-compat for existing CMS content.
   */
  pageSlug?: string | null
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PATTERN_CLASS: Record<string, string> = {
  honeycomb: 'hero-surface-pattern hero-surface-pattern--honeycomb',
  checker: 'hero-surface-pattern hero-surface-pattern--checker',
  mmPaper: 'hero-surface-pattern hero-surface-pattern--mmPaper',
  dots: 'hero-surface-pattern hero-surface-pattern--dots',
  linesHorizontal: 'hero-surface-pattern hero-surface-pattern--linesHorizontal',
  linesVertical: 'hero-surface-pattern hero-surface-pattern--linesVertical',
  gridLines: 'hero-surface-pattern hero-surface-pattern--gridLines',
}

/** Fallback stack assets (Philipp Bacher portfolio). */
const FALLBACK_BACK = 'https://philippbacher.com/wp-content/uploads/2026/02/powderparty.png'
const FALLBACK_FRONT = 'https://philippbacher.com/wp-content/uploads/2026/02/skijump-1.png'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toPx(v: unknown): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : 0
}

function buildStackLayers(
  specs: Array<{ src: string | null | undefined; ox: number; oy: number; wide?: boolean }>,
): HeroStackResolvedLayer[] {
  return specs
    .filter((s): s is typeof s & { src: string } => Boolean(s.src))
    .map((s, z) => ({ src: s.src, offsetX: s.ox, offsetY: s.oy, z, wide: s.wide }))
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProfilShapeDivider() {
  const baseD = 'M0,50 C360,22 640,178 960,102 C1080,72 1140,148 1200,150 L1200,200 L0,200 Z'
  const layers = [
    { tx: 16, ty: -6, op: 0.08 },
    { tx: 32, ty: -12, op: 0.12 },
    { tx: 48, ty: -18, op: 0.18 },
    { tx: 64, ty: -24, op: 0.28 },
    { tx: 80, ty: -30, op: 0.4 },
    { tx: 0, ty: 0, op: 0.9 },
  ]
  return (
    <div
      data-full-bleed="viewport"
      className="pointer-events-none absolute bottom-0 z-[30] hero-shape-divider hero-shape-divider--viewport"
      style={{ height: 'calc(11vh + 44px)' }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 h-full w-full text-background"
        viewBox="-40 0 1280 200"
        preserveAspectRatio="none"
      >
        {layers.map((l, i) => (
          <path
            key={i}
            fill="currentColor"
            fillOpacity={l.op}
            transform={`translate(${l.tx} ${l.ty})`}
            d={baseD}
          />
        ))}
      </svg>
    </div>
  )
}

export const SuperheroHero: React.FC<SuperheroHeroProps> = ({
  variant: variantProp,
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  media,
  foregroundImage,
  backgroundImage,
  marqueeHeadline,
  marqueeLogos,
  floatingElements,
  sectionAriaLabel,
  dataHeroType,
  pageSlug,
  mediaType,
  mediaTypeMobile,
  backgroundPreset,
  overlayOpacity,
  backgroundVideo,
  surfacePattern,
  stackBackImage,
  stackBackOffsetX,
  stackBackOffsetY,
  stackMidImage,
  stackMidOffsetX,
  stackMidOffsetY,
  stackFrontImage,
  stackFrontOffsetX,
  stackFrontOffsetY,
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const portraitRef = React.useRef<HTMLDivElement | null>(null)

  const variant: 'popout' | 'profil' | 'standard' =
    variantProp ??
    ((pageSlug ?? '').replace(/^\/+|\/+$/g, '').toLowerCase() === 'profil' ? 'profil' : 'popout')
  const isProfilVariant = variant === 'profil'

  const effectiveMediaType: string = (() => {
    if (isMobile && mediaTypeMobile && mediaTypeMobile !== 'auto') return mediaTypeMobile
    return mediaType ?? 'cssHalo'
  })()

  React.useEffect(() => {
    if (!isMobile || prefersReducedMotion) return

    const target = portraitRef.current
    if (!target) return

    let rafId = 0
    const maxOffset = 28

    const updateTransform = () => {
      const scrollTop = window.scrollY
      const offset = Math.max(-maxOffset, Math.min(0, -scrollTop * 0.08))
      target.style.setProperty('--hero-mobile-portrait-translate', `${offset}px`)
      rafId = 0
    }

    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateTransform)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateTransform()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
      target.style.removeProperty('--hero-mobile-portrait-translate')
    }
  }, [isMobile, prefersReducedMotion])

  React.useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    const section = sectionRef.current
    const target = portraitRef.current
    if (!section || !target) return

    let rafId: number | null = null
    const collapseDistance = 320
    const maxTranslate = 360
    const maxBlur = 24

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const update = () => {
      const rect = section.getBoundingClientRect()
      const progress = clamp(-rect.top / collapseDistance, 0, 1)
      const eased = Math.pow(progress, 1.75)

      const translateY = eased * maxTranslate + progress * 60
      const blur = eased * maxBlur
      const opacity = clamp(1 - eased * 1.3, 0, 1)

      target.style.setProperty('--hero-desktop-portrait-translate', `${translateY}px`)
      target.style.setProperty('--hero-desktop-portrait-blur', `${blur}px`)
      target.style.setProperty('--hero-desktop-portrait-opacity', `${opacity}`)

      rafId = null
    }

    const handleScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
      target.style.removeProperty('--hero-desktop-portrait-translate')
      target.style.removeProperty('--hero-desktop-portrait-blur')
      target.style.removeProperty('--hero-desktop-portrait-opacity')
    }
  }, [isMobile, prefersReducedMotion])

  const mediaSrc = resolveHeroImageSrc(media)
  const fgSrc = resolveHeroImageSrc(foregroundImage)
  const bgSrc = resolveHeroImageSrc(backgroundImage)
  const videoSrc = resolveHeroImageSrc(backgroundVideo)
  const stackBackSrc = resolveHeroImageSrc(stackBackImage)
  const stackMidSrc = resolveHeroImageSrc(stackMidImage)
  const stackFrontSrc = resolveHeroImageSrc(stackFrontImage)

  const showPresetLayer =
    (effectiveMediaType === 'cssHalo' || effectiveMediaType === 'animation') &&
    backgroundPreset != null &&
    typeof backgroundPreset === 'object'
  const showBgImage = effectiveMediaType === 'image' && Boolean(bgSrc)
  const showVideo = effectiveMediaType === 'video' && Boolean(videoSrc) && !prefersReducedMotion
  const overlayOp = overlayOpacity ?? 0.5
  const patternClass =
    surfacePattern && surfacePattern !== 'none' ? (PATTERN_CLASS[surfacePattern] ?? '') : ''

  const headlineLines: string[] = (() => {
    if (headline) return headline.split('\n').filter(Boolean)
    return [headlineLine1, headlineLine2, headlineLine3].filter((l): l is string => Boolean(l))
  })()
  const headlineRevealMs = getScrambleLinesRevealDurationMs(
    headlineLines.map((line, i) => ({ text: line, delayMs: i * 120 })),
  )
  const subheadlineFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 0)
  const descriptionFadeStyle = buildHeroCopyFadeStyle(headlineRevealMs, 140)

  const ctaLinks = (links ?? []).filter((e) => Boolean(e?.link?.label)).slice(0, 2)
  const portraitSrc = mediaSrc || fgSrc

  const profilLayers = buildStackLayers([
    {
      src: stackBackSrc || bgSrc || mediaSrc || FALLBACK_BACK,
      ox: toPx(stackBackOffsetX),
      oy: toPx(stackBackOffsetY),
      wide: true,
    },
    { src: stackMidSrc, ox: toPx(stackMidOffsetX), oy: toPx(stackMidOffsetY) },
    {
      src: stackFrontSrc || fgSrc || FALLBACK_FRONT,
      ox: toPx(stackFrontOffsetX),
      oy: toPx(stackFrontOffsetY),
    },
  ])

  const popoutLayers = buildStackLayers([
    { src: stackBackSrc, ox: toPx(stackBackOffsetX), oy: toPx(stackBackOffsetY), wide: true },
    { src: stackMidSrc, ox: toPx(stackMidOffsetX), oy: toPx(stackMidOffsetY) },
    {
      src: stackFrontSrc || fgSrc || mediaSrc,
      ox: toPx(stackFrontOffsetX),
      oy: toPx(stackFrontOffsetY),
      wide: false,
    },
  ])

  const hasPopoutStack = popoutLayers.length > 0
  const floats = filterPopoutFloatingElements(floatingElements)
  const sectionLabel = isProfilVariant ? 'Profil Hero' : (sectionAriaLabel ?? 'Hero')
  const hasVisual = isProfilVariant
    ? profilLayers.length > 0
    : hasPopoutStack || Boolean(portraitSrc)

  return (
    <section
      ref={sectionRef}
      aria-label={sectionLabel}
      className={cn(
        'hero-offset relative overflow-visible text-foreground',
        isProfilVariant ? 'profil-hero-paper' : 'bg-background hero-offset--popout',
      )}
      data-hero-variant={variant}
      data-hero-type={!isProfilVariant ? (dataHeroType ?? 'superhero') : undefined}
    >
      {showPresetLayer && <HeroBackgroundPresetLayer preset={backgroundPreset as HeroBackground} />}

      {showBgImage && bgSrc && (
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover"
        />
      )}

      {showVideo && videoSrc && (
        <video
          className={cn(
            'pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover',
            showBgImage ? 'hidden md:block' : 'block',
          )}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          title="Hero Hintergrundvideo"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {patternClass && <div className={patternClass} aria-hidden />}

      {showBgImage && (
        <>
          <div
            className="pointer-events-none absolute inset-0 -z-[5] bg-background md:hidden"
            style={{ opacity: Math.min(overlayOp + 0.15, 0.85) }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 -z-[5] hidden bg-background md:block"
            style={{ opacity: overlayOp }}
            aria-hidden
          />
        </>
      )}

      {!isProfilVariant && (
        <>
          <div className="hero-section-surface" aria-hidden />
          <div
            className={cn(
              'hero-background-overlay hero-background-overlay--style-preview-stack',
              portraitSrc && 'hero-background-overlay--style-preview-portrait',
              showBgImage && 'opacity-40',
            )}
            aria-hidden
          />
          <div
            className="hero-section-foreground-tint hero-section-foreground-tint--above-decor"
            aria-hidden
          />
          <div
            className="hero-popout-structure-layer pointer-events-none absolute inset-0 z-[1]"
            aria-hidden
          />
        </>
      )}

      <div
        className={cn(
          'relative z-[2] container flex w-full min-w-0 flex-col px-4 pb-14 md:pb-24 lg:pb-28',
          isProfilVariant
            ? 'pt-3 sm:pt-4 md:pt-2 lg:pt-3 xl:pt-4'
            : 'pt-8 sm:pt-10 md:pt-6 lg:pt-8 xl:pt-10',
        )}
      >
        <div className="grid min-w-0 gap-0 md:grid-cols-[minmax(0,45%)_1fr] md:items-end md:gap-6 lg:gap-12 xl:gap-16">
          <div
            className={cn(
              'relative min-w-0 space-y-5 max-md:z-[16] md:min-h-0 lg:min-h-[min(62vh,680px)]',
              isProfilVariant
                ? 'max-md:pt-3 max-md:pb-2'
                : 'hero-mobile-glass max-md:-mx-4 max-md:rounded-t-2xl max-md:px-4 max-md:pt-8 max-md:pb-10 max-md:-mt-[min(24vw,9.5rem)]',
            )}
          >
            {subheadline && (
              <p
                className="inline-flex w-fit items-center rounded-full border border-border bg-card px-1.5 py-px text-[10px] font-medium uppercase leading-tight tracking-[0.1em] hero-subheading-contrast hero-blurry-fade-in hero-blurry-fade-in--subheading"
                style={subheadlineFadeStyle}
              >
                {subheadline}
              </p>
            )}

            {headlineLines.length > 0 && (
              <h1 className="text-pretty text-hero-display hero-heading-gradient tracking-tight">
                {headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    <ScrambleText text={line} delayMs={i * 120} disableAnimation={isMobile} />
                  </span>
                ))}
              </h1>
            )}

            {description && (
              <p
                className="max-w-2xl text-base leading-relaxed hero-content-contrast md:text-lg hero-blurry-fade-in hero-blurry-fade-in--description"
                style={descriptionFadeStyle}
              >
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

            {!isProfilVariant && floats.length > 0 && (
              <PopoutHeroFloatingElementsFlow elements={floats} />
            )}

            {!isProfilVariant && (
              <HeroLogoMarquee
                marqueeHeadline={marqueeHeadline}
                marqueeLogos={marqueeLogos}
                className="mt-1 pt-3 border-t border-border/60"
              />
            )}
          </div>

          <div
            ref={portraitRef}
            className={cn(
              'relative min-w-0 pt-0 order-first max-md:z-[6] max-md:mb-5 md:order-none md:mb-0 md:pl-4 md:self-end hero-desktop-parallax-portrait',
              !isProfilVariant && 'hero-mobile-sticky-portrait',
              hasPopoutStack && 'hero-desktop-parallax-portrait--stack',
            )}
          >
            <div className="relative overflow-visible max-md:pb-6 md:flex md:items-end md:justify-center md:pb-8 md:pt-4">
              {hasVisual && <div className="hero-portrait-gradient-blob" aria-hidden />}

              {isProfilVariant ? (
                <PopoutHeroStackVisual layers={profilLayers} className="relative z-[1]" />
              ) : hasPopoutStack ? (
                <div className="relative z-[1] mx-auto w-full max-w-[min(100%,556px)] md:flex md:max-w-none md:items-end md:justify-center">
                  <PopoutHeroStackVisual layers={popoutLayers} />
                </div>
              ) : portraitSrc ? (
                <div className="relative z-[1] mx-auto w-full max-w-[min(100%,556px)] md:flex md:max-w-none md:items-end md:justify-center">
                  <PopoutPortrait imageSrc={portraitSrc} fillRowHeight />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                  Kein Hero-Bild gesetzt. Im Backend &quot;Media&quot; oder &quot;Vordergrund
                  Bild&quot; befüllen.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isProfilVariant && floats.length > 0 && (
        <PopoutHeroFloatingElementsAbsolute elements={floats} />
      )}

      {isProfilVariant && <ProfilShapeDivider />}
    </section>
  )
}
