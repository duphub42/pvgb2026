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
  'proAthlete',
  'leistungenHero',
] as const

const hasEditableContent = (type: string | undefined) =>
  type != null && (HERO_TYPES_WITH_EDITABLE_CONTENT as readonly string[]).includes(type)

const heroTypesWithLogoMarquee = (type: string | undefined) =>
  ['superhero', 'highImpact', 'mediumImpact', 'lowImpact'].includes(String(type ?? ''))

const isProAthleteHero = (type: string | undefined) => String(type ?? '') === 'proAthlete'
const isPopoutOrProAthleteHero = (type: string | undefined) =>
  isPopoutLayoutHero(type) || isProAthleteHero(type)
const isHeadlineLineHero = (type: string | undefined) =>
  isPopoutLayoutHero(type) || isProAthleteHero(type)

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
        { label: 'Pro Athlete', value: 'proAthlete' },
        { label: 'Leistungen Hero', value: 'leistungenHero' },
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
      label: 'Media / Hintergrundbild',
      admin: {
        condition: (_, siblingData) => {
          const t = String(siblingData?.type ?? '')
          return ['highImpact', 'mediumImpact', 'lowImpact', 'superhero', 'proAthlete'].includes(t)
        },
        description:
          'Optionales Bild rechts (Popout/Style Preview). Bei Profil-Hero zusätzlich nutzbar, wenn kein separates „Hintergrund Bild“ (mediaType Bild) gesetzt ist.',
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
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        condition: (_, siblingData) => isProAthleteHero(String(siblingData?.type ?? '')),
        description: 'Kurzer Label-Text über der Hauptüberschrift (z. B. Pro Athlete 2026).',
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
        condition: (_, siblingData) => isHeadlineLineHero(String(siblingData?.type ?? '')),
        description:
          'Optional. Wenn gesetzt: mehrzeilige Überschrift. Sonst wird „Haupt-Überschrift“ verwendet.',
      },
    },
    {
      name: 'headlineLine2',
      type: 'text',
      label: 'Überschrift Zeile 2',
      admin: {
        condition: (_, siblingData) => isHeadlineLineHero(String(siblingData?.type ?? '')),
      },
    },
    {
      name: 'headlineLine3',
      type: 'text',
      label: 'Überschrift Zeile 3',
      admin: {
        condition: (_, siblingData) => isHeadlineLineHero(String(siblingData?.type ?? '')),
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
      name: 'stats',
      type: 'array',
      label: 'Stats',
      admin: {
        condition: (_, siblingData) => isProAthleteHero(String(siblingData?.type ?? '')),
        description: 'Statistiken, die im Hero als Zahlen-/Label-Paare angezeigt werden.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Wert',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundPreset',
      type: 'relationship',
      label: 'Hintergrund-Preset',
      relationTo: 'hero-backgrounds',
      hasMany: false,
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
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
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
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
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
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
          isPopoutLayoutHero(String(siblingData?.type ?? '')) && siblingData?.mediaType === 'image',
        description:
          'Nur sichtbar, wenn „Hintergrund“ = Bild. Vollflächig hinter dem Hero (object-cover). Zusätzlich nutzbar als hintere Ebene im rechten Bild-Stack, wenn „Bild hinten“ leer ist.',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrund Video',
      admin: {
        condition: (_, siblingData) =>
          isPopoutLayoutHero(String(siblingData?.type ?? '')) && siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'foregroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vordergrund Bild',
      admin: {
        condition: (_, siblingData) => isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
        description:
          'Hauptmotiv rechts (vorderste Ebene), sofern kein separates „Stack vorn“ gesetzt ist.',
      },
    },
    {
      name: 'surfacePattern',
      type: 'select',
      label: 'Oberflächenmuster',
      defaultValue: 'none',
      options: [
        { label: 'Keins', value: 'none' },
        { label: 'Waben (Honeycomb)', value: 'honeycomb' },
        { label: 'Karo', value: 'checker' },
        { label: 'Millimeterpapier', value: 'mmPaper' },
        { label: 'Punkte', value: 'dots' },
        { label: 'Linien horizontal', value: 'linesHorizontal' },
        { label: 'Linien vertikal', value: 'linesVertical' },
        { label: 'Gitter (Linien)', value: 'gridLines' },
      ],
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
        description: 'Dezentes Muster über der Hero-Fläche (unter Text/Bildern).',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stackBackImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Stack: Bild hinten (Ebene 3)',
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
          },
        },
        {
          name: 'stackBackOffsetX',
          type: 'number',
          label: 'Hinten ΔX (px)',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            width: '50%',
          },
        },
        {
          name: 'stackBackOffsetY',
          type: 'number',
          label: 'Hinten ΔY (px)',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stackMidImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Stack: Bild Mitte (Ebene 2)',
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
          },
        },
        {
          name: 'stackMidOffsetX',
          type: 'number',
          label: 'Mitte ΔX (px)',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            width: '50%',
          },
        },
        {
          name: 'stackMidOffsetY',
          type: 'number',
          label: 'Mitte ΔY (px)',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stackFrontImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Stack: Bild vorn (Ebene 1)',
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            description: 'Optional. Leer = „Vordergrund Bild“ wird als vordere Ebene genutzt.',
          },
        },
        {
          name: 'stackFrontOffsetX',
          type: 'number',
          label: 'Vorn ΔX (px)',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            width: '50%',
          },
        },
        {
          name: 'stackFrontOffsetY',
          type: 'number',
          label: 'Vorn ΔY (px)',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 0.5,
      label: 'Overlay Deckkraft',
      admin: {
        condition: (_, siblingData) => isPopoutLayoutHero(String(siblingData?.type ?? '')),
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
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
            description:
              'Wie stark die schwebenden Elemente dem Cursor ausweichen (0 = aus, 6.5 = Standard).',
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
            condition: (_, siblingData) =>
              isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
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
        condition: (_, siblingData) => isPopoutOrProAthleteHero(String(siblingData?.type ?? '')),
        description:
          'Kleine Elemente (Badges, Icons), die über dem Hero schweben. Position über Preset wählen.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Überschrift',
          admin: { description: 'Optional. Kurztitel der Karte; Icon allein reicht auch.' },
        },
        {
          name: 'floatingDescription',
          type: 'text',
          label: 'Kurzbeschreibung',
          admin: {
            description: 'Optional. Eine Zeile unter der Überschrift (max. 2 Zeilen im Layout).',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon / Bild',
          admin: {
            description: 'Optional. Mit oder ohne Label – mindestens eines von beiden angeben.',
          },
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
