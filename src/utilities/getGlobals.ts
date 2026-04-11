import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  try {
    const global = await payload.findGlobal({
      slug,
      depth,
    })

    return global
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[getGlobal] Failed to load global "${slug}" with depth ${depth}:`, error)
    }
    return null
  }
}

const cachedGlobalGetters = new Map<string, ReturnType<typeof unstable_cache>>()

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * revalidate: 60 keeps PageSpeed good while still updating within 1 min.
 */
export const getCachedGlobal = (slug: Global, depth = 0) => {
  const cacheKey = `${slug}:${depth}`
  let getter = cachedGlobalGetters.get(cacheKey)

  if (!getter) {
    getter = unstable_cache(async () => getGlobal(slug, depth), [slug, String(depth)], {
      revalidate: 60,
      tags: [`global_${slug}`],
    })
    cachedGlobalGetters.set(cacheKey, getter)
  }

  return getter
}
