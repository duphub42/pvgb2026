export function getSpriteIdFromMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null

  try {
    const clean = url.split('?')[0]
    const lastSegment = clean.split('/').filter(Boolean).pop()
    if (!lastSegment) return null

    const filename = lastSegment.toLowerCase().endsWith('.svg')
      ? lastSegment
      : `${lastSegment}.svg`

    const base = filename.replace(/\.svg$/i, '')
    const withoutPrefix = base.replace(/^\d+-/, '')

    const id =
      'hf-' +
      withoutPrefix
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return id || null
  } catch {
    return null
  }
}

/**
 * On Vercel we often receive external Blob/CDN URLs for uploaded icons.
 * Those files are not part of our locally generated `public/icons-sprite.svg`,
 * so `<use href="/icons-sprite.svg#...">` would point to missing symbols.
 * We only use sprite IDs for local SVG media URLs.
 */
export function shouldUseLocalSpriteForMediaUrl(url: string | null | undefined): boolean {
  if (!url) return false

  const lower = url.toLowerCase()
  const isSvg = lower.split('?')[0]?.endsWith('.svg') ?? false
  if (!isSvg) return false

  // Relative/local media paths that are expected in our generated sprite.
  if (lower.startsWith('/media/')) return true
  if (lower.startsWith('media/')) return true

  // Absolute URL on same origin that points into /media.
  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    try {
      const parsed = new URL(url)
      return parsed.pathname.toLowerCase().startsWith('/media/')
    } catch {
      return false
    }
  }

  return false
}

