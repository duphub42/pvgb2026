'use client'

import React, { createContext, useCallback, use, useEffect, useSyncExternalStore } from 'react'

import type { Theme, ThemeContextType } from './types'

import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
}

const ThemeContext = createContext(initialContext)

let currentTheme: Theme | undefined
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => currentTheme
const getServerSnapshot = () => undefined

const notifyThemeChange = () => {
  for (const listener of listeners) listener()
}

const setCurrentTheme = (nextTheme: Theme | undefined) => {
  if (currentTheme === nextTheme) return
  currentTheme = nextTheme
  notifyThemeChange()
}

const resolveNextTheme = (themeToSet: Theme | null): Theme | undefined => {
  if (themeToSet) return themeToSet
  return getImplicitPreference() ?? undefined
}

const applyTheme = (themeToSet: Theme | null) => {
  const nextTheme = resolveNextTheme(themeToSet)

  if (themeToSet === null) {
    window.localStorage.removeItem(themeLocalStorageKey)
  } else {
    window.localStorage.setItem(themeLocalStorageKey, themeToSet)
  }

  document.documentElement.setAttribute('data-theme', nextTheme || '')
  setCurrentTheme(nextTheme)
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const setTheme = useCallback((themeToSet: Theme | null) => {
    applyTheme(themeToSet)
  }, [])

  useEffect(() => {
    let themeToSet: Theme = defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
    setCurrentTheme(themeToSet)
  }, [])

  return <ThemeContext.Provider value={{ setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const { setTheme } = use(ThemeContext)
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { setTheme, theme }
}
