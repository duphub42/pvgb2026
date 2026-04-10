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
