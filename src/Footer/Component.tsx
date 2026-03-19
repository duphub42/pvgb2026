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
      // Footer icons can be nested in arrays/groups; use higher depth for media relation URLs.
      getCachedGlobal('footer', 4)(),
      getCachedGlobal('header', 1)(),
    ])
    const f = (footerData ?? {}) as Record<string, unknown>
    const socialLinks = Array.isArray(f.socialLinks) ? (f.socialLinks as Array<Record<string, unknown>>) : []
    const columns = Array.isArray(f.columns) ? (f.columns as Array<Record<string, unknown>>) : []
    let socialWithUrl = 0
    let socialNumeric = 0
    let columnWithUrl = 0
    let columnNumeric = 0
    const columnUrlSamples: string[] = []
    const socialPlatforms: string[] = []
    for (const s of socialLinks) {
      const iconUpload = s?.iconUpload as unknown
      const platform = typeof s?.platform === 'string' ? s.platform : ''
      if (platform) socialPlatforms.push(platform)
      if (iconUpload == null) continue
      if (typeof iconUpload === 'number') socialNumeric += 1
      if (
        typeof iconUpload === 'object' &&
        iconUpload != null &&
        'url' in iconUpload &&
        typeof (iconUpload as { url?: unknown }).url === 'string' &&
        (iconUpload as { url?: string }).url!.trim() !== ''
      ) {
        socialWithUrl += 1
      }
    }
    for (const c of columns) {
      const iconUpload = c?.columnIconUpload as unknown
      if (iconUpload == null) continue
      if (typeof iconUpload === 'number') columnNumeric += 1
      if (
        typeof iconUpload === 'object' &&
        iconUpload != null &&
        'url' in iconUpload &&
        typeof (iconUpload as { url?: unknown }).url === 'string' &&
        (iconUpload as { url?: string }).url!.trim() !== ''
      ) {
        columnWithUrl += 1
        if (columnUrlSamples.length < 8) {
          columnUrlSamples.push((iconUpload as { url: string }).url)
        }
      }
    }
    console.info('[debug-icons][footer]', {
      socialLinks: socialLinks.length,
      socialPlatforms,
      socialWithUrl,
      socialNumeric,
      columns: columns.length,
      columnWithUrl,
      columnNumeric,
      columnUrlSamples,
    })
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
