import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const HeroMarketing: Block = {
  slug: 'heroMarketing',
  interfaceName: 'HeroMarketingBlock',
  labels: {
    singular: 'Hero: Marketing',
    plural: 'Hero: Marketing',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'badgeLabel',
      type: 'text',
      label: 'Badge-Text',
      defaultValue: 'Introducing Support for AI Models',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Modern Solutions for Customer Engagement',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue:
        'Highly customizable components for building modern websites and applications that look and feel the way you mean it.',
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
      label: 'Primary Button-Label',
      defaultValue: 'Start Building',
    },
    {
      name: 'primaryCtaUrl',
      type: 'text',
      label: 'Primary Button-URL',
      defaultValue: '#start',
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
      label: 'Secondary Button-Label',
      defaultValue: 'Request a demo',
    },
    {
      name: 'secondaryCtaUrl',
      type: 'text',
      label: 'Secondary Button-URL',
      defaultValue: '#demo',
    },
  ],
}

