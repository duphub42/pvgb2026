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
          depth: 2,
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
    ['mega-menu'],
    { tags: ['mega-menu'] },
  )
  return getter()
}
