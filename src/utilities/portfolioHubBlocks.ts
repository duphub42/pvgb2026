import { buildLeistungenPortfolioCaseBlock } from '@/utilities/leistungenPortfolioCases'

type HubBlock = Record<string, unknown> & { blockType?: string; id?: string }

/** @deprecated Nutze buildLeistungenPortfolioCaseBlock – gleiche Referenz-Cases. */
export function buildPortfolioHubCaseBlock(): HubBlock {
  return buildLeistungenPortfolioCaseBlock()
}

export function buildPortfolioTeaserBlock(): HubBlock {
  return {
    id: 'portfolio-hub-teaser',
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
  }
}
