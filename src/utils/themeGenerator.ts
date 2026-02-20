/**
 * Generates shadcn/ui-style CSS variables from a single primary hex color.
 * Output format: HSL values only (e.g. "221.2 83.2% 53.3%") without hsl() wrapper.
 */

export interface HslValues {
  h: number
  s: number
  l: number
}

/** Parse hex (#RGB, #RRGGBB) to 0–255 r,g,b. */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace(/^#/, '').trim()
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16)
    const g = parseInt(cleaned[1] + cleaned[1], 16)
    const b = parseInt(cleaned[2] + cleaned[2], 16)
    return { r, g, b }
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16)
    const g = parseInt(cleaned.slice(2, 4), 16)
    const b = parseInt(cleaned.slice(4, 6), 16)
    return { r, g, b }
  }
  return null
}

/** Convert hex to HSL (h 0–360, s 0–100, l 0–100). */
export function hexToHsl(hex: string): HslValues | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      default:
        h = ((r - g) / d + 4) / 6
    }
  }
  return {
    h: Math.round(h * 3600) / 10,
    s: Math.round(s * 1000) / 10,
    l: Math.round(l * 1000) / 10,
  }
}

/** Format HSL for shadcn: "H S% L%" (no hsl() wrapper). */
export function formatHslForShadcn(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`
}

/** Relative luminance (0–1) for contrast. */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const x = c / 255
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/** Contrast ratio (4.5+ for AA on normal text). */
function contrastRatio(l1: number, l2: number): number {
  const [a, b] = l1 >= l2 ? [l1, l2] : [l2, l1]
  return (a + 0.05) / (b + 0.05)
}

/** HSL to RGB for luminance. */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100
  l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0
  if (h < 60) {
    r = c
    g = x
  } else if (h < 120) {
    r = x
    g = c
  } else if (h < 180) {
    g = c
    b = x
  } else if (h < 240) {
    g = x
    b = c
  } else if (h < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

/** Choose primary-foreground so contrast is at least WCAG AA (~4.5). */
function getPrimaryForeground(primaryH: number, primaryS: number, primaryL: number): string {
  const { r, g, b } = hslToRgb(primaryH, primaryS, primaryL)
  const L = luminance(r, g, b)
  const darkLum = luminance(23, 23, 23)   // ~0 0% 9%
  const lightLum = luminance(250, 250, 250) // ~0 0% 98%
  const ratioDark = contrastRatio(L, darkLum)
  const ratioLight = contrastRatio(L, lightLum)
  if (L >= 0.5) {
    return formatHslForShadcn(0, 0, 9)
  }
  return formatHslForShadcn(0, 0, 98)
}

export type ShadcnTokenSet = Record<string, string>

/**
 * shadcn Neutral base (Primary = Base Color).
 * Wie ui.shadcn.com/create mit baseColor=neutral, theme=neutral – Primary nutzt dieselbe Grauskala.
 */
function getNeutralBaseTokens(mode: 'light' | 'dark'): ShadcnTokenSet {
  if (mode === 'light') {
    return {
      background: formatHslForShadcn(0, 0, 100),
      foreground: formatHslForShadcn(0, 0, 3.9),
      card: formatHslForShadcn(0, 0, 100),
      'card-foreground': formatHslForShadcn(0, 0, 3.9),
      popover: formatHslForShadcn(0, 0, 100),
      'popover-foreground': formatHslForShadcn(0, 0, 3.9),
      primary: formatHslForShadcn(0, 0, 9),
      'primary-foreground': formatHslForShadcn(0, 0, 98),
      secondary: formatHslForShadcn(0, 0, 96.1),
      'secondary-foreground': formatHslForShadcn(0, 0, 9),
      muted: formatHslForShadcn(0, 0, 96.1),
      'muted-foreground': formatHslForShadcn(0, 0, 45.1),
      accent: formatHslForShadcn(0, 0, 96.1),
      'accent-foreground': formatHslForShadcn(0, 0, 9),
      destructive: formatHslForShadcn(0, 84.2, 60.2),
      'destructive-foreground': formatHslForShadcn(0, 0, 98),
      border: formatHslForShadcn(0, 0, 89.8),
      input: formatHslForShadcn(0, 0, 89.8),
      ring: formatHslForShadcn(0, 0, 70.8),
    }
  }
  return {
    background: formatHslForShadcn(0, 0, 3.9),
    foreground: formatHslForShadcn(0, 0, 98),
    card: formatHslForShadcn(0, 0, 3.9),
    'card-foreground': formatHslForShadcn(0, 0, 98),
    popover: formatHslForShadcn(0, 0, 3.9),
    'popover-foreground': formatHslForShadcn(0, 0, 98),
    primary: formatHslForShadcn(0, 0, 92.2),
    'primary-foreground': formatHslForShadcn(0, 0, 9),
    secondary: formatHslForShadcn(0, 0, 26.9),
    'secondary-foreground': formatHslForShadcn(0, 0, 98),
    muted: formatHslForShadcn(0, 0, 26.9),
    'muted-foreground': formatHslForShadcn(0, 0, 63.9),
    accent: formatHslForShadcn(0, 0, 26.9),
    'accent-foreground': formatHslForShadcn(0, 0, 98),
    destructive: formatHslForShadcn(0, 62.8, 50.6),
    'destructive-foreground': formatHslForShadcn(0, 0, 98),
    border: formatHslForShadcn(0, 0, 14.9),
    input: formatHslForShadcn(0, 0, 14.9),
    ring: formatHslForShadcn(0, 0, 55.6),
  }
}

/** Generate full set of shadcn tokens for light or dark mode. */
export function generateShadcnTokens(
  primaryHex: string,
  mode: 'light' | 'dark',
  primaryMatchesBase?: boolean,
): ShadcnTokenSet {
  if (primaryMatchesBase) {
    return getNeutralBaseTokens(mode)
  }
  const primary = hexToHsl(primaryHex)
  if (!primary) {
    return getFallbackTokens(mode)
  }
  const { h, s, l } = primary
  const primaryFg = getPrimaryForeground(h, s, l)

  if (mode === 'light') {
    return {
      background: formatHslForShadcn(0, 0, 100),
      foreground: formatHslForShadcn(0, 0, 3.9),
      card: formatHslForShadcn(0, 0, 100),
      'card-foreground': formatHslForShadcn(0, 0, 3.9),
      popover: formatHslForShadcn(0, 0, 100),
      'popover-foreground': formatHslForShadcn(0, 0, 3.9),
      primary: formatHslForShadcn(h, s, l),
      'primary-foreground': primaryFg,
      secondary: formatHslForShadcn(h, Math.min(s * 0.4, 20), 96),
      'secondary-foreground': formatHslForShadcn(h, s * 0.5, 25),
      muted: formatHslForShadcn(0, 0, 96.1),
      'muted-foreground': formatHslForShadcn(0, 0, 45.1),
      accent: formatHslForShadcn(h, Math.min(s * 0.5, 25), 96.1),
      'accent-foreground': formatHslForShadcn(h, s * 0.6, 25),
      destructive: formatHslForShadcn(0, 84.2, 60.2),
      'destructive-foreground': formatHslForShadcn(0, 0, 98),
      border: formatHslForShadcn(0, 0, 89.8),
      input: formatHslForShadcn(0, 0, 89.8),
      ring: formatHslForShadcn(h, s, l),
    }
  }

  // dark
  return {
    background: formatHslForShadcn(0, 0, 3.9),
    foreground: formatHslForShadcn(0, 0, 98),
    card: formatHslForShadcn(0, 0, 3.9),
    'card-foreground': formatHslForShadcn(0, 0, 98),
    popover: formatHslForShadcn(0, 0, 3.9),
    'popover-foreground': formatHslForShadcn(0, 0, 98),
    primary: formatHslForShadcn(h, s, Math.min(l + 10, 65)),
    'primary-foreground': primaryFg,
    secondary: formatHslForShadcn(h, Math.min(s * 0.3, 15), 18),
    'secondary-foreground': formatHslForShadcn(h, s * 0.4, 90),
    muted: formatHslForShadcn(0, 0, 14.9),
    'muted-foreground': formatHslForShadcn(0, 0, 63.9),
    accent: formatHslForShadcn(h, Math.min(s * 0.35, 18), 14.9),
    'accent-foreground': formatHslForShadcn(h, s * 0.5, 90),
    destructive: formatHslForShadcn(0, 62.8, 50.6),
    'destructive-foreground': formatHslForShadcn(0, 0, 98),
    border: formatHslForShadcn(0, 0, 14.9),
    input: formatHslForShadcn(0, 0, 14.9),
    ring: formatHslForShadcn(h, s, Math.min(l + 10, 65)),
  }
}

function getFallbackTokens(mode: 'light' | 'dark'): ShadcnTokenSet {
  if (mode === 'light') {
    return {
      background: '0 0% 100%',
      foreground: '0 0% 3.9%',
      card: '0 0% 100%',
      'card-foreground': '0 0% 3.9%',
      popover: '0 0% 100%',
      'popover-foreground': '0 0% 3.9%',
      primary: '221.2 83.2% 53.3%',
      'primary-foreground': '210 40% 98%',
      secondary: '210 40% 96.1%',
      'secondary-foreground': '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%',
      'muted-foreground': '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%',
      'accent-foreground': '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%',
      'destructive-foreground': '0 0% 98%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '221.2 83.2% 53.3%',
    }
  }
  return {
    background: '0 0% 3.9%',
    foreground: '0 0% 98%',
    card: '0 0% 3.9%',
    'card-foreground': '0 0% 98%',
    popover: '0 0% 3.9%',
    'popover-foreground': '0 0% 98%',
    primary: '217.2 91.2% 59.8%',
    'primary-foreground': '222.2 47.4% 11.2%',
    secondary: '217.2 32.6% 17.5%',
    'secondary-foreground': '210 40% 98%',
    muted: '217.2 32.6% 17.5%',
    'muted-foreground': '215 20.2% 65.1%',
    accent: '217.2 32.6% 17.5%',
    'accent-foreground': '210 40% 98%',
    destructive: '0 62.8% 50.6%',
    'destructive-foreground': '0 0% 98%',
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '224.3 76.3% 48%',
  }
}

/**
 * Variablen, die im Frontend als var(--x) ohne hsl() genutzt werden (z. B. --color-background: var(--background)).
 * Müssen als vollständige Farbe ausgegeben werden (hsl(...)), sonst wird es transparent.
 */
const KEYS_AS_FULL_COLOR = new Set([
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
])

function toCssValue(key: string, value: string): string {
  return KEYS_AS_FULL_COLOR.has(key) ? `hsl(${value})` : value
}

/** Full CSS string :root + [data-theme='dark'] (kompatibel mit Frontend). */
export function generateCssString(primaryHex: string, primaryMatchesBase?: boolean): string {
  const light = generateShadcnTokens(primaryHex, 'light', primaryMatchesBase)
  const dark = generateShadcnTokens(primaryHex, 'dark', primaryMatchesBase)
  const toCss = (tokens: ShadcnTokenSet) =>
    Object.entries(tokens)
      .map(([key, value]) => `  --${key}: ${toCssValue(key, value)};`)
      .join('\n')
  return `:root {\n${toCss(light)}\n}\n\n[data-theme='dark'] {\n${toCss(dark)}\n}`
}

/** JSON theme { light: {...}, dark: {...} }. */
export function generateJsonTheme(primaryHex: string, primaryMatchesBase?: boolean): { light: ShadcnTokenSet; dark: ShadcnTokenSet } {
  return {
    light: generateShadcnTokens(primaryHex, 'light', primaryMatchesBase),
    dark: generateShadcnTokens(primaryHex, 'dark', primaryMatchesBase),
  }
}
