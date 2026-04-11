import { Minus, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'

import type { PortfolioKpiStripBlock as PortfolioKpiStripBlockData } from '@/payload-types'
import { cn } from '@/utilities/ui'

type PortfolioKpiStripProps = PortfolioKpiStripBlockData & { disableInnerContainer?: boolean }

type Trend = 'up' | 'down' | 'neutral'

const trendMeta: Record<
  Trend,
  {
    icon: LucideIcon
    className: string
    label: string
  }
> = {
  up: {
    icon: TrendingUp,
    className: 'text-emerald-600 bg-emerald-100 border-emerald-200',
    label: 'Steigend',
  },
  down: {
    icon: TrendingDown,
    className: 'text-rose-600 bg-rose-100 border-rose-200',
    label: 'Fallend',
  },
  neutral: {
    icon: Minus,
    className: 'text-slate-600 bg-slate-100 border-slate-200',
    label: 'Neutral',
  },
}

export const PortfolioKpiStripBlock: React.FC<PortfolioKpiStripProps> = ({
  eyebrow,
  heading,
  intro,
  variant = 'glass',
  items,
}) => {
  const kpis = (items ?? []).filter((item) => Boolean(item?.value?.trim() && item?.label?.trim()))

  if (!kpis.length) return null

  const wrapperClass =
    variant === 'solid'
      ? 'bg-slate-950 text-slate-50 border-slate-800'
      : variant === 'minimal'
        ? 'bg-transparent text-slate-950 border-border/40'
        : 'bg-white/85 text-slate-950 border-border/70 backdrop-blur-xl'

  const cardClass =
    variant === 'solid'
      ? 'bg-slate-900/70 border-slate-800'
      : variant === 'minimal'
        ? 'bg-white border-border/60'
        : 'bg-white/80 border-white/70'

  return (
    <section className="w-full py-14 md:py-16">
      <div className={cn('container rounded-3xl border px-6 py-8 md:px-10 md:py-10', wrapperClass)}>
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">{eyebrow}</p>
          ) : null}
          {heading ? <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{heading}</h2> : null}
          {intro ? <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">{intro}</p> : null}
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
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide',
                      meta.className,
                    )}
                    aria-label={meta.label}
                  >
                    <TrendIcon className="size-3.5" />
                    {item.delta?.trim() ? item.delta : meta.label}
                  </span>
                </div>

                <p className="text-sm font-medium leading-snug">{item.label}</p>
                {item.context ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.context}</p>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
