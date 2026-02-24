import type { Payload } from 'payload'

const RELATION_COLLECTIONS = ['site-pages', 'blog-posts', 'media'] as const
type RelationCollection = (typeof RELATION_COLLECTIONS)[number]

/** Set von existierenden IDs pro Collection (IDs als String für einheitlichen Lookup). */
type ExistenceCache = Map<RelationCollection, Set<string>>

function idKey(id: number | string): string {
  return String(id)
}

/**
 * Sammelt alle (collection, id)-Referenzen aus dem Dokument (ein Durchlauf, keine DB).
 */
function collectRefs(
  value: unknown,
  out: Map<RelationCollection, Set<string>>,
): void {
  if (value == null) return

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) collectRefs(value[i], out)
    return
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>

    // Polymorphe Relationship: { relationTo: 'site-pages', value: 21 }
    if (
      'relationTo' in obj &&
      'value' in obj &&
      typeof obj.relationTo === 'string' &&
      RELATION_COLLECTIONS.includes(obj.relationTo as RelationCollection)
    ) {
      const id = obj.value
      if (id != null && id !== '') {
        const coll = obj.relationTo as RelationCollection
        if (!out.has(coll)) out.set(coll, new Set())
        out.get(coll)!.add(idKey(id))
      }
      return
    }

    const directRels: Record<string, RelationCollection> = {
      parent: 'site-pages',
      image: 'media',
      footerLogo: 'media',
    }
    for (const [key, collection] of Object.entries(directRels)) {
      const val = obj[key]
      if (val != null && (typeof val === 'number' || typeof val === 'string')) {
        if (!out.has(collection)) out.set(collection, new Set())
        out.get(collection)!.add(idKey(val))
      }
    }

    for (const key of Object.keys(obj)) {
      collectRefs(obj[key], out)
    }
  }
}

/**
 * Führt pro Collection eine Batch-Abfrage aus (id in [...]), liefert Set der existierenden IDs.
 * Reduziert N Roundtrips auf maximal 3 (eine pro Collection).
 */
async function buildExistenceCache(
  payload: Payload,
  data: Record<string, unknown>,
): Promise<ExistenceCache> {
  const refs = new Map<RelationCollection, Set<string>>()
  collectRefs(data, refs)

  const cache: ExistenceCache = new Map()
  for (const coll of RELATION_COLLECTIONS) {
    cache.set(coll, new Set())
  }

  for (const [collection, ids] of refs) {
    if (ids.size === 0) continue
    const idList = Array.from(ids)
    // Payload/Postgres: id oft number; IDs für Abfrage passend typisieren
    const queryIds = idList.map((s) => (/^\d+$/.test(s) ? parseInt(s, 10) : s))
    try {
      const result = await payload.find({
        collection,
        where: { id: { in: queryIds } },
        limit: queryIds.length,
        depth: 0,
        overrideAccess: true,
      })
      const existing = new Set<string>()
      for (const doc of result.docs) {
        if (doc?.id != null) existing.add(idKey(doc.id))
      }
      cache.set(collection, existing)
    } catch {
      // Bei Fehler: keine IDs als existierend markieren, Hook bereinigt sie
      cache.set(collection, new Set())
    }
  }

  return cache
}

type TraverseContext = { parent?: Record<string, unknown>; parentKey?: string }

/**
 * Entfernt Referenzen, die nicht in cache existieren (ein Durchlauf, nur Lookups, keine DB).
 */
function clearOrphanedRefsInValueWithCache(
  value: unknown,
  cache: ExistenceCache,
  ctx?: TraverseContext,
): boolean {
  if (value == null) return false

  if (Array.isArray(value)) {
    let changed = false
    for (let i = 0; i < value.length; i++) {
      if (clearOrphanedRefsInValueWithCache(value[i], cache, { parent: value as Record<string, unknown>, parentKey: String(i) })) changed = true
    }
    return changed
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>

    if (
      'relationTo' in obj &&
      'value' in obj &&
      typeof obj.relationTo === 'string' &&
      RELATION_COLLECTIONS.includes(obj.relationTo as RelationCollection)
    ) {
      const id = obj.value
      if (id != null && id !== '') {
        const coll = obj.relationTo as RelationCollection
        const existing = cache.get(coll)
        if (!existing?.has(idKey(id))) {
          obj.value = null
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

    const directRels: Record<string, RelationCollection> = {
      parent: 'site-pages',
      image: 'media',
      footerLogo: 'media',
    }
    for (const [key, collection] of Object.entries(directRels)) {
      const val = obj[key]
      if (val != null && (typeof val === 'number' || typeof val === 'string')) {
        const existing = cache.get(collection)
        if (!existing?.has(idKey(val))) {
          obj[key] = null
          return true
        }
      }
    }

    let changed = false
    for (const key of Object.keys(obj)) {
      if (
        clearOrphanedRefsInValueWithCache(obj[key], cache, {
          parent: obj,
          parentKey: key,
        })
      )
        changed = true
    }
    return changed
  }

  return false
}

/**
 * afterRead-Hook: Entfernt verwaiste Relationship-Referenzen vor der Anzeige im Admin.
 * Verwendet Batch-Cache, damit viele Links nicht zu vielen DB-Roundtrips führen.
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
    const cache = await buildExistenceCache(req.payload, doc as Record<string, unknown>)
    clearOrphanedRefsInValueWithCache(doc, cache)
    return doc
  }
}

/**
 * beforeValidate-Hook: Entfernt verwaiste Referenzen vor der Validierung.
 * Einmaliger Batch-Check statt N einzelner findByID – verhindert langsames Speichern auf Neon/Vercel.
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
    const cache = await buildExistenceCache(req.payload, data)
    clearOrphanedRefsInValueWithCache(data, cache)
    return data
  }
}

/**
 * beforeChange-Hook: Entfernt verwaiste Referenzen (Fallback falls beforeValidate zu spät).
 * Nutzt denselben Batch-Ansatz wie beforeValidate.
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
    const cache = await buildExistenceCache(req.payload, data)
    clearOrphanedRefsInValueWithCache(data, cache)
    return data
  }
}
