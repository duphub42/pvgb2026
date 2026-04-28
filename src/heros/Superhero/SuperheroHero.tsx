'use client'

import { CMSLink } from '@/components/Link'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { Badge } from '@/components/ui/badge'
import {
  Award,
  BarChart2,
  Briefcase,
  Clock,
  Globe,
  Rocket,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CMSLinkProps = React.ComponentProps<typeof CMSLink>
type HeadlineSegment = {
  text: string
  decode: boolean
}

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
  contentVerticalAlignment?: 'top' | 'center' | 'bottom' | null
  links?: LinkItem[] | null

  // ─── Media ─────────────────────────────────────────────────────────────────
  media?: MediaRef
  backgroundImage?: MediaRef

  // ─── Marquee ───────────────────────────────────────────────────────────────
  marqueeHeadline?: string | null
  marqueeLogos?: HeroMarqueeLogoRow[] | null

  // ─── Stats ─────────────────────────────────────────────────────────────────
  showHeroStats?: boolean | null
  stats?: Array<{ id?: string | null; icon?: string | null; value: string; label: string }> | null

  // ─── Meta ─────────────────────────────────────────────────────────────────
  sectionAriaLabel?: string | null
  dataHeroType?: string | null
  pageSlug?: string | null
}

const DECODE_TAG_PATTERN = /<decode>([\s\S]*?)<\/decode>/gi

function parseDecodeSegments(line: string): HeadlineSegment[] {
  const segments: HeadlineSegment[] = []
  let lastIndex = 0

  line.replace(DECODE_TAG_PATTERN, (fullMatch, innerText: string, matchOffset: number) => {
    if (matchOffset > lastIndex) {
      segments.push({
        text: line.slice(lastIndex, matchOffset),
        decode: false,
      })
    }

    segments.push({
      text: innerText ?? '',
      decode: true,
    })

    lastIndex = matchOffset + fullMatch.length
    return fullMatch
  })

  if (lastIndex < line.length) {
    segments.push({
      text: line.slice(lastIndex),
      decode: false,
    })
  }

  if (segments.length === 0) {
    return [{ text: line, decode: false }]
  }

  return segments
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
  contentVerticalAlignment,
  links,
  media,
  backgroundImage,
  marqueeHeadline,
  marqueeLogos,
  showHeroStats,
  stats,
  sectionAriaLabel,
  dataHeroType,
}) => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const portraitRef = React.useRef<HTMLDivElement | null>(null)
  const [decodeReady, setDecodeReady] = React.useState(false)
  const [decodeInView, setDecodeInView] = React.useState(false)
  const [bgImageFailed, setBgImageFailed] = React.useState(false)

  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const host = section.closest('article')
    const nextSection = host?.querySelector<HTMLElement>('.hero-following-section-mask') ?? null

    let rafId = 0
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
    let lastProgress = ''
    let lastContentProgress = ''
    let lastPortraitParallaxProgress = ''
    let lastPortraitHideProgress = ''
    let lastPortraitHardHideProgress = ''

    section.setAttribute('data-hero-intro', 'done')
    if (host) host.setAttribute('data-hero-intro', 'done')

    const updateScrollProgress = () => {
      rafId = 0
      const rect = section.getBoundingClientRect()
      const heroHeight = Math.max(rect.height, 1)
      const scrollDistance = Math.max(heroHeight * 0.92, window.innerHeight * 0.72)
      const progress = clamp01(-rect.top / scrollDistance)
      const contentProgress = clamp01((progress - 0.08) / 0.92)
      const portraitParallaxProgress = clamp01(1 - Math.pow(1 - progress, 4.2))

      // Portrait muss spätestens verschwinden, wenn die nächste Section die untere Viewportkante erreicht.
      // Startet aber erst kurz davor, damit das Portrait im initialen Zustand scharf bleibt.
      const viewportHeight = Math.max(window.innerHeight, 1)
      const nextSectionTop = nextSection?.getBoundingClientRect().top ?? rect.bottom
      const hideStartOffset = Math.min(Math.max(viewportHeight * 0.1, 80), 150)
      const hideStartTop = viewportHeight + hideStartOffset
      const hideLinearProgress = clamp01((hideStartTop - nextSectionTop) / hideStartOffset)
      const portraitHideProgress = clamp01(Math.pow(hideLinearProgress, 3.2))
      const portraitHardHideProgress = portraitHideProgress
      const progressStr = progress.toFixed(4)
      const contentProgressStr = contentProgress.toFixed(4)
      const portraitParallaxProgressStr = portraitParallaxProgress.toFixed(4)
      const portraitHideProgressStr = portraitHideProgress.toFixed(4)
      const portraitHardHideProgressStr = portraitHardHideProgress.toFixed(4)

      if (
        progressStr === lastProgress &&
        contentProgressStr === lastContentProgress &&
        portraitParallaxProgressStr === lastPortraitParallaxProgress &&
        portraitHideProgressStr === lastPortraitHideProgress &&
        portraitHardHideProgressStr === lastPortraitHardHideProgress
      ) {
        return
      }

      lastProgress = progressStr
      lastContentProgress = contentProgressStr
      lastPortraitParallaxProgress = portraitParallaxProgressStr
      lastPortraitHideProgress = portraitHideProgressStr
      lastPortraitHardHideProgress = portraitHardHideProgressStr

      section.style.setProperty('--hero-scroll-progress', progressStr)
      section.style.setProperty('--hero-scroll-content-progress', contentProgressStr)
      section.style.setProperty(
        '--hero-scroll-portrait-parallax-progress',
        portraitParallaxProgressStr,
      )
      section.style.setProperty('--hero-scroll-portrait-hide-progress', portraitHideProgressStr)
      section.style.setProperty(
        '--hero-scroll-portrait-hard-hide-progress',
        portraitHardHideProgressStr,
      )
      if (host) {
        host.style.setProperty('--hero-scroll-progress', progressStr)
        host.style.setProperty('--hero-scroll-content-progress', contentProgressStr)
      }
    }

    const requestUpdate = () => {
      if (rafId !== 0) return
      rafId = window.requestAnimationFrame(updateScrollProgress)
    }

    updateScrollProgress()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('orientationchange', requestUpdate)

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('orientationchange', requestUpdate)
      section.style.removeProperty('--hero-scroll-progress')
      section.style.removeProperty('--hero-scroll-content-progress')
      section.style.removeProperty('--hero-scroll-portrait-parallax-progress')
      section.style.removeProperty('--hero-scroll-portrait-hide-progress')
      section.style.removeProperty('--hero-scroll-portrait-hard-hide-progress')
      section.removeAttribute('data-hero-intro')
      if (host) {
        host.style.removeProperty('--hero-scroll-progress')
        host.style.removeProperty('--hero-scroll-content-progress')
        host.style.removeProperty('--hero-scroll-portrait-parallax-progress')
        host.style.removeProperty('--hero-scroll-portrait-hide-progress')
        host.style.removeProperty('--hero-scroll-portrait-hard-hide-progress')
        host.removeAttribute('data-hero-intro')
      }
    }
  }, [])

  const mediaSrc = resolveHeroImageSrc(media)
  const bgSrc = resolveHeroImageSrc(backgroundImage)
  const hasRenderableBg = Boolean(bgSrc) && !bgImageFailed
  const renderBgSrc = hasRenderableBg ? bgSrc : null

  React.useEffect(() => {
    setBgImageFailed(false)
  }, [bgSrc])

  // Fokuspunkt für Hintergrundbild:
  // Payload kann je nach Adapter/Version entweder 0..1 oder 0..100 liefern.
  const bgFocus = React.useMemo(() => {
    let focalX: number | null = null
    let focalY: number | null = null

    if (typeof backgroundImage === 'object' && backgroundImage !== null) {
      focalX = backgroundImage.focalX ?? null
      focalY = backgroundImage.focalY ?? null
    }

    const hasPercentageLikeValues = [focalX, focalY].some(
      (v) => typeof v === 'number' && Number.isFinite(v) && v > 1,
    )

    const toPercent = (value: number | null, fallbackPercent: number): number => {
      if (typeof value !== 'number' || !Number.isFinite(value)) return fallbackPercent
      if (hasPercentageLikeValues) return Math.min(100, Math.max(0, value))
      return Math.min(1, Math.max(0, value)) * 100
    }

    const x = toPercent(focalX, 50)
    const y = toPercent(focalY, 50)

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
  const parsedHeadlineLines = React.useMemo(
    () => headlineLines.map((line) => parseDecodeSegments(line)),
    [headlineLines],
  )
  const shouldRenderBgImage = hasRenderableBg
  const hasDecodeTags = React.useMemo(
    () =>
      parsedHeadlineLines.some((lineSegments) =>
        lineSegments.some((segment) => segment.decode && segment.text.trim().length > 0),
      ),
    [parsedHeadlineLines],
  )
  const decodeAnimationEnabled = hasDecodeTags
  const decodeAnimationActive = decodeAnimationEnabled && decodeReady && decodeInView

  React.useEffect(() => {
    if (!decodeAnimationEnabled) return

    const section = sectionRef.current
    if (!section) return

    let timeoutId = 0
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setDecodeInView(true)
        observer.disconnect()
      },
      {
        threshold: 0.4,
      },
    )

    observer.observe(section)
    timeoutId = window.setTimeout(() => {
      setDecodeReady(true)
    }, 6000)

    return () => {
      observer.disconnect()
      if (timeoutId !== 0) window.clearTimeout(timeoutId)
    }
  }, [decodeAnimationEnabled])

  const ctaLinks = (links ?? []).filter((e) => Boolean(e?.link?.label)).slice(0, 2)
  const portraitSrc = mediaSrc
  const heroDescription = React.useMemo(() => {
    if (!description || typeof description !== 'string') return null
    const trimmed = description.trim()
    return trimmed || null
  }, [description])

  // Mirror HeroLogoMarquee.showBand logic to suppress stats when marquee is active.
  const hasMarquee =
    Boolean(marqueeHeadline?.trim()) || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)
  const statIconMap: Record<string, LucideIcon> = {
    TrendingUp,
    Users,
    Star,
    Zap,
    Target,
    Award,
    BarChart2,
    Clock,
    Globe,
    Rocket,
    Shield,
    Briefcase,
  }
  const showStats =
    showHeroStats === true && Array.isArray(stats) && stats.length > 0 && !hasMarquee
  const normalizedContentVerticalAlignment =
    contentVerticalAlignment === 'top' || contentVerticalAlignment === 'bottom'
      ? contentVerticalAlignment
      : 'center'
  const effectiveContentVerticalAlignment = portraitSrc
    ? normalizedContentVerticalAlignment
    : 'bottom'

  const getMobileShortCtaLabel = (index: number, fullLabel: string): string => {
    void index

    const firstWord = fullLabel.trim().split(/\s+/)[0]
    return firstWord || fullLabel
  }

  const heroLayerClass = 'hero-scroll-layer'
  const heroContentClass = cn(
    'hero-scroll-content relative container z-[40] flex w-full min-w-0 flex-col px-[clamp(1rem,4vw,2rem)] pb-[clamp(3rem,8vh,7rem)] pt-[clamp(1.5rem,6vh,2.5rem)]',
    !portraitSrc && 'hero-scroll-content--no-portrait',
  )
  const heroMainClass = cn(
    'hero-scroll-content-main grid min-w-0 gap-0 overflow-visible md:items-start max-md:flex max-md:flex-col',
    portraitSrc
      ? 'md:grid-cols-1'
      : 'md:grid-cols-1 md:max-w-3xl hero-scroll-content-main--no-portrait',
  )
  const heroCopyClass = cn(
    'hero-scroll-content-copy relative min-w-0 flex flex-col overflow-visible space-y-[clamp(1rem,2.5vh,1.5rem)] max-md:z-[16] max-md:flex-shrink-0 max-md:h-auto md:relative md:z-[20] md:min-h-0 md:max-w-3xl lg:min-h-[clamp(400px,62vh,680px)]',
    'max-md:order-2',
    portraitSrc &&
      'hero-mobile-glass max-md:-mx-4 max-md:rounded-t-2xl max-md:px-4 max-md:pt-[clamp(1.5rem,6vh,2rem)] max-md:pb-[clamp(1rem,4vh,1.5rem)] max-md:-mt-[clamp(6.5rem,25vh,11.25rem)]',
    !portraitSrc && 'hero-scroll-content-copy--no-portrait',
    effectiveContentVerticalAlignment === 'top' && 'justify-start',
    effectiveContentVerticalAlignment === 'center' && 'justify-center',
    effectiveContentVerticalAlignment === 'bottom' && 'justify-end',
  )

  return (
    <section
      ref={sectionRef}
      aria-label={sectionAriaLabel ?? 'Hero'}
      className={cn(
        'hero-offset relative hero-offset--popout text-foreground isolate overflow-visible min-h-[clamp(666px,77vh,888px)]',
        !hasRenderableBg && 'bg-background',
        !portraitSrc && 'hero-superhero-no-portrait',
      )}
      data-hero-intro="done"
      data-hero-variant="popout"
      data-hero-type={dataHeroType ?? 'superhero'}
      data-hero-has-portrait={portraitSrc ? 'true' : 'false'}
    >
      {/* Hintergrundbild - füllt die Section */}
      {shouldRenderBgImage && renderBgSrc && (
        <div
          aria-hidden
          className="hero-scroll-bg pointer-events-none absolute inset-0 overflow-hidden z-0"
        >
          <Image
            src={renderBgSrc}
            alt=""
            fill
            className="hero-scroll-bg-image w-full h-full object-cover"
            style={{
              objectPosition: bgFocus.objectPosition,
            }}
            onError={() => {
              // Keep the hero stable when media fails and switch to section fallback background.
              console.warn('[BG IMG] Failed to load:', renderBgSrc)
              setBgImageFailed(true)
            }}
            onLoad={() => {
              setBgImageFailed(false)
            }}
            priority
            unoptimized={Boolean(renderBgSrc?.startsWith('http'))}
          />
        </div>
      )}

      {/* Overlay für Text-Lesbarkeit – theme-aware: --background hell in Light, dunkel in Dark */}
      {shouldRenderBgImage && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[12] hero-superhero-image-overlay"
          style={
            {
              '--hero-focus-x': `${bgFocus.x}%`,
              '--hero-focus-y': `${bgFocus.y}%`,
            } as React.CSSProperties
          }
        />
      )}

      <>
        <div className="hero-section-surface" aria-hidden />
        <div
          className="hero-background-overlay hero-background-overlay--style-preview-portrait"
          aria-hidden
        />
        <div
          className="hero-popout-structure-layer pointer-events-none absolute inset-0 z-[1] hidden"
          aria-hidden
        />
      </>

      <div className={heroContentClass}>
        <div className={heroMainClass}>
          <div className={heroCopyClass}>
            {subheadline && (
              <Badge
                variant="secondary"
                className={cn(
                  heroLayerClass,
                  'hero-scroll-layer-eyebrow w-fit px-1.5 py-px text-[10px] font-medium uppercase leading-tight tracking-[0.1em] hero-subheading-contrast',
                )}
              >
                {subheadline}
              </Badge>
            )}

            {headlineLines.length > 0 && (
              <h1
                className={cn(
                  heroLayerClass,
                  'hero-scroll-layer-headline text-pretty text-hero-display tracking-tight hero-heading-gradient',
                )}
              >
                {parsedHeadlineLines.map((segments, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {segments.map((segment, segmentIndex) => {
                      const content = segment.text
                      const isDecodeSegment = segment.decode && content.trim().length > 0

                      if (!isDecodeSegment) {
                        return (
                          <React.Fragment key={`${lineIndex}-${segmentIndex}`}>
                            {content}
                          </React.Fragment>
                        )
                      }

                      if (!decodeAnimationEnabled) {
                        return (
                          <React.Fragment key={`${lineIndex}-${segmentIndex}-static`}>
                            {content}
                          </React.Fragment>
                        )
                      }

                      return (
                        <ScrambleText
                          key={`${lineIndex}-${segmentIndex}-decode-stable`}
                          text={content}
                          chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                          staggerMs={12}
                          scrambleDurationMs={280}
                          tickMs={28}
                          useMonospaceOverlay={false}
                          startFromText
                          disableAnimation={!decodeAnimationActive}
                          className="hero-heading-gradient-decode"
                        />
                      )
                    })}
                  </span>
                ))}
              </h1>
            )}

            {heroDescription && (
              <p
                className={cn(
                  heroLayerClass,
                  'hero-scroll-layer-body',
                  'hero-content-contrast hero-superhero-system-font w-full max-w-none text-[0.9rem] leading-[1.35] md:max-w-[44ch]',
                )}
              >
                {heroDescription}
              </p>
            )}

            {showStats && (
              <div
                className={cn(
                  heroLayerClass,
                  'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 mt-5 animate-in fade-in slide-in-from-bottom-2 duration-700',
                )}
              >
                {stats!.map((stat, i) => {
                  const Icon =
                    stat.icon && stat.icon !== 'none' ? (statIconMap[stat.icon] ?? null) : null

                  return (
                    <div
                      key={stat.id ?? i}
                      className="hero-stat-item relative flex flex-col gap-1.5 pr-6"
                    >
                      {Icon ? (
                        <Icon
                          className="size-4 text-primary/70 mb-0.5"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      ) : null}
                      <span className="text-3xl font-semibold leading-none tracking-tight hero-heading-gradient">
                        {stat.value}
                      </span>
                      <span className="text-[0.78rem] leading-snug hero-subheading-contrast uppercase tracking-[0.06em]">
                        {stat.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            {ctaLinks.length > 0 && (
              <div
                className={cn(
                  heroLayerClass,
                  'hero-scroll-layer-cta flex flex-wrap items-center gap-3 max-md:flex-nowrap max-md:gap-2',
                )}
              >
                {ctaLinks.map((item, index) => (
                  <CMSLink
                    key={`${item?.link?.label ?? 'cta'}-${index}`}
                    type={item?.link?.type}
                    url={item?.link?.url}
                    reference={item?.link?.reference}
                    label={undefined}
                    newTab={item?.link?.newTab}
                    icon={item?.link?.icon}
                    enableIconSwap={item?.link?.enableIconSwap ?? true}
                    iconSwapFrom={item?.link?.iconSwapFrom}
                    iconSwapTo={item?.link?.iconSwapTo}
                    appearance={item?.link?.appearance ?? (index === 0 ? 'default' : 'outline')}
                    size="cta"
                    className="rounded-[var(--style-radius-l)] max-md:flex-1 max-md:min-w-0 max-md:justify-center max-md:gap-0 max-md:px-3 max-md:text-sm max-md:[&_svg]:hidden"
                  >
                    <span className="hidden md:inline">{item?.link?.label}</span>
                    <span className="md:hidden">
                      {getMobileShortCtaLabel(index, item?.link?.label ?? '')}
                    </span>
                  </CMSLink>
                ))}
              </div>
            )}

            <HeroLogoMarquee
              marqueeHeadline={marqueeHeadline}
              marqueeLogos={marqueeLogos}
              className={cn(
                heroLayerClass,
                'hero-scroll-layer-marquee mt-1 pt-3 border-t border-border/60',
              )}
            />
          </div>

          {portraitSrc && (
            <div
              ref={portraitRef}
              className={cn(
                'hero-scroll-content-portrait hero-superhero-portrait hero-desktop-parallax-portrait hero-mobile-sticky-portrait sticky aspect-[600/720] shrink-0 overflow-visible md:order-none max-md:h-auto max-md:min-h-[222px] max-md:min-w-0 max-md:z-[14] md:z-[14]',
                'max-md:order-1',
              )}
            >
              <div className="hero-superhero-portrait-media relative h-full w-full overflow-visible">
                <Image
                  src={portraitSrc}
                  alt=""
                  fill
                  className="hero-superhero-portrait-image object-contain object-center md:object-right-center"
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 48vw, 780px"
                  priority
                  unoptimized={Boolean(portraitSrc.startsWith('http'))}
                />
              </div>
            </div>
          )}
        </div>
        {portraitSrc && (
          <div
            className="hero-superhero-portrait-scroll-mask pointer-events-none absolute inset-x-0 bottom-0 hidden md:block"
            aria-hidden
          />
        )}
      </div>
    </section>
  )
}
