import type { GlobalConfig } from 'payload'

import { colorFields } from './fields'
import { revalidateDesign } from './hooks/revalidateDesign'

export const Design: GlobalConfig = {
  slug: 'design',
  label: 'Design & Farben',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Schriften und optionale Farben (Success, Hintergrund, Card, …). Primary/Secondary/Accent nur in „Theme Colors“ (Sidebar) einstellbar.',
    group: 'Einstellungen',
  },
  fields: [
    {
      name: 'colorsLight',
      type: 'group',
      label: 'Farben (Hellmodus)',
      admin: { description: 'Überschreibt die Standard-Farben im Hellmodus.' },
      fields: [...colorFields],
    },
    {
      name: 'colorsDark',
      type: 'group',
      label: 'Farben (Dunkelmodus)',
      admin: { description: 'Überschreibt die Standard-Farben im Dunkelmodus.' },
      fields: [...colorFields],
    },
    {
      name: 'fonts',
      type: 'group',
      label: 'Schriften',
      admin: { description: 'CSS font-family. Leer = Geist Sans / Geist Mono.' },
      fields: [
        {
          name: 'body',
          type: 'text',
          label: 'Fließtext',
          admin: {
            description:
              'z. B. var(--font-geist-sans) oder "Inter", sans-serif. Wirkt auf Body und allgemeine Texte.',
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Überschriften',
          admin: {
            description:
              'z. B. var(--font-geist-sans) oder "Inter", sans-serif. Wirkt auf h1–h6.',
          },
        },
        {
          name: 'mono',
          type: 'text',
          label: 'Monospace',
          admin: {
            description: 'z. B. var(--font-geist-mono) für Code und monospace Texte.',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateDesign],
  },
}
