import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultContactInfoCards = [
  {
    icon: 'map-pin' as const,
    title: 'Adresse',
    lines: 'Philipp Bacher\nMünchen & Remote',
  },
  {
    icon: 'phone' as const,
    title: 'Kontaktdaten',
    lines: 'Telefon: +49 3459 6393323\nE-Mail: mail@philippbacher.com',
  },
  {
    icon: 'clock-3' as const,
    title: 'Office Hours',
    lines: 'Mo-Fr: 09:00-18:00 Uhr\nSowie nach Terminvereinbarung',
  },
]

export const ContactInfoCardsBlockConfig: Block = {
  slug: 'contactInfoCards',
  dbName: 'contact_cards',
  interfaceName: 'ContactInfoCardsBlock',
  labels: {
    singular: 'Kontakt-Infoboxen',
    plural: 'Kontakt-Infoboxen',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'cards',
      type: 'array',
      label: 'Infoboxen',
      minRows: 1,
      maxRows: 6,
      defaultValue: defaultContactInfoCards,
      admin: {
        description: 'Eine Box pro Eintrag. Zeilen im Textfeld jeweils mit Zeilenumbruch trennen.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'map-pin',
          options: [
            { label: 'Pin / Adresse', value: 'map-pin' },
            { label: 'Telefon', value: 'phone' },
            { label: 'Uhr', value: 'clock-3' },
            { label: 'E-Mail', value: 'mail' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'lines',
          type: 'textarea',
          required: true,
          label: 'Zeilen',
          admin: {
            description: 'Eine Zeile pro Absatz (mit Enter trennen).',
          },
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'Termin anfragen',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTA Button Link',
      defaultValue: '#kontaktformular',
    },
  ],
}
