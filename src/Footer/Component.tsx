import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { FooterClient } from '@/Footer/FooterClient'

type FooterProps = {
  locale?: Locale
  footerData?: Footer | null
}

export async function Footer({ locale = 'de', footerData: initialFooterData = null }: FooterProps = {}) {
  let footerData: Footer | null = initialFooterData

  if (!footerData) {
    try {
      // Footer icons can be nested in arrays/groups; use higher depth for media relation URLs.
      footerData = (await getCachedGlobal('footer', 4)()) as Footer
    } catch (err) {
      console.error('[Footer] Failed to load footer global:', err)
    }
  }

  return (
    <FooterClient
      footer={footerData}
      locale={locale}
    />
  )
}
