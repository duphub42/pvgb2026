import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * revalidate: 60 keeps PageSpeed good while still updating within 1 min.
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  // Include depth in cache key so different callers don't reuse shallow results.
  unstable_cache(async () => getGlobal(slug, depth), [slug, String(depth)], {
    revalidate: 60,
    tags: [`global_${slug}`],
  })
