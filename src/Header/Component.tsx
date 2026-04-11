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

export async function Header({ headerData: initialHeaderData = null, footerData: initialFooterData = null }: HeaderProps = {}) {
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

  if (footerResult.status === 'fulfilled') {
    footerData = footerResult.value as Footer
    const footerPhone =
      typeof footerData?.footerPhone === 'string' ? footerData.footerPhone.trim() : ''
    mobileDockPhone = footerPhone || null
  } else {
    console.error('[Header] Failed to load footer global:', footerResult.reason)
  }

  try {
    if ((headerData as Header & { useMegaMenu?: boolean })?.useMegaMenu === true) {
      const rawItems = await getMegaMenuItems()
      megaMenuItems = Array.isArray(rawItems) ? (rawItems as unknown as MegaMenuItem[]) : []
    }
  } catch (err) {
    console.error('[Header] Failed to load mega-menu items:', err)
  }

  return (
    <HeaderClient
      data={headerData ?? ({} as Header)}
      megaMenuItems={megaMenuItems}
      mobileDockPhone={mobileDockPhone}
    />
  )
}
