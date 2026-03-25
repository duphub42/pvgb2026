import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMegaMenuItems } from '@/utilities/getMegaMenu'
import React from 'react'

import type { MegaMenuItem } from '@/components/MegaMenu'
import type { Header } from '@/payload-types'

function debugHeaderLog(message: string, data: Record<string, unknown>) {
  // #region agent log
  fetch('http://127.0.0.1:7646/ingest/6544e770-4473-4618-987d-1af9330a68c0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3b44f6'},body:JSON.stringify({sessionId:'3b44f6',runId:'db-missing-table',hypothesisId:'H2',location:'src/Header/Component.tsx:catch',message,data,timestamp:Date.now()})}).catch(()=>{})
  // #endregion
}

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
    debugHeaderLog('Header global fetch failed', {
      error: err instanceof Error ? err.message : String(err),
    })
    console.error('[Header] Failed to load header global:', err)
  }
  return (
    <HeaderClient
      data={headerData ?? ({} as Header)}
      megaMenuItems={megaMenuItems}
    />
  )
}
