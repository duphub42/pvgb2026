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
      name: 'description',
      type: 'textarea',
      label: 'Kurze Beschreibung',
      admin: {
        condition: (_, siblingData) =>
          ['highImpact', 'mediumImpact', 'lowImpact', 'philippBacher'].includes(String(siblingData?.type ?? '')),
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
        condition: (_, siblingData) => siblingData?.type === 'philippBacher',
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
