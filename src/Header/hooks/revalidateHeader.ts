import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from '@/utilities/revalidateCache'

export const revalidateHeader: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    payload.logger.info(`Revalidating header`)

    await revalidateTag('global_header')
  }

  return doc
}
