import type { CollectionBeforeValidateHook } from 'payload'

import {
  getPortfolioPresetHero,
  getPortfolioPresetLayout,
  isPlaceholderLayout,
  isPortfolioType,
} from '../portfolioPresets'

type MutablePageData = {
  hero?: unknown
  layout?: unknown
  portfolioType?: unknown
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value))

export const applyPortfolioPreset: CollectionBeforeValidateHook = ({ data, operation, originalDoc }) => {
  if (!isObject(data)) return data

  const mutable = data as MutablePageData
  const original = isObject(originalDoc) ? (originalDoc as MutablePageData) : undefined

  const incomingType =
    typeof mutable.portfolioType === 'string' ? mutable.portfolioType : undefined
  const existingType =
    typeof original?.portfolioType === 'string' ? original.portfolioType : undefined
  const effectiveType = incomingType ?? existingType

  if (!isPortfolioType(effectiveType)) return data

  const incomingLayout = Array.isArray(mutable.layout)
  const currentLayout = incomingLayout ? mutable.layout : original?.layout
  const typeChanged =
    operation === 'update' && incomingType !== undefined && incomingType !== existingType
  const layoutIsPlaceholder = isPlaceholderLayout(currentLayout)

  if ((operation === 'create' || typeChanged || layoutIsPlaceholder) && !incomingLayout) {
    mutable.layout = getPortfolioPresetLayout(effectiveType)
  }

  const incomingHero = isObject(mutable.hero)
  const currentHero = incomingHero ? mutable.hero : original?.hero
  const heroLooksEmpty = !isObject(currentHero) || currentHero.type === 'none'

  if ((operation === 'create' || typeChanged) && !incomingHero && heroLooksEmpty) {
    mutable.hero = getPortfolioPresetHero(effectiveType)
  }

  return mutable
}
