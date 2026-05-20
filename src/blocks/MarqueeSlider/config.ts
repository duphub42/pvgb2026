import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

const defaultRows = [
  {
    direction: 'left',
    speed: 30,
    pauseOnHover: true,
    items: [
      { name: 'CloudStack' },
      { name: 'Figma UI' },
      { name: 'GitHub' },
      { name: 'Layers App' },
      { name: 'Zapier' },
      { name: 'Processors' },
    ],
  },
  {
    direction: 'right',
    speed: 35,
    pauseOnHover: true,
    items: [
      { name: 'CloudStack' },
      { name: 'Figma UI' },
      { name: 'GitHub' },
      { name: 'Layers App' },
      { name: 'Zapier' },
      { name: 'Processors' },
    ],
  },
]

export const MarqueeSliderBlockConfig: Block = {
  slug: 'marqueeSlider',
  interfaceName: 'MarqueeSliderBlock',
  labels: {
    singular: 'Marquee Slider',
    plural: 'Marquee Slider',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Partner & Tools',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Ueberschrift',
      defaultValue: 'Partner & Tools',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Anzeige-Modus',
      defaultValue: 'marquee',
      options: [
        { label: 'Laufzeile (Marquee)', value: 'marquee' },
        { label: 'Statische Logo-Galerie (Bento)', value: 'gallery' },
      ],
    },
    {
      name: 'galleryColumns',
      type: 'select',
      label: 'Galerie-Spalten (Desktop)',
      defaultValue: '4',
      options: [
        { label: '3 Spalten', value: '3' },
        { label: '4 Spalten', value: '4' },
        { label: '5 Spalten', value: '5' },
      ],
      admin: {
        condition: (_, siblingData) => String(siblingData?.displayMode ?? 'marquee') === 'gallery',
      },
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Reihen / Gruppen',
      minRows: 1,
      maxRows: 6,
      defaultValue: defaultRows,
      fields: [
        {
          name: 'direction',
          type: 'select',
          label: 'Richtung',
          defaultValue: 'left',
          options: [
            { label: 'Nach links', value: 'left' },
            { label: 'Nach rechts', value: 'right' },
          ],
          admin: {
            condition: (data) => String(data?.displayMode ?? 'marquee') === 'marquee',
          },
        },
        {
          name: 'speed',
          type: 'number',
          label: 'Dauer (Sekunden)',
          defaultValue: 40,
          min: 8,
          max: 180,
          admin: {
            description:
              'Zeit in Sekunden für einen kompletten Durchlauf. Höherer Wert = langsamer.',
            condition: (data) => String(data?.displayMode ?? 'marquee') === 'marquee',
          },
        },
        {
          name: 'pauseOnHover',
          type: 'checkbox',
          label: 'Bei Hover pausieren',
          defaultValue: true,
          admin: {
            condition: (data) => String(data?.displayMode ?? 'marquee') === 'marquee',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Eintraege',
          minRows: 1,
          maxRows: 32,
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Name',
            },
            {
              name: 'tileSize',
              type: 'select',
              label: 'Kachelgroesse (Galerie)',
              defaultValue: 'md',
              options: [
                { label: 'Klein', value: 'sm' },
                { label: 'Mittel', value: 'md' },
                { label: 'Breit', value: 'wide' },
                { label: 'Hoch', value: 'tall' },
                { label: 'Gross', value: 'large' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
