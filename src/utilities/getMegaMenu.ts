import { unstable_cache } from 'next/cache'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getMegaMenuItems() {
  const getter = unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
          collection: 'mega-menu',
          limit: 50,
          // Nested icon/image relations in columns/highlight need deeper population.
          depth: 4,
          sort: 'order',
        })
        const docs = result.docs as unknown as Array<Record<string, unknown>>
        const stats = docs.reduce<{
          totalMediaRefs: number
          numericRefs: number
          objectWithUrl: number
          objectWithFilledUrl: number
          samples: string[]
        }>(
          (acc, doc) => {
            const subItems = Array.isArray(doc?.subItems) ? (doc.subItems as Array<Record<string, unknown>>) : []
            const columns = Array.isArray(doc?.columns) ? (doc.columns as Array<Record<string, unknown>>) : []
            const colItems = columns.flatMap((c) =>
              Array.isArray(c?.items) ? (c.items as Array<Record<string, unknown>>) : [],
            )
            const all = [...subItems, ...colItems]
            for (const item of all) {
              const media = (item?.image ?? item?.icon) as unknown
              if (media == null) continue
              acc.totalMediaRefs += 1
              if (typeof media === 'number') acc.numericRefs += 1
              if (typeof media === 'object' && media != null && 'url' in media) {
                acc.objectWithUrl += 1
                const rawUrl = (media as { url?: unknown }).url
                if (typeof rawUrl === 'string' && rawUrl.trim() !== '') {
                  acc.objectWithFilledUrl += 1
                  if (acc.samples.length < 5) acc.samples.push(rawUrl)
                }
              }
            }
            return acc
          },
          { totalMediaRefs: 0, numericRefs: 0, objectWithUrl: 0, objectWithFilledUrl: 0, samples: [] as string[] },
        )
        console.info('[debug-icons][mega-menu]', {
          items: docs.length,
          ...stats,
        })
        return result.docs
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        if (process.env.NODE_ENV === 'development') {
          console.error('[getMegaMenu] Failed to load mega-menu (e.g. missing DB column highlight_position):', msg)
        }
        return []
      }
    },
    // Include a version token so stale cached shallow payloads are invalidated.
    ['mega-menu', 'depth-4-v2'],
    { tags: ['mega-menu'] },
  )
  return getter()
}
