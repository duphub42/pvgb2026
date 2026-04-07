import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from '@/utilities/revalidateCache'

export const revalidateFooter: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    payload.logger.info(`Revalidating footer`)

    await revalidateTag('global_footer')
  }

  return doc
}
