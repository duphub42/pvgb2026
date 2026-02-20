/**
 * Zentrale Schrift-Konfiguration – ausschließlich lokal (DSGVO/GDPR).
 * Keine externen Requests (kein Google Fonts, kein CDN).
 * Alle Fonts aus node_modules/@fontsource/… (woff2). Pfade relativ zu dieser Datei (src/theme/).
 */
import localFont from 'next/font/local'

/** Sans-Serif (Ersatz für Geist): Inter, lokal über @fontsource/inter – DSGVO ohne externe Requests */
export const fontSans = localFont({
  src: [
    { path: '../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
})

/** Monospace: JetBrains Mono, lokal über @fontsource/jetbrains-mono */
export const fontMono = localFont({
  src: [
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
})

/** Outfit: lokal über @fontsource/outfit (Hero, Headings) */
export const fontOutfit = localFont({
  src: [
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-outfit',
  display: 'swap',
})

/** CSS-Klassen für Layout (z. B. html): variable-Klassen für CSS-Variablen */
export const fontClassNames = `${fontOutfit.variable} ${fontSans.variable} ${fontMono.variable}`.trim()
