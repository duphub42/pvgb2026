'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'
import { cn } from '@/utilities/ui'
import { Moon, Sun } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ThemeSwitcherVariant = 'icon' | 'switch'
const THEME_SWITCH_MORPH_MS = 300
const THEME_SWITCH_WAVE_MS = 500

export function ThemeSwitcher({
  className,
  variant = 'icon',
}: {
  className?: string
  variant?: ThemeSwitcherVariant
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [morphDirection, setMorphDirection] = useState<'left' | 'right' | null>(null)
  const [waveActive, setWaveActive] = useState(false)
  const switchButtonRef = useRef<HTMLButtonElement | null>(null)
  const morphTimeoutRef = useRef<number | null>(null)
  const applyThemeRafRef = useRef<number | null>(null)
  const waveTimeoutRef = useRef<number | null>(null)

  const clearWaveArtifacts = useCallback(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.remove('theme-wave-transition', 'theme-wave-dark', 'theme-wave-light')
    root.style.removeProperty('--theme-wave-x')
    root.style.removeProperty('--theme-wave-y')
    root.style.removeProperty('--theme-wave-radius')
    root.style.removeProperty('--theme-wave-duration')
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      if (morphTimeoutRef.current != null) {
        window.clearTimeout(morphTimeoutRef.current)
        morphTimeoutRef.current = null
      }
      if (applyThemeRafRef.current != null) {
        window.cancelAnimationFrame(applyThemeRafRef.current)
        applyThemeRafRef.current = null
      }
      if (waveTimeoutRef.current != null) {
        window.clearTimeout(waveTimeoutRef.current)
        waveTimeoutRef.current = null
      }
      clearWaveArtifacts()
    }
  }, [clearWaveArtifacts])

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
  const ariaLabel = mounted
    ? isDark
      ? 'Hellmodus aktivieren'
      : 'Dunkelmodus aktivieren'
    : 'Designmodus wechseln'
  const tooltipText = mounted
    ? resolved === 'light'
      ? 'Dunkelmodus'
      : 'Hellmodus'
    : 'Designmodus wechseln'

  const toggle = useCallback(() => {
    const newTheme = resolved === 'light' ? 'dark' : 'light'

    setMorphDirection(newTheme === 'dark' ? 'right' : 'left')
    setWaveActive(true)

    if (typeof window !== 'undefined') {
      const root = document.documentElement
      const buttonRect = switchButtonRef.current?.getBoundingClientRect()
      const waveX = buttonRect != null ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2
      const waveY = buttonRect != null ? buttonRect.top + buttonRect.height / 2 : window.innerHeight / 2
      const dx = Math.max(waveX, window.innerWidth - waveX)
      const dy = Math.max(waveY, window.innerHeight - waveY)
      const waveRadius = Math.ceil(Math.hypot(dx, dy))

      clearWaveArtifacts()
      root.style.setProperty('--theme-wave-x', `${waveX}px`)
      root.style.setProperty('--theme-wave-y', `${waveY}px`)
      root.style.setProperty('--theme-wave-radius', `${waveRadius}px`)
      root.style.setProperty('--theme-wave-duration', `${THEME_SWITCH_WAVE_MS}ms`)
      root.classList.add(
        'theme-wave-transition',
        newTheme === 'dark' ? 'theme-wave-dark' : 'theme-wave-light',
      )

      if (applyThemeRafRef.current != null) {
        window.cancelAnimationFrame(applyThemeRafRef.current)
        applyThemeRafRef.current = null
      }
      applyThemeRafRef.current = window.requestAnimationFrame(() => {
        applyThemeRafRef.current = window.requestAnimationFrame(() => {
          setTheme(newTheme)
          applyThemeRafRef.current = null
        })
      })

      if (morphTimeoutRef.current != null) {
        window.clearTimeout(morphTimeoutRef.current)
      }
      morphTimeoutRef.current = window.setTimeout(() => {
        setMorphDirection(null)
        morphTimeoutRef.current = null
      }, THEME_SWITCH_MORPH_MS)

      if (waveTimeoutRef.current != null) {
        window.clearTimeout(waveTimeoutRef.current)
      }
      waveTimeoutRef.current = window.setTimeout(() => {
        clearWaveArtifacts()
        setWaveActive(false)
        waveTimeoutRef.current = null
      }, THEME_SWITCH_WAVE_MS)
    }
    /* View Transition deaktiviert: Snapshot könnte animierte Hintergründe überdecken. */
  }, [clearWaveArtifacts, resolved, setTheme])

  if (variant === 'switch') {
    return (
      <button
        ref={switchButtonRef}
        type="button"
        title="Toggle theme"
        aria-label={ariaLabel}
        role="switch"
        aria-checked={isDark}
        className={cn(
          'theme-switch header-tool-toggle header-tool-toggle--theme inline-flex shrink-0 items-center justify-center rounded-md border-0 p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none',
          isDark && 'theme-switch--checked',
          morphDirection === 'right' && 'theme-switch--morph-right',
          morphDirection === 'left' && 'theme-switch--morph-left',
          waveActive && 'theme-switch--wave-active',
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
          ref={switchButtonRef}
          type="button"
          aria-label={ariaLabel}
          className={cn(
            'relative header-tool-toggle header-tool-toggle--theme header-icon-btn shrink-0 text-current',
            waveActive && 'theme-switch--wave-active',
            className,
          )}
          onClick={toggle}
        >
          <Sun
            aria-hidden
            className={cn(
              'absolute inset-0 m-auto h-5 w-5 transform-gpu transition-all duration-300 ease-out motion-reduce:transition-none',
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
              'absolute inset-0 m-auto h-5 w-5 transform-gpu transition-all duration-300 ease-out motion-reduce:transition-none',
              mounted
                ? isDark
                  ? 'pointer-events-none opacity-0 -rotate-45 scale-75'
                  : 'opacity-100 rotate-0 scale-100'
                : 'opacity-0 -rotate-45 scale-75',
            )}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  )
}
