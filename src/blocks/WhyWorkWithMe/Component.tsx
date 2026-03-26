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
  disableInnerContainer,
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

  return (
    <section className={cn('py-12 w-full', !disableInnerContainer && 'container')}>
      {showHeading ? (
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{headingText}</h2>
      ) : null}
      {showIntro ? (
        <p className="mb-8 max-w-prose text-base leading-relaxed text-muted-foreground">{introTrimmed}</p>
      ) : null}

      {/*
        Kein festes lg:grid-cols-4: Spaltenanzahl richtet sich nach Platz (auto-fit) —
        Karten wirken bei weniger Einträgen oder kürzerem Text nicht unnötig gequetscht.
      */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]">
        {items.map(({ key, iconKey, title, description }) => {
          const Icon = ICON_MAP[iconKey] ?? User
          return (
            <div
              key={key}
              className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="mb-1.5 text-sm font-medium text-card-foreground">{title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
