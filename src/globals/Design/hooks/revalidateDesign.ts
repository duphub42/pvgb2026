import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from '@/utilities/revalidateCache'

export const revalidateDesign: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    payload.logger.info(`Revalidating design`)
    await revalidateTag('global_design')
  }
  return doc
}
