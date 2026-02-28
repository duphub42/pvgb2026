import { getMediaUrl } from '@/utilities/getMediaUrl'

/**
 * Sicheres Auflösen einer Media-URL aus verschiedenen Daten-Formen (Payload, string, Objekt mit url).
 * Gibt '' zurück, wenn die URL nicht ermittelt werden kann.
 */
export function getMediaUrlSafe(media: unknown): string {
  if (media == null) return ''
  if (typeof media === 'string') return getMediaUrl(media) || ''
  if (typeof media === 'object' && media !== null && 'url' in media) {
    const u = (media as { url?: string | null }).url
    return u != null ? getMediaUrl(String(u)) || '' : ''
  }
  return ''
}
