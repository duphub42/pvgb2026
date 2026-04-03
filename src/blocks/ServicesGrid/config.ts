import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  dbName: 'services_grid',
  interfaceName: 'ServicesGridBlock',
  labels: {
    singular: 'Leistungen Grid',
    plural: 'Leistungen Grid',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Leistungen',
      admin: {
        description: 'Titel für dieses Sektion.',
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
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      admin: {
        description: 'Optional: zusätzliche Einleitungssätze in einer Subline.',
      },
    },
    {
      name: 'introIconList',
      type: 'array',
      label: 'Icon-Liste der Einleitung',
      minRows: 0,
      maxRows: 12,
      admin: {
        description: 'Optional: Icon-Liste in der Einleitungs-Spalte (analog zum Introduction-Block).',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (Lucide Iconname)',
          required: true,
          defaultValue: 'zap',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Text',
          required: true,
        },
      ],
    },
    {
      name: 'introImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Einleitungs-Bild',
      admin: {
        description: 'Optional: Bild in der Einleitung (links oder rechts).',
      },
    },
    {
      name: 'introImagePosition',
      type: 'select',
      label: 'Position des Einleitungs-Bildes',
      defaultValue: 'left',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
      ],
      admin: {
        description: 'Wähle Position für das Einleitungsbild.',
      },
    },
    {
      name: 'radialBackground',
      type: 'checkbox',
      label: 'Radialer Hintergrund aktivieren',
      admin: {
        description: 'Optional: Ein dezenter radialer Glow/Hintergrund für diese Section.',
      },
    },
    {
      name: 'radialBackgroundVariant',
      type: 'select',
      label: 'Radialer Hintergrund (Position)',
      defaultValue: 'default',
      options: [
        { label: 'Mitte', value: 'default' },
        { label: 'Links oben', value: 'blue' },
        { label: 'Rechts oben', value: 'orange' },
      ],
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.radialBackground),
        description: 'Wählt die Position des radialen Verlaufs. Interne Werte bleiben für Bestandsdaten kompatibel.',
      },
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Leistungskategorien',
      minRows: 1,
      fields: [
        {
          name: 'categoryLabel',
          type: 'text',
          label: 'Kategorie',
          required: true,
        },
        {
          name: 'services',
          type: 'array',
          label: 'Leistungen',
          minRows: 1,
          fields: [
            {
              name: 'icon',
              type: 'group',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                  label: 'Icon URL',
                  required: false,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Icon Alt Text',
                  required: false,
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Beschreibung',
              required: true,
            },
            {
              name: 'link',
              type: 'group',
              admin: {
                description:
                  'Optional: Füge einen Seiten-Slug hinzu, um die Karte anklickbar zu machen.',
              },
              fields: [
                {
                  name: 'slug',
                  type: 'text',
                  label: 'Seiten-Slug',
                  required: false,
                  admin: {
                    description: 'z. B. webdesign. Leer bleibt die Karte nicht verlinkt.',
                  },
                },
              ],
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Featured',
            },
          ],
        },
      ],
    },
  ],
}
