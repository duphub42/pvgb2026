'use client'

import { LayoutSwitcher } from '@/components/LayoutSwitcher/LayoutSwitcher'
import { SearchCommand } from '@/components/SearchCommand/SearchCommand'
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher'
import { cn } from '@/utilities/ui'
import React from 'react'

export function HeaderActions({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <ThemeSwitcher />
      <LayoutSwitcher />
      <SearchCommand />
    </div>
  )
}
