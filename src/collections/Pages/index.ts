import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: 'https://pvgb2026.vercel.app/{slug}',
    },
    preview: (doc) => {
      return `https://pvgb2026.vercel.app/${doc.slug}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
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
                    { label: 'Low Impact', value: 'lowImpact' },
                    { label: 'Philipp Bacher (Custom)', value: 'philippBacher' },
                  ],
                },
                {
                  name: 'richText',
                  type: 'richText',
                  label: 'Inhalt',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                    ],
                  }),
                  admin: {
                    condition: (_, { type } = {}) => 
                      ['highImpact', 'lowImpact'].includes(type),
                  },
                },
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Bild',
                  admin: {
                    condition: (_, { type } = {}) => 
                      ['highImpact', 'lowImpact'].includes(type),
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
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                {
                  slug: 'cta',
                  fields: [
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
                    },
                    linkGroup({
                      overrides: {
                        maxRows: 2,
                      },
                    }),
                  ],
                  labels: {
                    singular: 'Call to Action',
                    plural: 'Calls to Action',
                  },
                },
                {
                  slug: 'content',
                  fields: [
                    {
                      name: 'columns',
                      type: 'array',
                      fields: [
                        {
                          name: 'size',
                          type: 'select',
                          defaultValue: 'full',
                          options: [
                            {
                              label: 'One Third',
                              value: 'oneThird',
                            },
                            {
                              label: 'Half',
                              value: 'half',
                            },
                            {
                              label: 'Two Thirds',
                              value: 'twoThirds',
                            },
                            {
                              label: 'Full',
                              value: 'full',
                            },
                          ],
                        },
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
                        },
                        {
                          name: 'enableLink',
                          type: 'checkbox',
                        },
                        linkGroup({
                          overrides: {
                            admin: {
                              condition: (_, { enableLink }) => Boolean(enableLink),
                            },
                          },
                        }),
                      ],
                    },
                  ],
                  labels: {
                    singular: 'Content',
                    plural: 'Contents',
                  },
                },
                {
                  slug: 'mediaBlock',
                  fields: [
                    {
                      name: 'media',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                  ],
                  labels: {
                    singular: 'Media Block',
                    plural: 'Media Blocks',
                  },
                },
                {
                  slug: 'archive',
                  fields: [
                    {
                      name: 'introContent',
                      type: 'richText',
                      editor: lexicalEditor({
                        features: ({ rootFeatures }) => [
                          ...rootFeatures,
                          FixedToolbarFeature(),
                          InlineToolbarFeature(),
                        ],
                      }),
                    },
                    {
                      name: 'populateBy',
                      type: 'select',
                      defaultValue: 'collection',
                      options: [
                        {
                          label: 'Collection',
                          value: 'collection',
                        },
                        {
                          label: 'Individual Selection',
                          value: 'selection',
                        },
                      ],
                    },
                    {
                      name: 'relationTo',
                      type: 'select',
                      admin: {
                        condition: (_, siblingData) => siblingData.populateBy === 'collection',
                      },
                      options: [
                        {
                          label: 'Posts',
                          value: 'posts',
                        },
                      ],
                    },
                    {
                      name: 'limit',
                      type: 'number',
                      admin: {
                        condition: (_, siblingData) => siblingData.populateBy === 'collection',
                        step: 1,
                      },
                      defaultValue: 10,
                    },
                    {
                      name: 'selectedDocs',
                      type: 'relationship',
                      admin: {
                        condition: (_, siblingData) => siblingData.populateBy === 'selection',
                      },
                      hasMany: true,
                      relationTo: ['posts'],
                    },
                  ],
                  labels: {
                    singular: 'Archive',
                    plural: 'Archives',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
  ],
}
