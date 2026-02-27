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
import { getMediaUrl } from '@/utilities/getMediaUrl'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { HeroBackgroundPresetLayer } from '@/heros/HeroBackgroundPresetLayer'

/** Shape-Divider-Farbe: immer identisch zum Main-Content-Hintergrund (`--background`, Theme-abhängig). */
const WAVE_FILL = 'var(--background)' as const

/** Hero-Box: feste Klassennamen für SSR/Client – keine Abhängigkeit von Viewport/State, damit Hydration nicht divergiert. */
const HERO_BOX_WRAPPER_CLASS =
  'pointer-events-none absolute inset-x-0 top-[calc(0.5rem+5vh)] bottom-[5vh] max-lg:bottom-0 z-[2] -m-8 p-8 sm:-m-10 sm:p-10 md:top-[calc(1rem+6vh)] md:bottom-[6vh] md:-m-6 md:p-6 lg:-m-[60px] lg:p-[60px] lg:bottom-[6vh] overflow-hidden hero-box-animate'
const HERO_BOX_INNER_CLASS =
  'hero-box-inner h-full w-full rounded-2xl lg:rounded-3xl border-[0.5px] border-white/5 hero-box-frame-shadow'

const HeroBackgroundThree = dynamic(
  () => import('@/components/HeroBackgroundThree/HeroBackgroundThree').then((m) => m.HeroBackgroundThree),
  { ssr: false },
)
const HeroBackgroundVantaHalo = dynamic(
  () => import('@/components/HeroBackgroundVantaHalo/HeroBackgroundVantaHalo').then((m) => m.HeroBackgroundVantaHalo),
  { ssr: false },
)
const HeroAnimatedGridWave = dynamic(
  () => import('@/components/HeroAnimatedGridWave/HeroAnimatedGridWave'),
  { ssr: false },
)
const HeroBackgroundOrbit = dynamic(
  () => import('@/components/HeroBackgroundOrbit/HeroBackgroundOrbit').then((m) => m.HeroBackgroundOrbit),
  { ssr: false },
)
const HaloBackground = dynamic(
  () => import('@/components/HaloBackground/HaloBackground').then((m) => m.HaloBackground),
  { ssr: false },
)

type FloatingEl = {
  label: string
  icon?: number | { url?: string | null; id?: number } | null
  linkUrl?: string | null
  linkNewTab?: boolean | null
  position: 'topLeft' | 'topRight' | 'midLeft' | 'midRight' | 'bottomLeft' | 'bottomRight'
  offsetX?: number | null
  offsetY?: number | null
}

function splitIntoSegments(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

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
        <span
          key={index}
          className="block overflow-hidden"
        >
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
  topLeft: { left: 12, top: 18 },
  topRight: { left: 82, top: 18 },
  midLeft: { left: 14, top: 48 },
  midRight: { left: 80, top: 48 },
  bottomLeft: { left: 12, top: 78 },
  bottomRight: { left: 82, top: 78 },
}

function getMediaUrlSafe(media: unknown): string {
  if (media == null) return ''
  if (typeof media === 'object' && 'url' in media && media.url) return getMediaUrl(String(media.url)) || ''
  return ''
}

/**
 * PhilippBacher Hero – zweispaltig, Vordergrund-Bild rechts.
 * Linke Spalte: Subheadline → Headline → Beschreibung → CTAs.
 * Rechte Spalte: Vordergrund-Bild mit Einblend-Animation.
 * Optional: schwebende Elemente (Backend: floatingElements) mit Positionierung.
 */
/** Einflussradius der Maus – Items weichen dem Cursor aus (px) */
const FLOATING_MOUSE_RADIUS = 320
/** Idle-Schweben: Dauer einer Sinus-Periode in ms (größer = langsamer) */
const FLOATING_IDLE_PERIOD_MS = 4000

/** Einblend-Reihenfolge (ms): Buttons enden bei 2500, Vordergrundbild dann Marquee, dann Floating */
const HERO_BUTTONS_DELAY_MS = 2500
/** Vordergrundbild: Reveal ab 2000ms, Animation 2.2s → Marquee erst danach starten */
const HERO_FOREGROUND_REVEAL_MS = 2000
const HERO_FOREGROUND_ANIMATION_MS = 2200
const HERO_MARQUEE_START_MS = HERO_FOREGROUND_REVEAL_MS + HERO_FOREGROUND_ANIMATION_MS
const HERO_MARQUEE_LOGOS_START_MS = HERO_MARQUEE_START_MS
const HERO_MARQUEE_ITEM_STAGGER_MS = 280
/** Nach dem Laden: Marquee als „fertig“ betrachten (ms) – danach dürfen Floating-Items freigegeben werden */
const HERO_MARQUEE_READY_AFTER_MS = HERO_MARQUEE_START_MS + 900
/** Maus muss mindestens so lange im Hero sein, bevor Floating-Items aufpoppen (ms) */
const HERO_MOUSE_MIN_INSIDE_MS = 1000
/** Versatz zwischen den Floating-Items beim Aufpoppen (ms) */
const HERO_FLOATING_POP_STAGGER_MS = 1000

export const PhilippBacherHero: React.FC<any> = (props) => {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [textReveal, setTextReveal] = useState(false)
  const [foregroundReveal, setForegroundReveal] = useState(false)
  const [marqueeHeadlineReveal, setMarqueeHeadlineReveal] = useState(false)
  const [floatingUnlock, setFloatingUnlock] = useState(false)
  const [waveFill, setWaveFill] = useState<string>(WAVE_FILL)
  const [themeKey, setThemeKey] = useState<string>('')
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
  const floatingCount =
    props && Array.isArray((props as any).floatingElements)
      ? (props as any).floatingElements.filter((el: any) => {
          const url = el?.icon != null ? getMediaUrlSafe(el.icon) : ''
          const hasLabel = el?.label != null && String(el.label).trim() !== ''
          return url !== '' || hasLabel
        }).length
      : 0
  const floatingMouseStrength = (props as any)?.floatingMouseStrength as number | undefined
  const floatingIdleAmplitude = (props as any)?.floatingIdleAmplitude as number | undefined

  useEffect(() => {
    mountTimeRef.current = Date.now()
    const idMount = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true))
    })
    const idText = setTimeout(() => setTextReveal(true), 800)
    const idForeground = setTimeout(() => setForegroundReveal(true), HERO_FOREGROUND_REVEAL_MS)
    const idMarqueeHeadline = setTimeout(() => setMarqueeHeadlineReveal(true), HERO_MARQUEE_START_MS)

    const animateScroll = () => {
      const current = scrollCurrentRef.current
      const target = scrollTargetRef.current
      const diff = target - current

      if (Math.abs(diff) < 0.5) {
        scrollCurrentRef.current = target
        setScrollOffset(target)
        scrollRafIdRef.current = null
        return
      }

      const next = current + diff * 0.18
      scrollCurrentRef.current = next
      setScrollOffset(next)
      scrollRafIdRef.current = window.requestAnimationFrame(animateScroll)
    }

    const handleScroll = () => {
      scrollTargetRef.current = window.pageYOffset
      if (scrollRafIdRef.current == null) {
        scrollRafIdRef.current = window.requestAnimationFrame(animateScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    const mq = window.matchMedia?.('(max-width: 767.98px)')
    const updateViewport = () => setIsMobileViewport(Boolean(mq && mq.matches))
    try {
      if (mq) {
        updateViewport()
        if (typeof mq.addEventListener === 'function') {
          mq.addEventListener('change', updateViewport)
        } else if (typeof (mq as any).addListener === 'function') {
          ;(mq as any).addListener(updateViewport)
        }
      }
    } catch {
      // ignore matchMedia errors
    }
    return () => {
      cancelAnimationFrame(idMount)
      clearTimeout(idText)
      clearTimeout(idForeground)
      clearTimeout(idMarqueeHeadline)
      window.removeEventListener('scroll', handleScroll)
      if (scrollRafIdRef.current != null) {
        window.cancelAnimationFrame(scrollRafIdRef.current)
        scrollRafIdRef.current = null
      }
      if (mq) {
        try {
          if (typeof mq.removeEventListener === 'function') {
            mq.removeEventListener('change', updateViewport)
          } else if (typeof (mq as any).removeListener === 'function') {
            ;(mq as any).removeListener(updateViewport)
          }
        } catch {
          // ignore
        }
      }
    }
  }, [])

  // Nur bei echter Langsamverbindung (2g/slow-2g) Vanta/Three weglassen; auf Mobil mit 3g/4g wieder anzeigen.
  useEffect(() => {
    if (!mounted) return
    const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
    const effectiveType = conn?.effectiveType ?? ''
    const isSlowConnection = effectiveType === '2g' || effectiveType === 'slow-2g'
    setSkipHeavyBackground(isSlowConnection)
  }, [mounted])

  // Schwere Hintergründe (Three/Vanta/Grid) erst nach LCP laden, um TBT/FCP zu verbessern.
  // Mindestverzögerung 1.8s, dann requestIdleCallback oder Fallback 3s.
  const DEFER_MIN_MS = 1800
  const DEFER_FALLBACK_MS = 3000
  useEffect(() => {
    if (skipHeavyBackground) return
    let cancelled = false
    const apply = () => {
      if (!cancelled) setDeferHeavyBackground(true)
    }
    const afterMinDelay = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(apply, { timeout: DEFER_FALLBACK_MS - DEFER_MIN_MS })
      } else {
        window.setTimeout(apply, 200)
      }
    }
    const minDelayId = window.setTimeout(afterMinDelay, DEFER_MIN_MS)
    const fallbackId = window.setTimeout(apply, DEFER_FALLBACK_MS)
    return () => {
      cancelled = true
      clearTimeout(minDelayId)
      clearTimeout(fallbackId)
    }
  }, [skipHeavyBackground])

  // Floating-Items erst freigeben, wenn Marquee „geladen“ ist und Maus mind. 1 s im Hero war
  useEffect(() => {
    if (floatingCount === 0 || floatingUnlock) return
    const id = setInterval(() => {
      if (!mounted) return
      const now = Date.now()
      const marqueeReady = now - mountTimeRef.current >= HERO_MARQUEE_READY_AFTER_MS
      const mouse = mouseRef.current
      if (!mouse.inside || !marqueeReady) return
      const enteredAt = mouse.enteredAt ?? now
      if (now - enteredAt < HERO_MOUSE_MIN_INSIDE_MS) return
      setFloatingUnlock(true)
    }, 250)
    return () => clearInterval(id)
  }, [mounted, floatingCount, floatingUnlock])

  // Wellen-Farbe + Theme-Key aus data-theme (Key sorgt nach Theme-Wechsel für Remount von Halo/Gitter)
  useEffect(() => {
    const read = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      const t = theme === 'light' || theme === 'dark' ? theme : 'light'
      // Wellen verwenden immer denselben Farb-Token wie der Main-Content-Hintergrund
      setWaveFill(WAVE_FILL)
      setThemeKey(t)
    }
    read()
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && m.attributeName === 'data-theme')) read()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  // Floating Elements: minimales Schweben/Verschieben wenn Maus in der Nähe (window-Listener, damit Events nicht von overlay/Content blockiert werden)
  useEffect(() => {
    if (floatingCount === 0) return

    const onMove = (e: MouseEvent) => {
      const section = heroSectionRef.current
      if (!section) return
      const sr = section.getBoundingClientRect()
      const inside = e.clientX >= sr.left && e.clientX <= sr.right && e.clientY >= sr.top && e.clientY <= sr.bottom
      const prev = mouseRef.current
      const enteredAt =
        inside
          ? prev.inside
            ? prev.enteredAt
            : Date.now()
          : null
      mouseRef.current = { x: e.clientX, y: e.clientY, inside, enteredAt }
    }

    window.addEventListener('mousemove', onMove)

    const startTime = typeof performance !== 'undefined' ? performance.now() : 0
    let rafId = 0
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const mouse = mouseRef.current
      const refs = floatingElRefs.current
      const time = (typeof performance !== 'undefined' ? performance.now() : startTime) - startTime
      const phase = (time / FLOATING_IDLE_PERIOD_MS) * Math.PI * 2

      for (let i = 0; i < floatingCount; i++) {
        const el = refs[i]
        if (!el) continue

        const idleAmp = floatingIdleAmplitude ?? 4
        const idleX = Math.sin(phase + i * 0.7) * idleAmp
        const idleY = Math.cos(phase + i * 0.5) * idleAmp * 0.8

        let mouseOx = 0
        let mouseOy = 0
        if (mouse.inside) {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = mouse.x - cx
          const dy = mouse.y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < FLOATING_MOUSE_RADIUS) {
            const t = 1 - dist / FLOATING_MOUSE_RADIUS
            const strength = (floatingMouseStrength ?? 6.5) / 100
            mouseOx = -dx * strength * t
            mouseOy = -dy * strength * t
          }
        }

        const tx = mouseOx + idleX
        const ty = mouseOy + idleY
        el.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px)`
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
    mediaType = 'halo',
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
  } = props

  const useThreeLines =
    [headlineLine1, headlineLine2, headlineLine3].filter(Boolean).length >= 1
  const lines = useThreeLines
    ? [headlineLine1 ?? '', headlineLine2 ?? '', headlineLine3 ?? '']
    : [headline ?? ''].filter(Boolean)
  const hasHeadline = lines.some((l) => l.trim() !== '')

  const isMediaObject = (v: unknown) =>
    typeof v === 'object' && v != null && ('url' in v || 'mimeType' in v)

  const effectiveMediaType =
    isMobileViewport && mediaTypeMobile && mediaTypeMobile !== 'auto' ? mediaTypeMobile : mediaType

  const backgroundMedia =
    effectiveMediaType === 'video' && backgroundVideo && isMediaObject(backgroundVideo)
      ? backgroundVideo
      : effectiveMediaType === 'image' && isMediaObject(backgroundImage)
        ? backgroundImage
        : isMediaObject(props.media)
          ? props.media
          : null
  const useBackgroundAnimation = effectiveMediaType === 'animation'
  const useBackgroundHalo = effectiveMediaType === 'halo'
  const useBackgroundCssHalo = effectiveMediaType === 'cssHalo'
  const useBackgroundOrbit = effectiveMediaType === 'orbit'
  const showHaloLayer = useBackgroundHalo && useHaloBackground
  const showGridOverlay = useBackgroundHalo

  const hasTextContent = hasHeadline || subheadline || description || richText
  const foregroundMedia = foregroundImage && isMediaObject(foregroundImage) ? foregroundImage : null
  const hasMarquee = Boolean(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0))

  const rawCustomGridCode =
    typeof haloOverlayGridCustomCode === 'string'
      ? haloOverlayGridCustomCode.trim()
      : haloOverlayGridCustomCode && typeof haloOverlayGridCustomCode === 'object' && 'code' in haloOverlayGridCustomCode && typeof (haloOverlayGridCustomCode as { code?: string }).code === 'string'
        ? (haloOverlayGridCustomCode as { code: string }).code.trim()
        : ''
  // Transparenten Hintergrund in den iframe-HTML injizieren, damit der Vanta-Halo durchscheint
  let customGridCode = ''
  if (rawCustomGridCode) {
    try {
      const style = '<style>html,body{background:transparent !important;}</style>'
      const s = String(rawCustomGridCode)
      if (/<head\b/i.test(s)) customGridCode = s.replace(/(<head\b[^>]*>)/i, `$1${style}`)
      else if (/<html\b/i.test(s)) customGridCode = s.replace(/(<html\b[^>]*>)/i, `$1<head>${style}</head>`)
      else customGridCode = style + s
    } catch {
      customGridCode = rawCustomGridCode
    }
  }

  const easedScroll = Math.min(scrollOffset, 1200)
  const scrollFactor = easedScroll / 1200
  const scale = 1 + 0.03 * scrollFactor
  const translateY = 40 * scrollFactor
  const overlayNum = Number(overlayOpacity ?? 0.45)
  const overlayRaw = Number.isFinite(overlayNum)
    ? Math.min(Math.max(0, overlayNum + scrollFactor * 0.35), 0.75)
    : 0.45
  // Für CSS-Halo, Orbit und Bild/Video-Hintergründe das Overlay deutlich schwächer halten,
  // damit der Hintergrund nicht „verschwindet“.
  const overlay =
    useBackgroundHalo || useBackgroundCssHalo || useBackgroundOrbit || backgroundMedia
      ? Math.min(overlayRaw, 0.3)
      : overlayRaw

  const floatingListRaw = Array.isArray(floatingElements) ? (floatingElements as FloatingEl[]) : []
  const floatingList = floatingListRaw.filter(
    (el) => getMediaUrlSafe(el.icon) !== '' || (el.label != null && String(el.label).trim() !== ''),
  )

  return (
    <section
      ref={heroSectionRef}
      className="relative flex flex-col justify-center items-stretch overflow-visible bg-neutral-950 -mt-24 pt-48 text-white min-h-[96vh] md:min-h-[100dvh] lg:min-h-[min(90vh,777px)] max-h-[777px] mb-12 md:mb-16 lg:mb-20"
      aria-label="Hero"
    >
      {/* Optionaler globaler Hintergrund-Layer (Orbit/Halo/Gradient) ganz hinten */}
      <HeroBackgroundPresetLayer preset={backgroundPreset as any} />

      {/* Hero-spezifischer Hintergrund (Vanta/Halo/Orbit/Bild) auf unterster Ebene.
          Kein Scroll-Transform mehr, damit zwischen Shape-Divider und darunterliegendem Content keine Lücke entsteht. */}
      <div className="hero-bg-wrap absolute inset-0 z-0">
        <div className="hero-pattern-bg absolute inset-0" aria-hidden />
        {useBackgroundHalo ? (
          <div key={themeKey || 'halo'} className="hero-halo-layer absolute inset-0 w-full h-full">
            {showHaloLayer ? (
              deferHeavyBackground ? (
                <HeroBackgroundVantaHalo
                  className="absolute inset-0 w-full h-full"
                  options={{
                    amplitudeFactor: haloAmplitudeFactor ?? 1.8,
                    size: haloSize ?? 2.1,
                    speed: ((haloSpeed ?? 1) * 0.125),
                    color2: haloColor2 ?? 15918901,
                    xOffset: haloXOffset ?? 0.15,
                    yOffset: haloYOffset ?? -0.03,
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-950" aria-hidden />
              )
            ) : (
              <div className="absolute inset-0 bg-neutral-950" aria-hidden />
            )}
            {showGridOverlay && (haloOverlayGridVariant === 'wave' ? (
              <>
                <div
                  className="hero-halo-overlay-gradient absolute inset-0 pointer-events-none"
                  aria-hidden
                  style={
                    {
                      '--halo-overlay-gradient': Number(haloOverlayGradient ?? 0.68),
                    } as React.CSSProperties
                  }
                />
                {deferHeavyBackground && (
                  <HeroAnimatedGridWave className="absolute inset-0 w-full h-full pointer-events-none" />
                )}
              </>
            ) : haloOverlayGridVariant === 'custom' && customGridCode ? (
              <>
                <div
                  className="hero-halo-overlay-gradient absolute inset-0 pointer-events-none"
                  aria-hidden
                  style={
                    {
                      '--halo-overlay-gradient': Number(haloOverlayGradient ?? 0.68),
                    } as React.CSSProperties
                  }
                />
                <iframe
                  title="Hero Gitter Overlay"
                  className="absolute inset-0 w-full h-full pointer-events-none border-0"
                  sandbox="allow-scripts"
                  srcDoc={customGridCode}
                />
              </>
            ) : (
              <div
                className="hero-halo-overlay absolute inset-0 pointer-events-none"
                aria-hidden
                style={
                  {
                    '--halo-overlay-gradient': Number(haloOverlayGradient ?? 0.68),
                    '--halo-overlay-grid': Number(haloOverlayGrid ?? 0.08),
                    '--halo-overlay-grid-size': `${Number(haloOverlayGridSize ?? 12)}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        ) : useBackgroundCssHalo ? (
          <HaloBackground />
        ) : useBackgroundOrbit ? (
          <HeroBackgroundOrbit className="absolute inset-0 w-full h-full" />
        ) : useBackgroundAnimation ? (
          deferHeavyBackground ? (
            <HeroBackgroundThree className="absolute inset-0 w-full h-full" />
          ) : (
            <div className="absolute inset-0 bg-neutral-950" aria-hidden />
          )
        ) : (
          backgroundMedia && (
            <Media
              resource={backgroundMedia}
              fill
              imgClassName="object-cover w-full h-full"
              priority
            />
          )
        )}
      </div>

      {/* Overlay: hinter Hintergrund, unter Wellen und hinter Vordergrund (z-[1]). Schwarzer Anteil mit gleichem radialen Verlauf wie Hero-Box (oben rechts transparent). */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          <div
            className="hero-overlay-base absolute inset-0 transition-opacity duration-200"
            style={{
              ['--hero-overlay' as string]: String(Math.min(1, Math.max(0, overlay))),
            }}
          />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="hero-edge-darken absolute inset-0" />
      </div>

      {/* Inhalt: linke Spalte + Vordergrundbild + Marquee innerhalb der Herobox (Container begrenzt alles) */}
      <div
        className={cn(
          'container relative z-10 flex min-h-0 flex-1 flex-col px-6 pt-[calc(6rem+3vh)] pb-0 lg:grid lg:h-full lg:w-full lg:grid-cols-[3fr_2fr] lg:flex-none lg:gap-16 lg:px-8 lg:pt-[calc(8rem+3vh)] lg:pb-0 xl:gap-20 pointer-events-none',
          foregroundMedia ? 'max-lg:justify-end' : 'lg:grid-cols-1 lg:items-center',
          foregroundMedia && 'lg:items-end',
        )}
      >
        {/* Hero-Box-Rahmen: auf allen Viewports sichtbar. -m/p damit overflow-hidden den Schatten nicht abschneidet. Klassen konstant für stabile Hydration. */}
        <div className={HERO_BOX_WRAPPER_CLASS}>
          <div className={HERO_BOX_INNER_CLASS} />
        </div>

        {/* Vordergrund-Bild: hinter der Hero-Box (z-0), damit die transparente obere rechte Ecke der Box das Bild durchscheinen lässt. Box hat z-[2]. */}
        {foregroundMedia && (
          <div
            className={cn(
              'pointer-events-none absolute right-0 bottom-0 overflow-visible transition-opacity duration-500 ease-out z-0 max-lg:z-[1]',
              'max-lg:inset-x-0 max-lg:top-[calc(0.5rem+5vh)] max-lg:bottom-0 max-lg:flex max-lg:justify-end max-lg:items-end max-lg:w-full',
              'md:top-[calc(1rem+6vh)] md:bottom-[6vh]',
              'lg:right-[-2%] lg:top-[-3%] lg:bottom-[6vh] lg:w-[41%] lg:max-w-[414px] lg:max-h-none',
              'xl:right-auto xl:left-[60%]',
              mounted && foregroundReveal ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div
              className={cn(
                'hero-foreground-reveal max-lg:w-[min(88vw,394px)] max-lg:h-full max-lg:max-h-full max-lg:min-h-0 max-lg:shrink-0 lg:scale-[1.034] origin-bottom-right',
                mounted && foregroundReveal && 'hero-foreground-reveal-active',
              )}
            >
              <div className="hero-foreground-scan1">
                <Media
                  resource={foregroundMedia}
                  priority
                  size="(max-width: 1024px) 414px, 414px"
                  imgClassName="max-w-full max-h-full w-auto h-auto object-contain object-bottom"
                />
              </div>
              <div className="hero-foreground-scan2">
                <Media
                  resource={foregroundMedia}
                  priority
                  size="(max-width: 1024px) 414px, 414px"
                  imgClassName="max-w-full max-h-full w-auto h-auto object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        )}

        {/* Linke Spalte: am Fuß – Flex pushed Content nach unten */}
        <div
          className={cn(
            'relative z-10 flex w-full flex-col text-left pointer-events-none',
            foregroundMedia ? 'max-w-full' : 'max-w-2xl lg:self-center',
            foregroundMedia ? 'lg:justify-end lg:mr-auto' : 'lg:justify-center',
            // Zusätzlicher Abstand nach unten, wenn Marquee aktiv ist, damit sich Beschreibung/CTAs nicht mit der Marquee-Überschrift überschneiden
            hasMarquee
              ? 'pb-[10vh] sm:pb-[12vh] md:pb-[calc(16vh+56px)] lg:pb-[calc(18vh+64px)]'
              : 'pb-[5vh]',
            /* Abstand zum unteren Rand; Portrait SE/Pro Max/PlayBook: ca. 3% zum Browser-Rand */
            foregroundMedia && 'max-lg:pb-[calc(18vh+1rem)] max-lg:landscape-short:pb-[calc(14vh+0.5rem)]',
            foregroundMedia && 'hero-se:pb-[3vh] hero-pro-max:pb-[3vh] hero-playbook:pb-[3vh]',
          )}
        >
          <div className={cn('pointer-events-auto w-max max-w-full', foregroundMedia ? '' : 'max-w-2xl')}>
          {/* Einblendung nacheinander, Gesamtdauer 3s: Subheadline → Headline → Beschreibung → CTAs */}
          <div className="space-y-6 md:space-y-7">
            {hasTextContent && (
              <>
                {subheadline &&
                  (textReveal ? (
                    <TextAnimate
                      animation="slideRight"
                      by="character"
                      duration={0.12}
                      once
                      startOnView={false}
                      as="p"
                      className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 sm:text-sm"
                    >
                      {subheadline}
                    </TextAnimate>
                  ) : (
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 opacity-0 sm:text-sm" aria-hidden>
                      {subheadline}
                    </p>
                  ))}
                {hasHeadline && (
                  <h1
                    className={cn(
                      'text-3xl font-semibold leading-tight tracking-tight text-white transition-all duration-[600ms] ease-out sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]',
                      textReveal ? 'translate-y-0 opacity-100 delay-[600ms]' : 'translate-y-4 opacity-0',
                    )}
                    aria-label={lines.join(' ')}
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
                {description && <AnimatedDescription text={description} mounted={textReveal} startDelay={1200} />}
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
                  'flex flex-wrap gap-3 pt-2 transition-all duration-500 ease-out sm:gap-4',
                  textReveal ? 'translate-y-0 opacity-100 delay-[2500ms]' : 'translate-y-2 opacity-0',
                )}
              >
                {links.map((linkItem: { link?: any }, i: number) => {
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
        </div>

        {/* Logo-Bereich: ab 768px; Einblendung chronologisch nach Buttons, innerhalb der Herobox fixiert */}
        {(marqueeHeadline || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)) && (
          <div
            className={cn(
              // Am oberen Rand des Shape-Dividers ausrichten, damit Marquee innerhalb der Herobox bleibt (6vh = Box-Unterkante, überlappt 9vh-Divider)
              'pointer-events-none absolute inset-x-0 bottom-[6vh] z-[4] max-lg:z-0 hidden md:block',
              mounted ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              transition: 'opacity 500ms ease-out',
              transitionDelay: `${HERO_MARQUEE_START_MS}ms`,
            }}
            >
            <div className="pointer-events-auto pb-[1.75vh] sm:pb-[2vh]">
              <div className="container mx-auto px-4">
                <div className="w-full overflow-hidden pt-6 sm:pt-9">
                {marqueeHeadline && (
                  <motion.div
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                    animate={mounted ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                    transition={{ duration: 0.5, delay: HERO_MARQUEE_START_MS / 1000, ease: 'easeOut' }}
                    className="mb-6 max-w-2xl pt-9 sm:pt-12"
                  >
                    {marqueeHeadlineReveal && (
                      <TextAnimate
                        animation="slideRight"
                        by="character"
                        duration={0.15}
                        once
                        startOnView={false}
                        as="p"
                        className="text-xs font-medium uppercase tracking-[0.2em] text-white/80"
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
                      transition={{
                        duration: 0.4,
                        delay: HERO_MARQUEE_LOGOS_START_MS / 1000,
                        ease: 'easeOut',
                      }}
                    >
                      <LogoCarousel
                        logos={marqueeLogos
                          .map((entry: { logo?: unknown; alt?: string | null }, i: number) => {
                            const url = entry?.logo != null ? getMediaUrlSafe(entry.logo) : ''
                            return url ? { id: i + 1, name: String(entry.alt ?? `Logo ${i + 1}`), imgUrl: url, alt: entry.alt ?? undefined } : null
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
                      className="py-1.5"
                      fadeEdges
                      gapClassName="gap-6"
                      startAfterMs={
                        HERO_MARQUEE_LOGOS_START_MS +
                        Math.max(0, marqueeLogos.length - 1) * HERO_MARQUEE_ITEM_STAGGER_MS +
                        700
                      }
                    >
                      {marqueeLogos.map((entry: { logo?: unknown; alt?: string | null }, i: number) => {
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
                            transition={{
                              delay: itemDelaySec,
                              type: 'spring',
                              stiffness: 380,
                              damping: 14,
                            }}
                            className="flex h-[45px] min-w-[5.5rem] shrink-0 items-center justify-center overflow-visible origin-center"
                          >
                            {label ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="hero-logo-marquee-item flex h-[45px] cursor-default items-center justify-center origin-center transition-transform duration-200 hover:scale-[1.2] [&_img]:h-[45px] [&_img]:w-auto [&_img]:max-w-[5.5rem] [&_img]:object-contain">
                                    <img src={url} alt={label} className="h-[45px] w-auto max-w-[5.5rem] object-contain hero-logo-grayscale" loading="lazy" decoding="async" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top">{label}</TooltipContent>
                              </Tooltip>
                            ) : (
                              <div className="hero-logo-marquee-item flex h-[45px] cursor-default items-center justify-center origin-center transition-transform duration-200 hover:scale-[1.2] [&_img]:h-[45px] [&_img]:w-auto [&_img]:max-w-[5.5rem] [&_img]:object-contain">
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
          </div>
        )}

      </div>

      {/* Floating Elements (aus Backend) */}
      {floatingList.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="container relative h-full w-full">
            {floatingList.map((el, i) => {
              const preset = POSITION_MAP[el.position] ?? POSITION_MAP.topRight
              const left = preset.left + (el.offsetX ?? 0)
              const top = preset.top + (el.offsetY ?? 0)
              const iconUrl = el.icon && getMediaUrlSafe(el.icon) ? getMediaUrlSafe(el.icon) : ''
              const hasLabel = el.label != null && String(el.label).trim() !== ''
              const content = (
                <>
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={hasLabel ? String(el.label).trim() : ''}
                      className="size-8 object-contain sm:size-10"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  {hasLabel ? (
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
                  ) : null}
                </>
              )
              return (
                <motion.div
                  key={i}
                  ref={(node) => {
                    floatingElRefs.current[i] = node
                  }}
                  className={cn(
                    'absolute flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm transition-transform duration-200 hover:scale-105',
                    el.linkUrl && 'pointer-events-auto',
                  )}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.2s ease-out',
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
                  ) : (
                    content
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Section-Divider 1: Steigung von links nach rechts (links niedriger, rechts höher). */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-[2] h-[9vh] min-h-[72px] w-full hero-shape-divider"
        aria-hidden
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          <path
            d="M0,70 C200,48 400,82 600,56 C800,28 1000,68 1200,38 L1200,120 L0,120 Z"
            style={{ fill: waveFill, opacity: 1 }}
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%', opacity: 0.5, transform: 'translateX(3%)' }}
        >
          <path
            d="M0,68 C200,54 400,78 600,58 C800,42 1000,72 1200,42 L1200,120 L0,120 Z"
            style={{ fill: waveFill }}
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%', opacity: 0.22 }}
        >
          <path
            d="M0,72 C200,58 400,82 600,60 C800,46 1000,76 1200,44 L1200,120 L0,120 Z"
            style={{ fill: waveFill }}
          />
        </svg>
      </div>

      {/* Section-Divider 2: Über der 1. Ebene, 33% Opacity, mind. 15px höher, minimal kleinere Amplitude. */}
      <div
        className="pointer-events-none absolute left-0 right-0 z-[3] h-[9vh] min-h-[72px] w-full hero-shape-divider"
        style={{ opacity: 0.33, transform: 'translateY(-15px)' }}
        aria-hidden
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          <path
            d="M0,70 C200,54 400,78 600,56 C800,34 1000,66 1200,38 L1200,120 L0,120 Z"
            style={{ fill: waveFill, opacity: 1 }}
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%', opacity: 0.5, transform: 'translateX(4%)' }}
        >
          <path
            d="M0,68 C200,58 400,76 600,58 C800,44 1000,70 1200,42 L1200,120 L0,120 Z"
            style={{ fill: waveFill }}
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%', opacity: 0.22 }}
        >
          <path
            d="M0,72 C200,62 400,80 600,60 C800,48 1000,74 1200,44 L1200,120 L0,120 Z"
            style={{ fill: waveFill }}
          />
        </svg>
      </div>
    </section>
  )
}
