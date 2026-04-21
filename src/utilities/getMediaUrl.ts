/** Optional ExactDN domain, e.g. aeqkxfkxm9vw.exactdn.com */
const EXACTDN_DOMAIN =
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

function toExactDn(pathOrUrl: string): string {
  const exactdn = EXACTDN_DOMAIN?.replace(/^https?:\/\//, '').trim()
  if (!exactdn) return pathOrUrl

  if (pathOrUrl.startsWith('/')) {
    return `https://${exactdn}${pathOrUrl}`
  }

  try {
    const parsed = new URL(pathOrUrl)
    return `https://${exactdn}${parsed.pathname}${parsed.search}`
  } catch {
    return pathOrUrl
  }
}


/**
 * Processes media resource URL to ensure proper formatting.
 * Uses relative URLs for same-origin paths so server and client render the same src (avoids hydration mismatch).
 * If NEXT_PUBLIC_EXACTDN_DOMAIN is set, media paths are rewritten to ExactDN.
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

  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url)
      const mediaPath = `${parsed.pathname}${parsed.search}`
      const siteHost = getSiteHost()
      const isLocalHost =
        parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
      const isSameHost = siteHost != null && parsed.hostname === siteHost
      // Normalize media URLs to same-origin relative paths.
      // This avoids broken absolute localhost URLs stored in content exports,
      // but keeps external Blob/CDN URLs intact.
      if (
        (isLocalHost || isSameHost) &&
        parsed.pathname.startsWith('/api/media/') ||
        ((isLocalHost || isSameHost) && parsed.pathname.startsWith('/media/'))
      ) {
        const normalizedPath = parsed.pathname.startsWith('/api/media/file/')
          ? (
              !isVercelRuntime && isLocalHost
                  ? localApiMediaToPublicMedia(mediaPath)
                  : mediaPath
            )
          : mediaPath
        if (
          isLocalHost &&
          mediaDebugSeen.size < 30 &&
          !mediaDebugSeen.has(url)
        ) {
          mediaDebugSeen.add(url)
          console.info('[debug-media][normalize-absolute-local]', {
            input: url,
            output: normalizedPath,
          })
        }
        const cdnOrLocal =
          normalizedPath.startsWith('/api/media/') || normalizedPath.startsWith('/media/')
            ? toExactDn(normalizedPath)
            : normalizedPath
        return appendTag(cdnOrLocal)
      }
    } catch {
      // keep original URL below if parsing fails
    }
    return appendTag(url)
  }
  if (url.startsWith('/api/media/file/')) {
    const normalizedPath = isVercelRuntime ? url : localApiMediaToPublicMedia(url)
    return appendTag(toExactDn(normalizedPath))
  }
  if (url.startsWith('/api/media/') || url.startsWith('/media/')) {
    return appendTag(toExactDn(url))
  }
  return appendTag(url)
}
