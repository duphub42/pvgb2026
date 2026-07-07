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
    const cleaned = resolved.filter((block) => {
      if (!block || typeof block !== 'object') return true
      const typed = block as LayoutBlock
      if (typed.blockType === 'whyWorkWithMe') return false
      if (isIrrelevantPortfolioServicesOverview(typed)) return false
      return true
    })

    const hasInjectedBlock = cleaned.some((block) => {
      if (!block || typeof block !== 'object') return false
      return String((block as LayoutBlock).id ?? '') === 'portfolio-under-cases-context'
    })

    if (hasInjectedBlock) return cleaned as LayoutBlocks

    const insertionIndex = cleaned.findIndex((block) => block?.blockType === 'portfolioCaseGrid')
    if (insertionIndex === -1) {
      return [...cleaned, buildPortfolioUnderCasesBlock()] as LayoutBlocks
    }

    const next = [...cleaned]
    next.splice(insertionIndex + 1, 0, buildPortfolioUnderCasesBlock())
    return next as LayoutBlocks
  }

  return resolved as LayoutBlocks
}
