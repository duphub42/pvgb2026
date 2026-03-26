import type { Block } from 'payload'

const defaultReasons = [
  {
    icon: 'user',
    title: 'Persönlicher Ansprechpartner',
    description:
      'Kein Agentur-Wasserkopf, kein Wischi-Waschi — direkte, fundierte Beratung und Umsetzung.',
  },
  {
    icon: 'zap',
    title: 'Lean & effizient',
    description: 'Schnelle Entscheidungen, klare Prozesse, kein unnötiger Overhead.',
  },
  {
    icon: 'trending-up',
    title: 'Performance & Resultate',
    description:
      'Kampagnen, Websites und Apps, die messbare Reichweite, Leads und Umsatz liefern.',
  },
  {
    icon: 'globe',
    title: 'Cross-Channel & international',
    description:
      'SEO, SEA, Social Ads, Automatisierung — Launches in verschiedenen Branchen und 6 Ländern.',
  },
]

export const WhyWorkWithMe: Block = {
  slug: 'whyWorkWithMe',
  interfaceName: 'WhyWorkWithMeBlock',
  labels: {
    singular: 'Warum mit mir',
    plural: 'Warum mit mir',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Warum mit mir',
      admin: {
        description: 'Hauptüberschrift über dem Kartenraster (optional leer lassen zum Ausblenden).',
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
      name: 'reasons',
      type: 'array',
      label: 'Gründe / Karten',
      minRows: 1,
      maxRows: 8,
      defaultValue: defaultReasons,
      admin: {
        description: 'Karten mit Icon, Titel und Text — Breite passt sich der Anzahl und dem Viewport an.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'user',
          options: [
            { label: 'Person', value: 'user' },
            { label: 'Blitz', value: 'zap' },
            { label: 'Trend', value: 'trending-up' },
            { label: 'Globus', value: 'globe' },
            { label: 'Ziel', value: 'target' },
            { label: 'Aktentasche', value: 'briefcase' },
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
