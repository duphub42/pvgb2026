import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultSteps = [
  {
    stepNumber: '01',
    title: 'Analyse & Ausrichtung',
    subtitle: 'Fundament für alle weiteren Maßnahmen',
    text: 'Wir definieren Ziele, Prioritäten und den richtigen Fokus. Vor der Umsetzung klären wir, was wirklich zählt: Zielgruppen, Positionierung, Angebote und konkrete Business-Ziele. So entsteht ein belastbarer Plan statt Aktionismus.',
  },
  {
    stepNumber: '02',
    title: 'Klärung & Strategie',
    subtitle: 'Ziele verstehen & Struktur schaffen',
    text: 'Wir besprechen Ihr Projekt, Ihre Zielgruppe und die gewünschten Ergebnisse. Daraus entsteht eine klare strategische Grundlage für alle weiteren Schritte.',
  },
  {
    stepNumber: '03',
    title: 'Konzept & Rahmen',
    subtitle: 'Struktur, UX & visuelle Richtung',
    text: 'Ich entwickle eine klare Struktur, Inhaltsführung und visuelle Richtung. Das Design wird strategisch aufgebaut, nicht dekorativ.',
  },
  {
    stepNumber: '04',
    title: 'Umsetzung & Feinschliff',
    subtitle: 'Design & Development in hoher Qualität',
    text: 'Die Website bzw. dein Projekt entsteht in enger Abstimmung mit dir, mit Fokus auf Nutzerführung, Performance und Detailqualität.',
  },
  {
    stepNumber: '05',
    title: 'Go-live & Begleitung',
    subtitle: 'Launch & erste Optimierung',
    text: 'Nach dem Launch stehe ich für erste Optimierungen, Testing und Fragen zur Verfügung, um einen sauberen Start sicherzustellen.',
  },
  {
    stepNumber: '06',
    title: 'Langfristige Partnerschaft',
    subtitle: 'Weiterentwicklung auf Basis realer Daten',
    text: 'Nach der Umsetzung begleite ich bei Skalierung, Tests, SEO-Optimierung und kontinuierlicher Verbesserung auf Basis echter Nutzerdaten.',
  },
]

export const HeroWithProcess: Block = {
  slug: 'heroWithProcess',
  interfaceName: 'HeroWithProcessBlock',
  labels: {
    singular: 'Hero mit Prozess',
    plural: 'Hero mit Prozess',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'seoH1',
      type: 'text',
      label: 'SEO H1 (visuell versteckt)',
      defaultValue: 'Webdesign, Strategie, Entwicklung und langfristige digitale Betreuung',
      admin: {
        description: 'Nur für SEO. Im Frontend ausgeblendet, aber für Suchmaschinen sichtbar.',
      },
    },
    {
      name: 'heroEyebrow',
      type: 'text',
      label: 'Hero Kicker',
      defaultValue: 'Strategie · Design · Entwicklung · Wachstum',
    },
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero Überschrift',
      defaultValue: 'Von der Strategie zur messbaren Wirkung',
    },
    {
      name: 'heroText',
      type: 'textarea',
      label: 'Hero Text',
      defaultValue:
        'Strukturierte Prozesse, klare Entscheidungen und digitale Systeme, die nicht nur gut aussehen, sondern echte Ergebnisse liefern.',
    },
    {
      name: 'processHeading',
      type: 'text',
      label: 'Prozess Überschrift',
      defaultValue: 'So läuft die Zusammenarbeit',
    },
    {
      name: 'processIntro',
      type: 'textarea',
      label: 'Prozess Einleitung',
      defaultValue: 'Transparent, strukturiert und mit klaren Ergebnissen.',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Prozess-Schritte',
      minRows: 1,
      maxRows: 12,
      defaultValue: defaultSteps,
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          label: 'Nummer',
          required: true,
          defaultValue: '01',
          admin: {
            description: 'Zum Beispiel 01, 02, 03 ...',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Untertitel',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Beschreibung',
          required: true,
        },
      ],
    },
  ],
}
