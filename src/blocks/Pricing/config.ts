import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const PricingBlockConfig: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Simple, Transparent Pricing',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        'Choose the plan that works for you.\nAll plans include access to our platform, lead generation tools, and dedicated support.',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Tarife',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          label: 'Monatspreis',
          required: true,
        },
        {
          name: 'yearlyPrice',
          type: 'text',
          label: 'Jahrespreis',
          required: true,
        },
        {
          name: 'period',
          type: 'text',
          label: 'Periode-Label',
          defaultValue: 'per month',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          minRows: 1,
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button-Text',
          defaultValue: 'Get started',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Button-Link',
          defaultValue: '/contact',
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Hervorgehoben',
          defaultValue: false,
        },
      ],
    },
  ],
}

