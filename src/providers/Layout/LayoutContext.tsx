'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type LayoutMode = 'default' | 'wide'

const LAYOUT_STORAGE_KEY = 'payload-layout'

const LayoutContext = createContext<{
  layout: LayoutMode
  setLayout: (mode: LayoutMode) => void
}>({ layout: 'default', setLayout: () => null })

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>('default')

  useEffect(() => {
    const stored = window.localStorage.getItem(LAYOUT_STORAGE_KEY)
    if (stored === 'wide' || stored === 'default') setLayoutState(stored)
  }, [])

  const setLayout = useCallback((mode: LayoutMode) => {
    setLayoutState(mode)
    window.localStorage.setItem(LAYOUT_STORAGE_KEY, mode)
  }, [])

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
