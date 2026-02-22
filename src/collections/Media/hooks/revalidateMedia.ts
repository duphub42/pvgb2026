import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

/**
 * Nach Upload/Austausch/Löschen von Media: Caches invalidieren, die
 * befüllte Media-Referenzen enthalten (Header, Footer, Design, Mega-Menu etc.).
 * Sonst zeigen Vercel/Next weiterhin alte Bild-URLs aus dem Cache.
 */
const MEDIA_CACHE_TAGS = [
  'global_header',
  'global_footer',
  'global_design',
  'global_theme-settings',
  'mega-menu',
  'pages-sitemap',
  'posts-sitemap',
] as const

export const revalidateAfterMediaChange: CollectionAfterChangeHook = ({ req: { context } }) => {
  if (context?.skipRevalidate) return
  for (const tag of MEDIA_CACHE_TAGS) {
    revalidateTag(tag)
  }
}

export const revalidateAfterMediaDelete: CollectionAfterDeleteHook = ({ req: { context } }) => {
  if (context?.skipRevalidate) return
  for (const tag of MEDIA_CACHE_TAGS) {
    revalidateTag(tag)
  }
}
