import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { hero } from '../config'  // <-- Korrigierter Import (geht eine Ebene höher)

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
    hero,  // <-- Hero-Feld wird hier eingefügt
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
