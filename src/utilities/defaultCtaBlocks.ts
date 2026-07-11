import type { SitePage } from '@/payload-types'

type LayoutBlock = NonNullable<SitePage['layout']>[number]

type CtaVariant = {
  id: string
  heading: string
  text: string
  label: string
  href?: string
}

type CtaContext = {
  slug?: string | null
  title?: string | null
  section: 'leistung' | 'portfolio'
}

const serviceCtas: Array<{ matches: string[]; cta: CtaVariant }> = [
  {
    matches: ['webdesign', 'website', 'webseite', 'relaunch'],
    cta: {
      id: 'auto-cta-webdesign',
      heading: 'Ihre Website soll nicht nur gut aussehen, sondern Anfragen bringen?',
      text: 'Lassen Sie uns Struktur, Design und Umsetzung so planen, dass Besucher schnell verstehen, warum Sie die richtige Wahl sind.',
      label: 'Website-Projekt besprechen',
    },
  },
  {
    matches: ['seo', 'rankings', 'suchmaschinenoptimierung'],
    cta: {
      id: 'auto-cta-seo',
      heading: 'Sie wollen bei passenden Suchanfragen sichtbarer werden?',
      text: 'Ich prüfe, welche SEO-Hebel für Ihre Seite zuerst Wirkung entfalten: Technik, Inhalte, Struktur oder lokale Signale.',
      label: 'SEO-Potenzial einschätzen lassen',
    },
  },
  {
    matches: ['sem', 'google ads', 'online-werbung', 'werbung', 'kampagnen'],
    cta: {
      id: 'auto-cta-sem',
      heading: 'Ihre Kampagnen sollen bessere Anfragen statt nur Klicks erzeugen?',
      text: 'Gemeinsam priorisieren wir Budget, Suchintentionen, Landingpages und Tracking für ein schlankes, auswertbares Setup.',
      label: 'Kampagnen-Setup prüfen',
    },
  },
  {
    matches: ['content', 'texte', 'creation'],
    cta: {
      id: 'auto-cta-content',
      heading: 'Ihre Inhalte sollen Fachlichkeit zeigen und Entscheidungen leichter machen?',
      text: 'Ich entwickle Content-Strukturen, Texte und Themen, die Nutzerfragen beantworten und Ihre Leistungen klar positionieren.',
      label: 'Content-Fahrplan anfragen',
    },
  },
  {
    matches: ['corporate identity', 'ci', 'corporate design'],
    cta: {
      id: 'auto-cta-corporate-identity',
      heading: 'Ihre Marke braucht einen konsistenten Auftritt über alle Kanäle?',
      text: 'Wir schärfen Positionierung, visuelle Leitplanken und Anwendungen, damit Ihr Auftritt wiedererkennbar und belastbar wird.',
      label: 'Markenauftritt besprechen',
    },
  },
  {
    matches: ['logo'],
    cta: {
      id: 'auto-cta-logo',
      heading: 'Sie brauchen ein Logo, das mehr trägt als nur einen ersten Eindruck?',
      text: 'Ich entwickle Zeichen, Wortmarken und Varianten, die in Website, Social Media, Print und Präsentationen zuverlässig funktionieren.',
      label: 'Logo-Projekt anfragen',
    },
  },
  {
    matches: ['markenstrategie', 'strategie', 'positionierung'],
    cta: {
      id: 'auto-cta-markenstrategie',
      heading: 'Ihre Marke soll klarer positioniert und leichter erklärbar werden?',
      text: 'Gemeinsam verdichten wir Zielgruppen, Nutzenargumente und Tonalität zu einem nachvollziehbaren Markenrahmen.',
      label: 'Strategiegespräch starten',
    },
  },
  {
    matches: ['print', 'grafikdesign'],
    cta: {
      id: 'auto-cta-print-grafikdesign',
      heading: 'Ihre Gestaltung soll digital und gedruckt aus einem Guss wirken?',
      text: 'Ich übersetze Ihre Marke in klare Layouts, Medien und Vorlagen, die professionell aussehen und praktisch nutzbar bleiben.',
      label: 'Designbedarf klären',
    },
  },
  {
    matches: ['praesentation', 'präsentation', 'keynote'],
    cta: {
      id: 'auto-cta-praesentationen',
      heading: 'Ihre Präsentation soll klar führen statt Folien nur zu füllen?',
      text: 'Ich helfe bei Storyline, Struktur und visueller Ausarbeitung, damit Ihre Botschaft verständlich und überzeugend ankommt.',
      label: 'Präsentation besprechen',
    },
  },
  {
    matches: ['potentialanalyse', 'potenzialanalyse', 'analyse'],
    cta: {
      id: 'auto-cta-potentialanalyse',
      heading: 'Sie möchten wissen, welche digitalen Hebel sich wirklich lohnen?',
      text: 'Ich analysiere Website, Sichtbarkeit und Conversion-Pfade und leite daraus konkrete, priorisierte nächste Schritte ab.',
      label: 'Potenzialanalyse anfragen',
    },
  },
  {
    matches: ['automatisierung', 'automation', 'automatisieren'],
    cta: {
      id: 'auto-cta-automatisierung',
      heading: 'Sie möchten Abläufe automatisieren, ohne Kontrolle zu verlieren?',
      text: 'Ich prüfe Prozesse, Tools und Schnittstellen und entwickle ein Setup, das wiederkehrende Aufgaben zuverlässig vereinfacht.',
      label: 'Automatisierung besprechen',
    },
  },
]

const portfolioCtas: Array<{ matches: string[]; cta: CtaVariant }> = [
  {
    matches: ['portfolio-webdesign', 'webdesign'],
    cta: {
      id: 'auto-cta-portfolio-webdesign',
      heading: 'Ein Webdesign-Projekt mit ähnlichem Anspruch geplant?',
      text: 'Ich übertrage Strategie, UX und saubere Umsetzung auf Ihr konkretes Zielbild: von Relaunch bis Landingpage-System.',
      label: 'Webdesign-Projekt anfragen',
    },
  },
  {
    matches: ['portfolio-marken', 'portfolio-branding', 'branding', 'marken'],
    cta: {
      id: 'auto-cta-portfolio-branding',
      heading: 'Ihre Marke soll klarer, hochwertiger und konsistenter auftreten?',
      text: 'Ich entwickle Markenauftritte, die Positionierung, Logo, Designsystem und digitale Anwendung zusammenführen.',
      label: 'Branding-Projekt starten',
    },
  },
]

const fallbackServiceCta: CtaVariant = {
  id: 'auto-cta-leistung',
  heading: 'Sie möchten diese Leistung auf Ihr Projekt übertragen?',
  text: 'In einem kurzen Gespräch klären wir Ziele, Ausgangslage und den sinnvollsten nächsten Schritt.',
  label: 'Projekt besprechen',
}

const fallbackPortfolioCta: CtaVariant = {
  id: 'auto-cta-portfolio',
  heading: 'Sie planen ein Projekt mit ähnlichem Anspruch?',
  text: 'Ich zeige Ihnen, welche Schritte für Strategie, Umsetzung und messbare Wirkung in Ihrem Fall sinnvoll sind.',
  label: 'Projektidee besprechen',
}

function normalize(value?: string | null): string {
  return (value ?? '').trim().toLowerCase()
}

function findCtaVariant({ slug, title, section }: CtaContext): CtaVariant {
  const haystack = `${normalize(slug)} ${normalize(title)}`
  const variants = section === 'portfolio' ? portfolioCtas : serviceCtas
  const match = variants.find(({ matches }) => matches.some((term) => haystack.includes(term)))

  return match?.cta ?? (section === 'portfolio' ? fallbackPortfolioCta : fallbackServiceCta)
}

function buildRichText(heading: string, text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h3',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: heading,
              version: 1,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export function hasCtaBlock(blocks: ReadonlyArray<unknown>): boolean {
  return blocks.some(
    (block) =>
      block != null &&
      typeof block === 'object' &&
      'blockType' in block &&
      (block as { blockType?: unknown }).blockType === 'cta',
  )
}

export function buildDefaultCtaBlock(context: CtaContext): LayoutBlock {
  const cta = findCtaVariant(context)

  return {
    id: cta.id,
    blockType: 'cta',
    blockSpacingPadding: 'default',
    blockSpacingPaddingTop: 'default',
    blockSpacingMarginBottom: 'default',
    blockContainer: 'default',
    blockBackground: 'none',
    blockName: cta.heading,
    richText: buildRichText(cta.heading, cta.text),
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: cta.label,
          url: cta.href ?? '/kontakt',
        },
      },
    ],
  } as LayoutBlock
}

export function appendDefaultCtaBlock(
  blocks: NonNullable<SitePage['layout']>,
  context: CtaContext,
): NonNullable<SitePage['layout']> {
  if (hasCtaBlock(blocks)) return blocks

  return [...blocks, buildDefaultCtaBlock(context)] as NonNullable<SitePage['layout']>
}
