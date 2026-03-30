'use client'

import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { type ComponentProps, useEffect, useMemo, useState } from 'react'
import PopoutPortrait from '@/components/PopoutPortrait'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import {
  filterPopoutFloatingElements,
  PopoutHeroFloatingElementsAbsolute,
  PopoutHeroFloatingElementsFlow,
  type PopoutHeroFloatingItem,
} from '@/heros/PopoutHeroFloatingElements'
import {
  PopoutHeroStackVisual,
  type HeroStackResolvedLayer,
} from '@/heros/PopoutHeroStackVisual'
import type { HeroBackgrounds } from '@/payload-types'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'

type CMSLinkProps = ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<
    CMSLinkProps,
    'url' | 'label' | 'appearance' | 'newTab' | 'type' | 'reference'
  >
}

interface StylePreviewHeroProps {
  subheadline?: string | null
  headline?: string | null
  headlineLine1?: string | null
  headlineLine2?: string | null
  headlineLine3?: string | null
  description?: string | null
  links?: LinkItem[] | null
  media?: number | { id?: number | null; url?: string | null; alt?: string | null } | null
  /** Philipp-Bacher-Typ im CMS: Popout-Bild liegt hier statt in „Media“. */
  foregroundImage?: number | { id?: number | null; url?: string | null; alt?: string | null } | null
  /** Popout-Hero mit mediaType „Bild“: wird auf der Profilseite hinter dem Vordergrund-Motiv genutzt. */
  backgroundImage?: number | { id?: number | null; url?: string | null; alt?: string | null } | null
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null
  floatingElements?: PopoutHeroFloatingItem[] | null
  /** Overrides default section aria-label (e.g. Superhero). */
  sectionAriaLabel?: string | null
  /** e.g. `superhero` for analytics / debugging */
  dataHeroType?: string | null
  /** Resolved site-page slug from server rendering. */
  pageSlug?: string | null
  mediaType?: ('cssHalo' | 'image' | 'video' | 'animation') | null
  mediaTypeMobile?: ('auto' | 'cssHalo' | 'image' | 'video' | 'animation') | null
  backgroundPreset?: HeroBackgrounds | number | null
  overlayOpacity?: number | null
  backgroundVideo?: number | { id?: number | null; url?: string | null } | null
  surfacePattern?:
    | ('none' | 'honeycomb' | 'checker' | 'mmPaper' | 'dots' | 'linesHorizontal' | 'linesVertical' | 'gridLines')
    | null
  stackBackImage?: number | { id?: number | null; url?: string | null } | null
  stackBackOffsetX?: number | null
  stackBackOffsetY?: number | null
  stackMidImage?: number | { id?: number | null; url?: string | null } | null
  stackMidOffsetX?: number | null
  stackMidOffsetY?: number | null
  stackFrontImage?: number | { id?: number | null; url?: string | null } | null
  stackFrontOffsetX?: number | null
  stackFrontOffsetY?: number | null
}

const defaultSubheadline = 'Style Concept Test'
const defaultHeadline = 'Einheitlicher Look fuer die gesamte Seite'
const defaultDescription =
  'Dieser Hero ist bewusst isoliert, damit Typografie, Farben, Radius und CTA-Hierarchie getestet werden koennen, ohne bestehende Komponenten zu veraendern.'

/** Quelle: https://philippbacher.com/portfolio/ (Lazy-Load data-src / gleiche Assets) */
const PORTFOLIO_CLOUD_SRC =
  'https://philippbacher.com/wp-content/uploads/2026/02/powderparty.png'
const PORTFOLIO_SKI_SRC = 'https://philippbacher.com/wp-content/uploads/2026/02/skijump-1.png'

/**
 * S-förmige Welle: links oben (y≈50) → rechts unten (y≈150) = ~50 % der ViewBox-Höhe (200).
 * Mehrere Pfade mit Versatz → Fächereffekt. Full-bleed über Wrapper (w-screen, zentriert).
 */
const HERO_SURFACE_PATTERN_CLASS: Record<
  NonNullable<StylePreviewHeroProps['surfacePattern']>,
  string
> = {
  none: '',
  honeycomb: 'hero-surface-pattern hero-surface-pattern--honeycomb',
  checker: 'hero-surface-pattern hero-surface-pattern--checker',
  mmPaper: 'hero-surface-pattern hero-surface-pattern--mmPaper',
  dots: 'hero-surface-pattern hero-surface-pattern--dots',
  linesHorizontal: 'hero-surface-pattern hero-surface-pattern--linesHorizontal',
  linesVertical: 'hero-surface-pattern hero-surface-pattern--linesVertical',
  gridLines: 'hero-surface-pattern hero-surface-pattern--gridLines',
}

function buildHeroStackLayers(
  specs: Array<{ src: string | null; ox: number; oy: number; wide?: boolean }>,
): HeroStackResolvedLayer[] {
  const out: HeroStackResolvedLayer[] = []
  let order = 0
  for (const s of specs) {
    if (!s.src) continue
    out.push({
      src: s.src,
      offsetX: s.ox,
      offsetY: s.oy,
      z: order,
      wide: s.wide,
    })
    order += 1
  }
  return out
}

function ProfilHeroShapeDivider() {
  const baseD =
    'M0,50 C360,22 640,178 960,102 C1080,72 1140,148 1200,150 L1200,200 L0,200 Z'
  const layers: { tx: number; ty: number; opacity: number }[] = [
    { tx: 16, ty: -6, opacity: 0.08 },
    { tx: 32, ty: -12, opacity: 0.12 },
    { tx: 48, ty: -18, opacity: 0.18 },
    { tx: 64, ty: -24, opacity: 0.28 },
    { tx: 80, ty: -30, opacity: 0.4 },
    { tx: 0, ty: 0, opacity: 0.9 },
  ]

  return (
    <div
      className="pointer-events-none absolute bottom-0 z-[30] hero-shape-divider hero-shape-divider--viewport"
      style={{ height: 'calc(11vh + 44px)' }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 h-full w-full text-background"
        viewBox="-40 0 1280 200"
        preserveAspectRatio="none"
      >
        {layers.map((w, i) => (
          <path
            key={i}
            fill="currentColor"
            fillOpacity={w.opacity}
            transform={`translate(${w.tx} ${w.ty})`}
            d={baseD}
          />
        ))}
      </svg>
    </div>
  )
}

function numPx(v: unknown): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : 0
}

export const StylePreviewHero: React.FC<StylePreviewHeroProps> = ({
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
  const pathname = usePathname()
  const pathNorm = (pathname ?? '/').replace(/\/$/, '') || '/'
  const pageSlugNorm = (pageSlug ?? '').trim().replace(/^\/+|\/+$/g, '')
  const isProfilPage = pathNorm === '/profil' || pageSlugNorm.toLowerCase() === 'profil'

  const [viewportMobile, setViewportMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setViewportMobile(mq.matches)
      setReducedMotion(rm.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    rm.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      rm.removeEventListener('change', sync)
    }
  }, [])

  const effectiveMediaType = useMemo(() => {
    const mob = mediaTypeMobile
    if (viewportMobile && mob && mob !== 'auto') return mob
    return mediaType ?? 'cssHalo'
  }, [mediaType, mediaTypeMobile, viewportMobile])

  const showPresetLayer =
    (effectiveMediaType === 'cssHalo' || effectiveMediaType === 'animation') &&
    backgroundPreset != null &&
    typeof backgroundPreset === 'object'

  const fullBleedBgSrc = resolveHeroImageSrc(backgroundImage)
  const showBgImage = effectiveMediaType === 'image' && Boolean(fullBleedBgSrc)
  const videoSrc = resolveHeroImageSrc(backgroundVideo)
  const showVideo = effectiveMediaType === 'video' && Boolean(videoSrc) && !reducedMotion

  const patternKey = surfacePattern ?? 'none'
  const patternClass =
    patternKey !== 'none' ? (HERO_SURFACE_PATTERN_CLASS[patternKey] ?? '') : ''

  const overlayOp = overlayOpacity ?? 0.5
  const mobileOverlayOp = Math.min(overlayOp + 0.15, 0.85)

  const lines = [headlineLine1, headlineLine2, headlineLine3].filter(
    (l): l is string => Boolean(l),
  )
  const resolvedHeadline = lines.length > 0 ? null : (headline || defaultHeadline)
  const ctaLinks = Array.isArray(links) ? links.filter((entry) => Boolean(entry?.link?.label)) : []
  const portraitSrc =
    resolveHeroImageSrc(media) || resolveHeroImageSrc(foregroundImage)
  const floats = filterPopoutFloatingElements(floatingElements)

  const profilBackgroundSrc =
    resolveHeroImageSrc(backgroundImage) || resolveHeroImageSrc(media)
  const profilForegroundSrc = resolveHeroImageSrc(foregroundImage)

  const stackBack = resolveHeroImageSrc(stackBackImage)
  const stackMid = resolveHeroImageSrc(stackMidImage)
  const stackFrontOnly = resolveHeroImageSrc(stackFrontImage)

  const oxBack = numPx(stackBackOffsetX)
  const oyBack = numPx(stackBackOffsetY)
  const oxMid = numPx(stackMidOffsetX)
  const oyMid = numPx(stackMidOffsetY)
  const oxFront = numPx(stackFrontOffsetX)
  const oyFront = numPx(stackFrontOffsetY)

  const profilLayers = useMemo(
    () =>
      buildHeroStackLayers([
        {
          src: stackBack || profilBackgroundSrc || PORTFOLIO_CLOUD_SRC,
          ox: oxBack,
          oy: oyBack,
          wide: true,
        },
        { src: stackMid, ox: oxMid, oy: oyMid, wide: false },
        {
          src: stackFrontOnly || profilForegroundSrc || PORTFOLIO_SKI_SRC,
          ox: oxFront,
          oy: oyFront,
          wide: false,
        },
      ]),
    [
      stackBack,
      stackMid,
      stackFrontOnly,
      profilBackgroundSrc,
      profilForegroundSrc,
      oxBack,
      oyBack,
      oxMid,
      oyMid,
      oxFront,
      oyFront,
    ],
  )

  const popoutStackExplicit = Boolean(stackBack || stackMid || stackFrontOnly)

  const popoutLayers = useMemo(() => {
    const front =
      stackFrontOnly ||
      resolveHeroImageSrc(foregroundImage) ||
      resolveHeroImageSrc(media)
    return buildHeroStackLayers([
      { src: stackBack, ox: oxBack, oy: oyBack, wide: true },
      { src: stackMid, ox: oxMid, oy: oyMid, wide: false },
      { src: front, ox: oxFront, oy: oyFront, wide: false },
    ])
  }, [
    stackBack,
    stackMid,
    stackFrontOnly,
    foregroundImage,
    media,
    oxBack,
    oyBack,
    oxMid,
    oyMid,
    oxFront,
    oyFront,
  ])

  const usePopoutStack = popoutStackExplicit && popoutLayers.length > 0

  const sectionLabel = isProfilPage
    ? 'Profil Hero'
    : (sectionAriaLabel ?? 'Hero')

  return (
    <section
      aria-label={sectionLabel}
      className={cn(
        'hero-offset relative overflow-visible text-foreground',
        isProfilPage ? 'profil-hero-paper' : 'bg-background hero-offset--popout',
      )}
      data-profil-hero={isProfilPage ? 'true' : undefined}
      data-hero-type={!isProfilPage && dataHeroType ? dataHeroType : undefined}
    >
      {showPresetLayer ? <HeroBackgroundPresetLayer preset={backgroundPreset} /> : null}
      {showBgImage && fullBleedBgSrc ? (
        <Image
          src={fullBleedBgSrc}
          alt=""
          fill
          className="pointer-events-none absolute inset-0 -z-10 object-cover"
          sizes="100vw"
          priority
        />
      ) : null}
      {showVideo && videoSrc ? (
        <video
          className={`pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover ${
            showBgImage ? 'hidden md:block' : 'block'
          }`}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          title="Hero Hintergrundvideo"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      {patternClass ? <div className={patternClass} aria-hidden /> : null}
      {showBgImage ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 -z-[5] bg-background md:hidden"
            style={{ opacity: mobileOverlayOp }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 -z-[5] hidden bg-background md:block"
            style={{ opacity: overlayOp }}
            aria-hidden
          />
        </>
      ) : null}
      {!isProfilPage ? (
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
          <div className="hero-section-foreground-tint hero-section-foreground-tint--above-decor" aria-hidden />
          <div className="hero-popout-structure-layer pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        </>
      ) : null}
      <div className="relative z-[2] container flex w-full min-w-0 flex-col px-4 pt-8 pb-14 sm:pt-10 md:pt-6 md:pb-24 lg:pt-8 lg:pb-28 xl:pt-10">
        <div className="grid min-w-0 gap-0 md:grid-cols-[minmax(0,45%)_1fr] md:items-stretch md:gap-6 md:min-h-[min(58vh,640px)] lg:gap-12 lg:min-h-[min(62vh,680px)] xl:gap-16">
          <div
            className={cn(
              'hero-mobile-glass relative min-w-0 space-y-5 max-md:z-[16] max-md:-mx-4 max-md:px-4 max-md:pt-8 max-md:pb-10 max-md:rounded-t-2xl',
              !isProfilPage && 'max-md:-mt-[min(40vw,13.5rem)]',
            )}
          >
            <div className="flex flex-col gap-1">
              <p className="inline-flex w-fit items-center rounded-full border border-border bg-card px-1.5 py-px text-[10px] font-medium uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {subheadline || defaultSubheadline}
              </p>
              <h1 className="text-pretty text-hero-display hero-heading-gradient tracking-tight">
                {lines.length > 0
                  ? lines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))
                  : resolvedHeadline}
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
                    reference={item?.link?.reference}
                    label={item?.link?.label}
                    newTab={item?.link?.newTab}
                    appearance={item?.link?.appearance || (index === 0 ? 'default' : 'outline')}
                    className="rounded-[var(--style-radius-l)]"
                  />
                ))}
              </div>
            ) : null}

            {!isProfilPage && floats.length > 0 ? (
              <PopoutHeroFloatingElementsFlow elements={floats} />
            ) : null}

            {!isProfilPage ? (
              <HeroLogoMarquee
                marqueeHeadline={marqueeHeadline}
                marqueeLogos={marqueeLogos}
                className="mt-1 pt-3 border-t border-border/60"
              />
            ) : null}
          </div>

          <div className="relative min-w-0 pt-0 order-first max-md:z-[6] max-md:mb-5 md:order-none md:mb-0 md:pl-4 md:h-full md:min-h-[min(58vh,640px)] lg:min-h-[min(62vh,680px)]">
            <div className="relative overflow-visible max-md:pb-6 md:flex md:h-full md:min-h-0 md:items-end md:justify-center md:pb-8 md:pt-4">
              {isProfilPage ? (
                <PopoutHeroStackVisual layers={profilLayers} />
              ) : usePopoutStack ? (
                <div className="relative mx-auto w-full max-w-[min(100%,556px)] md:flex md:h-full md:max-h-full md:min-h-0 md:max-w-none md:items-end md:justify-center lg:origin-bottom lg:scale-[1.21]">
                  <PopoutHeroStackVisual layers={popoutLayers} />
                </div>
              ) : portraitSrc ? (
                <div className="relative mx-auto w-full max-w-[min(100%,556px)] md:flex md:h-full md:max-h-full md:min-h-0 md:max-w-none md:items-end md:justify-center lg:origin-bottom lg:scale-[1.21]">
                  <PopoutPortrait imageSrc={portraitSrc} fillRowHeight />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                  Kein Hero-Bild gesetzt. Im Backend „Media / Hintergrundbild“ (Style Preview) oder
                  „Vordergrund Bild“ (Superhero / Legacy Philipp Bacher) befüllen.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isProfilPage && floats.length > 0 ? (
        <PopoutHeroFloatingElementsAbsolute elements={floats} />
      ) : null}
      {isProfilPage ? <ProfilHeroShapeDivider /> : null}
    </section>
  )
}
