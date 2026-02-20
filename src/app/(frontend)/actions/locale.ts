'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import type { Locale } from '@/utilities/locale'
import { LOCALE_COOKIE } from '@/utilities/locale'

export async function setLocaleAction(locale: Locale): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  revalidatePath('/', 'layout')
}
