'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ScrambleText } from '@/components/ScrambleText/ScrambleText'
import { LogoCarousel } from '@/components/ui/logo-carousel'
import { Marquee } from '@/components/ui/marquee'
import { TextAnimate } from '@/components/ui/text-animate'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utilities/ui'
import { getMediaUrlSafe } from '@/utils/media'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MediaObject = { url?: string | null; id?: number; mimeType?: string }

type FloatingEl = {
  label: string
  icon?: number | MediaObject | null
  linkUrl?: string | null
  linkNewTab?: boolean | null
  position: 'topLeft' | 'topRight' | 'midLeft' | 'midRight' | 'bottomLeft' | 'bottomRight'
  offsetX?: number | null
  offsetY?: number | null
}

type MarqueeLogoEntry = { logo?: unknown; alt?: string | null }

type HeroProps = {
  richText?: unknown
  links?: Array<{ link?: { appearance?: string; [key: string]: unknown } }>
  headline?: string
  headlineLine1?: string
  headlineLine2?: string
  headlineLine3?: string
  subheadline?: string
  description?: string
  mediaType?: string
  mediaTypeMobile?: string
  backgroundImage?: unknown
  backgroundVideo?: unknown
  foregroundImage?: unknown
  overlayOpacity?: number
  floatingElements?: FloatingEl[]
  haloAmplitudeFactor?: number
  haloSize?: number
  haloSpeed?: number
  haloColor2?: number
  haloXOffset?: number
  haloYOffset?: number
  useHaloBackground?: boolean
  haloOverlayGradient?: number
  haloOverlayGrid?: number
  haloOverlayGridSize?: number
  haloOverlayGridVariant?: string
  haloOverlayGridCustomCode?: string | { code?: string }
  marqueeHeadline?: string
  logoDisplayType?: string
  marqueeLogos?: MarqueeLogoEntry[]
  backgroundPreset?: unknown
  floatingMouseStrength?: number
  floatingIdleAmplitude?: number
  media?: unknown
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WAVE_FILL = 'var(--background)' as const

const HERO_BOX_WRAPPER_CLASS =
  'pointer-events-none absolute inset-x-0 top-0 bottom-0 max-h-[100vh] lg:max-h-[666px] z-[6] m-0 p-0 -mx-4 md:-mx-6 lg:-mx-8 overflow-visible rounded-2xl lg:rounded-3xl hero-box-frame-shadow hero-box-animate'
const HERO_BOX_INNER_CLASS =
  'hero-box-inner h-full w-full rounded-2xl lg:rounded-3xl border-[0.5px] border-white/5'

// FIX: Animation-Timing als benannte Konstanten (keine Magic Numbers)
/** Subheadline/Text erscheint nach 800ms */
const TEXT_REVEAL_DELAY_MS = 800
/** Vordergrundbild startet bei 2000ms */
const HERO_FOREGROUND_REVEAL_MS = 2000
/** Vordergrundbild-Animation dauert 2200ms */
const HERO_FOREGROUND_ANIMATION_MS = 2200
/** Badge erscheint nach Vordergrundbild-Scan + 200ms Puffer */
const HERO_BADGE_REVEAL_MS = HERO_FOREGROUND_REVEAL_MS + HERO_FOREGROUND_ANIMATION_MS + 200
/** Marquee startet sobald Vordergrundbild fertig */
const HERO_MARQUEE_START_MS = HERO_FOREGROUND_REVEAL_MS + HERO_FOREGROUND_ANIMATION_MS
const HERO_MARQUEE_LOGOS_START_MS = HERO_MARQUEE_START_MS
const HERO_MARQUEE_ITEM_STAGGER_MS = 280
/** Marquee gilt als "bereit" 900ms nach Start */
const HERO_MARQUEE_READY_AFTER_MS = HERO_MARQUEE_START_MS + 900
/** Maus muss mind. 1s im Hero sein bevor Floating-Items erscheinen */
const HERO_MOUSE_MIN_INSIDE_MS = 1000
/** Versatz zwischen Floating-Items beim Aufpoppen */
const HERO_FLOATING_POP_STAGGER_MS = 1000

/** Floating: Einflussradius der Maus (px) */
const FLOATING_MOUSE_RADIUS = 320
/** Floating: Dauer einer Idle-Sinus-Periode (ms) */
const FLOATING_IDLE_PERIOD_MS = 4000

/** Scroll-Easing: Ziel-Offset-Faktor */
const SCROLL_EASE_FACTOR = 0.18
/** Scroll-Snap-Threshold */
const SCROLL_SNAP_THRESHOLD = 0.5
/** Maximaler Scroll-Offset für Parallax */
const SCROLL_MAX_OFFSET = 1200
/** Parallax-Skalierung bei maximalem Scroll */
const SCROLL_SCALE_AMOUNT = 0.03
/** Parallax-TranslateY bei maximalem Scroll (px) */
const SCROLL_TRANSLATE_Y_PX = 40

/** Deferred Heavy Background: Mindestverzögerung (ms) */
const DEFER_MIN_MS = 1800
/** Deferred Heavy Background: Fallback (ms) */
const DEFER_FALLBACK_MS = 3000

// ---------------------------------------------------------------------------
// Dynamic Imports (SSR disabled, mit Skeleton-Fallback)
// ---------------------------------------------------------------------------

const FallbackBg = () => <div className="absolute inset-0 bg-neutral-950" aria-hidden />

const HeroBackgroundThree = dynamic(
  () =>
    import('@/components/HeroBackgroundThree/HeroBackgroundThree')
      .then((m) => ({ default: m?.HeroBackgroundThree ?? FallbackBg }))
      .catch(() => ({ default: FallbackBg })),
  { ssr: false, loading: () => <FallbackBg /> },
)
const HaloBackground = dynamic(
  () =>
    import('@/components/HaloBackground/HaloBackground')
      .then((m) => ({ default: m?.HaloBackground ?? FallbackBg }))
      .catch(() => ({ default: FallbackBg })),
  { ssr: false, loading: () => <FallbackBg /> },
)

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function splitIntoSegments(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

// ---------------------------------------------------------------------------
// Sub-Components
// ---------------------------------------------------------------------------

function AnimatedDescription({
  text,
  mounted,
  startDelay = 1200,
}: {
  text: string
  mounted: boolean
  startDelay?: number
}) {
  const segments = splitIntoSegments(text)
  if (segments.length === 0) return null

  return (
    <div className="max-w-sm md:max-w-md text-base leading-relaxed text-white/95 md:text-lg space-y-5">
      {segments.map((segment, index) => (
        <span key={index} className="block overflow-hidden">
          <span
            className={cn(
              'inline-block transform-gpu origin-left transition-transform transition-opacity duration-[900ms] ease-out',
              mounted ? 'scale-x-100 opacity-100' : 'scale-x-[0.9] opacity-0',
            )}
            style={{ transitionDelay: `${startDelay + index * 260}ms` }}
          >
            {segment}
          </span>
        </span>
      ))}
    </div>
  )
}

const POSITION_MAP: Record<string, { left: number; top: number }> = {
  topLeft:    { left: 12, top: 18 },
  topRight:   { left: 82, top: 18 },
  midLeft:    { left: 14, top: 48 },
  midRight:   { left: 80, top: 48 },
  bottomLeft: { left: 12, top: 78 },
  bottomRight:{ left: 82, top: 78 },
}

/** Stabile Klasse für Marquee-Logo-Items, verhindert Hydration-Mismatch durch Radix TooltipTrigger asChild. */
const MARQUEE_LOGO_ITEM_CLASS =
  'hero-logo-marquee-item flex h-[45px] cursor-default items-center justify-center origin-center transition-transform duration-200 hover:scale-[1.2]'

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export const PhilippBacherHero: React.FC<HeroProps> = (props) => {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [textReveal, setTextReveal] = useState(false)
  const [foregroundReveal, setForegroundReveal] = useState(false)
  const [badgeReveal, setBadgeReveal] = useState(false)
  const [marqueeHeadlineReveal, setMarqueeHeadlineReveal] = useState(false)
  const [floatingUnlock, setFloatingUnlock] = useState(false)
  const [waveFill, setWaveFill] = useState<string>(WAVE_FILL)
  const [deferHeavyBackground, setDeferHeavyBackground] = useState(false)
  const [skipHeavyBackground, setSkipHeavyBackground] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  const heroSectionRef = useRef<HTMLElement>(null)
  const scrollTargetRef = useRef(0)
  const scrollCurrentRef = useRef(0)
  const scrollRafIdRef = useRef<number | null>(null)
  const mountTimeRef = useRef(0)
  const floatingElRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseRef = useRef({ x: 0, y: 0, inside: false, enteredAt: null as number | null })

  if (!props) return null

  const {
    richText,
    links,
    headline,
    headlineLine1,
    headlineLine2,
    headlineLine3,
    subheadline,
    description,
    mediaType = 'cssHalo',
    mediaTypeMobile = 'auto',
    backgroundImage,
    backgroundVideo,
    foregroundImage,
    overlayOpacity = 0.45,
    floatingElements,
    haloAmplitudeFactor,
    haloSize,
    haloSpeed,
    haloColor2,
    haloXOffset,
    haloYOffset,
    useHaloBackground = true,
    haloOverlayGradient,
    haloOverlayGrid,
    haloOverlayGridSize,
    haloOverlayGridVariant,
    haloOverlayGridCustomCode,
    marqueeHeadline = 'ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN',
    logoDisplayType = 'marquee',
    marqueeLogos,
    backgroundPreset,
    floatingMouseStrength,
    floatingIdleAmplitude,
  } = props

  const floatingCount = Array.isArray(floatingElements)
    ? floatingElements.filter((el) => {
        const url = el?.icon != null ? getMediaUrlSafe(el.icon) : ''
        const hasLabel = el?.label != null && String(el.label).trim() !== ''
        return url !== '' || hasLabel
      }).length
    : 0

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    mountTimeRef.current = Date.now()

    let rafId1: number
    let rafId2: number
    rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => setMounted(true))
    })

    const idText       = setTimeout(() => setTextReveal(true),          TEXT_REVEAL_DELAY_MS)
    const idForeground = setTimeout(() => setForegroundReveal(true),    HERO_FOREGROUND_REVEAL_MS)
    const idBadge      = setTimeout(() => setBadgeReveal(true),         HERO_BADGE_REVEAL_MS)
    const idMarquee    = setTimeout(() => setMarqueeHeadlineReveal(true),HERO_MARQUEE_START_MS)

    const animateScroll = () => {
      const diff = scrollTargetRef.current - scrollCurrentRef.current
      if (Math.abs(diff) < SCROLL_SNAP_THRESHOLD) {
        scrollCurrentRef.current = scrollTargetRef.current
        setScrollOffset(scrollTargetRef.current)
        scrollRafIdRef.current = null
        return
      }
      scrollCurrentRef.current += diff * SCROLL_EASE_FACTOR
      setScrollOffset(scrollCurrentRef.current)
      scrollRafIdRef.current = window.requestAnimationFrame(animateScroll)
    }

    const handleScroll = () => {
      scrollTargetRef.current = window.pageYOffset
      if (scrollRafIdRef.current == null) {
        scrollRafIdRef.current = window.requestAnimationFrame(animateScroll)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const mq = window.matchMedia?.('(max-width: 767.98px)')
    const updateViewport = () => setIsMobileViewport(Boolean(mq?.matches))
    if (mq) {
      updateViewport()
      try {
        mq.addEventListener('change', updateViewport)
      } catch {
        ;(mq as { addListener?: (cb: () => void) => void }).addListener?.(updateViewport)
      }
    }

    return () => {
      cancelAnimationFrame(rafId1)
      cancelAnimationFrame(rafId2)
      clearTimeout(idText)
      clearTimeout(idForeground)
      clearTimeout(idBadge)
      clearTimeout(idMarquee)
      window.removeEventListener('scroll', handleScroll)
      if (scrollRafIdRef.current != null) {
        cancelAnimationFrame(scrollRafIdRef.current)
        scrollRafIdRef.current = null
      }
      if (mq) {
        try {
          mq.removeEventListener('change', updateViewport)
        } catch {
          ;(mq as { removeListener?: (cb: () => void) => void }).removeListener?.(updateViewport)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
    const effectiveType = conn?.effectiveType ?? ''
    setSkipHeavyBackground(effectiveType === '2g' || effectiveType === 'slow-2g')
  }, [mounted])

  useEffect(() => {
    if (skipHeavyBackground) return
    let cancelled = false
    const apply = () => { if (!cancelled) setDeferHeavyBackground(true) }
    const afterMin = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(apply, { timeout: DEFER_FALLBACK_MS - DEFER_MIN_MS })
      } else {
        setTimeout(apply, 200)
      }
    }
    const minId      = setTimeout(afterMin, DEFER_MIN_MS)
    const fallbackId = setTimeout(apply, DEFER_FALLBACK_MS)
    return () => {
      cancelled = true
      clearTimeout(minId)
      clearTimeout(fallbackId)
    }
  }, [skipHeavyBackground])

  useEffect(() => {
    if (floatingCount === 0 || floatingUnlock) return
    const id = setInterval(() => {
      if (!mounted) return
      const now = Date.now()
      if (now - mountTimeRef.current < HERO_MARQUEE_READY_AFTER_MS) return
      const mouse = mouseRef.current
      if (!mouse.inside || !mouse.enteredAt) return
      if (now - mouse.enteredAt < HERO_MOUSE_MIN_INSIDE_MS) return
      setFloatingUnlock(true)
    }, 250)
    return () => clearInterval(id)
  }, [mounted, floatingCount, floatingUnlock])

  useEffect(() => {
    const read = () => {
      setWaveFill(WAVE_FILL)
    }
    read()
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && m.attributeName === 'data-theme')) read()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (floatingCount === 0) return

    const onMove = (e: MouseEvent) => {
      const section = heroSectionRef.current
      if (!section) return
      const sr = section.getBoundingClientRect()
      const inside =
        e.clientX >= sr.left && e.clientX <= sr.right &&
        e.clientY >= sr.top  && e.clientY <= sr.bottom
      const prev = mouseRef.current
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        inside,
        enteredAt: inside ? (prev.inside ? prev.enteredAt : Date.now()) : null,
      }
    }
    window.addEventListener('mousemove', onMove)

    const startTime = performance.now()
    let rafId = 0
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const mouse = mouseRef.current
      const time  = performance.now() - startTime
      const phase = (time / FLOATING_IDLE_PERIOD_MS) * Math.PI * 2
      const idleAmp = floatingIdleAmplitude ?? 4
      const strength = (floatingMouseStrength ?? 6.5) / 100

      for (let i = 0; i < floatingCount; i++) {
        const el = floatingElRefs.current[i]
        if (!el) continue

        const idleX = Math.sin(phase + i * 0.7) * idleAmp
        const idleY = Math.cos(phase + i * 0.5) * idleAmp * 0.8

        let mouseOx = 0, mouseOy = 0
        if (mouse.inside) {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width  / 2
          const cy = rect.top  + rect.height / 2
          const dx = mouse.x - cx
          const dy = mouse.y - cy
          const dist = Math.hypot(dx, dy)
          if (dist < FLOATING_MOUSE_RADIUS) {
            const t = 1 - dist / FLOATING_MOUSE_RADIUS
            mouseOx = -dx * strength * t
            mouseOy = -dy * strength * t
          }
        }

        el.style.transform = `translate(-50%, -50%) translate(${mouseOx + idleX}px, ${mouseOy + idleY}px)`
      }
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      floatingElRefs.current.forEach((el) => {
        if (el) el.style.transform = 'translate(-50%, -50%) translate(0px, 0px)'
      })
    }
  }, [mounted, floatingCount, floatingMouseStrength, floatingIdleAmplitude])

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------

  const useThreeLines = [headlineLine1, headlineLine2, headlineLine3].filter(Boolean).length >= 1
  const lines = useThreeLines
    ? [headlineLine1 ?? '', headlineLine2 ?? '', headlineLine3 ?? '']
    : [headline ?? ''].filter(Boolean)
  const hasHeadline = lines.some((l) => l.trim() !== '')

  const isMediaObject = (v: unknown): v is MediaObject =>
    typeof v === 'object' && v != null && ('url' in v || 'mimeType' in v)

  const rawMediaType =
    mounted && isMobileViewport && mediaTypeMobile && mediaTypeMobile !== 'auto'
      ? mediaTypeMobile
      : mediaType
  // Orbit und Vanta-Halo entfernt: alte Werte als cssHalo anzeigen
  const effectiveMediaType =
    rawMediaType === 'halo' || rawMediaType === 'orbit' ? 'cssHalo' : rawMediaType

  const backgroundMedia =
    effectiveMediaType === 'video' && backgroundVideo && isMediaObject(backgroundVideo)
      ? backgroundVideo
      : effectiveMediaType === 'image' && isMediaObject(backgroundImage)
        ? backgroundImage
        : isMediaObject(props.media)
          ? props.media
          : null

  const useBackgroundAnimation = effectiveMediaType === 'animation'
  const useBackgroundCssHalo   = effectiveMediaType === 'cssHalo'

  const hasTextContent  = hasHeadline || subheadline || description || richText
  const foregroundMedia = foregroundImage && isMediaObject(foregroundImage) ? foregroundImage : null
  const hasMarquee      = Boolean(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0))

  const easedScroll  = Math.min(scrollOffset, SCROLL_MAX_OFFSET)
  const scrollFactor = easedScroll / SCROLL_MAX_OFFSET
  const scale        = 1 + SCROLL_SCALE_AMOUNT * scrollFactor
  const translateY   = SCROLL_TRANSLATE_Y_PX * scrollFactor

  const overlayNum = Number(overlayOpacity ?? 0.45)
  const overlayRaw = Number.isFinite(overlayNum)
    ? Math.min(Math.max(0, overlayNum + scrollFactor * 0.35), 0.75)
    : 0.45
  const overlay =
    useBackgroundCssHalo || backgroundMedia
      ? Math.min(overlayRaw, 0.3)
      : overlayRaw

  const floatingListRaw = Array.isArray(floatingElements) ? floatingElements : []
  const floatingList = floatingListRaw.filter(
    (el) => getMediaUrlSafe(el.icon) !== '' || (el.label != null && String(el.label).trim() !== ''),
  )

  return (
    <section
      ref={heroSectionRef}
      className="relative z-10 w-full min-h-[100vh] max-h-[100vh] lg:min-h-[777px] lg:max-h-[777px] overflow-visible flex items-end justify-center bg-neutral-950 m-0 p-0 text-white -mt-[var(--header-height,6rem)] -mb-24"
      aria-label="Hero"
    >
      {/* Layer 0: Background only — no flex, grid, padding, margin, relative */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundPresetLayer preset={backgroundPreset as Record<string, unknown>} />
        <div className="hero-bg-wrap absolute inset-0">
          <div className="hero-pattern-bg absolute inset-0" aria-hidden />
        {useBackgroundCssHalo ? (
          <HaloBackground />
        ) : useBackgroundAnimation ? (
          deferHeavyBackground ? (
            <HeroBackgroundThree className="absolute inset-0 w-full h-full" />
          ) : (
            <div className="absolute inset-0 bg-neutral-950" aria-hidden />
          )
        ) : backgroundMedia ? (
          <Media
            resource={backgroundMedia}
            fill
            imgClassName="object-cover w-full h-full"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-950" aria-hidden />
        )}
        </div>
      </div>

      {/* Layer 1: Halo & FX only — overlay, gradient, edge, foreground image, shape dividers */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        <div
          className="hero-overlay-base absolute inset-0 transition-opacity duration-200"
          style={{ ['--hero-overlay' as string]: String(Math.min(1, Math.max(0, overlay))) }}
        />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="hero-edge-darken absolute inset-0" />
        {foregroundMedia && (
          <div className="absolute inset-0 lg:hidden">
            <div className="absolute right-0 top-0 bottom-0 w-[min(24rem,88vw)] md:w-[min(28rem,50vw)]">
              <Media
                resource={foregroundMedia}
                fill
                imgClassName="object-contain object-bottom object-right"
                priority
              />
            </div>
          </div>
        )}
        <div
          className="pointer-events-none absolute left-0 right-0 z-[2] h-[9vh] min-h-[72px] w-full hero-shape-divider"
          aria-hidden
        >
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%' }}>
            <path d="M0,70 C200,48 400,82 600,56 C800,28 1000,68 1200,38 L1200,120 L0,120 Z" style={{ fill: waveFill, opacity: 1 }} />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%', opacity: 0.5, transform: 'translateX(3%)' }}>
            <path d="M0,68 C200,54 400,78 600,58 C800,42 1000,72 1200,42 L1200,120 L0,120 Z" style={{ fill: waveFill }} />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%', opacity: 0.22 }}>
            <path d="M0,72 C200,58 400,82 600,60 C800,46 1000,76 1200,44 L1200,120 L0,120 Z" style={{ fill: waveFill }} />
          </svg>
        </div>
        <div
          className="pointer-events-none absolute left-0 right-0 z-[3] h-[9vh] min-h-[72px] w-full hero-shape-divider"
          style={{ opacity: 0.33, transform: 'translateY(-15px)' }}
          aria-hidden
        >
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%' }}>
            <path d="M0,70 C200,54 400,78 600,56 C800,34 1000,66 1200,38 L1200,120 L0,120 Z" style={{ fill: waveFill, opacity: 1 }} />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%', opacity: 0.5, transform: 'translateX(4%)' }}>
            <path d="M0,68 C200,58 400,76 600,58 C800,44 1000,70 1200,42 L1200,120 L0,120 Z" style={{ fill: waveFill }} />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%', opacity: 0.22 }}>
            <path d="M0,72 C200,62 400,80 600,60 C800,48 1000,74 1200,44 L1200,120 L0,120 Z" style={{ fill: waveFill }} />
          </svg>
        </div>
      </div>

      {/* Layer 2: Floating only — absolute children with percentage positioning, no container/relative */}
      {floatingList.length > 0 && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {floatingList.map((el, i) => {
            const preset   = POSITION_MAP[el.position] ?? POSITION_MAP.topRight
            const left     = preset.left + (el.offsetX ?? 0)
            const top      = preset.top  + (el.offsetY ?? 0)
            const iconUrl  = el.icon ? getMediaUrlSafe(el.icon) : ''
            const hasLabel = el.label != null && String(el.label).trim() !== ''

            const content = (
              <>
                {iconUrl && (
                  <img
                    src={iconUrl}
                    alt={hasLabel ? String(el.label).trim() : ''}
                    className="size-8 object-contain sm:size-10"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {hasLabel && (
                  <TextAnimate
                    animation="blurInUp"
                    by="character"
                    once
                    as="span"
                    className="text-sm font-medium text-white drop-shadow-sm sm:text-base inline"
                    segmentClassName="inline-block"
                  >
                    {String(el.label).trim()}
                  </TextAnimate>
                )}
              </>
            )

            return (
              <motion.div
                key={i}
                ref={(node) => { floatingElRefs.current[i] = node }}
                className={cn(
                  'absolute will-change-transform flex items-center gap-2 rounded-xl bg-white/10 px-2 py-1.5 backdrop-blur-sm',
                  '[@media(hover:hover)]:hover:scale-105',
                  el.linkUrl && 'pointer-events-auto',
                )}
                style={{
                  left: `${left}%`,
                  top:  `${top}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={floatingUnlock ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 22,
                  delay: floatingUnlock ? (i * HERO_FLOATING_POP_STAGGER_MS) / 1000 : 0,
                }}
              >
                {el.linkUrl ? (
                  <Link
                    href={el.linkUrl}
                    target={el.linkNewTab ? '_blank' : undefined}
                    rel={el.linkNewTab ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-white no-underline hover:text-white"
                  >
                    {content}
                  </Link>
                ) : content}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* SVG-Maske für Mobile: rechte obere Ecke transparent (Safari-tauglich). Muss im DOM sein für url(#…). */}
      <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden" focusable="false">
        <defs>
          <mask id="hero-box-corner-mask" maskContentUnits="objectBoundingBox" maskUnits="objectBoundingBox">
            <radialGradient id="hero-corner-mask-gradient" cx="1" cy="0" r="0.6">
              <stop offset="0" stopColor="black" />
              <stop offset="0.34" stopColor="black" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
              <stop offset="0.7" stopColor="white" stopOpacity="0.8" />
              <stop offset="0.86" stopColor="white" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
            <rect width="1" height="1" fill="url(#hero-corner-mask-gradient)" />
          </mask>
        </defs>
      </svg>
      {/* Content: gleicher Container wie Seiteninhalt, Box reicht mit negativem Margin in die Gutter = breiter, Grid-Padding = bündig mit Inhalt */}
      <div className="container relative z-[6] flex min-h-0 flex-col pointer-events-none">
        <div className="relative min-h-[100vh] lg:min-h-[min(666px,78vh)] flex-1 w-full max-h-[100vh] lg:max-h-none">
          <div className={HERO_BOX_WRAPPER_CLASS}>
            <div className={HERO_BOX_INNER_CLASS} />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl lg:rounded-3xl z-[1]"
              aria-hidden
            />
            <div
              className={cn(
                'pointer-events-none absolute bottom-0 overflow-visible z-[20] max-lg:hidden',
                'lg:right-0 lg:w-[41%] lg:max-w-[414px] lg:min-h-[420px]',
                'xl:left-[58%] xl:right-auto xl:w-[42%]',
                foregroundMedia ? 'hero-desktop-foreground-fade-in' : 'opacity-0',
              )}
            >
              {foregroundMedia && (
                <div
                  className={cn(
                    'hero-foreground-reveal hero-foreground-reveal-active h-full min-h-0',
                    'max-lg:w-[min(88vw,394px)] max-lg:max-h-[85vh] max-lg:min-h-[280px]',
                    'lg:w-full lg:max-h-none lg:scale-[1.02] lg:origin-bottom-right',
                  )}
                >
                  <div className="hero-foreground-scan1">
                    <Media
                      resource={foregroundMedia}
                      priority
                      size="(max-width: 1024px) 414px, 414px"
                      imgClassName="w-full h-full object-contain object-bottom max-lg:object-top"
                    />
                  </div>
                  <div className="hero-foreground-scan2">
                    <Media
                      resource={foregroundMedia}
                      priority
                      size="(max-width: 1024px) 414px, 414px"
                      imgClassName="w-full h-full object-contain object-bottom max-lg:object-top"
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className={cn(
                'absolute inset-0 z-10 grid h-full min-h-0 w-full grid-cols-1 gap-0 lg:grid-cols-[3fr_2fr] items-stretch',
                'px-4 pt-8 pb-4 md:px-6 md:pt-12 md:pb-6 lg:px-8 lg:pt-12 lg:pb-6',
              )}
            >
              <div
                className={cn(
                  'relative z-10 flex min-h-full w-full flex-col justify-end text-left pointer-events-none overflow-visible max-h-[666px] min-w-0',
                  foregroundMedia ? 'max-w-full' : 'max-w-2xl lg:self-start',
                  foregroundMedia ? 'lg:mr-auto' : '',
                  'pb-0',
                )}
              >
                <div className={cn('pointer-events-auto w-max max-w-full min-h-0 flex-shrink-0', foregroundMedia ? '' : 'max-w-2xl')}>
                  <div className="space-y-8">
                    {hasTextContent && (
                      <>
                        {subheadline &&
                          (isMobileViewport
                            ? badgeReveal
                              ? (
                                <p className="hero-subheadline-badge text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.12em] text-white/80">
                                  <span className="inline-flex items-center gap-1.5 align-middle leading-none">
                                    <span aria-hidden className="inline-flex items-center justify-center h-[1.6em] w-[1.6em]">
                                      <svg
                                        viewBox="0 0 24 24"
                                        className="h-[1.6em] w-[1.6em]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-label="Verifiziert"
                                        role="img"
                                      >
                                        <path
                                          d="M12 3.25 9.75 5.5 6.75 5.25 6.5 8.25 4.25 10.5 6.5 12.75 6.75 15.75 9.75 15.5 12 17.75 14.25 15.5 17.25 15.75 17.5 12.75 19.75 10.5 17.5 8.25 17.25 5.25 14.25 5.5 12 3.25Z"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1.4"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M10.25 11.75 11.25 12.75 13.75 10.25"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="1.6"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                    <TextAnimate
                                      animation="slideRight"
                                      by="character"
                                      duration={0.12}
                                      once
                                      startOnView={false}
                                      as="span"
                                    >
                                      {subheadline}
                                    </TextAnimate>
                                  </span>
                                </p>
                              )
                              : (
                                <p
                                  className="hero-subheadline-badge text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.12em] text-white/80 opacity-0"
                                  aria-hidden
                                >
                                  {subheadline}
                                </p>
                              )
                            : textReveal
                              ? (
                                <TextAnimate
                                  animation="slideRight"
                                  by="character"
                                  duration={0.12}
                                  once
                                  startOnView={false}
                                  as="p"
                                  className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.12em] text-white/80"
                                >
                                  {subheadline}
                                </TextAnimate>
                              )
                              : (
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 opacity-0 sm:text-sm" aria-hidden>
                                  {subheadline}
                                </p>
                              ))}

                        {hasHeadline && (
                          <h1
                            className={cn(
                              'hero-headline text-3xl font-semibold leading-tight tracking-tight text-white transition-all duration-[600ms] ease-out sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]',
                              textReveal ? 'translate-y-0 opacity-100 delay-[600ms]' : 'translate-y-4 opacity-0',
                            )}
                            aria-label={lines.filter(Boolean).join(' ')}
                          >
                            {useThreeLines ? (
                              <span className="block space-y-1 md:space-y-2">
                                {lines.map((line, i) =>
                                  line.trim() ? (
                                    <span key={i} className="block">
                                      <ScrambleText
                                        text={line}
                                        delayMs={textReveal ? 600 + i * 200 : 0}
                                        staggerMs={45}
                                        scrambleDurationMs={400}
                                        tickMs={35}
                                      />
                                    </span>
                                  ) : null,
                                )}
                              </span>
                            ) : (
                              <ScrambleText
                                text={lines[0] ?? ''}
                                delayMs={textReveal ? 600 : 0}
                                staggerMs={45}
                                scrambleDurationMs={400}
                                tickMs={35}
                              />
                            )}
                          </h1>
                        )}

                        {description && (
                          <AnimatedDescription text={description} mounted={textReveal} startDelay={1200} />
                        )}
                      </>
                    )}

                    {!hasTextContent && richText && (
                      <div
                        className={cn(
                          'prose prose-invert prose-lg max-w-none text-white transition-all duration-[600ms] ease-out',
                          textReveal ? 'translate-y-0 opacity-100 delay-[600ms]' : 'translate-y-4 opacity-0',
                        )}
                      >
                        <RichText data={richText} enableGutter={false} />
                      </div>
                    )}

                    {Array.isArray(links) && links.length > 0 && (
                      <div
                        className={cn(
                          'flex flex-wrap gap-2 transition-all duration-500 ease-out',
                          textReveal ? 'translate-y-0 opacity-100 delay-[1200ms]' : 'translate-y-2 opacity-0',
                        )}
                      >
                        {links.map((linkItem, i) => {
                          if (!linkItem?.link) return null
                          const isOutline = linkItem.link.appearance === 'outline'
                          return (
                            <CMSLink
                              key={i}
                              {...linkItem.link}
                              className={cn(
                                'inline-flex min-w-[120px] items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors sm:min-w-[140px]',
                                isOutline
                                  ? 'border-2 border-white bg-transparent text-white hover:bg-white/10'
                                  : 'bg-white text-neutral-900 shadow-md hover:bg-white/95 font-semibold',
                              )}
                            />
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)) && (
                  <div
                    className={cn(
                      'pointer-events-none block w-full overflow-visible shrink-0 mt-auto',
                      'lg:z-[4] pt-0 pb-0',
                      'max-lg:z-[3] mt-0',
                      mounted ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{
                      transition: 'opacity 500ms ease-out',
                      transitionDelay: `${HERO_MARQUEE_START_MS}ms`,
                    }}
                  >
                    <div className="pointer-events-auto pb-0">
                      <div className="w-full overflow-hidden pt-0">
                        {marqueeHeadline && (
                          <motion.div
                            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                            animate={mounted ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                            transition={{ duration: 0.5, delay: HERO_MARQUEE_START_MS / 1000, ease: 'easeOut' }}
                            className="mb-0 max-w-2xl pt-0"
                          >
                            {marqueeHeadlineReveal && (
                              <TextAnimate
                                animation="slideRight"
                                by="character"
                                duration={0.15}
                                once
                                startOnView={false}
                                as="p"
                                className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-800/90 dark:text-white/80"
                              >
                                {marqueeHeadline}
                              </TextAnimate>
                            )}
                          </motion.div>
                        )}
                        {Array.isArray(marqueeLogos) && marqueeLogos.length > 0 &&
                          (logoDisplayType === 'logoCarousel' ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={mounted ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.4, delay: HERO_MARQUEE_LOGOS_START_MS / 1000, ease: 'easeOut' }}
                            >
                              <LogoCarousel
                                logos={marqueeLogos
                                  .map((entry, i) => {
                                    const url = entry?.logo != null ? getMediaUrlSafe(entry.logo) : ''
                                    return url
                                      ? { id: i + 1, name: String(entry.alt ?? `Logo ${i + 1}`), imgUrl: url, alt: entry.alt ?? undefined }
                                      : null
                                  })
                                  .filter(Boolean) as { id: number; name: string; imgUrl: string; alt?: string }[]}
                                columnCount={3}
                                staggerRevealMs={180}
                                staggerStartAfterMs={HERO_MARQUEE_LOGOS_START_MS}
                              />
                            </motion.div>
                          ) : (
                            <Marquee
                              duration={40}
                              pauseOnHover
                              className="py-0"
                              fadeEdges
                              gapClassName="gap-6"
                              startAfterMs={
                                HERO_MARQUEE_LOGOS_START_MS +
                                Math.max(0, marqueeLogos.length - 1) * HERO_MARQUEE_ITEM_STAGGER_MS +
                                700
                              }
                            >
                              {marqueeLogos.map((entry, i) => {
                                const url = entry?.logo != null ? getMediaUrlSafe(entry.logo) : ''
                                if (!url) return null
                                const label = entry.alt ?? ''
                                const itemDelaySec = (HERO_MARQUEE_LOGOS_START_MS + i * HERO_MARQUEE_ITEM_STAGGER_MS) / 1000
                                const fromDir = { opacity: 0, x: 0, y: -36, scale: 0.5 }
                                return (
                                  <motion.div
                                    key={i}
                                    initial={fromDir}
                                    animate={mounted ? { opacity: 1, x: 0, y: 0, scale: 1 } : fromDir}
                                    transition={{ delay: itemDelaySec, type: 'spring', stiffness: 380, damping: 14 }}
                                    className="flex h-[45px] min-w-[5.5rem] shrink-0 items-center justify-center overflow-visible origin-center"
                                  >
                                    {label ? (
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <span className="inline-flex items-center justify-center">
                                            <div className={MARQUEE_LOGO_ITEM_CLASS}>
                                              <img src={url} alt={label} className="h-[45px] w-auto max-w-[5.5rem] object-contain hero-logo-grayscale" loading="lazy" decoding="async" />
                                            </div>
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">{label}</TooltipContent>
                                      </Tooltip>
                                    ) : (
                                      <div className={MARQUEE_LOGO_ITEM_CLASS}>
                                        <img src={url} alt="" className="h-[45px] w-auto max-w-[5.5rem] object-contain hero-logo-grayscale" loading="lazy" decoding="async" />
                                      </div>
                                    )}
                                  </motion.div>
                                )
                              })}
                            </Marquee>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
