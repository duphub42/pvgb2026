import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

/** Popout-Portrait-Layout (Legacy, Superhero, Style Preview): gleiche CMS-Felder inkl. Stack/Muster. */
export const POPOUT_LAYOUT_HERO_TYPES = ['superhero'] as const

const isPopoutLayoutHero = (type: string | undefined) =>
  POPOUT_LAYOUT_HERO_TYPES.includes(type as (typeof POPOUT_LAYOUT_HERO_TYPES)[number])

/** Hero-Typen, die Headline/Beschreibung/Links/Media im Backend bearbeitbar haben (inkl. Shadcn Blocks). */

const HERO_TYPES_WITH_EDITABLE_CONTENT = [
  'highImpact',
  'mediumImpact',
  'lowImpact',
  'superhero',
] as const

const hasEditableContent = (type: string | undefined) =>
  type != null && (HERO_TYPES_WITH_EDITABLE_CONTENT as readonly string[]).includes(type)

const isSuperheroHero = (type: string | undefined) => String(type ?? '') === 'superhero'
const heroTypesWithLogoMarquee = (type: string | undefined) => isSuperheroHero(type)

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Hero Design Typ',
      // Neue Seiten wählen nur den aktuellen `superhero` Typ für Popout-Portraits.
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Superhero (Popout-Portrait)', value: 'superhero' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, siblingData) =>
          ['highImpact', 'mediumImpact', 'lowImpact'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait / Vordergrund-Bild',
      admin: {
        condition: (_, siblingData) => {
          const t = String(siblingData?.type ?? '')
          return ['highImpact', 'mediumImpact', 'lowImpact', 'superhero'].includes(t)
        },
        description:
          'Das Hauptbild rechts (Portrait bei Superhero/Popout). Für den Hintergrund verwende „Hintergrund Bild" weiter unten.',
      },
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Sub-Headline',
      admin: {
        condition: (_, siblingData) => hasEditableContent(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Haupt-Überschrift',
      admin: {
        condition: (_, siblingData) => hasEditableContent(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'headlineLine1',
      type: 'text',
      label: 'Überschrift Zeile 1',
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
        description:
          'Optional. Wenn gesetzt: mehrzeilige Überschrift. Sonst wird „Haupt-Überschrift“ verwendet.',
      },
    },
    {
      name: 'headlineLine2',
      type: 'text',
      label: 'Überschrift Zeile 2',
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'headlineLine3',
      type: 'text',
      label: 'Überschrift Zeile 3',
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurze Beschreibung',
      admin: {
        condition: (_, siblingData) => hasEditableContent(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'contentVerticalAlignment',
      type: 'select',
      label: 'Content-Ausrichtung',
      defaultValue: 'center',
      options: [
        { label: 'Oben', value: 'top' },
        { label: 'Mitte', value: 'center' },
        { label: 'Unten', value: 'bottom' },
      ],
      admin: {
        condition: (_, siblingData) => isSuperheroHero(String(siblingData?.type ?? '')),
        description: 'Vertikale Position des Contents innerhalb des Superhero-Layouts.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrund Bild',
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
        description: 'Vollflächiger Hintergrund hinter dem Hero (object-cover).',
      },
    },
    {
      name: 'marqueeHeadline',
      type: 'text',
      label: 'Logo-Bereich Überschrift',
      defaultValue: 'ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN',
      admin: {
        condition: (_, siblingData) =>
          heroTypesWithLogoMarquee(siblingData?.type as string | undefined),
        description: 'Überschrift über den Logos (wie auf philippbacher.com).',
      },
    },
    {
      name: 'logoDisplayType',
      type: 'select',
      label: 'Logo-Anzeige',
      defaultValue: 'marquee',
      options: [
        { label: 'Laufzeile (Marquee)', value: 'marquee' },
        { label: 'Logo Carousel (Cult UI)', value: 'logoCarousel' },
      ],
      admin: {
        condition: (_, siblingData) =>
          heroTypesWithLogoMarquee(siblingData?.type as string | undefined),
        description:
          'Marquee = Endlos-Laufzeile. Logo Carousel = nur bei Philipp-Bacher-Layout (Cult UI); Impact-Heros nutzen die Laufzeile.',
      },
    },
    {
      name: 'marqueeLogos',
      type: 'array',
      label: 'Logos',
      admin: {
        condition: (_, siblingData) =>
          heroTypesWithLogoMarquee(siblingData?.type as string | undefined),
        description: 'Logos für die Laufzeile (Philipp Bacher + High/Medium/Low Impact).',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt-Text',
          admin: { description: 'Optional. Für Barrierefreiheit.' },
        },
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, siblingData) => hasEditableContent(String(siblingData?.type ?? '')),
        },
      },
    }),
  ],
}
