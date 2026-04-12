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
      type: 'leistungenHero',
      headline: 'Leistungen für elegantes Webdesign mit technischem Anspruch',
      subheadline: 'Edel. Minimal. Performance-orientiert.',
      description:
        'Ich verbinde ästhetische Digital-Erlebnisse mit klaren Prozessen und technischer Verlässlichkeit – für Websites, die überzeugen und langfristig funktionieren.',
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
        blockType: 'servicesOverview',
        heading: 'Leistungs-Hub auf einen Blick',
        intro:
          'Vier Kernbereiche, die als zusammenhängender Prozess funktionieren - von der strategischen Grundlage bis zur kontinuierlichen Optimierung.',
        services: [
          {
            icon: 'compass',
            title: 'Strategie & Beratung',
            description:
              'Positionierung, Zielbild und Prioritäten, damit jede Maßnahme auf ein klares Ergebnis einzahlt.',
          },
          {
            icon: 'code',
            title: 'Webdesign & Umsetzung',
            description:
              'Reduziertes, hochwertiges Design plus technische Umsetzung für schnelle, stabile und wartbare Systeme.',
          },
          {
            icon: 'megaphone',
            title: 'Marketing & Reichweite',
            description:
              'Gezielte Maßnahmen für Sichtbarkeit, qualifizierte Anfragen und nachvollziehbare Performance.',
          },
          {
            icon: 'shield',
            title: 'Wartung & Entwicklung',
            description:
              'Kontinuierliche Pflege, Verbesserungen und klare Weiterentwicklung statt punktueller Einmal-Projekte.',
          },
        ],
      },
      {
        blockType: 'introduction',
        heading: 'Ein Hub statt isolierter Einzelleistungen',
        body: 'Der Leistungs-Hub bündelt Strategie, Gestaltung, Technik und Vermarktung in einer klaren Journey. So entstehen keine Medienbrüche zwischen Beratung, Umsetzung und Betrieb.',
        tagline: 'Edel im Auftritt. Präzise in der Ausführung. Messbar in der Wirkung.',
      },
      {
        blockType: 'consultingOverview',
        headline: 'So läuft die Zusammenarbeit - klar, strukturiert, transparent',
        introText:
          'Jeder Schritt baut logisch auf dem vorherigen auf. Das reduziert Reibung und schafft eine belastbare Grundlage für Wachstum.',
        strategyLabel: 'Analyse & Ausrichtung',
        strategySubLabel: 'Strategischer Startpunkt',
        strategyTitle: 'Wir definieren Ziele, Prioritäten und die richtige digitale Richtung',
        strategyText:
          'Am Anfang stehen Zielgruppen, Angebotsschärfung und ein realistischer Maßnahmenplan. Damit wird aus Einzelideen ein konsistentes System mit klaren Prioritäten.',
        benefitsLabel: 'Umsetzung & Ergebnis',
        benefitsSubLabel: 'Vom Konzept zur Wirkung',
        benefitsTitle: 'Umsetzung in präzisen Etappen',
        benefitItems: [
          {
            title: 'Konzept & Informationsarchitektur',
            text: 'Struktur, Seitenlogik und User-Flows werden klar definiert, bevor Design und Entwicklung starten.',
          },
          {
            title: 'Design & Content',
            text: 'Visuelle Sprache und Inhalte werden aufeinander abgestimmt, damit Marke und Nutzen auf den ersten Blick verständlich sind.',
          },
          {
            title: 'Technische Umsetzung',
            text: 'Performante Entwicklung mit sauberer Basis für SEO, Tracking, Erweiterungen und langfristige Wartbarkeit.',
          },
          {
            title: 'Launch, Messung und Optimierung',
            text: 'Nach dem Go-live werden Daten genutzt, um Conversions, Sichtbarkeit und Prozesse systematisch weiterzuentwickeln.',
          },
        ],
        experienceLabel: 'Langfristige Partnerschaft',
        experienceSubLabel: 'Stabilität mit Entwicklungsspielraum',
        experienceTitle:
          'Nach dem Launch begleite ich den Hub kontinuierlich bei Verbesserungen, Tests und Skalierung',
      },
      {
        blockType: 'servicesGrid',
        heading: 'Meine Servicebereiche',
        intro:
          'Wähle den Bereich, der zu deinem Projekt passt. Jede Seite ist editierbar und fokussiert auf einen klaren Leistungsbereich.',
        tagline: 'Klar strukturiert. Zielgerichtet. Backend-bearbeitbar.',
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
                  'Moderne, minimalistische Webseiten mit klarer Struktur, schnellen Ladezeiten und hochwertiger Optik.',
                icon: {
                  url: '/api/media/file/webdesign.svg',
                  alt: 'Webdesign Icon',
                },
                link: { slug: 'leistungen/webdesign' },
              },
              {
                title: 'Wartung & Support',
                description:
                  'Laufende Pflege, Sicherheitsupdates und schnelle technische Reaktion für sorgenfreie Webauftritte.',
                icon: {
                  url: '/api/media/file/marketing-leistungen.svg',
                  alt: 'Wartung Icon',
                },
                link: { slug: 'leistungen/wartung' },
              },
            ],
          },
          {
            categoryLabel: 'Strategie & Wachstum',
            services: [
              {
                title: 'Marketing',
                description:
                  'Strategisch gesteuerte Digital-Kampagnen mit Fokus auf Sichtbarkeit, Leads und messbare Effekte.',
                icon: {
                  url: '/api/media/file/marketing-leistungen.svg',
                  alt: 'Marketing Icon',
                },
                link: { slug: 'leistungen/marketing' },
              },
            ],
          },
        ],
      },
      {
        blockType: 'whyWorkWithMe',
        heading: 'Warum diese Leistungen funktionieren',
        intro:
          'Jede Spezialisierung ist so aufgebaut, dass Inhalte und Abläufe klar bleiben – auch im Backend.',
        reasons: [
          {
            icon: 'zap',
            title: 'Technisch präzise',
            description: 'Klare Standards für Code, Performance und Wartbarkeit.',
          },
          {
            icon: 'target',
            title: 'Reduziert und fokussiert',
            description: 'Kein Overhead, sondern schlank gestaltete Lösungen mit klarem Nutzen.',
          },
          {
            icon: 'shield',
            title: 'Verlässlich',
            description: 'Webseiten und Systeme mit langfristiger Stabilität und Sicherheit.',
          },
        ],
      },
      {
        blockType: 'calPopup',
        headline: 'Gemeinsam den nächsten Schritt planen',
        description:
          'In einem kurzen Kennenlerntermin prüfen wir, welcher Leistungsbereich am besten zu deinem Projekt passt.',
        calLink: 'philippbacher/30min',
        buttonLabel: 'Termin buchen',
      },
    ],
    metaTitle: 'Leistungen | Webdesign, Marketing, Wartung',
    metaDescription:
      'Editierbare Leistungen für Webdesign, Marketing und Wartung. Minimal, technisch und hochwertig strukturiert.',
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
          'Wir prüfen gemeinsam, welche Inhalte, Komponenten und Prozesse für dein Projekt sinnvoll sind.',
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
          'Wir besprechen Zielgruppe, Kanalmix und mögliche Quick Wins für dein Projekt.',
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
        body: 'Regelmäßige Wartung sorgt dafür, dass deine Website sicher, performant und aktuell bleibt – ohne manuellen Mehraufwand für dich.',
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
          'Wir prüfen gemeinsam den passenden Wartungsumfang für deine Website und digitalen Services.',
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
  const payload = await getPayload({ config })
  const now = new Date().toISOString()

  const created: string[] = []
  const updated: string[] = []
  const skipped: string[] = []

  for (const template of templates) {
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
