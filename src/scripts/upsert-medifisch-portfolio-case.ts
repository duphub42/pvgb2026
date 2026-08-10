/**
 * Fuegt MEDIFISCH als zentralen Portfolio-Case hinzu.
 *
 * Ausfuehren:
 *   npx tsx src/scripts/upsert-medifisch-portfolio-case.ts
 *   npx tsx src/scripts/upsert-medifisch-portfolio-case.ts --dry-run
 */

import './load-env-import'
import fs from 'fs'
import { revalidateTag } from 'next/cache'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'

import {
  buildCentralPortfolioCaseBlock,
  CENTRAL_PORTFOLIO_PAGE_SLUG,
  findCentralPortfolioCaseBlock,
  stripNestedIds,
  type PortfolioCaseGridBlock,
} from '@/utilities/centralPortfolioCases'
import { RECENT_PORTFOLIO_CASE_COPY } from '@/utilities/recentPortfolioCaseCopy'

const MEDIFISCH_TITLE = 'MEDIFISCH'
const MEDIFISCH_MOCKUP_PATH = '/Users/horus/Downloads/medifisch-mockup.png'

type LayoutBlock = Record<string, unknown> & { blockType?: string }
type PortfolioCase = Record<string, unknown> & {
  title?: string
  discipline?: string
  featured?: boolean
}

function sortCases(cases: PortfolioCase[]): PortfolioCase[] {
  return [...cases].sort((a, b) => {
    const aFeatured = Boolean(a.featured)
    const bFeatured = Boolean(b.featured)
    if (aFeatured !== bFeatured) return aFeatured ? -1 : 1

    const aMarketing = String(a.discipline ?? '') === 'marketing'
    const bMarketing = String(b.discipline ?? '') === 'marketing'
    if (aMarketing !== bMarketing) return aMarketing ? -1 : 1

    return String(a.title ?? '').localeCompare(String(b.title ?? ''), 'de')
  })
}

async function getOrCreateMedifischMedia(dryRun: boolean): Promise<number | undefined> {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'media',
    where: {
      or: [
        { filename: { equals: 'medifisch-mockup.png' } },
        { alt: { equals: 'MEDIFISCH Dropshipping-Shop fuer Wellness- und SPA-Bedarf' } },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const existingDoc = existing.docs[0]
  if (existingDoc?.id) return Number(existingDoc.id)

  if (!fs.existsSync(MEDIFISCH_MOCKUP_PATH)) {
    console.warn(`Mockup nicht gefunden: ${MEDIFISCH_MOCKUP_PATH}`)
    return undefined
  }

  if (dryRun) {
    console.log(`[dry-run] Wuerde Media-Upload anlegen: ${MEDIFISCH_MOCKUP_PATH}`)
    return undefined
  }

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: 'MEDIFISCH Dropshipping-Shop fuer Wellness- und SPA-Bedarf',
    },
    filePath: MEDIFISCH_MOCKUP_PATH,
    overrideAccess: true,
  })

  return Number(media.id)
}

function buildMedifischCase(coverImageId?: number, existing?: PortfolioCase): PortfolioCase {
  return stripNestedIds({
    ...(existing ?? {}),
    discipline: 'webdesign',
    title: MEDIFISCH_TITLE,
    client: 'MEDIFISCH',
    industry: 'Wellness & SPA Bedarf',
    year: 2026,
    categories: ['eCommerce', 'performance', 'uxUi'],
    ...RECENT_PORTFOLIO_CASE_COPY[MEDIFISCH_TITLE],
    metrics: [
      { value: '2014-2026', label: 'Projektlaufzeit' },
      { value: '12+', label: 'Jahre Betreuung' },
    ],
    tags: [{ label: 'E-Commerce' }, { label: 'Dropshipping' }, { label: 'Wellness & SPA' }],
    website: { label: 'medifisch.de', href: 'https://medifisch.de' },
    cta: { label: 'Website ansehen', href: 'https://medifisch.de' },
    coverImage: coverImageId ?? existing?.coverImage,
  })
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config })
  const coverImageId = await getOrCreateMedifischMedia(dryRun)

  const leistungenRes = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: CENTRAL_PORTFOLIO_PAGE_SLUG } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const leistungen = leistungenRes.docs[0]
  if (!leistungen) {
    throw new Error(`Seite "${CENTRAL_PORTFOLIO_PAGE_SLUG}" nicht gefunden.`)
  }

  const currentLayout = (Array.isArray(leistungen.layout) ? leistungen.layout : []) as LayoutBlock[]
  const centralBlock = findCentralPortfolioCaseBlock(currentLayout)

  if (!centralBlock || !Array.isArray(centralBlock.cases)) {
    throw new Error(
      `Kein zentraler portfolioCaseGrid auf /${CENTRAL_PORTFOLIO_PAGE_SLUG} gefunden.`,
    )
  }

  const cases = centralBlock.cases as PortfolioCase[]
  const existingIndex = cases.findIndex(
    (entry) =>
      String(entry.title ?? '') === MEDIFISCH_TITLE &&
      String(entry.discipline ?? 'webdesign') === 'webdesign',
  )

  const nextCases = [...cases]
  const medifischCase = buildMedifischCase(
    coverImageId,
    existingIndex >= 0 ? nextCases[existingIndex] : undefined,
  )

  if (existingIndex >= 0) {
    nextCases[existingIndex] = medifischCase
  } else {
    nextCases.push(medifischCase)
  }

  const updatedCases = sortCases(nextCases)
  const nextCentralBlock = buildCentralPortfolioCaseBlock({
    ...centralBlock,
    intro:
      'Eine Auswahl realer Kundenprojekte aus Webdesign, Marketing und Branding - inklusive SEO-, Lead- und E-Commerce-Referenzen mit messbaren Ergebnissen.',
    cases: updatedCases,
  } as PortfolioCaseGridBlock)

  const nextLayout = currentLayout.map((block) => {
    if (block !== centralBlock) return block
    return nextCentralBlock
  })

  console.log(`Ziel: /${CENTRAL_PORTFOLIO_PAGE_SLUG} -> ${MEDIFISCH_TITLE}`)
  console.log(`Cover: ${coverImageId ?? 'ohne Cover'}`)
  console.log(`Cases gesamt: ${updatedCases.length}`)

  if (dryRun) {
    console.log('\n[dry-run] Keine Aenderungen geschrieben.')
    return
  }

  await payload.update({
    collection: 'site-pages',
    id: leistungen.id,
    data: {
      layout: nextLayout as unknown as RequiredDataFromCollectionSlug<'site-pages'>['layout'],
    },
    overrideAccess: true,
    depth: 0,
    context: { skipRevalidate: true },
  })

  try {
    revalidateTag('site-pages')
  } catch {
    // revalidateTag funktioniert nur im Next.js-Request-Kontext.
  }

  console.log('\nFertig. MEDIFISCH ist im zentralen Portfolio-Slider gepflegt.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
