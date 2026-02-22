import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Entfernt `id` aus den Daten bei Update – verhindert "The following field is invalid: id"
 * beim Speichern im Admin (z. B. auf Vercel/Postgres). Die zu aktualisierende Dokument-ID
 * kommt aus der Request-URL, nicht aus dem Body.
 */
export const stripIdOnUpdate: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'update' && data && typeof data === 'object' && 'id' in data) {
    const { id: _id, ...rest } = data as Record<string, unknown> & { id: unknown }
    return rest
  }
  return data
}
