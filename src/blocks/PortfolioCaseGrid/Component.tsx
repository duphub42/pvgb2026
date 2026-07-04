"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers3,
  Megaphone,
  MonitorSmartphone,
  Palette,
  RefreshCcw,
  Search,
  Sparkles,
  LayoutGrid,
  Gauge,
  ShoppingCart,
  X,
  type LucideIcon,
} from 'lucide-react'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'
import type {
  Media as MediaType,
  PortfolioCaseGridBlock as PortfolioCaseGridBlockData,
} from '@/payload-types'

type ExistingPortfolioCase = NonNullable<PortfolioCaseGridBlockData['cases']>[number]

type CategoryKey =
  | 'relaunch'
  | 'komplettDesign'
  | 'branding'
  | 'seo'
  | 'uxUi'
  | 'performance'
  | 'eCommerce'
  | 'content'

type PortfolioGalleryItem = {
  id?: string | null
  image?: MediaType | string | null
  caption?: string | null
}

type PortfolioCase = ExistingPortfolioCase & {
  year?: number | null
  categories?: CategoryKey[] | null
  gallery?: PortfolioGalleryItem[] | null
  website?: {
    label?: string | null
    href?: string | null
  } | null
}

type PortfolioCaseGridProps = Omit<PortfolioCaseGridBlockData, 'cases'> & {
  cases?: PortfolioCase[] | null
  disableInnerContainer?: boolean
}

type Discipline = 'webdesign' | 'marketing' | 'branding' | 'mixed'

const disciplineMeta: Record<
  Discipline,
  {
    label: string
    icon: LucideIcon
  }
> = {
  webdesign: {
    label: 'Webdesign',
    icon: MonitorSmartphone,
  },
  marketing: {
    label: 'Marketing',
    icon: Megaphone,
  },
  branding: {
    label: 'Branding',
    icon: Palette,
  },
  mixed: {
    label: 'Interdisziplinaer',
    icon: Layers3,
  },
}

const categoryMeta: Record<
  CategoryKey,
  {
    label: string
    icon: LucideIcon
  }
> = {
  relaunch: {
    label: 'Relaunch',
    icon: RefreshCcw,
  },
  komplettDesign: {
    label: 'Komplettdesign',
    icon: LayoutGrid,
  },
  branding: {
    label: 'Branding',
    icon: Palette,
  },
  seo: {
    label: 'SEO',
    icon: Search,
  },
  uxUi: {
    label: 'UX / UI',
    icon: MonitorSmartphone,
  },
  performance: {
    label: 'Performance',
    icon: Gauge,
  },
  eCommerce: {
    label: 'E-Commerce',
    icon: ShoppingCart,
  },
  content: {
    label: 'Content',
    icon: Sparkles,
  },
}

const normalizeHref = (raw?: string | null): string | null => {
  const value = String(raw ?? '').trim()
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.startsWith('/')) return value
  return `/${value.replace(/^\/+/, '')}`
}

const isExternalHref = (href: string): boolean =>
  href.startsWith('http://') || href.startsWith('https://')

const isMediaObject = (value: unknown): value is MediaType =>
  typeof value === 'object' && value !== null

const blockBgVar: Record<string, string> = {
  muted: 'var(--muted)',
  accent: 'var(--accent)',
  light: 'var(--theme-elevation-50)',
  dark: 'var(--theme-elevation-800)',
}

export const PortfolioCaseGridBlock: React.FC<PortfolioCaseGridProps> = ({
  eyebrow,
  heading,
  intro,
  cases,
  blockBackground,
}) => {
  const rows = useMemo(
    () =>
      (cases ?? []).filter((item): item is PortfolioCase =>
        Boolean(item?.title && item?.summary),
      ),
    [cases],
  )
  const [activeCaseKey, setActiveCaseKey] = useState<string | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const isAdjustingLoopRef = useRef(false)

  const withKeys = useMemo(
    () =>
      rows.map((item, index) => ({
        item,
        key: typeof item.id === 'string' && item.id ? item.id : `${item.title}-${index}`,
      })),
    [rows],
  )
  const loopCards = useMemo(() => [...withKeys, ...withKeys, ...withKeys], [withKeys])

  const activeCase = useMemo(() => {
    if (!activeCaseKey) return null
    return withKeys.find((entry) => entry.key === activeCaseKey)?.item ?? null
  }, [activeCaseKey, withKeys])
  const activeCaseIndex = useMemo(
    () => withKeys.findIndex((entry) => entry.key === activeCaseKey),
    [activeCaseKey, withKeys],
  )

  const openPrevCase = useCallback(() => {
    if (!withKeys.length) return
    if (activeCaseIndex < 0) {
      setActiveCaseKey(withKeys[0].key)
      return
    }

    const nextIndex = (activeCaseIndex - 1 + withKeys.length) % withKeys.length
    setActiveCaseKey(withKeys[nextIndex].key)
  }, [activeCaseIndex, withKeys])

  const openNextCase = useCallback(() => {
    if (!withKeys.length) return
    if (activeCaseIndex < 0) {
      setActiveCaseKey(withKeys[0].key)
      return
    }

    const nextIndex = (activeCaseIndex + 1) % withKeys.length
    setActiveCaseKey(withKeys[nextIndex].key)
  }, [activeCaseIndex, withKeys])

  const activeDiscipline = (activeCase?.discipline ?? 'webdesign') as Discipline
  const activeDisciplineMeta = disciplineMeta[activeDiscipline] ?? disciplineMeta.webdesign
  const ActiveDisciplineIcon = activeDisciplineMeta.icon
  const activeCtaHref = normalizeHref(activeCase?.cta?.href)
  const activeCtaLabel = activeCase?.cta?.label?.trim() || 'Case ansehen'
  const activeWebsiteHref = normalizeHref(activeCase?.website?.href) ?? activeCtaHref
  const activeWebsiteLabel = activeCase?.website?.label?.trim() || activeCtaLabel
  const activeTags = (activeCase?.tags ?? []).filter((tag) => tag?.label?.trim())
  const activeMetrics = (activeCase?.metrics ?? []).filter(
    (metric) => metric?.value?.trim() && metric?.label?.trim(),
  )
  const activeCategories = (activeCase?.categories ?? []).filter(
    (category): category is CategoryKey => Boolean(category && categoryMeta[category]),
  )
  const activeHeroImage = isMediaObject(activeCase?.coverImage)
    ? activeCase.coverImage
    : null

  const stepSlider = (direction: 'prev' | 'next') => {
    const slider = sliderRef.current
    if (!slider) return
    const firstCard = slider.querySelector<HTMLElement>('[data-portfolio-card="true"]')
    const cardWidth = firstCard?.offsetWidth ?? 380
    const gap = 16
    const amount = cardWidth + gap
    const delta = direction === 'next' ? amount : -amount
    slider.scrollBy({ left: delta, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!activeCaseKey) return

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCaseKey(null)
      if (event.key === 'ArrowLeft') openPrevCase()
      if (event.key === 'ArrowRight') openNextCase()
    }

    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [activeCaseKey, openNextCase, openPrevCase])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider || withKeys.length < 2) return

    const firstCard = slider.querySelector<HTMLElement>('[data-portfolio-card="true"]')
    const cardWidth = firstCard?.offsetWidth ?? 380
    const gap = 16
    const halfCardOffset = Math.round((cardWidth + gap) / 2)
    const desktopOffset = window.innerWidth >= 1024 ? halfCardOffset : 0

    slider.scrollLeft = slider.scrollWidth / 3 + desktopOffset

    const onScroll = () => {
      if (isAdjustingLoopRef.current) return
      const section = slider.scrollWidth / 3

      if (slider.scrollLeft < section * 0.5) {
        isAdjustingLoopRef.current = true
        slider.scrollLeft += section
        isAdjustingLoopRef.current = false
      } else if (slider.scrollLeft > section * 1.5) {
        isAdjustingLoopRef.current = true
        slider.scrollLeft -= section
        isAdjustingLoopRef.current = false
      }
    }

    slider.addEventListener('scroll', onScroll, { passive: true })
    return () => slider.removeEventListener('scroll', onScroll)
  }, [withKeys.length])

  if (!rows.length) return null

  const fadeBg = blockBgVar[(blockBackground as string) ?? ''] ?? 'var(--background)'

  return (
    <section className="relative w-full py-16 md:py-20" style={{ ['--pcg-fade-bg' as string]: fadeBg }}>
      {/* Background Blur Overlay – Like MegaMenu Dropdown */}
      <div
        className={cn(
          'portfolio-blur-overlay fixed inset-0 z-50 bg-background/20 backdrop-blur-md pointer-events-none opacity-0 transition-opacity duration-300',
          activeCase && 'opacity-100 pointer-events-auto',
        )}
        onClick={() => setActiveCaseKey(null)}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      />

      <div className="container px-0 md:px-0">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Badge
              variant="secondary"
              className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              <Sparkles className="size-3.5" />
              {eyebrow}
            </Badge>
          ) : null}
          {heading ? (
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{heading}</h2>
          ) : null}
          {intro ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-85 md:text-base">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mt-8">
          {!activeCase ? (
            <div className="relative -mx-4 px-4">
              <div
                className="pointer-events-none absolute inset-y-0 left-4 z-10 w-12 backdrop-blur-[1px] md:w-20"
                style={{ background: 'linear-gradient(to right, var(--pcg-fade-bg) 0%, color-mix(in srgb, var(--pcg-fade-bg) 55%, transparent) 60%, transparent 100%)' }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-4 z-10 w-12 backdrop-blur-[1px] md:w-20"
                style={{ background: 'linear-gradient(to left, var(--pcg-fade-bg) 0%, color-mix(in srgb, var(--pcg-fade-bg) 55%, transparent) 60%, transparent 100%)' }}
              />

              <button
                type="button"
                onClick={() => stepSlider('prev')}
                className="absolute left-6 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition hover:opacity-80"
                aria-label="Vorheriger Slide"
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => stepSlider('next')}
                className="absolute right-6 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition hover:opacity-80"
                aria-label="Nächster Slide"
              >
                <ChevronRight className="size-4" />
              </button>

              <div
                ref={sliderRef}
                className="overflow-x-auto px-10 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex w-max gap-8">
                  {loopCards.map(({ item, key }, loopIndex) => {
                    const discipline = (item.discipline ?? 'webdesign') as Discipline
                    const meta = disciplineMeta[discipline] ?? disciplineMeta.webdesign
                    const DisciplineIcon = meta.icon
                    const coverImage = isMediaObject(item.coverImage) ? item.coverImage : null

                    return (
                      <button
                        type="button"
                        data-portfolio-card="true"
                        key={`${key}-${loopIndex}`}
                        onClick={() => setActiveCaseKey(key)}
                        className="group w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-3xl border border-border/70 bg-muted/25 backdrop-blur-sm md:w-[48vw] md:max-w-[460px] lg:w-[33vw] lg:max-w-[390px] xl:w-[30vw] xl:max-w-[380px]"
                        aria-label={`Details öffnen: ${item.title}`}
                      >
                        <div className="overflow-hidden border-b border-border/70 px-4 pt-4">
                          {coverImage ? (
                            <Media
                              resource={coverImage}
                              className="w-full overflow-hidden rounded-xl"
                              imgClassName="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex h-[240px] items-center justify-center bg-muted/40 text-sm text-muted-foreground">
                              Kein Titelbild
                            </div>
                          )}
                        </div>

                        <div className="space-y-3 p-4">
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium">
                            <DisciplineIcon className="size-3.5" />
                            {meta.label}
                          </div>

                          <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>

                          {item.industry ? (
                            <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Building2 className="size-4" />
                              {item.industry}
                            </div>
                          ) : null}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative z-[60] w-full rounded-3xl bg-black/15 p-2 animate-in fade-in-0 zoom-in-95 duration-300 md:p-3"
              role="dialog"
              aria-modal="true"
              onClick={() => setActiveCaseKey(null)}
              style={{ animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); openPrevCase() }}
                className="absolute left-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-sm transition hover:bg-background"
                aria-label="Vorheriges Projekt"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); openNextCase() }}
                className="absolute right-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-sm transition hover:bg-background"
                aria-label="Nächstes Projekt"
              >
                <ChevronRight className="size-5" />
              </button>

              <div
                className="relative w-full rounded-3xl border border-border bg-background p-5 shadow-2xl md:p-6"
                aria-live="polite"
                onClick={(event) => event.stopPropagation()}
                style={{ animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
              >
                <button
                  type="button"
                  onClick={() => setActiveCaseKey(null)}
                  className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/90 hover:bg-muted"
                  aria-label="Modal schließen"
                >
                  <X className="size-4" />
                </button>

                {activeHeroImage ? (
                  <div className="mb-5 overflow-hidden rounded-2xl border border-border/70">
                    <Media
                      resource={activeHeroImage}
                      className="w-full"
                      imgClassName="h-auto w-full object-contain"
                    />
                  </div>
                ) : null}

                <div className="mb-5 flex items-start gap-3 pr-12">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium">
                      <ActiveDisciplineIcon className="size-3.5" />
                      {activeDisciplineMeta.label}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight">{activeCase.title}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {activeCase.year ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-medium text-foreground/90">
                      <CalendarDays className="size-3.5 text-primary" />
                      {activeCase.year}
                    </span>
                  ) : null}
                  {activeCase.industry ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-medium text-foreground/90">
                      <Building2 className="size-3.5 text-primary" />
                      {activeCase.industry}
                    </span>
                  ) : null}
                  {activeCategories.map((category) => {
                    const CategoryIcon = categoryMeta[category].icon

                    return (
                      <Badge
                        variant="secondary"
                        key={`popup-${category}`}
                        className="gap-1.5 px-2.5 py-1 text-xs font-medium"
                      >
                        <CategoryIcon className="size-3.5" />
                        {categoryMeta[category].label}
                      </Badge>
                    )
                  })}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {activeCase.summary}
                </p>

                {(activeCase.challenge || activeCase.approach || activeCase.result) && (
                  <dl className="mt-6 grid gap-3 text-sm md:grid-cols-3">
                    {activeCase.challenge ? (
                      <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                        <dt className="font-semibold text-foreground/85">Challenge</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">
                          {activeCase.challenge}
                        </dd>
                      </div>
                    ) : null}
                    {activeCase.approach ? (
                      <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                        <dt className="font-semibold text-foreground/85">Vorgehen</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">
                          {activeCase.approach}
                        </dd>
                      </div>
                    ) : null}
                    {activeCase.result ? (
                      <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                        <dt className="font-semibold text-foreground/85">Ergebnis</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">
                          {activeCase.result}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                )}

                {activeMetrics.length > 0 ? (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {activeMetrics.map((metric, metricIndex) => (
                      <div
                        key={typeof metric.id === 'string' && metric.id ? metric.id : `popup-metric-${metricIndex}`}
                        className="rounded-xl border border-border/70 bg-background/70 px-3 py-2.5"
                      >
                        <p className="text-base font-semibold md:text-lg">{metric.value}</p>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {activeTags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {activeTags.map((tag, tagIndex) => (
                      <Badge
                        variant="secondary"
                        key={typeof tag.id === 'string' && tag.id ? tag.id : `popup-tag-${tagIndex}`}
                        className="px-2.5 py-1 text-xs font-medium"
                      >
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                {(activeWebsiteHref || activeCtaHref) && (
                  <div className="mt-6">
                    {activeWebsiteHref ? (
                      isExternalHref(activeWebsiteHref) ? (
                        <a
                          href={activeWebsiteHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          <Globe className="size-4" />
                          {activeWebsiteLabel}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <Link
                          href={activeWebsiteHref}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          <Globe className="size-4" />
                          {activeWebsiteLabel}
                          <ArrowUpRight className="size-4" />
                        </Link>
                      )
                    ) : isExternalHref(activeCtaHref as string) ? (
                      <a
                        href={activeCtaHref as string}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {activeCtaLabel}
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      <Link
                        href={activeCtaHref as string}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {activeCtaLabel}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
