import { getMediaUrlSafe } from '@/utils/media'

function streamPathForId(id: number): string {
  return `/api/media/stream/${id}`
}

function normalizeRelativeMediaPath(path: string): string {
  const trimmed = path.trim()
  if (!trimmed.startsWith('/media/')) return trimmed
  const filename = trimmed.slice('/media/'.length).split('?')[0]
  if (!filename) return trimmed
  const query = trimmed.includes('?') ? trimmed.slice(trimmed.indexOf('?')) : ''
  return `/api/media/file/${filename}${query}`
}

function resolveRelativeMediaPath(media: unknown): string | null {
  if (media == null || media === '') return null

  if (typeof media === 'string') {
    const value = media.trim()
    if (!value) return null
    if (/^\d+$/.test(value)) return streamPathForId(parseInt(value, 10))
    if (value.startsWith('/api/media/')) return value
    if (value.startsWith('/media/')) return normalizeRelativeMediaPath(value)
    if (value.startsWith('http://') || value.startsWith('https://')) {
      try {
        const parsed = new URL(value)
        if (parsed.pathname.startsWith('/api/media/')) {
          return `${parsed.pathname}${parsed.search}`
        }
        if (parsed.pathname.startsWith('/media/')) {
          return normalizeRelativeMediaPath(`${parsed.pathname}${parsed.search}`)
        }
      } catch {
        return null
      }
    }
    return null
  }

  if (typeof media === 'number' && Number.isFinite(media) && media > 0) {
    return streamPathForId(media)
  }

  if (typeof media === 'object' && media !== null) {
    const record = media as Record<string, unknown>
    const idRaw = record.id ?? record._id ?? record.documentId ?? record.mediaId

    if (typeof idRaw === 'number' && idRaw > 0) return streamPathForId(idRaw)
    if (typeof idRaw === 'string' && /^\d+$/.test(idRaw)) {
      return streamPathForId(parseInt(idRaw, 10))
    }

    const url = record.url ?? record.src ?? record.source ?? record.path
    if (typeof url === 'string' && url.trim()) {
      return resolveRelativeMediaPath(url)
    }
  }

  return null
}

/**
 * Same-origin media path for next/image (skips ExactDN rewrite).
 * Keeps /_next/image optimization and preload hints aligned with SSR output.
 */
export function resolveHeroImageSrcForNextImage(media: unknown): string | null {
  return resolveRelativeMediaPath(media)
}

/**
 * URL für Hero-Portraits (Popout-SVG u. a.).
 * Bevorzugt /api/media/stream/:id (Same-Origin, kein CORS bei externem Storage),
 * sonst direkter url-Pfad aus Payload.
 */
export function resolveHeroImageSrc(media: unknown): string | null {
  if (media == null || media === '') return null

  // Direkter String (URL oder ID)
  if (typeof media === 'string') {
    const t = media.trim()
    if (!t) return null
    if (/^\d+$/.test(t)) return streamPathForId(parseInt(t, 10))
    if (t.startsWith('/') || t.startsWith('http')) {
      const safe = getMediaUrlSafe(t) || t
      return safe || null
    }
    return null
  }

  // Direkte Zahl (ID)
  if (typeof media === 'number' && Number.isFinite(media) && media > 0) {
    return streamPathForId(media)
  }

  // Objekt (Payload Media Relation)
  if (typeof media === 'object' && media !== null) {
    const m = media as Record<string, unknown>

    // ID aus verschiedenen möglichen Feldern
    const idRaw = m.id ?? m._id ?? m.documentId ?? m.mediaId
    if (typeof idRaw === 'number' && idRaw > 0) {
      return streamPathForId(idRaw)
    }
    if (typeof idRaw === 'string' && /^\d+$/.test(idRaw)) {
      return streamPathForId(parseInt(idRaw, 10))
    }

    // Direkte URL
    const url = m.url ?? m.src ?? m.source ?? m.path
    if (typeof url === 'string' && url.trim()) {
      const safe = getMediaUrlSafe(url) || url
      return safe || null
    }

    // Versuch über getMediaUrlSafe
    const fromUrl = getMediaUrlSafe(media)
    if (fromUrl) return fromUrl
  }

  return null
}
