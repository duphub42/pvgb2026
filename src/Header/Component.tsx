import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const megaMenuItems =
    (headerData as Header & { useMegaMenu?: boolean })?.useMegaMenu === true
      ? await getMegaMenuItems()
      : []

  return (
    <HeaderClient
      data={headerData}
      megaMenuItems={Array.isArray(megaMenuItems) ? megaMenuItems : []}
    />
  )
}
