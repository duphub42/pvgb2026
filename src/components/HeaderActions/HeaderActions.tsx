'use client'

import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle'
import { LayoutSwitcher } from '@/components/LayoutSwitcher/LayoutSwitcher'
import { SearchCommand } from '@/components/SearchCommand/SearchCommand'
import { cn } from '@/utilities/ui'
import React from 'react'

export function HeaderActions({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <AnimatedThemeToggle />
      <LayoutSwitcher />
      <SearchCommand />
    </div>
  )
}
