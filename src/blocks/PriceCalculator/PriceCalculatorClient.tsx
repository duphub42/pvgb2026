'use client'

import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'

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
      <span className="mb-1.5 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
        Einmalig
      </span>
    )
  }
  if (pricingType === 'monthly') {
    return (
      <span className="mb-1.5 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
        Monatlich
      </span>
    )
  }
  return (
    <div className="mb-1.5 flex flex-wrap gap-1">
      <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
        Einmalig
      </span>
      <span className="inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-900 dark:bg-sky-950/50 dark:text-sky-200">
        Monatlich
      </span>
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
    () => [...categories].sort((a, b) => a.sortOrder - b.sortOrder || String(a.title).localeCompare(String(b.title))),
    [categories],
  )

  const [activeCategoryId, setActiveCategoryId] = useState<number | string | null>(
    sortedCategories[0]?.id ?? null,
  )
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const activeCategory = sortedCategories.find((c) => c.id === activeCategoryId) ?? sortedCategories[0] ?? null

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

  const { totalOnceMin, totalOnceMax, totalMonthMin, totalMonthMax, breakdownRows } = useMemo(() => {
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
  const offerIsHttp = /^https?:\/\//i.test(offerHref)
  const offerIsMailto = offerHref.startsWith('mailto:')
  const offerIsExternal = offerIsHttp || offerIsMailto

  if (sortedCategories.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 px-5 py-8 text-center text-sm text-muted-foreground">
        Der Preisrechner wird aktuell gepflegt. Bitte schauen Sie später wieder vorbei oder kontaktieren Sie uns
        direkt.
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 space-y-0 py-4">
      <section className="border-b border-border/80 py-6 first:pt-0">
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground">
          {copy.sectionLabel}
        </p>
        <h2 className="mb-1 text-lg font-medium text-foreground">{copy.heading}</h2>
        <p className="mb-5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">{copy.sub}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {sortedCategories.map((c) => (
            <button
              key={String(c.id)}
              type="button"
              onClick={() => setActiveCategoryId(c.id)}
              className={cn(
                'cursor-pointer rounded-md border px-3.5 py-1.5 text-xs leading-none transition-colors',
                activeCategory?.id === c.id
                  ? 'border-sky-500/50 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100'
                  : 'border-border bg-background text-muted-foreground hover:border-muted-foreground/30',
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        {activeCategory && activeCategory.items.length === 0 && (
          <p className="mb-4 text-[13px] text-muted-foreground">
            In dieser Kategorie sind noch keine Leistungen hinterlegt.
          </p>
        )}
        {activeCategory && activeCategory.items.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-2.5">
            {[...activeCategory.items]
              .sort((a, b) => a.sortOrder - b.sortOrder || String(a.title).localeCompare(String(b.title)))
              .map((item) => {
                const idStr = String(item.id)
                const on = selectedIds.has(idStr)
                return (
                  <button
                    key={idStr}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={cn(
                      'cursor-pointer rounded-md border border-transparent bg-muted/60 p-3 text-left transition-colors hover:border-border',
                      on &&
                        'border-emerald-500/40 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-950/25',
                    )}
                  >
                    <TagBadges pricingType={item.pricingType} />
                    <div
                      className={cn(
                        'text-[13px] font-medium text-foreground',
                        on && 'text-emerald-900 dark:text-emerald-100',
                      )}
                    >
                      {item.title}
                    </div>
                    <p
                      className={cn(
                        'mb-1.5 text-[11px] leading-snug text-muted-foreground',
                        on && 'text-emerald-800/90 dark:text-emerald-200/80',
                      )}
                    >
                      {item.description}
                    </p>
                    <div
                      className={cn(
                        'text-xs font-medium text-muted-foreground',
                        on && 'text-emerald-800 dark:text-emerald-200',
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
              <div className="text-[28px] font-medium leading-tight text-foreground">
                {breakdownRows.length === 0
                  ? '– €'
                  : totalOnceMin > 0
                    ? `${fmtEuro(totalOnceMin)} – ${fmtEuro(totalOnceMax)} €`
                    : '– €'}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Einmalig · zzgl. MwSt. · Richtwert
              </p>
              {totalMonthMin > 0 && (
                <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                  + {fmtEuro(totalMonthMin)} – {fmtEuro(totalMonthMax)} €/Monat laufend
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetAll}
                className="text-[11px] text-muted-foreground underline-offset-2 hover:underline"
              >
                Auswahl zurücksetzen
              </button>
              {offerIsExternal ? (
                <a
                  href={offerHref}
                  {...(offerIsHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-sky-700"
                >
                  {copy.offerButtonLabel}
                </a>
              ) : (
                <Link
                  href={offerHref}
                  className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-sky-700"
                >
                  {copy.offerButtonLabel}
                </Link>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-border/80 pt-4">
            {breakdownRows.length === 0 ? (
              <p className="py-1 text-[13px] text-muted-foreground">{copy.emptyBreakdownMessage}</p>
            ) : (
              breakdownRows.map((r) => (
                <div key={r.title} className="flex justify-between gap-4 text-xs text-muted-foreground">
                  <span>{r.title}</span>
                  <span className="shrink-0 font-medium whitespace-nowrap text-foreground">{r.price}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {showRatesSection && (
        <section className="py-6">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground">
            {copy.ratesSectionLabel}
          </p>
          <h2 className="mb-4 text-lg font-medium text-foreground">{copy.ratesHeading}</h2>
          <div className="mb-4 flex flex-wrap gap-8">
            <div>
              <div className="text-[26px] font-medium text-foreground">{fmtEuro(copy.hourlyRate)} €</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Stundensatz · netto</div>
            </div>
            <div>
              <div className="text-[26px] font-medium text-foreground">{fmtEuro(copy.dayRate)} €</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Tagessatz (8h) · netto</div>
            </div>
            <div>
              <div className="text-[26px] font-medium text-foreground">{fmtEuro(copy.weekRate)} €</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Wochensatz · netto</div>
            </div>
          </div>
          <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground">{copy.ratesNote}</p>
        </section>
      )}
    </div>
  )
}
