'use client'

import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

export type PriceCalcItemClient = {
  id: number | string
  title: string
  description: string
  sortOrder: number
  pricingType: 'once' | 'monthly' | 'both'
  onceMin: number | null
  onceMax: number | null
  monthlyMin: number | null
  monthlyMax: number | null
}

export type PriceCalcCategoryClient = {
  id: number | string
  title: string
  sortOrder: number
  items: PriceCalcItemClient[]
}

export type PriceCalculatorCopy = {
  sectionLabel: string
  heading: string
  sub: string
  offerButtonLabel: string
  offerLink: string
  emptyBreakdownMessage: string
  ratesSectionLabel: string
  ratesHeading: string
  hourlyRate: number
  dayRate: number
  weekRate: number
  ratesNote: string
}

function fmtEuro(n: number): string {
  return n.toLocaleString('de-DE')
}

function TagBadges({ pricingType }: { pricingType: PriceCalcItemClient['pricingType'] }) {
  if (pricingType === 'once') {
    return (
      <Badge variant="primary" className="mb-1.5 px-2 py-0.5 type-body-xs">
        Einmalig
      </Badge>
    )
  }
  if (pricingType === 'monthly') {
    return (
      <Badge variant="secondary" className="mb-1.5 px-2 py-0.5 type-body-xs">
        Monatlich
      </Badge>
    )
  }
  return (
    <div className="mb-1.5 flex flex-wrap gap-1">
      <Badge variant="primary" className="px-2 py-0.5 type-body-xs">
        Einmalig
      </Badge>
      <Badge variant="secondary" className="px-2 py-0.5 type-body-xs">
        Monatlich
      </Badge>
    </div>
  )
}

function itemPriceLabel(item: PriceCalcItemClient): string {
  const parts: string[] = []
  if (item.onceMin != null && item.onceMax != null) {
    parts.push(`${fmtEuro(item.onceMin)}–${fmtEuro(item.onceMax)} €`)
  }
  if (item.monthlyMin != null && item.monthlyMax != null) {
    parts.push(`${fmtEuro(item.monthlyMin)}–${fmtEuro(item.monthlyMax)} €/Monat`)
  }
  return parts.join(' · ')
}

export function PriceCalculatorClient(props: {
  categories: PriceCalcCategoryClient[]
  copy: PriceCalculatorCopy
  showRatesSection: boolean
}) {
  const { categories, copy, showRatesSection } = props

  const sortedCategories = useMemo(
    () =>
      [...categories].sort(
        (a, b) => a.sortOrder - b.sortOrder || String(a.title).localeCompare(String(b.title)),
      ),
    [categories],
  )

  const [activeCategoryId, setActiveCategoryId] = useState<number | string | null>(
    sortedCategories[0]?.id ?? null,
  )
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const activeCategory =
    sortedCategories.find((c) => c.id === activeCategoryId) ?? sortedCategories[0] ?? null

  const toggleItem = useCallback((id: number | string) => {
    const key = String(id)
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const allItemsFlat = useMemo(() => {
    const map = new Map<string, PriceCalcItemClient>()
    for (const c of sortedCategories) {
      for (const it of c.items) {
        map.set(String(it.id), it)
      }
    }
    return map
  }, [sortedCategories])

  const { totalOnceMin, totalOnceMax, totalMonthMin, totalMonthMax, breakdownRows } =
    useMemo(() => {
      let totalOnceMin = 0
      let totalOnceMax = 0
      let totalMonthMin = 0
      let totalMonthMax = 0
      const breakdownRows: { title: string; price: string }[] = []

      for (const id of selectedIds) {
        const item = allItemsFlat.get(id)
        if (!item) continue
        if (item.onceMin != null && item.onceMax != null) {
          totalOnceMin += item.onceMin
          totalOnceMax += item.onceMax
        }
        if (item.monthlyMin != null && item.monthlyMax != null) {
          totalMonthMin += item.monthlyMin
          totalMonthMax += item.monthlyMax
        }
        const p: string[] = []
        if (item.onceMin != null && item.onceMax != null) {
          p.push(`${fmtEuro(item.onceMin)}–${fmtEuro(item.onceMax)} €`)
        }
        if (item.monthlyMin != null && item.monthlyMax != null) {
          p.push(`${fmtEuro(item.monthlyMin)}–${fmtEuro(item.monthlyMax)} €/Mo.`)
        }
        breakdownRows.push({ title: item.title, price: p.join(' / ') })
      }

      return { totalOnceMin, totalOnceMax, totalMonthMin, totalMonthMax, breakdownRows }
    }, [selectedIds, allItemsFlat])

  const offerHref = copy.offerLink?.trim() || '/kontakt'
  const offerButtonLabel = useMemo(() => {
    const normalized = copy.offerButtonLabel.replace(/\s*[>›»↗]+$/u, '').trim()
    return normalized || copy.offerButtonLabel
  }, [copy.offerButtonLabel])
  const offerIsHttp = /^https?:\/\//i.test(offerHref)
  const offerIsMailto = offerHref.startsWith('mailto:')
  const offerIsExternal = offerIsHttp || offerIsMailto

  if (sortedCategories.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 px-5 py-8 text-center type-body text-muted-foreground">
        Der Preisrechner wird aktuell gepflegt. Bitte schauen Sie später wieder vorbei oder
        kontaktieren Sie uns direkt.
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 overflow-hidden py-4">
      <section className="border-b border-border/80 py-6 md:py-8 first:pt-0">
        <p className="mb-2 type-body-sm uppercase tracking-[0.08em] text-muted-foreground">
          {copy.sectionLabel}
        </p>
        <h2 className="mb-2 type-heading-xl text-foreground">{copy.heading}</h2>
        <p className="mb-6 max-w-prose type-body text-muted-foreground">{copy.sub}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {sortedCategories.map((c) => (
            <button
              key={String(c.id)}
              type="button"
              onClick={() => setActiveCategoryId(c.id)}
              className={cn(
                'type-body cursor-pointer rounded-2xl border px-4 py-2 leading-none transition-colors',
                activeCategory?.id === c.id
                  ? 'border-slate-500/50 bg-slate-100 text-slate-950 dark:bg-slate-950/40 dark:text-slate-100'
                  : 'border-border bg-background text-muted-foreground hover:border-muted-foreground/30',
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        {activeCategory && activeCategory.items.length === 0 && (
          <p className="mb-4 type-body text-muted-foreground">
            In dieser Kategorie sind noch keine Leistungen hinterlegt.
          </p>
        )}
        {activeCategory && activeCategory.items.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))]">
            {[...activeCategory.items]
              .sort(
                (a, b) =>
                  a.sortOrder - b.sortOrder || String(a.title).localeCompare(String(b.title)),
              )
              .map((item) => {
                const idStr = String(item.id)
                const on = selectedIds.has(idStr)
                return (
                  <button
                    key={idStr}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={cn(
                      'min-w-0 cursor-pointer rounded-3xl border border-border bg-background p-5 text-left shadow-sm transition duration-200 hover:border-slate-400/60 hover:shadow-md',
                      on &&
                        'border-slate-400/60 bg-slate-100 dark:border-slate-700 dark:bg-slate-950/40',
                    )}
                  >
                    <TagBadges pricingType={item.pricingType} />
                    <div
                      className={cn(
                        'type-heading-md text-foreground',
                        on && 'text-slate-950 dark:text-slate-100',
                      )}
                    >
                      {item.title}
                    </div>
                    <p
                      className={cn(
                        'mb-3 type-body text-muted-foreground',
                        on && 'text-slate-700 dark:text-slate-300',
                      )}
                    >
                      {item.description}
                    </p>
                    <div
                      className={cn(
                        'type-body font-semibold text-muted-foreground',
                        on && 'text-slate-900 dark:text-slate-200',
                      )}
                    >
                      {itemPriceLabel(item)}
                    </div>
                  </button>
                )
              })}
          </div>
        )}

        <div className="mt-4 rounded-lg border border-border/80 bg-background p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="type-heading-lg text-foreground">
                {breakdownRows.length === 0
                  ? '– €'
                  : totalOnceMin > 0
                    ? `${fmtEuro(totalOnceMin)} – ${fmtEuro(totalOnceMax)} €`
                    : '– €'}
              </div>
              <p className="mt-1 type-body text-muted-foreground">
                Einmalig · zzgl. MwSt. · Richtwert
              </p>
              {totalMonthMin > 0 && (
                <p className="mt-1 type-body font-semibold text-slate-900 dark:text-slate-200">
                  + {fmtEuro(totalMonthMin)} – {fmtEuro(totalMonthMax)} €/Monat laufend
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={resetAll}
                className="type-body text-muted-foreground underline-offset-2 hover:underline"
              >
                Auswahl zurücksetzen
              </button>
              {offerIsExternal ? (
                <Button
                  asChild
                  size="sm"
                  className="megamenu-highlight-cta mt-2 w-fit !bg-foreground !text-background hover:!bg-foreground/80 active:!bg-foreground/80"
                >
                  <a
                    href={offerHref}
                    {...(offerIsHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="no-underline"
                  >
                    <span>{offerButtonLabel}</span>
                    <span className="megamenu-special-icon-swap" aria-hidden="true">
                      <ChevronRight className="megamenu-special-icon-layer megamenu-special-icon-layer--a h-4 w-4" />
                      <ArrowUpRight className="megamenu-special-icon-layer megamenu-special-icon-layer--b h-4 w-4" />
                    </span>
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="megamenu-highlight-cta mt-2 w-fit !bg-foreground !text-background hover:!bg-foreground/80 active:!bg-foreground/80"
                >
                  <Link href={offerHref} className="no-underline">
                    <span>{offerButtonLabel}</span>
                    <span className="megamenu-special-icon-swap" aria-hidden="true">
                      <ChevronRight className="megamenu-special-icon-layer megamenu-special-icon-layer--a h-4 w-4" />
                      <ArrowUpRight className="megamenu-special-icon-layer megamenu-special-icon-layer--b h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-border/80 pt-4">
            {breakdownRows.length === 0 ? (
              <p className="py-1 type-body text-muted-foreground">{copy.emptyBreakdownMessage}</p>
            ) : (
              breakdownRows.map((r) => (
                <div
                  key={r.title}
                  className="type-body flex justify-between gap-4 text-muted-foreground"
                >
                  <span>{r.title}</span>
                  <span className="type-body shrink-0 font-semibold whitespace-nowrap text-foreground">
                    {r.price}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {showRatesSection && (
        <section className="py-6">
          <p className="mb-2 type-body-sm uppercase tracking-[0.08em] text-muted-foreground">
            {copy.ratesSectionLabel}
          </p>
          <h2 className="mb-5 type-heading-md text-foreground md:type-heading-lg">
            {copy.ratesHeading}
          </h2>
          <div className="mb-4 flex flex-wrap gap-8">
            <div>
              <div className="type-heading-md text-foreground">{fmtEuro(copy.hourlyRate)} €</div>
              <div className="mt-0.5 type-body text-muted-foreground">Stundensatz · netto</div>
            </div>
            <div>
              <div className="type-heading-md text-foreground">{fmtEuro(copy.dayRate)} €</div>
              <div className="mt-0.5 type-body text-muted-foreground">Tagessatz (8h) · netto</div>
            </div>
            <div>
              <div className="type-heading-md text-foreground">{fmtEuro(copy.weekRate)} €</div>
              <div className="mt-0.5 type-body text-muted-foreground">Wochensatz · netto</div>
            </div>
          </div>
          <p className="max-w-prose type-body text-muted-foreground">{copy.ratesNote}</p>
        </section>
      )}
    </div>
  )
}
