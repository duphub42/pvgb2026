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
              fields: [
                {
                  name: 'slug',
                  type: 'text',
                  label: 'Seiten-Slug',
                  required: true,
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
