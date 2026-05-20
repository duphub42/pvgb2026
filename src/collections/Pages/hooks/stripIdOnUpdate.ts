import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload'

/**
 * Prüft, ob ein Wert ein vollständiges Payload-Media-Objekt ist (statt einer ID).
 * Media-Objekte haben id + url + mimeType. Beim Speichern dürfen Upload-Felder nur
 * die ID enthalten – alles andere verursacht "The following field is invalid: id".
 */
function isMediaObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const r = value as Record<string, unknown>
  return (
    ('id' in r && (typeof r.id === 'number' || typeof r.id === 'string')) &&
    'url' in r &&
    'mimeType' in r
  )
}

/**
 * Rekursiv: konvertiert alle vollständigen Media-Objekte im Dokument auf ihre ID.
 * Behandelt Objekte, Arrays und primitive Werte. Block- und Array-Item-IDs (UUID-Strings
 * ohne url/mimeType) werden NICHT angefasst – Payload braucht sie für Updates.
 */
function normalizeMediaObjects(value: unknown): unknown {
  if (value === null || value === undefined) return value
  if (typeof value !== 'object') return value

  if (Array.isArray(value)) {
    // Array in-place mutieren (keine neuen Referenzen für Item-Objekte erzeugen,
    // damit Payload-IDs erhalten bleiben)
    const arr = value as unknown[]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = normalizeMediaObjects(arr[i])
    }
    return arr
  }

  // Vollständiges Media-Objekt → auf ID reduzieren
  if (isMediaObject(value)) {
    return (value as Record<string, unknown>).id
  }

  // Normales Objekt: Felder rekursiv verarbeiten (in-place, damit IDs erhalten bleiben)
  const record = value as Record<string, unknown>
  for (const key of Object.keys(record)) {
    record[key] = normalizeMediaObjects(record[key])
  }
  return record
}

/**
 * Entfernt `id` aus dem Top-Level des Dokuments – verhindert "The following field is invalid: id".
 * Unconditional (nicht nur bei 'update'), damit auch Autosave-Drafts korrekt behandelt werden.
 */
function stripTopLevelId(data: unknown): unknown {
  if (data && typeof data === 'object' && !Array.isArray(data) && 'id' in data) {
    const { id: _id, ...rest } = data as Record<string, unknown> & { id: unknown }
    return rest
  }
  return data
}

function sanitizePageData(data: unknown): unknown {
  const withoutTopLevelId = stripTopLevelId(data)
  return normalizeMediaObjects(withoutTopLevelId)
}

function collectIdPaths(value: unknown, path = ''): string[] {
  if (!value || typeof value !== 'object') return []
  if (Array.isArray(value)) {
    const out: string[] = []
    ;(value as unknown[]).forEach((v, i) => {
      out.push(...collectIdPaths(v, `${path}[${i}]`))
    })
    return out
  }
  const record = value as Record<string, unknown>
  const out: string[] = []
  if ('id' in record) out.push(`${path}.id = ${JSON.stringify(record.id).slice(0, 60)}`)
  for (const key of Object.keys(record)) {
    if (key !== 'id') out.push(...collectIdPaths(record[key], `${path}.${key}`))
  }
  return out
}

export const stripIdOnUpdateBeforeValidate: CollectionBeforeValidateHook = ({ data }) => {
  if (process.env.NODE_ENV !== 'production') {
    const idPaths = collectIdPaths(data)
    if (idPaths.length) {
      console.log('[stripId] id-Felder VOR Sanitize:\n', idPaths.slice(0, 40).join('\n'))
    }
  }
  const result = sanitizePageData(data)
  if (process.env.NODE_ENV !== 'production') {
    const idPathsAfter = collectIdPaths(result)
    if (idPathsAfter.length) {
      console.log('[stripId] id-Felder NACH Sanitize:\n', idPathsAfter.slice(0, 40).join('\n'))
    }
  }
  return result
}

export const stripIdOnUpdate: CollectionBeforeChangeHook = ({ data }) => {
  return sanitizePageData(data)
}
