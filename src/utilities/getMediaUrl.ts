/** ExactDN/CDN: ausgeschaltet – Bilder werden lokal (Same-Origin) ausgeliefert. Zum Aktivieren NEXT_PUBLIC_EXACTDN_DOMAIN setzen und den Block unten wieder einkommentieren. */
const EXACTDN_DOMAIN: string | undefined = undefined
// const EXACTDN_DOMAIN = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_EXACTDN_DOMAIN : undefined

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
 * Aktuell: lokale Bilder (kein ExactDN-Rewrite). Bei Bedarf NEXT_PUBLIC_EXACTDN_DOMAIN setzen und EXACTDN_DOMAIN oben aus env lesen.
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

  // ExactDN-Rewrite deaktiviert (EXACTDN_DOMAIN = undefined). Für CDN: EXACTDN_DOMAIN aus env setzen und Block aktivieren.
  // if (exactdn) {
  //   if (url.startsWith('/')) {
  //     const cdnUrl = `https://${exactdn.replace(/^https?:\/\//, '')}${url}`
  //     return appendTag(cdnUrl)
  //   }
  //   if (origin && (url === origin || url.startsWith(origin + '/'))) {
  //     try {
  //       const parsed = new URL(url)
  //       const pathAndSearch = parsed.pathname + parsed.search
  //       const cdnUrl = `https://${exactdn.replace(/^https?:\/\//, '')}${pathAndSearch}`
  //       return appendTag(cdnUrl)
  //     } catch {}
  //   }
  // }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return appendTag(url)
  }
  return appendTag(url)
}
