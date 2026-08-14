'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { Brain } from 'lucide-react'

import type { WhyWorkWithMeBlock as WhyWorkWithMeBlockData } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import { ReasonCard } from '@/blocks/WhyWorkWithMe/ReasonCard'
import { ICON_MAP } from '@/blocks/WhyWorkWithMe/iconMap'
import { cn } from '@/utilities/ui'
import { BlockContainer } from '@/components/BlockContainer'

/** Wenn `introIconList` in älteren Dokumenten fehlt (noch nicht gespeichert), diese Zeilen anzeigen. Explizit leeres Array = keine Liste. */
const INTRO_ICON_FALLBACK: Array<{ icon: string; text: string }> = [
  {
    icon: 'brain',
    text: 'Unternehmerisch statt in Einzelleistungen gedacht: Bei Trinkwasser-Verband.de wurde nicht nur eine Website gebaut, sondern Website, Lead-Erfassung und Follow-up-Prozess als ein zusammenhängendes System geplant.',
  },
  {
    icon: 'zap',
    text: 'Jedes Projekt startet mit einer Ist-Analyse bestehender Kanäle und Prozesse — bei MEDIFISCH.de führte das dazu, dass Werbung von META Marketingkanälen eingestellt wurden, weil sie keine messbaren Leads brachten.',
  },
  {
    icon: 'search',
    text: 'Bestehende Strategien werden geprüft, bevor neue aufgesetzt werden: Ein Website-Relaunch beginnt grundsätzlich mit einer Analyse der aktuellen SEO-Rankings und Nutzerpfade, nicht mit einem Neustart bei null.',
  },
  {
    icon: 'target',
    text: 'Erfolg wird an Anfragen und Abschlüssen gemessen, nicht an Klickzahlen — deshalb ist eine Marktanalyse fester Bestandteil jedes Projekts: ein monatliches Reporting mit den Kennzahlen, die tatsächlich zu Kundenkontakt führen (Formular-Absendungen, Anrufe), statt reinem Traffic.',
  },
  {
    icon: 'trending-up',
    text: 'Websites entstehen auf einer skalierbaren technischen Basis (Next.js, Payload CMS) — neue Seiten, Funktionen oder ein Onlineshop lassen sich später ergänzen, ohne die Seite komplett neu zu bauen. Nachvollziehbar am Beispiel von Soulmating.de.',
  },
  {
    icon: 'handshake',
    text: 'Ein Ansprechpartner, keine Weiterleitungsschleifen: Anfragen werden direkt und persönlich beantwortet, das kostenlose Erstgespräch klärt Umfang und Budget meist innerhalb eines Termins statt mehrerer Abstimmungsrunden.',
  },
]

const STATIC_FALLBACK: Array<{ icon: string; title: string; description: string }> = [
  {
    icon: 'user',
    title: 'Persönlicher Ansprechpartner',
    description:
      'Kein Agentur-Wasserkopf, kein Wischi-Waschi — direkte, fundierte Beratung und Umsetzung.',
  },
  {
    icon: 'zap',
    title: 'Lean & effizient',
    description: 'Schnelle Entscheidungen, klare Prozesse, kein unnötiger Overhead.',
  },
  {
    icon: 'trending-up',
    title: 'Performance & Resultate',
    description: 'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.',
  },
  {
    icon: 'globe',
    title: 'Cross-Channel & international',
    description:
      'SEO, SEA, Social Ads, Automatisierung — Launches in verschiedenen Branchen und 6 Ländern.',
  },
]

type WhyWorkWithMeProps = WhyWorkWithMeBlockData & {
  disableInnerContainer?: boolean
  index?: number
}

export const WhyWorkWithMeBlock: React.FC<WhyWorkWithMeProps> = (props) => {
  const {
    disableInnerContainer: _disableInnerContainer,
    heading,
    intro,
    introIconList,
    reasons,
    index = 0,
    ...styleProps
  } = props

  // Style-Props direkt an BlockContainer übergeben
  const styles = styleProps as unknown as BlockStyles
  const items = useMemo(() => {
    const rows = reasons?.filter((r): r is NonNullable<(typeof reasons)[number]> =>
      Boolean(
        r &&
        typeof r === 'object' &&
        String(r.title ?? '').trim() &&
        String(r.description ?? '').trim(),
      ),
    )
    if (rows?.length) {
      return rows.map((r, idx) => ({
        key: (typeof r.id === 'string' && r.id) || `reason-${idx}-${String(r.title).slice(0, 24)}`,
        iconKey: typeof r.icon === 'string' && r.icon in ICON_MAP ? r.icon : 'user',
        title: String(r.title).trim(),
        description: String(r.description).trim(),
      }))
    }
    return STATIC_FALLBACK.map((r, idx) => ({
      key: `fallback-${idx}-${r.title}`,
      iconKey: r.icon,
      title: r.title,
      description: r.description,
    }))
  }, [reasons])

  const introTrimmed = typeof intro === 'string' ? intro.trim() : ''
  const showIntro = introTrimmed.length > 0

  const introListItems = useMemo(() => {
    const useFallback = introIconList === undefined || introIconList === null
    const source = useFallback
      ? INTRO_ICON_FALLBACK
      : introIconList.filter((row): row is NonNullable<(typeof introIconList)[number]> =>
          Boolean(row && typeof row === 'object' && String(row.text ?? '').trim()),
        )
    if (!source.length) return []
    return source.map((row, idx) => {
      const iconKey = typeof row.icon === 'string' && row.icon in ICON_MAP ? row.icon : 'brain'
      const text = String(row.text).trim()
      const id = 'id' in row && typeof row.id === 'string' ? row.id : ''
      return {
        key: id || `intro-icon-${idx}-${text.slice(0, 20)}`,
        iconKey,
        text,
      }
    })
  }, [introIconList])
  const showIntroIconList = introListItems.length > 0
  const introItemRefs = useRef<Array<HTMLLIElement | null>>([])
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!showIntroIconList) return

    let frame = 0

    const updateIntroItemOpacity = () => {
      frame = 0
      const viewportCenter = window.innerHeight / 2
      const fadeDistance = Math.max(window.innerHeight * 0.12, 96)

      introItemRefs.current.forEach((item) => {
        if (!item) return

        const rect = item.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(itemCenter - viewportCenter)
        const centerStrength = Math.max(0, 1 - distanceFromCenter / fadeDistance)
        const opacity = 0.22 + centerStrength * 0.78

        item.style.setProperty('--why-intro-item-opacity', opacity.toFixed(3))
        item.style.setProperty('--why-intro-item-focus', centerStrength.toFixed(3))
      })
    }

    const scheduleUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateIntroItemOpacity)
    }

    introItemRefs.current = introItemRefs.current.slice(0, introListItems.length)
    updateIntroItemOpacity()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [introListItems.length, showIntroIconList])

  useEffect(() => {
    const cards = cardRefs.current.slice(0, items.length).filter(Boolean) as HTMLDivElement[]
    if (!cards.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      cards.forEach((card) => {
        card.classList.add('is-visible')
        card.removeAttribute('style')
        card
          .querySelectorAll<HTMLElement>('[data-why-card-detail="true"], [data-why-card-icon="true"]')
          .forEach((element) => element.removeAttribute('style'))
      })
      return
    }

    const root = cards[0]?.parentElement
    if (!root) return

    let context: { revert: () => void } | null = null
    let cancelled = false
    let observer: IntersectionObserver | null = null

    const initAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      context = gsap.context(() => {
      cards.forEach((card, cardIndex) => {
        gsap.set(card, {
          autoAlpha: 0,
          y: 72,
          x: cardIndex % 2 === 0 ? -18 : 18,
          scale: 0.9,
          rotateX: -18,
          rotateZ: cardIndex % 2 === 0 ? -2.4 : 2.4,
          filter: 'blur(18px)',
          transformPerspective: 1000,
          transformOrigin: '50% 100%',
        })

        gsap.set(card.querySelectorAll('[data-why-card-detail="true"]'), {
          autoAlpha: 0,
          y: 18,
          filter: 'blur(8px)',
        })

        gsap.set(card.querySelector('[data-why-card-icon="true"]'), {
          autoAlpha: 0,
          scale: 0.72,
          rotate: cardIndex % 2 === 0 ? -14 : 14,
        })
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top 76%',
          end: 'top 42%',
          scrub: 0.85,
        },
      })

      timeline.to(cards, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
        rotateZ: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: {
          each: 0.12,
          from: 'start',
        },
      })

      cards.forEach((card, cardIndex) => {
        timeline.to(
          card.querySelectorAll('[data-why-card-detail="true"]'),
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.56,
            stagger: 0.05,
            ease: 'none',
          },
          0.18 + cardIndex * 0.12,
        )

        timeline.to(
          card.querySelector('[data-why-card-icon="true"]'),
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.62,
            ease: 'none',
          },
          0.24 + cardIndex * 0.12,
        )
      })
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
      { rootMargin: '420px 0px' },
    )
    observer.observe(root)

    return () => {
      cancelled = true
      observer?.disconnect()
      context?.revert()
    }
  }, [items.length])

  /** null/undefined (alte Blöcke nach Migration): Standardüberschrift; leerer String = bewusst ausblenden */
  const headingUnset = heading === null || heading === undefined
  const headingTrimmed = typeof heading === 'string' ? heading.trim() : ''
  const showHeading = headingUnset || headingTrimmed.length > 0
  const headingText = headingUnset ? 'Warum mit mir' : headingTrimmed
  const hasTextColumn = showHeading || showIntro || showIntroIconList

  return (
    <BlockContainer
      styles={styles}
      index={index}
      className="why-work-with-me-block relative z-[120]"
      disableAnimation
    >
      <div
        className={cn(
          'why-work-with-me-grid grid min-w-0 gap-10',
          hasTextColumn && 'lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16',
        )}
      >
        {hasTextColumn ? (
          <div className="min-w-0 max-w-prose lg:max-w-none lg:pt-1">
            {showHeading ? (
              <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {headingText}
              </h2>
            ) : null}
            {showIntro ? (
              <p
                className={cn(
                  'text-base leading-relaxed text-muted-foreground',
                  !showIntroIconList && 'lg:mb-0',
                )}
              >
                {introTrimmed}
              </p>
            ) : null}
            {showIntroIconList ? (
              <ul
                className={cn(
                  'mt-5 space-y-3.5 text-base leading-relaxed text-muted-foreground',
                  'lg:mb-0',
                )}
              >
                {introListItems.map(({ key, iconKey, text }, itemIndex) => {
                  const Icon = ICON_MAP[iconKey] ?? Brain
                  return (
                    <li
                      key={key}
                      ref={(node) => {
                        introItemRefs.current[itemIndex] = node
                      }}
                      className="why-work-intro-fade-item flex gap-3"
                    >
                      <span
                        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/40 text-primary"
                        aria-hidden
                      >
                        <Icon className="size-[1.125rem]" strokeWidth={2} />
                      </span>
                      <span className="min-w-0 pt-0.5">{text}</span>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div
          className={cn(
            'relative z-[90] grid min-w-0 gap-4',
            /* Rechte Spalte: Karten als Block (2×2 ab sm); ohne Textspalte wie bisher auto-fit. */
            hasTextColumn
              ? 'sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]',
          )}
        >
          {items.map(({ key, iconKey, title, description }, cardIndex) => {
            return (
              <div
                key={key}
                ref={(node) => {
                  cardRefs.current[cardIndex] = node
                }}
                className={cn(
                  'why-work-card-reveal relative z-[130] transform-gpu',
                  'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none',
                )}
              >
                <ReasonCard title={title} description={description} iconKey={iconKey} />
              </div>
            )
          })}
        </div>
      </div>
    </BlockContainer>
  )
}
