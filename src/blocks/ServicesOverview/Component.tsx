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

import './services-overview-card-hover.css'

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
  heading: _heading,
  intro: _intro,
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

  return (
    <section
      aria-label="Leistungen"
      className={cn(
        'services-overview-section relative z-10 w-full min-w-0 overflow-visible',
        'container',
        /* Negativzug nur ab lg (4 Spalten); darunter unter dem Hero ohne Überlagerung */
        'max-lg:mt-0 lg:-mt-20',
        'pb-16 pt-0 md:pb-20',
      )}
    >
      <div className="relative z-10 grid grid-cols-1 items-start gap-3 overflow-visible sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:items-stretch lg:gap-6">
        {items.map(({ key, iconKey, title, description }) => {
          const Icon = ICON_MAP[iconKey] ?? Compass
          return (
            <div key={key} className="services-overview-card-slot relative w-full min-w-0">
              <div
                className={cn(
                  'services-overview-card-codepen group relative flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/90 bg-card p-5 pb-6',
                  'lg:min-h-[6.25rem]',
                  'hover:border-primary/25 dark:border-border dark:hover:border-primary/30',
                )}
              >
                <div className="services-overview-card-content relative z-10 flex min-h-0 min-w-0 flex-1 flex-col pr-9 sm:pr-11">
                  <h3 className="line-clamp-2 shrink-0 text-balance text-base font-semibold leading-snug tracking-tight text-card-foreground md:text-[1.05rem]">
                    {title}
                  </h3>
                  <div className="services-overview-card-reveal min-h-0 w-full min-w-0">
                    <p className="services-overview-card-desc text-pretty text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'pointer-events-none absolute right-0 bottom-0 z-[1] flex size-[5.25rem] translate-x-[20%] translate-y-[20%] items-center justify-center sm:size-[5.75rem] sm:translate-x-[22%] sm:translate-y-[22%]',
                    'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'lg:group-hover:scale-[1.1] lg:group-hover:-rotate-[7deg]',
                  )}
                  aria-hidden
                >
                  <div className="absolute inset-0 rounded-2xl bg-primary/[0.07] ring-1 ring-primary/10 dark:bg-primary/[0.11] dark:ring-primary/15" />
                  <Icon className="relative z-[1] size-9 text-primary/30 transition-colors duration-300 group-hover:text-primary/50 sm:size-10" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
