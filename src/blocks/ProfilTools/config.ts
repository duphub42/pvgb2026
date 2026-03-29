import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilToolKategorieOptions, profilToolsDefaults } from '@/blocks/ProfilBlocks/defaults'

export const ProfilTools: Block = {
  slug: 'profilTools',
  dbName: 'prof_tools',
  interfaceName: 'ProfilToolsBlock',
  labels: { singular: 'Profil: Tools', plural: 'Profil: Tools' },
  fields: [
    ...blockStyleFields,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Abschnitts-Überschrift',
      defaultValue: 'Tools & Plattformen',
    },
    {
      name: 'tools',
      type: 'array',
      label: 'Tools',
      minRows: 0,
      defaultValue: profilToolsDefaults,
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        {
          name: 'kategorie',
          type: 'select',
          label: 'Kategorie',
          required: true,
          defaultValue: 'dev',
          options: profilToolKategorieOptions,
        },
      ],
    },
  ],
}
