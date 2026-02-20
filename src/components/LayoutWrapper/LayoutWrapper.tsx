'use client'

import { useLayout } from '@/providers/Layout'
import React, { useEffect } from 'react'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { layout } = useLayout()
  useEffect(() => {
    document.body.setAttribute('data-layout', layout)
  }, [layout])
  return <>{children}</>
}
