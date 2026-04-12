import type { Field } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const LEISTUNGEN_HERO_TYPE = 'leistungenHero' as const

export const leistungenHeroField: Field = {
  name: 'hero',
  type: 'group',
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        if (typeof data.media === 'undefined') data.media = null
        if (Array.isArray(data.marqueeLogos)) {
          data.marqueeLogos = data.marqueeLogos.map((logo) =>
            logo && typeof logo.logo === 'undefined' ? { ...logo, logo: null } : logo,
          )
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: LEISTUNGEN_HERO_TYPE,
      label: 'Hero Design Typ',
      options: [{ label: 'Leistungen Hero', value: LEISTUNGEN_HERO_TYPE }],
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Haupt-Überschrift',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      fields: [
        { name: 'value', type: 'text', label: 'Wert', required: true },
        { name: 'label', type: 'text', label: 'Label', required: true },
      ],
    },
    {
      name: 'marqueeHeadline',
      type: 'text',
      label: 'Logo-Bereich Überschrift',
    },
    {
      name: 'marqueeLogos',
      type: 'array',
      label: 'Logos',
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo', required: true },
        { name: 'alt', type: 'text', label: 'Alt-Text' },
      ],
    },
    linkGroup({ overrides: { maxRows: 2 } }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrundbild',
    },
  ],
}
