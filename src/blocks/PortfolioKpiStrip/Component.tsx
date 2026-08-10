import { Minus, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { translateValueForLocale } from '@/i18n/translationOverlay'
import type { PortfolioKpiStripBlock as PortfolioKpiStripBlockData } from '@/payload-types'
import { getBlockBackgroundImageStyle } from '@/utilities/getBlockBackgroundImageStyle'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { KpiTileReveal } from './KpiTileReveal.client'

type PortfolioKpiStripProps = PortfolioKpiStripBlockData & {
  disableInnerContainer?: boolean
  locale?: Locale
}

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

const PRICING_KPI_BACKGROUND_IMAGE = '/api/media/stream/1356'

const getMarketingSnapshotIntro = (intro?: string | null): string | null => {
  const base = intro?.trim()
  if (!base) return null

  return `${base} Die Werte bündeln typische Effekte aus organischer Sichtbarkeit, Paid-Search-Struktur und Lead-Funnel-Optimierung und zeigen, welche Hebel über mehrere Projektphasen hinweg besonders stark auf Wachstum, Effizienz und Anfragequalität einzahlen.`
}

const getMarketingSnapshotNote = (heading?: string | null): string | null => {
  if (!heading?.toLowerCase().includes('marketing-cases')) return null

  return 'Die Kennzahlen sind als verdichteter Snapshot zu lesen: Entscheidend ist nicht ein einzelner Peak, sondern die Kombination aus stabiler Sichtbarkeit, effizienter Budgetsteuerung und messbar besserer Lead-Qualität.'
}

export const PortfolioKpiStripBlock: React.FC<PortfolioKpiStripProps> = ({
  eyebrow,
  heading,
  intro,
  variant = 'glass',
  items,
  locale = 'de',
}) => {
  const localizedEyebrow = translateValueForLocale(eyebrow, locale)
  const localizedHeading = translateValueForLocale(heading, locale)
  const localizedIntro = translateValueForLocale(intro, locale)
  const kpis = translateValueForLocale(
    (items ?? []).filter((item) => Boolean(item?.value?.trim() && item?.label?.trim())),
    locale,
  )
  const sourceHeading = heading?.toLowerCase() ?? ''
  const shouldShowPricingContext = sourceHeading.includes('leistungswerte')
  const isMarketingSnapshot = sourceHeading.includes('marketing-cases')
  const enableTileReveal = isMarketingSnapshot
  const resolvedIntro = isMarketingSnapshot
    ? translateValueForLocale(getMarketingSnapshotIntro(intro), locale)
    : localizedIntro?.trim()
  const snapshotNote = translateValueForLocale(getMarketingSnapshotNote(heading), locale)

  if (!kpis.length) return null

  const wrapperClass =
    variant === 'solid'
      ? 'text-foreground'
      : variant === 'minimal'
        ? 'text-foreground'
        : 'text-foreground'

  const cardClass =
    variant === 'solid'
      ? 'border-border/70 bg-card text-card-foreground'
      : variant === 'minimal'
        ? 'border-border/60 bg-card'
        : 'border-border/60 bg-card/80'
  const kpiGridClass =
    kpis.length === 6
      ? 'lg:grid-cols-3'
      : kpis.length === 4 || kpis.length === 8
        ? 'lg:grid-cols-4'
        : 'lg:grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]'

  return (
    <section
      className="relative isolate w-full py-14 md:py-16"
      data-kpi-reveal-root={enableTileReveal ? 'true' : undefined}
    >
      {enableTileReveal ? <KpiTileReveal /> : null}
      {shouldShowPricingContext ? (
        <div
          aria-hidden
          className="render-block-background-image render-block-background-image--top-right"
          style={getBlockBackgroundImageStyle(PRICING_KPI_BACKGROUND_IMAGE, 'top-right')}
        />
      ) : null}
      <div className={cn('container relative z-10 px-6 py-4 md:px-10 md:py-6', wrapperClass)}>
        <div className="w-full max-w-5xl" data-kpi-header-group={enableTileReveal ? 'true' : undefined}>
          {localizedEyebrow ? (
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80"
              data-kpi-header-item={enableTileReveal ? 'true' : undefined}
            >
              {localizedEyebrow}
            </p>
          ) : null}
          {localizedHeading ? (
            <h2
              className="w-full max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl md:text-[clamp(2rem,3.4vw,3.5rem)]"
              data-kpi-header-item={enableTileReveal ? 'true' : undefined}
            >
              {localizedHeading}
            </h2>
          ) : null}
          {resolvedIntro ? (
            <p
              className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground md:text-base"
              data-kpi-header-item={enableTileReveal ? 'true' : undefined}
            >
              {resolvedIntro}
            </p>
          ) : null}
        </div>

        <div
          className={cn('mt-8 grid w-full grid-cols-2 items-stretch gap-3 xl:gap-4', kpiGridClass)}
          data-kpi-cards-group={enableTileReveal ? 'true' : undefined}
        >
          {kpis.map((item, index) => {
            const key = typeof item.id === 'string' && item.id ? item.id : `kpi-${index}`
            const trend = (item.trend ?? 'up') as Trend
            const meta = trendMeta[trend] ?? trendMeta.up
            const TrendIcon = meta.icon
            const itemValue = translateValueForLocale(item.value, locale)
            const itemDelta = translateValueForLocale(item.delta, locale)
            const itemLabel = translateValueForLocale(item.label, locale)
            const itemContext = translateValueForLocale(item.context, locale)

            return (
              <article
                key={key}
                className={cn(
                  'h-full rounded-2xl border p-4 md:p-5',
                  enableTileReveal && 'will-change-transform',
                  cardClass,
                )}
                data-kpi-reveal-card={enableTileReveal ? 'true' : undefined}
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p
                    className="text-3xl font-semibold leading-none md:text-4xl"
                    data-kpi-reveal-detail={enableTileReveal ? 'true' : undefined}
                    data-kpi-count-value={enableTileReveal ? 'true' : undefined}
                  >
                    {itemValue}
                  </p>
                  <Badge
                    variant={meta.variant}
                    className="gap-1 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
                    aria-label={translateValueForLocale(meta.label, locale)}
                    data-kpi-reveal-detail={enableTileReveal ? 'true' : undefined}
                  >
                    <TrendIcon className="size-3.5" />
                    {itemDelta?.trim()
                      ? itemDelta
                      : translateValueForLocale(meta.label, locale)}
                  </Badge>
                </div>

                <p
                  className="text-sm font-medium leading-snug"
                  data-kpi-reveal-detail={enableTileReveal ? 'true' : undefined}
                >
                  {itemLabel}
                </p>
                {itemContext ? (
                  <p
                    className="mt-1 text-xs leading-relaxed text-muted-foreground"
                    data-kpi-reveal-detail={enableTileReveal ? 'true' : undefined}
                  >
                    {itemContext}
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
        {snapshotNote ? (
          <p className="mt-5 max-w-5xl text-sm leading-relaxed text-muted-foreground">
            {snapshotNote}
          </p>
        ) : null}
      </div>

      {shouldShowPricingContext ? (
        <div className="container relative z-10 mt-14 md:mt-16">
          <div className="grid gap-5 md:grid-cols-3">
            {translateValueForLocale(pricingContextBlocks, locale).map((block) => (
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
