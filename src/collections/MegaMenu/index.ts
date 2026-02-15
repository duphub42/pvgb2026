import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const MegaMenu: CollectionConfig = {
  slug: 'mega-menu',
  labels: { singular: 'MegaMenu Item', plural: 'MegaMenu Items' },
  admin: {
    defaultColumns: ['label', 'url', 'order'],
    useAsTitle: 'label',
    group: 'Navigation',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [() => revalidateTag('mega-menu')],
    afterDelete: [() => revalidateTag('mega-menu')],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL',
      admin: { description: 'z. B. /leistungen oder https://...' },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Reihenfolge',
      admin: { description: 'Sortierung (Drag & Drop im Listen-View).' },
    },
    {
      name: 'subItems',
      type: 'array',
      label: 'Submenu-Einträge',
      minRows: 0,
      admin: { description: 'Einfache Liste unter dem Haupt-Label.' },
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: { description: 'Optionales Icon (Media).' },
        },
        { name: 'badge', type: 'text', label: 'Badge' },
        { name: 'description', type: 'textarea', label: 'Beschreibung' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Spalten (Mega-Dropdown)',
      minRows: 0,
      admin: { description: 'Mehrspaltiges Dropdown mit optionalem Spaltentitel.' },
      fields: [
        { name: 'title', type: 'text', label: 'Spaltentitel' },
        {
          name: 'items',
          type: 'array',
          label: 'Einträge',
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Label' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Icon',
            },
            { name: 'badge', type: 'text', label: 'Badge' },
          ],
        },
      ],
    },
    {
      name: 'highlight',
      type: 'group',
      label: 'Highlight-Block',
      admin: { description: 'Optionaler hervorgehobener Block im Dropdown (z. B. CTA).' },
      fields: [
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'description', type: 'textarea', label: 'Beschreibung' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild',
        },
        { name: 'ctaLabel', type: 'text', label: 'Button-Text' },
        { name: 'ctaUrl', type: 'text', label: 'Button-URL' },
      ],
    },
  ],
}
