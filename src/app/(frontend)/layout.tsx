import type { Metadata, Viewport } from 'next'

/** Layout nutzt cookies() für Locale – alle Routen unter (frontend) sind dynamisch. */
export const dynamic = 'force-dynamic'

import { fontClassNames } from '@/theme/fonts'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode, cookies } from 'next/headers'
import React from 'react'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { DesignStyles } from '@/components/DesignStyles'
import { ThemeSettingsStyles } from '@/components/ThemeSettingsStyles'
import { getLocale } from '@/utilities/locale'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  try {
    const { isEnabled } = await draftMode()
    const cookieStore = await cookies()
    const locale = getLocale(cookieStore)

    let design: Awaited<ReturnType<ReturnType<typeof getCachedGlobal>>> | null = null
    let themeSettings: { cssString?: string | null } | null = null
    let faviconUrl: string | null = null

    const [designResult, themeSettingsResult, headerResult] = await Promise.allSettled([
      getCachedGlobal('design', 1)(),
      getCachedGlobal('theme-settings', 0)(),
      getCachedGlobal('header', 1)(),
    ])
    if (designResult.status === 'fulfilled') design = designResult.value
    if (themeSettingsResult.status === 'fulfilled' && themeSettingsResult.value && typeof themeSettingsResult.value === 'object') {
      themeSettings = themeSettingsResult.value as { cssString?: string | null }
    }
    const header = headerResult.status === 'fulfilled' && headerResult.value && typeof headerResult.value === 'object' ? headerResult.value as { favicon?: { url?: string | null; updatedAt?: string } | number | null } : null
    if (header?.favicon && typeof header.favicon === 'object' && header.favicon?.url) {
      faviconUrl = getMediaUrl(header.favicon.url, header.favicon.updatedAt) || null
    }

    return (
      <html className={fontClassNames} lang={locale} suppressHydrationWarning>
        <head>
          {/* Three.js für Vanta-Hero von jsDelivr CDN → früher Verbindungsaufbau */}
          <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
          <InitTheme />
          <DesignStyles design={design ?? null} />
          <ThemeSettingsStyles themeSettings={themeSettings ?? null} />
          {faviconUrl ? (
            <link href={faviconUrl} rel="icon" type="image/x-icon" />
          ) : (
            <>
              <link href="/favicon.ico" rel="icon" sizes="32x32" />
              <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
            </>
          )}
        </head>
        <body data-layout="default">
          <Providers initialLocale={locale}>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            {children}
            <Footer locale={locale} />
          </Providers>
        </body>
      </html>
    )
  } catch (err) {
    console.error('[Layout] Error rendering layout:', err)
    return (
      <html lang="de">
        <body>
          <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '40rem' }}>
            <h1>Fehler beim Laden</h1>
            <p>Die Seite konnte nicht geladen werden. Bitte später erneut versuchen.</p>
            <p>
              <a href="/admin">Zum Admin</a>
            </p>
          </div>
        </body>
      </html>
    )
  }
}

function getMetadataBase(): URL {
  try {
    const url = getServerSideURL()
    if (url && url.startsWith('http')) return new URL(url)
  } catch {
    // ignore
  }
  return new URL('https://localhost')
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

/** Safe Area (Notch) auf iPhone: env(safe-area-inset-*) funktioniert nur mit viewport-fit=cover */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}
