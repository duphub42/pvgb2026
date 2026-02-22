import type { Payload } from 'payload'

const RELATION_COLLECTIONS = ['site-pages', 'blog-posts', 'media'] as const

async function docExists(
  payload: Payload,
  collection: (typeof RELATION_COLLECTIONS)[number],
  id: number | string,
): Promise<boolean> {
  try {
    await payload.findByID({
      collection,
      id,
      depth: 0,
      overrideAccess: true,
    })
    return true
  } catch {
    return false
  }
}

type TraverseContext = { parent?: Record<string, unknown>; parentKey?: string }

/**
 * Rekursiv: Entfernt Referenzen auf nicht existierende Dokumente.
 * Behebt "document with ID X could not be found" und "id is invalid" beim Speichern.
 * Link-Felder mit kaputtem Reference werden auf type: 'custom' + url: '#' umgestellt,
 * damit die Validierung (reference required) nicht fehlschlägt.
 */
async function clearOrphanedRefsInValue(
  value: unknown,
  payload: Payload,
  ctx?: TraverseContext,
): Promise<boolean> {
  if (value == null) return false

  if (Array.isArray(value)) {
    let changed = false
    for (let i = 0; i < value.length; i++) {
      const itemChanged = await clearOrphanedRefsInValue(value[i], payload, ctx)
      if (itemChanged) changed = true
    }
    return changed
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>

    // Polymorphe Relationship: { relationTo: 'site-pages', value: 21 } (z. B. link.reference)
    if (
      'relationTo' in obj &&
      'value' in obj &&
      typeof obj.relationTo === 'string' &&
      RELATION_COLLECTIONS.includes(obj.relationTo as (typeof RELATION_COLLECTIONS)[number])
    ) {
      const id = obj.value
      if (id != null && id !== '') {
        const exists = await docExists(
          payload,
          obj.relationTo as (typeof RELATION_COLLECTIONS)[number],
          id as number | string,
        )
        if (!exists) {
          obj.value = null
          // Link-Feld: reference ist required bei type 'reference' – auf custom umstellen, damit Speichern funktioniert
          const parent = ctx?.parent
          if (parent && 'type' in parent && parent.type === 'reference' && 'reference' in parent) {
            parent.type = 'custom'
            parent.url = (parent.url as string) || '#'
            parent.label = (parent.label as string) || '(Link gelöscht)'
            delete parent.reference
          }
          return true
        }
      }
      return false
    }

    // Direkte Relationships (z. B. parent bei site-pages, meta.image, footerLogo)
    const directRels: Record<string, (typeof RELATION_COLLECTIONS)[number]> = {
      parent: 'site-pages',
      image: 'media',
      footerLogo: 'media',
    }
    for (const [key, collection] of Object.entries(directRels)) {
      const val = obj[key]
      if (val != null && (typeof val === 'number' || typeof val === 'string')) {
        const exists = await docExists(payload, collection, val)
        if (!exists) {
          obj[key] = null
          return true
        }
      }
    }

    // Rekursiv in alle Eigenschaften
    let changed = false
    for (const key of Object.keys(obj)) {
      const itemChanged = await clearOrphanedRefsInValue(obj[key], payload, {
        parent: obj,
        parentKey: key,
      })
      if (itemChanged) changed = true
    }
    return changed
  }

  return false
}

/**
 * afterRead-Hook: Entfernt verwaiste Relationship-Referenzen vor der Anzeige im Admin.
 * Verhindert "document could not be found" beim Laden.
 */
export function createClearOrphanedRefsAfterReadHook<T extends Record<string, unknown>>() {
  return async ({
    doc,
    req,
  }: {
    doc: T
    req: { payload: Payload }
  }): Promise<T> => {
    if (!doc || !req?.payload) return doc
    await clearOrphanedRefsInValue(doc, req.payload)
    return doc
  }
}

/**
 * beforeValidate-Hook: Entfernt verwaiste Referenzen vor der Validierung.
 * Läuft vor beforeChange – wichtig, damit "id is invalid" nicht mehr auftritt.
 */
export function createClearOrphanedRefsBeforeValidateHook() {
  return async ({
    data,
    req,
  }: {
    data: Record<string, unknown>
    req: { payload: Payload }
  }): Promise<Record<string, unknown>> => {
    if (!data || !req?.payload) return data
    await clearOrphanedRefsInValue(data, req.payload)
    return data
  }
}

/**
 * beforeChange-Hook: Entfernt verwaiste Referenzen (Fallback falls beforeValidate zu spät).
 * Verhindert "id is invalid" beim Speichern.
 */
export function createClearOrphanedRefsBeforeChangeHook() {
  return async ({
    data,
    req,
  }: {
    data: Record<string, unknown>
    req: { payload: Payload }
  }): Promise<Record<string, unknown>> => {
    if (!data || !req?.payload) return data
    await clearOrphanedRefsInValue(data, req.payload)
    return data
  }
}
