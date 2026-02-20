export const LOCALE_COOKIE = 'LOCALE'
export type Locale = 'de' | 'en'

export const defaultLocale: Locale = 'de'
export const locales: Locale[] = ['de', 'en']

/** Cookie-Store-ähnliches Objekt (z. B. von next/headers cookies()). */
type CookieStore = { get(name: string): { value: string } | undefined } | null

/**
 * Liest die aktuelle Locale aus dem Cookie (Server). Fehlt das Cookie, wird defaultLocale zurückgegeben.
 */
export function getLocale(cookieStore: CookieStore): Locale {
  const value = cookieStore?.get(LOCALE_COOKIE)?.value
  return value === 'en' ? 'en' : 'de'
}
