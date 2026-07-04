import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// POST /api/seed-portfolio-hub
// Aktualisiert die Portfolio-Hauptseite mit Teaser-Blöcken, Portfolio-Slider und Logo-Galerie.
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Portfolio-Hauptseite finden
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

    const newLayout = [
      // 1. PortfolioTeaser – drei Bereiche als Cards
      {
        blockType: 'portfolioTeaser',
        blockSpacingPadding: 'default',
        blockSpacingPaddingTop: 'default',
        blockSpacingMarginBottom: 'default',
        blockContainer: 'default',
        blockBackground: 'none',
        eyebrow: 'Portfolio-Bereiche',
        heading: 'Drei Disziplinen, ein gemeinsamer Ergebnisfokus',
        intro:
          'Webdesign, Marketing und Branding werden hier als zusammenhängendes Leistungssystem sichtbar. Jede Unterseite zeigt die gleiche Logik: Ausgangslage, Vorgehen und messbares Ergebnis.',
        variant: 'cards',
        areas: [
          {
            discipline: 'webdesign',
            title: 'Webdesign & Entwicklung',
            description:
              'UX-orientierte Websites und digitale Produkte - von Informationsarchitektur und Interface-Design bis zur performanten, SEO-fähigen Umsetzung.',
            tags: [
              { label: 'UX & Interface' },
              { label: 'Responsive Design' },
              { label: 'Performance' },
              { label: 'Relaunch' },
            ],
            href: '/portfolio-webdesign',
            ctaLabel: 'Webdesign-Projekte ansehen',
          },
          {
            discipline: 'marketing',
            title: 'Marketing, SEO & SEM',
            description:
              'Datengetriebene Kampagnen aus SEO, SEM und Lead-Generierung mit klarem Prozess: Analyse, Kanalstrategie, Testing und Optimierung.',
            tags: [
              { label: 'SEO & Rankings' },
              { label: 'Google Ads' },
              { label: 'Lead-Generierung' },
              { label: 'KPI-Fokus' },
            ],
            href: '/portfolio-marketing',
            ctaLabel: 'Marketing-Projekte ansehen',
          },
          {
            discipline: 'branding',
            title: 'Branding & Corporate Identity',
            description:
              'Markenauftritte mit klarer Identität - von Logoentwicklung und visuellem System bis zur konsistenten Anwendung über alle Touchpoints.',
            tags: [
              { label: 'Logo & Wortmarke' },
              { label: 'Corporate Design' },
              { label: 'Designsystem' },
              { label: 'Brand Strategy' },
            ],
            href: '/portfolio-marken',
            ctaLabel: 'Branding-Projekte ansehen',
          },
        ],
      },

      // 2. PortfolioCaseGrid – ausgewählte Cases aus allen Bereichen
      {
        blockType: 'portfolioCaseGrid',
        blockSpacingPadding: 'default',
        blockSpacingPaddingTop: 'default',
        blockSpacingMarginBottom: 'default',
        blockContainer: 'default',
        blockBackground: 'muted',
        eyebrow: 'Ausgewählte Cases',
        heading: 'Projekte mit System – nicht nur Oberfläche',
        intro:
          'Eine Auswahl repräsentativer Projekte aus allen Bereichen. Jeder Case zeigt Problem, Designentscheidungen und messbares Ergebnis.',
        layoutVariant: 'editorial',
        cases: [
          {
            discipline: 'webdesign',
            title: 'Relaunch Unternehmenswebsite',
            client: 'Mittelständisches B2B-Unternehmen',
            industry: 'Industrie',
            summary:
              'Vollständiger Relaunch mit neuem Informationsarchitektur-Konzept, responsivem Interface-Design und Core Web Vitals-Optimierung.',
            year: 2024,
            categories: ['relaunch', 'uxUi', 'performance'],
            challenge:
              'Veraltete Website mit niedrigen Conversion-Raten und schlechter mobiler Nutzbarkeit.',
            approach:
              'Strukturierte Discovery-Phase, Wireframing, iteratives Design und performante Next.js-Umsetzung.',
            result:
              'Mobile-Usability-Score von 48 auf 94, Conversion-Rate +38%, Ladezeit unter 1,8s.',
            metrics: [
              { value: '+38%', label: 'Conversion' },
              { value: '1.8s', label: 'LCP' },
              { value: '94', label: 'Mobile Score' },
            ],
            tags: [{ label: 'UX' }, { label: 'Relaunch' }, { label: 'Performance' }],
            cta: { label: 'Case ansehen', href: '/portfolio-webdesign' },
            featured: true,
          },
          {
            discipline: 'marketing',
            title: 'SEO-Skalierung & organische Reichweite',
            client: 'E-Commerce Händler',
            industry: 'E-Commerce',
            summary:
              'Ganzheitliche SEO-Strategie mit technischem Audit, Content-Architektur und systematischem Linkaufbau.',
            year: 2024,
            categories: ['seo', 'content'],
            challenge: 'Stagnierende organische Sichtbarkeit trotz guter Produktqualität.',
            approach:
              'Technisches SEO-Audit, Keyword-Clustering, Content-Strategie und strukturierter Linkaufbau.',
            result:
              'Organischer Traffic +220% in 9 Monaten, 34 neue Top-10-Rankings für kaufrelevante Keywords.',
            metrics: [
              { value: '+220%', label: 'Org. Traffic' },
              { value: '34', label: 'Top-10-Rankings' },
              { value: '9 Mo.', label: 'Laufzeit' },
            ],
            tags: [{ label: 'SEO' }, { label: 'Content' }, { label: 'E-Commerce' }],
            cta: { label: 'Case ansehen', href: '/portfolio-marketing' },
            featured: false,
          },
          {
            discipline: 'branding',
            title: 'Markenwelt und Designsystem',
            client: 'Tech-Startup',
            industry: 'Software',
            summary:
              'Aufbau einer kohärenten Markenidentität von Positionierung und Naming bis zum vollständigen Designsystem.',
            year: 2023,
            categories: ['branding', 'komplettDesign'],
            challenge:
              'Fehlendes Markenfundament erschwerte konsistente Kommunikation und externe Wahrnehmung.',
            approach:
              'Strategie-Workshop, Positionierungserarbeitung, Logo-Entwicklung und dokumentiertes Designsystem.',
            result:
              'Einheitlicher Markenauftritt über Web, Print und Social; Designsystem mit 40+ Komponenten.',
            metrics: [
              { value: '40+', label: 'Designkomponenten' },
              { value: '3', label: 'Marken-Touchpoints' },
            ],
            tags: [{ label: 'Branding' }, { label: 'Designsystem' }, { label: 'Startup' }],
            cta: { label: 'Case ansehen', href: '/portfolio-marken' },
            featured: false,
          },
        ],
      },

      // 3. MarqueeSlider – Logo-Galerie (Tool-Stack / Technologien)
      {
        blockType: 'marqueeSlider',
        blockSpacingPadding: 'default',
        blockSpacingPaddingTop: 'default',
        blockSpacingMarginBottom: 'none',
        blockContainer: 'default',
        blockBackground: 'none',
        eyebrow: 'Tools & Technologien',
        heading: 'Womit ich arbeite',
        intro:
          'Ein Auszug aus dem eingesetzten Stack – je nach Projektanforderung und Zielsetzung.',
        displayMode: 'marquee',
        rows: [
          {
            direction: 'left',
            speed: 35,
            pauseOnHover: true,
            items: [
              { name: 'Next.js' },
              { name: 'Payload CMS' },
              { name: 'Figma' },
              { name: 'Google Ads' },
              { name: 'Vercel' },
              { name: 'Tailwind CSS' },
              { name: 'TypeScript' },
              { name: 'Framer' },
            ],
          },
          {
            direction: 'right',
            speed: 30,
            pauseOnHover: true,
            items: [
              { name: 'SEMrush' },
              { name: 'Ahrefs' },
              { name: 'Google Analytics' },
              { name: 'Hotjar' },
              { name: 'Zapier' },
              { name: 'Make (Integromat)' },
              { name: 'Notion' },
              { name: 'Linear' },
            ],
          },
        ],
      },
    ]

    await payload.update({
      collection: 'site-pages',
      id: portfolioPage.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { layout: newLayout as any },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      message: 'Portfolio-Hauptseite aktualisiert',
      pageId: portfolioPage.id,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.error('[seed-portfolio-hub]', message, stack)
    return NextResponse.json({ error: message, stack }, { status: 500 })
  }
}
