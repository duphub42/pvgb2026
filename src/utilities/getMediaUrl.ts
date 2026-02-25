const EXACTDN_DOMAIN = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_EXACTDN_DOMAIN : undefined

/** Site origin for same-origin check (no trailing slash). Used only when ExactDN is enabled. */
function getSiteOrigin(): string | null {
  if (typeof process === 'undefined') return null
  const u = process.env.NEXT_PUBLIC_SERVER_URL
  if (u) return u.replace(/\/$/, '')
  const v = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return v ? `https://${v}` : null
}

/**
 * Processes media resource URL to ensure proper formatting.
 * Uses relative URLs for same-origin paths so server and client render the same src (avoids hydration mismatch).
 * When NEXT_PUBLIC_EXACTDN_DOMAIN is set (EWWW Easy IO), same-origin image URLs are rewritten to the ExactDN CDN
 * for compression, WebP/AVIF, and resizing via query params (e.g. ?w=400).
 *
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const encodedTag = cacheTag && cacheTag !== '' ? encodeURIComponent(cacheTag) : null

  const exactdn = EXACTDN_DOMAIN?.trim()
  const origin = exactdn ? getSiteOrigin() : null

  const appendTag = (base: string): string =>
    encodedTag ? `${base}${base.includes('?') ? '&' : '?'}${encodedTag}` : base

  // Rewrite to ExactDN when configured
  if (exactdn) {
    // Relative path → serve via ExactDN (CDN pulls from site origin)
    if (url.startsWith('/')) {
      const cdnUrl = `https://${exactdn.replace(/^https?:\/\//, '')}${url}`
      return appendTag(cdnUrl)
    }
    // Absolute URL that is our origin → path through ExactDN
    if (origin && (url === origin || url.startsWith(origin + '/'))) {
      try {
        const parsed = new URL(url)
        const pathAndSearch = parsed.pathname + parsed.search
        const cdnUrl = `https://${exactdn.replace(/^https?:\/\//, '')}${pathAndSearch}`
        return appendTag(cdnUrl)
      } catch {
        // invalid URL, fall through to default
      }
    }
  }

  // Default: no ExactDN or external URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return appendTag(url)
  }
  return appendTag(url)
}
