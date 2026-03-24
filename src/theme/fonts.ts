/**
 * Eine Schriftfamilie: Outfit (lokal, DSGVO). ~16 KB.
 * next/font/local: self-hosted, automatisches Preload, display: 'swap' gegen FOUT – PageSpeed-optimiert.
 * font-weight: 500/600/700 im CSS werden vom Browser synthetisiert.
 */
import localFont from 'next/font/local'

export const fontOutfit = localFont({
  src: [
    { path: '../../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
  /** Reduziert CLS beim Font-Swap (Fallback-Metrik angleichen). */
  adjustFontFallback: 'Arial',
})

/** CSS-Klasse für Layout (html): setzt --font-outfit. */
export const fontClassNames = fontOutfit.variable
