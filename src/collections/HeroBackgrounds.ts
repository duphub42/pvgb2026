import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const HeroBackgrounds: CollectionConfig = {
  slug: 'hero-backgrounds',
  labels: {
    singular: 'Hero Background',
    plural: 'Hero Backgrounds',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type'],
    group: 'Design',
    description:
      'Vorkonfigurierte, animierte Header-Hintergründe (CSS-only). Können in allen Heros als Hintergrund-Layer verwendet werden.',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Typ',
      required: true,
      defaultValue: 'orbit',
      options: [
        { label: 'Orbit (CSS Donut)', value: 'orbit' },
        { label: 'Halo (CSS)', value: 'cssHalo' },
        { label: 'Quadratmuster', value: 'patternSquare' },
        { label: 'Gold Radial', value: 'goldRadial' },
        { label: 'Gradient / Custom CSS', value: 'gradient' },
      ],
    },
    {
      name: 'intensity',
      type: 'number',
      label: 'Intensität',
      defaultValue: 1,
      min: 0.2,
      max: 2,
      step: 0.1,
      admin: {
        description: '0.2 = sehr dezent, 1 = Standard, 2 = sehr kräftig.',
        condition: (_, siblingData) => ['orbit', 'cssHalo'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'hue',
      type: 'number',
      label: 'Farbton (Hue, Grad)',
      defaultValue: 220,
      min: 0,
      max: 360,
      admin: {
        description: 'Grundfarbton für Orbit/Halo (0–360). Wird per CSS-Variablen auf den Hintergrund angewendet.',
        condition: (_, siblingData) => ['orbit', 'cssHalo'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'patternColor1',
      type: 'text',
      label: 'Musterfarbe 1',
      admin: {
        description:
          'Hex-Farbe (z. B. #d4af37). Gold Radial: Akzentfarbe. Quadratmuster: Streifenfarbe.',
        condition: (_, siblingData) =>
          ['patternSquare', 'goldRadial'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'patternColor2',
      type: 'text',
      label: 'Musterfarbe 2',
      admin: {
        description:
          'Hex-Farbe (z. B. #121212). Gold Radial: dunkle Farbe. Quadratmuster: Grundfarbe/Hintergrund.',
        condition: (_, siblingData) =>
          ['patternSquare', 'goldRadial'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'customCss',
      type: 'code',
      label: 'Zusätzliches CSS (optional)',
      admin: {
        language: 'css',
        description:
          'Optionales CSS, das im Hero als zusätzliche Klasse angewendet werden kann. Keine externen Imports (kein @import, kein <script>).',
        condition: (_, siblingData) => siblingData?.type === 'gradient',
      },
    },
  ],
}

