'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

import type { Header, Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'

import dynamic from 'next/dynamic'
import { ChevronDown, Menu, Phone, Search } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { LogoWithGlitch } from '@/components/Logo/LogoWithGlitch'
import { HeaderGlassPlate } from '@/components/HeaderGlassPlate/HeaderGlassPlate'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher'
import type { MegaMenuCta, MegaMenuItem } from '@/components/MegaMenu'
import { HeaderNav } from './Nav'
import { useLocale } from '@/providers/Locale/LocaleContext'
import { localizePathname } from '@/i18n/routing'

const MegaMenu = dynamic(
  () => import('@/components/MegaMenu').then((m) => ({ default: m.MegaMenu })),
  { loading: () => null },
)

const HEADER_B_LOGO_SRC = '/branding/philippbacher-logo-b-10.svg'
const EMPTY_MEGA_MENU_ITEMS: MegaMenuItem[] = []

interface HeaderClientProps {
  data: Header
  megaMenuItems?: MegaMenuItem[]
  mobileDockPhone?: string | null
}

type HeaderWithLegacyFields = Header & {
  use_mega_menu?: boolean | null
  logo_id?: Header['logo']
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  data,
  megaMenuItems = EMPTY_MEGA_MENU_ITEMS,
  mobileDockPhone = null,
}) => {
  const headerData = data as HeaderWithLegacyFields
  const [resolvedMegaMenuItems, setResolvedMegaMenuItems] = useState<MegaMenuItem[]>(megaMenuItems)
  const [logoMorphReady, setLogoMorphReady] = useState(false)
  const [logoPreviewActive, setLogoPreviewActive] = useState(false)
  const logoPreviewTimeoutRef = useRef<number | null>(null)
  const logoIntroTimeoutRef = useRef<number | null>(null)
  const [resolvedMegaMenuLocale, setResolvedMegaMenuLocale] = useState<'de' | 'en'>('de')
  const [megaMenuIsComplete, setMegaMenuIsComplete] = useState(() =>
    megaMenuItems.some(
      (item) =>
        (Array.isArray(item.columns) && item.columns.length > 0) ||
        (Array.isArray(item.subItems) && item.subItems.length > 0) ||
        Boolean(item.highlight),
    ),
  )
  const [isPastFold, setIsPastFold] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [megaMenuHydrated, setMegaMenuHydrated] = useState(false)
  const [openMobileMenuOnHydrate, setOpenMobileMenuOnHydrate] = useState(false)
  const isPastFoldRef = useRef(false)
  const isScrolledRef = useRef(false)
  const isHeaderVisibleRef = useRef(true)
  const lastScrollYRef = useRef(0)
  const megaMenuRequestInFlightRef = useRef(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: globalTheme } = useTheme()
  const locale = useLocale()
  const homeHref = locale === 'en' ? localizePathname('/', 'en') : '/'
  const pathname = usePathname()
  const [hasHydrated, setHasHydrated] = useState(false)
  const effectivePathname = hasHydrated ? (pathname ?? '/') : '/'
  const normalizedPathname = effectivePathname.replace(/\/+$/, '') || '/'
  const isHomePath = normalizedPathname === '/' || normalizedPathname === '/home'
  const shouldUseMegaMenu =
    headerData.useMegaMenu === true ||
    headerData.use_mega_menu === true ||
    resolvedMegaMenuItems.length > 0
  const useMegaMenu = shouldUseMegaMenu && resolvedMegaMenuItems.length > 0

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (locale !== 'de') return
    setResolvedMegaMenuItems(megaMenuItems)
    setResolvedMegaMenuLocale('de')
    setMegaMenuIsComplete(
      megaMenuItems.some(
        (item) =>
          (Array.isArray(item.columns) && item.columns.length > 0) ||
          (Array.isArray(item.subItems) && item.subItems.length > 0) ||
          Boolean(item.highlight),
      ),
    )
  }, [locale, megaMenuItems])

  const loadCompleteMegaMenuItems = useCallback(async () => {
    if (!shouldUseMegaMenu) return
    if (resolvedMegaMenuLocale === locale && megaMenuIsComplete) return
    if (megaMenuRequestInFlightRef.current) return

    megaMenuRequestInFlightRef.current = true
    try {
      if (locale === 'en') {
        setResolvedMegaMenuItems([])
      }
      const response = await fetch(`/api/frontend/mega-menu?locale=${locale}`)
      if (!response.ok) return
      const data = (await response.json()) as { docs?: MegaMenuItem[] }
      if (Array.isArray(data?.docs) && data.docs.length > 0) {
        setResolvedMegaMenuItems(data.docs)
        setResolvedMegaMenuLocale(locale)
        setMegaMenuIsComplete(true)
      }
    } catch {
      // Keep graceful fallback to the light shell when request fails.
    } finally {
      megaMenuRequestInFlightRef.current = false
    }
  }, [locale, megaMenuIsComplete, resolvedMegaMenuLocale, shouldUseMegaMenu])

  useEffect(() => {
    if (!shouldUseMegaMenu) return
    if (resolvedMegaMenuLocale === locale && megaMenuIsComplete) return

    const idleCallback =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : null
    let idleId: number | null = null
    let timeoutId: number | null = null

    if (idleCallback) {
      idleId = idleCallback(() => {
        void loadCompleteMegaMenuItems()
      }, { timeout: 4500 })
    } else {
      timeoutId = window.setTimeout(() => {
        void loadCompleteMegaMenuItems()
      }, 3000)
    }

    return () => {
      if (
        idleId != null &&
        typeof window !== 'undefined' &&
        'cancelIdleCallback' in window
      ) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [
    loadCompleteMegaMenuItems,
    locale,
    megaMenuIsComplete,
    resolvedMegaMenuLocale,
    shouldUseMegaMenu,
  ])

  useEffect(() => {
    if (isHomePath) {
      setLogoPreviewActive(false)
      setLogoMorphReady(true)
      return
    }

    // Sub pages start directly in the compact, stable logo state. This avoids the
    // full logo and compact B-logo appearing as two separate rows while the header hydrates.
    setLogoPreviewActive(false)
    setLogoMorphReady(true)

    if (logoIntroTimeoutRef.current) {
      window.clearTimeout(logoIntroTimeoutRef.current)
      logoIntroTimeoutRef.current = null
    }

    return () => {
      if (logoIntroTimeoutRef.current) {
        window.clearTimeout(logoIntroTimeoutRef.current)
        logoIntroTimeoutRef.current = null
      }
    }
  }, [effectivePathname, isHomePath])

  useEffect(() => {
    return () => {
      if (logoIntroTimeoutRef.current) {
        window.clearTimeout(logoIntroTimeoutRef.current)
        logoIntroTimeoutRef.current = null
      }
      if (logoPreviewTimeoutRef.current) {
        window.clearTimeout(logoPreviewTimeoutRef.current)
        logoPreviewTimeoutRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const stickyEnterThresholdPx = 24
    const stickyLeaveThresholdPx = 8
    const topShowThresholdPx = 24
    const hideAfterPx = 120
    const scrollDeltaThresholdPx = 10
    let rafId: number | null = null

    const applyScroll = () => {
      rafId = null
      const currentScrollY = window.scrollY
      const nextIsScrolled = currentScrollY > 20
      const delta = currentScrollY - lastScrollYRef.current
      const scrollingDown = delta > scrollDeltaThresholdPx
      const scrollingUp = delta < -scrollDeltaThresholdPx
      let nextIsHeaderVisible = isHeaderVisibleRef.current

      if (currentScrollY <= topShowThresholdPx) {
        nextIsHeaderVisible = true
      } else if (scrollingDown && currentScrollY > hideAfterPx) {
        nextIsHeaderVisible = false
      } else if (scrollingUp) {
        nextIsHeaderVisible = true
      }

      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled
        setIsScrolled(nextIsScrolled)
      }

      if (nextIsHeaderVisible !== isHeaderVisibleRef.current) {
        isHeaderVisibleRef.current = nextIsHeaderVisible
        setIsHeaderVisible(nextIsHeaderVisible)
      }

      // Sticky handling starts at page top instead of over-the-fold.
      const wasPastFold = isPastFoldRef.current
      const nextPastFold = wasPastFold
        ? currentScrollY > stickyLeaveThresholdPx
        : currentScrollY >= stickyEnterThresholdPx

      if (nextPastFold !== wasPastFold) {
        isPastFoldRef.current = nextPastFold
        setIsPastFold(nextPastFold)
      }

      lastScrollYRef.current = currentScrollY
    }

    const handleScroll = () => {
      if (rafId != null) return
      rafId = window.requestAnimationFrame(applyScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    applyScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId != null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectivePathname])

  // Resolved theme: page override (headerTheme) or global theme (reaktiv beim Toggle)
  const resolvedTheme = headerTheme ?? globalTheme ?? null

  // Support both logo (camelCase) and logo_id (snake_case from DB)
  const logoData = headerData.logo ?? headerData.logo_id
  const resolvedLogo = logoData && typeof logoData === 'object' ? (logoData as MediaType) : null
  const hasCustomLogo = logoData != null
  const resolvedLogoIsSvg =
    resolvedLogo != null &&
    (String(resolvedLogo.mimeType ?? '').toLowerCase().includes('svg') ||
      String(resolvedLogo.filename ?? '').toLowerCase().endsWith('.svg') ||
      String(resolvedLogo.url ?? '').toLowerCase().endsWith('.svg'))
  const resolvedLogoFileUrl =
    resolvedLogo?.filename != null && resolvedLogo.filename !== ''
      ? `/api/media/file/${encodeURIComponent(resolvedLogo.filename)}`
      : null
  const logoUrl = resolvedLogo?.url
    ? resolvedLogoIsSvg && resolvedLogoFileUrl
      ? resolvedLogoFileUrl
      : resolvedLogo.updatedAt
      ? getMediaUrl(resolvedLogo.url, resolvedLogo.updatedAt)
      : getMediaUrl(resolvedLogo.url)
    : (resolveHeroImageSrc(logoData) ?? '')

  const renderPrimaryLogo = (disableAnimation?: boolean) => {
    if (hasCustomLogo && logoUrl) {
      return (
        <LogoWithGlitch imgSrc={logoUrl} variant="header" disableAnimation={disableAnimation}>
          <Logo
            loading="eager"
            priority="high"
            logo={logoData ?? null}
            variant="header"
            disableAnimation={disableAnimation}
          />
        </LogoWithGlitch>
      )
    }

    // No custom logo configured in Payload: fall back to the compact B icon
    // everywhere (there's nothing to morph from).
    return (
      <Image
        src={HEADER_B_LOGO_SRC}
        alt=""
        aria-hidden="true"
        className="header-b-logo logo-contrast"
        width={40}
        height={42}
        priority
        unoptimized
      />
    )
  }

  const renderStickyLogo = () => (
    <Image
      src={HEADER_B_LOGO_SRC}
      alt=""
      aria-hidden="true"
      className="header-b-logo logo-contrast"
      width={40}
      height={42}
      priority
      unoptimized
    />
  )

  const handleLogoMouseEnter = () => {
    if (!logoMorphReady) return

    if (logoPreviewTimeoutRef.current) {
      window.clearTimeout(logoPreviewTimeoutRef.current)
      logoPreviewTimeoutRef.current = null
    }

    setLogoPreviewActive(true)
  }

  const handleLogoMouseLeave = () => {
    if (logoPreviewTimeoutRef.current) {
      window.clearTimeout(logoPreviewTimeoutRef.current)
      logoPreviewTimeoutRef.current = null
    }

    logoPreviewTimeoutRef.current = window.setTimeout(() => {
      setLogoPreviewActive(false)
      logoPreviewTimeoutRef.current = null
    }, 600)
  }

  const renderLogoLink = (disableAnimation?: boolean) =>
    !hasCustomLogo || !logoUrl ? (
      <Link
        href={homeHref}
        aria-label="Zur Startseite"
        className="logo-link relative flex items-center shrink-0"
      >
        {renderPrimaryLogo(disableAnimation)}
      </Link>
    ) : (
      <Link
        href={homeHref}
        aria-label={isHomePath ? 'Zur Startseite' : undefined}
        className="logo-link relative flex items-center shrink-0"
        data-logo-morph-ready={logoMorphReady ? 'true' : 'false'}
        data-logo-preview-active={logoPreviewActive ? 'true' : 'false'}
        onMouseEnter={handleLogoMouseEnter}
        onMouseLeave={handleLogoMouseLeave}
      >
        <span className="header-logo-slot header-logo-slot--default">
          {renderPrimaryLogo(disableAnimation)}
        </span>
        <span className="header-logo-slot header-logo-slot--sticky" aria-hidden="true">
          {renderStickyLogo()}
        </span>
      </Link>
    )

  const desktopLogoEl = renderLogoLink()
  const mobileLogoEl = renderPrimaryLogo(true)

  const handleMegaMenuHydrated = useCallback(() => {
    setMegaMenuHydrated(true)
  }, [])

  const renderMegaMenuShell = () => {
    const visibleItems = resolvedMegaMenuItems.slice(0, 6)
    const contactHref = localizePathname('/kontakt', locale)
    const searchHref = localizePathname('/search', locale)

    return (
      <div
        onFocusCapture={() => void loadCompleteMegaMenuItems()}
        onPointerDownCapture={() => void loadCompleteMegaMenuItems()}
        onPointerEnter={() => void loadCompleteMegaMenuItems()}
        onTouchStartCapture={() => void loadCompleteMegaMenuItems()}
      >
        <HeaderGlassPlate
          glassActive={false}
          hideToTop={!isHeaderVisible && isScrolled}
          isVisible={isHeaderVisible}
          revealFromTop={isHeaderVisible && isScrolled}
        />
        <header
          suppressHydrationWarning
          className="megamenu z-50 w-full"
          data-scrolled={isScrolled ? 'true' : undefined}
          data-sticky={isPastFold ? 'true' : undefined}
          data-header-visible={isHeaderVisible ? undefined : 'false'}
          data-header-shell="true"
          {...(resolvedTheme ? { 'data-theme': resolvedTheme } : {})}
        >
          <div
            className={cn(
              'header-slide-layer transition-[transform,opacity] duration-[1500ms] ease-[cubic-bezier(0.16,1,0.28,1)]',
              'header-glass-border',
              isHeaderVisible
                ? 'opacity-100 visible'
                : 'opacity-100 visible pointer-events-none',
            )}
          >
            <div className="container flex h-24 flex-col px-4 pt-9 pb-2">
              <div className="header-main-row flex flex-1 items-stretch justify-between">
                <Link
                  href={homeHref}
                  aria-label="Zur Startseite"
                  className="logo-link relative flex shrink-0 items-center"
                >
                  <span className="hidden items-center lg:inline-flex">
                    {renderPrimaryLogo(true)}
                  </span>
                  <Image
                    src={HEADER_B_LOGO_SRC}
                    alt=""
                    aria-hidden="true"
                    className="header-b-logo logo-contrast lg:hidden"
                    width={40}
                    height={42}
                    priority
                    unoptimized
                  />
                </Link>
                <div className="flex h-full items-stretch gap-4">
                  <nav
                    className="megamenu-nav flex h-full flex-initial lg:ml-auto max-lg:hidden"
                    aria-label="Hauptnavigation"
                  >
                    <div className="megamenu-nav-list-wrap relative flex h-full flex-1 justify-end">
                      <div className="megamenu-nav-list h-full justify-end">
                        {visibleItems.map((item, index) => (
                          <Link
                            key={`${item.url}-${item.label}-${index}`}
                            href={localizePathname(item.url || '/', locale)}
                            className="megamenu-top-item inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {item.label}
                            {item.hasDropdown && (
                              <ChevronDown
                                className="relative top-[1px] ml-1 h-4 w-4"
                                aria-hidden="true"
                              />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                  <div className="hidden items-center gap-0 lg:flex">
                    <LanguageSwitcher variant="icon-menu" />
                    <ThemeSwitcher />
                    <Link
                      href={contactHref}
                      className="header-tool-toggle header-icon-btn inline-flex shrink-0 items-center justify-center text-current"
                      aria-label="Kontakt öffnen"
                    >
                      <Phone className="h-5 w-5" aria-hidden />
                    </Link>
                    <Link
                      href={searchHref}
                      className="header-tool-toggle header-icon-btn inline-flex shrink-0 items-center justify-center text-current"
                      aria-label="Suchen"
                    >
                      <Search className="h-5 w-5" aria-hidden />
                    </Link>
                  </div>
                  <div className="flex shrink-0 items-center lg:hidden">
                    <button
                      type="button"
                      className="mobile-megamenu-trigger-btn inline-flex h-12 w-12 min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-md outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      aria-label="Menü öffnen"
                      aria-expanded={false}
                      onClick={() => {
                        setOpenMobileMenuOnHydrate(true)
                        void loadCompleteMegaMenuItems()
                      }}
                    >
                      <Menu className="h-7 w-7" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }

  if (useMegaMenu) {
    const layout = data?.megaMenuLayout
    const columnWidths =
      layout != null
        ? {
            sidebar: layout.sidebarCols,
            content: layout.contentCols,
            featured: layout.featuredCols,
          }
        : undefined
    const d = data as Header & {
      megaMenuShowWhatsApp?: boolean
      megaMenuWhatsAppLabel?: string | null
      megaMenuWhatsAppUrl?: string | null
      megaMenuShowCallback?: boolean
      megaMenuCallbackTitle?: string | null
      megaMenuCallbackPlaceholder?: string | null
      megaMenuCallbackButtonText?: string | null
      megaMenuCallbackForm?: number | { id: number } | null
      megaMenuCallbackPhoneFieldName?: string | null
      megaMenuShowNewsletter?: boolean
      megaMenuNewsletterTitle?: string | null
      megaMenuNewsletterPlaceholder?: string | null
      megaMenuNewsletterButtonText?: string | null
      megaMenuNewsletterForm?: number | { id: number } | null
      megaMenuNewsletterEmailFieldName?: string | null
      megaMenuCardBorderRadius?: string | null
      megaMenuCardShadow?: string | null
      megaMenuCardHoverShadow?: string | null
      megaMenuCardHoverBorder?: string | null
    }
    const callbackFormId =
      typeof d?.megaMenuCallbackForm === 'object' &&
      d?.megaMenuCallbackForm != null &&
      'id' in d.megaMenuCallbackForm
        ? d.megaMenuCallbackForm.id
        : typeof d?.megaMenuCallbackForm === 'number'
          ? d.megaMenuCallbackForm
          : null
    const newsletterFormId =
      typeof d?.megaMenuNewsletterForm === 'object' &&
      d?.megaMenuNewsletterForm != null &&
      'id' in d.megaMenuNewsletterForm
        ? d.megaMenuNewsletterForm.id
        : typeof d?.megaMenuNewsletterForm === 'number'
          ? d.megaMenuNewsletterForm
          : null
    const megaMenuCta: MegaMenuCta = {}
    if (d?.megaMenuShowWhatsApp && d?.megaMenuWhatsAppUrl) {
      megaMenuCta.whatsapp = {
        label: d.megaMenuWhatsAppLabel ?? 'WhatsApp',
        url: d.megaMenuWhatsAppUrl,
      }
    }
    if (d?.megaMenuShowCallback && callbackFormId != null) {
      megaMenuCta.callback = {
        title: d.megaMenuCallbackTitle ?? 'Rückruf anfordern',
        placeholder: d.megaMenuCallbackPlaceholder ?? 'Ihre Telefonnummer',
        buttonText: d.megaMenuCallbackButtonText ?? 'Anfragen',
        formId: callbackFormId,
        phoneFieldName: d.megaMenuCallbackPhoneFieldName ?? 'phone',
      }
    }
    if (d?.megaMenuShowNewsletter && newsletterFormId != null) {
      megaMenuCta.newsletter = {
        title: d.megaMenuNewsletterTitle ?? 'Newsletter',
        placeholder: d.megaMenuNewsletterPlaceholder ?? 'E-Mail-Adresse',
        buttonText: d.megaMenuNewsletterButtonText ?? 'Anmelden',
        formId: newsletterFormId,
        emailFieldName: d.megaMenuNewsletterEmailFieldName ?? 'email',
      }
    }
    const hasCta = Object.keys(megaMenuCta).length > 0
    const highlightCardStyle = {
      borderRadius: d?.megaMenuCardBorderRadius ?? 'rounded-lg',
      shadow: d?.megaMenuCardShadow ?? 'shadow-sm',
      hoverShadow: d?.megaMenuCardHoverShadow ?? 'hover:shadow-md',
      hoverBorder: d?.megaMenuCardHoverBorder ?? 'hover:border-primary/40',
    }
    return (
      <>
        {!megaMenuHydrated && renderMegaMenuShell()}
        <MegaMenu
          items={resolvedMegaMenuItems}
          logo={desktopLogoEl}
          mobileLogo={mobileLogoEl}
          className={megaMenuHydrated ? '' : 'hidden pointer-events-none'}
          onHydrated={handleMegaMenuHydrated}
          onRequestFullData={loadCompleteMegaMenuItems}
          openMobileMenuOnMount={openMobileMenuOnHydrate}
          locale={locale}
          columnWidths={columnWidths}
          megaMenuCta={hasCta ? megaMenuCta : undefined}
          highlightCardStyle={highlightCardStyle}
          mobileDockPhone={mobileDockPhone}
        />
      </>
    )
  }

  return (
    <>
      <HeaderGlassPlate
        glassActive={false}
        hideToTop={!isHeaderVisible && isScrolled}
        isVisible={isHeaderVisible}
        revealFromTop={isHeaderVisible && isScrolled}
      />
      <header
        suppressHydrationWarning
        className={cn('site-header z-50 w-full fixed top-0 left-0 right-0')}
        {...(resolvedTheme ? { 'data-theme': resolvedTheme } : {})}
        data-scrolled={isScrolled ? 'true' : undefined}
        data-sticky={isPastFold ? 'true' : undefined}
        data-header-visible={isHeaderVisible ? undefined : 'false'}
      >
        <div
          className={cn(
            'header-slide-layer transition-[transform,opacity] duration-[1500ms] ease-[cubic-bezier(0.16,1,0.28,1)]',
            'header-glass-border',
            isHeaderVisible
              ? 'opacity-100 visible'
              : 'opacity-100 visible pointer-events-none',
          )}
        >
          <div className="container flex h-24 flex-col px-4 pt-9 pb-2">
            <div className="header-main-row flex flex-1 items-stretch justify-between">
              {desktopLogoEl}
              <HeaderNav data={data} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
