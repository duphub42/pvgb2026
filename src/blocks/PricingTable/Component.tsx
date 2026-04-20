import Link from 'next/link'
import React from 'react'
import { Check, Circle, Minus, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { PricingTableBlock as PricingTableBlockData } from '@/payload-types'
import { cn } from '@/utilities/ui'

type PricingTableProps = PricingTableBlockData & { disableInnerContainer?: boolean }
type RawPlan = NonNullable<PricingTableBlockData['plans']>[number]
type RawComparisonRow = NonNullable<PricingTableBlockData['comparisonRows']>[number]
type RawComparisonValue = NonNullable<RawComparisonRow['values']>[number]

type ComparisonValueType = 'included' | 'optional' | 'excluded' | 'text'

type NormalizedPlan = {
  key: string
  name: string
  badge: string
  description: string
  price: string
  priceSuffix: string
  highlighted: boolean
  features: string[]
  ctaLabel: string
  ctaHref: string
  ctaNewTab: boolean
}

type NormalizedComparisonValue = {
  type: ComparisonValueType
  label: string
}

type NormalizedComparisonRow = {
  key: string
  feature: string
  values: [NormalizedComparisonValue, NormalizedComparisonValue, NormalizedComparisonValue]
}

const DEFAULT_PLANS: NormalizedPlan[] = [
  {
    key: 'plan-starter',
    name: 'Starter',
    badge: '',
    description: 'Ideal fuer kleine Websites und einen schnellen, professionellen Start.',
    price: '1.490',
    priceSuffix: 'einmalig',
    highlighted: false,
    features: [
      'Onepager oder kleine Website',
      'Individuelles Design-Konzept',
      'Responsive Umsetzung fuer Mobile',
      'Basis SEO Setup',
    ],
    ctaLabel: 'Starter anfragen',
    ctaHref: '/kontakt',
    ctaNewTab: false,
  },
  {
    key: 'plan-business',
    name: 'Business',
    badge: 'Empfohlen',
    description: 'Fuer Unternehmen, die mehr Seiten und Conversion-Fokus benoetigen.',
    price: '3.290',
    priceSuffix: 'einmalig',
    highlighted: true,
    features: [
      'Bis zu 8 Seiten inkl. Struktur',
      'UX-Wireframes + visuelles Design',
      'Conversion-optimierte CTA-Fuehrung',
      'Performance Optimierung',
      'CMS-Einweisung',
    ],
    ctaLabel: 'Business anfragen',
    ctaHref: '/kontakt',
    ctaNewTab: false,
  },
  {
    key: 'plan-premium',
    name: 'Premium',
    badge: '',
    description: 'Umfassende Loesung fuer anspruchsvolle Brands mit Wachstumsschwerpunkt.',
    price: 'ab 5.900',
    priceSuffix: 'projektbasiert',
    highlighted: false,
    features: [
      'Skalierbare Seitenarchitektur',
      'Designsystem + Komponentenbibliothek',
      'Fortgeschrittenes SEO Setup',
      'Tracking + Analytics Setup',
      'Priorisierter Support',
    ],
    ctaLabel: 'Premium anfragen',
    ctaHref: '/kontakt',
    ctaNewTab: false,
  },
]

const DEFAULT_COMPARISON_ROWS: NormalizedComparisonRow[] = [
  {
    key: 'row-1',
    feature: 'Design individuell statt Template',
    values: [
      { type: 'included', label: 'Enthalten' },
      { type: 'included', label: 'Enthalten' },
      { type: 'included', label: 'Enthalten' },
    ],
  },
  {
    key: 'row-2',
    feature: 'Anzahl Seiten',
    values: [
      { type: 'text', label: '1 bis 3' },
      { type: 'text', label: 'bis 8' },
      { type: 'text', label: 'frei skalierbar' },
    ],
  },
  {
    key: 'row-3',
    feature: 'SEO Grundlagen',
    values: [
      { type: 'included', label: 'Enthalten' },
      { type: 'included', label: 'Enthalten' },
      { type: 'included', label: 'Enthalten' },
    ],
  },
  {
    key: 'row-4',
    feature: 'Conversion Strategie',
    values: [
      { type: 'optional', label: 'Optional' },
      { type: 'included', label: 'Enthalten' },
      { type: 'included', label: 'Enthalten' },
    ],
  },
  {
    key: 'row-5',
    feature: 'A/B Testing Setup',
    values: [
      { type: 'excluded', label: 'Nicht enthalten' },
      { type: 'optional', label: 'Optional' },
      { type: 'included', label: 'Enthalten' },
    ],
  },
]

const DEFAULT_VALUE_LABELS: Record<ComparisonValueType, string> = {
  included: 'Enthalten',
  optional: 'Optional',
  excluded: 'Nicht enthalten',
  text: 'Individuell',
}

const asText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

const getKey = (value: unknown, fallback: string): string => {
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return fallback
}

const toHref = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) return '#'
  if (/^(https?:\/\/|mailto:|tel:|#)/i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/')) return trimmed
  return `/${trimmed.replace(/^\/+/, '')}`
}

const toComparisonType = (value: unknown): ComparisonValueType | null => {
  if (value === 'included' || value === 'optional' || value === 'excluded' || value === 'text') {
    return value
  }

  return null
}

const getPlanFeatures = (source: RawPlan | undefined, fallback: string[]): string[] => {
  if (!source || !Array.isArray(source.features)) return fallback
  const cleaned = source.features
    .map((entry) => asText(entry?.text))
    .filter((feature): feature is string => Boolean(feature))

  return cleaned.length > 0 ? cleaned : fallback
}

const normalizePlans = (plans: PricingTableBlockData['plans']): NormalizedPlan[] => {
  const sourcePlans = Array.isArray(plans) ? plans : []

  return DEFAULT_PLANS.map((fallback, index) => {
    const source = sourcePlans[index] as RawPlan | undefined

    return {
      key: getKey(source?.id, fallback.key),
      name: asText(source?.name) || fallback.name,
      badge: asText(source?.badge) || fallback.badge,
      description: asText(source?.description) || fallback.description,
      price: asText(source?.price) || fallback.price,
      priceSuffix: asText(source?.priceSuffix) || fallback.priceSuffix,
      highlighted: Boolean(source?.highlighted ?? fallback.highlighted),
      features: getPlanFeatures(source, fallback.features),
      ctaLabel: asText(source?.ctaLabel) || fallback.ctaLabel,
      ctaHref: toHref(asText(source?.ctaHref) || fallback.ctaHref),
      ctaNewTab: Boolean(source?.ctaNewTab ?? fallback.ctaNewTab),
    }
  })
}

const normalizeComparisonValue = (
  source: RawComparisonValue | undefined,
  fallback: NormalizedComparisonValue,
): NormalizedComparisonValue => {
  const type = toComparisonType(source?.type) ?? fallback.type
  const customLabel = asText(source?.label)
  const label = customLabel || fallback.label || DEFAULT_VALUE_LABELS[type]

  return {
    type,
    label,
  }
}

const normalizeComparisonRows = (
  rows: PricingTableBlockData['comparisonRows'],
): NormalizedComparisonRow[] => {
  const sourceRows = Array.isArray(rows) ? rows : []
  if (sourceRows.length === 0) return DEFAULT_COMPARISON_ROWS

  return sourceRows.map((sourceRow, rowIndex) => {
    const fallbackRow =
      DEFAULT_COMPARISON_ROWS[rowIndex] ?? DEFAULT_COMPARISON_ROWS[DEFAULT_COMPARISON_ROWS.length - 1]
    const sourceValues = Array.isArray(sourceRow.values) ? sourceRow.values : []

    return {
      key: getKey(sourceRow.id, `comparison-row-${rowIndex}`),
      feature: asText(sourceRow.feature) || fallbackRow.feature,
      values: [0, 1, 2].map((columnIndex) => {
        const sourceValue = sourceValues[columnIndex] as RawComparisonValue | undefined
        const fallbackValue = fallbackRow.values[columnIndex]
        return normalizeComparisonValue(sourceValue, fallbackValue)
      }) as [NormalizedComparisonValue, NormalizedComparisonValue, NormalizedComparisonValue],
    }
  })
}

function ComparisonValuePill({
  value,
  compact = false,
}: {
  value: NormalizedComparisonValue
  compact?: boolean
}) {
  if (value.type === 'text') {
    return (
      <span className={cn('font-medium text-foreground/90', compact ? 'text-xs' : 'text-sm')}>
        {value.label}
      </span>
    )
  }

  const baseClassName = cn(
    'inline-flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
    compact && 'px-2 py-0.5 text-[11px]',
  )

  if (value.type === 'included') {
    return (
      <span className={cn(baseClassName, 'border-primary/30 bg-primary/[0.12] text-primary')}>
        <Check className={compact ? 'size-3' : 'size-3.5'} />
        {value.label}
      </span>
    )
  }

  if (value.type === 'optional') {
    return (
      <span className={cn(baseClassName, 'border-border/80 bg-muted/55 text-muted-foreground')}>
        <Circle className={compact ? 'size-3' : 'size-3.5'} />
        {value.label}
      </span>
    )
  }

  return (
    <span className={cn(baseClassName, 'border-border/80 bg-muted/55 text-muted-foreground')}>
      <Minus className={compact ? 'size-3' : 'size-3.5'} />
      {value.label}
    </span>
  )
}

export function PricingTableBlock({
  eyebrow,
  heading,
  description,
  plans,
  comparisonHeading,
  comparisonDescription,
  comparisonRows,
  comparisonFootnote,
}: PricingTableProps) {
  const normalizedPlans = normalizePlans(plans)
  const normalizedRows = normalizeComparisonRows(comparisonRows)

  const title = asText(heading) || 'Webdesign Pakete fuer jedes Projektstadium'
  const sectionEyebrow = asText(eyebrow) || 'Pakete'
  const sectionDescription =
    asText(description) ||
    'Drei klar strukturierte Angebote mit transparenten Leistungen, damit Sie Aufwand und Ergebnis direkt einschaetzen koennen.'
  const comparisonTitle = asText(comparisonHeading) || 'Feature Vergleich'
  const comparisonText =
    asText(comparisonDescription) ||
    'Direkter Vergleich der wichtigsten Leistungsmerkmale pro Paket.'
  const footnote = asText(comparisonFootnote)

  return (
    <section className="container w-full min-w-0 py-14 md:py-16 lg:py-20">
      <div className="relative p-6 md:p-8 lg:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-[2.15rem] bg-[radial-gradient(85%_55%_at_50%_0%,color-mix(in_srgb,var(--theme-elevation-1000)_10%,transparent)_0%,transparent_80%)]"
        />

        <div className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="primary">
              {sectionEyebrow}
            </Badge>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {sectionDescription}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {normalizedPlans.map((plan) => (
              <article
                key={plan.key}
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border border-border/70 bg-background/90 p-5 shadow-xs backdrop-blur',
                  plan.highlighted &&
                    'border-primary/45 bg-primary/[0.05] shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--theme-elevation-1000)_80%,transparent)]',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                    {plan.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
                    ) : null}
                  </div>
                  {plan.badge || plan.highlighted ? (
                    <Badge
                      variant={plan.highlighted ? 'primary' : 'secondary'}
                      className={cn(
                        'shrink-0',
                        plan.highlighted && 'shadow-[0_8px_30px_-16px_rgba(0,0,0,0.35)]',
                      )}
                    >
                      {plan.badge || 'Empfohlen'}
                    </Badge>
                  ) : null}
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</p>
                  <p className="pb-1 text-xs uppercase tracking-[0.12em] text-muted-foreground/90">
                    {plan.priceSuffix}
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={`${plan.key}-feature-${featureIndex}`} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          'mt-0.5 inline-flex size-5 items-center justify-center rounded-full border',
                          plan.highlighted
                            ? 'border-primary/30 bg-primary/10 text-primary'
                            : 'border-border bg-muted text-foreground/80',
                        )}
                        aria-hidden
                      >
                        <Check className="size-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="mt-6 w-full"
                >
                  <Link
                    href={plan.ctaHref}
                    target={plan.ctaNewTab ? '_blank' : undefined}
                    rel={plan.ctaNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {plan.ctaLabel}
                  </Link>
                </Button>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border/70 bg-background/80 p-4 md:p-6">
            <div className="flex items-start gap-2.5">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{comparisonTitle}</h3>
                {comparisonText ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{comparisonText}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 hidden overflow-hidden rounded-xl border border-border/70 md:block">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40 text-left">
                    <th className="px-4 py-3 text-sm font-semibold text-foreground">Leistung</th>
                    {normalizedPlans.map((plan) => (
                      <th key={`${plan.key}-heading`} className="px-4 py-3 text-center text-sm font-semibold text-foreground">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {normalizedRows.map((row, rowIndex) => (
                    <tr
                      key={row.key}
                      className={cn(
                        'border-b border-border/60 align-middle last:border-b-0',
                        rowIndex % 2 === 1 && 'bg-muted/[0.22]',
                      )}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left text-sm font-medium text-foreground/90"
                      >
                        {row.feature}
                      </th>
                      {row.values.map((value, valueIndex) => (
                        <td key={`${row.key}-cell-${valueIndex}`} className="px-4 py-3 text-center">
                          <ComparisonValuePill value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:hidden">
              {normalizedRows.map((row) => (
                <article key={`${row.key}-mobile`} className="rounded-xl border border-border/70 bg-card/75 p-3.5">
                  <p className="text-sm font-semibold text-foreground">{row.feature}</p>
                  <div className="mt-3 space-y-2">
                    {normalizedPlans.map((plan, planIndex) => (
                      <div
                        key={`${row.key}-${plan.key}-mobile-cell`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/75 px-3 py-2"
                      >
                        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {plan.name}
                        </span>
                        <ComparisonValuePill value={row.values[planIndex]} compact />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {footnote ? <p className="mt-4 text-xs text-muted-foreground">{footnote}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
