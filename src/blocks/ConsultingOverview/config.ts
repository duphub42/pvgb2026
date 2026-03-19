import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const ConsultingOverview: Block = {
  slug: 'consultingOverview',
  interfaceName: 'ConsultingOverviewBlock',
  labels: {
    singular: 'Consulting Overview',
    plural: 'Consulting Overviews',
  },
  fields: [
    ...blockStyleFields,
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
