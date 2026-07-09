import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

import { buildLeistungenPortfolioCaseBlock } from '@/utilities/leistungenPortfolioCases'
import {
  CENTRAL_PORTFOLIO_BLOCK_NAME,
  findCentralPortfolioCaseBlock,
} from '@/utilities/centralPortfolioCases'

type LayoutBlock = {
  blockType?: string
  blockName?: string
  [key: string]: unknown
}

function clonePlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function findLastServicesGridIndex(layout: LayoutBlock[]): number {
  for (let i = layout.length - 1; i >= 0; i--) {
    if (layout[i]?.blockType === 'servicesGrid') return i
  }
  return -1
}

// GET /api/seed-leistungen-teasers
// Fuegt auf /leistungen kompakte Portfolio-Teaser ein (Cases + Logo/Bento).
export async function GET() {
  try {
    const payload = await getPayload({ config })

    const leistungenRes = await payload.find({
      collection: 'site-pages',
      where: { slug: { equals: 'leistungen' } },
      limit: 1,
      depth: 3,
    })

    const leistungen = leistungenRes.docs[0]

    if (!leistungen) {
      return NextResponse.json({ ok: false, error: 'Leistungen page not found' }, { status: 404 })
    }

    const currentLayout = (Array.isArray(leistungen.layout)
      ? clonePlain(leistungen.layout)
      : []) as LayoutBlock[]

    const existingCentral = findCentralPortfolioCaseBlock(currentLayout)
    if (existingCentral && Array.isArray(existingCentral.cases) && existingCentral.cases.length > 0) {
      return NextResponse.json({
        ok: true,
        skipped: true,
        message: `Zentraler Portfolio-Block "${CENTRAL_PORTFOLIO_BLOCK_NAME}" ist bereits gepflegt.`,
        pageId: leistungen.id,
        counts: { caseTeaserItems: existingCentral.cases.length },
      })
    }

    const caseTeaser = buildLeistungenPortfolioCaseBlock() as LayoutBlock

    const marqueeRows = [
      {
        direction: 'left',
        speed: 30,
        pauseOnHover: true,
        items: [
          {
            name: 'Next.js',
            tileSize: 'large',
            emphasis: 'feature',
            bentoInteractive: true,
            detailTitle: 'Next.js Stack',
            detailText: 'SSR, Routing, Performance-Budget und Deploy auf Vercel.',
            detailMeta: 'Webdesign / Entwicklung',
          },
          {
            name: 'Payload CMS',
            tileSize: 'wide',
            bentoInteractive: true,
            detailTitle: 'Headless CMS',
            detailText: 'Flexible Block-Architektur für Inhalte, Cases und Landingpages.',
            detailMeta: 'Content Platform',
          },
          { name: 'Figma', tileSize: 'md' },
          { name: 'Google Ads', tileSize: 'wide' },
          { name: 'SEMrush', tileSize: 'md' },
          { name: 'Ahrefs', tileSize: 'md' },
          { name: 'Hotjar', tileSize: 'tall' },
          { name: 'TypeScript', tileSize: 'md' },
          { name: 'Vercel', tileSize: 'md' },
          { name: 'Tailwind CSS', tileSize: 'wide' },
        ],
      },
    ]

    const logoTeaser: LayoutBlock = {
      blockType: 'marqueeSlider',
      blockName: 'Leistungen Teaser Logos',
      blockSpacingPadding: 'default',
      blockSpacingPaddingTop: 'default',
      blockSpacingMarginBottom: 'default',
      blockContainer: 'default',
      blockBackground: 'none',
      eyebrow: 'Logo-Galerie',
      heading: 'Brands, Tools und Partner (Auszug)',
      intro:
        'Als Teaser zeige ich nur eine kleine Auswahl. Die vollständige Übersicht finden Sie im Portfolio.',
      displayMode: 'bento',
      galleryColumns: '4',
      bentoShowCounter: true,
      bentoCounterLabel: 'im Einsatz',
      bentoGap: 'default',
      bentoRowHeight: 'md',
      bentoMobileFlattenSpans: true,
      rows: marqueeRows,
    }

    // Alte Teaser aus vorherigen Seeds entfernen, damit es idempotent bleibt.
    const cleanedLayout = currentLayout.filter((block) => {
      const name = String(block?.blockName ?? '')
      return name !== 'Leistungen Teaser Cases' && name !== 'Leistungen Teaser Logos'
    })

    const insertAfter = findLastServicesGridIndex(cleanedLayout)
    const insertIndex = insertAfter >= 0 ? insertAfter + 1 : cleanedLayout.length

    const newLayout: LayoutBlock[] = [
      ...cleanedLayout.slice(0, insertIndex),
      caseTeaser,
      logoTeaser,
      ...cleanedLayout.slice(insertIndex),
    ]

    await payload.update({
      collection: 'site-pages',
      id: leistungen.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { layout: newLayout as any },
      overrideAccess: true,
    })

    revalidateTag('site-pages')

    return NextResponse.json({
      ok: true,
      pageId: leistungen.id,
      inserted: [caseTeaser.blockName, logoTeaser.blockName],
      counts: {
        caseTeaserItems: Array.isArray(caseTeaser.cases) ? caseTeaser.cases.length : 0,
        logoRows: Array.isArray(logoTeaser.rows) ? logoTeaser.rows.length : 0,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.error('[seed-leistungen-teasers]', message, stack)
    return NextResponse.json({ ok: false, error: message, stack }, { status: 500 })
  }
}
