/**
 * Zentrale Schrift-Konfiguration – ausschließlich lokal (DSGVO/GDPR).
 * Nur Gewicht 400 (normal) pro Schrift → minimaler Umfang (~64 KB gesamt).
 * font-weight: 500/600/700 im CSS werden vom Browser synthetisiert (kann etwas matter wirken).
 */
import localFont from 'next/font/local'

/** Sans-Serif: Inter, nur 400 (~24 KB). */
export const fontSans = localFont({
  src: [
    { path: '../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
})

/** Monospace: JetBrains Mono, nur 400 (~24 KB). */
export const fontMono = localFont({
  src: [
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
})

/** Outfit (Hero, Headings): nur 400 (~16 KB). */
export const fontOutfit = localFont({
  src: [
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-outfit',
  display: 'swap',
})

/** CSS-Klassen für Layout (z. B. html): variable-Klassen für CSS-Variablen */
export const fontClassNames = `${fontOutfit.variable} ${fontSans.variable} ${fontMono.variable}`.trim()
