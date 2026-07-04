import { Minus, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { PortfolioKpiStripBlock as PortfolioKpiStripBlockData } from '@/payload-types'
import { cn } from '@/utilities/ui'

type PortfolioKpiStripProps = PortfolioKpiStripBlockData & { disableInnerContainer?: boolean }

type Trend = 'up' | 'down' | 'neutral'

const trendMeta: Record<
  Trend,
  {
    icon: LucideIcon
    variant: 'primary' | 'secondary'
    label: string
  }
> = {
  up: {
    icon: TrendingUp,
    variant: 'primary',
    label: 'Steigend',
  },
  down: {
    icon: TrendingDown,
    variant: 'secondary',
    label: 'Fallend',
  },
  neutral: {
    icon: Minus,
    variant: 'secondary',
    label: 'Neutral',
  },
}

const pricingContextBlocks = [
  {
    title: 'Transparente Kalkulation',
    text: 'Jedes Angebot basiert auf einem klaren Leistungsumfang und nachvollziehbaren Aufwandspaketen. Sie sehen vor Projektstart, welche Positionen enthalten sind und welche Ergebnisse damit erreicht werden sollen. So entsteht Planungssicherheit statt Kostensprünge im laufenden Prozess. Optionalleistungen werden immer separat ausgewiesen und nur nach Freigabe umgesetzt.',
  },
  {
    title: 'Passend zum Projektziel',
    text: 'Nicht jedes Unternehmen braucht sofort den größten Leistungsumfang. Die Pakete sind deshalb so strukturiert, dass Sie mit einer sinnvollen Basis starten und später gezielt erweitern können. Das reduziert unnötige Anfangsinvestitionen und hält den Fokus auf den nächsten wichtigen Wachstumsschritt. Strategie, Design und technische Umsetzung bleiben dabei aufeinander abgestimmt.',
  },
  {
    title: 'Wert statt Pauschalversprechen',
    text: 'Preise orientieren sich nicht an austauschbaren Templates, sondern am konkreten Nutzen für Ihr Geschäft. Im Mittelpunkt stehen messbare Wirkung, bessere Sichtbarkeit und höhere Conversion-Chancen. Jede Investition soll sich in der Praxis als Belastung des Budgets, aber auch als Hebel für Umsatz und Markenstärke beweisen. Genau deshalb werden Leistungen priorisiert, bevor sie produziert werden.',
  },
] as const

export const PortfolioKpiStripBlock: React.FC<PortfolioKpiStripProps> = ({
  eyebrow,
  heading,
  intro,
  variant = 'glass',
  items,
}) => {
  const kpis = (items ?? []).filter((item) => Boolean(item?.value?.trim() && item?.label?.trim()))
  const shouldShowPricingContext = heading?.toLowerCase().includes('leistungswerte')

  if (!kpis.length) return null

  const wrapperClass =
    variant === 'solid'
      ? 'border-slate-800 bg-slate-950 text-slate-50 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100'
      : variant === 'minimal'
        ? 'border-border/40 bg-transparent text-foreground'
        : 'border-border/70 bg-background/80 text-foreground backdrop-blur-xl supports-[backdrop-filter]:bg-background/70'

  const cardClass =
    variant === 'solid'
      ? 'border-slate-800 bg-slate-900/70 dark:border-slate-700 dark:bg-slate-900/55'
      : variant === 'minimal'
        ? 'border-border/60 bg-card'
        : 'border-border/60 bg-card/80'

  return (
    <section className="w-full py-14 md:py-16">
      <div className={cn('container rounded-3xl border px-6 py-8 md:px-10 md:py-10', wrapperClass)}>
        <div className="w-full">
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="w-full text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-[clamp(2rem,3.4vw,3.5rem)] md:whitespace-nowrap">
              {heading}
            </h2>
          ) : null}
          {intro ? (
            <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">{intro}</p>
          ) : null}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-4">
          {kpis.map((item, index) => {
            const key = typeof item.id === 'string' && item.id ? item.id : `kpi-${index}`
            const trend = (item.trend ?? 'up') as Trend
            const meta = trendMeta[trend] ?? trendMeta.up
            const TrendIcon = meta.icon

            return (
              <article key={key} className={cn('rounded-2xl border p-4 md:p-5', cardClass)}>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="text-3xl font-semibold leading-none md:text-4xl">{item.value}</p>
                  <Badge
                    variant={meta.variant}
                    className="gap-1 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
                    aria-label={meta.label}
                  >
                    <TrendIcon className="size-3.5" />
                    {item.delta?.trim() ? item.delta : meta.label}
                  </Badge>
                </div>

                <p className="text-sm font-medium leading-snug">{item.label}</p>
                {item.context ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.context}
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>

      {shouldShowPricingContext ? (
        <div className="container mt-7 md:mt-8">
          <div className="grid gap-5 md:grid-cols-3">
            {pricingContextBlocks.map((block) => (
              <article key={block.title} className="h-full">
                <h3 className="text-base font-semibold leading-snug md:text-lg">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
