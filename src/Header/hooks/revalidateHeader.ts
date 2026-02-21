import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header')
  }

  return doc
}
