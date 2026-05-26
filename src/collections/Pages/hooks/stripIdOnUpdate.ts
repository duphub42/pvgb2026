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

const directRelationshipKeys = new Set(['parent'])
const directUploadKeys = new Set([
  'backgroundImage',
  'blockBackgroundImage',
  'coverImage',
  'image',
  'introImage',
  'logo',
  'lottieDark',
  'lottieLight',
  'media',
  'wordmark',
])

function hasId(value: unknown): value is { id: number | string } {
  return (
    Boolean(value && typeof value === 'object' && !Array.isArray(value)) &&
    'id' in (value as Record<string, unknown>) &&
    (typeof (value as Record<string, unknown>).id === 'number' ||
      typeof (value as Record<string, unknown>).id === 'string')
  )
}

/**
 * Rekursiv: konvertiert vollständige Payload-Dokumente in Relationship-/Upload-Feldern
 * auf ihre ID. Block- und Array-Item-IDs bleiben erhalten – Payload braucht sie für Updates.
 */
function normalizePayloadObjects(value: unknown, key?: string): unknown {
  if (value === null || value === undefined) return value
  if (typeof value !== 'object') return value

  if (key && directRelationshipKeys.has(key) && hasId(value)) {
    return value.id
  }

  // Payload admin can send populated upload docs with only a partial media shape.
  if (key && directUploadKeys.has(key) && hasId(value)) {
    return value.id
  }

  if (Array.isArray(value)) {
    const arr = value as unknown[]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = normalizePayloadObjects(arr[i])
    }
    return arr
  }

  // Vollständiges Media-Objekt → auf ID reduzieren
  if (isMediaObject(value)) {
    return (value as Record<string, unknown>).id
  }

  // Normales Objekt: Felder rekursiv verarbeiten (in-place, damit IDs erhalten bleiben)
  const record = value as Record<string, unknown>
  if (typeof record.relationTo === 'string' && hasId(record.value)) {
    record.value = record.value.id
    return record
  }

  for (const key of Object.keys(record)) {
    record[key] = normalizePayloadObjects(record[key], key)
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
  return normalizePayloadObjects(withoutTopLevelId)
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
  if (process.env.PAYLOAD_DEBUG_STRIP_ID === '1') {
    const idPaths = collectIdPaths(data)
    if (idPaths.length) {
      console.log('[stripId] id-Felder VOR Sanitize:\n', idPaths.slice(0, 40).join('\n'))
    }
  }
  const result = sanitizePageData(data)
  if (process.env.PAYLOAD_DEBUG_STRIP_ID === '1') {
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
