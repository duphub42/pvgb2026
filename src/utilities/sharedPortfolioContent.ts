import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { SitePage } from '@/payload-types'
import { buildLeistungenPortfolioCaseBlock } from '@/utilities/leistungenPortfolioCases'
import { buildPortfolioTeaserBlock } from '@/utilities/portfolioHubBlocks'

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
  services?: unknown
  id?: unknown
}

const TARGET_SLUGS = new Set(['portfolio', 'leistungen', 'webdesign', 'logo'])
const IRRELEVANT_PORTFOLIO_SERVICE_TITLES = new Set([
  'Digital Consulting',
  'Webentwicklung & Apps',
  'Branding & Design',
  'Marketing & Automatisierung',
])

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

async function getSharedPortfolioBlocksUncached() {
  const payload = await getPayload({ config: configPromise })

  const [leistungen, webdesign, branding] = await Promise.all([
    payload.find({
      collection: 'site-pages',
      where: {
        and: [{ slug: { in: ['leistungen', 'lei'] } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      pagination: false,
      depth: 2,
      draft: false,
      sort: '-updatedAt',
    }),
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

  const leistungenLayout = (leistungen.docs[0] as SitePage | undefined)?.layout ?? []
  const webdesignLayout = (webdesign.docs[0] as SitePage | undefined)?.layout ?? []
  const brandingLayout = (branding.docs[0] as SitePage | undefined)?.layout ?? []

  const leistungenCasesBlock = leistungenLayout.find(
    (block) => block?.blockType === 'portfolioCaseGrid',
  ) as LayoutBlock | undefined
  const webdesignCasesBlock = webdesignLayout.find(
    (block) => block?.blockType === 'portfolioCaseGrid',
  ) as LayoutBlock | undefined

  return {
    leistungenCasesBlock:
      leistungenCasesBlock ??
      (buildLeistungenPortfolioCaseBlock() as LayoutBlock),
    webdesignCasesBlock,
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

  const rawEyebrow = String(source.eyebrow ?? '').trim()
  const rawHeading = String(source.heading ?? '').trim()
  const rawIntro = String(source.intro ?? '').trim()
  const normalizedRawIntro = rawIntro.replace(/\s*\n+\s*/g, ' ')

  const eyebrow =
    !rawEyebrow || rawEyebrow === 'Ausgewählte Cases' ? 'Kundenprojekte im Fokus' : rawEyebrow

  const heading =
    !rawHeading ||
    rawHeading === 'Ergebnisse aus realen Projekten' ||
    rawHeading === 'Projekte mit System – nicht nur Oberfläche'
      ? 'Ausgewählte Kundenprojekte mit klarem Ergebnisfokus'
      : rawHeading

  const intro =
    !normalizedRawIntro ||
    normalizedRawIntro ===
      'Eine Auswahl repräsentativer Projekte aus allen Bereichen. Jeder Case zeigt Problem, Designentscheidungen und messbares Ergebnis.'
      ? 'Diese Referenzen zeigen, wie aus Strategie, Design und Umsetzung konkrete Resultate entstehen. Jeder Case macht nachvollziehbar, welche Ausgangslage vorlag, welche Entscheidungen getroffen wurden und welche messbaren Effekte daraus entstanden sind.'
      : normalizedRawIntro

  return {
    ...block,
    eyebrow,
    heading,
    intro,
    layoutVariant: source.layoutVariant ?? block.layoutVariant,
    cases,
  }
}

function isIrrelevantPortfolioServicesOverview(block: LayoutBlock): boolean {
  if (block.blockType !== 'servicesOverview') return false
  const services = Array.isArray(block.services) ? block.services : []
  if (!services.length) return false

  return services.some((entry) => {
    if (!entry || typeof entry !== 'object') return false
    const title = String((entry as Record<string, unknown>).title ?? '').trim()
    return IRRELEVANT_PORTFOLIO_SERVICE_TITLES.has(title)
  })
}

function isPortfolioHubReplacementBlock(block: LayoutBlock): boolean {
  if (block.blockType === 'introduction') return true
  if (block.blockType === 'servicesGrid') return true
  if (block.blockType === 'whyWorkWithMe') return true
  if (isIrrelevantPortfolioServicesOverview(block)) return true

  if (block.blockType === 'servicesOverview') {
    const heading = String(block.heading ?? '').trim()
    if (heading.includes('Strategie, Sichtbarkeit')) return true
  }

  if (String(block.id ?? '') === 'portfolio-under-cases-context') return true

  return false
}

function getLayoutBlock(blocks: LayoutBlocks, blockType: string): LayoutBlock | undefined {
  const match = blocks.find((block) => block?.blockType === blockType)
  if (!match || typeof match !== 'object') return undefined
  return match as LayoutBlock
}

function resolvePortfolioHubCaseBlock(
  existing: LayoutBlock | undefined,
  leistungenCasesBlock: LayoutBlock,
): LayoutBlock {
  const cases = Array.isArray(leistungenCasesBlock.cases) ? clone(leistungenCasesBlock.cases) : []

  return {
    ...(existing ?? {}),
    id: existing?.id ?? 'portfolio-hub-cases',
    blockType: 'portfolioCaseGrid',
    blockSpacingPadding: existing?.blockSpacingPadding ?? 'default',
    blockSpacingPaddingTop: existing?.blockSpacingPaddingTop ?? 'default',
    blockSpacingMarginBottom: existing?.blockSpacingMarginBottom ?? 'default',
    blockContainer: existing?.blockContainer ?? 'default',
    blockBackground: existing?.blockBackground ?? 'muted',
    eyebrow: leistungenCasesBlock.eyebrow,
    heading: leistungenCasesBlock.heading,
    intro: leistungenCasesBlock.intro,
    layoutVariant: leistungenCasesBlock.layoutVariant ?? existing?.layoutVariant ?? 'editorial',
    cases,
  }
}

function findLastServicesGridIndex(blocks: LayoutBlocks): number {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i]?.blockType === 'servicesGrid') return i
  }
  return -1
}

function resolvePortfolioHubLayout(
  blocks: LayoutBlocks,
  leistungenCasesBlock: LayoutBlock,
  logosBlock?: LayoutBlock,
): LayoutBlocks {
  const cleaned = blocks.filter((block) => {
    if (!block || typeof block !== 'object') return true
    return !isPortfolioHubReplacementBlock(block as LayoutBlock)
  }) as LayoutBlocks

  const calPopupBlocks = cleaned.filter((block) => block?.blockType === 'calPopup')

  const teaser = getLayoutBlock(cleaned, 'portfolioTeaser') ?? (buildPortfolioTeaserBlock() as LayoutBlock)
  const cases = resolvePortfolioHubCaseBlock(
    getLayoutBlock(cleaned, 'portfolioCaseGrid'),
    leistungenCasesBlock,
  )
  const underCases = buildPortfolioUnderCasesBlock()

  const existingLogos = getLayoutBlock(cleaned, 'marqueeSlider')
  const logos = existingLogos
    ? withSharedLogos(existingLogos, logosBlock)
    : buildSharedLogoBlock(logosBlock)

  const restored: LayoutBlock[] = [teaser, cases, underCases]
  if (logos) restored.push(logos)

  return [...restored, ...calPopupBlocks] as LayoutBlocks
}

function buildPortfolioUnderCasesBlock(): LayoutBlock {
  return {
    id: 'portfolio-under-cases-context',
    blockType: 'servicesOverview',
    blockSpacingPadding: 'default',
    blockSpacingPaddingTop: 'default',
    blockSpacingMarginBottom: 'sm',
    blockContainer: 'default',
    blockBackground: 'none',
    headerAlign: 'center',
    layoutMode: 'columns',
    services: [
      {
        icon: 'code',
        title: 'Webdesign mit messbarer Anfragewirkung',
        description:
          'Ein starker Webauftritt wirkt nur dann nachhaltig, wenn Inhalt, Nutzerführung und Technik als System geplant werden. Die gezeigten Cases zeigen, wie aus klarer Struktur und performanter Umsetzung konkrete Anfragen entstehen. Gute Gestaltung ist dabei kein Selbstzweck, sondern der Hebel für Vertrauen und Abschlussbereitschaft. So wird Ihre Website zu einem aktiven Vertriebskanal statt zu einer statischen Visitenkarte.',
      },
      {
        icon: 'trending-up',
        title: 'Marketing mit klarer Ergebniskette',
        description:
          'Relevantes Marketing beginnt mit belastbaren Daten und einer priorisierten Zielsetzung. Die Projekte machen sichtbar, wie SEO, Kampagnen und Content entlang einer klaren Ergebniskette orchestriert werden. Jede Massnahme wird laufend auf Reichweite, Leadqualitaet und Kosten-Effizienz optimiert. Dadurch entsteht ein Wachstumssystem, das nicht vom Zufall abhaengt, sondern reproduzierbar Ergebnisse liefert.',
      },
      {
        icon: 'palette',
        title: 'Branding, das Abschlussquoten verbessert',
        description:
          'Markenwirkung entscheidet in vielen Märkten bereits vor dem ersten Gespräch über Vertrauen und Relevanz. Die Referenzen zeigen, wie konsistente Gestaltung und klare Positionierung die Wahrnehmung von Kompetenz steigern. Ein einheitlicher Auftritt reduziert Erklärungsaufwand und macht Angebote schneller vergleichbar. Das stärkt Ihre Marktposition und verbessert die Qualität eingehender Anfragen nachhaltig.',
      },
    ],
  }
}

function withSharedLogos(
  block: LayoutBlock,
  source?: LayoutBlock,
  overrides?: { eyebrow?: string; heading?: string; intro?: string },
): LayoutBlock {
  const rows = Array.isArray(source?.rows) ? clone(source.rows) : []
  if (!source || rows.length === 0) return block

  const rawEyebrow = String(source.eyebrow ?? '').trim()
  const rawHeading = String(source.heading ?? '').trim()
  const rawIntro = String(source.intro ?? '').trim()

  const eyebrow = !rawEyebrow || rawEyebrow === 'Referenzen' ? 'Marken-Referenzen' : rawEyebrow
  const heading =
    !rawHeading || rawHeading === 'Erstellte Logos'
      ? 'Logodesign-Referenzen aus realen Kundenaufträgen'
      : rawHeading
  const intro =
    !rawIntro || rawIntro === 'Referenzen umgesetzter Aufträge'
      ? 'Vom ersten Entwurf bis zur finalen Anwendung: Diese Auswahl zeigt Logos, die für unterschiedliche Branchen entwickelt und in der Praxis erfolgreich eingesetzt wurden.'
      : rawIntro

  return {
    ...block,
    eyebrow: overrides?.eyebrow ?? eyebrow,
    heading: overrides?.heading ?? heading,
    intro: overrides?.intro ?? intro,
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
      eyebrow: source.eyebrow ?? 'Kundenprojekte im Fokus',
      heading: source.heading ?? 'Ausgewählte Kundenprojekte mit klarem Ergebnisfokus',
      intro:
        source.intro ??
        'Diese Referenzen zeigen, wie aus Strategie, Design und Umsetzung konkrete Resultate entstehen. Jeder Case macht nachvollziehbar, welche Ausgangslage vorlag, welche Entscheidungen getroffen wurden und welche messbaren Effekte daraus entstanden sind.',
      layoutVariant: source.layoutVariant ?? 'visual',
      cases: [],
    } as LayoutBlock,
    source,
  )
}

function buildSharedLogoBlock(
  source?: LayoutBlock,
  overrides?: { eyebrow?: string; heading?: string; intro?: string },
): LayoutBlock | null {
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
      eyebrow: source.eyebrow ?? 'Marken-Referenzen',
      heading: source.heading ?? 'Logodesign-Referenzen aus realen Kundenaufträgen',
      intro:
        source.intro ??
        'Vom ersten Entwurf bis zur finalen Anwendung: Diese Auswahl zeigt Logos, die für unterschiedliche Branchen entwickelt und in der Praxis erfolgreich eingesetzt wurden.',
      displayMode: 'bento',
      rows: [],
    } as LayoutBlock,
    source,
    overrides,
  )
}

export async function resolveSharedPortfolioContent(
  slug: string,
  blocks: LayoutBlocks,
): Promise<LayoutBlocks> {
  if (!TARGET_SLUGS.has(slug)) return blocks

  const { leistungenCasesBlock, webdesignCasesBlock, logosBlock } = await getSharedPortfolioBlocks()
  const hasCasesBlock = blocks.some((block) => block?.blockType === 'portfolioCaseGrid')
  const hasLogosBlock = blocks.some((block) => block?.blockType === 'marqueeSlider')
  const casesBlockForSlug = slug === 'webdesign' ? webdesignCasesBlock : leistungenCasesBlock

  const resolved = blocks.map((block) => {
    if (!block || typeof block !== 'object') return block
    const typedBlock = block as LayoutBlock

    if (typedBlock.blockType === 'portfolioCaseGrid') {
      return withSharedCases(typedBlock, casesBlockForSlug)
    }
    if (typedBlock.blockType === 'marqueeSlider') return withSharedLogos(typedBlock, logosBlock)

    return block
  })

  if (slug === 'leistungen') {
    if (hasCasesBlock) return resolved as LayoutBlocks

    const caseBlock =
      buildSharedCaseBlock(leistungenCasesBlock) ?? (leistungenCasesBlock as LayoutBlock)
    const insertAfter = findLastServicesGridIndex(resolved as LayoutBlocks)
    const insertIndex = insertAfter >= 0 ? insertAfter + 1 : resolved.length

    const next = [...resolved]
    next.splice(insertIndex, 0, caseBlock)
    return next as LayoutBlocks
  }

  if (slug === 'webdesign') {
    const additions: LayoutBlock[] = []
    const caseBlock = !hasCasesBlock ? buildSharedCaseBlock(webdesignCasesBlock) : null
    const logoBlock = !hasLogosBlock ? buildSharedLogoBlock(logosBlock) : null

    if (caseBlock) additions.push(caseBlock)
    if (logoBlock) additions.push(logoBlock)

    return [...resolved, ...additions] as LayoutBlocks
  }

  if (slug === 'logo') {
    const logoOverrides = {
      eyebrow: 'Logo Showcase',
      heading: 'Logo-Referenzen aus realen Branding-Projekten',
      intro:
        'Diese Auswahl zeigt Logo-Entwicklungen aus Kundenprojekten - von reduzierten Zeichen bis zu flexiblen Varianten für unterschiedliche Anwendungskontexte.',
    }

    const withLogoHeadings = resolved.map((block) => {
      if (!block || typeof block !== 'object') return block
      const typedBlock = block as LayoutBlock
      if (typedBlock.blockType !== 'marqueeSlider') return block
      return withSharedLogos(typedBlock, logosBlock, logoOverrides)
    })

    if (hasLogosBlock) return withLogoHeadings as LayoutBlocks

    const logoBlock = buildSharedLogoBlock(logosBlock, logoOverrides)
    if (!logoBlock) return withLogoHeadings as LayoutBlocks

    return [...withLogoHeadings, logoBlock] as LayoutBlocks
  }

  if (slug === 'portfolio') {
    return resolvePortfolioHubLayout(resolved as LayoutBlocks, leistungenCasesBlock, logosBlock)
  }

  return resolved as LayoutBlocks
}
