'use client'

import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { getMediaUrlSafe } from '@/utils/media'
import { Marquee } from '@/components/ui/marquee'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import React, { useEffect, useMemo, useState } from 'react'
import type { ComponentProps } from 'react'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'
import type { HeroBackground } from '@/payload-types'
import { ResilientImage } from '@/components/ui/resilient-image'
import { getMediaUrlCandidates } from '@/utilities/mediaUrlCandidates'
import { cn } from '@/utilities/ui'

/** Verzögerungen (ms) für die Hero-Enter-Animationen: Headline (Scramble) → Beschreibung (Wort für Wort) → CTAs (Pop) → Marquee-Überschrift (Buchstabe) → Marquee-Logos (Pop) → Subheadline (Slide up). */
const HERO_ANIM = {
  headlineScramble: { staggerMs: 48, scrambleDurationMs: 420, lineDelayMs: 680 },
  descStartMs: 2600,
  descWordMs: 88,
  ctaStartMs: 3800,
  marqueeHeadlineStartMs: 4200,
  marqueeLetterMs: 38,
  marqueeLogosStartMs: 6000,
  marqueeLogoMs: 95,
  subheadlineStartMs: 7200,
  portraitDelayMs: 280,
  portraitDurationMs: 1800,
} as const

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

/** Inline-Style für den Marquee-Container – stable reference, kein Re-Create pro Render. */
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
  const lines = [headlineLine1, headlineLine2, headlineLine3].filter(
    (l): l is string => Boolean(l),
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
  const [foregroundUseNativeImg, setForegroundUseNativeImg] = React.useState(false)
  React.useEffect(() => {
    setForegroundSrcIndex(0)
    setForegroundUseNativeImg(false)
  }, [foregroundImageUrl])
  const overlayStyle = useMemo(
    () => ({ opacity: overlayOpacity ?? 0.42 }),
    [overlayOpacity],
  )
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

  const sectionAriaLabel =
    headlineText || headlineLine1 || headlineLine2 || headlineLine3 || subheadline || 'Hero section'

  const hasMarqueeBand =
    Boolean(marqueeHeadline) || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)

  return (
    <section
      className="relative w-full min-h-0 h-fit flex flex-col justify-end md:justify-start items-start overflow-visible text-foreground hero-offset"
      style={SECTION_STYLE}
      aria-label={sectionAriaLabel ?? undefined}
    >
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

      {/* Radial-Glow-Overlay */}
      <div className="hero-background-overlay" aria-hidden />

      {/* Deckkraft-Overlay */}
      <div
        className="absolute top-0 left-0 right-0 w-full h-fit -z-[5] bg-background"
        style={overlayStyle}
        aria-hidden
      />

      {/* Haupt-Content (ohne Marquee auf Mobile: Marquee liegt absolut über Shape-Divider) */}
      <div
        className={cn(
          'relative z-[35] container max-w-6xl mx-auto px-4 md:px-6 pt-8 sm:pt-10 md:pt-12 lg:pt-16 md:pb-12 lg:pb-16 lg:pr-[34%] xl:pr-[32%] text-left flex flex-col items-start justify-center w-full gap-2 max-md:gap-3 md:gap-0 hero-box-gradient md:translate-y-[4vh] md:z-[40]',
          hasMarqueeBand ? 'max-md:pb-[min(12.5rem,34vh)]' : 'max-md:pb-8',
        )}
      >
        {/* Subheadline: blendet als Letztes von unten nach oben ein */}
        {subheadline && (
          <p
            className="hero-subheadline-badge hero-reveal-subheadline text-[1rem] md:text-[1.167rem] min-[555px]:text-[0.67rem] min-[555px]:md:text-[0.78rem] uppercase tracking-[0.25em] text-muted-foreground w-fit"
            style={{ animationDelay: `${HERO_ANIM.subheadlineStartMs}ms` }}
          >
            {subheadline}
          </p>
        )}

        {/* Headline: Scramble-Effekt, Zeile für Zeile mit Stagger */}
        {hasLines ? (
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-snug max-md:leading-[1.18] md:leading-[1.1] tracking-tighter text-foreground w-fit hero-headline flex flex-col max-md:gap-y-1"
            aria-label={fullHeadlineLabel || undefined}
          >
            {lines.map((line, idx) => (
              <span key={idx} className="block min-h-[1.15em]">
                {reducedMotion ? (
                  line
                ) : (
                  <ScrambleText
                    text={line}
                    staggerMs={HERO_ANIM.headlineScramble.staggerMs}
                    scrambleDurationMs={HERO_ANIM.headlineScramble.scrambleDurationMs}
                    delayMs={idx * HERO_ANIM.headlineScramble.lineDelayMs}
                  />
                )}
              </span>
            ))}
          </h1>
        ) : (
          headlineText && (
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-snug max-md:leading-[1.18] md:leading-[1.1] tracking-tighter text-foreground w-fit hero-headline"
              aria-label={fullHeadlineLabel || undefined}
            >
              {reducedMotion ? (
                headlineText
              ) : (
                <ScrambleText
                  text={headlineText}
                  staggerMs={HERO_ANIM.headlineScramble.staggerMs}
                  scrambleDurationMs={HERO_ANIM.headlineScramble.scrambleDurationMs}
                />
              )}
            </h1>
          )
        )}

        {/* Beschreibung: Wort für Wort von links nach rechts */}
        {description && !reducedMotion && (
          <p className="text-base md:text-lg text-muted-foreground text-left max-w-[345px] mx-0 w-fit h-fit mt-4 mb-4 flex flex-wrap gap-x-[0.35em] gap-y-0">
            {description.split(/\s+/).map((word, idx) => (
              <span
                key={idx}
                className="hero-reveal-word inline-block"
                style={{ animationDelay: `${HERO_ANIM.descStartMs + idx * HERO_ANIM.descWordMs}ms` }}
              >
                {word}
              </span>
            ))}
          </p>
        )}
        {description && reducedMotion && (
          <p className="text-base md:text-lg text-muted-foreground text-left max-w-[345px] mx-0 w-fit h-fit mt-4 mb-4">
            {description}
          </p>
        )}

        {/* CTA-Links: poppen nach der Beschreibung */}
        {Array.isArray(links) && links.length > 0 && (
          <div
            className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start w-fit hero-reveal-pop"
            style={{ animationDelay: `${HERO_ANIM.ctaStartMs}ms` }}
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

      {/* Marquee: Mobile absolut am unteren Hero-Rand, über Shape-Divider (z-38); Desktop im Fluss unter der Box */}
      {(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)) && (
        <div
          className="hero-marquee-band container max-w-6xl mx-auto px-4 md:px-6 lg:pr-[34%] xl:pr-[32%] w-full flex flex-col items-start text-left gap-3 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 max-md:bottom-0 max-md:z-[38] max-md:pb-[max(0.75rem,2.5vh)] max-md:pointer-events-auto md:relative md:z-[40] md:mt-8 md:translate-x-0 md:pb-0"
          style={MARQUEE_CONTAINER_STYLE}
        >
          {marqueeHeadline && (
            <span className="text-[0.47rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground mt-[3px] mb-[3px] inline-flex flex-wrap self-start">
              {marqueeHeadline.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="hero-reveal-letter inline-block"
                  style={{
                    animationDelay: `${HERO_ANIM.marqueeHeadlineStartMs + idx * HERO_ANIM.marqueeLetterMs}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          )}
          {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && !reducedMotion && (
            <Marquee duration={40} pauseOnHover fadeEdges gapClassName="gap-6" className="w-full min-w-0 py-0 -mx-1 self-stretch">
              {marqueeLogos.map((logo, idx) => {
                const url = logo?.logo != null ? getMediaUrlSafe(logo.logo) : ''
                if (!url) return null
                return (
                  <div
                    key={idx}
                    className="hero-logo-marquee-item hero-reveal-logo flex h-8 md:h-10 min-w-[4rem] shrink-0 items-center justify-center"
                    style={{
                      animationDelay: `${HERO_ANIM.marqueeLogosStartMs + idx * HERO_ANIM.marqueeLogoMs}ms`,
                    }}
                  >
                    <ResilientImage
                      src={url}
                      alt={logo?.alt ?? ''}
                      width={88}
                      height={33}
                      className="hero-logo-grayscale filter grayscale w-auto max-w-[88px] h-auto max-h-[33px] object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )
              })}
            </Marquee>
          )}
          {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && reducedMotion && (
            <div className="flex w-full min-w-0 flex-wrap gap-4 py-1 self-stretch">
              {marqueeLogos.slice(0, 6).map((logo, idx) => {
                const url = logo?.logo != null ? getMediaUrlSafe(logo.logo) : ''
                if (!url) return null
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={logo?.alt ?? ''}
                    width={88}
                    height={33}
                    className="hero-logo-grayscale filter grayscale w-auto max-w-[88px] h-auto max-h-[33px] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Vordergrundbild (Portrait): aus Flex-Flow, sonst Lücke durch padding-top auf .hero-foreground-container */}
      {foregroundImageUrl && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 w-full z-[18] h-0 min-h-0 overflow-visible">
          <div className="relative max-w-6xl mx-auto hero-foreground-container hero-foreground-no-inset-height">
            <div
              className="hero-portrait-fade-up absolute bottom-0 right-0 lg:right-6 w-full max-w-[min(20rem,88vw)] md:max-w-[min(24rem,40vw)] box-content h-fit z-[34] md:z-20"
              style={{
                animationDelay: `${HERO_ANIM.portraitDelayMs}ms`,
                animationDuration: `${HERO_ANIM.portraitDurationMs}ms`,
              }}
            >
              {foregroundUseNativeImg ? (
                <ResilientImage
                  src={foregroundSrc}
                  alt={headlineText || subheadline || 'Portrait'}
                  width={414}
                  height={600}
                  className="hero-simple-portrait-img hero-portrait-sm w-full h-fit object-contain object-top lg:object-bottom"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <Image
                  src={foregroundSrc}
                  alt={headlineText || subheadline || 'Portrait'}
                  width={414}
                  height={600}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 555px) 88vw, (max-width: 768px) 48vw, 28rem"
                  className="hero-simple-portrait-img hero-portrait-sm w-full h-fit object-contain object-top lg:object-bottom"
                  onError={() => {
                    if (foregroundSrcIndex < foregroundCandidates.length - 1) {
                      setForegroundSrcIndex((i) => i + 1)
                      return
                    }
                    setForegroundUseNativeImg(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      {Array.isArray(floatingElements) &&
        floatingElements.map((f, idx) => (
          <div
            key={idx}
            className={`absolute z-20 font-semibold bg-white/95 text-neutral-900 px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap ${POSITION_CLASSES[f.position] ?? 'bottom-[10%] right-[8%]'}`}
            style={{
              transform: `translate(${f.offsetX ?? 0}px, ${f.offsetY ?? 0}px)`,
            }}
          >
            {f.label}
          </div>
        ))}

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
          {/* Volle Breite unten: gleiche Flächenfarbe wie Seite, darüber halbtransparente Wellen → weniger „Moiré“ zur Hero-Box */}
          <rect x="0" y="76" width="1200" height="44" fill="var(--background)" />
          {/* Welle 1: größere Amplitude */}
          <path
            d="M0,28 C250,55 500,18 750,52 C1000,22 1200,58 1200,58 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 0.74 }}
          />
          {/* Welle 2: kleinere Amplitude, versetzt für Tiefe */}
          <path
            d="M0,48 C300,68 600,42 900,65 C1100,50 1200,78 1200,78 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 0.82 }}
          />
        </svg>
      </div>

      {/* Zweiter Shape-Divider: leicht größer, halbtransparent, horizontal versetzt */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[29] md:z-[29] w-full hero-shape-divider"
        style={{ height: 'calc(10vh + 33px)' }}
        aria-hidden
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%', opacity: 0.5 }}
        >
          <rect x="0" y="76" width="1200" height="44" fill="var(--background)" />
          <path
            d="M0,32 C250,59 500,22 750,56 C1000,26 1200,62 1200,62 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)' }}
          />
          <path
            d="M0,52 C300,72 600,46 900,69 C1100,54 1200,82 1200,82 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)' }}
          />
        </svg>
      </div>
    </section>
  )
}
