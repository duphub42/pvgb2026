import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const FeatureAdvantages: Block = {
  slug: 'featureAdvantages',
  dbName: 'feat_adv',
  interfaceName: 'FeatureAdvantagesBlock',
  labels: {
    singular: 'Feature: Vorteile',
    plural: 'Feature: Vorteile',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'badgeLabel',
      type: 'text',
      label: 'Badge-Label',
      defaultValue: 'Platform',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Something new!',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue: 'Managing a small business today is already tough.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Vorteile',
      minRows: 1,
      defaultValue: [
        {
          title: 'Easy to use',
          description: "We&apos;ve made it easy to use and understand.",
        },
        {
          title: 'Fast and reliable',
          description: "We&apos;ve made it fast and reliable.",
        },
        {
          title: 'Beautiful and modern',
          description: "We&apos;ve made it beautiful and modern.",
        },
      ],
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
        },
      ],
    },
  ],
}

