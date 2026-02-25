import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { link } from '@/fields/link'

export const LyraContent: Block = {
  slug: 'lyraContent',
  interfaceName: 'LyraContentBlock',
  labels: {
    singular: 'Lyra Content',
    plural: 'Lyra Content',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue:
        'The Lyra ecosystem brings together our models, products and platforms.',
    },
    {
      name: 'paragraphOne',
      type: 'textarea',
      label: 'Absatz 1',
      defaultValue:
        'Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.',
    },
    {
      name: 'paragraphTwo',
      type: 'textarea',
      label: 'Absatz 2',
      defaultValue:
        'Tailark. It supports an entire ecosystem — from products innovate. Sit minus, quod debitis autem quia aspernatur delectus impedit modi, neque non id ad dignissimos? Saepe deleniti perferendis beatae.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button-Text',
      defaultValue: 'Learn More',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button-Link',
      fields: [
        link({
          overrides: {
            name: 'link',
            label: 'Link',
            admin: {
              description: 'Ziel für den „Learn More“-Button.',
            },
          },
        }),
      ],
    },
  ],
}

