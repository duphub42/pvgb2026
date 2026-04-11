import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const PortfolioCaseGrid: Block = {
  slug: 'portfolioCaseGrid',
  dbName: 'portfolio_grid',
  interfaceName: 'PortfolioCaseGridBlock',
  labels: {
    singular: 'Portfolio Case Grid',
    plural: 'Portfolio Case Grids',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Ausgewaehlte Cases',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Ueberschrift',
      defaultValue: 'Ergebnisse aus realen Projekten',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'layoutVariant',
      type: 'select',
      label: 'Layout-Stil',
      defaultValue: 'editorial',
      options: [
        { label: 'Editorial', value: 'editorial' },
        { label: 'Data', value: 'data' },
        { label: 'Visual', value: 'visual' },
      ],
    },
    {
      name: 'cases',
      type: 'array',
      label: 'Cases',
      minRows: 1,
      maxRows: 24,
      fields: [
        {
          name: 'discipline',
          type: 'select',
          label: 'Disziplin',
          defaultValue: 'webdesign',
          options: [
            { label: 'Webdesign', value: 'webdesign' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Branding', value: 'branding' },
            { label: 'Mixed', value: 'mixed' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'client',
          type: 'text',
          label: 'Kunde / Marke',
        },
        {
          name: 'industry',
          type: 'text',
          label: 'Branche',
        },
        {
          name: 'summary',
          type: 'textarea',
          label: 'Kurzbeschreibung',
          required: true,
        },
        {
          name: 'challenge',
          type: 'textarea',
          label: 'Challenge',
        },
        {
          name: 'approach',
          type: 'textarea',
          label: 'Vorgehen',
        },
        {
          name: 'result',
          type: 'textarea',
          label: 'Ergebnis',
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Case-Bild',
        },
        {
          name: 'metrics',
          type: 'array',
          label: 'KPIs',
          minRows: 0,
          maxRows: 6,
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Wert',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
          ],
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          minRows: 0,
          maxRows: 8,
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Tag',
              required: true,
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'CTA',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Button-Label',
              defaultValue: 'Case ansehen',
            },
            {
              name: 'href',
              type: 'text',
              label: 'Link',
              admin: {
                description: 'Erlaubt /pfad, slug oder vollstaendige URL.',
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
}
