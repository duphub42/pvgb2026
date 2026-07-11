/**
 * Pflegt Duplikat-Cases für Website- und Marketing-Slider:
 * gleicher Projektname, unterschiedliche Disziplin (webdesign vs. marketing).
 *
 * Ausführen:
 *   npx tsx src/scripts/seed-marketing-portfolio-cases.ts
 *   npx tsx src/scripts/seed-marketing-portfolio-cases.ts --dry-run
 */

import './load-env-import'
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
import {
  MARKETING_PORTFOLIO_CASES,
  MARKETING_PORTFOLIO_CASE_TITLES,
  type MarketingPortfolioCaseTitle,
} from '@/utilities/marketingPortfolioCaseContent'
import {
  WEBDESIGN_PORTFOLIO_CASES,
  type WebdesignPortfolioCaseTitle,
} from '@/utilities/webdesignPortfolioCaseContent'

type LayoutBlock = Record<string, unknown> & { blockType?: string }
type PortfolioCase = Record<string, unknown> & {
  title?: string
  discipline?: string
}

function findCaseIndex(cases: PortfolioCase[], title: string, discipline: string): number {
  return cases.findIndex(
    (entry) => String(entry.title ?? '') === title && String(entry.discipline ?? '') === discipline,
  )
}

function buildMarketingCase(
  title: MarketingPortfolioCaseTitle,
  existing?: PortfolioCase,
): PortfolioCase {
  const seed = MARKETING_PORTFOLIO_CASES[title]
  const { coverImageId, ...caseData } = seed

  return stripNestedIds({
    ...(existing ?? {}),
    title,
    ...caseData,
    coverImage: coverImageId,
    cta: {
      label: 'Case ansehen',
      href: seed.website.href,
    },
  })
}

function buildWebdesignCase(
  title: WebdesignPortfolioCaseTitle,
  existing?: PortfolioCase,
): PortfolioCase {
  const seed = WEBDESIGN_PORTFOLIO_CASES[title]
  const { coverImageId, featured, ...caseData } = seed

  return stripNestedIds({
    ...(existing ?? {}),
    title,
    ...caseData,
    featured: featured ?? Boolean(existing?.featured),
    coverImage: coverImageId,
    cta: {
      label: 'Case ansehen',
      href: seed.website.href,
    },
  })
}

function upsertDualPortfolioCases(cases: PortfolioCase[]): PortfolioCase[] {
  const next = [...cases]

  for (const title of MARKETING_PORTFOLIO_CASE_TITLES) {
    const webdesignIndex = findCaseIndex(next, title, 'webdesign')
    const marketingIndex = findCaseIndex(next, title, 'marketing')
    const legacyIndex = next.findIndex(
      (entry) =>
        String(entry.title ?? '') === title &&
        String(entry.discipline ?? '') !== 'webdesign' &&
        String(entry.discipline ?? '') !== 'marketing',
    )

    const webdesignBase =
      webdesignIndex >= 0 ? next[webdesignIndex] : legacyIndex >= 0 ? next[legacyIndex] : undefined

    const webdesignCase = buildWebdesignCase(title, webdesignBase)
    const marketingCase = buildMarketingCase(title, marketingIndex >= 0 ? next[marketingIndex] : undefined)

    if (webdesignIndex >= 0) {
      next[webdesignIndex] = webdesignCase
    } else if (legacyIndex >= 0) {
      next[legacyIndex] = webdesignCase
    } else {
      next.push(webdesignCase)
    }

    if (marketingIndex >= 0) {
      next[marketingIndex] = marketingCase
    } else {
      next.push(marketingCase)
    }
  }

  return next
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

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config })

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

  if (!centralBlock || !Array.isArray(centralBlock.cases) || centralBlock.cases.length === 0) {
    throw new Error(
      `Kein Block "Zentrale Portfolio-Referenzen" mit Cases auf /${CENTRAL_PORTFOLIO_PAGE_SLUG} gefunden.`,
    )
  }

  const updatedCases = sortCases(upsertDualPortfolioCases(centralBlock.cases as PortfolioCase[]))

  const nextCentralBlock = buildCentralPortfolioCaseBlock({
    ...centralBlock,
    intro:
      'Eine Auswahl realer Kundenprojekte aus Webdesign, Marketing und Branding – inklusive SEO- und Lead-Referenzen mit messbaren Ergebnissen.',
    cases: updatedCases,
  } as PortfolioCaseGridBlock)

  const nextLayout = currentLayout.map((block) => {
    if (block !== centralBlock) return block
    return nextCentralBlock
  })

  console.log(`Ziel: /${CENTRAL_PORTFOLIO_PAGE_SLUG} → Duplikat-Cases (webdesign + marketing)`)
  for (const title of MARKETING_PORTFOLIO_CASE_TITLES) {
    const web = updatedCases.find(
      (entry) => entry.title === title && entry.discipline === 'webdesign',
    )
    const marketing = updatedCases.find(
      (entry) => entry.title === title && entry.discipline === 'marketing',
    )
    console.log(`  ✓ ${title}`)
    console.log(`    webdesign: ${web ? 'ja' : 'fehlt'}`)
    console.log(`    marketing: ${marketing ? 'ja' : 'fehlt'}`)
  }
  console.log(`  Gesamt: ${updatedCases.length} Cases`)

  if (dryRun) {
    console.log('\n[dry-run] Keine Änderungen geschrieben.')
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

  console.log('\nFertig. Website- und Marketing-Slider nutzen getrennte Case-Varianten.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
