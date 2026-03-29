import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilKernkompetenzDefaults } from '@/blocks/ProfilBlocks/defaults'

export const ProfilKernkompetenz: Block = {
  slug: 'profilKernkompetenz',
  dbName: 'prof_kern',
  interfaceName: 'ProfilKernkompetenzBlock',
  labels: { singular: 'Profil: Kernkompetenzen', plural: 'Profil: Kernkompetenzen' },
  fields: [
    ...blockStyleFields,
    {
      name: 'ueberschrift',
      type: 'text',
      label: 'Überschrift',
      defaultValue: profilKernkompetenzDefaults.ueberschrift,
    },
    {
      name: 'einleitung',
      type: 'textarea',
      label: 'Einleitungstext',
      defaultValue: profilKernkompetenzDefaults.einleitung,
    },
    {
      name: 'bereiche',
      type: 'array',
      label: 'Bereiche',
      minRows: 0,
      defaultValue: profilKernkompetenzDefaults.bereiche,
      fields: [
        { name: 'titel', type: 'text', label: 'Titel', required: true },
        { name: 'text', type: 'textarea', label: 'Beschreibung', required: true },
        {
          name: 'details',
          type: 'array',
          label: 'Stichpunkte',
          minRows: 0,
          fields: [{ name: 'line', type: 'text', label: 'Zeile', required: true }],
        },
      ],
    },
  ],
}
