import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config' // Korrigierter Pfad
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'
import { hero as heroField } from '../../heros/config'

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
    defaultColumns: ['title', 'slug', 'parent', 'updatedAt'],
    livePreview: {
      url: (args: { data?: { slug?: string; id?: number }; collectionConfig?: unknown; locale?: unknown }) => {
        const data = args?.data
        const id = typeof data?.id === 'number' && Number.isFinite(data.id) ? data.id : undefined
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : 'home',
          collection: 'pages',
          id,
        })
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
        return path ? `${base}${path}` : base || '/'
      },
    },
    preview: (data: { slug?: string; id?: number }) => {
      const id = typeof data?.id === 'number' && Number.isFinite(data.id) ? data.id : undefined
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : 'home',
        collection: 'pages',
        id,
      })
      const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
      return path ? `${base}${path}` : base || '/'
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
          label: 'Hero',
          fields: [heroField],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            slugField(),
            {
              name: 'parent',
              type: 'relationship',
              relationTo: 'pages',
              hasMany: false,
              admin: {
                position: 'sidebar',
                description: 'Übergeordnete Seite für Baumstruktur (z. B. /leistungen/webdesign).',
              },
              filterOptions: ({ id }: { id?: number | string }) =>
                id != null ? { id: { not_equals: id } } : true,
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: 'SEO',
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
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
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
