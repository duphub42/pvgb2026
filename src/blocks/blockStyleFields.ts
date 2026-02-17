import type { Field } from 'payload'

/**
 * Gemeinsame Felder für alle Layout-Blöcke: Hintergrund und Overlay-Filter.
 * Werden in RenderBlocks ausgewertet und als Wrapper angewendet.
 */
export const blockStyleFields: Field[] = [
  {
    name: 'blockBackground',
    type: 'select',
    label: 'Hintergrund',
    defaultValue: 'none',
    options: [
      { label: 'Keiner', value: 'none' },
      { label: 'Hell (muted)', value: 'muted' },
      { label: 'Abgesetzt (accent)', value: 'accent' },
      { label: 'Sehr hell', value: 'light' },
      { label: 'Dunkel', value: 'dark' },
    ],
    admin: {
      description: 'Optionaler Hintergrund für den gesamten Block.',
    },
  },
  {
    name: 'blockOverlay',
    type: 'group',
    label: 'Overlay-Filter',
    admin: {
      description: 'Optionaler Farbfilter über dem Blockinhalt (z. B. abdunkeln).',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        label: 'Overlay aktiv',
        defaultValue: false,
      },
      {
        name: 'color',
        type: 'select',
        label: 'Farbe',
        defaultValue: 'dark',
        options: [
          { label: 'Dunkel', value: 'dark' },
          { label: 'Hell', value: 'light' },
        ],
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enabled),
        },
      },
      {
        name: 'opacity',
        type: 'number',
        label: 'Deckkraft (%)',
        min: 0,
        max: 100,
        defaultValue: 30,
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enabled),
          description: '0 = transparent, 100 = voll deckend.',
        },
      },
    ],
  },
]
