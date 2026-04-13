import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultPlans = [
  {
    name: 'Starter',
    badge: '',
    description: 'Ideal fuer kleine Websites und einen schnellen, professionellen Start.',
    price: '1.490',
    priceSuffix: 'einmalig',
    highlighted: false,
    ctaLabel: 'Starter anfragen',
    ctaHref: '/kontakt',
    ctaNewTab: false,
    features: [
      { text: 'Onepager oder kleine Website' },
      { text: 'Individuelles Design-Konzept' },
      { text: 'Responsive Umsetzung fuer Mobile' },
      { text: 'Basis SEO Setup' },
    ],
  },
  {
    name: 'Business',
    badge: 'Empfohlen',
    description: 'Fuer Unternehmen, die mehr Seiten, Strategie und Conversion-Fokus benoetigen.',
    price: '3.290',
    priceSuffix: 'einmalig',
    highlighted: true,
    ctaLabel: 'Business anfragen',
    ctaHref: '/kontakt',
    ctaNewTab: false,
    features: [
      { text: 'Bis zu 8 Seiten inkl. Struktur' },
      { text: 'UX-Wireframes + visuelles Design' },
      { text: 'Conversion-optimierte CTA-Fuehrung' },
      { text: 'Performance Optimierung' },
      { text: 'CMS-Einweisung' },
    ],
  },
  {
    name: 'Premium',
    badge: '',
    description: 'Umfassende Loesung fuer anspruchsvolle Brands mit Wachstumsschwerpunkt.',
    price: 'ab 5.900',
    priceSuffix: 'projektbasiert',
    highlighted: false,
    ctaLabel: 'Premium anfragen',
    ctaHref: '/kontakt',
    ctaNewTab: false,
    features: [
      { text: 'Skalierbare Seitenarchitektur' },
      { text: 'Designsystem + Komponentenbibliothek' },
      { text: 'Fortgeschrittenes SEO Setup' },
      { text: 'Tracking + Analytics Setup' },
      { text: 'Priorisierter Support' },
    ],
  },
]

const defaultComparisonRows = [
  {
    feature: 'Design individuell statt Template',
    values: [{ type: 'included' }, { type: 'included' }, { type: 'included' }],
  },
  {
    feature: 'Anzahl Seiten',
    values: [
      { type: 'text', label: '1 bis 3' },
      { type: 'text', label: 'bis 8' },
      { type: 'text', label: 'frei skalierbar' },
    ],
  },
  {
    feature: 'SEO Grundlagen',
    values: [{ type: 'included' }, { type: 'included' }, { type: 'included' }],
  },
  {
    feature: 'Conversion Strategie',
    values: [{ type: 'optional' }, { type: 'included' }, { type: 'included' }],
  },
  {
    feature: 'A/B Testing Setup',
    values: [{ type: 'excluded' }, { type: 'optional' }, { type: 'included' }],
  },
  {
    feature: 'Betreuung nach Launch',
    values: [{ type: 'optional' }, { type: 'optional' }, { type: 'included' }],
  },
]

export const PricingTable: Block = {
  slug: 'pricingTable',
  dbName: 'pricing_table',
  interfaceName: 'PricingTableBlock',
  labels: {
    singular: 'Preis Tabelle',
    plural: 'Preis Tabellen',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Kleine Ueberschrift',
      defaultValue: 'Pakete',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Webdesign Pakete fuer jedes Projektstadium',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        'Drei klar strukturierte Angebote mit transparenten Leistungen, damit Sie Aufwand und Ergebnis direkt einschaetzen koennen.',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Angebote',
      required: true,
      minRows: 3,
      maxRows: 3,
      defaultValue: defaultPlans,
      admin: {
        description: 'Genau drei Angebote. Reihenfolge entspricht links nach rechts im Frontend.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge (optional)',
          admin: {
            description: 'Zum Beispiel: Empfohlen, Bestseller, Neu.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Kurzbeschreibung',
        },
        {
          name: 'price',
          type: 'text',
          label: 'Preis',
          required: true,
          admin: {
            description: 'Freitext erlaubt, z. B. 1.490 oder ab 5.900.',
          },
        },
        {
          name: 'priceSuffix',
          type: 'text',
          label: 'Preis Zusatz',
          defaultValue: 'einmalig',
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Als Empfehlung hervorheben',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Feature Liste',
          minRows: 1,
          admin: {
            description: 'Kurze Bullet-Points fuer das jeweilige Angebot.',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Feature',
              required: true,
            },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Label',
          required: true,
          defaultValue: 'Angebot anfragen',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'CTA URL',
          required: true,
          defaultValue: '/kontakt',
        },
        {
          name: 'ctaNewTab',
          type: 'checkbox',
          label: 'CTA in neuem Tab oeffnen',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'comparisonHeading',
      type: 'text',
      label: 'Vergleichstitel',
      defaultValue: 'Feature Vergleich',
    },
    {
      name: 'comparisonDescription',
      type: 'textarea',
      label: 'Vergleichsbeschreibung',
      defaultValue: 'Direkter Vergleich der wichtigsten Leistungsmerkmale pro Paket.',
    },
    {
      name: 'comparisonRows',
      type: 'array',
      label: 'Vergleichszeilen',
      required: true,
      minRows: 1,
      defaultValue: defaultComparisonRows,
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Feature Name',
          required: true,
        },
        {
          name: 'values',
          type: 'array',
          label: 'Werte (Angebot 1 bis 3)',
          required: true,
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Die Reihenfolge passt zu den drei Angeboten oben.',
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Status',
              required: true,
              defaultValue: 'included',
              options: [
                {
                  label: 'Enthalten',
                  value: 'included',
                },
                {
                  label: 'Optional',
                  value: 'optional',
                },
                {
                  label: 'Nicht enthalten',
                  value: 'excluded',
                },
                {
                  label: 'Freitext',
                  value: 'text',
                },
              ],
            },
            {
              name: 'label',
              type: 'text',
              label: 'Freitext / Ueberschreibung',
              admin: {
                description:
                  'Bei Freitext empfohlen. Sonst optional als benutzerdefinierte Beschriftung.',
                condition: (_, siblingData) => siblingData?.type === 'text',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'comparisonFootnote',
      type: 'text',
      label: 'Hinweis unter Vergleich (optional)',
      defaultValue: 'Alle Pakete koennen individuell erweitert oder kombiniert werden.',
    },
  ],
}
