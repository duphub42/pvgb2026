'use client'

import { useEffect } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const hasElements = <T extends Element>(elements: NodeListOf<T>) => elements.length > 0

export function HomepageScrollEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const root = document.querySelector<HTMLElement>('[data-home-scroll-root]')
    if (!root) return
    const staticWindow = window as Window & { __PVGB_STATIC_EXPORT__?: boolean }
    const isStaticExport =
      staticWindow.__PVGB_STATIC_EXPORT__ === true ||
      document.documentElement.dataset.pvgbStaticExport === 'true' ||
      Boolean(document.querySelector('meta[name="x-static-export"]')) ||
      Boolean(document.querySelector('script[src="/hydrated-assets/hydrated-fixes.js"]'))

    // Below 480px the home hero pins itself and cross-fades straight into the
    // Introduction block via CSS (--hero-scroll-progress, see globals.part1.css) instead
    // of it scrolling up from below - the reveals below would either double up on top of
    // that crossfade (container/item fades) or fire at the wrong moment relative to it
    // (the maneki decoration's own reveal window), so both are skipped there.
    const isMobileHeroPin =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 479px)').matches

    let context: { revert: () => void } | null = null
    let initialized = false
    let idleId = 0
    let timeoutId = 0
    let gsapLoadPromise: Promise<{
      gsap: typeof import('gsap').default
      ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
    }> | null = null

    const loadGsap = async () => {
      gsapLoadPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([gsapModule, scrollTriggerModule]) => {
          const gsap = gsapModule.default
          const ScrollTrigger = scrollTriggerModule.ScrollTrigger
          gsap.registerPlugin(ScrollTrigger)
          return { gsap, ScrollTrigger }
        },
      )

      return gsapLoadPromise
    }

    const initEffects = async () => {
      if (initialized) return
      initialized = true
      const { gsap, ScrollTrigger } = await loadGsap()

      context = gsap.context(() => {
      const intro = root.querySelector<HTMLElement>('[data-home-section="introduction"]')
      const services = root.querySelector<HTMLElement>('[data-home-section="servicesOverview"]')

      if (intro) {
        const manekiBackground = intro.querySelector<HTMLElement>(
          '.home-intro-maneki-background-image',
        )
        const introItems = intro.querySelectorAll<HTMLElement>('h2, p, [class*="border-l"]')

        if (!isMobileHeroPin) {
          gsap.from(intro, {
            scrollTrigger: {
              trigger: intro,
              start: 'top 100%',
              end: 'top 70%',
              scrub: 0.85,
            },
            opacity: 0.82,
            ease: 'none',
          })

          if (hasElements(introItems)) {
            gsap.fromTo(
              introItems,
              {
                y: 34,
                opacity: 0,
                filter: 'blur(10px)',
              },
              {
                scrollTrigger: {
                  trigger: intro,
                  start: 'top 95%',
                  end: 'top 65%',
                  scrub: 0.8,
                },
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.08,
                ease: 'none',
              },
            )
          }

          if (manekiBackground) {
            const manekiTargetOpacity =
              getComputedStyle(manekiBackground)
                .getPropertyValue('--render-block-background-image-opacity')
                .trim() || '1'

            gsap.fromTo(
              manekiBackground,
              {
                '--render-block-background-image-opacity': 0,
                '--home-intro-maneki-reveal-blur': '14px',
                y: 40,
                scale: 0.9,
              },
              {
                scrollTrigger: {
                  trigger: intro,
                  start: 'top 74%',
                  end: 'top 46%',
                  scrub: 0.85,
                },
                '--render-block-background-image-opacity': manekiTargetOpacity,
                '--home-intro-maneki-reveal-blur': '0px',
                y: 0,
                scale: 1,
                transformOrigin: 'right top',
                ease: 'none',
              },
            )
          }
        }
      }

      if (services) {
        const serviceCards = services.querySelectorAll<HTMLElement>('.services-overview-card-slot')

        if (hasElements(serviceCards)) {
          gsap.from(serviceCards, {
            scrollTrigger: {
              trigger: services,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
            y: 44,
            opacity: 0,
            rotateX: -7,
            transformOrigin: '50% 100%',
            duration: 0.78,
            stagger: 0.11,
            ease: 'power3.out',
          })
        }

        serviceCards.forEach((card, index) => {
          const icon = card.querySelector<HTMLElement>('svg')
          if (!icon) return

          gsap.to(icon, {
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'bottom 30%',
              scrub: 0.6,
            },
            rotate: index % 2 === 0 ? -8 : 8,
            scale: 1.08,
            ease: 'none',
          })
        })
      }

      }, root)

      ScrollTrigger.refresh()
    }

    const abort = new AbortController()
    const options: AddEventListenerOptions = {
      passive: true,
      once: true,
      signal: abort.signal,
    }

    const scheduleInit = () => {
      void initEffects()
    }

    window.addEventListener('scroll', scheduleInit, options)
    window.addEventListener('wheel', scheduleInit, options)
    window.addEventListener('touchstart', scheduleInit, options)
    window.addEventListener('pointerdown', scheduleInit, options)
    window.addEventListener('keydown', scheduleInit, {
      once: true,
      signal: abort.signal,
    })

    // Keep first paint/LCP clean. If the user does nothing, load decorative scroll
    // effects later during idle time so repeat visitors still get the richer motion.
    const idleCallback = (
      window as Window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      }
    ).requestIdleCallback

    if (isStaticExport) {
      timeoutId = window.setTimeout(scheduleInit, 9000)
    } else if (idleCallback) {
      idleId = idleCallback(scheduleInit, { timeout: 6500 })
    } else {
      timeoutId = window.setTimeout(scheduleInit, 6500)
    }

    return () => {
      abort.abort()
      if (idleId !== 0) {
        const cancelIdleCallback = (
          window as Window & { cancelIdleCallback?: (handle: number) => void }
        ).cancelIdleCallback
        cancelIdleCallback?.(idleId)
      }
      if (timeoutId !== 0) window.clearTimeout(timeoutId)
      context?.revert()
    }
  }, [])

  return null
}
