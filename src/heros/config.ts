import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
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
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Philipp Bacher (Custom)', value: 'philippBacher' },
      ],
      required: true,
    },
    // Deine individuellen Felder für den Philipp Bacher Look
    {
      name: 'subheadline',
      type: 'text',
      label: 'Sub-Headline',
    },
    {
      name: 'headline',
      type: 'textarea',
      label: 'Haupt-Überschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibungstext',
    },
    {
      name: 'mediaType',
      type: 'select',
      label: 'Medien-Typ',
      options: [
        { label: 'Bild', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'backgroundVideo',
      type: 'text',
      label: 'Video URL (Hintergrund)',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay Deckkraft (0.1 bis 1.0)',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrundbild',
    },
    {
      name: 'foregroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Vordergrundbild',
    },
    // Standard Felder des Templates
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Rich Text (Optional)',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Standard Bild (Media)',
      required: false,
    },
  ],
  label: false,
}
