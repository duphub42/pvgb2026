import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from '@/utilities/revalidateCache'

export const revalidateRedirects: CollectionAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (context?.disableRevalidate || context?.skipRevalidate) return doc
  payload.logger.info(`Revalidating redirects`)
  await revalidateTag('redirects')
  return doc
}
