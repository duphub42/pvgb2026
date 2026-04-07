import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from '@/utilities/revalidateCache'

import type { BlogPost } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<BlogPost> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      await revalidatePath(path)
      await revalidateTag('posts-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      await revalidatePath(oldPath)
      await revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<BlogPost> = async ({
  doc,
  req: { context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    const path = `/posts/${doc?.slug}`

    await revalidatePath(path)
    await revalidateTag('posts-sitemap')
  }

  return doc
}
