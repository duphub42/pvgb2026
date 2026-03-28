import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import React from 'react'

import type { MegaMenuItem } from '@/components/MegaMenu'
import type { Header } from '@/payload-types'

export async function Header() {
  let headerData: Header | null = null
  let megaMenuItems: MegaMenuItem[] = []
  try {
    headerData = (await getCachedGlobal('header', 1)()) as Header
    const rawItems =
      (headerData as Header & { useMegaMenu?: boolean })?.useMegaMenu === true
        ? await getMegaMenuItems()
        : []
    megaMenuItems = Array.isArray(rawItems) ? (rawItems as unknown as MegaMenuItem[]) : []
  } catch (err) {
    console.error('[Header] Failed to load header global:', err)
  }
  return (
    <HeaderClient
      data={headerData ?? ({} as Header)}
      megaMenuItems={megaMenuItems}
    />
  )
}
