import type { Block } from 'payload'

const consultingBlockStyleFields: Block['fields'] = [
  {
    name: 'blockBackground',
    dbName: 'bg',
    type: 'select',
    label: 'Hintergrund',
    defaultValue: 'none',
    options: [
      { label: 'Keiner', value: 'none' },
      { label: 'Hell (muted)', value: 'muted' },
      { label: 'Abgesetzt (accent)', value: 'accent' },
      { label: 'Sehr hell', value: 'light' },
      { label: 'Dunkel', value: 'dark' },
    ],
    admin: {
      description: 'Optionaler Hintergrund für den gesamten Block.',
    },
  },
  {
    name: 'blockOverlay',
    type: 'group',
    label: 'Overlay-Filter',
    admin: {
      description: 'Optionaler Farbfilter über dem Blockinhalt (z. B. abdunkeln).',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        label: 'Overlay aktiv',
        defaultValue: false,
      },
      {
        name: 'color',
        type: 'text',
        label: 'Farbe',
        defaultValue: 'dark',
        validate: (value: string | null | undefined) =>
          value == null || value === '' || value === 'dark' || value === 'light'
            ? true
            : 'Erlaubte Werte: dark oder light',
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enabled),
          description: 'Erlaubte Werte: dark oder light',
        },
      },
      {
        name: 'opacity',
        type: 'number',
        label: 'Deckkraft (%)',
        min: 0,
        max: 100,
        defaultValue: 30,
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enabled),
          description: '0 = transparent, 100 = voll deckend.',
        },
      },
    ],
  },
]

export const ConsultingOverview: Block = {
  slug: 'consultingOverview',
  interfaceName: 'ConsultingOverviewBlock',
  labels: {
    singular: 'Leistungsprozess',
    plural: 'Leistungsprozess',
  },
  fields: [
    ...consultingBlockStyleFields,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue:
        'So läuft die Zusammenarbeit von der Strategie bis zur Wirkung',
      admin: {
        description: 'Hauptüberschrift über dem Process-Flow.',
      },
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Einleitung',
      defaultValue:
        'Transparent, strukturiert und mit klaren Ergebnissen: Jeder Schritt baut auf dem vorherigen auf.',
      admin: {
        description: 'Kurzer Einführungstext unter der Headline.',
      },
    },
    {
      name: 'pixelLayoutDesktop',
      type: 'checkbox',
      label: 'Breites Desktop-Layout (ab 1280px)',
      defaultValue: true,
      admin: {
        description:
          'Aktiviert ein breiteres Layout für große Screens. Mobile und Tablet bleiben klar gestapelt.',
      },
    },
    {
      name: 'colors',
      type: 'group',
      interfaceName: 'ConsultingOverviewTheme',
      label: 'Farbschema',
      admin: {
        description: 'Hex-Farben (z. B. #DED9FF). Leere Felder nutzen die Figma-Standards.',
      },
      fields: [
        {
          name: 'gradientLavender',
          type: 'text',
          label: 'Radial Flieder (Strategie-Spalte)',
          defaultValue: '#DED9FF',
        },
        {
          name: 'gradientLime',
          type: 'text',
          label: 'Radial Limette (Vorteile-Spalte)',
          defaultValue: '#F3FFD9',
        },
        {
          name: 'introBlob',
          type: 'text',
          label: 'Radial über Intro (optional, Flieder)',
          defaultValue: '#DED9FF',
          admin: {
            description: 'Hinter Headline/Einleitung; gleicher Verlauf wie Flieder-Blob.',
          },
        },
        {
          name: 'strategyBadge',
          type: 'text',
          label: 'Badge Strategie',
          defaultValue: '#08D3BB',
        },
        {
          name: 'benefitsBadge',
          type: 'text',
          label: 'Badge Vorteile',
          defaultValue: '#1090CB',
        },
        {
          name: 'experienceBadge',
          type: 'text',
          label: 'Badge Erfahrung',
          defaultValue: '#9208D3',
        },
        {
          name: 'timelineStroke',
          type: 'text',
          label: 'Pfad-Linie (gestrichelt)',
          defaultValue: '#999999',
        },
        {
          name: 'divider',
          type: 'text',
          label: 'Trennlinie',
          defaultValue: '#C7C7C7',
        },
        {
          name: 'headline',
          type: 'text',
          label: 'Überschriften',
          defaultValue: '#252525',
        },
        {
          name: 'body',
          type: 'text',
          label: 'Fließtext',
          defaultValue: '#545454',
        },
        {
          name: 'muted',
          type: 'text',
          label: 'Sekundärtext',
          defaultValue: '#868686',
        },
      ],
    },
    {
      name: 'strategyLabel',
      type: 'text',
      label: 'Step-Label 1',
      defaultValue: 'Analyse & Ausrichtung',
    },
    {
      name: 'strategySubLabel',
      type: 'text',
      label: 'Step-Meta 1',
      defaultValue: 'Fundament für alle weiteren Maßnahmen',
    },
    {
      name: 'strategyTitle',
      type: 'text',
      label: 'Step-Titel 1',
      defaultValue: 'Wir definieren Ziele, Prioritäten und den richtigen Fokus',
    },
    {
      name: 'strategyText',
      type: 'textarea',
      label: 'Step-Text 1',
      defaultValue:
        'Vor der Umsetzung klären wir, was wirklich zählt: Zielgruppen, Positionierung, Angebote und konkrete Business-Ziele. So entsteht ein belastbarer Plan statt Aktionismus.',
    },
    {
      name: 'benefitsLabel',
      type: 'text',
      label: 'Step-Label 2+',
      defaultValue: 'Umsetzung & Ergebnis',
    },
    {
      name: 'benefitsSubLabel',
      type: 'text',
      label: 'Step-Meta 2+',
      defaultValue: 'Pragmatisch, effizient, messbar',
    },
    {
      name: 'benefitsTitle',
      type: 'text',
      label: 'Fallback-Titel 2+',
      defaultValue: 'Umsetzung in klaren Etappen',
      admin: {
        description: 'Wird verwendet, falls keine Step-Items gepflegt sind.',
      },
    },
    {
      name: 'benefitItems',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          title: 'Konzept & Architektur',
          text: 'Informationsarchitektur, Angebotslogik, Seitenstruktur und User-Flows werden sauber vorbereitet.',
        },
        {
          title: 'Design & Content',
          text: 'Ein hochwertiges visuelles System plus klare Botschaften, die Zielgruppen verstehen und vertrauen.',
        },
        {
          title: 'Technische Umsetzung',
          text: 'Performante Entwicklung, saubere Integrationen und eine stabile Basis für Marketing und Vertrieb.',
        },
        {
          title: 'Launch & Optimierung',
          text: 'Nach dem Go-live wird datenbasiert optimiert, damit Reichweite, Leads und Conversion wachsen.',
        },
      ],
      admin: {
        description: 'Jeder Eintrag wird als eigener Prozess-Schritt dargestellt.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step-Titel',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Step-Text',
        },
      ],
    },
    {
      name: 'experienceLabel',
      type: 'text',
      label: 'Finaler Step-Label',
      defaultValue: 'Langfristige Partnerschaft',
    },
    {
      name: 'experienceSubLabel',
      type: 'text',
      label: 'Finaler Step-Meta',
      defaultValue: 'Weiterentwicklung auf Basis realer Daten',
    },
    {
      name: 'experienceTitle',
      type: 'text',
      label: 'Finaler Step-Titel',
      defaultValue: 'Nach der Umsetzung begleite ich bei Skalierung, Tests und kontinuierlicher Verbesserung',
    },
  ],
}
