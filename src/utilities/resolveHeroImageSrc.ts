import { getMediaUrlSafe } from '@/utils/media'

function streamPathForId(id: number): string {
  return `/api/media/stream/${id}`
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
