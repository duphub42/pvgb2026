export type LeistungenCaseBlock = Record<string, unknown> & { blockType?: string }

/**
 * Fallback-Inhalte, wenn der zentrale Block auf /leistungen noch nicht gepflegt ist.
 * Produktiv: Cases nur im Block „Zentrale Portfolio-Referenzen“ auf /leistungen pflegen.
 */
export function buildLeistungenPortfolioCaseBlock(): LeistungenCaseBlock {
  return {
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
}
