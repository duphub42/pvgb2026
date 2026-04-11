import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const BrandShowcase: Block = {
  slug: 'brandShowcase',
  interfaceName: 'BrandShowcaseBlock',
  labels: {
    singular: 'Brand Showcase',
    plural: 'Brand Showcases',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Markenwelt',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Ueberschrift',
      defaultValue: 'Markenauftritt als konsistentes System',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'brandStory',
      type: 'textarea',
      label: 'Brand Story',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'wordmark',
      type: 'upload',
      relationTo: 'media',
      label: 'Wordmark',
    },
    {
      name: 'palette',
      type: 'array',
      label: 'Farbpalette',
      minRows: 3,
      maxRows: 12,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Farbname',
          required: true,
        },
        {
          name: 'hex',
          type: 'text',
          label: 'HEX',
          required: true,
          admin: {
            description: 'Beispiel: #0F172A',
          },
        },
        {
          name: 'usage',
          type: 'text',
          label: 'Einsatz',
        },
      ],
    },
    {
      name: 'typography',
      type: 'array',
      label: 'Typografie',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'role',
          type: 'text',
          label: 'Rolle',
          required: true,
        },
        {
          name: 'family',
          type: 'text',
          label: 'Font Family',
          required: true,
        },
        {
          name: 'sample',
          type: 'text',
          label: 'Sample Text',
          defaultValue: 'Aa Bb Cc 123',
        },
      ],
    },
    {
      name: 'principles',
      type: 'array',
      label: 'Design-Prinzipien',
      minRows: 0,
      maxRows: 8,
      fields: [
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
      ],
    },
    {
      name: 'usageExamples',
      type: 'array',
      label: 'Anwendungsbeispiele',
      minRows: 0,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
        },
      ],
    },
  ],
}
