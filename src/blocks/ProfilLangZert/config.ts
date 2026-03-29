import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilSprachenDefaults, profilZertifikateDefaults } from '@/blocks/ProfilBlocks/defaults'

export const ProfilLangZert: Block = {
  slug: 'profilLangZert',
  interfaceName: 'ProfilLangZertBlock',
  dbName: 'prof_lang_zert',
  labels: {
    singular: 'Profil: Sprachen & Zertifikate',
    plural: 'Profil: Sprachen & Zertifikate',
  },
  fields: [
    ...blockStyleFields,
    {
      type: 'row',
      fields: [
        {
          name: 'sprachenSectionTitle',
          type: 'text',
          label: 'Überschrift (Sprachen)',
          defaultValue: 'Sprachen',
        },
        {
          name: 'zertifikateSectionTitle',
          type: 'text',
          label: 'Überschrift (Zertifikate)',
          defaultValue: 'Zertifikate & Qualifikationen',
        },
      ],
    },
    {
      name: 'sprachen',
      type: 'array',
      label: 'Sprachen',
      minRows: 0,
      defaultValue: profilSprachenDefaults,
      fields: [
        { name: 'sprache', type: 'text', label: 'Sprache', required: true },
        { name: 'niveau', type: 'text', label: 'Niveau', required: true },
      ],
    },
    {
      name: 'zertifikate',
      type: 'array',
      label: 'Zertifikate',
      minRows: 0,
      defaultValue: profilZertifikateDefaults,
      fields: [{ name: 'bezeichnung', type: 'text', label: 'Bezeichnung', required: true }],
    },
  ],
}
