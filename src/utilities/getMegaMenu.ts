import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

type MegaMenuDoc = {
  label?: string | null
  url?: string | null
  subItems?: Array<{ label?: string | null; url?: string | null }>
  columns?: Array<{ items?: Array<{ label?: string | null; url?: string | null }> }>
  highlight?: {
    title?: string | null
    ctaUrl?: string | null
    cards?: Array<{ title?: string | null; ctaUrl?: string | null }>
  } | null
}

export async function getMegaMenuItems() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'mega-menu',
      limit: 50,
      // Nested icon/image relations in columns/highlight need deeper population.
      depth: 4,
      sort: 'order',
    })

    if (Array.isArray(result.docs) && result.docs.length > 0) {
      return result.docs as MegaMenuDoc[]
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] Local API failed, trying REST fallback:', msg)
    }
  }

  try {
    const serverURL = getServerSideURL()
    const response = await fetch(`${serverURL}/api/mega-menu?limit=50&depth=4&sort=order`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[getMegaMenu] REST fallback failed with status:', response.status)
      }
      return []
    }

    const data = (await response.json()) as { docs?: MegaMenuDoc[] }
    if (!Array.isArray(data?.docs)) return []

    return data.docs
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] REST fallback failed:', msg)
    }
    return []
  }
}
