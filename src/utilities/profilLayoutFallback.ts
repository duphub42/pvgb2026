import type { SitePage } from '@/payload-types'

const shell = {
  blockBackground: 'none' as const,
  blockName: null as string | null,
  blockOverlay: { enabled: false as const, color: 'dark' as const, opacity: 30 },
}

/**
 * Wenn die Profil-Seite in der DB kein Layout hat (oder Payload es nicht liefert),
 * trotzdem die acht Profil-Blöcke rendern (Inhalt kommt aus Komponenten-Fallbacks).
 */
export const profilLayoutFallback: NonNullable<SitePage['layout']> = [
  { ...shell, blockType: 'profilUeberMich' },
  { ...shell, blockType: 'profilKernkompetenz' },
  { ...shell, blockType: 'profilKompetenzen' },
  { ...shell, blockType: 'profilWerdegang' },
  { ...shell, blockType: 'profilZahlenFakten' },
  { ...shell, blockType: 'profilTools' },
  { ...shell, blockType: 'profilLangZert' },
  { ...shell, blockType: 'profilCtaBand' },
] as NonNullable<SitePage['layout']>

export function resolveLayoutBlocks(
  slug: string,
  layout: SitePage['layout'] | null | undefined,
): NonNullable<SitePage['layout']> {
  const arr = Array.isArray(layout) ? layout : []
  if (arr.length > 0) return arr
  if (slug === 'profil') return profilLayoutFallback
  return []
}
