import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const HeroGrid: Block = {
  slug: 'heroGrid',
  interfaceName: 'HeroGridBlock',
  labels: {
    singular: 'Hero: Grid',
    plural: 'Hero: Grid',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Build your next project with Smoothui',
    },
    {
      name: 'highlight',
      type: 'text',
      label: 'Hervorgehobenes Wort',
      defaultValue: 'Smoothui',
      admin: {
        description: 'Optionales Wort, das im Titel farbig hervorgehoben wird.',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue:
        'Smoothui gives you the building blocks to create stunning, animated interfaces in minutes.',
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
      label: 'Primary Button-Label',
      defaultValue: 'Get Started',
    },
    {
      name: 'primaryCtaUrl',
      type: 'text',
      label: 'Primary Button-URL',
      defaultValue: '#get-started',
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
      label: 'Secondary Button-Label',
      defaultValue: 'Learn more',
    },
    {
      name: 'secondaryCtaUrl',
      type: 'text',
      label: 'Secondary Button-URL',
      defaultValue: '#learn-more',
    },
  ],
}

