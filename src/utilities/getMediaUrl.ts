/** ExactDN/CDN: ausgeschaltet – Bilder werden lokal (Same-Origin) ausgeliefert. Zum Aktivieren NEXT_PUBLIC_EXACTDN_DOMAIN setzen und den Block unten wieder einkommentieren. */
const _EXACTDN_DOMAIN =
  typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_EXACTDN_DOMAIN : undefined

/** Site origin for same-origin check (no trailing slash). Used only when ExactDN is enabled. */
function getSiteOrigin(): string | null {
  if (typeof process === 'undefined') return null
  const u = process.env.NEXT_PUBLIC_SERVER_URL
  if (u) return u.replace(/\/$/, '')
  const v = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return v ? `https://${v}` : null
}

const mediaDebugSeen = new Set<string>()

function getSiteHost(): string | null {
  const origin = getSiteOrigin()
  if (!origin) return null
  try {
    return new URL(origin).hostname
  } catch {
    return null
  }
}

function localApiMediaToPublicMedia(pathWithSearch: string): string {
  const [pathPart, queryPart] = pathWithSearch.split('?')
  const match = pathPart?.match(/^\/api\/media\/file\/(.+)$/)
  if (!match?.[1]) return pathWithSearch
  const normalizedPath = `/media/${match[1]}`
  return queryPart != null && queryPart !== '' ? `${normalizedPath}?${queryPart}` : normalizedPath
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
  const isVercelRuntime = process.env.VERCEL === '1' || process.env.VERCEL === 'true'

  const encodedTag = cacheTag && cacheTag !== '' ? encodeURIComponent(cacheTag) : null

  const appendTag = (base: string): string =>
    encodedTag ? `${base}${base.includes('?') ? '&' : '?'}v=${encodedTag}` : base

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
    try {
      const parsed = new URL(url)
      const mediaPath = `${parsed.pathname}${parsed.search}`
      const siteHost = getSiteHost()
      const isLocalHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
      const isSameHost = siteHost != null && parsed.hostname === siteHost
      // Normalize media URLs to same-origin relative paths.
      // This avoids broken absolute localhost URLs stored in content exports,
      // but keeps external Blob/CDN URLs intact.
      if (
        ((isLocalHost || isSameHost) && parsed.pathname.startsWith('/api/media/')) ||
        ((isLocalHost || isSameHost) && parsed.pathname.startsWith('/media/'))
      ) {
        const normalizedPath = parsed.pathname.startsWith('/api/media/file/')
          ? !isVercelRuntime && isLocalHost
            ? localApiMediaToPublicMedia(mediaPath)
            : mediaPath
          : mediaPath
        if (isLocalHost && mediaDebugSeen.size < 30 && !mediaDebugSeen.has(url)) {
          mediaDebugSeen.add(url)
          console.info('[debug-media][normalize-absolute-local]', {
            input: url,
            output: normalizedPath,
          })
        }
        return appendTag(normalizedPath)
      }
    } catch {
      // keep original URL below if parsing fails
    }
    return appendTag(url)
  }
  if (url.startsWith('/api/media/file/')) {
    if (isVercelRuntime) return appendTag(url)
    return appendTag(localApiMediaToPublicMedia(url))
  }
  if (url.startsWith('/api/media/')) return appendTag(url)
  return appendTag(url)
}
