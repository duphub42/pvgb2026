import type { Field } from 'payload'

export const pageFaqField: Field = {
  name: 'faq',
  type: 'group',
  label: 'FAQ am Seitenfuss',
  admin: {
    description:
      'Steuert die automatisch am Seitenende ausgegebene FAQ inklusive strukturierter FAQPage-Daten.',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'FAQ anzeigen',
      defaultValue: false,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Label',
      defaultValue: 'FAQ',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Ueberschrift',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Spalten / Kategorien',
      labels: {
        singular: 'Spalte',
        plural: 'Spalten',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Technischer Wert',
          admin: {
            description:
              'Kleingeschriebener eindeutiger Wert fuer Tabs, z. B. "kosten" oder "ablauf".',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Spaltenname',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'BriefcaseBusiness',
          options: [
            { label: 'Business', value: 'BriefcaseBusiness' },
            { label: 'Sicherheit', value: 'LockKeyhole' },
            { label: 'Preise', value: 'CreditCard' },
            { label: 'Support', value: 'Headphones' },
          ],
        },
        {
          name: 'faqs',
          type: 'array',
          label: 'Fragen',
          labels: {
            singular: 'Frage',
            plural: 'Fragen',
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              label: 'Frage',
              required: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              label: 'Antwort',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
