import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultNodes = [
  {
    title: 'Strategie',
    description: 'Struktur schafft Klarheit',
    x: 24,
    y: 56,
  },
  {
    title: 'Design',
    description: 'Visuell auf den Punkt',
    x: 232,
    y: 214,
  },
  {
    title: 'Technik',
    description: 'Performance & Skalierung',
    x: 432,
    y: 44,
  },
  {
    title: 'Conversion',
    description: 'Messbare Ergebnisse',
    x: 448,
    y: 272,
  },
] as const

export const HeroFlowchart: Block = {
  slug: 'heroFlowchart',
  interfaceName: 'HeroFlowchartBlock',
  labels: {
    singular: 'Hero: Flowchart',
    plural: 'Hero: Flowchart',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Klar strukturierte Prozesse.',
    },
    {
      name: 'subline',
      type: 'textarea',
      defaultValue: 'Visuell. Messbar. Wirkungsvoll.',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
      defaultValue: 'Starten',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTA URL',
      defaultValue: '#kontakt',
      required: true,
    },
    {
      name: 'flowNodes',
      type: 'array',
      label: 'Flow Visual',
      minRows: 3,
      maxRows: 5,
      defaultValue: defaultNodes,
      admin: {
        description: 'Absolute X/Y-Werte in Pixeln relativ zur Desktop-Canvas (680x460px).',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'x',
          type: 'number',
          required: true,
        },
        {
          name: 'y',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
