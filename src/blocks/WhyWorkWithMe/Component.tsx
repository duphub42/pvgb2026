import React, { useMemo } from 'react'
import {
  Briefcase,
  Globe,
  Heart,
  Shield,
  Target,
  TrendingUp,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type { WhyWorkWithMeBlock as WhyWorkWithMeBlockData } from '@/payload-types'

import { ReasonCard } from '@/blocks/WhyWorkWithMe/ReasonCard'
import { cn } from '@/utilities/ui'

const ICON_MAP: Record<string, LucideIcon> = {
  user: User,
  zap: Zap,
  'trending-up': TrendingUp,
  globe: Globe,
  target: Target,
  briefcase: Briefcase,
  heart: Heart,
  shield: Shield,
}

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
    description:
      'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.',
  },
  {
    icon: 'globe',
    title: 'Cross-Channel & international',
    description:
      'SEO, SEA, Social Ads, Automatisierung — Launches in verschiedenen Branchen und 6 Ländern.',
  },
]

type WhyWorkWithMeProps = WhyWorkWithMeBlockData & { disableInnerContainer?: boolean }

export const WhyWorkWithMeBlock: React.FC<WhyWorkWithMeProps> = ({
  disableInnerContainer: _disableInnerContainer,
  heading,
  intro,
  reasons,
}) => {
  const items = useMemo(() => {
    const rows = reasons?.filter(
      (r): r is NonNullable<(typeof reasons)[number]> =>
        Boolean(r && typeof r === 'object' && String(r.title ?? '').trim() && String(r.description ?? '').trim()),
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
  /** null/undefined (alte Blöcke nach Migration): Standardüberschrift; leerer String = bewusst ausblenden */
  const headingUnset = heading === null || heading === undefined
  const headingTrimmed = typeof heading === 'string' ? heading.trim() : ''
  const showHeading = headingUnset || headingTrimmed.length > 0
  const headingText = headingUnset ? 'Warum mit mir' : headingTrimmed
  const hasTextColumn = showHeading || showIntro

  return (
    <section
      className={cn(
        'py-12 w-full min-w-0',
        /* BlockRenderer setzt immer disableInnerContainer — ohne .container randlos ultrabreit. */
        'container overflow-x-visible overflow-y-visible',
      )}
    >
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
              <p className="text-base leading-relaxed text-muted-foreground lg:mb-0">{introTrimmed}</p>
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
            const Icon = ICON_MAP[iconKey] ?? User
            return <ReasonCard key={key} title={title} description={description} Icon={Icon} />
          })}
        </div>
      </div>
    </section>
  )
}
