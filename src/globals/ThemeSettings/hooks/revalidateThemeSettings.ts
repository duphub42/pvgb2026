import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from '@/utilities/revalidateCache'

export const revalidateThemeSettings: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    payload.logger?.info?.('Revalidating theme-settings')
    await revalidateTag('global_theme-settings')
  }
  return doc
}
