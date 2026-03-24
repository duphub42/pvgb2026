import React from 'react'
import { Globe, TrendingUp, User, Zap } from 'lucide-react'

import { cn } from '@/utilities/ui'

const reasons = [
  {
    icon: User,
    title: 'Persönlicher Ansprechpartner',
    description:
      'Kein Agentur-Wasserkopf, kein Wischi-Waschi — direkte, fundierte Beratung und Umsetzung.',
  },
  {
    icon: Zap,
    title: 'Lean & effizient',
    description: 'Schnelle Entscheidungen, klare Prozesse, kein unnötiger Overhead.',
  },
  {
    icon: TrendingUp,
    title: 'Performance & Resultate',
    description:
      'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.',
  },
  {
    icon: Globe,
    title: 'Cross-Channel & international',
    description:
      'SEO, SEA, Social Ads, Automatisierung — Launches in verschiedenen Branchen und 6 Ländern.',
  },
] as const

/** Props bewusst breit gehalten wie bei `ConsultingOverviewBlock` (BlockRenderer / lazy). */
type WhyWorkWithMeBlockProps = Record<string, unknown> & { disableInnerContainer?: boolean }

export const WhyWorkWithMeBlock: React.FC<WhyWorkWithMeBlockProps> = ({ disableInnerContainer }) => (
  <section className={cn('py-12', !disableInnerContainer && 'container')}>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {reasons.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-card-foreground">{title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)
