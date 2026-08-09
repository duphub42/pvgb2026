import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from '@/utilities/revalidateCache'

import type { SitePage } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<SitePage> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    if (doc._status === 'published') {
      // Routing is flat ([slug]/page.tsx, no [...slug] catch-all anywhere) regardless of
      // what a page's CMS `parent` field says - getPagePath() builds a nested path from
      // that field, which doesn't match any real route and revalidated the wrong (404)
      // URL for any page with a parent set, leaving the actual live page stale.
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      await revalidatePath(path)
      await revalidateTag('pages-sitemap')
      await revalidateTag('site-pages')
      await revalidateTag(`page-${doc.slug === 'home' ? 'home' : doc.slug}`)
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      await revalidatePath(oldPath)
      await revalidateTag('pages-sitemap')
      await revalidateTag('site-pages')
      await revalidateTag(`page-${previousDoc.slug === 'home' ? 'home' : previousDoc.slug}`)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<SitePage> = async ({
  doc,
  req: { context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    await revalidatePath(path)
    await revalidateTag('pages-sitemap')
    await revalidateTag('site-pages')
    await revalidateTag(`page-${doc?.slug === 'home' ? 'home' : doc?.slug}`)
  }

  return doc
}
