'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'
import { cn } from '@/utilities/ui'
import { Moon, Sun } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type ThemeSwitcherVariant = 'icon' | 'switch'

export function ThemeSwitcher({
  className,
  variant = 'icon',
}: {
  className?: string
  variant?: ThemeSwitcherVariant
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resolved = useMemo<Theme>(() => {
    if (mounted && (theme === 'dark' || theme === 'light')) return theme

    if (mounted && typeof document !== 'undefined') {
      const attrTheme = document.documentElement.getAttribute('data-theme')
      if (attrTheme === 'dark' || attrTheme === 'light') {
        return attrTheme
      }
    }

    return 'light'
  }, [theme, mounted])
  const isDark = resolved === 'dark'
  const ariaLabel = mounted ? (isDark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren') : 'Designmodus wechseln'
  const tooltipText = mounted ? (resolved === 'light' ? 'Dunkelmodus' : 'Hellmodus') : 'Designmodus wechseln'

  const toggle = useCallback(() => {
    const newTheme = resolved === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    /* View Transition deaktiviert: Snapshot könnte animierte Hintergründe überdecken. */
  }, [resolved, setTheme])

  if (variant === 'switch') {
    return (
      <button
        type="button"
        title="Toggle theme"
        aria-label={ariaLabel}
        role="switch"
        aria-checked={isDark}
        className={cn(
          'theme-switch header-tool-toggle header-tool-toggle--theme inline-flex shrink-0 items-center justify-center rounded-md border-0 p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none',
          isDark && 'theme-switch--checked',
          className,
        )}
        onClick={toggle}
      >
        <span className="theme-switch__track" aria-hidden="true">
          <Sun
            className="theme-switch__icon theme-switch__icon--sun"
            data-active={mounted && !isDark ? 'true' : undefined}
          />
          <Moon
            className="theme-switch__icon theme-switch__icon--moon"
            data-active={mounted && isDark ? 'true' : undefined}
          />
          <span className="theme-switch__thumb" />
        </span>
      </button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          title="Toggle theme"
          aria-label={ariaLabel}
          className={cn(
            'header-tool-toggle header-tool-toggle--theme header-icon-btn shrink-0 text-current',
            className,
          )}
          onClick={toggle}
        >
          <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
            <Sun
              aria-hidden
              className={cn(
                'absolute h-5 w-5 transform-gpu transition-all duration-300 ease-out motion-reduce:transition-none',
                mounted
                  ? isDark
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'pointer-events-none opacity-0 rotate-45 scale-75'
                  : 'opacity-100 rotate-0 scale-100',
              )}
            />
            <Moon
              aria-hidden
              className={cn(
                'absolute h-5 w-5 transform-gpu transition-all duration-300 ease-out motion-reduce:transition-none',
                mounted
                  ? isDark
                    ? 'pointer-events-none opacity-0 -rotate-45 scale-75'
                    : 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 -rotate-45 scale-75',
              )}
            />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  )
}
