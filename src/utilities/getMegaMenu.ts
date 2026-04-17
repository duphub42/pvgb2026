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

function hasDropdownContent(doc: MegaMenuDoc): boolean {
  if (Array.isArray(doc.subItems) && doc.subItems.length > 0) return true

  if (
    Array.isArray(doc.columns) &&
    doc.columns.some((column) => Array.isArray(column?.items) && column.items.length > 0)
  ) {
    return true
  }

  const highlight = doc.highlight
  if (!highlight) return false
  if (typeof highlight.title === 'string' && highlight.title.trim().length > 0) return true
  if (typeof highlight.ctaUrl === 'string' && highlight.ctaUrl.trim().length > 0) return true
  if (Array.isArray(highlight.cards) && highlight.cards.length > 0) return true

  return false
}

function withDropdownFallback(docs: MegaMenuDoc[]): MegaMenuDoc[] {
  const allWithoutDropdowns = docs.length > 0 && docs.every((doc) => !hasDropdownContent(doc))
  if (!allWithoutDropdowns) return docs

  const fallbackByLabel: Record<string, Array<{ label: string; url: string }>> = {
    home: [
      { label: 'Start', url: '/' },
      { label: 'Profil', url: '/profil' },
      { label: 'Kontakt', url: '/kontakt' },
    ],
    leistungen: [
      { label: 'Webdesign', url: '/webdesign' },
      { label: 'SEO', url: '/seo' },
      { label: 'Content', url: '/content' },
    ],
    portfolio: [
      { label: 'Webdesign-Referenzen', url: '/portfolio-webdesign' },
      { label: 'Marketing-Referenzen', url: '/portfolio-marketing' },
      { label: 'Marken-Referenzen', url: '/portfolio-marken' },
    ],
    profil: [
      { label: 'Ueber mich', url: '/profil' },
      { label: 'Preise', url: '/preise' },
      { label: 'Kontakt', url: '/kontakt' },
    ],
    kontakt: [
      { label: 'Kontaktseite', url: '/kontakt' },
      { label: 'Preise', url: '/preise' },
      { label: 'Profil', url: '/profil' },
    ],
    preise: [
      { label: 'Pakete ansehen', url: '/preise' },
      { label: 'Leistungen', url: '/leistungen' },
      { label: 'Kontakt', url: '/kontakt' },
    ],
  }

  return docs.map((doc) => {
    const labelKey = String(doc.label ?? '')
      .trim()
      .toLowerCase()
    const fallbackSubItems = fallbackByLabel[labelKey]
    if (!fallbackSubItems || fallbackSubItems.length === 0) {
      return doc
    }

    return {
      ...doc,
      subItems: fallbackSubItems,
    }
  })
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
      return withDropdownFallback(result.docs as MegaMenuDoc[])
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

    return withDropdownFallback(data.docs)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] REST fallback failed:', msg)
    }
    return []
  }
}
