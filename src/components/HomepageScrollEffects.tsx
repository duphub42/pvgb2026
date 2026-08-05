'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const hasElements = <T extends Element>(elements: NodeListOf<T>) => elements.length > 0

export function HomepageScrollEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const root = document.querySelector<HTMLElement>('[data-home-scroll-root]')
    if (!root) return

    const context = gsap.context(() => {
      const intro = root.querySelector<HTMLElement>('[data-home-section="introduction"]')
      const services = root.querySelector<HTMLElement>('[data-home-section="servicesOverview"]')

      if (intro) {
        const manekiBackground = intro.querySelector<HTMLElement>(
          '.home-intro-maneki-background-image',
        )
        const introItems = intro.querySelectorAll<HTMLElement>('h2, p, [class*="border-l"]')

        gsap.from(intro, {
          scrollTrigger: {
            trigger: intro,
            start: 'top 78%',
            end: 'top 52%',
            scrub: 0.85,
          },
          y: 28,
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
                start: 'top 72%',
                end: 'top 48%',
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
              y: 40,
              scale: 0.9,
              filter: 'blur(14px)',
            },
            {
              scrollTrigger: {
                trigger: intro,
                start: 'top 74%',
                end: 'top 46%',
                scrub: 0.85,
              },
              '--render-block-background-image-opacity': manekiTargetOpacity,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              transformOrigin: 'right top',
              ease: 'none',
            },
          )
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

    return () => context.revert()
  }, [])

  return null
}
