export type PortfolioType = 'webdesign' | 'marketing' | 'branding'

export type PortfolioPresetPage = {
  portfolioType: PortfolioType
  slug: string
  title: string
  hero: Record<string, unknown>
  layout: Array<Record<string, unknown>>
  metaTitle: string
  metaDescription: string
}

export const PORTFOLIO_TYPE_OPTIONS = [
  { label: 'Webdesign', value: 'webdesign' },
  { label: 'Marketing (SEM/SEO/Leads)', value: 'marketing' },
  { label: 'Branding (Marken/Logos)', value: 'branding' },
] as const

const PRESET_ORDER: PortfolioType[] = ['webdesign', 'marketing', 'branding']

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const introBlock = (args: { heading: string; body: string; tagline?: string }): Record<string, unknown> => ({
  blockType: 'introduction',
  heading: args.heading,
  body: args.body,
  tagline: args.tagline ?? '',
})

const calPopupBlock = (args: { headline: string; description: string }): Record<string, unknown> => ({
  blockType: 'calPopup',
  headline: args.headline,
  description: args.description,
  calLink: 'philippbacher/30min',
  buttonLabel: 'Termin buchen',
})

const servicesOverviewBlock = (args: {
  heading: string
  intro: string
  services: Array<{ icon: string; title: string; description: string }>
}): Record<string, unknown> => ({
  blockType: 'servicesOverview',
  heading: args.heading,
  intro: args.intro,
  services: args.services,
})

const whyWorkWithMeBlock = (args: {
  heading: string
  intro: string
  reasons: Array<{ icon: string; title: string; description: string }>
}): Record<string, unknown> => ({
  blockType: 'whyWorkWithMe',
  heading: args.heading,
  intro: args.intro,
  reasons: args.reasons,
})

const contactInfoCardsBlock = (): Record<string, unknown> => ({
  blockType: 'contactInfoCards',
  cards: [
    {
      icon: 'map-pin',
      title: 'Standort',
      lines: 'Halle (Saale) & Remote\nDACH-weit verfuegbar',
    },
    {
      icon: 'mail',
      title: 'Kontakt',
      lines: 'mail@philippbacher.com\nAntwort in der Regel innerhalb 24h',
    },
    {
      icon: 'clock-3',
      title: 'Verfuegbarkeit',
      lines: 'Mo-Fr: 09:00-18:00 Uhr\nKickoff kurzfristig moeglich',
    },
  ],
  ctaLabel: 'Projektgespraech anfragen',
  ctaHref: '/kontakt',
})

const WEBDESIGN_PRESET: PortfolioPresetPage = {
  portfolioType: 'webdesign',
  slug: 'portfolio-webdesign',
  title: 'Portfolio Webdesign',
  hero: {
    type: 'lowImpact',
    subheadline: 'Portfolio Webdesign',
    headline: 'Digitale Erlebnisse mit klarer UX und hoher Designqualitaet',
    description:
      'Cases aus Website-Strategie, Interface-Design und Umsetzung mit Fokus auf Nutzerfuehrung, Performance und Conversion.',
  },
  layout: [
    introBlock({
      heading: 'Webdesign-Cases mit System statt nur Oberflaeche',
      body: 'Jeder Case zeigt Problem, Designentscheidungen und messbares Ergebnis. So wird sichtbar, wie UX, Branding und Technik zusammenwirken.',
      tagline: 'Klar strukturiert. Visuell praezise. Technisch sauber.',
    }),
    servicesOverviewBlock({
      heading: 'Leistungsfokus im Webdesign',
      intro: 'Diese Projekte verbinden Strategieverstaendnis mit sauberer gestalterischer und technischer Umsetzung.',
      services: [
        {
          icon: 'monitor',
          title: 'UX- und Interface-Design',
          description:
            'Nutzerfuehrung, Informationshierarchie und konsistente visuelle Muster fuer bessere Orientierung.',
        },
        {
          icon: 'code',
          title: 'Frontend-Umsetzung',
          description:
            'Modulare Komponenten, saubere Semantik und hohe Performance auf Desktop und Mobile.',
        },
        {
          icon: 'rocket',
          title: 'Conversion-Optimierung',
          description:
            'Klarer CTA-Fokus, Landingpage-Logik und messbare Verbesserungen in Lead- und Abschlussraten.',
        },
      ],
    }),
    {
      blockType: 'portfolioCaseGrid',
      layoutVariant: 'visual',
      eyebrow: 'Ausgewaehlte Projekte',
      heading: 'Webdesign mit Wirkung',
      intro: 'Vom Relaunch bis Landingpage-System: jeder Case dokumentiert Vorgehen und Ergebnis.',
      cases: [
        {
          discipline: 'webdesign',
          title: 'B2B-Relaunch fuer Industrieanbieter',
          client: 'NOVA Industrial',
          industry: 'Maschinenbau',
          summary:
            'Neustrukturierung der Website fuer klare Produktnavigation, bessere Conversion und ein modernes Markenbild.',
          challenge:
            'Unuebersichtliche Inhalte, schwache mobile Usability und hohe Absprungrate auf Leistungsseiten.',
          approach:
            'Neue Informationsarchitektur, modulares Komponenten-Set und mobile-first Design mit klaren CTA-Pfaden.',
          result:
            'Mehr qualifizierte Anfragen und bessere User Signals durch klare Struktur und schnellere Seite.',
          metrics: [
            { value: '+41%', label: 'Conversion Rate' },
            { value: '-29%', label: 'Bounce Rate' },
            { value: '1.6s', label: 'LCP' },
          ],
          tags: [{ label: 'UX' }, { label: 'Relaunch' }, { label: 'Performance' }],
          cta: { label: 'Case ansehen', href: '/kontakt' },
          featured: true,
        },
        {
          discipline: 'webdesign',
          title: 'Landingpage-System fuer Produktkampagnen',
          client: 'Atlas SaaS',
          industry: 'Software',
          summary:
            'Wiederverwendbare Landingpage-Komponenten fuer schnellere Kampagnenstarts und konsistente Marke.',
          challenge:
            'Jede Kampagne wurde als Einzelseite gebaut, was Zeit kostete und inkonsistente Designs erzeugte.',
          approach:
            'Designsystem-basierte Templates mit klaren Content-Zonen und performance-optimierter Umsetzung.',
          result:
            'Schnellere Produktionszyklen und bessere Vergleichbarkeit zwischen Kampagnen.',
          metrics: [
            { value: '-55%', label: 'Time to Publish' },
            { value: '+23%', label: 'Lead Rate' },
          ],
          tags: [{ label: 'Landingpages' }, { label: 'Designsystem' }],
          cta: { label: 'Mehr erfahren', href: '/kontakt' },
        },
      ],
    },
    calPopupBlock({
      headline: 'Webdesign-Projekt besprechen',
      description: 'In 30 Minuten klaeren wir Zielbild, Scope und die sinnvollste Umsetzungsreihenfolge.',
    }),
  ],
  metaTitle: 'Portfolio Webdesign | UX, UI und Performance',
  metaDescription:
    'Webdesign-Portfolio mit Cases zu Relaunch, UX und Conversion-optimierter Umsetzung.',
}

const MARKETING_PRESET: PortfolioPresetPage = {
  portfolioType: 'marketing',
  slug: 'portfolio-marketing',
  title: 'Portfolio Marketing',
  hero: {
    type: 'lowImpact',
    subheadline: 'Portfolio Marketing',
    headline: 'SEM, SEO und Lead-Setups mit klarer KPI-Logik',
    description:
      'Marketing-Cases mit nachvollziehbarem Prozess aus Analyse, Kampagnenstruktur, Tests und fortlaufender Optimierung.',
  },
  layout: [
    introBlock({
      heading: 'Marketing-Cases mit Datenfokus',
      body: 'Die Unterseite priorisiert Kennzahlen, kanalbezogene Learnings und die Verbindung von Traffic, Leads und Umsatz.',
      tagline: 'Nicht nur Reichweite. Relevante Leads und stabile Effizienz.',
    }),
    {
      blockType: 'portfolioKpiStrip',
      variant: 'solid',
      eyebrow: 'Performance Snapshot',
      heading: 'Ergebnisse ueber mehrere Marketing-Cases',
      intro: 'Ein Auszug zentraler Kennzahlen aus SEO-, SEM- und Lead-Projekten.',
      items: [
        {
          value: '+186%',
          label: 'Organischer Traffic',
          context: 'in 9 Monaten nach Relaunch',
          trend: 'up',
          delta: '+186%',
        },
        {
          value: '-32%',
          label: 'Cost per Lead',
          context: 'durch Kampagnenrestrukturierung',
          trend: 'down',
          delta: '-32%',
        },
        {
          value: '+64%',
          label: 'SQL-Volumen',
          context: 'durch Lead-Funnel-Optimierung',
          trend: 'up',
          delta: '+64%',
        },
        {
          value: '4.8x',
          label: 'ROAS (Peak)',
          context: 'Brand + Generic Search',
          trend: 'up',
          delta: '+1.1x',
        },
      ],
    },
    {
      blockType: 'portfolioCaseGrid',
      layoutVariant: 'data',
      eyebrow: 'Case Breakdown',
      heading: 'SEO, SEM und Leadgenerierung im Detail',
      intro: 'Jeder Case zeigt Ziel, Massnahmen und den messbaren Effekt.',
      cases: [
        {
          discipline: 'marketing',
          title: 'SEO-Relaunch mit Sichtbarkeitsaufbau',
          client: 'MEDIFLOW',
          industry: 'HealthTech',
          summary:
            'Technische und redaktionelle Neuausrichtung fuer bessere Rankings in transaktionalen Themenclustern.',
          challenge: 'Sichtbarkeitseinbruch nach CMS-Wechsel und schwache interne Verlinkung.',
          approach: 'URL-Mapping, Content-Hubs, Search-Intent-Optimierung und strukturierte Snippets.',
          result: 'Nachhaltiger Ranking-Aufbau und deutlich mehr organische Lead-Einstiege.',
          metrics: [
            { value: '+72%', label: 'Top-10 Keywords' },
            { value: '+118%', label: 'Organic Leads' },
          ],
          tags: [{ label: 'SEO' }, { label: 'Content Hub' }],
          cta: { label: 'Strategie anfragen', href: '/kontakt' },
        },
        {
          discipline: 'marketing',
          title: 'SEM-Funnel fuer B2B-Anfragen',
          client: 'CloudNova',
          industry: 'SaaS',
          summary:
            'Search- und Remarketing-Setup fuer qualifizierte Demos mit klarer Budgetsteuerung.',
          challenge: 'Hohe Klickkosten, geringe Abschlussrate und zu breite Keyword-Sets.',
          approach: 'Intent-Segmentierung, Negative-Listen, Landingpage-Tests und Bidding-Neuausrichtung.',
          result: 'Deutlich mehr qualifizierte Demo-Anfragen bei geringeren CPL-Werten.',
          metrics: [
            { value: '-27%', label: 'CPL' },
            { value: '+39%', label: 'Demo Rate' },
          ],
          tags: [{ label: 'SEM' }, { label: 'Lead Funnel' }],
          cta: { label: 'Case besprechen', href: '/kontakt' },
          featured: true,
        },
      ],
    },
    whyWorkWithMeBlock({
      heading: 'Was Marketing-Projekte hier unterscheidet',
      intro:
        'Die Umsetzung folgt einer klaren KPI-Dramaturgie: Hypothese, Test, Learnings und Skalierung.',
      reasons: [
        {
          icon: 'target',
          title: 'KPI-basierte Steuerung',
          description:
            'Entscheidungen werden konsequent an Leads, Conversion-Qualitaet und Effizienz ausgerichtet.',
        },
        {
          icon: 'trending-up',
          title: 'Iterative Optimierung',
          description:
            'Kampagnen und Landingpages werden datenbasiert weiterentwickelt statt einmalig ausgerollt.',
        },
        {
          icon: 'shield',
          title: 'Saubere Datenbasis',
          description:
            'Tracking, Attribution und Reporting werden belastbar aufgesetzt, damit Ergebnisse verlässlich sind.',
        },
      ],
    }),
    calPopupBlock({
      headline: 'Marketing-Ziele in einen klaren Plan uebersetzen',
      description: 'Wir priorisieren Kanaele, Budget und Quick Wins in einem kompakten Kickoff.',
    }),
  ],
  metaTitle: 'Portfolio Marketing | SEO, SEM und Leads',
  metaDescription:
    'Marketing-Portfolio mit KPI-Fokus fuer SEO, SEM und Leadgenerierung inklusive messbarer Ergebnisse.',
}

const BRANDING_PRESET: PortfolioPresetPage = {
  portfolioType: 'branding',
  slug: 'portfolio-branding',
  title: 'Portfolio Branding',
  hero: {
    type: 'lowImpact',
    subheadline: 'Portfolio Branding',
    headline: 'Markenauftritte von Logo bis konsistentem Designsystem',
    description:
      'Branding-Cases mit Fokus auf Positionierung, visuelle Sprache und Wiedererkennbarkeit ueber alle Touchpoints.',
  },
  layout: [
    introBlock({
      heading: 'Branding als zusammenhaengendes Markensystem',
      body: 'Hier stehen Markenstory, Logoarchitektur, Farbwelt und Typografie im Zentrum. Die Darstellung folgt einer klaren, editorialen Dramaturgie.',
      tagline: 'Marke ist mehr als ein Logo: sie wird in jedem Detail erlebbar.',
    }),
    {
      blockType: 'brandShowcase',
      eyebrow: 'Brand System',
      heading: 'Visuelle Leitplanken fuer konsistente Markenwahrnehmung',
      intro:
        'Ein editierbarer Bereich fuer Logo, Farbpalette, Typografie, Gestaltungsprinzipien und reale Anwendungen.',
      brandStory:
        'Die Marke positioniert sich als praeziser, verlässlicher Partner mit klarer Haltung: reduziert im Ausdruck, stark in der Wirkung.',
      palette: [
        { name: 'Midnight Ink', hex: '#0F172A', usage: 'Logo, Headlines, Text' },
        { name: 'Signal Coral', hex: '#F97366', usage: 'Highlights und CTAs' },
        { name: 'Warm Sand', hex: '#F5EFE7', usage: 'Backgrounds und Flaechen' },
      ],
      typography: [
        { role: 'Display', family: 'Outfit, sans-serif', sample: 'Brand Presence 2026' },
        { role: 'Body', family: 'Inter, sans-serif', sample: 'Clarity across every touchpoint.' },
      ],
      principles: [
        { title: 'Reduktion', description: 'Nur Elemente mit klarer Funktion bleiben sichtbar.' },
        {
          title: 'Kontrast',
          description: 'Lesbarkeit und visuelle Hierarchie werden konsequent priorisiert.',
        },
        {
          title: 'Konsistenz',
          description: 'Die gleiche Markenlogik gilt in Web, Social, Sales und Print.',
        },
      ],
      usageExamples: [],
    },
    {
      blockType: 'portfolioCaseGrid',
      layoutVariant: 'editorial',
      eyebrow: 'Branding Cases',
      heading: 'Markenentwicklung in realen Projekten',
      intro: 'Von Rebranding bis Launch: Cases mit klaren Designentscheidungen und Ergebnisbild.',
      cases: [
        {
          discipline: 'branding',
          title: 'Rebranding fuer Beratungsboutique',
          client: 'NORD Advisory',
          industry: 'Consulting',
          summary:
            'Neupositionierung mit frischer visueller Sprache, konsistentem Markensystem und hochwertigem Corporate Auftritt.',
          challenge:
            'Uneinheitliche Kommunikation, alte Wort-Bild-Marke und fehlende Richtlinien fuer Umsetzung.',
          approach:
            'Markenkern-Workshop, neues Logo-Set, Typo- und Farbdefinition sowie praxisnahe Brand-Regeln.',
          result: 'Ein klarer, wiedererkennbarer Markenauftritt ueber Website, Pitch und Social Kanaele.',
          metrics: [
            { value: '3 Wochen', label: 'Vom Workshop bis CI-Release' },
            { value: '+47%', label: 'Direkte Markenwiedererkennung (Survey)' },
          ],
          tags: [{ label: 'Rebranding' }, { label: 'Corporate Identity' }],
          cta: { label: 'Projekt anfragen', href: '/kontakt' },
          featured: true,
        },
      ],
    },
    contactInfoCardsBlock(),
    calPopupBlock({
      headline: 'Marke schaerfen und konsistent ausrollen',
      description:
        'Wir analysieren Status quo, definieren Leitplanken und priorisieren die naechsten Branding-Schritte.',
    }),
  ],
  metaTitle: 'Portfolio Branding | Marken, Logos und CI',
  metaDescription:
    'Branding-Portfolio mit editierbaren Bereichen fuer Markenstory, Logo, Farbpalette und Brand-Cases.',
}

const PRESETS_BY_TYPE: Record<PortfolioType, PortfolioPresetPage> = {
  webdesign: WEBDESIGN_PRESET,
  marketing: MARKETING_PRESET,
  branding: BRANDING_PRESET,
}

export const isPortfolioType = (value: unknown): value is PortfolioType =>
  typeof value === 'string' && PRESET_ORDER.includes(value as PortfolioType)

export const getPortfolioPresetPageByType = (type: PortfolioType): PortfolioPresetPage =>
  clone(PRESETS_BY_TYPE[type])

export const getPortfolioPresetPages = (): PortfolioPresetPage[] =>
  PRESET_ORDER.map((type) => getPortfolioPresetPageByType(type))

export const getPortfolioPresetLayout = (type: PortfolioType): Array<Record<string, unknown>> =>
  getPortfolioPresetPageByType(type).layout

export const getPortfolioPresetHero = (type: PortfolioType): Record<string, unknown> =>
  getPortfolioPresetPageByType(type).hero

export function isPlaceholderLayout(layout: unknown): boolean {
  if (!Array.isArray(layout)) return true
  if (layout.length === 0) return true

  if (layout.length === 1 && layout[0] && typeof layout[0] === 'object') {
    const blockType = (layout[0] as { blockType?: unknown }).blockType
    return blockType === 'content'
  }

  return false
}
