/**
 * Hilfsfunktionen für Farbwerte: Hex, RGB, HSL erkennen und konvertieren.
 * Ermöglicht zentrale Eingabe in verschiedenen Formaten im Design-Global.
 */

export type ColorFormat = 'hex' | 'rgb' | 'hsl'

/** Prüft, ob der String ein gültiges Hex-Format ist (#rgb oder #rrggbb oder #rrggbbaa) */
export function isHex(s: string): boolean {
  return /^#([\da-fA-F]{3}|[\da-fA-F]{6}|[\da-fA-F]{8})$/.test(String(s).trim())
}

/** Prüft, ob der String rgb() oder rgba() ist */
export function isRgb(s: string): boolean {
  return /^rgba?\s*\(/.test(String(s).trim())
}

/** Prüft, ob der String hsl() oder hsla() ist */
export function isHsl(s: string): boolean {
  return /^hsla?\s*\(/.test(String(s).trim())
}

/** Erkennt das Format einer Farbangabe */
export function detectFormat(value: string | null | undefined): ColorFormat | null {
  if (value == null || String(value).trim() === '') return null
  const v = String(value).trim()
  if (isHex(v)) return 'hex'
  if (isRgb(v)) return 'rgb'
  if (isHsl(v)) return 'hsl'
  return null
}

/**
 * Konvertiert eine beliebige gültige Farbe nach #rrggbb (für input[type=color]).
 * Gibt null zurück, wenn die Eingabe nicht geparst werden kann.
 */
export function toHex(value: string | null | undefined): string | null {
  if (value == null || String(value).trim() === '') return null
  const v = String(value).trim()

  if (isHex(v)) {
    let hex = v.slice(1)
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('')
    if (hex.length === 6) return '#' + hex
    if (hex.length === 8) return '#' + hex.slice(0, 6)
    return null
  }

  if (isRgb(v)) {
    const m = v.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (m) {
      const r = Math.max(0, Math.min(255, parseInt(m[1], 10)))
      const g = Math.max(0, Math.min(255, parseInt(m[2], 10)))
      const b = Math.max(0, Math.min(255, parseInt(m[3], 10)))
      return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
    }
    return null
  }

  if (isHsl(v)) {
    const m = v.match(/hsla?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/)
    if (m) {
      const h = parseFloat(m[1]) / 360
      const s = parseFloat(m[2]) / 100
      const l = parseFloat(m[3]) / 100
      const r = hslToRgb(h, s, l)
      return '#' + r.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')
    }
    return null
  }

  return null
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }
  return [r * 255, g * 255, b * 255]
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

/** Konvertiert #rrggbb zu "H S% L%" (ohne hsl()-Wrapper, für CSS --primary) */
export function hexToHslTriple(hex: string | null | undefined): string | null {
  const h = toHex(hex)
  if (!h || h.length < 7) return null
  const r = parseInt(h.slice(1, 3), 16) / 255
  const g = parseInt(h.slice(3, 5), 16) / 255
  const b = parseInt(h.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let hVal = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        hVal = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        hVal = ((b - r) / d + 2) / 6
        break
      default:
        hVal = ((r - g) / d + 4) / 6
    }
  }
  const H = Math.round(hVal * 360)
  const S = Math.round(s * 100)
  const L = Math.round(l * 100)
  return `${H} ${S}% ${L}%`
}
