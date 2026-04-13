import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import { fontClassNames } from '@/theme/fonts'
import { AdminBarGate } from '@/components/AdminBar/AdminBarGate'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import React from 'react'
import { RootLayoutInner } from '@/app/(frontend)/RootLayoutInner.client'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { DesignStyles } from '@/components/DesignStyles'
import { ThemeSettingsStyles } from '@/components/ThemeSettingsStyles'
import type { DesignDoc } from '@/utilities/designToCss'
import type { Footer as FooterGlobal, Header as HeaderGlobal } from '@/payload-types'

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`
  if (typeof error === 'string') return error
  if (error === null) return 'null'
  if (error === undefined) return 'undefined'
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  try {
    // Keep frontend layout cache-friendly in production. Draft mode is only read in development.
    const isEnabled = process.env.NODE_ENV === 'development' ? (await draftMode()).isEnabled : false
    const locale = 'de'

    let design: DesignDoc = null
    let themeSettings: { cssString?: string | null } | null = null
    let headerData: HeaderGlobal | null = null
    let footerData: FooterGlobal | null = null
    let faviconUrl: string | null = null

    const [designResult, themeSettingsResult, headerResult, footerResult] = await Promise.allSettled([
      getCachedGlobal('design', 1)(),
      getCachedGlobal('theme-settings', 0)(),
      getCachedGlobal('header', 1)(),
      // Footer icons can be nested in arrays/groups; use higher depth for media relation URLs.
      getCachedGlobal('footer', 4)(),
    ])
    if (designResult.status === 'fulfilled') design = designResult.value as DesignDoc
    if (
      themeSettingsResult.status === 'fulfilled' &&
      themeSettingsResult.value &&
      typeof themeSettingsResult.value === 'object'
    ) {
      themeSettings = themeSettingsResult.value as { cssString?: string | null }
    }
    headerData =
      headerResult.status === 'fulfilled' &&
      headerResult.value &&
      typeof headerResult.value === 'object'
        ? (headerResult.value as HeaderGlobal)
        : null

    footerData =
      footerResult.status === 'fulfilled' &&
      footerResult.value &&
      typeof footerResult.value === 'object'
        ? (footerResult.value as FooterGlobal)
        : null

    if (
      headerData?.favicon &&
      typeof headerData.favicon === 'object' &&
      'url' in headerData.favicon &&
      headerData.favicon?.url
    ) {
      faviconUrl = getMediaUrl(headerData.favicon.url, headerData.favicon.updatedAt) || null
    }

    return (
      <html className={fontClassNames} lang={locale} suppressHydrationWarning>
        <head>
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
          <link href="/manifest.json" rel="manifest" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="#f5f5f5" media="(prefers-color-scheme: light)" name="theme-color" />
          <meta content="#0a0a0a" media="(prefers-color-scheme: dark)" name="theme-color" />
        </head>
        <body data-layout="default">
          <Providers initialLocale={locale}>
            <AdminBarGate preview={isEnabled} adminBarProps={{ preview: isEnabled }} />
            <Header headerData={headerData} footerData={footerData} />
            <RootLayoutInner>
              <main id="main-content" key="main-content" className="min-h-[100svh]">
                {children}
              </main>
              <Footer key="site-footer" locale={locale} footerData={footerData} />
            </RootLayoutInner>
          </Providers>
          {process.env.NODE_ENV === 'development' && process.env.PINY_VISUAL_SELECT === 'true' && (
            <Script src="/_piny/piny.phone.js" strategy="afterInteractive" />
          )}
        </body>
      </html>
    )
  } catch (err) {
    console.error('[Layout] Error rendering layout:', formatUnknownError(err))
    return (
      <html lang="de">
        <body>
          <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '40rem' }}>
            <h1>Fehler beim Laden</h1>
            <p>Die Seite konnte nicht geladen werden. Bitte später erneut versuchen.</p>
            <p>
              <Link href="/admin">Zum Admin</Link>
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
