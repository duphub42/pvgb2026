import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const FeaturesScaling: Block = {
  slug: 'featuresScaling',
  interfaceName: 'FeaturesScalingBlock',
  labels: {
    singular: 'Features: Scaling teams',
    plural: 'Features: Scaling teams',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Built for Scaling teams',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue:
        'Orrupti aut temporibus assumenda atque ab, accusamus sit, molestiae veniam laboriosam pariatur.',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 8,
      defaultValue: [
        { icon: 'mail', label: 'Email and web support' },
        { icon: 'zap', label: 'Fast response time' },
        { icon: 'activity', label: 'Menitoring and analytics' },
        { icon: 'draftingCompass', label: 'Architectural review' },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'mail',
          options: [
            { label: 'Mail', value: 'mail' },
            { label: 'Zap', value: 'zap' },
            { label: 'Activity', value: 'activity' },
            { label: 'Drafting Compass', value: 'draftingCompass' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Text',
          required: true,
        },
      ],
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

