import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { linkGroup } from '@/fields/linkGroup'

/** Optionen für Shadcn-Block-Varianten (müssen in ShadcnBlock/Component.tsx gerendert werden). */
export const SHADCN_BLOCK_VARIANTS = [
  { label: 'Feature 215b', value: 'feature215b' },
  { label: 'Feature 210', value: 'feature210' },
  { label: 'About 15', value: 'about15' },
  { label: 'About 8', value: 'about8' },
  { label: 'About 3', value: 'about3' },
  { label: 'Hero 238', value: 'hero238' },
  { label: 'Hero 256', value: 'hero256' },
  { label: 'Feature 268', value: 'feature268' },
  { label: 'Feature 267', value: 'feature267' },
  { label: 'Feature 271', value: 'feature271' },
  { label: 'Feature 270', value: 'feature270' },
  { label: 'Feature 282', value: 'feature282' },
  { label: 'Feature 294', value: 'feature294' },
  { label: 'Feature 147', value: 'feature147' },
  { label: 'Feature 148', value: 'feature148' },
  { label: 'Feature 190', value: 'feature190' },
  { label: 'Feature 229', value: 'feature229' },
  { label: 'Feature 250', value: 'feature250' },
  { label: 'Feature 251', value: 'feature251' },
  { label: 'Feature 253', value: 'feature253' },
  { label: 'Feature 256', value: 'feature256' },
  { label: 'Feature 261', value: 'feature261' },
] as const

export type ShadcnBlockVariant = (typeof SHADCN_BLOCK_VARIANTS)[number]['value']

/**
 * Gemeinsame Inhaltsfelder für Shadcn-Blöcke. Viele Varianten nutzen Überschrift, Bilder oder Links.
 * Komponenten lesen content.* und verwenden die Werte, sofern gesetzt; sonst Fallback auf Hardcoded.
 */
const shadcnBlockContentFields = [
  {
    name: 'variant',
    type: 'select',
    required: true,
    options: [...SHADCN_BLOCK_VARIANTS],
    admin: {
      description: 'Welche Shadcnblocks-Komponente angezeigt werden soll.',
    },
  },
  {
    name: 'content',
    type: 'group',
    dbName: 'ct',
    label: 'Inhalt (optional überschreiben)',
    admin: {
      description:
        'Optional: Texte, Bilder und Links hier pflegen. Nur ausgefüllte Felder ersetzen die Standard-Inhalte der Block-Variante.',
    },
    fields: [
      {
        name: 'headline',
        type: 'text',
        label: 'Überschrift',
        admin: { description: 'Ersetzt die Standard-Überschrift der Komponente.' },
      },
      {
        name: 'subheadline',
        type: 'text',
        label: 'Unterüberschrift / Badge-Text',
      },
      {
        name: 'body',
        type: 'textarea',
        label: 'Fließtext',
        admin: { description: 'Kurzer Beschreibungstext.' },
      },
      {
        name: 'images',
        type: 'array',
        label: 'Bilder',
        admin: {
          description: 'Bilder für Galerien, Marquees etc. Reihenfolge = Anzeige.',
          initCollapsed: true,
        },
        fields: [
          {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Bild',
          },
        ],
      },
      linkGroup({
        appearances: ['default', 'outline'],
        overrides: {
          name: 'links',
          dbName: 'lnks',
          maxRows: 2,
          admin: { description: 'Optional: Buttons/Links (z. B. CTA).' },
        },
      }),
    ],
  },
]

export const ShadcnBlock: Block = {
  slug: 'shadcnBlock',
  interfaceName: 'ShadcnBlock',
  labels: {
    singular: 'Shadcn Block',
    plural: 'Shadcn Blocks',
  },
  fields: [...blockStyleFields, ...shadcnBlockContentFields],
}
