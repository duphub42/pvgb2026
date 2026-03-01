import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { HeroMarketing } from '../../blocks/HeroMarketing/config'
import {
  createClearOrphanedRefsAfterReadHook,
  createClearOrphanedRefsBeforeChangeHook,
  createClearOrphanedRefsBeforeValidateHook,
} from '../../hooks/clearOrphanedRefs'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { normalizeLayout } from './hooks/normalizeLayout'
import { revalidatePage } from './hooks/revalidatePage'
import { stripIdOnUpdate } from './hooks/stripIdOnUpdate'
import { hero as heroField } from '../../heros/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig = {
  slug: 'site-pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'parent', 'updatedAt'],
    description: 'Seiten für die Website (z. B. Startseite, Unterseiten).',
    listSearchableFields: ['title', 'slug'],
    // Live Preview deaktiviert, damit die Bearbeitungsansicht zuverlässig das Formular rendert.
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
              blocks: [
                HeroMarketing,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
              ],
              required: false,
              admin: {
                description: 'Mindestens einen Block hinzufügen, damit die Seite Inhalt hat.',
              },
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
              relationTo: 'site-pages',
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
    afterRead: [normalizeLayout, createClearOrphanedRefsAfterReadHook()],
    beforeValidate: [createClearOrphanedRefsBeforeValidateHook()],
    beforeChange: [stripIdOnUpdate, createClearOrphanedRefsBeforeChangeHook(), populatePublishedAt],
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
      validate: false, // Erlaubt leere Drafts (z. B. neues Dokument ohne Layout), damit Bearbeitungsansicht rendert
    },
    maxPerDoc: 50,
  },
}
