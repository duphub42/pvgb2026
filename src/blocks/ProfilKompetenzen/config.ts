import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { profilKompetenzenDefaults, profilSkillLevelOptions } from '@/blocks/ProfilBlocks/defaults'

export const ProfilKompetenzen: Block = {
  slug: 'profilKompetenzen',
  dbName: 'prof_skills',
  interfaceName: 'ProfilKompetenzenBlock',
  labels: { singular: 'Profil: Kompetenzen', plural: 'Profil: Kompetenzen' },
  fields: [
    ...blockStyleFields,
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Abschnitts-Überschrift',
      defaultValue: profilKompetenzenDefaults.sectionTitle,
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
      label: 'Einzeiler unter der Überschrift',
      defaultValue: profilKompetenzenDefaults.sectionIntro,
    },
    {
      name: 'spalten',
      type: 'array',
      label: 'Kompetenz-Spalten',
      minRows: 0,
      defaultValue: profilKompetenzenDefaults.spalten,
      fields: [
        { name: 'bereich', type: 'text', label: 'Bereich', required: true },
        {
          name: 'skills',
          type: 'array',
          label: 'Skills',
          minRows: 0,
          fields: [
            { name: 'skill', type: 'text', label: 'Skill', required: true },
            {
              name: 'level',
              type: 'select',
              label: 'Level',
              required: true,
              defaultValue: 'expert',
              options: profilSkillLevelOptions,
            },
          ],
        },
      ],
    },
  ],
}
