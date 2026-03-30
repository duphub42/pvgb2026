/**
 * Outfit (Body): lokal, DSGVO. Nur 400 – für Fließtext.
 * Inter (Überschriften): 500/600/700 als echte Schnitte – kein Faux-Bold.
 * next/font/local: self-hosted, Preload, display: 'swap'.
 */
import localFont from 'next/font/local'

export const fontOutfit = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
})

export const fontInter = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
})

/** Klassen für <html>: setzt --font-outfit und --font-inter. */
export const fontClassNames = `${fontOutfit.variable} ${fontInter.variable}`
