'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { translateValueForLocale } from '@/i18n/translationOverlay'
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
    label: 'Interdisziplinär',
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

const showcasePortfolioCards = [
  {
    src: '/showcase-portfolio/card-zahnarzt.png',
    alt: 'Zahnarzt Kipp Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-medifisch.png',
    alt: 'Medifisch Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-allclean.png',
    alt: 'Allclean Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-verband-digitale-innovation.png',
    alt: 'Verband Digitale Innovation Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-initiative-saubere-luft.png',
    alt: 'Initiative Saubere Luft Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-trinkwasser-verband.png',
    alt: 'Trinkwasser Verband Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-baufinanzierung.png',
    alt: 'Baufinanzierung Halle Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-fit-liner.png',
    alt: 'Fit Liner Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-kipp-dental.png',
    alt: 'Kipp Dental Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-zhkplus.png',
    alt: 'ZHK Plus Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-schlosseicks.png',
    alt: 'Schloss Eicks Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-soulmating.png',
    alt: 'Soulmating Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-musikschule-hoerstel.png',
    alt: 'Musikschule Hoerstel Website Showcase',
  },
  {
    src: '/showcase-portfolio/card-moriss.png',
    alt: 'Moriss Obstplantagen Website Showcase',
  },
]

const showcasePlaceholder =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"%3E%3C/svg%3E'

const getShowcasePortfolioCard = (title: string, fallbackIndex: number) => {
  const normalizedTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const bySlug = (slug: string) =>
    showcasePortfolioCards.find((card) => card.src.includes(`/card-${slug}.png`))

  if (normalizedTitle.includes('medifisch')) return bySlug('medifisch')
  if (normalizedTitle.includes('allclean') || normalizedTitle.includes('all clean')) {
    return bySlug('allclean')
  }
  if (normalizedTitle.includes('lux')) return bySlug('allclean')
  if (
    normalizedTitle.includes('initiative saubere luft') ||
    normalizedTitle.includes('saubere luft')
  ) {
    return bySlug('initiative-saubere-luft')
  }
  if (normalizedTitle.includes('trinkwasser')) return bySlug('trinkwasser-verband')
  if (
    normalizedTitle.includes('verband digitale innovation') ||
    normalizedTitle.includes('digitale innovation')
  ) {
    return bySlug('verband-digitale-innovation')
  }
  if (normalizedTitle.includes('baufinanzierung') || normalizedTitle.includes('bfh')) {
    return bySlug('baufinanzierung')
  }
  if (normalizedTitle.includes('fitline') || normalizedTitle.includes('fit liner')) {
    return bySlug('fit-liner')
  }
  if (
    normalizedTitle.includes('kipp dental') ||
    normalizedTitle.includes('zahntechnik') ||
    normalizedTitle.includes('dentallabor')
  ) {
    return bySlug('kipp-dental')
  }
  if (normalizedTitle.includes('zhk')) return bySlug('zhkplus')
  if (normalizedTitle.includes('schloss') || normalizedTitle.includes('eicks')) {
    return bySlug('schlosseicks')
  }
  if (normalizedTitle.includes('soulmating')) return bySlug('soulmating')
  if (
    normalizedTitle.includes('musikschule') ||
    normalizedTitle.includes('ton') ||
    normalizedTitle.includes('toenchen') ||
    normalizedTitle.includes('horstel')
  ) {
    return bySlug('musikschule-hoerstel')
  }
  if (normalizedTitle.includes('moriss') || normalizedTitle.includes('obst'))
    return bySlug('moriss')
  if (normalizedTitle.includes('zahnarzt') || normalizedTitle.includes('zahnarztpraxis')) {
    return bySlug('zahnarzt')
  }

  return showcasePortfolioCards[fallbackIndex % showcasePortfolioCards.length]
}

type PortfolioCaseEntry = {
  item: PortfolioCase
  key: string
}

const normalizeProjectTitle = (title: string): string =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const preferredIsometricTitleOrder = [
  'Schloss Eicks',
  'MEDIFISCH',
  'Allclean',
  'Moriss Obstplantagen',
  'BFH - Baufinanzierung Halle',
  'Ton & Tönchen',
  'Verband Digitale Innovation',
  'ZHKplus - Zahnheilkunde Plus',
  'Soulmating',
  'KIPP Dental',
  'Initiative Saubere Luft',
  'Zahnarzt Kipp',
  'Trinkwasser Verband',
]

const orderPortfolioEntries = <T extends PortfolioCaseEntry>(entries: T[]): T[] =>
  [...entries].sort((a, b) => {
    const aIndex = preferredIsometricTitleOrder.findIndex(
      (title) => normalizeProjectTitle(title) === normalizeProjectTitle(a.item.title),
    )
    const bIndex = preferredIsometricTitleOrder.findIndex(
      (title) => normalizeProjectTitle(title) === normalizeProjectTitle(b.item.title),
    )
    const safeAIndex = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex
    const safeBIndex = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex
    return safeAIndex - safeBIndex
  })

const rotateEntries = <T,>(entries: T[], offset: number): T[] => {
  if (!entries.length) return entries
  const normalizedOffset = ((offset % entries.length) + entries.length) % entries.length
  return [...entries.slice(normalizedOffset), ...entries.slice(0, normalizedOffset)]
}

const buildIsometricCards = (entries: PortfolioCaseEntry[]) => {
  if (!entries.length) return []

  const orderedEntries = orderPortfolioEntries(entries)

  const centerRepeatIndex = 2
  return Array.from({ length: 8 }, (_, repeatIndex) => {
    const distanceFromCenter = repeatIndex - centerRepeatIndex
    const rotation = Math.abs(distanceFromCenter) * 5
    const rotated = rotateEntries(orderedEntries, rotation)
    const repeatEntries = distanceFromCenter < 0 ? [...rotated].reverse() : rotated

    return repeatEntries.map((entry, orderIndex) => ({
      ...entry,
      renderKey: `${entry.key}-iso-${repeatIndex}-${orderIndex}`,
    }))
  }).flat()
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

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isMobilePortfolioViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

const getMobileShowcaseSrc = (src: string): string =>
  src.replace('/showcase-portfolio/', '/showcase-portfolio/mobile/').replace(/\.png$/i, '.jpg')

const getDesktopShowcaseSrc = (src: string): string =>
  src.replace('/showcase-portfolio/', '/showcase-portfolio/desktop/').replace(/\.png$/i, '.jpg')

let portfolioGsapPromise: Promise<{
  gsap: typeof import('gsap').default
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
}> | null = null

const loadPortfolioGsap = async () => {
  portfolioGsapPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    },
  )

  return portfolioGsapPromise
}

export const PortfolioCaseGridBlock: React.FC<PortfolioCaseGridProps> = ({
  eyebrow,
  heading,
  intro,
  cases,
  layoutVariant,
}) => {
  const pathname = usePathname()
  const normalizedPathname = pathname || ''
  const isEnglish = normalizedPathname.startsWith('/en')
  const pathWithoutLocale = normalizedPathname.replace(/^\/en(?=\/|$)/, '') || '/'
  const isWebdesignLandingPage = /^\/webdesign\/?$/.test(pathWithoutLocale)
  const isPortfolioWebdesignPage = /^\/portfolio-webdesign\/?$/.test(pathWithoutLocale)
  const isGeoSeoMarketingPage =
    /^\/ki-marketing-geo-seo\/?$/.test(pathWithoutLocale) ||
    /^\/ai-marketing-geo-seo\/?$/.test(pathWithoutLocale)
  const isPortfolioGridPage =
    /^\/portfolio-[^/]+\/?$/.test(pathWithoutLocale) || isGeoSeoMarketingPage
  const isDataLayout = layoutVariant === 'data'
  const isIsometricLayout =
    isPortfolioWebdesignPage ||
    (!isPortfolioGridPage && (layoutVariant === 'visual' || isWebdesignLandingPage))
  const rows = useMemo(
    () =>
      (cases ?? []).filter((item): item is PortfolioCase => Boolean(item?.title && item?.summary)),
    [cases],
  )
  const [activeCaseKey, setActiveCaseKey] = useState<string | null>(null)
  const [isPortalMounted, setIsPortalMounted] = useState(false)
  const [modalDragOffset, setModalDragOffset] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const sliderWrapRef = useRef<HTMLDivElement | null>(null)
  const caseGridRef = useRef<HTMLDivElement | null>(null)
  const isometricScrollerRef = useRef<HTMLDivElement | null>(null)
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
  const mobileIsometricCards = useMemo(() => orderPortfolioEntries(withKeys), [withKeys])
  const isometricCards = useMemo(() => buildIsometricCards(withKeys), [withKeys])

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
  const activeCtaLabel = translateValueForLocale(
    activeCase?.cta?.label?.trim() || 'Case ansehen',
    isEnglish ? 'en' : 'de',
  )
  const activeWebsiteHref = normalizeHref(activeCase?.website?.href) ?? activeCtaHref
  const activeWebsiteLabel = translateValueForLocale(
    activeCase?.website?.label?.trim() || activeCtaLabel,
    isEnglish ? 'en' : 'de',
  )
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
    Boolean(activeMarketingCharts) && (activeCase?.discipline === 'marketing' || isDataLayout)

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
      const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1
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
      const validDrag = (axis === 'down' && deltaY > 0) || (axis === 'up' && deltaY < 0)

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
      const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1

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
    if (isPortfolioGridPage || isIsometricLayout) return

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
  }, [isPortfolioGridPage, isIsometricLayout, withKeys.length])

  useEffect(() => {
    if (isPortfolioGridPage || isIsometricLayout || prefersReducedMotion()) return

    const slider = sliderRef.current
    const wrap = sliderWrapRef.current
    if (!slider || !wrap || withKeys.length < 2) return

    let hasSpun = false

    const runSpin = async () => {
      if (hasSpun) return
      hasSpun = true
      const { gsap } = await loadPortfolioGsap()

      requestAnimationFrame(() => {
        const firstCard = slider.querySelector<HTMLElement>('[data-portfolio-card="true"]')
        const cardWidth = firstCard?.offsetWidth ?? 380
        const gap = 16
        const step = cardWidth + gap
        const spinCards = Math.min(withKeys.length, 3)
        const distance = step * spinCards
        const section = slider.scrollWidth / 3
        const state = { x: slider.scrollLeft }

        isAdjustingLoopRef.current = true

        gsap.to(state, {
          x: state.x + distance,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            slider.scrollLeft = state.x
          },
          onComplete: () => {
            let normalized = slider.scrollLeft
            while (normalized > section * 1.5) normalized -= section
            while (normalized < section * 0.5) normalized += section
            slider.scrollLeft = normalized
            isAdjustingLoopRef.current = false
          },
        })
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void runSpin()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )

    observer.observe(wrap)
    return () => observer.disconnect()
  }, [isPortfolioGridPage, isIsometricLayout, withKeys.length])

  useEffect(() => {
    if (prefersReducedMotion() || (isIsometricLayout && isMobilePortfolioViewport())) return

    const header = headerRef.current
    const caseGrid = caseGridRef.current
    const sliderWrap = sliderWrapRef.current
    const visualWrap = isPortfolioGridPage && !isIsometricLayout ? caseGrid : sliderWrap
    if (!header && !visualWrap) return

    const root = visualWrap ?? header
    if (!root) return

    let context: { revert: () => void } | null = null
    let cancelled = false
    let observer: IntersectionObserver | null = null

    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadPortfolioGsap()
      if (cancelled) return

      context = gsap.context(() => {
        const items = header?.querySelectorAll<HTMLElement>('[data-portfolio-header-item="true"]')

        if (header && items?.length) {
          gsap.fromTo(
            items,
            { y: 46, opacity: 0, filter: 'blur(8px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              stagger: 0.12,
              ease: 'none',
              scrollTrigger: {
                trigger: header,
                start: 'top 92%',
                end: 'top 42%',
                scrub: 0.7,
              },
            },
          )
        }

        if (isPortfolioGridPage && !isIsometricLayout && caseGrid) {
          gsap.fromTo(
            caseGrid,
            { y: 40, opacity: 0, filter: 'blur(10px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: caseGrid,
                start: 'top 105%',
                end: 'top 68%',
                scrub: 1.1,
              },
            },
          )

          gsap.fromTo(
            caseGrid,
            { y: 0, opacity: 1, filter: 'blur(0px)' },
            {
              y: -40,
              opacity: 0,
              filter: 'blur(10px)',
              ease: 'none',
              scrollTrigger: {
                trigger: caseGrid,
                start: 'bottom 48%',
                end: 'bottom 12%',
                scrub: 1.8,
              },
            },
          )
        } else if (sliderWrap && isIsometricLayout) {
          gsap.fromTo(
            sliderWrap,
            { opacity: 0, filter: 'blur(8px)' },
            {
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: sliderWrap,
                start: 'top 96%',
                end: 'top 62%',
                scrub: 1.2,
              },
            },
          )
        } else if (sliderWrap) {
          gsap.fromTo(
            sliderWrap,
            { y: 40, opacity: 0, filter: 'blur(10px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: sliderWrap,
                start: 'center 90%',
                end: 'center 60%',
                scrub: 0.7,
              },
            },
          )

          gsap.fromTo(
            sliderWrap,
            { y: 0, opacity: 1, filter: 'blur(0px)' },
            {
              y: -40,
              opacity: 0,
              filter: 'blur(10px)',
              ease: 'none',
              scrollTrigger: {
                trigger: sliderWrap,
                start: 'center 40%',
                end: 'center 20%',
                scrub: 0.9,
              },
            },
          )
        }
      })

      ScrollTrigger.refresh()
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer?.disconnect()
        observer = null
        void initAnimation()
      },
      { rootMargin: '520px 0px' },
    )
    observer.observe(root)

    return () => {
      cancelled = true
      observer?.disconnect()
      context?.revert()
    }
  }, [rows.length, eyebrow, heading, intro, isPortfolioGridPage, isIsometricLayout])

  if (!rows.length) return null

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
                aria-label={isEnglish ? 'Previous project' : 'Vorheriges Projekt'}
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={openNextCase}
                className="absolute right-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-sm transition hover:bg-background md:right-4"
                aria-label={isEnglish ? 'Next project' : 'Nächstes Projekt'}
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
                    aria-label={isEnglish ? 'Close modal' : 'Modal schließen'}
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
                            {isEnglish ? 'Website Preview' : 'Website-Vorschau'}
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
                        {translateValueForLocale(
                          activeDisciplineMeta.label,
                          isEnglish ? 'en' : 'de',
                        )}
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
                          {translateValueForLocale(
                            categoryMeta[category].label,
                            isEnglish ? 'en' : 'de',
                          )}
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
                          <dt className="font-semibold text-foreground/85">
                            {isEnglish ? 'Approach' : 'Vorgehen'}
                          </dt>
                          <dd className="mt-1 leading-relaxed text-muted-foreground">
                            {activeCase.approach}
                          </dd>
                        </div>
                      ) : null}
                      {activeCase.result ? (
                        <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                          <dt className="font-semibold text-foreground/85">
                            {isEnglish ? 'Result' : 'Ergebnis'}
                          </dt>
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

  const mobileIsometricGrid = isIsometricLayout ? (
    <div className="mt-8 px-4 md:hidden" aria-hidden={Boolean(activeCase)}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {isEnglish ? 'Selected cases' : 'Ausgewählte Cases'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {mobileIsometricCards.length}{' '}
            {isEnglish ? 'mobile-optimized previews' : 'mobile optimierte Vorschauen'}
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 rounded-md px-2.5 py-1 text-xs">
          {isEnglish ? 'Tap to open' : 'Antippen'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {mobileIsometricCards.map(({ item, key }, index) => {
        const discipline = (item.discipline ?? 'webdesign') as Discipline
        const meta = disciplineMeta[discipline] ?? disciplineMeta.webdesign
        const DisciplineIcon = meta.icon
        const coverImage = isMediaObject(item.coverImage) ? item.coverImage : null
        const showcaseCard = getShowcasePortfolioCard(item.title, index)
        const cardMetrics = (item.metrics ?? []).filter(
          (metric) => metric?.value?.trim() && metric?.label?.trim(),
        )
        const isFeatured = index === 0
        const translatedDiscipline = isEnglish ? translateValueForLocale(meta.label, 'en') : meta.label
        const translatedIndustry = item.industry
          ? isEnglish
            ? translateValueForLocale(item.industry, 'en')
            : item.industry
          : null

        return (
          <button
            type="button"
            data-portfolio-card="true"
            key={`mobile-${key}`}
            onClick={() => setActiveCaseKey(key)}
            className={cn(
              'portfolio-case-card group relative min-w-0 overflow-hidden rounded-lg border border-border/70 bg-card text-left shadow-sm outline-none transition duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isFeatured && 'sm:col-span-2',
            )}
            aria-label={`${isEnglish ? 'Open details' : 'Details öffnen'}: ${item.title}`}
            tabIndex={activeCase ? -1 : 0}
          >
            <div
              className={cn(
                'portfolio-case-visual relative overflow-hidden border-b border-border/70 bg-white',
                isFeatured ? 'aspect-[16/10]' : 'aspect-[16/10]',
              )}
            >
              <div className="absolute inset-x-0 top-0 z-[2] flex h-8 items-center gap-1.5 border-b border-black/5 bg-white/86 px-3 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-red-400/80" />
                <span className="size-2 rounded-full bg-amber-400/80" />
                <span className="size-2 rounded-full bg-emerald-400/80" />
                <span className="ml-auto rounded-sm bg-black/[0.06] px-2 py-0.5 text-[10px] font-medium text-black/45">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              {showcaseCard ? (
                <img
                  src={getMobileShowcaseSrc(showcaseCard.src)}
                  alt={showcaseCard.alt}
                  className="h-full w-full object-contain object-center pt-8 transition duration-300 group-hover:scale-[1.01]"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              ) : coverImage ? (
                <Media
                  resource={coverImage}
                  className="h-full w-full overflow-hidden bg-background"
                  imgClassName="h-full w-full object-contain object-center pt-8 transition duration-300 group-hover:scale-[1.01]"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
                  {isEnglish ? 'No cover image' : 'Kein Titelbild'}
                </div>
              )}
            </div>

            <div className="min-w-0 p-4">
              <div className="mb-3 flex min-w-0 items-center justify-between gap-2">
                <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border/70 bg-background px-2 py-1 text-xs font-medium text-muted-foreground">
                  <DisciplineIcon className="size-3.5 shrink-0" />
                  <span className="truncate">{translatedDiscipline}</span>
                </span>
                {item.year ? (
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {item.year}
                  </span>
                ) : null}
              </div>

              <h3 className="min-w-0 text-lg font-semibold leading-tight text-foreground break-words [overflow-wrap:anywhere]">
                {item.title}
              </h3>

              {item.summary ? (
                <p className="mt-2 min-w-0 overflow-hidden text-sm leading-6 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {isEnglish ? translateValueForLocale(item.summary, 'en') : item.summary}
                </p>
              ) : null}

              <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2">
                {translatedIndustry ? (
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                    <Building2 className="size-3.5 shrink-0" />
                    <span className="truncate">{translatedIndustry}</span>
                  </span>
                ) : null}
                {cardMetrics.slice(0, isFeatured ? 2 : 1).map((metric, metricIndex) => (
                  <span
                    key={`${key}-mobile-metric-${metricIndex}`}
                    className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-foreground"
                  >
                    <span className="shrink-0">{metric.value}</span>
                    <span className="truncate text-muted-foreground">{metric.label}</span>
                  </span>
                ))}
              </div>

              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {isEnglish ? 'Open case' : 'Case öffnen'}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        )
      })}
      </div>
    </div>
  ) : null

  const isometricGrid = isIsometricLayout ? (
    <div
      ref={sliderWrapRef}
      className="relative z-0 mt-10 hidden h-[72vh] min-h-[620px] w-full overflow-x-clip overflow-y-visible px-0 pt-6 pb-0 md:mt-14 md:block md:min-h-[660px] md:pt-8 md:pb-0"
      aria-hidden={Boolean(activeCase)}
    >
      <div
        ref={isometricScrollerRef}
        className="relative w-screen overflow-x-clip overflow-y-visible px-0"
      >
        <div
          data-portfolio-isometric-track="true"
          className="w-max min-w-[240rem] pt-44 pb-0 sm:min-w-[320rem] sm:pt-52 sm:pb-0 lg:min-w-[440rem] lg:pt-64 lg:pb-0"
          style={{
            perspective: '1600px',
            transform: 'translate3d(-4350px, 0, 0)',
          }}
        >
          <div
            data-portfolio-isometric-grid="true"
            className="grid grid-flow-col grid-rows-[15rem_15rem_15rem] gap-4 sm:grid-rows-[18rem_18rem_18rem] sm:gap-5 lg:grid-rows-[20rem_20rem_20rem] lg:gap-7 [&>*]:w-[19rem] sm:[&>*]:w-[23rem] lg:[&>*]:w-[26rem]"
            style={{
              transform: 'translate3d(0, 8rem, 0) rotateX(28deg) rotateZ(6deg)',
              transformOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
          >
            {isometricCards.map(({ item, key, renderKey }, index) => {
              const coverImage = isMediaObject(item.coverImage) ? item.coverImage : null
              const showcaseCard = getShowcasePortfolioCard(item.title, index)

              return (
                <button
                  type="button"
                  data-portfolio-card="true"
                  data-portfolio-isometric-row="locked"
                  key={renderKey}
                  onClick={() => setActiveCaseKey(key)}
                  className="group relative block h-full min-w-0 text-left outline-none"
                  style={{
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                  }}
                  aria-label={`${isEnglish ? 'Open details' : 'Details öffnen'}: ${item.title}`}
                  tabIndex={activeCase ? -1 : 0}
                >
                  <span
                    aria-hidden
                    className="absolute inset-1 rounded-xl bg-foreground/12 shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition duration-300 ease-out [transform:translateZ(-1px)_scale(0.95)] group-hover:opacity-60 group-hover:[transform:translateZ(-1px)_scale(1)] sm:inset-2 sm:rounded-2xl"
                  />
                  <article
                    className="relative h-full overflow-visible rounded-xl transition duration-300 ease-out sm:rounded-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center bottom',
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl border border-border/45 bg-muted/45 transition duration-300 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(10px)] sm:rounded-2xl"
                    />
                    <div
                      className="absolute inset-0 overflow-hidden rounded-xl border border-border/70 bg-background shadow-[0_18px_45px_rgba(0,0,0,0.16)] transition duration-300 ease-out [transform:translateZ(24px)] [transform-origin:center_bottom] group-hover:border-primary/35 group-hover:[transform:translateZ(52px)_rotateX(-3deg)] sm:rounded-2xl"
                      style={{
                        transformOrigin: 'center bottom',
                      }}
                    >
                      {showcaseCard ? (
                        <img
                          src={showcasePlaceholder}
                          data-portfolio-showcase-src={getDesktopShowcaseSrc(showcaseCard.src)}
                          alt={showcaseCard.alt}
                          className="h-full w-full bg-white object-contain object-center opacity-100 transition duration-300 ease-out group-hover:scale-[1.01]"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      ) : coverImage ? (
                        <Media
                          resource={coverImage}
                          className="portfolio-case-visual h-full w-full overflow-hidden bg-background"
                          imgClassName="h-full w-full object-contain object-top opacity-100 transition duration-300 ease-out group-hover:scale-[1.01]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted/40 text-xs text-muted-foreground">
                          {isEnglish ? 'No cover image' : 'Kein Titelbild'}
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_38%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%)]" />
                    </div>
                  </article>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <section
      className={cn(
        'relative isolate w-full pt-24 md:pt-32',
        isIsometricLayout ? 'pb-4 md:pb-6' : 'pb-36 md:pb-48',
        isDataLayout && 'portfolio-case-grid--data',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 bottom-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--foreground) 7%, transparent) 22%, color-mix(in srgb, var(--foreground) 7%, transparent) 52%, transparent 78%)',
        }}
      />

      {portfolioModal}

      <div className="container px-0 md:px-0">
        <div ref={headerRef} className="relative z-20 w-full text-center">
          {eyebrow ? (
            <Badge
              variant="secondary"
              data-portfolio-header-item="true"
              className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              <Sparkles className="size-3.5" />
              {eyebrow}
            </Badge>
          ) : null}
          {heading ? (
            <h2
              data-portfolio-header-item="true"
              className="overflow-visible py-1 text-3xl font-semibold leading-[1.16] md:text-4xl md:leading-[1.14]"
            >
              {heading}
            </h2>
          ) : null}
          {intro ? (
            <p
              data-portfolio-header-item="true"
              className="mx-auto mt-4 w-full max-w-2xl text-sm leading-relaxed opacity-85 md:text-base"
            >
              {intro}
            </p>
          ) : null}
        </div>

        {isPortfolioGridPage && !isIsometricLayout ? (
          <div ref={caseGridRef} className="mt-10 md:mt-14" aria-hidden={Boolean(activeCase)}>
            <div className="grid auto-rows-[15.5rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {withKeys.map(({ item, key }, index) => {
                const discipline = (item.discipline ?? 'webdesign') as Discipline
                const meta = disciplineMeta[discipline] ?? disciplineMeta.webdesign
                const DisciplineIcon = meta.icon
                const coverImage = isMediaObject(item.coverImage) ? item.coverImage : null
                const marketingCharts = getMarketingCaseChartData(item.title)
                const cardMetrics = (item.metrics ?? []).filter(
                  (metric) => metric?.value?.trim() && metric?.label?.trim(),
                )
                const useMarketingVisual =
                  Boolean(marketingCharts) && (discipline === 'marketing' || isDataLayout)

                return (
                  <button
                    type="button"
                    data-portfolio-card="true"
                    key={key}
                    onClick={() => setActiveCaseKey(key)}
                    className={cn(
                      'portfolio-case-card group flex h-full flex-col overflow-hidden rounded-3xl border text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_-48px_rgba(0,0,0,0.65)]',
                      index % 9 === 0 && 'sm:col-span-2 sm:row-span-2',
                      index % 9 === 3 && 'lg:row-span-2',
                      index % 9 === 5 && 'lg:col-span-2',
                      useMarketingVisual &&
                        'border-emerald-500/10 bg-gradient-to-b from-emerald-500/[0.015] to-background transition-colors duration-500 hover:border-emerald-500/25 hover:from-emerald-500/[0.04] focus-visible:border-emerald-500/25 focus-visible:from-emerald-500/[0.04]',
                    )}
                    aria-label={`${isEnglish ? 'Open details' : 'Details öffnen'}: ${item.title}`}
                    tabIndex={activeCase ? -1 : 0}
                  >
                    <div className="portfolio-case-visual relative min-h-0 flex-1 overflow-hidden border-b border-border/70 px-3 pt-3 pb-3">
                      {useMarketingVisual && marketingCharts ? (
                        <>
                          <div className="relative z-[1] flex h-full min-h-[210px] items-center transition-all duration-500 ease-out group-hover:scale-[0.98] group-hover:opacity-0">
                            <PortfolioMarketingCardVisual
                              data={marketingCharts}
                              metrics={cardMetrics}
                            />
                          </div>
                          {coverImage ? (
                            <div className="absolute inset-x-3 top-3 bottom-3 z-[2] overflow-hidden rounded-xl bg-background/70 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                              <Media
                                resource={coverImage}
                                className="h-full w-full"
                                imgClassName="h-full w-full object-contain object-center transition-opacity duration-500"
                              />
                            </div>
                          ) : null}
                        </>
                      ) : coverImage ? (
                        <Media
                          resource={coverImage}
                          className="h-full w-full overflow-hidden rounded-xl bg-background/70"
                          imgClassName="h-full w-full object-contain object-center transition-opacity duration-500"
                        />
                      ) : (
                        <div className="flex h-full min-h-[210px] items-center justify-center bg-muted/40 text-sm text-muted-foreground">
                          {isEnglish ? 'No cover image' : 'Kein Titelbild'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2.5 p-3.5">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium">
                        <DisciplineIcon className="size-3.5" />
                        {useMarketingVisual
                          ? isEnglish
                            ? 'Marketing · KPI Focus'
                            : 'Marketing · KPI-Fokus'
                          : `${isEnglish ? 'Project Field' : 'Projektfeld'}: ${
                              isEnglish ? translateValueForLocale(meta.label, 'en') : meta.label
                            }`}
                      </div>

                      <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>

                      {useMarketingVisual ? (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {item.summary}
                        </p>
                      ) : null}

                      {item.industry ? (
                        <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Building2 className="size-3.5" />
                          {isEnglish ? 'Industry' : 'Branche'}:{' '}
                          {isEnglish ? translateValueForLocale(item.industry, 'en') : item.industry}
                        </div>
                      ) : null}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : isIsometricLayout ? (
          mobileIsometricGrid
        ) : (
          <div ref={sliderWrapRef} className="mt-14 md:mt-20">
            <div className="relative -mx-4 px-4" aria-hidden={Boolean(activeCase)}>
              <button
                type="button"
                onClick={() => stepSlider('prev')}
                className="portfolio-slider-control absolute left-6 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition"
                aria-label={isEnglish ? 'Previous slide' : 'Vorheriger Slide'}
                tabIndex={activeCase ? -1 : 0}
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => stepSlider('next')}
                className="portfolio-slider-control absolute right-6 top-1/2 z-20 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition"
                aria-label={isEnglish ? 'Next slide' : 'Nächster Slide'}
                tabIndex={activeCase ? -1 : 0}
              >
                <ChevronRight className="size-4" />
              </button>

              <div
                ref={sliderRef}
                className="overflow-x-auto px-10 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{
                  maskImage:
                    'linear-gradient(to right, transparent 0, black clamp(32px, 6vw, 80px), black calc(100% - clamp(32px, 6vw, 80px)), transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0, black clamp(32px, 6vw, 80px), black calc(100% - clamp(32px, 6vw, 80px)), transparent 100%)',
                }}
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
                      Boolean(marketingCharts) && (discipline === 'marketing' || isDataLayout)

                    return (
                      <button
                        type="button"
                        data-portfolio-card="true"
                        key={`${key}-${loopIndex}`}
                        onClick={() => setActiveCaseKey(key)}
                        className={cn(
                          'portfolio-case-card group w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-3xl border text-left backdrop-blur-sm md:w-[48vw] md:max-w-[460px] lg:w-[33vw] lg:max-w-[390px] xl:w-[30vw] xl:max-w-[380px]',
                          useMarketingVisual &&
                            'border-emerald-500/10 bg-gradient-to-b from-emerald-500/[0.015] to-background transition-colors duration-500 hover:border-emerald-500/25 hover:from-emerald-500/[0.04] focus-visible:border-emerald-500/25 focus-visible:from-emerald-500/[0.04]',
                        )}
                        aria-label={`${isEnglish ? 'Open details' : 'Details öffnen'}: ${item.title}`}
                        tabIndex={activeCase ? -1 : 0}
                      >
                        <div className="portfolio-case-visual relative min-h-[240px] overflow-hidden border-b border-border/70 px-4 pt-4 pb-4">
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
                              {isEnglish ? 'No cover image' : 'Kein Titelbild'}
                            </div>
                          )}
                        </div>

                        <div className="space-y-3 p-4">
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium">
                            <DisciplineIcon className="size-3.5" />
                            {useMarketingVisual
                              ? isEnglish
                                ? 'Marketing · KPI Focus'
                                : 'Marketing · KPI-Fokus'
                              : `${isEnglish ? 'Project Field' : 'Projektfeld'}: ${
                                  isEnglish ? translateValueForLocale(meta.label, 'en') : meta.label
                                }`}
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
                              {isEnglish ? 'Industry' : 'Branche'}:{' '}
                              {isEnglish
                                ? translateValueForLocale(item.industry, 'en')
                                : item.industry}
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
        )}
      </div>
      {isometricGrid}
    </section>
  )
}
