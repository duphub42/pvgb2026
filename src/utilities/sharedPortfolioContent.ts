import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { SitePage } from '@/payload-types'

type LayoutBlocks = NonNullable<SitePage['layout']>
type LayoutBlock = Record<string, unknown> & {
  blockType?: string
  bentoGap?: unknown
  bentoRowHeight?: unknown
  cases?: unknown
  eyebrow?: unknown
  galleryColumns?: unknown
  heading?: unknown
  intro?: unknown
  layoutVariant?: unknown
  rows?: unknown
}

const TARGET_SLUGS = new Set(['portfolio', 'leistungen', 'webdesign'])

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

async function getSharedPortfolioBlocksUncached() {
  const payload = await getPayload({ config: configPromise })

  const [webdesign, branding] = await Promise.all([
    payload.find({
      collection: 'site-pages',
      where: {
        and: [{ slug: { equals: 'portfolio-webdesign' } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      pagination: false,
      depth: 2,
      draft: false,
    }),
    payload.find({
      collection: 'site-pages',
      where: {
        and: [{ slug: { equals: 'portfolio-marken' } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      pagination: false,
      depth: 2,
      draft: false,
    }),
  ])

  const webdesignLayout = (webdesign.docs[0] as SitePage | undefined)?.layout ?? []
  const brandingLayout = (branding.docs[0] as SitePage | undefined)?.layout ?? []

  return {
    casesBlock: webdesignLayout.find((block) => block?.blockType === 'portfolioCaseGrid') as
      | LayoutBlock
      | undefined,
    logosBlock: brandingLayout.find((block) => block?.blockType === 'marqueeSlider') as
      | LayoutBlock
      | undefined,
  }
}

const getSharedPortfolioBlocks = unstable_cache(
  getSharedPortfolioBlocksUncached,
  ['shared-portfolio-content'],
  {
    revalidate: false,
    tags: ['site-pages'],
  },
)

function withSharedCases(block: LayoutBlock, source?: LayoutBlock): LayoutBlock {
  const cases = Array.isArray(source?.cases) ? clone(source.cases) : []
  if (!source || cases.length === 0) return block

  return {
    ...block,
    eyebrow: source.eyebrow ?? block.eyebrow,
    heading: source.heading ?? block.heading,
    intro: source.intro ?? block.intro,
    layoutVariant: source.layoutVariant ?? block.layoutVariant,
    cases,
  }
}

function withSharedLogos(block: LayoutBlock, source?: LayoutBlock): LayoutBlock {
  const rows = Array.isArray(source?.rows) ? clone(source.rows) : []
  if (!source || rows.length === 0) return block

  return {
    ...block,
    eyebrow: source.eyebrow ?? block.eyebrow,
    heading: source.heading ?? block.heading,
    intro: source.intro ?? block.intro,
    displayMode: 'bento',
    galleryColumns: source.galleryColumns ?? block.galleryColumns ?? '4',
    bentoShowCounter: true,
    bentoCounterLabel: 'Logos',
    bentoGap: block.bentoGap ?? 'default',
    bentoRowHeight: block.bentoRowHeight ?? 'md',
    bentoMobileFlattenSpans: true,
    rows,
  }
}

function buildSharedCaseBlock(source?: LayoutBlock): LayoutBlock | null {
  if (!source) return null

  return withSharedCases(
    {
      id: 'shared-portfolio-cases',
      blockType: 'portfolioCaseGrid',
      blockSpacingPadding: 'default',
      blockSpacingPaddingTop: 'default',
      blockSpacingMarginBottom: 'default',
      blockContainer: 'default',
      blockBackground: 'none',
      eyebrow: source.eyebrow ?? 'Ausgewählte Projekte',
      heading: source.heading ?? 'Ergebnisse aus realen Projekten',
      intro: source.intro,
      layoutVariant: source.layoutVariant ?? 'visual',
      cases: [],
    } as LayoutBlock,
    source,
  )
}

function buildSharedLogoBlock(source?: LayoutBlock): LayoutBlock | null {
  if (!source) return null

  return withSharedLogos(
    {
      id: 'shared-brand-logos',
      blockType: 'marqueeSlider',
      blockSpacingPadding: 'default',
      blockSpacingPaddingTop: 'default',
      blockSpacingMarginBottom: 'none',
      blockContainer: 'default',
      blockBackground: 'none',
      eyebrow: source.eyebrow ?? 'Referenzen',
      heading: source.heading ?? 'Erstellte Logos',
      intro: source.intro,
      displayMode: 'bento',
      rows: [],
    } as LayoutBlock,
    source,
  )
}

export async function resolveSharedPortfolioContent(
  slug: string,
  blocks: LayoutBlocks,
): Promise<LayoutBlocks> {
  if (!TARGET_SLUGS.has(slug)) return blocks

  const { casesBlock, logosBlock } = await getSharedPortfolioBlocks()
  const hasCasesBlock = blocks.some((block) => block?.blockType === 'portfolioCaseGrid')
  const hasLogosBlock = blocks.some((block) => block?.blockType === 'marqueeSlider')

  const resolved = blocks.map((block) => {
    if (!block || typeof block !== 'object') return block
    const typedBlock = block as LayoutBlock

    if (typedBlock.blockType === 'portfolioCaseGrid') return withSharedCases(typedBlock, casesBlock)
    if (typedBlock.blockType === 'marqueeSlider') return withSharedLogos(typedBlock, logosBlock)

    return block
  })

  if (slug === 'webdesign') {
    const additions: LayoutBlock[] = []
    const caseBlock = !hasCasesBlock ? buildSharedCaseBlock(casesBlock) : null
    const logoBlock = !hasLogosBlock ? buildSharedLogoBlock(logosBlock) : null

    if (caseBlock) additions.push(caseBlock)
    if (logoBlock) additions.push(logoBlock)

    return [...resolved, ...additions] as LayoutBlocks
  }

  return resolved as LayoutBlocks
}
