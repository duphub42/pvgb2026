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

