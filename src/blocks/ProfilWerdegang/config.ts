import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilWerdegangDefaults, profilWerdegangTypOptions } from '@/blocks/ProfilBlocks/defaults'

export const ProfilWerdegang: Block = {
  slug: 'profilWerdegang',
  dbName: 'prof_weg',
  interfaceName: 'ProfilWerdegangBlock',
  labels: { singular: 'Profil: Werdegang', plural: 'Profil: Werdegang' },
  fields: [
    ...blockStyleFields,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Abschnitts-Überschrift',
      defaultValue: profilWerdegangDefaults.sectionTitle,
    },
    {
      name: 'eintraege',
      type: 'array',
      label: 'Einträge',
      minRows: 0,
      defaultValue: profilWerdegangDefaults.eintraege,
      fields: [
        { name: 'zeitraum', type: 'text', label: 'Zeitraum', required: true },
        { name: 'position', type: 'text', label: 'Position / Abschluss', required: true },
        { name: 'unternehmen', type: 'text', label: 'Organisation / Ort', required: true },
        { name: 'beschreibung', type: 'textarea', label: 'Beschreibung' },
        {
          name: 'typ',
          type: 'select',
          label: 'Art',
          required: true,
          defaultValue: 'freelance',
          options: profilWerdegangTypOptions,
        },
      ],
    },
  ],
}
