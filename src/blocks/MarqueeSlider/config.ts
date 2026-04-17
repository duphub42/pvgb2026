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
      defaultValue: 'Unsere Partner',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Marquee-Reihen',
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
              'Zeit in Sekunden fuer einen kompletten Durchlauf. Hoeherer Wert = langsamer.',
          },
        },
        {
          name: 'pauseOnHover',
          type: 'checkbox',
          label: 'Bei Hover pausieren',
          defaultValue: true,
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
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
