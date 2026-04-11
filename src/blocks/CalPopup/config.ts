import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const CalPopup: Block = {
  slug: 'calPopup',
  interfaceName: 'CalPopupBlock',
  labels: {
    singular: 'Cal Termin',
    plural: 'Cal Termine',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      required: false,
      admin: {
        description: 'Optionaler Text oberhalb des Buttons.',
      },
    },
    {
      name: 'calLink',
      type: 'text',
      label: 'Cal-Link',
      required: true,
      admin: {
        description:
          'Gib hier den Cal.com- oder Cal.eu-Buchungs-Pfad ein, z. B. philippbacher/15min. Optional: Trage eine vollständige URL (https://cal.com/...) oder für EU "eu:philippbacher/15min" ein.',
      },
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button-Label',
      defaultValue: 'Termin buchen',
      required: true,
    },
  ],
}
