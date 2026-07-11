/** Marketing-Inhalte für die zentralen Portfolio-Cases (Abgleich über `title`). */
export const MARKETING_PORTFOLIO_CASE_TITLES = [
  'Trinkwasser Verband',
  'Initiative Saubere Luft',
  'Soulmating',
] as const

export type MarketingPortfolioCaseTitle = (typeof MARKETING_PORTFOLIO_CASE_TITLES)[number]

export type MarketingPortfolioCaseSeed = {
  discipline: 'marketing'
  client: string
  industry: string
  summary: string
  year: number
  categories: Array<'seo' | 'content'>
  challenge: string
  approach: string
  result: string
  metrics: Array<{ value: string; label: string }>
  tags: Array<{ label: string }>
  website: { label: string; href: string }
  featured: boolean
  coverImageId: number
}

export const MARKETING_PORTFOLIO_CASES: Record<
  MarketingPortfolioCaseTitle,
  MarketingPortfolioCaseSeed
> = {
  'Trinkwasser Verband': {
    discipline: 'marketing',
    client: 'Trinkwasser Verband',
    industry: 'Umweltreinigung',
    summary:
      'SEO- und Lead-Setup für gezielte Anfragen zu Leitungswasser-Testungen: Fachartikel, Landingpages, Ads-Bootstrap und kontinuierliche Ranking-Optimierung mit exponentiellem Anfragenwachstum.',
    year: 2024,
    categories: ['seo', 'content'],
    challenge:
      'Der Verband wurde gezielt gegründet, um qualifizierte Anfragen für Leitungswasser-Testungen zu generieren – ohne bestehende organische Sichtbarkeit oder etablierte Rankings.',
    approach:
      'Dreimonatige Google-Ads-Phase für frühe Leads, parallel Aufbau des SEO-Fundaments mit Fachartikeln, Landingpages, technischer Optimierung und strategischem Linkbuilding über relevante Verweise.',
    result:
      'Top-3-Rankings für relevante Keywords, durchschnittlich rund 300 organische Besucher pro Tag, im Peak 2024 bis zu 30 Leads täglich – nach der Ads-Phase überwiegend organisch.',
    metrics: [
      { value: '30', label: 'Leads / Tag (Peak 2024)' },
      { value: '300+', label: 'Org. Besucher / Tag' },
      { value: 'Top 3', label: 'Keyword-Rankings' },
      { value: '10–20', label: 'Referral-Besucher / Tag' },
    ],
    tags: [{ label: 'SEO' }, { label: 'Google Ads' }, { label: 'Content' }, { label: 'Lead Funnel' }],
    website: { label: 'trinkwasser-verband.de', href: 'https://trinkwasser-verband.de' },
    featured: true,
    coverImageId: 1348,
  },
  'Initiative Saubere Luft': {
    discipline: 'marketing',
    client: 'Luft Verband',
    industry: 'Verband',
    summary:
      'SEO- und Lead-Plattform für Raumluftmessungen: Fachartikel, Landingpages und die Kombination aus Paid Ads und organischer Suche für starkes Anfragenwachstum.',
    year: 2024,
    categories: ['seo', 'content'],
    challenge:
      'Die Initiative wurde mit dem klaren Ziel aufgebaut, Anfragen für Raumluftmessungen zu generieren – bei fehlender organischer Reichweite zu Projektstart.',
    approach:
      'Dreimonatige Ads-Phase für erste Lead-Ströme, begleitet von Content-Hub, Landingpages, Onpage-SEO und Linkbuilding. Nach drei Monaten setzte der organische Traffic verlässlich ein.',
    result:
      'Top-3-Rankings für relevante Suchbegriffe, im Schnitt rund 300 organische Zugriffe pro Tag und bis zu 30 Leads pro Tag im Peak 2024 – zusätzlich 10–20 Besucher täglich über strategische Verlinkung.',
    metrics: [
      { value: '30', label: 'Leads / Tag (Peak 2024)' },
      { value: '300+', label: 'Org. Besucher / Tag' },
      { value: 'Top 3', label: 'Keyword-Rankings' },
      { value: '10–20', label: 'Referral-Besucher / Tag' },
    ],
    tags: [{ label: 'SEO' }, { label: 'Google Ads' }, { label: 'Content' }, { label: 'Lead Funnel' }],
    website: {
      label: 'initiative-saubere-luft.de',
      href: 'https://initiative-saubere-luft.de',
    },
    featured: true,
    coverImageId: 1345,
  },
  Soulmating: {
    discipline: 'marketing',
    client: 'Soulmating',
    industry: 'Kommunikationstraining',
    summary:
      'SEO, Content und gezielte Ads für Workshop-Buchungen und Marken-Reichweite: von null Sichtbarkeit zu Top-Rankings, stabilem Traffic und bis zu 1.000 Besuchern pro Tag.',
    year: 2019,
    categories: ['seo', 'content'],
    challenge:
      'Start von null: Keine organische Sichtbarkeit, kein etabliertes Ranking – bei gleichzeitigem Ziel, Workshop-Buchungen und Awareness für non-verbale Kommunikationstrainings aufzubauen.',
    approach:
      'Onpage-SEO, durchschnittlich fünf Fachartikel pro Woche, strategisches Linkbuilding und sporadische Google-Ads-Kampagnen als gezielter Boost.',
    result:
      'Top 3 für „Speed Dating“, Top 1 für „non-verbales Speed Dating“, 200–300 Besucher/Tag im Schnitt, Peaks bis 1.000/Tag und ca. 30 Buchungen/Monat im Peakjahr 2019.',
    metrics: [
      { value: 'Top 1', label: 'Non-verbales Speed Dating' },
      { value: '1.000', label: 'Besucher / Tag (Peak)' },
      { value: '~30', label: 'Buchungen / Monat' },
      { value: '5/Woche', label: 'Fachartikel' },
    ],
    tags: [{ label: 'SEO' }, { label: 'Content' }, { label: 'Google Ads' }],
    website: { label: 'soulmating.de', href: 'https://soulmating.de' },
    featured: true,
    coverImageId: 1347,
  },
}

export function isMarketingPortfolioCaseTitle(title: unknown): title is MarketingPortfolioCaseTitle {
  return (
    typeof title === 'string' &&
    (MARKETING_PORTFOLIO_CASE_TITLES as readonly string[]).includes(title)
  )
}

export const MARKETING_PORTFOLIO_DISCIPLINES = new Set(['marketing', 'mixed'])

/** Top-Level-Leistungsseiten mit Marketing-Portfolio-Slider (SEO, SEM, Content). */
export const MARKETING_PORTFOLIO_SLIDER_SLUGS = new Set(['seo', 'sem', 'content'])

export function isMarketingPortfolioSliderPage(slug: string): boolean {
  return MARKETING_PORTFOLIO_SLIDER_SLUGS.has(slug.trim().toLowerCase())
}

export type MarketingCaseChartData = {
  angle: string
  traffic: Array<{ label: string; value: number }>
  leads: Array<{ label: string; value: number }>
  channels: Array<{ label: string; value: number; color: string }>
}

export const MARKETING_PORTFOLIO_CHARTS: Record<
  MarketingPortfolioCaseTitle,
  MarketingCaseChartData
> = {
  'Trinkwasser Verband': {
    angle: 'Ads-Bootstrap, dann exponentieller SEO-Aufbau bis zum Lead-Peak 2024',
    traffic: [
      { label: 'Start', value: 8 },
      { label: 'Ads', value: 45 },
      { label: 'SEO+3M', value: 120 },
      { label: '2023', value: 210 },
      { label: 'Peak', value: 350 },
    ],
    leads: [
      { label: 'Start', value: 2 },
      { label: 'Ads', value: 8 },
      { label: 'SEO+3M', value: 14 },
      { label: '2023', value: 22 },
      { label: 'Peak', value: 30 },
    ],
    channels: [
      { label: 'Organisch', value: 72, color: 'hsl(160 84% 39%)' },
      { label: 'Google Ads', value: 16, color: 'hsl(38 92% 50%)' },
      { label: 'Referral', value: 12, color: 'hsl(217 91% 60%)' },
    ],
  },
  'Initiative Saubere Luft': {
    angle: 'Paid-Startphase, Content-Hub und Rankings für Raumluft-Leads',
    traffic: [
      { label: 'Start', value: 6 },
      { label: 'Ads', value: 40 },
      { label: 'SEO+3M', value: 115 },
      { label: '2023', value: 205 },
      { label: 'Peak', value: 340 },
    ],
    leads: [
      { label: 'Start', value: 1 },
      { label: 'Ads', value: 7 },
      { label: 'SEO+3M', value: 13 },
      { label: '2023', value: 20 },
      { label: 'Peak', value: 30 },
    ],
    channels: [
      { label: 'Organisch', value: 70, color: 'hsl(160 84% 39%)' },
      { label: 'Google Ads', value: 18, color: 'hsl(38 92% 50%)' },
      { label: 'Referral', value: 12, color: 'hsl(217 91% 60%)' },
    ],
  },
  Soulmating: {
    angle: 'Von null Sichtbarkeit zu Top-Rankings und Workshop-Buchungen (Peak 2019)',
    traffic: [
      { label: '2018', value: 15 },
      { label: 'H1 19', value: 85 },
      { label: 'Peak 19', value: 1000 },
      { label: 'Ø 19', value: 280 },
      { label: '2020', value: 220 },
    ],
    leads: [
      { label: '2018', value: 4 },
      { label: 'H1 19', value: 12 },
      { label: 'Peak 19', value: 30 },
      { label: 'Ø 19', value: 22 },
      { label: '2020', value: 18 },
    ],
    channels: [
      { label: 'Organisch', value: 78, color: 'hsl(160 84% 39%)' },
      { label: 'Google Ads', value: 8, color: 'hsl(38 92% 50%)' },
      { label: 'Referral', value: 14, color: 'hsl(217 91% 60%)' },
    ],
  },
}

export function getMarketingCaseChartData(title: unknown): MarketingCaseChartData | null {
  if (!isMarketingPortfolioCaseTitle(title)) return null
  return MARKETING_PORTFOLIO_CHARTS[title]
}
