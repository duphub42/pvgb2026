'use client'

import React, { useMemo } from 'react'
import {
  Brain,
  Briefcase,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  Search,
  Shield,
  Target,
  TrendingUp,
  User,
  UserCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type { WhyWorkWithMeBlock as WhyWorkWithMeBlockData } from '@/payload-types'
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

import { ReasonCard } from '@/blocks/WhyWorkWithMe/ReasonCard'
import { cn } from '@/utilities/ui'
import { BlockContainer } from '@/components/BlockContainer'

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  lightbulb: Lightbulb,
  user: User,
  zap: Zap,
  'trending-up': TrendingUp,
  globe: Globe,
  target: Target,
  search: Search,
  handshake: Handshake,
  'user-check': UserCheck,
  briefcase: Briefcase,
  heart: Heart,
  shield: Shield,
}

/** Wenn `introIconList` in älteren Dokumenten fehlt (noch nicht gespeichert), diese Zeilen anzeigen. Explizit leeres Array = keine Liste. */
const INTRO_ICON_FALLBACK: Array<{ icon: string; text: string }> = [
  {
    icon: 'brain',
    text: 'Ich denke unternehmerisch, nicht in einzelnen Leistungen.',
  },
  {
    icon: 'target',
    text: 'Ich arbeite nicht für Klicks, sondern für echte Ergebnisse.',
  },
  {
    icon: 'search',
    text: 'Ich hinterfrage alles — auch bestehende Strategien.',
  },
  {
    icon: 'zap',
    text: 'Ich erkenne schnell, was wirklich funktioniert und was nur Zeit kostet.',
  },
  {
    icon: 'handshake',
    text: 'Ich übernehme Verantwortung für Resultate, nicht nur für Umsetzung.',
  },
  {
    icon: 'trending-up',
    text: 'Ich baue Systeme, die wachsen, statt ständig neu gestartet zu werden.',
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
  /** null/undefined (alte Blöcke nach Migration): Standardüberschrift; leerer String = bewusst ausblenden */
  const headingUnset = heading === null || heading === undefined
  const headingTrimmed = typeof heading === 'string' ? heading.trim() : ''
  const showHeading = headingUnset || headingTrimmed.length > 0
  const headingText = headingUnset ? 'Warum mit mir' : headingTrimmed
  const hasTextColumn = showHeading || showIntro || showIntroIconList

  return (
    <BlockContainer styles={styles} index={index}>
      <div
        className={cn(
          'grid min-w-0 gap-10',
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
                {introListItems.map(({ key, iconKey, text }) => {
                  const Icon = ICON_MAP[iconKey] ?? Brain
                  return (
                    <li key={key} className="flex gap-3">
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
            'grid min-w-0 gap-4',
            /* Rechte Spalte: Karten als Block (2×2 ab sm); ohne Textspalte wie bisher auto-fit. */
            hasTextColumn
              ? 'sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]',
          )}
        >
          {items.map(({ key, iconKey, title, description }) => {
            return (
              <ReasonCard key={key} title={title} description={description} iconKey={iconKey} />
            )
          })}
        </div>
      </div>
    </BlockContainer>
  )
}
