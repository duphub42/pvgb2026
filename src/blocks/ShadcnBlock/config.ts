import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

/** Optionen für Shadcn-Block-Varianten (müssen in ShadcnBlock/Component.tsx gerendert werden). */
export const SHADCN_BLOCK_VARIANTS = [
  { label: 'Feature 215b', value: 'feature215b' },
  { label: 'Feature 210', value: 'feature210' },
  { label: 'About 15', value: 'about15' },
  { label: 'About 8', value: 'about8' },
  { label: 'About 3', value: 'about3' },
  { label: 'Hero 238', value: 'hero238' },
  { label: 'Hero 256', value: 'hero256' },
  { label: 'Feature 268', value: 'feature268' },
  { label: 'Feature 267', value: 'feature267' },
  { label: 'Feature 271', value: 'feature271' },
  { label: 'Feature 270', value: 'feature270' },
  { label: 'Feature 282', value: 'feature282' },
  { label: 'Feature 294', value: 'feature294' },
  { label: 'Feature 147', value: 'feature147' },
  { label: 'Feature 148', value: 'feature148' },
  { label: 'Feature 190', value: 'feature190' },
  { label: 'Feature 229', value: 'feature229' },
  { label: 'Feature 250', value: 'feature250' },
  { label: 'Feature 251', value: 'feature251' },
  { label: 'Feature 253', value: 'feature253' },
  { label: 'Feature 256', value: 'feature256' },
  { label: 'Feature 261', value: 'feature261' },
] as const

export type ShadcnBlockVariant = (typeof SHADCN_BLOCK_VARIANTS)[number]['value']

export const ShadcnBlock: Block = {
  slug: 'shadcnBlock',
  interfaceName: 'ShadcnBlock',
  labels: {
    singular: 'Shadcn Block',
    plural: 'Shadcn Blocks',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'variant',
      type: 'select',
      required: true,
      options: [...SHADCN_BLOCK_VARIANTS],
      admin: {
        description: 'Welche Shadcnblocks-Komponente angezeigt werden soll.',
      },
    },
  ],
}
