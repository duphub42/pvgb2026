import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

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

    const caseTeaser: LayoutBlock = {
      blockType: 'portfolioCaseGrid',
      blockName: 'Leistungen Teaser Cases',
      blockSpacingPadding: 'default',
      blockSpacingPaddingTop: 'default',
      blockSpacingMarginBottom: 'default',
      blockContainer: 'default',
      blockBackground: 'muted',
      eyebrow: 'Referenzen',
      heading: 'Umgesetzte Websites und Kampagnen',
      intro:
        'Ein kompakter Auszug aus realen Projekten. Für Details geht es direkt in das Portfolio.',
      layoutVariant: 'editorial',
      cases: [
        {
          discipline: 'webdesign',
          title: 'Relaunch Unternehmenswebsite',
          client: 'Mittelstaendisches B2B-Unternehmen',
          industry: 'Industrie',
          summary:
            'Modernisierung von Struktur, UI und Performance für bessere Nutzerführung und Conversion.',
          year: 2024,
          categories: ['relaunch', 'uxUi', 'performance'],
          metrics: [
            { value: '+38%', label: 'Conversion' },
            { value: '1.8s', label: 'LCP' },
          ],
          tags: [{ label: 'UX' }, { label: 'Performance' }],
          cta: { label: 'Projekt ansehen', href: '/portfolio-webdesign' },
          featured: true,
        },
        {
          discipline: 'marketing',
          title: 'SEO-Skalierung für E-Commerce',
          client: 'E-Commerce Marke',
          industry: 'Retail',
          summary:
            'Technisches SEO, Content-Cluster und Kampagnen-Optimierung mit klarem KPI-Fokus.',
          year: 2024,
          categories: ['seo', 'content'],
          metrics: [
            { value: '+220%', label: 'Org. Traffic' },
            { value: '34', label: 'Top-10' },
          ],
          tags: [{ label: 'SEO' }, { label: 'Content' }],
          cta: { label: 'Projekt ansehen', href: '/portfolio-marketing' },
        },
        {
          discipline: 'branding',
          title: 'Markenwelt & Designsystem',
          client: 'Tech-Startup',
          industry: 'Software',
          summary:
            'Vom Markenfundament bis zur visuellen Systematik für Web, Social und Print.',
          year: 2023,
          categories: ['branding', 'komplettDesign'],
          metrics: [
            { value: '40+', label: 'Komponenten' },
            { value: '3', label: 'Touchpoints' },
          ],
          tags: [{ label: 'Branding' }, { label: 'Designsystem' }],
          cta: { label: 'Projekt ansehen', href: '/portfolio-marken' },
        },
      ],
    }

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
