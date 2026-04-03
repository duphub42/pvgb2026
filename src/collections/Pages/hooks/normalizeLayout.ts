import type { CollectionAfterReadHook } from 'payload'

import type { SitePage } from '../../../payload-types'

/**
 * Stellt sicher, dass layout immer ein Array ist (nie null/undefined).
 * Verhindert leere/abstürzende Bearbeitungsansicht bei älteren Dokumenten.
 */
export const normalizeLayout: CollectionAfterReadHook<SitePage> = ({ doc }) => {
  if (doc && !Array.isArray(doc.layout)) {
    doc.layout = []
  }
  return doc
}
