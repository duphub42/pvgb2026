import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilCtaDefaults } from '@/blocks/ProfilBlocks/defaults'

export const ProfilCtaBand: Block = {
  slug: 'profilCtaBand',
  dbName: 'prof_cta',
  interfaceName: 'ProfilCtaBandBlock',
  labels: { singular: 'Profil: CTA-Band', plural: 'Profil: CTA-Band' },
  fields: [
    ...blockStyleFields,
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
      defaultValue: profilCtaDefaults.headline,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
      defaultValue: profilCtaDefaults.text,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button-Text',
          defaultValue: profilCtaDefaults.buttonLabel,
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button-Link',
          defaultValue: profilCtaDefaults.buttonLink,
        },
      ],
    },
  ],
}
