'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
import {
  PortfolioCaseChartPanel,
  PortfolioMarketingCardVisual,
} from '@/components/portfolio/PortfolioCaseTrendCharts'
import { Badge } from '@/components/ui/badge'
import { getMarketingCaseChartData } from '@/utilities/marketingPortfolioCaseContent'
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
  layoutVariant,
}) => {
  const isDataLayout = layoutVariant === 'data'
  const rows = useMemo(
    () =>
      (cases ?? []).filter((item): item is PortfolioCase => Boolean(item?.title && item?.summary)),
    [cases],
  )
  const [activeCaseKey, setActiveCaseKey] = useState<string | null>(null)
  const [isPortalMounted, setIsPortalMounted] = useState(false)
  const [modalDragOffset, setModalDragOffset] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const modalScrollRef = useRef<HTMLDivElement | null>(null)
  const modalDragOffsetRef = useRef(0)
  const modalTouchDragRef = useRef<{
    startY: number
    active: boolean
    dismissAxis: 'down' | 'up' | null
  }>({
    startY: 0,
    active: false,
    dismissAxis: null,
  })
  const isAdjustingLoopRef = useRef(false)

  const closeModal = useCallback(() => {
    setActiveCaseKey(null)
  }, [])

  const setModalDrag = useCallback((offset: number) => {
    modalDragOffsetRef.current = offset
    setModalDragOffset(offset)
  }, [])

  const withKeys = useMemo(
    () =>
      rows.map((item, index) => {
        const discipline = String(item.discipline ?? 'webdesign')
        const idPart =
          typeof item.id === 'string' && item.id ? item.id : `${item.title ?? 'case'}-${index}`
        return {
          item,
          key: `${discipline}-${idPart}`,
        }
      }),
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
  const activeHeroImage = isMediaObject(activeCase?.coverImage) ? activeCase.coverImage : null
  const activeMarketingCharts = activeCase ? getMarketingCaseChartData(activeCase.title) : null
  const showMarketingCharts =
    Boolean(activeMarketingCharts) &&
    (activeCase?.discipline === 'marketing' || isDataLayout)

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
    setIsPortalMounted(true)
  }, [])

  useEffect(() => {
    if (!activeCaseKey) return

    const scrollY = window.scrollY
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverscroll = document.body.style.overscrollBehavior
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior
    const previousBodyPosition = document.body.style.position
    const previousBodyTop = document.body.style.top
    const previousBodyLeft = document.body.style.left
    const previousBodyRight = document.body.style.right
    const previousBodyWidth = document.body.style.width

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overscrollBehavior = previousBodyOverscroll
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll
      document.body.style.position = previousBodyPosition
      document.body.style.top = previousBodyTop
      document.body.style.left = previousBodyLeft
      document.body.style.right = previousBodyRight
      document.body.style.width = previousBodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [activeCaseKey])

  useEffect(() => {
    setModalDrag(0)
    modalScrollRef.current?.scrollTo(0, 0)
  }, [activeCaseKey, setModalDrag])

  useEffect(() => {
    if (!activeCaseKey) return

    const scrollEl = modalScrollRef.current
    const dialogEl = modalRef.current
    if (!scrollEl || !dialogEl) return

    const resetTouchDrag = () => {
      modalTouchDragRef.current.active = false
      modalTouchDragRef.current.dismissAxis = null
      setModalDrag(0)
    }

    const onTouchStart = (event: TouchEvent) => {
      const atTop = scrollEl.scrollTop <= 1
      const atBottom =
        scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1
      const notScrollable = scrollEl.scrollHeight <= scrollEl.clientHeight + 1

      modalTouchDragRef.current.startY = event.touches[0]?.clientY ?? 0
      modalTouchDragRef.current.active = false

      if (atTop || notScrollable) {
        modalTouchDragRef.current.dismissAxis = 'down'
      } else if (atBottom) {
        modalTouchDragRef.current.dismissAxis = 'up'
      } else {
        modalTouchDragRef.current.dismissAxis = null
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      const axis = modalTouchDragRef.current.dismissAxis
      if (!axis) return

      const deltaY = (event.touches[0]?.clientY ?? 0) - modalTouchDragRef.current.startY
      const validDrag =
        (axis === 'down' && deltaY > 0) || (axis === 'up' && deltaY < 0)

      if (!validDrag) return

      if (!modalTouchDragRef.current.active && Math.abs(deltaY) > 6) {
        modalTouchDragRef.current.active = true
      }

      if (modalTouchDragRef.current.active) {
        event.preventDefault()
        setModalDrag(deltaY)
      }
    }

    const onTouchEnd = () => {
      if (!modalTouchDragRef.current.active) {
        resetTouchDrag()
        return
      }

      const threshold = dialogEl.offsetHeight * 0.3
      if (Math.abs(modalDragOffsetRef.current) >= threshold) {
        closeModal()
      }

      resetTouchDrag()
    }

    scrollEl.addEventListener('touchstart', onTouchStart, { passive: true })
    scrollEl.addEventListener('touchmove', onTouchMove, { passive: false })
    scrollEl.addEventListener('touchend', onTouchEnd, { passive: true })
    scrollEl.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      scrollEl.removeEventListener('touchstart', onTouchStart)
      scrollEl.removeEventListener('touchmove', onTouchMove)
      scrollEl.removeEventListener('touchend', onTouchEnd)
      scrollEl.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [activeCaseKey, closeModal, setModalDrag])

  useEffect(() => {
    if (!activeCaseKey) return

    const onWheel = (event: WheelEvent) => {
      const scrollEl = modalScrollRef.current
      if (!scrollEl) {
        event.preventDefault()
        return
      }

      if (!scrollEl.contains(event.target as Node)) {
        event.preventDefault()
        return
      }

      const atTop = scrollEl.scrollTop <= 0
      const atBottom =
        scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1

      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
        event.preventDefault()
      }
    }

    document.addEventListener('wheel', onWheel, { passive: false })
    return () => document.removeEventListener('wheel', onWheel)
  }, [activeCaseKey])

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

  const portfolioModal =
    isPortalMounted && activeCase
      ? createPortal(
          <>
            <div
              className="portfolio-blur-overlay fixed inset-0 z-50 overscroll-none bg-background/20 backdrop-blur-md opacity-100 transition-opacity duration-300 touch-none"
              onClick={closeModal}
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            />

            <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden overscroll-none p-4 md:p-6">
              <button
                type="button"
                onClick={openPrevCase}
                className="absolute left-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-sm transition hover:bg-background md:left-4"
                aria-label="Vorheriges Projekt"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={openNextCase}
                className="absolute right-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-sm transition hover:bg-background md:right-4"
                aria-label="Nächstes Projekt"
              >
                <ChevronRight className="size-5" />
              </button>

              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-live="polite"
                className="relative flex w-full max-w-4xl max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 supports-[height:100svh]:max-h-[calc(100svh-2rem)]"
                onClick={(event) => event.stopPropagation()}
                style={{
                  animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                  transform: modalDragOffset ? `translateY(${modalDragOffset}px)` : undefined,
                  transition: modalDragOffset ? undefined : 'transform 0.2s ease-out',
                }}
              >
                <div
                  ref={modalScrollRef}
                  className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain p-5 md:p-6"
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute right-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/90 hover:bg-muted"
                    aria-label="Modal schließen"
                  >
                    <X className="size-4" />
                  </button>

                  {showMarketingCharts && activeMarketingCharts ? (
                    <div className="mb-5 grid gap-4 lg:grid-cols-5">
                      <div className="lg:col-span-3">
                        <PortfolioCaseChartPanel data={activeMarketingCharts} />
                      </div>
                      {activeHeroImage ? (
                        <div className="overflow-hidden rounded-2xl border border-border/70 lg:col-span-2">
                          <p className="border-b border-border/60 bg-muted/30 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Website-Vorschau
                          </p>
                          <Media
                            resource={activeHeroImage}
                            className="w-full"
                            imgClassName="h-auto w-full object-contain"
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : activeHeroImage ? (
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
                      <h3 className="mt-3 text-2xl font-semibold leading-tight">
                        {activeCase.title}
                      </h3>
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
                          key={
                            typeof metric.id === 'string' && metric.id
                              ? metric.id
                              : `popup-metric-${metricIndex}`
                          }
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
                          key={
                            typeof tag.id === 'string' && tag.id ? tag.id : `popup-tag-${tagIndex}`
                          }
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
            </div>
          </>,
          document.body,
        )
      : null

  return (
    <section
      className={cn(
        'relative w-full py-16 md:py-20',
        isDataLayout && 'portfolio-case-grid--data',
      )}
      style={{ ['--pcg-fade-bg' as string]: fadeBg }}
    >
      {portfolioModal}

      <div className="container px-0 md:px-0">
        <div className="w-full">
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
            <h2 className="overflow-visible py-1 text-3xl font-semibold leading-[1.16] md:text-4xl md:leading-[1.14]">
              {heading}
            </h2>
          ) : null}
          {intro ? (
            <p className="mt-4 w-full text-sm leading-relaxed opacity-85 md:text-base">{intro}</p>
          ) : null}
        </div>

        <div className="mt-8">
          <div className="relative -mx-4 px-4" aria-hidden={Boolean(activeCase)}>
            <div
              className="pointer-events-none absolute inset-y-0 left-4 z-10 w-12 backdrop-blur-[1px] md:w-20"
              style={{
                background:
                  'linear-gradient(to right, var(--pcg-fade-bg) 0%, color-mix(in srgb, var(--pcg-fade-bg) 55%, transparent) 60%, transparent 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-4 z-10 w-12 backdrop-blur-[1px] md:w-20"
              style={{
                background:
                  'linear-gradient(to left, var(--pcg-fade-bg) 0%, color-mix(in srgb, var(--pcg-fade-bg) 55%, transparent) 60%, transparent 100%)',
              }}
            />

            <button
              type="button"
              onClick={() => stepSlider('prev')}
              className="portfolio-slider-control absolute left-6 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition"
              aria-label="Vorheriger Slide"
              tabIndex={activeCase ? -1 : 0}
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => stepSlider('next')}
              className="portfolio-slider-control absolute right-6 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition"
              aria-label="Nächster Slide"
              tabIndex={activeCase ? -1 : 0}
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
                  const marketingCharts = getMarketingCaseChartData(item.title)
                  const cardMetrics = (item.metrics ?? []).filter(
                    (metric) => metric?.value?.trim() && metric?.label?.trim(),
                  )
                  const useMarketingVisual =
                    Boolean(marketingCharts) &&
                    (discipline === 'marketing' || isDataLayout)

                  return (
                    <button
                      type="button"
                      data-portfolio-card="true"
                      key={`${key}-${loopIndex}`}
                      onClick={() => setActiveCaseKey(key)}
                      className={cn(
                        'portfolio-case-card group w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-3xl border text-left backdrop-blur-sm md:w-[48vw] md:max-w-[460px] lg:w-[33vw] lg:max-w-[390px] xl:w-[30vw] xl:max-w-[380px]',
                        useMarketingVisual &&
                          'border-emerald-500/25 bg-gradient-to-b from-emerald-500/[0.04] to-background',
                      )}
                      aria-label={`Details öffnen: ${item.title}`}
                      tabIndex={activeCase ? -1 : 0}
                    >
                      <div className="relative min-h-[240px] overflow-hidden border-b border-border/70 px-4 pt-4 pb-4">
                        {useMarketingVisual && marketingCharts ? (
                          <>
                            <div className="relative z-[1] transition-all duration-500 ease-out group-hover:scale-[0.98] group-hover:opacity-0">
                              <PortfolioMarketingCardVisual
                                data={marketingCharts}
                                metrics={cardMetrics}
                              />
                            </div>
                            {coverImage ? (
                              <div className="absolute inset-x-4 top-4 bottom-4 z-[2] overflow-hidden rounded-xl opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                                <Media
                                  resource={coverImage}
                                  className="h-full w-full"
                                  imgClassName="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                              </div>
                            ) : null}
                          </>
                        ) : coverImage ? (
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
                          {useMarketingVisual ? 'Marketing · KPI-Fokus' : `Projektfeld: ${meta.label}`}
                        </div>

                        <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>

                        {useMarketingVisual ? (
                          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {item.summary}
                          </p>
                        ) : null}

                        {item.industry ? (
                          <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Building2 className="size-4" />
                            Branche: {item.industry}
                          </div>
                        ) : null}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
