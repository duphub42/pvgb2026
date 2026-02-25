import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const ScrollMorphHero: Block = {
  slug: 'scrollMorphHero',
  interfaceName: 'ScrollMorphHeroBlock',
  labels: {
    singular: 'Hero: Scroll Morph',
    plural: 'Hero: Scroll Morph',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'introHeadline',
      type: 'text',
      label: 'Intro-Headline',
      defaultValue: 'The future is built on AI.',
    },
    {
      name: 'introSubline',
      type: 'text',
      label: 'Intro-Subline',
      defaultValue: 'SCROLL TO EXPLORE',
    },
    {
      name: 'activeHeadline',
      type: 'text',
      label: 'Aktive Headline',
      defaultValue: 'Explore Our Vision',
    },
    {
      name: 'activeText',
      type: 'textarea',
      label: 'Aktiver Text',
      defaultValue:
        'Discover a world where technology meets creativity. Scroll through our curated collection of innovations designed to shape the future.',
    },
  ],
}

