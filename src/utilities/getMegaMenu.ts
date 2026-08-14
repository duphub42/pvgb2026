import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

type MegaMenuDoc = {
  id?: number | string
  label?: string | null
  url?: string | null
  order?: number | null
  icon?: unknown
  image?: unknown
  appearance?: 'link' | 'button' | null
  columnWidths?: { col1?: number; col2?: number; col3?: number } | null
  categoryDescription?: { title?: string | null; description?: string | null } | null
  subItems?: Array<{
    label?: string | null
    url?: string | null
    icon?: unknown
    image?: unknown
    badge?: string | null
    badgeColor?: string | null
    description?: string | null
    dividerBefore?: boolean
  }>
  columns?: Array<{
    title?: string | null
    columnWidth?: number | null
    dividerBefore?: boolean
    columnBackground?: string | null
    backgroundImage?: unknown
    overlayOpacity?: number | null
    items?: Array<{
      label?: string | null
      url?: string | null
      description?: string | null
      icon?: unknown
      image?: unknown
      badge?: string | null
      badgeColor?: string | null
    }>
  }>
  highlight?: {
    position?: 'right' | 'below' | null
    background?: 'default' | 'image' | 'gradient' | null
    backgroundImage?: unknown
    overlayOpacity?: number | null
    cards?: Array<{
      title?: string | null
      description?: string | null
      icon?: unknown
      image?: unknown
      ctaLabel?: string | null
      ctaUrl?: string | null
    }> | null
    title?: string | null
    description?: string | null
    icon?: unknown
    image?: unknown
    ctaLabel?: string | null
    ctaUrl?: string | null
  } | null
}

/** Keep only fields the MegaMenu client reads — shrinks RSC/HTML payload. */
function slimMediaRef(media: unknown): unknown {
  if (media == null || typeof media !== 'object') return media
  if (typeof media === 'number') return media

  const m = media as Record<string, unknown>
  return {
    url: typeof m.url === 'string' ? m.url : null,
    id: typeof m.id === 'number' ? m.id : undefined,
    updatedAt: typeof m.updatedAt === 'string' ? m.updatedAt : null,
    filename: typeof m.filename === 'string' ? m.filename : null,
    alt: typeof m.alt === 'string' ? m.alt : null,
    mimeType: typeof m.mimeType === 'string' ? m.mimeType : null,
    filesize: typeof m.filesize === 'number' ? m.filesize : null,
    width: typeof m.width === 'number' ? m.width : null,
    height: typeof m.height === 'number' ? m.height : null,
  }
}

function slimMegaMenuDoc(doc: MegaMenuDoc): MegaMenuDoc {
  return {
    id: doc.id,
    label: doc.label,
    url: doc.url,
    order: doc.order,
    icon: slimMediaRef(doc.icon),
    image: slimMediaRef(doc.image),
    appearance: doc.appearance,
    columnWidths: doc.columnWidths,
    categoryDescription: doc.categoryDescription,
    subItems: doc.subItems?.map((item) => ({
      ...item,
      icon: slimMediaRef(item.icon),
      image: slimMediaRef(item.image),
    })),
    columns: doc.columns?.map((col) => ({
      ...col,
      backgroundImage: slimMediaRef(col.backgroundImage),
      items: col.items?.map((item) => ({
        ...item,
        icon: slimMediaRef(item.icon),
        image: slimMediaRef(item.image),
      })),
    })),
    highlight: doc.highlight
      ? {
          ...doc.highlight,
          backgroundImage: slimMediaRef(doc.highlight.backgroundImage),
          icon: slimMediaRef(doc.highlight.icon),
          image: slimMediaRef(doc.highlight.image),
          cards: doc.highlight.cards?.map((card) => ({
            ...card,
            icon: slimMediaRef(card.icon),
            image: slimMediaRef(card.image),
          })),
        }
      : null,
  }
}

const MEGA_MENU_DEPTH = 2
const MEGA_MENU_SHELL_DEPTH = 0

export type MegaMenuShellDoc = {
  id?: number | string
  label?: string | null
  url?: string | null
  order?: number | null
  appearance?: 'link' | 'button' | null
  hasDropdown?: boolean
}

function slimMegaMenuShellDoc(doc: MegaMenuDoc): MegaMenuShellDoc {
  return {
    id: doc.id,
    label: doc.label,
    url: doc.url,
    order: doc.order,
    appearance: doc.appearance,
    // Lets the fast shell render the same dropdown chevron as the fully hydrated
    // menu, so swapping shell -> real menu doesn't reflow the nav item widths.
    hasDropdown:
      (Array.isArray(doc.columns) && doc.columns.length > 0) ||
      (Array.isArray(doc.subItems) && doc.subItems.length > 0) ||
      // `highlight` is a Payload group field, so it's always a (possibly empty)
      // object — check its content, not just presence, matching the real menu's
      // own hasDropdown() logic in components/MegaMenu/index.tsx.
      (doc.highlight != null &&
        (doc.highlight.title != null || doc.highlight.ctaUrl != null)),
  }
}

export async function getMegaMenuItems() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'mega-menu',
      limit: 50,
      depth: MEGA_MENU_DEPTH,
      sort: 'order',
    })

    if (Array.isArray(result.docs) && result.docs.length > 0) {
      return result.docs.map((doc) => slimMegaMenuDoc(doc as MegaMenuDoc))
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] Local API failed, trying REST fallback:', msg)
    }
  }

  try {
    const serverURL = getServerSideURL()
    const response = await fetch(
      `${serverURL}/api/mega-menu?limit=50&depth=${MEGA_MENU_DEPTH}&sort=order`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[getMegaMenu] REST fallback failed with status:', response.status)
      }
      return []
    }

    const data = (await response.json()) as { docs?: MegaMenuDoc[] }
    if (!Array.isArray(data?.docs)) return []

    return data.docs.map(slimMegaMenuDoc)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] REST fallback failed:', msg)
    }
    return []
  }
}

export async function getMegaMenuShellItems() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'mega-menu',
      limit: 50,
      depth: MEGA_MENU_SHELL_DEPTH,
      sort: 'order',
      select: {
        label: true,
        url: true,
        order: true,
        appearance: true,
        // Only the array lengths are needed to know whether the chevron should
        // show, so select minimal subfields instead of the full block content.
        columns: { id: true },
        subItems: { label: true },
        highlight: { title: true, ctaUrl: true },
      },
    })

    if (Array.isArray(result.docs) && result.docs.length > 0) {
      return result.docs.map((doc) => slimMegaMenuShellDoc(doc as MegaMenuDoc))
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] Shell Local API failed, trying REST fallback:', msg)
    }
  }

  try {
    const serverURL = getServerSideURL()
    const response = await fetch(
      `${serverURL}/api/mega-menu?limit=50&depth=${MEGA_MENU_SHELL_DEPTH}&sort=order&select[label]=true&select[url]=true&select[order]=true&select[appearance]=true&select[columns][id]=true&select[subItems][label]=true&select[highlight][title]=true&select[highlight][ctaUrl]=true`,
      {
        next: { revalidate: 300 },
      },
    )

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[getMegaMenu] Shell REST fallback failed with status:', response.status)
      }
      return []
    }

    const data = (await response.json()) as { docs?: MegaMenuDoc[] }
    if (!Array.isArray(data?.docs)) return []

    return data.docs.map(slimMegaMenuShellDoc)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (process.env.NODE_ENV === 'development') {
      console.error('[getMegaMenu] Shell REST fallback failed:', msg)
    }
    return []
  }
}
