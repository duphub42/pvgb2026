import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config' // 🟢 Korrigierter Pfad (Form statt FormBlock)
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { slugField } from '../../fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: (args: any) => {
        const path = generatePreviewPath({
          slug: typeof args.data?.slug === 'string' ? args.data.slug : '',
          collection: 'pages',
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data: any) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
    useAsTitle: 'title',
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
          fields: [
            {
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
                    { label: 'Philipp Bacher', value: 'philippBacher' },
                  ],
                  required: true,
                },
                {
                  name: 'richText',
                  type: 'richText',
                  admin: {
                    condition: (_, data) => data?.type !== 'none',
                  },
                },
                {
                  name: 'links',
                  type: 'array',
                  admin: {
                    condition: (_, data) => data?.type !== 'none',
                  },
                  fields: [
                    {
                      name: 'link',
                      type: 'group',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                  maxRows: 2,
                },
                {
                  name: 'media',
                  type: 'upload',
                  admin: {
                    condition: (_, data) =>
                      ['highImpact', 'mediumImpact', 'philippBacher'].includes(data?.type),
                  },
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            slugField(),
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                position: 'sidebar',
              },
              hooks: {
                beforeChange: [populatePublishedAt],
              },
            },
          ],
          label: 'Settings',
        },
        {
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
            }),
          ],
          label: 'SEO',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}
