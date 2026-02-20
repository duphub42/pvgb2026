import type { Metadata } from 'next'

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
import { DesignStyles } from '@/components/DesignStyles'
import { ThemeSettingsStyles } from '@/components/ThemeSettingsStyles'
import { getLocale } from '@/utilities/locale'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const cookieStore = await cookies()
  const locale = getLocale(cookieStore)

  let design: Awaited<ReturnType<ReturnType<typeof getCachedGlobal>>> | null = null
  let themeSettings: { cssString?: string | null } | null = null

  const [designResult, themeSettingsResult] = await Promise.allSettled([
    getCachedGlobal('design', 1)(),
    getCachedGlobal('theme-settings', 0)(),
  ])
  if (designResult.status === 'fulfilled') design = designResult.value
  if (themeSettingsResult.status === 'fulfilled' && themeSettingsResult.value && typeof themeSettingsResult.value === 'object') {
    themeSettings = themeSettingsResult.value as { cssString?: string | null }
  }

  return (
    <html className={fontClassNames} lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
        <DesignStyles design={design ?? null} />
        <ThemeSettingsStyles themeSettings={themeSettings ?? null} />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
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
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
