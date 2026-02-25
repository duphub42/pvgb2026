import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const PricingCards: Block = {
  slug: 'pricingCards',
  interfaceName: 'PricingCardsBlock',
  labels: {
    singular: 'Pricing: Karten',
    plural: 'Pricing: Karten',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      defaultValue: 'Pricing',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Prices that make sense!',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue: 'Managing a small business today is already tough.',
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
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
        {
          name: 'price',
          type: 'text',
          label: 'Preis',
          required: true,
        },
        {
          name: 'period',
          type: 'text',
          label: 'Periode (z. B. month)',
          defaultValue: 'month',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          minRows: 1,
          fields: [
            { name: 'title', type: 'text', label: 'Titel', required: true },
            { name: 'description', type: 'textarea', label: 'Beschreibung' },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button-Text',
          defaultValue: 'Sign up today',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Button-Link',
          defaultValue: '/sign-up',
        },
        {
          name: 'isHighlighted',
          type: 'checkbox',
          label: 'Hervorgehoben (Schatten, Primary-Button)',
          defaultValue: false,
        },
        {
          name: 'buttonIcon',
          type: 'select',
          label: 'Button-Icon',
          defaultValue: 'arrow',
          options: [
            { label: 'Pfeil (MoveRight)', value: 'arrow' },
            { label: 'Telefon (PhoneCall)', value: 'phone' },
          ],
        },
      ],
    },
  ],
}
