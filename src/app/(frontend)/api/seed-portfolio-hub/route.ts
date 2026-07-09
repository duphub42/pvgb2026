import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

import { buildLeistungenPortfolioCaseBlock } from '@/utilities/leistungenPortfolioCases'
import { buildPortfolioTeaserBlock } from '@/utilities/portfolioHubBlocks'
import {
  CENTRAL_PORTFOLIO_BLOCK_NAME,
  CENTRAL_PORTFOLIO_PAGE_SLUG,
  findCentralPortfolioCaseBlock,
} from '@/utilities/centralPortfolioCases'

type LayoutBlock = Record<string, unknown> & { blockType?: string }

function buildCalPopupBlock(source?: LayoutBlock): LayoutBlock {
  return {
    blockType: 'calPopup',
    blockSpacingPadding: 'default',
    blockSpacingPaddingTop: 'default',
    blockSpacingMarginBottom: 'default',
    blockContainer: 'default',
    blockBackground: 'none',
    headline: String(source?.headline ?? '').trim() || 'Projektidee besprechen',
    description:
      String(source?.description ?? '').trim() ||
      'In 30 Minuten klären wir Zielbild, Prioritäten und den nächsten sinnvollen Schritt.',
    calLink: String(source?.calLink ?? '').trim() || 'philippbacher/30min',
    buttonLabel: String(source?.buttonLabel ?? '').trim() || 'Termin buchen',
  }
}

// GET /api/seed-portfolio-hub
// Persistiert Portfolio-Teaser und Case-Slider im CMS.
// Logo-Bento kommt zur Laufzeit aus sharedPortfolioContent (portfolio-marken).
export async function GET() {
  try {
    const payload = await getPayload({ config })

    const existing = await payload.find({
      collection: 'site-pages',
      where: { slug: { equals: 'portfolio' } },
      limit: 1,
      depth: 0,
    })

    if (!existing.docs.length) {
      return NextResponse.json({ error: 'Portfolio page not found' }, { status: 404 })
    }

    const portfolioPage = existing.docs[0]
    const currentLayout = (Array.isArray(portfolioPage.layout) ? portfolioPage.layout : []) as LayoutBlock[]
    const calPopupSource = currentLayout.find((block) => block.blockType === 'calPopup')

    const leistungenRes = await payload.find({
      collection: 'site-pages',
      where: { slug: { equals: CENTRAL_PORTFOLIO_PAGE_SLUG } },
      limit: 1,
      depth: 2,
      overrideAccess: true,
    })
    const centralCasesBlock =
      findCentralPortfolioCaseBlock(leistungenRes.docs[0]?.layout) ??
      (buildLeistungenPortfolioCaseBlock() as LayoutBlock)
    centralCasesBlock.blockName = CENTRAL_PORTFOLIO_BLOCK_NAME

    const newLayout = [
      buildPortfolioTeaserBlock(),
      centralCasesBlock,
      buildCalPopupBlock(calPopupSource),
    ]

    await payload.update({
      collection: 'site-pages',
      id: portfolioPage.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { layout: newLayout as any },
      overrideAccess: true,
      depth: 0,
    })

    revalidateTag('site-pages')

    return NextResponse.json({
      ok: true,
      message: 'Portfolio-Hauptseite im CMS wiederhergestellt',
      pageId: portfolioPage.id,
      layout: newLayout.map((block) => block.blockType),
      note: 'Logo-Bento wird zur Laufzeit aus portfolio-marken geladen.',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.error('[seed-portfolio-hub]', message, stack)
    return NextResponse.json({ error: message, stack }, { status: 500 })
  }
}
