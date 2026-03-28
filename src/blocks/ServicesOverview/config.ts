import type { Block } from 'payload'

const defaultServices = [
  {
    icon: 'compass',
    title: 'Digital Consulting',
    description:
      'Strategische Beratung, Roadmaps, Business- & Marketing-Strategien – fundiert, praktisch, wirksam.',
  },
  {
    icon: 'code',
    title: 'Webentwicklung & Apps',
    description:
      'Moderne, performante Websites und Web-Apps – responsiv, SEO-optimiert, auf Conversion ausgelegt.',
  },
  {
    icon: 'palette',
    title: 'Branding & Design',
    description:
      'Klare Markenbotschaften, einprägsame Designs und ein einheitlicher Auftritt – für hohe Wiedererkennung.',
  },
  {
    icon: 'megaphone',
    title: 'Marketing & Automatisierung',
    description:
      'Cross-Channel Kampagnen, Ads, E-Mail-Marketing, Social Media, Automatisierungen – effizient und messbar.',
  },
]

export const ServicesOverview: Block = {
  slug: 'servicesOverview',
  interfaceName: 'ServicesOverviewBlock',
  labels: {
    singular: 'Leistungen Überblick',
    plural: 'Leistungen Überblick',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Meine Leistungen im Überblick',
      admin: {
        description: 'Hauptüberschrift über den Leistungskarten.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
      admin: {
        description: 'Optionaler Text unter der Überschrift.',
      },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Leistungen',
      minRows: 1,
      maxRows: 8,
      defaultValue: defaultServices,
      admin: {
        description: 'Karten mit Icon, Titel und Beschreibung.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'compass',
          options: [
            { label: 'Kompass', value: 'compass' },
            { label: 'Code', value: 'code' },
            { label: 'Palette', value: 'palette' },
            { label: 'Megafon', value: 'megaphone' },
            { label: 'Blitz', value: 'zap' },
            { label: 'Globus', value: 'globe' },
            { label: 'Trend', value: 'trending-up' },
            { label: 'Zahnrad', value: 'settings' },
            { label: 'Monitor', value: 'monitor' },
            { label: 'Rakete', value: 'rocket' },
            { label: 'Herz', value: 'heart' },
            { label: 'Schild', value: 'shield' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Beschreibung',
        },
      ],
    },
  ],
}
