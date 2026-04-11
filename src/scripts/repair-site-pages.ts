import './load-env-import'
import { getPayload } from 'payload'
import config from '../payload.config.ts'

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

function normalizeLayout(layout: unknown): unknown[] {
  if (!Array.isArray(layout)) return []

  return layout
    .map((block) => {
      if (!isBlockObject(block)) return null
      if (!('blockType' in block) && !('type' in block)) return null
      return normalizeBlockObject(block)
    })
    .filter((block): block is Record<string, unknown> => block !== null)
}

async function main() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'site-pages',
    limit: 500,
    depth: 2,
    overrideAccess: true,
  })

  if (!docs.length) {
    console.log('Keine site-pages gefunden.')
    return
  }

  let updatedCount = 0

  for (const doc of docs) {
    const normalizedLayout = normalizeLayout(doc.layout)
    if (Array.isArray(doc.layout) && JSON.stringify(normalizedLayout) === JSON.stringify(doc.layout)) {
      continue
    }

    const data: Record<string, unknown> = { layout: normalizedLayout }
    await payload.update({
      collection: 'site-pages',
      id: doc.id,
      data,
      overrideAccess: true,
      depth: 0,
      context: { skipRevalidate: true },
    })
    updatedCount += 1
    console.log(`Repaired site-pages/${doc.id} (${doc.title ?? 'no title'})`)
  }

  console.log(`Fertig: ${updatedCount} Seite(n) repariert.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
