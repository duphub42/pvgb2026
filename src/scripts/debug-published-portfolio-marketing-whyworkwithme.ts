import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function main() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'site-pages',
    limit: 1,
    pagination: false,
    depth: 0,
    where: {
      and: [{ slug: { equals: 'portfolio-marketing' } }, { _status: { equals: 'published' } }],
    },
    draft: false,
  })

  const doc = pages.docs[0] as any
  const layout = Array.isArray(doc?.layout) ? doc.layout : []
  const block = layout.find(
    (b: any) =>
      b &&
      typeof b === 'object' &&
      b.blockType === 'whyWorkWithMe' &&
      String(b.heading ?? '').trim() === 'Was Marketing-Projekte hier auszeichnet',
  )
  const reasons = Array.isArray(block?.reasons) ? block.reasons : []

  payload.logger.info(`found=${Boolean(block)} reasons=${reasons.length}`)
  payload.logger.info(reasons.map((r: any) => r?.title).join(' | '))
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})

