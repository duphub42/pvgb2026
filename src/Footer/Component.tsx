import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer, Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { FooterClient } from '@/Footer/FooterClient'

export async function Footer({ locale = 'de' }: { locale?: Locale }) {
  let footerData: Footer | null = null
  let headerData: Header | null = null
  try {
    ;[footerData, headerData] = await Promise.all([
      getCachedGlobal('footer', 2)(),
      getCachedGlobal('header', 1)(),
    ])
  } catch (err) {
    console.error('[Footer] Failed to load footer/header globals:', err)
  }

  return (
    <FooterClient
      footer={footerData}
      header={headerData}
      locale={locale}
    />
  )
}
