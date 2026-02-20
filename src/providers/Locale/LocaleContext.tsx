'use client'

import React, { createContext, useContext } from 'react'

import type { Locale } from '@/utilities/locale'

const LocaleContext = createContext<Locale>('de')

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  return <LocaleContext.Provider value={initialLocale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}
