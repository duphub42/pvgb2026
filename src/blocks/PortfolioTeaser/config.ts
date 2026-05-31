import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const PortfolioTeaser: Block = {
  slug: 'portfolioTeaser',
  interfaceName: 'PortfolioTeaserBlock',
  labels: {
    singular: 'Portfolio Teaser',
    plural: 'Portfolio Teaser',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Leistungsbereiche',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Webdesign, Marketing & Branding',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Layout-Variante',
      defaultValue: 'cards',
      options: [
        { label: 'Karten (3-spaltig)', value: 'cards' },
        { label: 'Editorial (abwechselnd)', value: 'editorial' },
      ],
    },
    {
      name: 'areas',
      type: 'array',
      label: 'Portfolio-Bereiche',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'discipline',
          type: 'select',
          label: 'Bereich',
          options: [
            { label: 'Webdesign', value: 'webdesign' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Branding', value: 'branding' },
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
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags / Schwerpunkte',
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
          name: 'href',
          type: 'text',
          label: 'Link zur Unterseite',
          admin: {
            description: 'z.B. /portfolio-webdesign',
          },
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA-Label',
          defaultValue: 'Cases ansehen',
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Cover-Bild (optional)',
        },
      ],
    },
  ],
}
