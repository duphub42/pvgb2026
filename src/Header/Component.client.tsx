'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { Logo } from '@/components/Logo/Logo'
import { LogoWithGlitch } from '@/components/Logo/LogoWithGlitch'
import { HeaderGlassPlate } from '@/components/HeaderGlassPlate/HeaderGlassPlate'
import { MegaMenu, type MegaMenuCta, type MegaMenuItem } from '@/components/MegaMenu'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  megaMenuItems?: MegaMenuItem[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, megaMenuItems = [] }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isPastFold, setIsPastFold] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [revealFromTop, setRevealFromTop] = useState(false)
  const [hideToTop, setHideToTop] = useState(false)
  const lastScrollYRef = useRef(0)
  const isPastFoldRef = useRef(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: globalTheme } = useTheme()
  const pathname = usePathname()
  const useMegaMenu = (data as Header & { useMegaMenu?: boolean })?.useMegaMenu === true && megaMenuItems.length > 0

  useEffect(() => {
    const stickyEnterThresholdPx = 12
    const stickyLeaveThresholdPx = 0
    const minDeltaForTogglePx = 6

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const prevScrollY = lastScrollYRef.current
      const delta = currentScrollY - prevScrollY
      lastScrollYRef.current = currentScrollY
      const scrollingDown = delta > 0
      const scrollingUp = delta < 0
      const absDelta = Math.abs(delta)

      setIsScrolled(currentScrollY > 20)

      // Sticky handling starts at page top instead of over-the-fold.

      const wasPastFold = isPastFoldRef.current
      const nextPastFold = wasPastFold
        ? currentScrollY > stickyLeaveThresholdPx
        : currentScrollY >= stickyEnterThresholdPx

      if (nextPastFold !== wasPastFold) {
        if (wasPastFold && !nextPastFold) {
          setHideToTop(false)
          setRevealFromTop(false)
          setHeaderVisible(true)
        }
        isPastFoldRef.current = nextPastFold
        setIsPastFold(nextPastFold)
      }

      setHeaderVisible((prev) => {
        let next = prev
        const hideAfterPx = Math.max(stickyEnterThresholdPx + 48, 180)

        if (!nextPastFold) {
          if (wasPastFold && !nextPastFold) {
            setHideToTop(false)
            setRevealFromTop(false)
          }
          next = true
        } else {
          if (scrollingDown && absDelta >= minDeltaForTogglePx && currentScrollY >= hideAfterPx) {
            next = false
          } else if (scrollingUp && absDelta >= minDeltaForTogglePx) {
            next = true
          }
        }

        if (prev === next) return prev

        setRevealFromTop(prev === false && next === true && nextPastFold && scrollingUp)
        setHideToTop(prev === true && next === false && nextPastFold && scrollingDown)

        return next
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Resolved theme: page override (headerTheme) or global theme (reaktiv beim Toggle)
  const resolvedTheme = headerTheme ?? globalTheme ?? null

  const logo = data?.logo
  const hasCustomLogo =
    logo && typeof logo === 'object' && 'url' in logo && (logo as { url?: string }).url
  const logoUrl =
    hasCustomLogo && typeof logo === 'object' && logo !== null && 'url' in logo
      ? getMediaUrl((logo as { url: string }).url, (logo as { updatedAt?: string }).updatedAt)
      : null

  const logoEl = (
    <Link href="/" className="logo-link flex items-center shrink-0">
      {hasCustomLogo && logoUrl ? (
        <LogoWithGlitch imgSrc={logoUrl} variant="header">
          <Logo
            loading="eager"
            priority="high"
            logo={data?.logo}
            variant="header"
          />
        </LogoWithGlitch>
      ) : (
        <LogoWithGlitch textLogo="Philipp Bacher" variant="header" />
      )}
    </Link>
  )

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
    const callbackFormId = typeof d?.megaMenuCallbackForm === 'object' && d?.megaMenuCallbackForm != null && 'id' in d.megaMenuCallbackForm
      ? d.megaMenuCallbackForm.id
      : typeof d?.megaMenuCallbackForm === 'number' ? d.megaMenuCallbackForm : null
    const newsletterFormId = typeof d?.megaMenuNewsletterForm === 'object' && d?.megaMenuNewsletterForm != null && 'id' in d.megaMenuNewsletterForm
      ? d.megaMenuNewsletterForm.id
      : typeof d?.megaMenuNewsletterForm === 'number' ? d.megaMenuNewsletterForm : null
    const megaMenuCta: MegaMenuCta = {}
    if (d?.megaMenuShowWhatsApp && d?.megaMenuWhatsAppUrl) {
      megaMenuCta.whatsapp = { label: d.megaMenuWhatsAppLabel ?? 'WhatsApp', url: d.megaMenuWhatsAppUrl }
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
        items={megaMenuItems}
        logo={logoEl}
        columnWidths={columnWidths}
        megaMenuCta={hasCta ? megaMenuCta : undefined}
        highlightCardStyle={highlightCardStyle}
      />
    )
  }

  return (
    <>
      <HeaderGlassPlate
        glassActive={isPastFold || isScrolled}
        hideToTop={hideToTop}
        isVisible={headerVisible}
        revealFromTop={revealFromTop}
      />
    <header
      className={cn('site-header z-50 w-full fixed top-0 left-0 right-0')}
      {...(resolvedTheme ? { 'data-theme': resolvedTheme } : {})}
      data-scrolled={isScrolled ? 'true' : undefined}
      data-sticky={isPastFold ? 'true' : undefined}
    >
      <div
        className={cn(
          'header-slide-layer transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.12,0.95,0.22,1)]',
          (isPastFold || isScrolled) && 'header-glass-border',
          revealFromTop && 'header-reveal-from-top',
          hideToTop && 'header-hide-to-top',
          headerVisible || hideToTop
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-[115%] opacity-0 pointer-events-none invisible',
        )}
        onAnimationEnd={() => {
          setRevealFromTop(false)
          setHideToTop(false)
        }}
      >
        <div className="container flex h-24 flex-col px-4 pt-9 pb-2">
          <div className="flex flex-1 items-center justify-between">
            {logoEl}
            <HeaderNav data={data} />
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
