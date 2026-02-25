import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const FeaturesGrid: Block = {
  slug: 'featuresGrid',
  interfaceName: 'FeaturesGridBlock',
  labels: {
    singular: 'Features Grid',
    plural: 'Features Grid',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Built to cover your needs',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue: 'Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          icon: 'zap',
          title: 'Customizable',
          description:
            'Extensive customization options, allowing you to tailor every aspect to meet your specific needs.',
        },
        {
          icon: 'settings2',
          title: 'You have full control',
          description:
            'From design elements to functionality, you have complete control to create a unique and personalized experience.',
        },
        {
          icon: 'sparkles',
          title: 'Powered By AI',
          description:
            'Elements to functionality, you have complete control to create a unique experience.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'zap',
          options: [
            { label: 'Zap', value: 'zap' },
            { label: 'Settings', value: 'settings2' },
            { label: 'Sparkles', value: 'sparkles' },
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
      ],
    },
  ],
}

