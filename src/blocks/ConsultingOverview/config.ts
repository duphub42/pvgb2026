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
    dbName: 'ov',
    type: 'group',
    label: 'Overlay-Filter',
    admin: {
      description: 'Optionaler Farbfilter über dem Blockinhalt (z. B. abdunkeln).',
    },
    fields: [
      {
        name: 'enabled',
        dbName: 'en',
        type: 'checkbox',
        label: 'Overlay aktiv',
        defaultValue: false,
      },
      {
        name: 'color',
        dbName: 'c',
        type: 'select',
        label: 'Farbe',
        defaultValue: 'dark',
        options: [
          { label: 'Dunkel', value: 'dark' },
          { label: 'Hell', value: 'light' },
        ],
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enabled),
        },
      },
      {
        name: 'opacity',
        dbName: 'op',
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
    singular: 'Consulting Overview',
    plural: 'Consulting Overviews',
  },
  fields: [
    ...consultingBlockStyleFields,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue:
        'Ihr persönlicher Ansprechpartner für Digital Consulting, Marketing & Webdesign',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Einleitung',
      defaultValue:
        'Ich realisiere moderne, nutzerzentrierte Websites, konsistente Markenauftritte und unterstütze Unternehmen dabei, Ihre Prozesse digital zu automatisieren - effizient, fundiert und ergebnisorientiert.',
    },
    {
      name: 'strategyLabel',
      type: 'text',
      label: 'Label Strategie',
      defaultValue: 'Digital Consulting, Marketing & Webdesign',
    },
    {
      name: 'strategySubLabel',
      type: 'text',
      label: 'Sub-Label Strategie',
      defaultValue: 'für Unternehmen und Organisationen',
    },
    {
      name: 'strategyTitle',
      type: 'text',
      label: 'Titel Strategie',
      defaultValue: 'Ich begleite Unternehmen bei der Entwicklung klarer digitaler Strategien',
    },
    {
      name: 'strategyText',
      type: 'textarea',
      label: 'Text Strategie',
      defaultValue:
        'Von Positionierung und Marketing bis zur technischen Umsetzung moderner Weblösungen. Der Fokus liegt auf messbaren Ergebnissen: strukturierte Prozesse, performante Kampagnen und Websites, die nicht nur gut aussehen, sondern verkaufen. Persönlich. Effizient. Mit Blick auf langfristiges Wachstum. Als Freelancer in Halle (Saale) stehe ich für direkte Zusammenarbeit und transparente Umsetzung.',
    },
    {
      name: 'benefitsLabel',
      type: 'text',
      label: 'Label Vorteile',
      defaultValue: 'Darum arbeiten andere Macher mit mir',
    },
    {
      name: 'benefitsSubLabel',
      type: 'text',
      label: 'Sub-Label Vorteile',
      defaultValue: 'Schnelle, effiziente Umsetzung',
    },
    {
      name: 'benefitsTitle',
      type: 'text',
      label: 'Titel Vorteile',
      defaultValue: 'Vorteile in der Übersicht',
    },
    {
      name: 'benefitItems',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          title: '1 Persönlicher Ansprechpartner für alles',
          text: 'Kurze Wege, kein Agentur-Wasserkopf, kein Wischi-Waschi, sondern direkte, fundierte Beratung und Umsetzung.',
        },
        {
          title: 'Lean & effizient',
          text: 'Schnelle Entscheidungen, klare Prozesse, kein unnötiger Overhead.',
        },
        {
          title: 'Performance & Resultate',
          text: 'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.',
        },
        {
          title: 'Cross-Channel & internationale Erfahrung',
          text: 'SEO, SEA, Social Ads, Automatisierung; Markteintritte und Launches in verschiedenen Branchen und 6 Ländern weltweit.',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'experienceLabel',
      type: 'text',
      label: 'Label Erfahrung',
      defaultValue: 'Wissen was funktioniert',
    },
    {
      name: 'experienceSubLabel',
      type: 'text',
      label: 'Sub-Label Erfahrung',
      defaultValue: 'Profitieren Sie von meinen Erfahrungen',
    },
    {
      name: 'experienceTitle',
      type: 'text',
      label: 'Titel Erfahrung',
      defaultValue: 'Seit über 20 Jahren Erfahrung im digitalen Marketing & Vertrieb',
    },
  ],
}
