'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Languages } from 'lucide-react'
import { useLocale } from '@/providers/Locale/LocaleContext'
import { localizePathname } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Locale } from '@/utilities/locale'
import { locales } from '@/utilities/locale'
import { messages } from '@/i18n/messages'
import { cn } from '@/utilities/ui'

type LanguageSwitcherVariant = 'select' | 'icon-menu'

export function LanguageSwitcher({
  className,
  disabled = false,
  variant = 'select',
}: {
  className?: string
  disabled?: boolean
  variant?: LanguageSwitcherVariant
}) {
  const locale = useLocale()
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  function setLocaleCookie(newLocale: Locale) {
    if (typeof document === 'undefined') return

    const expires = 'Fri, 31 Dec 9999 23:59:59 GMT'
    const localeCookie = `LOCALE=${newLocale}; expires=${expires}; path=/; SameSite=Lax`

    document.cookie = localeCookie
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

    const hostname = window.location.hostname
    if (hostname && hostname !== 'localhost') {
      const domain = hostname.replace(/^www\./, '')
      document.cookie = `${localeCookie}; domain=.${domain}`
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`
    }
  }

  function handleSelect(newLocale: Locale) {
    if (disabled) return
    if (newLocale === locale) return
    setOpen(false)
    setLocaleCookie(newLocale)
    if (typeof window !== 'undefined') {
      window.location.href = localizePathname(pathname, newLocale)
    }
  }

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  if (variant === 'icon-menu') {
    return (
      <div ref={rootRef} className={cn('header-language-switcher relative', className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="header-tool-toggle header-icon-btn header-language-switcher__trigger shrink-0 text-current"
              aria-label={messages[locale].locale.switchTo}
              aria-expanded={open}
              aria-haspopup="menu"
              disabled={disabled}
              onClick={() => setOpen((value) => !value)}
            >
              <Languages className="h-5 w-5" aria-hidden />
              <span className="sr-only">{messages[locale].locale.switchTo}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={6}>
            {messages[locale].locale.switchTo}
          </TooltipContent>
        </Tooltip>
        <div
          className="header-language-switcher__menu"
          data-open={open ? 'true' : undefined}
          role="menu"
        >
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              className="header-language-switcher__option"
              data-active={loc === locale ? 'true' : undefined}
              onClick={() => handleSelect(loc)}
              role="menuitemradio"
              aria-checked={loc === locale}
            >
              {messages[locale].locale[loc]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <select
      data-language-switcher
      value={locale}
      disabled={disabled}
      data-temporarily-disabled={disabled ? 'true' : undefined}
      onChange={(event) => handleSelect(event.currentTarget.value as Locale)}
      translate="no"
      className={cn(
        'h-9 w-auto min-w-[4.75rem] rounded-md border border-current/20 bg-current/5 px-3 py-1.5 text-sm text-inherit opacity-90 shadow-xs outline-none transition-[color,box-shadow,opacity] hover:opacity-100 focus-visible:ring-4 focus-visible:ring-ring/20',
        className,
      )}
      aria-label={messages[locale].locale.switchTo}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc} className="bg-white text-gray-900">
          {messages[locale].locale[loc]}
        </option>
      ))}
    </select>
  )
}
