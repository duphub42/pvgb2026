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
        { label: 'Statische Logo-Galerie', value: 'gallery' },
        { label: 'Bento Showcase', value: 'bento' },
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
        condition: (_, siblingData) => {
          const mode = String(siblingData?.displayMode ?? 'marquee')
          return mode === 'gallery' || mode === 'bento'
        },
      },
    },
    {
      name: 'bentoShowCounter',
      type: 'checkbox',
      label: 'Bento: Counter anzeigen',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => String(siblingData?.displayMode ?? 'marquee') === 'bento',
      },
    },
    {
      name: 'bentoCounterLabel',
      type: 'text',
      label: 'Bento: Counter Label',
      admin: {
        condition: (_, siblingData) =>
          String(siblingData?.displayMode ?? 'marquee') === 'bento' &&
          siblingData?.bentoShowCounter === true,
      },
    },
    {
      name: 'bentoGap',
      type: 'select',
      label: 'Bento: Grid-Abstand',
      defaultValue: 'default',
      options: [
        { label: 'Eng', value: 'tight' },
        { label: 'Standard', value: 'default' },
        { label: 'Luftig', value: 'relaxed' },
      ],
      admin: {
        condition: (_, siblingData) => String(siblingData?.displayMode ?? 'marquee') === 'bento',
      },
    },
    {
      name: 'bentoRowHeight',
      type: 'select',
      label: 'Bento: Zeilenhoehe',
      defaultValue: 'md',
      options: [
        { label: 'Kompakt', value: 'sm' },
        { label: 'Standard', value: 'md' },
        { label: 'Gross', value: 'lg' },
      ],
      admin: {
        condition: (_, siblingData) => String(siblingData?.displayMode ?? 'marquee') === 'bento',
      },
    },
    {
      name: 'bentoMobileFlattenSpans',
      type: 'checkbox',
      label: 'Bento: Mobile Spans vereinheitlichen',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => String(siblingData?.displayMode ?? 'marquee') === 'bento',
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
            {
              name: 'bentoInteractive',
              type: 'checkbox',
              label: 'Bento: Detail-Overlay aktiv',
              defaultValue: false,
              admin: {
                condition: (data) => String(data?.displayMode ?? 'marquee') === 'bento',
              },
            },
            {
              name: 'detailTitle',
              type: 'text',
              label: 'Bento: Detail-Titel',
              admin: {
                condition: (data, siblingData) =>
                  String(data?.displayMode ?? 'marquee') === 'bento' &&
                  siblingData?.bentoInteractive === true,
              },
            },
            {
              name: 'detailText',
              type: 'textarea',
              label: 'Bento: Detail-Text',
              admin: {
                condition: (data, siblingData) =>
                  String(data?.displayMode ?? 'marquee') === 'bento' &&
                  siblingData?.bentoInteractive === true,
              },
            },
            {
              name: 'detailMeta',
              type: 'text',
              label: 'Bento: Detail-Meta',
              admin: {
                condition: (data, siblingData) =>
                  String(data?.displayMode ?? 'marquee') === 'bento' &&
                  siblingData?.bentoInteractive === true,
              },
            },
            {
              name: 'emphasis',
              type: 'select',
              label: 'Bento: Betonung',
              defaultValue: 'normal',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Feature', value: 'feature' },
              ],
              admin: {
                condition: (data) => String(data?.displayMode ?? 'marquee') === 'bento',
              },
            },
          ],
        },
      ],
    },
  ],
}
