import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import {
  profilIconWertOptions,
  profilUeberMichEinleitungDefault,
  profilWerteDefaults,
} from '@/blocks/ProfilBlocks/defaults'

export const ProfilUeberMich: Block = {
  slug: 'profilUeberMich',
  dbName: 'prof_ueber',
  interfaceName: 'ProfilUeberMichBlock',
  labels: { singular: 'Profil: Über mich', plural: 'Profil: Über mich' },
  fields: [
    ...blockStyleFields,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Abschnitts-Überschrift',
      defaultValue: 'Über mich',
    },
    {
      name: 'einleitung',
      type: 'textarea',
      label: 'Einleitung',
      admin: { description: 'Absätze mit einer Leerzeile trennen.' },
      defaultValue: profilUeberMichEinleitungDefault,
    },
    {
      name: 'werte',
      type: 'array',
      label: 'Werte / Prinzipien',
      minRows: 0,
      defaultValue: profilWerteDefaults,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'strategy',
          options: profilIconWertOptions,
        },
        {
          name: 'wert',
          type: 'text',
          label: 'Überschrift',
          required: true,
        },
        {
          name: 'beschreibung',
          type: 'textarea',
          label: 'Beschreibung',
          required: true,
        },
      ],
    },
  ],
}
