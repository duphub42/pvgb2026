import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const ProfilBacher: Block = {
  slug: 'profilBacher',
  interfaceName: 'ProfilBacherBlock',
  labels: {
    singular: 'Profil Philipp Bacher',
    plural: 'Profil Philipp Bacher',
  },
  admin: {
    description:
      'Vollständiger Profilinhalt (Texte, CV, Skills) liegt in `src/blocks/ProfilBacher/profilContent.ts` und wird hier nur angezeigt.',
  },
  fields: [...blockStyleFields],
}
