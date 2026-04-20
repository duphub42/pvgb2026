import type { SitePage } from '@/payload-types'

export function resolveLayoutBlocks(
  _slug: string,
  layout: SitePage['layout'] | null | undefined,
): NonNullable<SitePage['layout']> {
  return Array.isArray(layout) ? layout : []
}
