import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import React from 'react'

import type { Footer, Header } from '@/payload-types'
import type { MegaMenuItem } from '@/components/MegaMenu'

type HeaderProps = {
  headerData?: Header | null
  footerData?: Footer | null
}

export async function Header({
  headerData: initialHeaderData = null,
  footerData: initialFooterData = null,
}: HeaderProps = {}) {
  let headerData: Header | null = initialHeaderData
  let footerData: Footer | null = initialFooterData
  let mobileDockPhone: string | null = null
  let megaMenuItems: MegaMenuItem[] = []

  const [headerResult, footerResult, megaMenuResult] = await Promise.allSettled([
    headerData ? Promise.resolve(headerData) : getCachedGlobal('header', 1)(),
    footerData ? Promise.resolve(footerData) : getCachedGlobal('footer', 0)(),
    getMegaMenuItems(),
  ])

  if (headerResult.status === 'fulfilled') {
    headerData = headerResult.value as Header
  } else {
    console.error('[Header] Failed to load header global:', headerResult.reason)
  }

  if (footerResult.status === 'fulfilled') {
    footerData = footerResult.value as Footer
    const footerPhone =
      typeof footerData?.footerPhone === 'string' ? footerData.footerPhone.trim() : ''
    mobileDockPhone = footerPhone || null
  } else {
    console.error('[Header] Failed to load footer global:', footerResult.reason)
  }

  if (megaMenuResult.status === 'fulfilled' && Array.isArray(megaMenuResult.value)) {
    megaMenuItems = megaMenuResult.value as MegaMenuItem[]
  } else if (megaMenuResult.status === 'rejected') {
    console.error('[Header] Failed to load mega menu items:', megaMenuResult.reason)
  }

  return (
    <HeaderClient
      data={headerData ?? ({} as Header)}
      megaMenuItems={megaMenuItems}
      mobileDockPhone={mobileDockPhone}
    />
  )
}
