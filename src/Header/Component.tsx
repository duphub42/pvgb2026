import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import React from 'react'

import type { MegaMenuItem } from '@/components/MegaMenu'
import type { Footer, Header } from '@/payload-types'

type HeaderProps = {
  headerData?: Header | null
  footerData?: Footer | null
}

type HeaderWithLegacyFields = Header & {
  use_mega_menu?: boolean | null
}

export async function Header({
  headerData: initialHeaderData = null,
  footerData: initialFooterData = null,
}: HeaderProps = {}) {
  let headerData: Header | null = initialHeaderData
  let footerData: Footer | null = initialFooterData
  let megaMenuItems: MegaMenuItem[] = []
  let mobileDockPhone: string | null = null

  const [headerResult, footerResult] = await Promise.allSettled([
    headerData ? Promise.resolve(headerData) : getCachedGlobal('header', 1)(),
    footerData ? Promise.resolve(footerData) : getCachedGlobal('footer', 0)(),
  ])

  if (headerResult.status === 'fulfilled') {
    headerData = headerResult.value as Header
  } else {
    console.error('[Header] Failed to load header global:', headerResult.reason)
  }

  const resolvedHeaderData = headerData as HeaderWithLegacyFields | null
  const shouldLoadMegaMenu =
    resolvedHeaderData?.useMegaMenu === true || resolvedHeaderData?.use_mega_menu === true

  if (shouldLoadMegaMenu) {
    try {
      const items = await getMegaMenuItems()
      if (Array.isArray(items) && items.length > 0) {
        megaMenuItems = items as MegaMenuItem[]
      }
    } catch (err) {
      console.error('[Header] Failed to load mega menu items:', err)
    }
  }

  if (footerResult.status === 'fulfilled') {
    footerData = footerResult.value as Footer
    const footerPhone =
      typeof footerData?.footerPhone === 'string' ? footerData.footerPhone.trim() : ''
    mobileDockPhone = footerPhone || null
  } else {
    console.error('[Header] Failed to load footer global:', footerResult.reason)
  }

  return (
    <HeaderClient
      data={headerData ?? ({} as Header)}
      megaMenuItems={megaMenuItems}
      mobileDockPhone={mobileDockPhone}
    />
  )
}
