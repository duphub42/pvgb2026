import { getPayload } from 'payload'
import configPromise from '@payload-config'

type KpiItem = {
  id?: string
  value?: string | null
  label?: string | null
  icon?: string | null
  [key: string]: unknown
}

type LayoutBlock = {
  id?: string
  blockType?: string
  items?: KpiItem[] | null
  [key: string]: unknown
}

const ICON_BY_LABEL: Record<string, string> = {
  'Organischer Traffic': 'trending-up',
  'Cost per Lead': 'target',
  'ROAS (Peak)': 'bar-chart-3',
}

async function main() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('Loaded Payload, fetching page...')

  const page = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'home' } },
    depth: 0,
    limit: 1,
    pagination: false,
    draft: true,
  })

  const doc = page.docs[0]
  if (!doc) {
    throw new Error('site-pages slug=home not found')
  }

  const layout = Array.isArray(doc.layout) ? (doc.layout as unknown[]) : []

  const nextLayout = layout.map((block) => {
    if (!block || typeof block !== 'object') return block
    const typed = block as LayoutBlock
    if (typed.blockType !== 'portfolioKpiStrip') return block

    const items = Array.isArray(typed.items) ? typed.items : []
    const nextItems = items.map((item) => {
      const label = String(item?.label ?? '').trim()
      const icon = ICON_BY_LABEL[label]
      if (!icon || item.icon === icon) return item
      return { ...item, icon }
    })

    return { ...typed, items: nextItems }
  })

  const changed = JSON.stringify(layout) !== JSON.stringify(nextLayout)
  if (!changed) {
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

  payload.logger.info('Updated page: portfolio-marketing (portfolioKpiStrip icons).')
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    process.exit()
  })
