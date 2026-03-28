'use client'

import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { getMediaUrlSafe } from '@/utils/media'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'
import { HeroLogoMarquee } from '@/heros/HeroLogoMarquee'
import type { HeroBackground } from '@/payload-types'
import { getMediaUrlCandidates } from '@/utilities/mediaUrlCandidates'
import { cn } from '@/utilities/ui'

/** Verzögerungen (ms) für die Hero-Enter-Animationen: Headline (Scramble) → Beschreibung → CTAs → Subheadline (Marquee-Zeiten in HeroLogoMarquee). */
const HERO_ANIM = {
  headlineScramble: { staggerMs: 48, scrambleDurationMs: 420, lineDelayMs: 680 },
  descStartMs: 2600,
  descWordMs: 88,
  ctaStartMs: 3800,
  subheadlineStartMs: 7200,
  portraitDelayMs: 280,
  portraitDurationMs: 1800,
} as const

const getDelay = (ms: number, reduced: boolean) => (reduced ? 0 : ms)

// -------------------------------
// Typdefinitionen für Props (Payload-kompatibel)
// -------------------------------
interface FloatingElement {
  label: string
  position: 'topLeft' | 'topRight' | 'midLeft' | 'midRight' | 'bottomLeft' | 'bottomRight'
  offsetX?: number | null
  offsetY?: number | null
  icon?: number | { url?: string | null; id?: number } | null
}

interface Logo {
  logo?: unknown
  alt?: string | null
}

type CMSLinkProps = ComponentProps<typeof CMSLink>

interface LinkItem {
  link?: Pick<CMSLinkProps, 'url' | 'label' | 'appearance' | 'newTab' | 'type'> & {
    reference?: unknown
  }
}

export interface PhilippBacherHeroSimpleProps {
  subheadline?: string | null
  headline?: string | null
  headlineLine1?: string | null
  headlineLine2?: string | null
  headlineLine3?: string | null
  description?: string | null
  richText?: any
  links?: LinkItem[]
  foregroundImage?: { url?: string | null; id?: number } | null
  backgroundImage?: { url?: string | null } | null
  backgroundVideo?: { url?: string | null } | null
  floatingElements?: FloatingElement[]
  marqueeHeadline?: string | null
  marqueeLogos?: Logo[]
  overlayOpacity?: number | null
  mediaType?: 'halo' | 'animation' | 'orbit' | 'video' | 'image'
  mediaTypeMobile?: 'halo' | 'animation' | 'orbit' | 'video' | 'image' | 'auto'
  backgroundPreset?: HeroBackground | number | null
}

function resolveMediaSrc(media: unknown): string | null {
  if (media == null) return null
  if (typeof media === 'number' && Number.isFinite(media)) return `/api/media/stream/${media}`
  if (typeof media === 'object' && media !== null && 'id' in media) {
    const idValue = (media as { id?: unknown }).id
    if (typeof idValue === 'number' && Number.isFinite(idValue)) {
      return `/api/media/stream/${idValue}`
    }
  }
  const safe = getMediaUrlSafe(media)
  return safe || null
}

/** Prozentbasierte Positionen – skaliert mit Section, keine festen rem/px. */
const POSITION_CLASSES: Record<FloatingElement['position'], string> = {
  topLeft: 'top-[10%] left-[8%]',
  topRight: 'top-[10%] right-[8%]',
  midLeft: 'top-1/2 -translate-y-1/2 left-[8%]',
  midRight: 'top-1/2 -translate-y-1/2 right-[8%]',
  bottomLeft: 'bottom-[10%] left-[8%]',
  bottomRight: 'bottom-[10%] right-[8%]',
}

/** Ab 1250px: Floating-Elemente sternförmig vom Portrait-Zentrum weg, rechte Spalte ausfüllend. */
const STAR_POSITION_CLASSES: Record<FloatingElement['position'], string> = {
  topLeft: 'top-[10%] right-[42%]',
  topRight: 'top-[6%] right-[4%]',
  midLeft: 'top-[44%] right-[50%]',
  midRight: 'top-[40%] right-[1%]',
  bottomLeft: 'bottom-[22%] right-[40%]',
  bottomRight: 'bottom-[26%] right-[5%]',
}

const SECTION_STYLE: React.CSSProperties = {
  backgroundColor: 'unset',
  background: 'unset',
}

// -------------------------------
// Helper: Portrait-Transform berechnen
// -------------------------------

// -------------------------------
// Einfache Hero-Komponente (Copy-Paste-Referenz, Tailwind-only)
// -------------------------------
export const PhilippBacherHeroSimple: React.FC<PhilippBacherHeroSimpleProps> = ({
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  foregroundImage,
  backgroundImage,
  backgroundVideo,
  floatingElements,
  marqueeHeadline,
  marqueeLogos,
  overlayOpacity = 0.42,
  backgroundPreset,
}) => {
  const [isLgUp, setIsLgUp] = useState(false)
  const [isWideUp, setIsWideUp] = useState(false)

  const lines = useMemo(
    () => [headlineLine1, headlineLine2, headlineLine3].filter((l): l is string => Boolean(l)),
    [headlineLine1, headlineLine2, headlineLine3],
  )
  const hasLines = lines.length > 0
  const headlineText = hasLines ? undefined : headline
  const fullHeadlineLabel = hasLines ? lines.join(' ') : headlineText

  const foregroundImageUrl = resolveMediaSrc(foregroundImage)
  const backgroundImageUrl = resolveMediaSrc(backgroundImage)
  const backgroundCandidates = useMemo(
    () => getMediaUrlCandidates(backgroundImageUrl),
    [backgroundImageUrl],
  )
  const [backgroundSrcIndex, setBackgroundSrcIndex] = React.useState(0)
  const backgroundSrc = backgroundCandidates[backgroundSrcIndex] ?? backgroundImageUrl ?? ''
  React.useEffect(() => {
    setBackgroundSrcIndex(0)
  }, [backgroundImageUrl])
  const foregroundCandidates = useMemo(
    () => getMediaUrlCandidates(foregroundImageUrl),
    [foregroundImageUrl],
  )
  const [foregroundSrcIndex, setForegroundSrcIndex] = React.useState(0)
  const foregroundSrc = foregroundCandidates[foregroundSrcIndex] ?? foregroundImageUrl ?? ''
  React.useEffect(() => {
    setForegroundSrcIndex(0)
  }, [foregroundImageUrl])
  const overlayStyle = useMemo(
    () => ({ opacity: overlayOpacity ?? 0.42 }),
    [overlayOpacity],
  )
  const mobileOverlayOpacity = Math.min((overlayOpacity ?? 0.42) + 0.15, 0.85)
  const hasBackgroundImage = Boolean(backgroundImage?.url)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReducedMotion(motionMql.matches)
    }
    update()
    motionMql.addEventListener('change', update)
    return () => {
      motionMql.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const lgMql = window.matchMedia('(min-width: 1024px)')
    const wideMql = window.matchMedia('(min-width: 1250px)')
    const update = () => {
      setIsLgUp(lgMql.matches)
      setIsWideUp(wideMql.matches)
    }
    update()
    lgMql.addEventListener('change', update)
    wideMql.addEventListener('change', update)
    return () => {
      lgMql.removeEventListener('change', update)
      wideMql.removeEventListener('change', update)
    }
  }, [])

  const textStackRef = useRef<HTMLDivElement>(null)
  const [headlineColumnWidthPx, setHeadlineColumnWidthPx] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (!foregroundImageUrl) {
      setHeadlineColumnWidthPx(null)
      return
    }

    const stack = textStackRef.current
    if (!stack) return

    const measure = () => {
      const mql = window.matchMedia('(min-width: 1024px)')
      if (!mql.matches) {
        setHeadlineColumnWidthPx(null)
        return
      }
      const containerEl = stack.closest('.container')
      const capPx = containerEl ? containerEl.clientWidth * 0.45 : Number.POSITIVE_INFINITY
      const w = Math.ceil(stack.getBoundingClientRect().width)
      setHeadlineColumnWidthPx(Math.min(w, capPx))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stack)
    const containerEl = stack.closest('.container')
    if (containerEl) ro.observe(containerEl)

    const mql = window.matchMedia('(min-width: 1024px)')
    mql.addEventListener('change', measure)
    return () => {
      ro.disconnect()
      mql.removeEventListener('change', measure)
    }
  }, [foregroundImageUrl, subheadline, headlineText, hasLines, lines, description, links])

  const sectionAriaLabel =
    headlineText || headlineLine1 || headlineLine2 || headlineLine3 || subheadline || 'Hero section'

  return (
    <section
      className="relative w-full min-h-[85dvh] md:min-h-0 h-fit flex flex-col justify-end md:justify-start items-start overflow-visible text-foreground hero-offset"
      style={SECTION_STYLE}
      aria-label={sectionAriaLabel ?? undefined}
    >
      {/* Dezente Basisfläche: leichter Farbverlauf vs. restliche Seite (s. globals.css) */}
      <div className="hero-section-surface" aria-hidden />

      {/* Hintergrund-Preset-Layer (z. B. cssHalo, patternSquare) */}
      <HeroBackgroundPresetLayer preset={backgroundPreset} />

      {/* Honeycomb-Hintergrund */}
      <div className="hero-pattern-bg absolute inset-0 -z-[21]" aria-hidden />

      {/* Hintergrundbild */}
      {backgroundImageUrl && (
        <Image
          src={backgroundSrc}
          alt=""
          fill
          className="object-cover -z-10"
          onError={() => {
            if (backgroundSrcIndex < backgroundCandidates.length - 1) {
              setBackgroundSrcIndex((i) => i + 1)
            }
          }}
        />
      )}
      {/* Hintergrundvideo */}
      {resolveMediaSrc(backgroundVideo) && !reducedMotion && (
        <video
          className={`absolute inset-0 w-full h-full object-cover -z-20 ${hasBackgroundImage ? 'hidden md:block' : 'block'}`}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          title="Background video"
        >
          <source src={resolveMediaSrc(backgroundVideo) || ''} type="video/mp4" />
        </video>
      )}

      {/* Radial-Glow-Overlay: Zentrum hinter Portrait, wenn Vordergrundbild gesetzt */}
      <div
        className={cn('hero-background-overlay', foregroundImageUrl && 'hero-background-overlay--behind-portrait')}
        aria-hidden
      />

      {/* Deckkraft-Overlay: Mobile etwas stärker für Lesbarkeit */}
      <div
        className="absolute top-0 left-0 right-0 w-full h-fit -z-[5] bg-background md:hidden"
        style={{ opacity: mobileOverlayOpacity }}
        aria-hidden
      />
      <div
        className="absolute top-0 left-0 right-0 w-full h-fit -z-[5] bg-background hidden md:block"
        style={overlayStyle}
        aria-hidden
      />

      <div className="hero-section-foreground-tint" aria-hidden />

      {/* Haupt-Content inkl. Logo-Marquee direkt unter dem CTA */}
      <div className="relative z-[35] container pt-8 sm:pt-10 md:pt-12 lg:pt-16 md:pb-12 lg:pb-16 text-left flex flex-col w-full md:translate-y-[4vh] md:z-[40] max-md:pb-8">
        <div
          className={cn(
            'hero-philipp-text-column flex flex-col items-start justify-center min-w-0 hero-box-gradient',
            foregroundImageUrl &&
              'w-full md:max-lg:w-[55%] md:max-lg:max-w-[55%] lg:max-w-[45%]',
            foregroundImageUrl && headlineColumnWidthPx == null && 'lg:w-fit',
            !foregroundImageUrl && 'w-full',
          )}
          style={
            foregroundImageUrl && isLgUp && headlineColumnWidthPx != null
              ? { width: headlineColumnWidthPx, maxWidth: '45%' }
              : undefined
          }
        >
          <div
            ref={textStackRef}
            className={cn(
              'flex min-w-0 max-w-full flex-col items-start gap-2 max-md:gap-3 md:gap-0',
              foregroundImageUrl ? 'w-full max-md:max-w-full lg:w-max' : 'w-full',
            )}
          >
            {/* Subheadline: blendet als Letztes von unten nach oben ein */}
            {subheadline && (
              <p
                className="hero-subheadline-badge hero-reveal-subheadline text-[1rem] max-md:text-[0.6rem] md:text-[1.167rem] min-[555px]:text-[0.67rem] min-[555px]:md:text-[0.78rem] uppercase tracking-[0.25em] text-muted-foreground w-fit"
                style={{ animationDelay: `${getDelay(HERO_ANIM.subheadlineStartMs, reducedMotion)}ms` }}
              >
                {subheadline}
              </p>
            )}

            {/* Headline: Scramble-Effekt — ab md (iPad) keine Zeilenumbrüche pro CMS-Zeile bei Portrait */}
            {hasLines ? (
              <h1
                className={cn(
                  'text-5xl md:text-5xl lg:text-6xl font-medium leading-snug max-md:leading-[1.18] md:leading-[1.1] max-md:tracking-[-0.062em] md:tracking-[-0.055em] text-foreground w-fit hero-headline flex flex-col max-md:gap-y-0.5',
                  foregroundImageUrl && 'md:shrink-0 md:whitespace-nowrap',
                )}
                aria-label={fullHeadlineLabel || undefined}
              >
                {lines.map((line, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      'block min-h-[1.15em] max-w-none',
                      foregroundImageUrl && 'md:whitespace-nowrap',
                    )}
                  >
                    {reducedMotion ? (
                      line
                    ) : (
                      <ScrambleText
                        text={line}
                        className={
                          foregroundImageUrl ? 'max-md:whitespace-normal md:whitespace-nowrap' : undefined
                        }
                        staggerMs={HERO_ANIM.headlineScramble.staggerMs}
                        scrambleDurationMs={HERO_ANIM.headlineScramble.scrambleDurationMs}
                        delayMs={getDelay(idx * HERO_ANIM.headlineScramble.lineDelayMs, reducedMotion)}
                      />
                    )}
                  </span>
                ))}
              </h1>
            ) : (
              headlineText && (
                <h1
                  className={cn(
                    'text-5xl md:text-5xl lg:text-6xl font-medium leading-snug max-md:leading-[1.18] md:leading-[1.1] max-md:tracking-[-0.062em] md:tracking-[-0.055em] text-foreground w-fit hero-headline',
                    foregroundImageUrl && 'md:shrink-0 md:whitespace-nowrap',
                  )}
                  aria-label={fullHeadlineLabel || undefined}
                >
                  {reducedMotion ? (
                    headlineText
                  ) : (
                    <ScrambleText
                      text={headlineText}
                      className={
                        foregroundImageUrl ? 'max-md:whitespace-normal md:whitespace-nowrap' : undefined
                      }
                      staggerMs={HERO_ANIM.headlineScramble.staggerMs}
                      scrambleDurationMs={HERO_ANIM.headlineScramble.scrambleDurationMs}
                    />
                  )}
                </h1>
              )
            )}

            {/* Beschreibung: Wort für Wort von links nach rechts */}
            {description && !reducedMotion && (
              <p className="text-base md:text-lg text-muted-foreground text-left max-md:max-w-full md:max-w-[345px] mx-0 w-fit h-fit mt-4 mb-4 flex flex-wrap gap-x-[0.35em] gap-y-0">
                {description.split(/\s+/).map((word, idx) => (
                  <span
                    key={idx}
                    className="hero-reveal-word inline-block"
                    style={{
                      animationDelay: `${getDelay(HERO_ANIM.descStartMs + idx * HERO_ANIM.descWordMs, reducedMotion)}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            )}
            {description && reducedMotion && (
              <p className="text-base md:text-lg text-muted-foreground text-left max-md:max-w-full md:max-w-[345px] mx-0 w-fit h-fit mt-4 mb-4">
                {description}
              </p>
            )}

            {/* CTA-Links: poppen nach der Beschreibung */}
            {Array.isArray(links) && links.length > 0 && (
              <div
                className="flex flex-wrap gap-3 sm:gap-4 justify-start w-fit hero-reveal-pop"
                style={{ animationDelay: `${getDelay(HERO_ANIM.ctaStartMs, reducedMotion)}ms` }}
              >
                {links.map((linkItem, idx) => {
                  if (!linkItem?.link) return null
                  const { reference: _ref, ...link } = linkItem.link
                  const isOutline = link.appearance === 'outline'
                  return (
                    <CMSLink
                      key={idx}
                      {...link}
                      className={
                        isOutline
                          ? 'border border-border text-foreground hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-full font-medium transition'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full font-medium transition'
                      }
                    />
                  )
                })}
              </div>
            )}
          </div>

          <HeroLogoMarquee
            marqueeHeadline={marqueeHeadline}
            marqueeLogos={marqueeLogos}
            className="mt-6 md:mt-8 w-full min-w-0 max-w-full md:!max-w-full"
            syncWithPhilippBacherTimeline
          />
        </div>
      </div>

      {/* Vordergrundbild (Portrait): aus Flex-Flow, sonst Lücke durch padding-top auf .hero-foreground-container */}
      {foregroundImageUrl && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full z-[18] h-0 min-h-0 overflow-visible">
          <div className="relative container hero-foreground-container hero-foreground-no-inset-height">
            <div
              className="hero-portrait-fade-up absolute bottom-0 right-0 lg:right-6 w-full max-w-[min(18rem,78vw)] md:max-w-[min(28rem,46vw)] lg:max-w-[50%] box-content h-fit z-[34] md:z-20"
              style={{
                animationDelay: `${getDelay(HERO_ANIM.portraitDelayMs, reducedMotion)}ms`,
                animationDuration: `${isLgUp ? HERO_ANIM.portraitDurationMs : Math.round(HERO_ANIM.portraitDurationMs * 0.6)}ms`,
              }}
            >
              <Image
                src={foregroundSrc}
                alt={headlineText || subheadline || 'Portrait'}
                width={414}
                height={600}
                priority
                fetchPriority="high"
                sizes="(max-width: 555px) 88vw, (max-width: 1023px) 46vw, 50vw"
                className="hero-simple-portrait-img hero-portrait-sm w-full h-fit object-contain object-top lg:object-bottom"
                onError={() => {
                  if (foregroundSrcIndex < foregroundCandidates.length - 1) {
                    setForegroundSrcIndex((i) => i + 1)
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements — ab 1250px sternförmig vom Portrait verteilt */}
      {Array.isArray(floatingElements) &&
        floatingElements.map((f, idx) => {
          const posClasses = isWideUp
            ? (STAR_POSITION_CLASSES[f.position] ?? 'bottom-[10%] right-[8%]')
            : (POSITION_CLASSES[f.position] ?? 'bottom-[10%] right-[8%]')
          return (
            <div
              key={idx}
              className={`absolute z-20 font-semibold bg-white/95 text-neutral-900 px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-500 ${posClasses}`}
              style={{
                transform: `translate(${f.offsetX ?? 0}px, ${f.offsetY ?? 0}px)`,
                animationDelay: `${getDelay(800 + idx * 150, reducedMotion)}ms`,
                animationFillMode: 'both',
              }}
            >
              {f.label}
            </div>
          )
        })}

      {/* Wellen-Shape-Divider: 2 Wellen, unterschiedliche Amplituden, steigt von rechts nach links, 10vh.
          Mobile unter dem Content, ab Desktop/iPad darüber (z-Index höher als Hero-Content). */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[30] md:z-[30] w-full hero-shape-divider"
        style={{ height: 'calc(10vh + 33px)' }}
        aria-hidden
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          {/* Leicht versetzte „Schatten“-Wellen zuerst zeichnen (liegen unter den Hauptwellen) */}
          <path
            d="M0,32 C250,59 500,22 750,56 C1000,26 1200,62 1200,62 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 0.24 }}
          />
          <path
            d="M0,52 C300,72 600,46 900,69 C1100,54 1200,82 1200,82 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 0.24 }}
          />
          {/* Welle 1: deckend */}
          <path
            d="M0,28 C250,55 500,18 750,52 C1000,22 1200,58 1200,58 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 1 }}
          />
          {/* Welle 2: leichte Transparenz für Tiefe */}
          <path
            d="M0,48 C300,68 600,42 900,65 C1100,50 1200,78 1200,78 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 0.9 }}
          />
        </svg>
      </div>
    </section>
  )
}
