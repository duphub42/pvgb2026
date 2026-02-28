import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Hero Design Typ',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Philipp Bacher (Custom)', value: 'philippBacher' },
        { label: 'Grid Hero (Smoothui)', value: 'gridHero' },
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
        condition: (_, siblingData) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Media',
      admin: {
        condition: (_, siblingData) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Sub-Headline',
      admin: {
        condition: (_, siblingData) =>
          ['highImpact', 'mediumImpact', 'lowImpact', 'philippBacher'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Haupt-Überschrift',
      admin: {
        condition: (_, siblingData) =>
          ['highImpact', 'mediumImpact', 'lowImpact', 'philippBacher'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'headlineLine1',
      type: 'text',
      label: 'Überschrift Zeile 1',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
        description: 'Optional. Wenn gesetzt: 3-Zeilen-Überschrift mit Scramble-Effekt. Sonst wird „Haupt-Überschrift“ verwendet.',
      },
    },
    {
      name: 'headlineLine2',
      type: 'text',
      label: 'Überschrift Zeile 2',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
      },
    },
    {
      name: 'headlineLine3',
      type: 'text',
      label: 'Überschrift Zeile 3',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurze Beschreibung',
      admin: {
        condition: (_, siblingData) =>
          ['highImpact', 'mediumImpact', 'lowImpact', 'philippBacher'].includes(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'backgroundPreset',
      type: 'relationship',
      label: 'Hintergrund-Preset',
      relationTo: 'hero-backgrounds',
      hasMany: false,
      admin: {
        description:
          'Optionales, animiertes Hintergrund-Preset (Halo CSS, Gradient). Wird hinter dem jeweiligen Hero-Layout gerendert.',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'cssHalo',
      label: 'Hintergrund',
      options: [
        { label: 'Halo (CSS, leicht)', value: 'cssHalo' },
        { label: 'Bild', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Animation', value: 'animation' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
        description:
          'Halo (CSS) = weiche Farb-Halos ohne WebGL. Bei „Bild/Video/Animation“ erscheinen die Spezial-Hintergründe nicht.',
      },
    },
    {
      name: 'mediaTypeMobile',
      type: 'select',
      defaultValue: 'auto',
      label: 'Hintergrund (Mobil)',
      options: [
        { label: 'Wie Desktop-Einstellung', value: 'auto' },
        { label: 'Halo (CSS, leicht)', value: 'cssHalo' },
        { label: 'Bild', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Animation', value: 'animation' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
        description:
          'Optionaler Override für Mobilgeräte. „Wie Desktop-Einstellung“ übernimmt die normale Auswahl.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrund Bild',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'philippBacher' && siblingData?.mediaType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrund Video',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'philippBacher' && siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'foregroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vordergrund Bild',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 0.5,
      label: 'Overlay Deckkraft',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'floatingMouseStrength',
          type: 'number',
          label: 'Floating: Stärke Maus-Reaktion',
          defaultValue: 6.5,
          min: 0,
          max: 20,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'philippBacher',
            description: 'Wie stark die schwebenden Elemente dem Cursor ausweichen (0 = aus, 6.5 = Standard).',
          },
        },
        {
          name: 'floatingIdleAmplitude',
          type: 'number',
          label: 'Floating: Idle-Schweben (px)',
          defaultValue: 4,
          min: 0,
          max: 20,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'philippBacher',
            description: 'Amplitude der leichten Bewegung ohne Maus (0 = statisch).',
          },
        },
      ],
    },
    {
      name: 'floatingElements',
      type: 'array',
      label: 'Floating Elements',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
        description: 'Kleine Elemente (Badges, Icons), die über dem Hero schweben. Position über Preset wählen.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label / Text',
          admin: { description: 'Optional. Ein Bild/Icon genügt; mit Text wird beides angezeigt.' },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon / Bild',
          admin: { description: 'Optional. Mit oder ohne Label – mindestens eines von beiden angeben.' },
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link URL',
          admin: { description: 'Optional. Bei Angabe wird das Element klickbar.' },
        },
        {
          name: 'linkNewTab',
          type: 'checkbox',
          label: 'Link in neuem Tab',
          defaultValue: false,
          admin: { condition: (_, siblingData) => Boolean(siblingData?.linkUrl) },
        },
        {
          name: 'position',
          type: 'select',
          label: 'Position',
          required: true,
          defaultValue: 'topRight',
          options: [
            { label: 'Oben links', value: 'topLeft' },
            { label: 'Oben rechts', value: 'topRight' },
            { label: 'Mitte links', value: 'midLeft' },
            { label: 'Mitte rechts', value: 'midRight' },
            { label: 'Unten links', value: 'bottomLeft' },
            { label: 'Unten rechts', value: 'bottomRight' },
          ],
        },
        {
          name: 'offsetX',
          type: 'number',
          label: 'Horizontaler Versatz (%)',
          admin: { description: 'Optional. Versatz von der Preset-Position in % (-50 bis 50).' },
          defaultValue: 0,
        },
        {
          name: 'offsetY',
          type: 'number',
          label: 'Vertikaler Versatz (%)',
          admin: { description: 'Optional. Versatz von der Preset-Position in % (-50 bis 50).' },
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'marqueeHeadline',
      type: 'text',
      label: 'Logo-Bereich Überschrift',
      defaultValue: 'ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
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
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
        description: 'Marquee = Endlos-Laufzeile. Logo Carousel = wechselnde Logos in Spalten (Cult UI).',
      },
    },
    {
      name: 'marqueeLogos',
      type: 'array',
      label: 'Logos',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
        description: 'Logos für Marquee oder Logo Carousel. Gleiche Quelle für beide Anzeigen.',
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
          condition: (_, siblingData) =>
            ['highImpact', 'mediumImpact', 'lowImpact', 'philippBacher'].includes(String(siblingData?.type ?? '')),
        },
      },
    }),
  ],
}
