import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Reason = {
  id?: string
  icon?: string
  title?: string
  description?: string
}

type LayoutBlock = {
  id?: string
  blockType?: string
  heading?: string | null
  reasons?: Reason[] | null
  [key: string]: unknown
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  // Ensure the script terminates even if background tasks keep handles open
  payload.logger.info('Loaded Payload, fetching page...')

  const page = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'portfolio-marketing' } },
    depth: 0,
    limit: 1,
    pagination: false,
    draft: true,
  })

  const doc = page.docs[0]
  if (!doc) {
    throw new Error('site-pages slug=portfolio-marketing not found')
  }

  const layout = Array.isArray(doc.layout) ? (doc.layout as unknown[]) : []

  const nextLayout = layout.map((block) => {
    if (!block || typeof block !== 'object') return block
    const typed = block as LayoutBlock
    if (typed.blockType !== 'whyWorkWithMe') return block
    if (String(typed.heading ?? '').trim() !== 'Was Marketing-Projekte hier auszeichnet') return block

    const reasons = Array.isArray(typed.reasons) ? typed.reasons : []
    const hasConversionFocus = reasons.some(
      (r) => String(r?.title ?? '').trim().toLowerCase() === 'conversion-fokus',
    )
    if (hasConversionFocus) return block

    return {
      ...typed,
      reasons: [
        ...reasons,
        {
          icon: 'zap',
          title: 'Conversion-Fokus',
          description:
            'Landingpages & Funnel so optimieren, dass aus Traffic qualifizierte Anfragen werden.',
        },
      ],
    }
  })

  const changed = JSON.stringify(layout) !== JSON.stringify(nextLayout)
  if (!changed) {
    // Nothing to do (block missing or already updated)
    payload.logger.info('No change needed (already updated or block not found).')
    return
  }

  await payload.update({
    collection: 'site-pages',
    id: doc.id,
    data: {
      layout: nextLayout as never,
      _status: 'published' as never,
    },
    draft: false,
  })

  payload.logger.info('Updated page: portfolio-marketing (whyWorkWithMe reasons).')
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
}).finally(() => {
  process.exit()
})

