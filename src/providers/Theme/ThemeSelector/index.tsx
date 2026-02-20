'use client'

import { cn } from '@/utilities/ui'
import { Monitor, Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

type ThemeOption = Theme | 'auto'

const options: { value: ThemeOption; icon: React.ElementType; label: string }[] = [
  { value: 'auto', icon: Monitor, label: 'System' },
  { value: 'light', icon: Sun, label: 'Hell' },
  { value: 'dark', icon: Moon, label: 'Dunkel' },
]

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<ThemeOption>('auto')

  const onThemeChange = (themeToSet: ThemeOption) => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue((preference === 'light' || preference === 'dark' ? preference : 'auto') as ThemeOption)
  }, [])

  return (
    <div
      className="flex items-center gap-0.5 rounded-md p-0.5"
      role="group"
      aria-label="Design wechseln (Hell / Dunkel / System)"
    >
      {options.map(({ value: optValue, icon: Icon, label }) => (
        <button
          key={optValue}
          type="button"
          onClick={() => onThemeChange(optValue)}
          aria-pressed={value === optValue}
          aria-label={label}
          title={label}
          className={cn(
            'rounded p-1.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10',
            value === optValue && 'bg-black/10 dark:bg-white/10'
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </button>
      ))}
    </div>
  )
}
