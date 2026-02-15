import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import React from 'react'

import type { MegaMenuItem } from '@/components/MegaMenu'
import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const rawItems =
    (headerData as Header & { useMegaMenu?: boolean })?.useMegaMenu === true
      ? await getMegaMenuItems()
      : []
  const megaMenuItems: MegaMenuItem[] = Array.isArray(rawItems) ? (rawItems as unknown as MegaMenuItem[]) : []

  return (
    <HeaderClient
      data={headerData}
      megaMenuItems={megaMenuItems}
    />
  )
}
