/**
 * Zentrale Schrift-Konfiguration (Next.js Font Optimization)
 * Änderungen hier wirken app-weit.
 * @see https://nextjs.org/docs/app/getting-started/fonts
 */
import { Geist, Geist_Mono } from 'next/font/google'

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

/** CSS-Klassen für Layout (z. B. html): variable-Klassen für CSS-Variablen */
export const fontClassNames = `${fontSans.variable} ${fontMono.variable}`.trim()
