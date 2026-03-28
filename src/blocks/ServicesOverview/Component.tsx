import React, { useMemo } from 'react'
import {
  Code,
  Compass,
  Globe,
  Heart,
  Megaphone,
  Monitor,
  Palette,
  Rocket,
  Settings,
  Shield,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import type { ServicesOverviewBlock as ServicesOverviewBlockData } from '@/payload-types'

import { cn } from '@/utilities/ui'

const ICON_MAP: Record<string, LucideIcon> = {
  compass: Compass,
  code: Code,
  palette: Palette,
  megaphone: Megaphone,
  zap: Zap,
  globe: Globe,
  'trending-up': TrendingUp,
  settings: Settings,
  monitor: Monitor,
  rocket: Rocket,
  heart: Heart,
  shield: Shield,
}

const STATIC_FALLBACK: Array<{ icon: string; title: string; description: string }> = [
  {
    icon: 'compass',
    title: 'Digital Consulting',
    description:
      'Strategische Beratung, Roadmaps, Business- & Marketing-Strategien – fundiert, praktisch, wirksam.',
  },
  {
    icon: 'code',
    title: 'Webentwicklung & Apps',
    description:
      'Moderne, performante Websites und Web-Apps – responsiv, SEO-optimiert, auf Conversion ausgelegt.',
  },
  {
    icon: 'palette',
    title: 'Branding & Design',
    description:
      'Klare Markenbotschaften, einprägsame Designs und ein einheitlicher Auftritt – für hohe Wiedererkennung.',
  },
  {
    icon: 'megaphone',
    title: 'Marketing & Automatisierung',
    description:
      'Cross-Channel Kampagnen, Ads, E-Mail-Marketing, Social Media, Automatisierungen – effizient und messbar.',
  },
]

type ServicesOverviewProps = ServicesOverviewBlockData & { disableInnerContainer?: boolean }

export const ServicesOverviewBlock: React.FC<ServicesOverviewProps> = ({
  disableInnerContainer: _disableInnerContainer,
  heading,
  intro,
  services,
}) => {
  const items = useMemo(() => {
    const rows = services?.filter(
      (s): s is NonNullable<(typeof services)[number]> =>
        Boolean(
          s &&
            typeof s === 'object' &&
            String(s.title ?? '').trim() &&
            String(s.description ?? '').trim(),
        ),
    )
    if (rows?.length) {
      return rows.map((s, idx) => ({
        key: (typeof s.id === 'string' && s.id) || `service-${idx}-${String(s.title).slice(0, 24)}`,
        iconKey: typeof s.icon === 'string' && s.icon in ICON_MAP ? s.icon : 'compass',
        title: String(s.title).trim(),
        description: String(s.description).trim(),
      }))
    }
    return STATIC_FALLBACK.map((s, idx) => ({
      key: `fallback-${idx}-${s.title}`,
      iconKey: s.icon,
      title: s.title,
      description: s.description,
    }))
  }, [services])

  const introTrimmed = typeof intro === 'string' ? intro.trim() : ''
  const showIntro = introTrimmed.length > 0
  const headingUnset = heading === null || heading === undefined
  const headingTrimmed = typeof heading === 'string' ? heading.trim() : ''
  const showHeading = headingUnset || headingTrimmed.length > 0
  const headingText = headingUnset ? 'Meine Leistungen im Überblick' : headingTrimmed

  return (
    <section className={cn('w-full min-w-0 py-16', 'container')}>
      {showHeading || showIntro ? (
        <div className="mb-10 max-w-2xl">
          {showHeading ? (
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {headingText}
            </h2>
          ) : null}
          {showIntro ? (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              {introTrimmed}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, iconKey, title, description }) => {
          const Icon = ICON_MAP[iconKey] ?? Compass
          return (
            <div
              key={key}
              className={cn(
                'group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6',
                'transition-shadow duration-200 hover:shadow-md',
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 text-base font-semibold text-card-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
