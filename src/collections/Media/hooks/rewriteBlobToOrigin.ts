import type { CollectionAfterReadHook } from 'payload'

/** Externe Storage-Hosts, die über unseren Origin-Proxy laufen sollen (EWWW braucht eigene Origin). */
const EXTERNAL_STORAGE_HOSTS = [
  'blob.vercel-storage.com',
  'r2.cloudflarestorage.com',
  '.r2.dev',
  's3.amazonaws.com',
  's3.',
]

function isExternalStorageUrl(url: string): boolean {
  if (!url.startsWith('http')) return false
  try {
    const host = new URL(url).hostname.toLowerCase()
    return EXTERNAL_STORAGE_HOSTS.some(
      (h) => host === h || (h.startsWith('.') && host.endsWith(h)),
    )
  } catch {
    return false
  }
}

/**
 * Ersetzt externe Storage-URLs (Blob, R2, S3) durch Origin-Proxy-URLs (/api/media/stream/[id]).
 * Ermöglicht EWWW Easy IO (ExactDN), da das CDN von unserer Origin ziehen muss.
 * Bei context.skipUrlRewrite (z.B. Proxy-Route) wird nicht umgeschrieben.
 */
export const rewriteBlobToOrigin: CollectionAfterReadHook = ({ doc, req }) => {
  if (!doc?.id) return doc
  if ((req as { context?: { skipUrlRewrite?: boolean } })?.context?.skipUrlRewrite) return doc

  const id = String(doc.id)

  if (doc.url && typeof doc.url === 'string' && isExternalStorageUrl(doc.url)) {
    ;(doc as { url: string }).url = `/api/media/stream/${id}`
  }

  if (doc.sizes && typeof doc.sizes === 'object') {
    const sizes = doc.sizes as Record<string, { url?: string }>
    for (const [name, data] of Object.entries(sizes)) {
      if (data?.url && typeof data.url === 'string' && isExternalStorageUrl(data.url)) {
        data.url = `/api/media/stream/${id}?size=${encodeURIComponent(name)}`
      }
    }
  }

  return doc
}
