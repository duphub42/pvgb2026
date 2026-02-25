import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const LyraFeature: Block = {
  slug: 'lyraFeature',
  interfaceName: 'LyraFeatureBlock',
  labels: {
    singular: 'Lyra Feature',
    plural: 'Lyra Feature',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'The Lyra ecosystem brings together our models.',
    },
    {
      name: 'paragraphOne',
      type: 'textarea',
      label: 'Absatz 1',
      defaultValue:
        'Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products innovate.',
    },
    {
      name: 'paragraphTwo',
      type: 'textarea',
      label: 'Absatz 2',
      defaultValue:
        'It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.',
    },
    {
      name: 'featureFastTitle',
      type: 'text',
      label: 'Feature 1 Titel',
      defaultValue: 'Faaast',
    },
    {
      name: 'featureFastText',
      type: 'textarea',
      label: 'Feature 1 Text',
      defaultValue: 'It supports an entire helping developers and innovate.',
    },
    {
      name: 'featurePowerfulTitle',
      type: 'text',
      label: 'Feature 2 Titel',
      defaultValue: 'Powerful',
    },
    {
      name: 'featurePowerfulText',
      type: 'textarea',
      label: 'Feature 2 Text',
      defaultValue: 'It supports an entire helping developers and businesses.',
    },
    {
      name: 'darkImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild (Dark Theme)',
      admin: {
        description: 'Wird angezeigt, wenn das Theme dunkel ist. Optional.',
      },
    },
    {
      name: 'lightImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild (Light Theme)',
      admin: {
        description: 'Wird angezeigt, wenn das Theme hell ist. Optional.',
      },
    },
  ],
}

