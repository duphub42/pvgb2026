import type { CollectionAfterReadHook } from 'payload'

import type { SitePage } from '../../../payload-types'

function isBlockObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

function normalizeBlockObject(block: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = { ...block }

  if (!('blockType' in normalized) && 'type' in normalized) {
    normalized.blockType = String(normalized.type)
  }

  if (!('blockName' in normalized)) {
    normalized.blockName = null
  }

  return normalized
}

/**
 * Stellt sicher, dass layout immer ein Array ist (nie null/undefined).
 * Verhindert leere/abstürzende Bearbeitungsansicht bei älteren Dokumenten.
 */
export const normalizeLayout: CollectionAfterReadHook<SitePage> = ({ doc }) => {
  if (!doc || !Array.isArray(doc.layout)) {
    if (doc) doc.layout = []
    return doc
  }

  const normalizedLayout = doc.layout
    .map((block) => {
      if (!isBlockObject(block)) return null
      if (!('blockType' in block) && !('type' in block)) return null
      return normalizeBlockObject(block)
    })
    .filter((block): block is Record<string, unknown> => block !== null)

  doc.layout = normalizedLayout as unknown as SitePage['layout']

  return doc
}
