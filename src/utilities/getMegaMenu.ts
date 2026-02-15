import { unstable_cache } from 'next/cache'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getMegaMenuItems() {
  const getter = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'mega-menu',
        limit: 50,
        depth: 2,
        sort: 'order',
      })
      return result.docs
    },
    ['mega-menu'],
    { tags: ['mega-menu'] },
  )
  return getter()
}
