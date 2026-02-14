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
    {
      name: 'richText',
      type: 'richText',
      label: 'Inhalt (Alt)',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'lowImpact'].includes(type),
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild (Alt)',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'lowImpact'].includes(type),
      },
    },
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
      label: 'Medium Typ',
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
        condition: (_, { mediaType, type } = {}) => 
          type === 'philippBacher' && mediaType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrund Video',
      admin: {
        condition: (_, { mediaType, type } = {}) => 
          type === 'philippBacher' && mediaType === 'video',
      },
    },
    {
      name: 'foregroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vordergrund Bild',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 0.5,
      label: 'Overlay Deckkraft',
      admin: {
        condition: (_, { type } = {}) => type === 'philippBacher',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => 
            ['highImpact', 'philippBacher'].includes(type),
        },
      },
    }),
  ],
}
