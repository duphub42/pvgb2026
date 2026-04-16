import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer, Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { FooterClient } from '@/Footer/FooterClient'

type FooterProps = {
  locale?: Locale
  footerData?: Footer | null
  headerData?: Header | null
}

export async function Footer({
  locale = 'de',
  footerData: initialFooterData = null,
  headerData: initialHeaderData = null,
}: FooterProps = {}) {
  let footerData: Footer | null = initialFooterData
  let headerData: Header | null = initialHeaderData

  if (!footerData) {
    try {
      // Footer icons can be nested in arrays/groups; use higher depth for media relation URLs.
      footerData = (await getCachedGlobal('footer', 4)()) as Footer
    } catch (err) {
      console.error('[Footer] Failed to load footer global:', err)
    }
  }

  // Load header for logo fallback (use header B-logo if footer has no logo)
  if (!headerData) {
    try {
      headerData = (await getCachedGlobal('header', 1)()) as Header
    } catch (err) {
      console.error('[Footer] Failed to load header global:', err)
    }
  }

  return <FooterClient footer={footerData} header={headerData} locale={locale} />
}
