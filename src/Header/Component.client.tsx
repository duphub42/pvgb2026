'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { MegaMenu, type MegaMenuCta, type MegaMenuItem } from '@/components/MegaMenu'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  megaMenuItems?: MegaMenuItem[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, megaMenuItems = [] }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { theme: globalTheme } = useTheme()
  const pathname = usePathname()
  const useMegaMenu = (data as Header & { useMegaMenu?: boolean })?.useMegaMenu === true && megaMenuItems.length > 0

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

  const logoEl = (
    <Link href="/" className="logo-link flex items-center shrink-0">
      <Logo
        loading="eager"
        priority="high"
        logo={data?.logo}
        darkBackground={false}
      />
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
    <header
      className="site-header sticky top-0 z-50 w-full"
      {...(resolvedTheme ? { 'data-theme': resolvedTheme } : {})}
    >
      <div className="container flex h-24 items-center justify-between px-4">
        {logoEl}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
