'use client'

import { setLocaleAction } from '@/app/(frontend)/actions/locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from '@/providers/Locale/LocaleContext'
import { useRouter } from 'next/navigation'
import React from 'react'

import type { Locale } from '@/utilities/locale'
import { locales } from '@/utilities/locale'
import { messages } from '@/i18n/messages'
import { cn } from '@/utilities/ui'

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()

  async function handleSelect(newLocale: Locale) {
    if (newLocale === locale) return
    await setLocaleAction(newLocale)
    router.refresh()
  }

  return (
    <Select value={locale} onValueChange={(v) => handleSelect(v as Locale)}>
      <SelectTrigger
        aria-label={messages[locale].locale.switchTo}
        className={cn(
          'w-auto min-w-[5rem] border-current/20 bg-current/5 text-inherit opacity-90 hover:opacity-100',
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className="!bg-white !text-gray-900 dark:!bg-gray-100 dark:!text-gray-900 border border-gray-200 shadow-lg"
      >
        {locales.map((loc) => (
          <SelectItem
            key={loc}
            value={loc}
            className="!text-gray-900 focus:!bg-gray-200 focus:!text-gray-900 dark:focus:!bg-gray-300 dark:focus:!text-gray-900"
          >
            {messages[locale].locale[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
