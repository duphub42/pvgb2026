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

  if (typeof media === 'number' && Number.isFinite(media) && media > 0) {
    return streamPathForId(media)
  }

  if (typeof media === 'object' && media !== null) {
    const idRaw = (media as { id?: unknown }).id
    const idNum =
      typeof idRaw === 'number' && Number.isFinite(idRaw) && idRaw > 0
        ? idRaw
        : typeof idRaw === 'string' && /^\d+$/.test(idRaw)
          ? parseInt(idRaw, 10)
          : null
    if (idNum != null && idNum > 0) {
      return streamPathForId(idNum)
    }
    const fromUrl = getMediaUrlSafe(media)
    if (fromUrl) return fromUrl
  }

  return null
}
