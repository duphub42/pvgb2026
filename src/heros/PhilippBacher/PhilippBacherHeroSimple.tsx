'use client'

import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getMediaUrlSafe } from '@/utils/media'
import { Marquee } from '@/components/ui/marquee'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'
import type { HeroBackground } from '@/payload-types'

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

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutId: number | undefined

  return function debounced(this: unknown, ...args: any[]) {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}

function computePortraitTransform(imgRect: DOMRect, viewportWidth: number): string {
  const isVeryNarrow = viewportWidth < 555

  if (isVeryNarrow) {
    const isSmallPhone = viewportWidth <= 390
    if (isSmallPhone) {
      // iPhone SE: leicht nach rechts, kaum nach oben, leicht skaliert
      const shiftX = imgRect.width * 0.1
      const shiftY = -imgRect.height * 0.03
      return `translate(${shiftX}px, ${shiftY}px) scale(1.11)`
    } else {
      // Größere Phones (z. B. iPhone 14 Pro Max): mehr nach oben, stärker skaliert
      const shiftX = imgRect.width * 0.1
      const shiftY = -imgRect.height * 0.18
      return `translate(${shiftX}px, ${shiftY}px) scale(1.28)`
    }
  }

  // Große Viewports: nur nach links clampen wenn Overflow
  const overflowRight = imgRect.right - viewportWidth
  if (overflowRight > 0) {
    return `translate(${-overflowRight}px, 40px)`
  }

  return 'translateY(40px)'
}

function usePortraitTransform() {
  const [portraitTransform, setPortraitTransform] = useState<string>('translateY(40px)')
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    function updateTransform() {
      const current = imgRef.current
      if (!current) return
      const rect = current.getBoundingClientRect()
      setPortraitTransform(computePortraitTransform(rect, window.innerWidth))
    }

    const debouncedUpdate = debounce(updateTransform, 100)

    // Initial berechnen (nach Paint)
    const rafId = requestAnimationFrame(debouncedUpdate)

    // Bei Resize neu berechnen (z. B. Orientierungswechsel)
    const observer = new ResizeObserver(() => debouncedUpdate())
    observer.observe(document.documentElement)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return { imgRef, portraitTransform }
}

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

  const { imgRef, portraitTransform } = usePortraitTransform()
  const foregroundImageUrl = foregroundImage ? getMediaUrlSafe(foregroundImage) : null
  const overlayStyle = useMemo(
    () => ({ opacity: overlayOpacity ?? 0.42 }),
    [overlayOpacity],
  )

  const sectionAriaLabel =
    headlineText || headlineLine1 || headlineLine2 || headlineLine3 || subheadline || 'Hero section'

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
      {backgroundImage?.url && (
        <Image
          src={getMediaUrl(backgroundImage.url) || backgroundImage.url}
          alt=""
          fill
          className="object-cover -z-10"
        />
      )}
      {/* Hintergrundvideo */}
      {backgroundVideo?.url && (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          title="Background video"
        >
          <source src={getMediaUrl(backgroundVideo.url) || backgroundVideo.url} type="video/mp4" />
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

      {/* Haupt-Content */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 md:px-6 py-8 sm:py-10 md:py-12 lg:py-16 text-left flex flex-col items-start justify-center w-full gap-0 hero-box-gradient md:-translate-y-[10vh]">
        {subheadline && (
          <p className="hero-subheadline-badge text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground w-fit">
            {subheadline}
          </p>
        )}

        {/* Headline: immer genau ein <h1>, weitere Zeilen als <span> */}
        {hasLines ? (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-[1.1] tracking-tighter text-foreground w-fit">
            {lines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>
        ) : (
          headlineText && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-[1.1] tracking-tighter text-foreground w-fit">
              {headlineText}
            </h1>
          )
        )}
        {description && (
          <p className="text-base md:text-lg text-muted-foreground text-left max-w-[268px] mx-0 w-fit mt-4 mb-4">
            {description}
          </p>
        )}

        {/* CTA-Links */}
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start w-fit">
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

        {/* Marquee */}
        {(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)) && (
          <div
            className="relative z-[40] mt-6 md:mt-8 w-full md:max-w-[60%] flex flex-col items-stretch px-0 py-0 md:py-0 gap-3 box-content"
            style={MARQUEE_CONTAINER_STYLE}
          >
            {marqueeHeadline && (
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground mt-[3px] mb-[3px]">
                {marqueeHeadline}
              </span>
            )}
            {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && (
              <Marquee duration={40} pauseOnHover fadeEdges gapClassName="gap-6" className="py-0 -mx-1">
                {marqueeLogos.map((logo, idx) => {
                  const url = logo?.logo != null ? getMediaUrlSafe(logo.logo) : ''
                  if (!url) return null
                  return (
                    <div
                      key={idx}
                      className="flex h-8 md:h-10 min-w-[4rem] shrink-0 items-center justify-center"
                    >
                      <img
                        src={url}
                        alt={logo?.alt ?? ''}
                        className="w-auto max-w-[88px] h-auto max-h-[33px] object-contain opacity-90"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )
                })}
              </Marquee>
            )}
          </div>
        )}
      </div>

      {/* Vordergrundbild (Portrait) */}
      {foregroundImageUrl && (
        <div className="pointer-events-none w-full">
          <div className="relative max-w-6xl mx-auto hero-foreground-container">
            <Image
              ref={imgRef}
              src={foregroundImageUrl}
              alt={headlineText || subheadline || 'Portrait'}
              width={414}
              height={600}
              className="hero-simple-portrait-img hero-portrait-sm hero-simple-portrait absolute bottom-0 right-0 lg:right-6 w-full max-w-[min(20rem,88vw)] md:max-w-[min(28rem,48vw)] box-content h-fit object-contain object-bottom md:z-20"
              style={{ transform: portraitTransform }}
            />
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] md:z-[30] w-full hero-shape-divider"
        style={{ height: '10vh' }}
        aria-hidden
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          {/* Welle 1: größere Amplitude, steigt von rechts (y groß) nach links (y klein) – fill folgt Theme (--background) */}
          <path
            d="M0,28 C250,55 500,18 750,52 C1000,22 1200,58 1200,58 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 1 }}
          />
          {/* Welle 2: kleinere Amplitude, versetzt für Tiefe */}
          <path
            d="M0,48 C300,68 600,42 900,65 C1100,50 1200,78 1200,78 L1200,120 L0,120 Z"
            style={{ fill: 'var(--background)', opacity: 0.7 }}
          />
        </svg>
      </div>

      {/* Zweiter Shape-Divider: leicht größer, halbtransparent, horizontal versetzt */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] md:z-[29] w-full hero-shape-divider"
        style={{ height: 'calc(10vh + 33px)' }}
        aria-hidden
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%', opacity: 0.5 }}
        >
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
