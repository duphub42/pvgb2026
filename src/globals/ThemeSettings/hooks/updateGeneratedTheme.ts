import type { GlobalBeforeChangeHook } from 'payload'
import { generateCssString, generateJsonTheme } from '@/utils/themeGenerator'

const DEFAULT_PRIMARY = '#3B82F6'

export const updateGeneratedTheme: GlobalBeforeChangeHook = async ({ data }) => {
  const primary = (data?.primaryColor as string)?.trim() || DEFAULT_PRIMARY
  const hex = primary.startsWith('#') ? primary : `#${primary}`
  const primaryMatchesBase = Boolean(data?.primaryMatchesBase)
  data.generatedTheme = generateJsonTheme(hex, primaryMatchesBase) as unknown as Record<string, unknown>
  data.cssString = generateCssString(hex, primaryMatchesBase)
  data.updatedAt = new Date().toISOString()
  return data
}
