'use client'

import React, { createContext, useCallback, use, useEffect, useSyncExternalStore } from 'react'

import type { Theme, ThemeContextType } from './types'

import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
}

const ThemeContext = createContext(initialContext)

const THEME_SWITCH_CLASS = 'theme-switching'
const THEME_SWITCH_DURATION_MS = 170
const THEME_SWITCH_SWAP_DELAY_MS = 70

let currentTheme: Theme | undefined
const listeners = new Set<() => void>()
let clearThemeSwitchClassTimeout: number | undefined
let pendingThemeApplyTimeout: number | undefined

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

const applyThemeSwitchClass = () => {
  const root = document.documentElement
  const body = document.body
  const bodyBackground = window.getComputedStyle(body).backgroundColor

  if (bodyBackground) {
    root.style.setProperty('--theme-switch-overlay-color', bodyBackground)
  }

  root.classList.add(THEME_SWITCH_CLASS)
  if (clearThemeSwitchClassTimeout) window.clearTimeout(clearThemeSwitchClassTimeout)
  clearThemeSwitchClassTimeout = window.setTimeout(() => {
    root.classList.remove(THEME_SWITCH_CLASS)
    root.style.removeProperty('--theme-switch-overlay-color')
    clearThemeSwitchClassTimeout = undefined
  }, THEME_SWITCH_DURATION_MS)
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const setTheme = useCallback((themeToSet: Theme | null) => {
    applyThemeSwitchClass()
    if (pendingThemeApplyTimeout) {
      window.clearTimeout(pendingThemeApplyTimeout)
      pendingThemeApplyTimeout = undefined
    }
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        pendingThemeApplyTimeout = window.setTimeout(() => {
          applyTheme(themeToSet)
          pendingThemeApplyTimeout = undefined
        }, THEME_SWITCH_SWAP_DELAY_MS)
      })
    })
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
