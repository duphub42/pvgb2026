import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer, Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { FooterClient } from '@/Footer/FooterClient'

function debugFooterLog(message: string, data: Record<string, unknown>) {
  // #region agent log
  fetch('http://127.0.0.1:7646/ingest/6544e770-4473-4618-987d-1af9330a68c0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3b44f6'},body:JSON.stringify({sessionId:'3b44f6',runId:'db-missing-table',hypothesisId:'H2',location:'src/Footer/Component.tsx:catch',message,data,timestamp:Date.now()})}).catch(()=>{})
  // #endregion
}

export async function Footer({ locale = 'de' }: { locale?: Locale }) {
  let footerData: Footer | null = null
  let headerData: Header | null = null
  try {
    ;[footerData, headerData] = await Promise.all([
      // Footer icons can be nested in arrays/groups; use higher depth for media relation URLs.
      getCachedGlobal('footer', 4)(),
      getCachedGlobal('header', 1)(),
    ])
  } catch (err) {
    debugFooterLog('Footer/Header globals fetch failed', {
      error: err instanceof Error ? err.message : String(err),
    })
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
