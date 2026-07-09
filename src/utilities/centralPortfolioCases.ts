/** Slug der Seite, auf der der zentrale Portfolio-Slider gepflegt wird. */
export const CENTRAL_PORTFOLIO_PAGE_SLUG = 'leistungen'

/** Block-Name im Payload-Admin – nur hier Cases pflegen, alle Slider lesen zur Laufzeit mit. */
export const CENTRAL_PORTFOLIO_BLOCK_NAME = 'Zentrale Portfolio-Referenzen'

export type PortfolioCaseGridBlock = Record<string, unknown> & {
  blockType?: string
  blockName?: string
  cases?: unknown[]
}

export function isCentralPortfolioCaseBlock(block: unknown): block is PortfolioCaseGridBlock {
  if (!block || typeof block !== 'object') return false
  const typed = block as PortfolioCaseGridBlock
  return (
    typed.blockType === 'portfolioCaseGrid' &&
    String(typed.blockName ?? '') === CENTRAL_PORTFOLIO_BLOCK_NAME
  )
}

export function findCentralPortfolioCaseBlock(
  layout: unknown,
): PortfolioCaseGridBlock | undefined {
  if (!Array.isArray(layout)) return undefined

  const blocks = layout.filter(
    (block): block is PortfolioCaseGridBlock => Boolean(block && typeof block === 'object'),
  )

  return (
    blocks.find(isCentralPortfolioCaseBlock) ??
    blocks.find((block) => block.blockType === 'portfolioCaseGrid')
  )
}

/** Entfernt verschachtelte `id`-Felder für saubere Payload-Updates. */
export function stripNestedIds<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => stripNestedIds(entry)) as T
  }

  if (!value || typeof value !== 'object') return value

  const result: Record<string, unknown> = {}
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (key === 'id') continue
    result[key] = stripNestedIds(entry)
  }

  return result as T
}

export function buildCentralPortfolioCaseBlock(
  source: PortfolioCaseGridBlock,
): PortfolioCaseGridBlock {
  const sanitized = stripNestedIds(source)

  return {
    ...sanitized,
    blockType: 'portfolioCaseGrid',
    blockName: CENTRAL_PORTFOLIO_BLOCK_NAME,
    blockSpacingPadding: sanitized.blockSpacingPadding ?? 'default',
    blockSpacingPaddingTop: sanitized.blockSpacingPaddingTop ?? 'default',
    blockSpacingMarginBottom: sanitized.blockSpacingMarginBottom ?? 'default',
    blockContainer: sanitized.blockContainer ?? 'default',
    blockBackground: sanitized.blockBackground ?? 'muted',
    eyebrow: sanitized.eyebrow ?? 'Ausgewählte Cases',
    heading: sanitized.heading ?? 'Ergebnisse aus realen Projekten',
    intro:
      sanitized.intro ??
      'Eine Auswahl realer Kundenprojekte aus Webdesign, Marketing und Branding.',
    layoutVariant: sanitized.layoutVariant ?? 'editorial',
    cases: Array.isArray(sanitized.cases) ? sanitized.cases : [],
  }
}
