/**
 * Processes media resource URL to ensure proper formatting.
 * Uses relative URLs for same-origin paths so server and client render the same src (avoids hydration mismatch).
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Already absolute: return as-is (with optional cacheTag)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Relative path: do not prepend origin so server and client output the same URL (no hydration error)
  return cacheTag ? `${url}?${cacheTag}` : url
}
