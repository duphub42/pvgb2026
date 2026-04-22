'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

import type { Header, Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { resolveHeroImageSrc } from '@/utilities/resolveHeroImageSrc'

import dynamic from 'next/dynamic'
import { Logo } from '@/components/Logo/Logo'
import { LogoWithGlitch } from '@/components/Logo/LogoWithGlitch'
import { HeaderGlassPlate } from '@/components/HeaderGlassPlate/HeaderGlassPlate'
import type { MegaMenuCta, MegaMenuItem } from '@/components/MegaMenu'
import { HeaderNav } from './Nav'

const MegaMenu = dynamic(
  () => import('@/components/MegaMenu').then((m) => ({ default: m.MegaMenu })),
  { loading: () => null },
)

const HEADER_B_LOGO_SRC = '/branding/philippbacher-logo-b-10.svg'

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
  megaMenuItems = [],
  mobileDockPhone = null,
}) => {
  const headerData = data as HeaderWithLegacyFields
  const [resolvedMegaMenuItems, setResolvedMegaMenuItems] = useState<MegaMenuItem[]>(megaMenuItems)
  const [logoMorphReady, setLogoMorphReady] = useState(false)
  const [logoPreviewActive, setLogoPreviewActive] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isPastFold, setIsPastFold] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [revealFromTop, setRevealFromTop] = useState(false)
  const [hideToTop, setHideToTop] = useState(false)
  const logoPreviewTimeoutRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const isPastFoldRef = useRef(false)
  const headerVisibleRef = useRef(true)
  const isScrolledRef = useRef(false)
  const revealFromTopRef = useRef(false)
  const hideToTopRef = useRef(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: globalTheme } = useTheme()
  const pathname = usePathname()
  const shouldUseMegaMenu =
    headerData.useMegaMenu === true ||
    headerData.use_mega_menu === true ||
    resolvedMegaMenuItems.length > 0
  const useMegaMenu = shouldUseMegaMenu && resolvedMegaMenuItems.length > 0
  const logoIntroTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setResolvedMegaMenuItems(megaMenuItems)
  }, [megaMenuItems])

  useEffect(() => {
    if (!shouldUseMegaMenu || resolvedMegaMenuItems.length > 0) return

    let cancelled = false

    const loadMegaMenuItems = async () => {
      try {
        const response = await fetch('/api/mega-menu?limit=50&depth=4&sort=order')
        if (!response.ok) return
        const data = (await response.json()) as { docs?: MegaMenuItem[] }
        if (cancelled) return
        if (Array.isArray(data?.docs) && data.docs.length > 0) {
          setResolvedMegaMenuItems(data.docs)
        }
      } catch {
        // Keep graceful fallback to standard nav when request fails.
      }
    }

    void loadMegaMenuItems()

    return () => {
      cancelled = true
    }
  }, [resolvedMegaMenuItems.length, shouldUseMegaMenu])

  useEffect(() => {
    // Always start with the full site logo, then morph to B-logo after intro playback.
    setLogoMorphReady(false)
    setLogoPreviewActive(true)

    if (logoIntroTimeoutRef.current) {
      window.clearTimeout(logoIntroTimeoutRef.current)
      logoIntroTimeoutRef.current = null
    }

    logoIntroTimeoutRef.current = window.setTimeout(() => {
      setLogoPreviewActive(false)
      setLogoMorphReady(true)
      logoIntroTimeoutRef.current = null
    }, 1900)

    return () => {
      if (logoIntroTimeoutRef.current) {
        window.clearTimeout(logoIntroTimeoutRef.current)
        logoIntroTimeoutRef.current = null
      }
    }
  }, [pathname])

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
    const stickyEnterThresholdPx = 0
    const stickyLeaveThresholdPx = 0
    const minDeltaForTogglePx = 6
    const hideAfterPx = 1
    let rafId: number | null = null

    const applyScroll = () => {
      rafId = null
      const currentScrollY = window.scrollY
      const prevScrollY = lastScrollYRef.current
      const delta = currentScrollY - prevScrollY
      lastScrollYRef.current = currentScrollY
      const scrollingDown = delta > 0
      const scrollingUp = delta < 0
      const absDelta = Math.abs(delta)
      const nextIsScrolled = currentScrollY > 20

      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled
        setIsScrolled(nextIsScrolled)
      }

      // Sticky handling starts at page top instead of over-the-fold.
      const wasPastFold = isPastFoldRef.current
      const nextPastFold = wasPastFold
        ? currentScrollY > stickyLeaveThresholdPx
        : currentScrollY >= stickyEnterThresholdPx

      if (nextPastFold !== wasPastFold) {
        isPastFoldRef.current = nextPastFold
        setIsPastFold(nextPastFold)

        if (!nextPastFold) {
          if (hideToTopRef.current) {
            hideToTopRef.current = false
            setHideToTop(false)
          }
          if (revealFromTopRef.current) {
            revealFromTopRef.current = false
            setRevealFromTop(false)
          }
          if (!headerVisibleRef.current) {
            headerVisibleRef.current = true
            setHeaderVisible(true)
          }
        }
      }

      let nextHeaderVisible = headerVisibleRef.current

      if (nextPastFold) {
        if (scrollingDown && absDelta >= minDeltaForTogglePx && currentScrollY >= hideAfterPx) {
          nextHeaderVisible = false
        } else if (scrollingUp && absDelta >= minDeltaForTogglePx) {
          nextHeaderVisible = true
        }
      } else {
        nextHeaderVisible = true
      }

      if (nextHeaderVisible === headerVisibleRef.current) return

      const wasVisible = headerVisibleRef.current
      headerVisibleRef.current = nextHeaderVisible
      setHeaderVisible(nextHeaderVisible)

      const nextRevealFromTop = !wasVisible && nextHeaderVisible && nextPastFold && scrollingUp
      if (nextRevealFromTop !== revealFromTopRef.current) {
        revealFromTopRef.current = nextRevealFromTop
        setRevealFromTop(nextRevealFromTop)
      }

      const nextHideToTop = wasVisible && !nextHeaderVisible && nextPastFold && scrollingDown
      if (nextHideToTop !== hideToTopRef.current) {
        hideToTopRef.current = nextHideToTop
        setHideToTop(nextHideToTop)
      }
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
  }, [pathname])

  // Resolved theme: page override (headerTheme) or global theme (reaktiv beim Toggle)
  const resolvedTheme = headerTheme ?? globalTheme ?? null

  // Support both logo (camelCase) and logo_id (snake_case from DB)
  const logoData = headerData.logo ?? headerData.logo_id
  const resolvedLogo = logoData && typeof logoData === 'object' ? (logoData as MediaType) : null
  const hasCustomLogo = logoData != null
  const logoUrl = resolvedLogo?.url
    ? resolvedLogo.updatedAt
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

    return null
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

  const renderLogoLink = (disableAnimation?: boolean) => (
    <Link
      href="/"
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
      <MegaMenu
        items={resolvedMegaMenuItems}
        logo={desktopLogoEl}
        mobileLogo={mobileLogoEl}
        columnWidths={columnWidths}
        megaMenuCta={hasCta ? megaMenuCta : undefined}
        highlightCardStyle={highlightCardStyle}
        mobileDockPhone={mobileDockPhone}
      />
    )
  }

  return (
    <>
      <HeaderGlassPlate
        glassActive={isScrolled}
        hideToTop={hideToTop}
        isVisible={headerVisible}
        revealFromTop={revealFromTop}
      />
      <header
        suppressHydrationWarning
        className={cn('site-header z-50 w-full fixed top-0 left-0 right-0')}
        {...(resolvedTheme ? { 'data-theme': resolvedTheme } : {})}
        data-scrolled={isScrolled ? 'true' : undefined}
        data-sticky={isPastFold ? 'true' : undefined}
      >
        <div
          className={cn(
            'header-slide-layer transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.12,0.95,0.22,1)]',
            'header-glass-border',
            revealFromTop && 'header-reveal-from-top',
            hideToTop && 'header-hide-to-top',
            headerVisible || hideToTop
              ? 'translate-y-0 opacity-100 visible'
              : '-translate-y-[115%] opacity-0 pointer-events-none invisible',
          )}
          onAnimationEnd={() => {
            revealFromTopRef.current = false
            hideToTopRef.current = false
            setRevealFromTop(false)
            setHideToTop(false)
          }}
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
