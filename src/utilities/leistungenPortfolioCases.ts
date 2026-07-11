import {
  MARKETING_PORTFOLIO_CASES,
  MARKETING_PORTFOLIO_CASE_TITLES,
} from '@/utilities/marketingPortfolioCaseContent'

export type LeistungenCaseBlock = Record<string, unknown> & { blockType?: string }

function buildFallbackMarketingCase(title: (typeof MARKETING_PORTFOLIO_CASE_TITLES)[number]) {
  const seed = MARKETING_PORTFOLIO_CASES[title]
  const { coverImageId, ...caseData } = seed

  return {
    ...caseData,
    title,
    coverImage: coverImageId,
    cta: { label: 'Case ansehen', href: seed.website.href },
  }
}

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
      buildFallbackMarketingCase('Trinkwasser Verband'),
      buildFallbackMarketingCase('Initiative Saubere Luft'),
      buildFallbackMarketingCase('Soulmating'),
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
