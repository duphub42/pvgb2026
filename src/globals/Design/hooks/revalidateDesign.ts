import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateDesign: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    payload.logger.info(`Revalidating design`)
    revalidateTag('global_design')
  }
  return doc
}
