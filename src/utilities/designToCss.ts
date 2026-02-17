/**
 * Erzeugt aus dem Design-Global CSS-Variablen für :root (Hell) und [data-theme='dark'].
 * Nur gesetzte Werte werden ausgegeben; leere Felder lassen die Standardwerte aus theme/colors.css.
 */

type ColorGroup = Record<string, string | null | undefined> | null | undefined

const COLOR_KEY_TO_CSS_VAR: Record<string, string> = {
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  accent: '--accent',
  success: '--success',
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  link: '--link',
  linkHover: '--link-hover',
  border: '--border',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  destructive: '--destructive',
  megaMenuButtonBg: '--mega-menu-button-bg',
  megaMenuButtonFg: '--mega-menu-button-fg',
  megaMenuNavText: '--mega-menu-nav-text',
  megaMenuHeading: '--mega-menu-heading',
  megaMenuItemText: '--mega-menu-item-text',
  megaMenuDescription: '--mega-menu-description',
}

function normalizeColor(value: string | null | undefined): string | null {
  if (value == null || String(value).trim() === '') return null
  const v = String(value).trim()
  if (/^#[\da-fA-F]{3,8}$/.test(v)) return v
  if (/^rgb\s*\(/.test(v) || /^rgba\s*\(/.test(v)) return v
  if (/^[\da-fA-F]{6}$/.test(v)) return `#${v}`
  return v
}

function buildRuleBlock(colors: ColorGroup): string {
  if (!colors || typeof colors !== 'object') return ''
  const lines: string[] = []
  for (const [key, cssVar] of Object.entries(COLOR_KEY_TO_CSS_VAR)) {
    const raw = colors[key]
    const value = normalizeColor(raw)
    if (value) lines.push(`${cssVar}: ${value};`)
  }
  return lines.join('\n  ')
}

export type DesignDoc = {
  colorsLight?: ColorGroup
  colorsDark?: ColorGroup
  fonts?: {
    body?: string | null
    heading?: string | null
    mono?: string | null
  } | null
} | null

/**
 * Liefert ein CSS-Block, der :root und [data-theme='dark'] mit den Design-Variablen setzt.
 */
export function designToCss(doc: DesignDoc): string {
  if (!doc) return ''

  const parts: string[] = []

  const lightBlock = buildRuleBlock(doc.colorsLight)
  if (lightBlock) {
    parts.push(`:root {\n  ${lightBlock}\n}`)
  }

  const darkBlock = buildRuleBlock(doc.colorsDark)
  if (darkBlock) {
    parts.push(`[data-theme='dark'] {\n  ${darkBlock}\n}`)
  }

  const fonts = doc.fonts
  if (fonts && (fonts.body || fonts.heading || fonts.mono)) {
    const fontParts: string[] = []
    if (fonts.body) fontParts.push('--font-body: ' + String(fonts.body).trim() + ';')
    if (fonts.heading) fontParts.push('--font-heading: ' + String(fonts.heading).trim() + ';')
    if (fonts.mono) fontParts.push('--font-mono: ' + String(fonts.mono).trim() + ';')
    if (fontParts.length) {
      parts.push(`:root, [data-theme='dark'] {\n  ${fontParts.join('\n  ')}\n}`)
    }
  }

  if (parts.length === 0) return ''
  return ['/* Design-Global (zentrale Farben & Schriften) */', ...parts].join('\n')
}
