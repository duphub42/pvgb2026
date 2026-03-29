import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilZahlenFaktenDefaults } from '@/blocks/ProfilBlocks/defaults'

export const ProfilZahlenFakten: Block = {
  slug: 'profilZahlenFakten',
  dbName: 'prof_zahl',
  interfaceName: 'ProfilZahlenFaktenBlock',
  labels: { singular: 'Profil: Zahlen & Fakten', plural: 'Profil: Zahlen & Fakten' },
  fields: [
    ...blockStyleFields,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Abschnitts-Überschrift (optional)',
      admin: { description: 'Leer lassen, wenn keine Überschrift angezeigt werden soll.' },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Kennzahlen',
      minRows: 0,
      defaultValue: profilZahlenFaktenDefaults,
      fields: [
        { name: 'zahl', type: 'text', label: 'Zahl', required: true },
        { name: 'bezeichnung', type: 'text', label: 'Bezeichnung', required: true },
      ],
    },
  ],
}
