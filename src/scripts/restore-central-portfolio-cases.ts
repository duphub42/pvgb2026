/**
 * Stellt die 7 Portfolio-Projekte aus der Versionshistorie wieder her
 * und speichert sie zentral auf /leistungen.
 *
 * Alle Portfolio-Slider auf der Website lesen diese Daten zur Laufzeit
 * über sharedPortfolioContent.ts – neue Projekte nur hier pflegen.
 *
 * Ausführen:
 *   npx tsx src/scripts/restore-central-portfolio-cases.ts
 *   npx tsx src/scripts/restore-central-portfolio-cases.ts --dry-run
 */

import './load-env-import'
import { revalidateTag } from 'next/cache'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'

import {
  buildCentralPortfolioCaseBlock,
  CENTRAL_PORTFOLIO_BLOCK_NAME,
  CENTRAL_PORTFOLIO_PAGE_SLUG,
  type PortfolioCaseGridBlock,
} from '@/utilities/centralPortfolioCases'

const RESTORE_VERSION_ID = '548'

type LayoutBlock = Record<string, unknown> & { blockType?: string }

function findLastServicesGridIndex(layout: LayoutBlock[]): number {
  for (let i = layout.length - 1; i >= 0; i--) {
    if (layout[i]?.blockType === 'servicesGrid') return i
  }
  return -1
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config })

  const version = await payload.findVersionByID({
    collection: 'site-pages',
    id: RESTORE_VERSION_ID,
    depth: 0,
  })

  const sourceLayout = (version.version as { layout?: unknown })?.layout
  const sourceGrid = Array.isArray(sourceLayout)
    ? (sourceLayout.find(
        (block) =>
          block &&
          typeof block === 'object' &&
          (block as LayoutBlock).blockType === 'portfolioCaseGrid',
      ) as PortfolioCaseGridBlock | undefined)
    : undefined

  if (!sourceGrid || !Array.isArray(sourceGrid.cases) || sourceGrid.cases.length === 0) {
    throw new Error(`Version ${RESTORE_VERSION_ID} enthält keinen portfolioCaseGrid mit Cases.`)
  }

  const centralBlock = buildCentralPortfolioCaseBlock(sourceGrid)

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

  const withoutOldCentral = currentLayout.filter((block) => {
    const name = String(block?.blockName ?? '')
    return name !== CENTRAL_PORTFOLIO_BLOCK_NAME && name !== 'Leistungen Teaser Cases'
  })

  const insertAfter = findLastServicesGridIndex(withoutOldCentral)
  const insertIndex = insertAfter >= 0 ? insertAfter + 1 : withoutOldCentral.length

  const nextLayout = [...withoutOldCentral]
  nextLayout.splice(insertIndex, 0, centralBlock)

  console.log(`Quelle: site-pages Version ${RESTORE_VERSION_ID} (portfolio-webdesign)`)
  console.log(`Ziel:   /${CENTRAL_PORTFOLIO_PAGE_SLUG} → Block "${CENTRAL_PORTFOLIO_BLOCK_NAME}"`)
  console.log(`Cases:  ${centralBlock.cases?.length ?? 0}`)
  ;(centralBlock.cases as Array<{ title?: string; coverImage?: unknown }> | undefined)?.forEach(
    (entry) => {
      console.log(`  - ${entry.title} (coverImage: ${entry.coverImage ?? '—'})`)
    },
  )

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

  console.log('\nFertig. Portfolio-Slider werden zentral aus /leistungen geladen.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
