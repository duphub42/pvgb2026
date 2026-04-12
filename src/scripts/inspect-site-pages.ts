import './load-env-import'
import { getPayload } from 'payload'
import config from '@payload-config'

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

async function main() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'site-pages',
    limit: 500,
    depth: 2,
    overrideAccess: true,
  })

  const issues: unknown[] = []

  docs.forEach((doc) => {
    const docRecord = asRecord(doc)
    const layout = docRecord?.layout
    if (!Array.isArray(layout)) {
      issues.push({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        issue: 'layout-not-array',
        layout,
      })
      return
    }

    layout.forEach((block: unknown, idx: number) => {
      if (!block || typeof block !== 'object' || Array.isArray(block)) {
        issues.push({
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          idx,
          issue: 'block-not-object',
          block,
        })
        return
      }
      if (!('blockType' in block)) {
        issues.push({
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          idx,
          issue: 'missing-blockType',
          block,
        })
      }
      if ('type' in block && !('blockType' in block)) {
        issues.push({
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          idx,
          issue: 'has-type-no-blockType',
          block,
        })
      }
    })

    const parent = docRecord?.parent
    if (parent != null) {
      const parentRecord = asRecord(parent)
      const parentId =
        parentRecord && 'id' in parentRecord
          ? parentRecord.id
          : parent
      if (parentId != null && typeof parentId !== 'number' && typeof parentId !== 'string') {
        issues.push({
          id: doc.id,
          title: doc.title,
          slug: doc.slug,
          issue: 'parent-invalid',
          parent,
        })
      }
    }
  })

  console.log(JSON.stringify(issues, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
