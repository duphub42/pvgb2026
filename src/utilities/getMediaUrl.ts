/** Site origin for same-origin check (no trailing slash). */
function getSiteOrigin(): string | null {
  if (typeof process === 'undefined') return null
  const u = process.env.NEXT_PUBLIC_SERVER_URL
  if (u) return u.replace(/\/$/, '')
  const v = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return v ? `https://${v}` : null
}

function getExactDnHost(): string | null {
  if (typeof process === 'undefined') return null
  const domain = process.env.NEXT_PUBLIC_EXACTDN_DOMAIN?.trim()
  if (!domain) return null
  return domain.replace(/^https?:\/\//, '').split('/')[0]?.toLowerCase() ?? null
}

function isSameOriginMediaHost(hostname: string): boolean {
  const host = hostname.toLowerCase()
  const siteHost = getSiteHost()
  if (siteHost != null && host === siteHost.toLowerCase()) return true
  if (host === 'localhost' || host === '127.0.0.1') return true
  const exactDnHost = getExactDnHost()
  if (exactDnHost && host === exactDnHost) return true
  if (host.endsWith('.exactdn.com')) return true
  return false
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

function normalizeMediaPath(pathWithSearch: string): string {
  const [pathPart, rawQuery] = pathWithSearch.split('?')
  const mediaMatch = pathPart?.match(/^\/media\/(.+)$/)
  const normalizedPath = mediaMatch?.[1] ? `/api/media/file/${mediaMatch[1]}` : pathPart ?? pathWithSearch

  if (rawQuery == null || rawQuery === '') return normalizedPath

  const params = new URLSearchParams(rawQuery)
  params.delete('v')
  const rest = params.toString()
  return rest ? `${normalizedPath}?${rest}` : normalizedPath
}

/** Cache-bust query value safe for `/_next/image?url=…` (no colons / double-encoding). */
function formatCacheTag(cacheTag: string): string {
  const trimmed = cacheTag.trim()
  if (!trimmed) return ''

  const ms = Date.parse(trimmed)
  if (!Number.isNaN(ms)) return String(ms)

  return encodeURIComponent(trimmed)
}

/**
 * Processes media resource URL to ensure proper formatting.
 * Uses same-origin relative paths so Next.js Image can optimize via `/_next/image`.
 * External CDN URLs (Blob, etc.) are kept as-is.
 *
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const appendTag = (base: string): string => {
    if (!cacheTag || cacheTag === '') return base
    const tag = formatCacheTag(cacheTag)
    if (!tag) return base
    return `${base}${base.includes('?') ? '&' : '?'}v=${tag}`
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url)
      const mediaPath = `${parsed.pathname}${parsed.search}`
      const isLocalHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
      const isSameHost = isSameOriginMediaHost(parsed.hostname)
      // Normalize media URLs to same-origin relative paths.
      // This avoids broken absolute localhost URLs stored in content exports,
      // rewrites legacy ExactDN absolute URLs, but keeps external Blob/CDN URLs intact.
      if (
        (isSameHost && parsed.pathname.startsWith('/api/media/')) ||
        (isSameHost && parsed.pathname.startsWith('/media/'))
      ) {
        const normalizedPath = normalizeMediaPath(mediaPath)
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
    return appendTag(url)
  }
  if (url.startsWith('/api/media/')) {
    return appendTag(url)
  }
  if (url.startsWith('/media/')) {
    return appendTag(normalizeMediaPath(url))
  }
  return appendTag(url)
}
