'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'
import { cn } from '@/utilities/ui'
import { Moon, Sun } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'

type ThemeSwitcherVariant = 'icon' | 'switch'

export function ThemeSwitcher({
  className,
  variant = 'icon',
}: {
  className?: string
  variant?: ThemeSwitcherVariant
}) {
  const { theme, setTheme } = useTheme()
  const resolved = useMemo<Theme>(() => {
    if (theme === 'dark' || theme === 'light') return theme

    if (typeof document !== 'undefined') {
      const attrTheme = document.documentElement.getAttribute('data-theme')
      if (attrTheme === 'dark' || attrTheme === 'light') {
        return attrTheme
      }
    }

    return 'light'
  }, [theme])
  const isDark = resolved === 'dark'

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
        aria-label={isDark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
        role="switch"
        aria-checked={isDark}
        className={cn(
          'theme-switch header-tool-toggle header-tool-toggle--theme inline-flex shrink-0 items-center justify-center rounded-md border-0 p-0 outline-none transition-transform duration-150 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none',
          isDark && 'theme-switch--checked',
          className,
        )}
        onClick={toggle}
      >
        <span className="theme-switch__track" aria-hidden="true">
          <Sun
            className="theme-switch__icon theme-switch__icon--sun"
            data-active={!isDark ? 'true' : undefined}
          />
          <Moon
            className="theme-switch__icon theme-switch__icon--moon"
            data-active={isDark ? 'true' : undefined}
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
          aria-label={isDark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
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
                isDark
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'pointer-events-none opacity-0 rotate-45 scale-75',
              )}
            />
            <Moon
              aria-hidden
              className={cn(
                'absolute h-5 w-5 transform-gpu transition-all duration-300 ease-out motion-reduce:transition-none',
                isDark
                  ? 'pointer-events-none opacity-0 -rotate-45 scale-75'
                  : 'opacity-100 rotate-0 scale-100',
              )}
            />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {resolved === 'light' ? 'Dunkelmodus' : 'Hellmodus'}
      </TooltipContent>
    </Tooltip>
  )
}
