import './load-env-import'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'

type PageTemplate = {
  slug: string
  title: string
  parentSlug?: string
  hero: Record<string, unknown>
  layout: Array<Record<string, unknown>>
  metaTitle: string
  metaDescription: string
}

type ServicePageTemplate = PageTemplate

function isPlaceholderLayout(layout: unknown): boolean {
  if (!Array.isArray(layout)) return true
  if (layout.length === 0) return true
  if (layout.length === 1 && layout[0] && typeof layout[0] === 'object') {
    const blockType = (layout[0] as { blockType?: unknown }).blockType
    return blockType === 'content'
  }
  return false
}
const templates: ServicePageTemplate[] = [
  {
    slug: 'leistungen',
    title: 'Leistungen',
    hero: {
      type: 'superhero',
      headline: 'Leistungen für Webdesign, Marketing und laufende Betreuung',
      subheadline: 'Klar strukturiert, technisch sauber und auf messbare Ergebnisse ausgerichtet.',
      description:
        'Ich entwickle digitale Auftritte, die nicht nur gut aussehen, sondern Orientierung schaffen, Vertrauen aufbauen und Anfragen ermöglichen.',
      links: [
        {
          link: {
            type: 'custom',
            url: '#services',
            label: 'Zu den Leistungen',
          },
        },
      ],
    },
    layout: [
      {
        blockType: 'introduction',
        heading: 'Ein Hub für alle Leistungen',
        body: 'Damit Sie schnell den passenden Bereich finden und direkt sehen, wie ich arbeite.',
        tagline: 'Klar strukturiert. Direkt verständlich. Auf den Punkt.',
      },
      {
        blockType: 'servicesGrid',
        heading: 'Leistungsspektrum im Überblick',
        intro:
          'Jeder Bereich ist einzeln buchbar und führt auf eine eigene Unterseite. Dort sehen Sie typische Leistungen, konkrete Schwerpunkte und den jeweiligen Nutzen auf einen Blick. So können Sie schnell einschätzen, welcher Bereich zu Ihrem Ziel passt und direkt den nächsten Schritt gehen.',
        tagline: '',
        radialBackground: true,
        radialBackgroundVariant: 'blue',
        radialBackgroundStrength: 'medium',
        categories: [
          {
            categoryLabel: 'Design & Website',
            services: [
              {
                title: 'Webdesign',
                description:
                  'Webdesign und Entwicklung für klare, schnelle und markengerechte Websites.',
                icon: {
                  url: '/api/media/file/webdesign-4.svg',
                  alt: 'Webdesign Icon',
                },
                link: { slug: 'leistungen/webdesign' },
              },
              {
                title: 'Printmedien & Grafikdesign',
                description:
                  'Printprodukte und Grafikdesign, die visuell präzise und wiedererkennbar wirken.',
                icon: {
                  url: '/api/media/file/printmedien-1.svg',
                  alt: 'Printmedien & Grafikdesign Icon',
                },
                link: { slug: 'printmedien-grafikdesign' },
              },
              {
                title: 'Präsentationen & Keynotes',
                description:
                  'Starke Präsentationen mit klarer Dramaturgie und hochwertiger Visualität.',
                icon: {
                  url: '/api/media/file/keynotes-4.svg',
                  alt: 'Präsentationen & Keynotes Icon',
                },
                link: { slug: 'praesentationen-keynotes' },
              },
            ],
          },
          {
            categoryLabel: 'Marketing & Sichtbarkeit',
            services: [
              {
                title: 'SEO - Rankings',
                description:
                  'Suchmaschinenoptimierung für langfristige Sichtbarkeit und qualifizierte Zugriffe.',
                icon: {
                  url: '/api/media/file/Seo-Suchmaschinenoptimierung-1.svg',
                  alt: 'SEO Icon',
                },
                link: { slug: 'seo-rankings' },
              },
              {
                title: 'SEM - Online Werbung',
                description:
                  'Performance-Kampagnen für Sichtbarkeit, Leads und messbare Resultate.',
                icon: {
                  url: '/api/media/file/SEM-Suchmaschinenmarketing-1.svg',
                  alt: 'SEM Icon',
                },
                link: { slug: 'sem-online-werbung' },
              },
              {
                title: 'Content Creation',
                description:
                  'Inhalte für Website, Social Media und Kampagnen, die Ihre Marke lebendig machen.',
                icon: {
                  url: '/api/media/file/content-creation-4.svg',
                  alt: 'Content Creation Icon',
                },
                link: { slug: 'content-creation' },
              },
            ],
          },
          {
            categoryLabel: 'Branding & Identity',
            services: [
              {
                title: 'CI - Corporate Identity',
                description:
                  'Einheitliche Markenauftritte mit klarer visueller Sprache und konsistenten Regeln.',
                icon: {
                  url: '/api/media/file/Corporate-Identity-CI-3.svg',
                  alt: 'CI Icon',
                },
                link: { slug: 'ci-corporate-identity' },
              },
              {
                title: 'Logo-Entwicklung',
                description:
                  'Einprägsame Logos mit Varianten für digitale und analoge Anwendungen.',
                icon: {
                  url: '/api/media/file/Logo-Design-3.svg',
                  alt: 'Logo-Entwicklung Icon',
                },
                link: { slug: 'logo-entwicklung' },
              },
              {
                title: 'Markenstrategie',
                description:
                  'Positionierung, Kernbotschaften und Leitplanken für eine starke Marke.',
                icon: {
                  url: '/api/media/file/markenstrategie-4.svg',
                  alt: 'Markenstrategie Icon',
                },
                link: { slug: 'markenstrategie' },
              },
            ],
          },
        ],
      },
      {
        blockType: 'calPopup',
        headline: 'Lassen Sie uns das passende Vorgehen für Ihr Projekt finden',
        description:
          'In einem kurzen Gespräch klären wir, welcher Leistungsbereich für Sie am sinnvollsten ist und wie der nächste Schritt aussieht.',
        calLink: 'philippbacher/30min',
        buttonLabel: 'Termin buchen',
      },
    ],
    metaTitle: 'Leistungen | Webdesign, Marketing und Betreuung',
    metaDescription:
      'Klar strukturierte Leistungen für Webdesign, Marketing und laufende Website-Betreuung.',
  },
  {
    slug: 'webdesign',
    parentSlug: 'leistungen',
    title: 'Webdesign',
    hero: {
      type: 'lowImpact',
      headline: 'Webdesign für hochwertige Markenauftritte',
      subheadline: 'Reduziert, klar und technisch erstklassig.',
      description:
        'Webseiten, die durch ihre Ruhe, Struktur und Performance Vertrauen schaffen – im B2B- und B2C-Bereich.',
    },
    layout: [
      {
        blockType: 'introduction',
        heading: 'Minimalistisch und wirkungsvoll',
        body: 'Klar strukturiertes Webdesign kombiniert professionelle Ästhetik mit einer überzeugenden User Experience. Jede Seite kann im Backend weiter angepasst werden.',
      },
      {
        blockType: 'servicesOverview',
        heading: 'Design- und Technik-Schwerpunkte',
        intro: 'Schwerpunkte, die auf eleganten Auftritt und stabilen Betrieb abzielen.',
        services: [
          {
            icon: 'monitor',
            title: 'Visuelle Struktur',
            description:
              'Klare Hierarchien, reduzierte Layouts und eine ruhige Informationsarchitektur.',
          },
          {
            icon: 'globe',
            title: 'Responsive Umsetzung',
            description: 'Perfekte Darstellung auf Desktop, Tablet und Mobile.',
          },
          {
            icon: 'shield',
            title: 'Zukunftsfähige Technik',
            description: 'Sauberer Code, gute Performance und langfristig wartbare Strukturen.',
          },
        ],
      },
      {
        blockType: 'whyWorkWithMe',
        heading: 'Was Webdesign hier ausmacht',
        reasons: [
          {
            icon: 'target',
            title: 'Fokus auf Konversion',
            description: 'Design, das Besucher zielgerichtet führt.',
          },
          {
            icon: 'trending-up',
            title: 'Messbare Wirkung',
            description: 'Gestaltung, die nicht nur schön ist, sondern funktioniert.',
          },
          {
            icon: 'handshake',
            title: 'Echt handhabbar',
            description: 'Backend-freundliche Struktur für langfristige Pflege.',
          },
        ],
      },
      {
        blockType: 'calPopup',
        headline: 'Webdesign-Inhalte und Scope klären',
        description:
          'Gemeinsam prüfen wir, welche Inhalte, Komponenten und Prozesse für Ihr Projekt sinnvoll sind.',
        calLink: 'philippbacher/30min',
        buttonLabel: 'Webdesign Termin buchen',
      },
    ],
    metaTitle: 'Webdesign | Leistungen',
    metaDescription:
      'Webdesign-Services mit Schwerpunkt auf minimalistischer Gestaltung, Performance und langfristiger Wartbarkeit.',
  },
  {
    slug: 'marketing',
    parentSlug: 'leistungen',
    title: 'Marketing',
    hero: {
      type: 'lowImpact',
      headline: 'Digitales Marketing mit technischem Fokus',
      subheadline: 'Strategisch, messbar und klar strukturiert.',
      description:
        'Marketing, das nicht nur Reichweite generiert, sondern echte Leads und verlässliche digitale Präsenz aufbaut.',
    },
    layout: [
      {
        blockType: 'introduction',
        heading: 'Marketing als klarer Prozess',
        body: 'Ich kombiniere Strategie, Kreation und technische Umsetzung zu einem schlanken Marketing-Setup, das sich leicht steuern lässt.',
      },
      {
        blockType: 'servicesOverview',
        heading: 'Kernbereiche im Marketing',
        intro: 'Klare Angebote für Sichtbarkeit, Performance und Conversion.',
        services: [
          {
            icon: 'trending-up',
            title: 'SEO & Sichtbarkeit',
            description: 'Fundamentale Optimierung für nachhaltige organische Reichweite.',
          },
          {
            icon: 'rocket',
            title: 'Paid Media',
            description: 'Zielgerichtete Kampagnen mit klaren Performance-Zielen.',
          },
          {
            icon: 'zap',
            title: 'Lead-Steuerung',
            description: 'Funnel-orientierte Maßnahmen für qualifizierten Traffic.',
          },
        ],
      },
      {
        blockType: 'whyWorkWithMe',
        heading: 'Warum Marketing mit mir funktioniert',
        reasons: [
          {
            icon: 'search',
            title: 'Datengetrieben',
            description: 'Entscheidungen auf Basis von messbaren Ergebnissen.',
          },
          {
            icon: 'briefcase',
            title: 'Klare Prioritäten',
            description: 'Keine unnötigen Maßnahmen, nur gezielte Wirkung.',
          },
          {
            icon: 'globe',
            title: 'Skalierbar',
            description: 'Maßnahmen, die sich an Wachstum anpassen.',
          },
        ],
      },
      {
        blockType: 'calPopup',
        headline: 'Marketing-Plan und Kanäle festlegen',
        description:
          'Gemeinsam besprechen wir Zielgruppe, Kanalmix und mögliche Quick Wins für Ihr Projekt.',
        calLink: 'philippbacher/30min',
        buttonLabel: 'Marketing Termin buchen',
      },
    ],
    metaTitle: 'Marketing | Leistungen',
    metaDescription:
      'Marketing-Services mit klarem Fokus auf Sichtbarkeit, Leads und wachstumsorientierte Performance.',
  },
  {
    slug: 'wartung',
    parentSlug: 'leistungen',
    title: 'Wartung',
    hero: {
      type: 'lowImpact',
      headline: 'Wartung und Support für langfristige Web-Systeme',
      subheadline: 'Stabilität, Sicherheit und kontinuierliche Pflege.',
      description:
        'Sorgloser Betrieb für Webseiten und digitale Plattformen: Updates, Monitoring und schnelle Fehlerbehebung.',
    },
    layout: [
      {
        blockType: 'introduction',
        heading: 'Technische Wartung, die Ruhe schafft',
        body: 'Regelmäßige Wartung sorgt dafür, dass Ihre Website sicher, performant und aktuell bleibt – ohne manuellen Mehraufwand für Sie.',
      },
      {
        blockType: 'servicesOverview',
        heading: 'Wartungsleistungen',
        intro: 'Klare Aufgaben rund um Sicherheit, Updates und laufende Betreuung.',
        services: [
          {
            icon: 'shield',
            title: 'Sicherheitsupdates',
            description: 'Regelmäßige Pflege von Software, Plugins und Frameworks.',
          },
          {
            icon: 'clock-3',
            title: 'Monitoring & Support',
            description: 'Technische Überwachung und schnelle Reaktion bei Störungen.',
          },
          {
            icon: 'settings2',
            title: 'Inhaltspflege',
            description: 'Kleine Anpassungen, Textupdates und strukturierte Änderungen.',
          },
        ],
      },
      {
        blockType: 'whyWorkWithMe',
        heading: 'Was Wartung hier auszeichnet',
        reasons: [
          {
            icon: 'shield',
            title: 'Zuverlässig',
            description: 'Klare Pflegeintervalle und transparente Prozesse.',
          },
          {
            icon: 'clock-3',
            title: 'Schnelle Reaktion',
            description: 'Technischer Support ohne lange Wartezeiten.',
          },
          {
            icon: 'zap',
            title: 'Updates mit Überblick',
            description: 'Weniger Risiko durch kontrollierte Aktualisierungen.',
          },
        ],
      },
      {
        blockType: 'calPopup',
        headline: 'Wartungsbedarf und Serviceumfang klären',
        description:
          'Gemeinsam prüfen wir den passenden Wartungsumfang für Ihre Website und digitalen Services.',
        calLink: 'philippbacher/30min',
        buttonLabel: 'Wartungstermin buchen',
      },
    ],
    metaTitle: 'Wartung | Leistungen',
    metaDescription:
      'Wartung und Support für Websites: Sicherheitsupdates, Monitoring und laufende Pflege.',
  },
]

async function main() {
  const args = new Set(process.argv.slice(2))
  const overwrite = args.has('--overwrite')
  const dryRun = args.has('--dry-run')
  const onlyArg = [...args].find((arg) => arg.startsWith('--only='))
  const onlySlugs = onlyArg
    ? new Set(
        onlyArg
          .replace('--only=', '')
          .split(',')
          .map((slug) => slug.trim())
          .filter(Boolean),
      )
    : null
  const payload = await getPayload({ config })
  const now = new Date().toISOString()

  const created: string[] = []
  const updated: string[] = []
  const skipped: string[] = []

  for (const template of templates) {
    if (onlySlugs && !onlySlugs.has(template.slug)) {
      continue
    }

    const existing = await payload.find({
      collection: 'site-pages',
      limit: 1,
      depth: 0,
      overrideAccess: true,
      where: {
        slug: {
          equals: template.slug,
        },
      },
    })

    const owner = existing.docs[0]
    const parent = template.parentSlug
      ? await payload.find({
          collection: 'site-pages',
          limit: 1,
          depth: 0,
          overrideAccess: true,
          where: {
            slug: {
              equals: template.parentSlug,
            },
          },
        })
      : null

    const parentValue = parent?.docs?.[0]?.id

    const data: RequiredDataFromCollectionSlug<'site-pages'> = {
      title: template.title,
      slug: template.slug,
      hero: template.hero as RequiredDataFromCollectionSlug<'site-pages'>['hero'],
      layout: template.layout as unknown as RequiredDataFromCollectionSlug<'site-pages'>['layout'],
      meta: {
        title: template.metaTitle,
        description: template.metaDescription,
      },
      _status: 'published',
      publishedAt: now,
      ...(parentValue ? { parent: parentValue } : {}),
    }

    if (!owner) {
      if (dryRun) {
        console.log(`[dry-run] create: ${template.slug}`)
      } else {
        await payload.create({
          collection: 'site-pages',
          data,
          draft: false,
          overrideAccess: true,
          depth: 0,
          context: { skipRevalidate: true },
        })
        console.log(`create: ${template.slug}`)
      }
      created.push(template.slug)
      continue
    }

    const placeholder = isPlaceholderLayout(owner.layout)
    if (!overwrite && !placeholder) {
      console.log(`skip (existing content): ${template.slug}`)
      skipped.push(template.slug)
      continue
    }

    if (dryRun) {
      console.log(`[dry-run] update: ${template.slug}${placeholder ? ' (placeholder)' : ''}`)
    } else {
      await payload.update({
        collection: 'site-pages',
        id: owner.id,
        data,
        overrideAccess: true,
        depth: 0,
        context: { skipRevalidate: true },
      })
      console.log(`update: ${template.slug}${placeholder ? ' (placeholder)' : ''}`)
    }
    updated.push(template.slug)
  }

  console.log('')
  console.log(
    `done: created=${created.length}, updated=${updated.length}, skipped=${skipped.length}, dryRun=${dryRun}`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
