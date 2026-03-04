'use client'

import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getMediaUrlSafe } from '@/utils/media'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { LogoCarousel } from '@/components/ui/logo-carousel'
import { Marquee } from '@/components/ui/marquee'
import { TextAnimate } from '@/components/ui/text-animate'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utilities/ui'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'
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

interface LinkItem {
  link?: { url?: string; label?: string; appearance?: 'filled' | 'outline' }
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
const POSITION_CLASSES: Record<string, string> = {
  topLeft: 'top-[10%] left-[8%]',
  topRight: 'top-[10%] right-[8%]',
  midLeft: 'top-1/2 -translate-y-1/2 left-[8%]',
  midRight: 'top-1/2 -translate-y-1/2 right-[8%]',
  bottomLeft: 'bottom-[10%] left-[8%]',
  bottomRight: 'bottom-[10%] right-[8%]',
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
  overlayOpacity = 0.5,
  backgroundPreset,
}) => {
  const lines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean) as string[]
  const hasLines = lines.length >= 1
  const headlineText = hasLines ? undefined : headline

  // #region agent log
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const header = document.querySelector('header')
      const img = document.querySelector('.hero-simple-portrait-img')
      const hero = document.querySelector('.hero-offset')
      const heroBox = document.querySelector('.hero-box-gradient')
      const heroForegroundContainer = document.querySelector('.hero-foreground-container')
      const heroPortraitWrapper = document.querySelector('.hero-portrait-wrapper')
      const following = document.querySelector('.hero-following-section-mask')

      if (!header || !img) return

      const headerRect = header.getBoundingClientRect()
      const imgRect = (img as HTMLElement).getBoundingClientRect()
      const overlapsHeader = imgRect.top < headerRect.bottom

      const heroRect = hero ? (hero as HTMLElement).getBoundingClientRect() : null
      const followingRect = following
        ? (following as HTMLElement).getBoundingClientRect()
        : null

      const payloadBase = {
        sessionId: '04eb8f',
        runId: 'pre-fix',
        location: 'PhilippBacherHeroSimple.tsx:geometry',
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        timestamp: Date.now(),
      }

      fetch('http://127.0.0.1:7646/ingest/7566231f-57c2-48b8-9cf8-8f81f4440438', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '04eb8f',
        },
        body: JSON.stringify({
          ...payloadBase,
          hypothesisId: 'H-position',
          message: 'Hero image vs header overlap check',
          data: {
            headerBottom: headerRect.bottom,
            imgTop: imgRect.top,
            overlapsHeader,
          },
        }),
      }).catch(() => {})

      if (followingRect || heroRect) {
        fetch('http://127.0.0.1:7646/ingest/7566231f-57c2-48b8-9cf8-8f81f4440438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': '04eb8f',
          },
          body: JSON.stringify({
            ...payloadBase,
            hypothesisId: 'H-bottom',
            message: 'Hero image vs following section overlap check',
            data: {
              imgBottom: imgRect.bottom,
              heroBottom: heroRect?.bottom ?? null,
              followingTop: followingRect?.top ?? null,
            },
          }),
        }).catch(() => {})
      }

      // Zusätzliche Messung: Abstand zwischen Header-Unterkante und Hero-Box-Oberkante
      if (header && heroBox) {
        const heroBoxRect = (heroBox as HTMLElement).getBoundingClientRect()

        fetch('http://127.0.0.1:7646/ingest/7566231f-57c2-48b8-9cf8-8f81f4440438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': 'ef0cb0',
          },
          body: JSON.stringify({
            sessionId: 'ef0cb0',
            runId: 'pre-spacing',
            hypothesisId: 'H-header-hero-spacing',
            location: 'PhilippBacherHeroSimple.tsx:header-hero-box',
            message: 'Header bottom vs hero-box top spacing',
            timestamp: Date.now(),
            data: {
              headerBottom: headerRect.bottom,
              heroBoxTop: heroBoxRect.top,
              spacing: heroBoxRect.top - headerRect.bottom,
              viewportHeight: window.innerHeight,
              viewportWidth: window.innerWidth,
            },
          }),
        }).catch(() => {})
      }

      // Abstand zwischen Hero-Sektions-Unterkante und Bild-Unterkante (Lücke unterhalb des Herobildes)
      if (heroRect && imgRect) {
        fetch('http://127.0.0.1:7646/ingest/7566231f-57c2-48b8-9cf8-8f81f4440438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': 'ef0cb0',
          },
          body: JSON.stringify({
            sessionId: 'ef0cb0',
            runId: 'pre-gap',
            hypothesisId: 'H-hero-bottom-gap',
            location: 'PhilippBacherHeroSimple.tsx:hero-bottom-gap',
            message: 'Gap between hero section bottom and hero image bottom',
            timestamp: Date.now(),
            data: {
              heroBottom: heroRect.bottom,
              imgBottom: imgRect.bottom,
              gap: heroRect.bottom - imgRect.bottom,
              viewportHeight: window.innerHeight,
              viewportWidth: window.innerWidth,
            },
          }),
        }).catch(() => {})
      }

      // Horizontaler Check & Korrektur: liegt das Hero-Bild rechts außerhalb des Viewports / Content-Bereichs?
      try {
        const imgEl = img as HTMLElement
        const imgRectBefore = imgEl.getBoundingClientRect()
        const heroRect2 = hero ? (hero as HTMLElement).getBoundingClientRect() : null
        const foregroundRect = heroForegroundContainer
          ? (heroForegroundContainer as HTMLElement).getBoundingClientRect()
          : null

        // Messung vor der Korrektur
        fetch('http://127.0.0.1:7646/ingest/7566231f-57c2-48b8-9cf8-8f81f4440438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': 'bb8fe5',
          },
          body: JSON.stringify({
            sessionId: 'bb8fe5',
            runId: 'pre-fix',
            hypothesisId: 'H-horizontal',
            location: 'PhilippBacherHeroSimple.tsx:geometry',
            message: 'Hero image horizontal bounds vs viewport and hero container (before fix)',
            timestamp: Date.now(),
            data: {
              imgRight: imgRectBefore.right,
              imgWidth: imgRectBefore.width,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight,
              heroRight: heroRect2?.right ?? null,
              heroLeft: heroRect2?.left ?? null,
              heroWidth: heroRect2?.width ?? null,
              foregroundRight: foregroundRect?.right ?? null,
              foregroundLeft: foregroundRect?.left ?? null,
              foregroundWidth: foregroundRect?.width ?? null,
            },
          }),
        }).catch(() => {})

        // Korrektur:
        // - Standard: Bild so weit nach links verschieben, dass es nicht über den rechten Viewportrand hinausläuft
        // - Unter 555px Breite: Bild ca. 10 % seiner Breite nach rechts und 8 % seiner Höhe nach oben verschieben
        let appliedShiftX = 0
        let appliedShiftY = 24
        const overflowRight = imgRectBefore.right - window.innerWidth
        const isVeryNarrow = window.innerWidth < 555

        if (heroPortraitWrapper) {
          if (isVeryNarrow) {
            // 10 % nach rechts und 8 % nach oben verschieben, Beschnitt rechts ist erlaubt
            appliedShiftX = imgRectBefore.width * 0.1
            appliedShiftY = -imgRectBefore.height * 0.08
          } else if (overflowRight > 0) {
            // Nur bei größeren Viewports Clamp nach links
            appliedShiftX = -overflowRight
          }

          ;(heroPortraitWrapper as HTMLElement).style.transform = `translate(${appliedShiftX}px, ${appliedShiftY}px)`
        }

        const imgRectAfter = imgEl.getBoundingClientRect()

        // Messung nach der Korrektur
        fetch('http://127.0.0.1:7646/ingest/7566231f-57c2-48b8-9cf8-8f81f4440438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Debug-Session-Id': 'bb8fe5',
          },
          body: JSON.stringify({
            sessionId: 'bb8fe5',
            runId: 'post-fix',
            hypothesisId: 'H-horizontal-fix',
            location: 'PhilippBacherHeroSimple.tsx:geometry',
            message: 'Hero image horizontal bounds after applying clamp',
            timestamp: Date.now(),
            data: {
              overflowRightBefore: overflowRight,
              appliedShiftX,
              appliedShiftY,
              isVeryNarrow,
              imgRightAfter: imgRectAfter.right,
              imgWidthAfter: imgRectAfter.width,
              viewportWidth: window.innerWidth,
            },
          }),
        }).catch(() => {})
      } catch {
        // bewusst kein Throw im Debug-Log
      }
    } catch {
      // bewusst kein Throw im Debug-Log
    }
  }, [])
  // #endregion agent log

  return (
    <section
      className="relative w-full min-h-0 h-fit flex flex-col justify-start items-start overflow-visible text-foreground hero-offset"
      style={{ backgroundColor: 'unset', background: 'unset' }}
    >
      {/* Hintergrund-Preset-Layer aus Payload (z. B. cssHalo, patternSquare) */}
      <HeroBackgroundPresetLayer preset={backgroundPreset} />

      {/* Honeycomb-Hintergrund (hero-pattern-bg) */}
      <div className="hero-pattern-bg absolute inset-0 -z-[21]" aria-hidden />

      {/* Hintergrundbild / Video */}
      {backgroundImage?.url && (
        <Image
          src={getMediaUrl(backgroundImage.url) || backgroundImage.url}
          alt=""
          fill
          className="object-cover -z-10"
        />
      )}
      {backgroundVideo?.url && (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={getMediaUrl(backgroundVideo.url) || backgroundVideo.url} type="video/mp4" />
        </video>
      )}

      {/* Farbiges Radial-Overlay über dem Hintergrund (mehrlagiger Glow vom unteren Rand) */}
      <div className="hero-background-overlay" aria-hidden />

      {/* Overlay – nur Opacity, kein festes Layout (vermeidet Hydration-Mismatch) */}
      <div
        className="absolute top-0 left-0 right-0 w-full h-fit -z-[5] bg-background"
        style={{ opacity: Number(overlayOpacity) ?? 0.42 }}
        aria-hidden
      />

      {/* Haupt-Content: flussbasiert, Padding skaliert mit Breakpoints */}
      <div
        className="relative z-10 container max-w-6xl mx-auto px-4 md:px-6 py-8 sm:py-10 md:py-12 lg:py-16 text-left flex flex-col items-start justify-end w-full gap-0 hero-box-gradient"
        style={{
          width: 'fit-content',
          height: 'fit-content',
          padding: '33px',
          borderStyle: 'none',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderImage: 'none',
        }}
      >
        {subheadline && (
          <p className="hero-subheadline-badge text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground w-fit">
            {subheadline}
          </p>
        )}
        {hasLines &&
          lines.map((line, idx) => (
            <h1
              key={idx}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-[1.1] tracking-tighter text-foreground w-fit"
            >
              {line}
            </h1>
          ))}
        {headlineText && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-[1.1] tracking-tighter text-foreground w-fit">
            {headlineText}
          </h1>
        )}
        {description && (
          <p className="text-base md:text-lg text-muted-foreground text-left max-w-[268px] mx-0 w-fit mt-4 mb-4">
            {description}
          </p>
        )}

        {/* Links (Payload CMSLink-kompatibel) */}
        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start w-fit">
            {links.map((linkItem, idx) => {
              if (!linkItem?.link) return null
              const rawLink = linkItem.link as { url?: string; label?: string; appearance?: string; newTab?: boolean; type?: string; reference?: unknown }
              const { reference: _reference, ...link } = rawLink
              const isOutline = link.appearance === 'outline'
              return (
                <CMSLink
                  key={idx}
                  {...(link as any)}
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

        {(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)) && (
          <div
            className="relative z-[40] mt-6 md:mt-8 w-full md:max-w-[60%] flex flex-col items-stretch px-0 py-0 md:py-0 gap-3 box-content"
            style={{
              backdropFilter: 'none',
              background: 'unset',
              backgroundColor: 'rgba(255,255,255,0)',
              color: 'rgba(10, 10, 10, 1)',
              borderTopWidth: 0,
              borderTopStyle: 'none',
              borderTopColor: 'rgba(0, 0, 0, 0)',
              borderImage: 'none',
            }}
          >
            {marqueeHeadline && (
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground mt-[3px] mb-[3px]">
                {marqueeHeadline}
              </span>
            )}
            {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 && (
              <Marquee
                duration={40}
                pauseOnHover
                fadeEdges
                gapClassName="gap-6"
                className="py-0 -mx-1"
              >
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
                        className="h-8 md:h-10 w-auto max-h-12 object-contain opacity-90"
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

      {/* Vordergrundbild: unten rechts, an Content-Breite (max-w-6xl) ausgerichtet */}
      {foregroundImage && getMediaUrlSafe(foregroundImage) && (
        <div className="pointer-events-none w-full">
          <div className="relative max-w-6xl mx-auto hero-foreground-container">
            <div
              className="absolute bottom-0 right-0 lg:right-6 w-full max-w-[min(20rem,88vw)] md:max-w-[min(28rem,48vw)] flex justify-start items-start overflow-visible hero-portrait-sm hero-simple-portrait hero-portrait-wrapper pb-16 pl-0 md:z-20"
              style={{ width: '100%', transform: 'translateY(24px)' }}
            >
              <Image
                src={getMediaUrlSafe(foregroundImage)}
                alt=""
                width={414}
                height={600}
                className="hero-simple-portrait-img flex flex-wrap box-content align-bottom w-full h-fit object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements – prozentbasiert */}
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
          Liegt bewusst unter dem Content (z-Index kleiner als Hero-Box), aber über dem Hintergrund-Overlay. */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] w-full hero-shape-divider"
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] w-full hero-shape-divider"
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
