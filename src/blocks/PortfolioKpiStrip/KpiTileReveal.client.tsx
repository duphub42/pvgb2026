'use client'

import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let kpiGsapPromise: Promise<{
  gsap: typeof import('gsap').default
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
}> | null = null

const loadKpiGsap = async () => {
  kpiGsapPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    },
  )

  return kpiGsapPromise
}

type ParsedCountValue = {
  target: number
  decimals: number
  prefix: string
  suffix: string
  showPlus: boolean
}

function parseCountValue(value: string | null | undefined): ParsedCountValue | null {
  const source = value?.trim()
  if (!source) return null

  const match = source.match(/^([^0-9+-]*)([+-]?\d+(?:[.,]\d+)?)(.*)$/)
  if (!match) return null

  const [, prefix = '', numeric = '', suffix = ''] = match
  const normalizedNumeric = numeric.replace(',', '.')
  const target = Number(normalizedNumeric)
  if (!Number.isFinite(target)) return null

  const decimals = normalizedNumeric.includes('.') ? normalizedNumeric.split('.')[1]?.length ?? 0 : 0

  return {
    target,
    decimals,
    prefix,
    suffix,
    showPlus: numeric.startsWith('+'),
  }
}

function formatCountValue(value: number, parsed: ParsedCountValue): string {
  const fixed = value.toFixed(parsed.decimals)
  const sign = parsed.showPlus && value > 0 ? '+' : ''
  return `${parsed.prefix}${sign}${fixed}${parsed.suffix}`
}

export function KpiTileReveal() {
  const markerRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const root = markerRef.current?.closest<HTMLElement>('[data-kpi-reveal-root="true"]')
    if (!root) return

    const DIMMED_ALPHA = 0.5
    const REVEAL_STAGGER = 0.14
    const REVEAL_DURATION = 0.5
    const HIGHLIGHT_STEP = 0.07
    let context: { revert: () => void } | null = null
    let cancelled = false
    let observer: IntersectionObserver | null = null

    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadKpiGsap()
      if (cancelled) return

      const headerGroup = root.querySelector<HTMLElement>('[data-kpi-header-group="true"]')
      const cardsGroup = root.querySelector<HTMLElement>('[data-kpi-cards-group="true"]')
      const headerItems = gsap.utils.toArray<HTMLElement>('[data-kpi-header-item="true"]', root)
      const cards = gsap.utils.toArray<HTMLElement>('[data-kpi-reveal-card="true"]', root)

      context = gsap.context(() => {
      // Jede Gruppe orientiert sich an ihrer EIGENEN Mitte statt an der ganzen
      // (hohen) Section: voll sichtbar, sobald die Gruppen-Mitte im mittleren
      // Fensterband liegt (60%-40% Viewporthöhe), außerhalb davon wird auf-
      // bzw. abgebaut. Die Reihenfolge Header-vor-Kacheln ergibt sich dadurch
      // von selbst aus ihrer Position im Layout — kein manuelles Verketten
      // von Triggern nötig, und beide sind fertig, sobald sie mittig im
      // Viewport stehen, statt schon zu blenden, während sie noch kaum
      // sichtbar sind.
      if (headerGroup && headerItems.length > 0) {
        gsap.fromTo(
          headerItems,
          { y: 34, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: headerGroup,
              start: 'center 80%',
              end: 'center 60%',
              scrub: 0.5,
            },
          },
        )
      }

      if (!cardsGroup || cards.length === 0) return

      gsap.set(cards, {
        autoAlpha: 0,
        y: 34,
        scale: 0.975,
        filter: 'blur(10px)',
        rotateX: -5,
        transformPerspective: 900,
        transformOrigin: '50% 100%',
      })

      cards.forEach((card) => {
        gsap.set(card.querySelectorAll('[data-kpi-reveal-detail="true"]'), {
          autoAlpha: 0,
          y: 10,
        })
      })

      const buildTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: cardsGroup,
          start: 'center 90%',
          end: 'center 60%',
          scrub: 0.25,
        },
      })

      // Phase 1: tiles build up one after another, settling at a dimmed opacity.
      buildTimeline.to(cards, {
        autoAlpha: DIMMED_ALPHA,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        duration: REVEAL_DURATION,
        stagger: {
          each: REVEAL_STAGGER,
          from: 'start',
        },
      }, 0)

      cards.forEach((card, index) => {
        const revealStart = index * REVEAL_STAGGER + 0.14
        const valueEl = card.querySelector<HTMLElement>('[data-kpi-count-value="true"]')
        const parsedValue = parseCountValue(valueEl?.textContent)

        buildTimeline.to(
          card.querySelectorAll('[data-kpi-reveal-detail="true"]'),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.045,
          },
          revealStart,
        )

        if (valueEl && parsedValue) {
          const state = { value: 0 }

          buildTimeline.to(
            state,
            {
              value: parsedValue.target,
              duration: 0.7,
              ease: 'power2.out',
              onStart: () => {
                valueEl.textContent = formatCountValue(0, parsedValue)
              },
              onUpdate: () => {
                valueEl.textContent = formatCountValue(state.value, parsedValue)
              },
              onComplete: () => {
                valueEl.textContent = formatCountValue(parsedValue.target, parsedValue)
              },
            },
            revealStart,
          )
        }
      })

      // Sweep-Phase: rein dekorativer Highlight-Durchlauf, läuft genau im
      // "voll sichtbar"-Band (Kacheln-Mitte zwischen 60% und 40% Viewporthöhe).
      const sweepTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: cardsGroup,
          start: 'center 60%',
          end: 'center 40%',
          scrub: 0.3,
        },
      })

      cards.forEach((card, index) => {
        const highlightStart = index * HIGHLIGHT_STEP

        sweepTimeline.to(card, { autoAlpha: 1, duration: HIGHLIGHT_STEP * 0.6 }, highlightStart)

        if (index > 0) {
          sweepTimeline.to(
            cards[index - 1],
            { autoAlpha: DIMMED_ALPHA, duration: HIGHLIGHT_STEP * 0.6 },
            highlightStart,
          )
        }
      })

      // Once the sweep finishes, dim the last tile back down too — nothing
      // should stay highlighted once the section is scrolled past.
      const lastHighlightStart = (cards.length - 1) * HIGHLIGHT_STEP
      sweepTimeline.to(
        cards[cards.length - 1],
        { autoAlpha: DIMMED_ALPHA, duration: HIGHLIGHT_STEP * 0.6 },
        lastHighlightStart + HIGHLIGHT_STEP * 0.6,
      )
      }, root)

      ScrollTrigger.refresh()
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer?.disconnect()
        observer = null
        void initAnimation()
      },
      { rootMargin: '520px 0px' },
    )
    observer.observe(root)

    return () => {
      cancelled = true
      observer?.disconnect()
      context?.revert()
    }
  }, [])

  return <span ref={markerRef} aria-hidden className="sr-only" />
}
