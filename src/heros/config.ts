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
        { label: 'High Impact (Alt)', value: 'highImpact' },
        { label: 'Low Impact (Alt)', value: 'lowImpact' },
        { label: 'Philipp Bacher (Custom)', value: 'philippBacher' },
      ],
    },
    // --- FELDER FÜR ALTE HEROS (Nur sichtbar bei High/Low Impact) ---
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Inhalt (Alt)',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'lowImpact'].includes(type),
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild (Alt)',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'lowImpact'].includes(type),
      },
    },
    
    // --- FELDER FÜR PHILIPP BACHER HERO (Nur sichtbar bei philippBacher) ---
    {
      name: 'subheadline',
      type: 'text',
      label: 'Sub-Headline',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Haupt-Überschrift',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurze Beschreibung',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Bild', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrund Bild',
      admin: {
        condition: (_, { mediaType, type } = {}) => type === 'philippBacher' && mediaType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media', // Nutze die Media Collection für Videos
      label: 'Hintergrund Video',
      admin: {
        condition: (_, { mediaType, type } = {}) => type === 'philippBacher' && mediaType === 'video',
      },
    },
    {
      name: 'foregroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vordergrund Bild (Parallax)',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 0.5,
      label: 'Overlay Dunkelheit (0.1 - 0.9)',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    
    // --- LINKS (Gemeinsam genutzt oder getrennt) ---
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => ['highImpact', 'philippBacher'].includes(type),
        },
      },
    }),
  ],
}
