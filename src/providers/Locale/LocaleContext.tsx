'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import type { Locale } from '@/utilities/locale'
import { getLocaleFromPathname } from '@/i18n/routing'
import { LOCALE_COOKIE } from '@/utilities/locale'

const LocaleContext = createContext<Locale>('de')

function storeLocale(locale: Locale) {
  if (typeof document === 'undefined') return

  document.cookie = `${LOCALE_COOKIE}=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax`
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const pathname = usePathname()
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    const pathLocale = getLocaleFromPathname(pathname)
    const nextLocale = pathLocale ?? 'de'
    setLocale(nextLocale)
    document.documentElement.lang = nextLocale
    storeLocale(nextLocale)
  }, [pathname])

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}
