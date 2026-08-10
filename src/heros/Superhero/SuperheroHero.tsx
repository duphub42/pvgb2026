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
import Image, { getImageProps } from 'next/image'
import React from 'react'
import gsap from 'gsap'
import { HeroLogoMarquee, type HeroMarqueeLogoRow } from '@/heros/HeroLogoMarquee'
import { LogoCarousel, type LogoCarouselLogo } from '@/components/ui/logo-carousel'
import {
  resolveHeroImageSrc,
  resolveHeroImageSrcForNextImage,
} from '@/utilities/resolveHeroImageSrc'
import { cn } from '@/utilities/ui'
import { PopoutPortrait } from '@/components/PopoutPortrait'
import type { Locale } from '@/utilities/locale'

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
  logoDisplayType?: 'marquee' | 'logoCarousel' | null

  // ─── Stats ─────────────────────────────────────────────────────────────────
  showHeroStats?: boolean | null
  stats?: Array<{ id?: string | null; icon?: string | null; value: string; label: string }> | null

  // ─── Meta ─────────────────────────────────────────────────────────────────
  sectionAriaLabel?: string | null
  dataHeroType?: string | null
  pageSlug?: string | null
  locale?: Locale
}

const DECODE_TAG_PATTERN = /<decode>([\s\S]*?)<\/decode>/gi
const HOME_PROFILE_POPOUT_FALLBACK_SRC = '/api/media/stream/1360'

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
  logoDisplayType,
  showHeroStats,
  stats,
  sectionAriaLabel,
  dataHeroType,
  pageSlug,
  locale = 'de',
}) => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const portraitRef = React.useRef<HTMLDivElement | null>(null)
  const desktopBgImageRef = React.useRef<HTMLImageElement | null>(null)
  const [decodeReady, setDecodeReady] = React.useState(false)
  const [decodeInView, setDecodeInView] = React.useState(false)
  const [bgImageFailed, setBgImageFailed] = React.useState(false)

  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const host = section.closest('article')

    let rafId = 0
    let introTimeoutId = 0
    let effectsTimeoutId = 0
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
    // Home mobile pin only (see isHomeMobilePin below): progress 0.3 is where the icon
    // reveal starts (--home-hero-icon-in in globals.part1.css) - that's the build-up/
    // icon-onward split point. 0.55 of the (extended) scroll runway is spent reaching
    // just that first 0.3 of progress, so the build-up is paced roughly 2.85x slower
    // than the icon-onward tail (which keeps its existing, already-tuned pace).
    const BUILD_UP_PROGRESS_SHARE = 0.3
    const BUILD_UP_SCROLL_SHARE = 0.55
    let lastProgress = ''
    let lastContentProgress = ''
    let lastPortraitParallaxProgress = ''
    let lastPortraitHideProgress = ''
    let lastPortraitHardHideProgress = ''
    let scrollProgressListening = false
    let startScrollProgressTracking: (() => void) | null = null
    let pinStageEl: HTMLElement | null | undefined
    const effectsGestureAbort = new AbortController()

    const enableHeroEffects = () => {
      // Expensive GPU work (backdrop-filter, will-change) must not run during the LCP
      // measurement window. Idle timeouts (~2.5s) are still inside Lighthouse mobile LCP.
      if (section.getAttribute('data-hero-effects') === 'ready') return
      section.setAttribute('data-hero-effects', 'ready')
      if (host) host.setAttribute('data-hero-effects', 'ready')
      startScrollProgressTracking?.()
      effectsGestureAbort.abort()
      if (effectsTimeoutId !== 0) {
        window.clearTimeout(effectsTimeoutId)
        effectsTimeoutId = 0
      }
    }

    // Intro animations stay off on mobile for LCP; desktop can opt in after first paint.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // This is the ONLY smoothing layer for scroll-driven motion (the CSS that reads
    // these vars intentionally carries transition:none - see globals.part1.css - so
    // it doesn't re-ease on top of this and double-smooth into a wobble). A hard, fast
    // flick covers the whole scroll-progress range in ~50-100ms of input; at a short
    // duration (0.18s, tried first) the tween can't keep up and visibly finishes playing
    // after the scroll gesture has already stopped, reading as a glitch. Slower on
    // purpose so the reveal stays perceptible even on an aggressive scroll, at the cost
    // of a slight lag behind the scrollbar during normal-speed scrolling.
    // power3.out is heavily front-loaded - at duration=1 it was already ~87% done by
    // 400ms, so nearly all visible motion happened in well under half the "duration" and
    // the rest was an imperceptible tail. Raising duration alone couldn't fix that; the
    // curve itself needed to spread the motion out. sine.out is far gentler/more even.
    const tweenDuration = prefersReducedMotion ? 0 : 1
    const tweenEase = prefersReducedMotion ? 'none' : 'sine.out'
    const createProgressSetter = (target: HTMLElement, property: string) =>
      gsap.quickTo(target, property, {
        duration: tweenDuration,
        ease: tweenEase,
        overwrite: 'auto',
      })
    const sectionProgressTo = createProgressSetter(section, '--hero-scroll-progress')
    // Coarser, quantized copy of progress - only consumed by the background photo's
    // filter: blur()/saturate() (see globals.part1.css, mobile-scoped) and this file's
    // own background-color fade. Both force a full repaint of a large, blurred element
    // on every value change (unlike the transform-based motion elsewhere, which the GPU
    // composites for free) - stepping their input to ~12 discrete values instead of a
    // continuous one cuts that repaint work roughly 1:1 with the step count while
    // staying visually indistinguishable from continuous (blur changes are subtle to
    // begin with). Everything else keeps reading the smooth --hero-scroll-progress.
    const sectionSteppedProgressTo = createProgressSetter(section, '--hero-scroll-blur-progress')
    const sectionContentProgressTo = createProgressSetter(section, '--hero-scroll-content-progress')
    const sectionPortraitParallaxProgressTo = createProgressSetter(
      section,
      '--hero-scroll-portrait-parallax-progress',
    )
    const sectionPortraitHideProgressTo = createProgressSetter(
      section,
      '--hero-scroll-portrait-hide-progress',
    )
    const sectionPortraitHardHideProgressTo = createProgressSetter(
      section,
      '--hero-scroll-portrait-hard-hide-progress',
    )
    const hostProgressTo = host ? createProgressSetter(host, '--hero-scroll-progress') : null
    const hostContentProgressTo = host
      ? createProgressSetter(host, '--hero-scroll-content-progress')
      : null
    const hostPortraitParallaxProgressTo = host
      ? createProgressSetter(host, '--hero-scroll-portrait-parallax-progress')
      : null
    const hostPortraitHideProgressTo = host
      ? createProgressSetter(host, '--hero-scroll-portrait-hide-progress')
      : null
    const hostPortraitHardHideProgressTo = host
      ? createProgressSetter(host, '--hero-scroll-portrait-hard-hide-progress')
      : null

    const updateScrollProgress = (instant = false) => {
      rafId = 0
      const rect = section.getBoundingClientRect()
      const isHomeHero = section.getAttribute('data-page-slug') === 'home'
      // Home mobile: the section itself is made tall (see globals.part1.css,
      // [data-page-slug='home'] @media max-width:479px) so an inner stage can sit
      // sticky at top:0 and "pin" while the user scrolls through that extra height -
      // progress here must track how far through THAT pin runway we are, not the
      // 0.92/0.72-of-hero-height heuristic used everywhere else (which assumes the
      // section scrolls normally and is roughly one screen tall).
      const isHomeMobilePin = isHomeHero && window.matchMedia('(max-width: 479px)').matches
      // The pinned stage is capped at the iPhone SE's height (see globals.part1.css,
      // --home-hero-mobile-stage-cap) rather than always matching window.innerHeight on
      // taller phones, so the pin-release point must be measured against the stage's
      // real height, not the viewport's.
      const pinStageHeight = isHomeMobilePin
        ? (pinStageEl ??=
            section.querySelector<HTMLElement>('.hero-mobile-pin-stage'))?.getBoundingClientRect()
            .height
        : undefined
      const scrollDistance = isHomeMobilePin
        ? Math.max(rect.height - (pinStageHeight || window.innerHeight), 1)
        : Math.max(rect.height * 0.92, window.innerHeight * 0.72)
      // Build-up (badge/headline/portrait-slide, progress 0->0.3) should read as slow and
      // deliberate; from the icon reveal onward (0.3->1, see --home-hero-icon-in in
      // globals.part1.css) the current pace already reads right and isn't touched. A
      // uniform scrollDistance can't do both at once, so the physical scroll distance is
      // split unevenly: BUILD_UP_SCROLL_SHARE of the (now-longer) runway is spent on just
      // the first BUILD_UP_PROGRESS_SHARE of progress, everything past that point maps
      // linearly across the rest at its own rate. See --home-hero-stage-height in
      // globals.part1.css, which was extended to give this split room to work with.
      const rawProgress = clamp01(-rect.top / scrollDistance)
      const progress = isHomeMobilePin
        ? rawProgress <= BUILD_UP_SCROLL_SHARE
          ? (rawProgress / BUILD_UP_SCROLL_SHARE) * BUILD_UP_PROGRESS_SHARE
          : BUILD_UP_PROGRESS_SHARE +
            ((rawProgress - BUILD_UP_SCROLL_SHARE) / (1 - BUILD_UP_SCROLL_SHARE)) *
              (1 - BUILD_UP_PROGRESS_SHARE)
        : rawProgress
      // See sectionSteppedProgressTo above for why this exists (only ever feeds the
      // photo's filter: blur()/saturate()) - 12 steps across the 0-1 range.
      const steppedProgress = Math.round(progress * 12) / 12
      const contentProgress = clamp01((progress - 0.08) / 0.92)
      const portraitParallaxProgress = isHomeHero
        ? progress
        : clamp01(1 - Math.pow(1 - progress, 4.2))

      // Keep the portrait available as a foreground scroll layer; the following section
      // is capped in its own lower stacking context so it cannot cover the image.
      const portraitHideProgress = 0

      const progressStr = progress.toFixed(4)
      const contentProgressStr = contentProgress.toFixed(4)
      const portraitParallaxProgressStr = portraitParallaxProgress.toFixed(4)
      const portraitHideProgressStr = portraitHideProgress.toFixed(4)
      const portraitHardHideProgressStr = portraitHideProgress.toFixed(4)

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

      if (instant) {
        // First sync after mount (or after a scrolled-open skips straight to ready):
        // write the real values immediately, no tween. Animating from the CSS vars'
        // unset/zero starting point here would visibly glide the portrait from its
        // resting position to the correct scrolled one.
        const vars = {
          '--hero-scroll-progress': progress,
          '--hero-scroll-content-progress': contentProgress,
          '--hero-scroll-portrait-parallax-progress': portraitParallaxProgress,
          '--hero-scroll-portrait-hide-progress': portraitHideProgress,
          '--hero-scroll-portrait-hard-hide-progress': portraitHideProgress,
        }
        gsap.set(section, vars)
        gsap.set(section, { '--hero-scroll-blur-progress': steppedProgress })
        if (host) gsap.set(host, vars)
        return
      }

      sectionProgressTo(progress)
      sectionSteppedProgressTo(steppedProgress)
      sectionContentProgressTo(contentProgress)
      sectionPortraitParallaxProgressTo(portraitParallaxProgress)
      sectionPortraitHideProgressTo(portraitHideProgress)
      sectionPortraitHardHideProgressTo(portraitHideProgress)
      hostProgressTo?.(progress)
      hostContentProgressTo?.(contentProgress)
      hostPortraitParallaxProgressTo?.(portraitParallaxProgress)
      hostPortraitHideProgressTo?.(portraitHideProgress)
      hostPortraitHardHideProgressTo?.(portraitHideProgress)
    }

    const requestUpdate = () => {
      if (rafId !== 0) return
      rafId = window.requestAnimationFrame(() => updateScrollProgress())
    }

    startScrollProgressTracking = () => {
      if (scrollProgressListening) return
      scrollProgressListening = true
      updateScrollProgress(true)
      window.addEventListener('scroll', requestUpdate, { passive: true })
      window.addEventListener('resize', requestUpdate)
      window.addEventListener('orientationchange', requestUpdate)
    }

    const prefersIntro = !prefersReducedMotion && window.matchMedia('(min-width: 480px)').matches
    // Page already scrolled past the hero on mount (scroll restoration on reload,
    // back/forward navigation, an anchor link). The portrait's parallax transform
    // only starts reflecting real scroll progress once effects are enabled; waiting
    // out the usual 1200ms intro would make it snap from its resting position to the
    // scrolled one well after paint. Skip the reveal and activate immediately instead.
    const startsScrolled = section.getBoundingClientRect().top < -4

    if (prefersIntro && !startsScrolled) {
      section.setAttribute('data-hero-intro', 'play')
      if (host) host.setAttribute('data-hero-intro', 'play')

      introTimeoutId = window.setTimeout(() => {
        section.setAttribute('data-hero-intro', 'done')
        if (host) host.setAttribute('data-hero-intro', 'done')
        enableHeroEffects()
      }, 1200)
    } else if (prefersIntro && startsScrolled) {
      section.setAttribute('data-hero-intro', 'done')
      if (host) host.setAttribute('data-hero-intro', 'done')
      enableHeroEffects()
    } else {
      // Mobile: wait for real interaction, or a long fallback past Lighthouse LCP cutoff.
      const gestureOpts: AddEventListenerOptions = {
        passive: true,
        capture: true,
        once: true,
        signal: effectsGestureAbort.signal,
      }
      window.addEventListener('scroll', enableHeroEffects, gestureOpts)
      window.addEventListener('pointerdown', enableHeroEffects, gestureOpts)
      window.addEventListener('touchstart', enableHeroEffects, gestureOpts)
      window.addEventListener('keydown', enableHeroEffects, {
        capture: true,
        once: true,
        signal: effectsGestureAbort.signal,
      })
      effectsTimeoutId = window.setTimeout(enableHeroEffects, 8000)
    }

    if (prefersIntro) {
      startScrollProgressTracking()
    }

    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId)
      if (introTimeoutId !== 0) window.clearTimeout(introTimeoutId)
      if (effectsTimeoutId !== 0) window.clearTimeout(effectsTimeoutId)
      effectsGestureAbort.abort()
      if (scrollProgressListening) {
        window.removeEventListener('scroll', requestUpdate)
        window.removeEventListener('resize', requestUpdate)
        window.removeEventListener('orientationchange', requestUpdate)
      }
      section.style.removeProperty('--hero-scroll-progress')
      section.style.removeProperty('--hero-scroll-blur-progress')
      section.style.removeProperty('--hero-scroll-content-progress')
      section.style.removeProperty('--hero-scroll-portrait-parallax-progress')
      section.style.removeProperty('--hero-scroll-portrait-hide-progress')
      section.style.removeProperty('--hero-scroll-portrait-hard-hide-progress')
      gsap.killTweensOf(section)
      section.removeAttribute('data-hero-intro')
      section.removeAttribute('data-hero-effects')
      if (host) {
        host.style.removeProperty('--hero-scroll-progress')
        host.style.removeProperty('--hero-scroll-content-progress')
        host.style.removeProperty('--hero-scroll-portrait-parallax-progress')
        host.style.removeProperty('--hero-scroll-portrait-hide-progress')
        host.style.removeProperty('--hero-scroll-portrait-hard-hide-progress')
        gsap.killTweensOf(host)
        host.removeAttribute('data-hero-intro')
        host.removeAttribute('data-hero-effects')
      }
    }
  }, [])

  const mediaSrc = resolveHeroImageSrcForNextImage(media)
  const bgSrc = resolveHeroImageSrcForNextImage(backgroundImage)
  const hasRenderableBg = Boolean(bgSrc) && !bgImageFailed
  const renderBgSrc = hasRenderableBg ? bgSrc : null
  const normalizedPageSlug = typeof pageSlug === 'string' ? pageSlug.replace(/^\/+|\/+$/g, '') : ''

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
  const shouldUseCalibratedHomeBg = normalizedPageSlug === 'home' && shouldRenderBgImage
  const shouldRenderHomeMobileBg = normalizedPageSlug === 'home' && shouldRenderBgImage

  // The home hero renders two background crops (mobile + desktop) toggled via CSS
  // display:none per breakpoint. Both used to carry <Image priority>, which made
  // Next.js emit a <link rel="preload"> for EACH — every visitor preloaded both
  // crops regardless of viewport. Preload links support media-conditional fetching,
  // Next's automatic priority-preload does not, so we build the srcSet/sizes here
  // and preload each crop manually behind the matching media query below.
  //
  // Note: React 19's SSR renderer *also* auto-preloads any non-lazy <img> on its
  // own (independent of Next's `priority` prop), keyed off src/srcSet — so the two
  // <Image> tags below additionally need `fetchPriority="low"` to opt out of that,
  // otherwise React re-introduces the same unconditional duplicate preload.
  const homeHeroBgPreloadProps = React.useMemo(() => {
    if (!shouldRenderHomeMobileBg || !renderBgSrc) return null

    const common = { alt: '', fill: true as const, quality: 62, sizes: '100vw', priority: true }
    const { props: desktop } = getImageProps({ ...common, src: renderBgSrc })
    const { props: mobile } = getImageProps({ ...common, src: renderBgSrc })

    return { desktop, mobile }
  }, [shouldRenderHomeMobileBg, renderBgSrc])
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
  const homeProfilePopoutFallback =
    normalizedPageSlug === 'home' ? HOME_PROFILE_POPOUT_FALLBACK_SRC : null
  const portraitSrc = resolveHeroImageSrc(media) ?? mediaSrc ?? homeProfilePopoutFallback

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
  const heroContentJustify =
    effectiveContentVerticalAlignment === 'top'
      ? 'flex-start'
      : effectiveContentVerticalAlignment === 'bottom'
        ? 'flex-end'
        : 'center'

  const heroLayerClass = 'hero-scroll-layer'
  const showHeroLogoBand =
    Boolean(marqueeHeadline?.trim()) || (Array.isArray(marqueeLogos) && marqueeLogos.length > 0)
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
  // Desktop/tablet keep the ORIGINAL single-column box model exactly (same class name,
  // same width/min-height/justify/spacing) via this outer wrapper. On mobile it becomes
  // `display:contents` (max-md:contents) so its two children - the reveal block and the
  // CTA card - act as direct flex items of heroMainClass instead: needed on the home
  // hero so the reveal block can sit *behind* the portrait (a child can't escape its
  // ancestor's stacking context to paint behind a stacking-context sibling), which is
  // impossible while badge/headline/description/stats/cta all share one container.
  const heroTextColumnClass = cn(
    'hero-scroll-content-copy relative min-w-0 flex flex-col overflow-visible',
    'max-md:contents',
    'md:space-y-[clamp(1rem,2.5vh,1.5rem)] md:relative md:z-[20] md:min-h-0 md:max-w-3xl',
    'lg:min-h-[clamp(400px,62vh,680px)]',
    !portraitSrc && 'hero-scroll-content-copy--no-portrait',
    effectiveContentVerticalAlignment === 'top' && 'justify-start',
    effectiveContentVerticalAlignment === 'center' && 'justify-center',
    effectiveContentVerticalAlignment === 'bottom' && 'justify-end',
  )
  // Badge + headline + description - always visible in the upper part of the mobile
  // stage (order-1, ahead of the portrait), not hidden behind anything. On desktop this
  // is a plain block nested in heroTextColumnClass above, naturally constrained by it.
  const heroRevealClass =
    'hero-scroll-content-reveal max-md:order-1 max-md:z-[16] max-md:relative flex flex-col space-y-[clamp(1rem,2.5vh,1.5rem)]'
  // Stats + CTA + logo band - the "glass card" piece. Renamed off hero-scroll-content-copy
  // (which now names the outer, whole-column wrapper again) so it doesn't collide with
  // that class's many pre-existing desktop rules elsewhere in globals.part1.css.
  const heroCtaClass = cn(
    'hero-scroll-content-cta relative min-w-0 flex flex-col overflow-visible space-y-[clamp(1rem,2.5vh,1.5rem)] max-md:z-[16] max-md:order-3 max-md:flex-shrink-0 max-md:h-auto',
    portraitSrc && 'hero-mobile-glass max-md:-mx-4 max-md:rounded-t-2xl max-md:px-4',
  )

  return (
    <section
      ref={sectionRef}
      aria-label={sectionAriaLabel ?? 'Hero'}
      className={cn(
        // overflow-x-clip (not overflow-visible on both axes): the mobile portrait
        // popout (.pb-popout-root / .hero-mobile-portrait-parallax) is deliberately
        // scaled/translated past this section's horizontal edge as it slides toward
        // exit, relying on <html>'s overflow-x to clip it visually. But a transformed
        // box's scrollable-overflow contribution reaches the mobile browser's layout-
        // viewport sizing pass even through an ancestor's overflow-x:hidden/clip -
        // unless clipped at THIS level, near the source - so the whole page was
        // silently zoomed out ("schwimmt") instead of just clipping the portrait.
        // overflow-y stays visible so unrelated vertical bleed (heading descenders,
        // the portrait's vertical pop-out) keeps working.
        'hero-offset relative hero-offset--popout text-foreground isolate overflow-x-clip overflow-y-visible min-h-[clamp(666px,77vh,888px)]',
        !hasRenderableBg && 'bg-background',
        !portraitSrc && 'hero-superhero-no-portrait',
      )}
      data-hero-intro="done"
      data-hero-variant="popout"
      data-hero-type={dataHeroType ?? 'superhero'}
      data-hero-has-portrait={portraitSrc ? 'true' : 'false'}
      data-page-slug={normalizedPageSlug || undefined}
      style={
        {
          '--hero-focus-x': `${bgFocus.x}%`,
          '--hero-focus-y': `${bgFocus.y}%`,
          '--hero-content-justify': heroContentJustify,
        } as React.CSSProperties
      }
    >
      {/* Hintergrundbild - füllt die Section */}
      {homeHeroBgPreloadProps && (
        <>
          <link
            rel="preload"
            as="image"
            media="(max-width: 479px)"
            imageSrcSet={homeHeroBgPreloadProps.mobile.srcSet}
            imageSizes={homeHeroBgPreloadProps.mobile.sizes}
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            media="(min-width: 480px)"
            imageSrcSet={homeHeroBgPreloadProps.desktop.srcSet}
            imageSizes={homeHeroBgPreloadProps.desktop.sizes}
            fetchPriority="high"
          />
        </>
      )}
      {/* Mobile-only pin stage: the section itself is made tall (see globals.part1.css,
          [data-page-slug='home'] @media max-width:479px) so this stage can be sticky and
          hold at top:0 for that extra scroll distance, playing the shrink/reveal/exit
          animation while the page visually "stays" on the hero. Desktop/tablet get no
          extra height on the section, so this sticky rule is a no-op there. */}
      <div className="hero-mobile-pin-stage">
        {shouldRenderBgImage && renderBgSrc && (
          <div
            aria-hidden
            className="hero-scroll-bg pointer-events-none absolute inset-0 overflow-hidden z-0"
          >
            {shouldUseCalibratedHomeBg && (
              <Image
                src={renderBgSrc}
                alt=""
                fill
                className="hero-scroll-bg-backplate w-full h-full object-cover"
                style={{
                  objectPosition: `100% ${bgFocus.y}%`,
                }}
                onError={() => {
                  console.warn('[BG IMG] Failed to load:', renderBgSrc)
                  setBgImageFailed(true)
                }}
                // LCP element on the home hero (mobile Lighthouse trace flagged it as the
                // largest content paint). Already covered by the manual preload <link>
                // above (same renderBgSrc as the mobile/desktop crops), so - same as
                // those two - `loading="eager"` opts back into rendering it immediately
                // and `fetchPriority="low"` opts OUT of Next's/React's own automatic
                // unconditional preload, which would otherwise duplicate the manual one.
                loading="eager"
                fetchPriority="low"
                quality={42}
                sizes="100vw"
              />
            )}
            {shouldRenderHomeMobileBg && renderBgSrc && (
              <Image
                src={renderBgSrc}
                alt=""
                fill
                className="hero-scroll-bg-image hero-scroll-bg-image--home-mobile w-full h-full object-cover"
                onError={() => {
                  console.warn('[BG IMG] Failed to load:', renderBgSrc)
                }}
                // Preloaded manually above via a media-scoped <link>. `priority` would add
                // Next's own unconditional preload; `fetchPriority="low"` opts this <img>
                // out of React's own automatic (also unconditional) image preloading.
                loading="eager"
                fetchPriority="low"
                quality={62}
                sizes="100vw"
              />
            )}
            <Image
              ref={desktopBgImageRef}
              src={renderBgSrc}
              alt=""
              fill
              className={cn(
                'hero-scroll-bg-image w-full h-full object-cover',
                shouldRenderHomeMobileBg && 'hero-scroll-bg-image--desktop',
              )}
              style={{
                objectPosition: shouldUseCalibratedHomeBg
                  ? `100% ${bgFocus.y}%`
                  : bgFocus.objectPosition,
              }}
              onError={() => {
                // Keep the hero stable when media fails and switch to section fallback background.
                console.warn('[BG IMG] Failed to load:', renderBgSrc)
                setBgImageFailed(true)
              }}
              onLoad={() => {
                setBgImageFailed(false)
              }}
              // On the home hero this crop is preloaded manually above (media-scoped);
              // `priority` (and React's own automatic <img> preload, opted out of via
              // fetchPriority="low") would duplicate that preload for every viewport.
              // On other hero pages this is the only bg image, so it keeps `priority`.
              {...(shouldRenderHomeMobileBg
                ? { loading: 'eager' as const, fetchPriority: 'low' as const }
                : { priority: true as const })}
              quality={62}
              sizes="100vw"
            />
          </div>
        )}

        {/* Overlay für Text-Lesbarkeit – theme-aware: --background hell in Light, dunkel in Dark */}
        {shouldRenderBgImage && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[12] hero-superhero-image-overlay"
          />
        )}

        {shouldRenderHomeMobileBg && (
          // Home mobile only: once the headline build-up has fully faded/slid away (see
          // --home-hero-mobile-text-exit in globals.part1.css), the B-icon fades in "in
          // place" over roughly the same spot the headlines occupied - growing from small/
          // blurry/transparent to full-size/sharp/opaque. A sibling of the reveal block
          // (anchored to the pin stage itself), not nested inside it, so its own reveal
          // timing is independent of that block's own fade/translate exit animation.
          <div
            aria-hidden
            className="hero-mobile-icon-reveal pointer-events-none hidden max-[479px]:flex"
          >
            <Image
              src="/branding/philippbacher-logo-b-10.svg"
              alt=""
              width={64}
              height={67}
              className="hero-mobile-icon-reveal-img"
            />
          </div>
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
            <div className={heroTextColumnClass}>
              <div className={heroRevealClass}>
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
                      'hero-scroll-layer-headline text-pretty text-hero-display tracking-tight hero-heading-solid',
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
              </div>

              <div className={heroCtaClass}>
                {showStats && (
                  <dl
                    className={cn(
                      heroLayerClass,
                      'hero-stats-grid grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 min-[420px]:gap-x-4 md:gap-x-6 md:gap-y-6 mt-5 animate-in fade-in slide-in-from-bottom-2 duration-700',
                    )}
                  >
                    {stats!.map((stat, i) => {
                      const Icon =
                        stat.icon && stat.icon !== 'none' ? (statIconMap[stat.icon] ?? null) : null

                      return (
                        <div
                          key={stat.id ?? i}
                          className="hero-stat-item relative flex min-w-0 flex-col gap-1 pr-2 min-[420px]:pr-4 md:gap-1.5 md:pr-6"
                        >
                          {Icon ? (
                            <Icon
                              className="size-6 text-primary/70 mb-0.5"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          ) : null}
                          <dt className="hero-stat-value text-lg font-semibold leading-none tracking-normal min-[420px]:text-3xl hero-heading-gradient">
                            {stat.value}
                          </dt>
                          <dd className="hero-stat-label text-[0.5rem] leading-tight hero-subheading-contrast uppercase tracking-normal min-[420px]:text-[0.68rem] md:text-[0.78rem] md:leading-snug">
                            {stat.label}
                          </dd>
                        </div>
                      )
                    })}
                  </dl>
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
                        locale={locale}
                        className="rounded-[var(--style-radius-l)] max-md:flex-1 max-md:min-w-0 max-md:justify-center max-md:gap-0 max-md:px-3 max-md:text-sm max-md:leading-tight max-md:whitespace-normal max-md:[&_svg]:hidden"
                      >
                        <span className="hidden md:inline">{item?.link?.label}</span>
                        <span className="md:hidden">{item?.link?.label}</span>
                      </CMSLink>
                    ))}
                  </div>
                )}

                {showHeroLogoBand && (
                  <div className="hero-logo-band-shell mt-1 w-full max-w-full md:max-w-2xl">
                    <div className="hero-logo-band-divider border-t border-border/60" aria-hidden />

                    {logoDisplayType === 'logoCarousel' &&
                    Array.isArray(marqueeLogos) &&
                    marqueeLogos.length > 0 ? (
                      <div className={cn(heroLayerClass, 'hero-scroll-layer-carousel pt-3')}>
                        <LogoCarousel
                          logos={marqueeLogos
                            .map((row, idx) => {
                              const src = resolveHeroImageSrc(row?.logo)
                              if (!src) return null
                              return {
                                id: idx,
                                name: row?.alt ?? `Logo ${idx}`,
                                imgUrl: src,
                                alt: row?.alt,
                              } as const as LogoCarouselLogo
                            })
                            .filter((logo): logo is LogoCarouselLogo => Boolean(logo))}
                          columnCount={3}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <HeroLogoMarquee
                        marqueeHeadline={marqueeHeadline}
                        marqueeLogos={marqueeLogos}
                        className={cn(heroLayerClass, 'hero-scroll-layer-marquee pt-3')}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {portraitSrc && (
              <div
                ref={portraitRef}
                className={cn(
                  'hero-scroll-content-portrait hero-superhero-portrait hero-superhero-portrait-popout hero-desktop-parallax-portrait hero-mobile-sticky-portrait sticky aspect-[600/720] shrink-0 overflow-visible md:order-none max-md:h-auto max-md:min-h-[222px] max-md:min-w-0 max-md:z-[20] md:z-[14]',
                  'max-md:order-2',
                )}
              >
                <div className="hero-superhero-portrait-media hero-mobile-portrait-parallax relative h-full w-full overflow-visible">
                  <PopoutPortrait imageSrc={portraitSrc} fillRowHeight />
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
      </div>
    </section>
  )
}
