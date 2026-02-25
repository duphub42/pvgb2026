import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const FeaturesAiAccordion: Block = {
  slug: 'featAiAcc',
  interfaceName: 'FeaturesAiAccordionBlock',
  labels: {
    singular: 'Features: AI Accordion',
    plural: 'Features: AI Accordion',
  },
  // Kürzerer Tabellenname, damit Enum-/Tabellennamen unter 63 Zeichen bleiben
  dbName: 'feat_ai_acc',
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'The foundation for AI',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue:
        'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Accordion-Items',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          icon: 'database',
          title: 'Database Visualization',
          content:
            'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
        },
        {
          icon: 'fingerprint',
          title: 'Advanced Authentication',
          content:
            'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
        },
        {
          icon: 'idCard',
          title: 'Identity Management',
          content:
            'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
        },
        {
          icon: 'chart',
          title: 'Analytics Dashboard',
          content:
            'Lyra is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'database',
          options: [
            { label: 'Database', value: 'database' },
            { label: 'Fingerprint', value: 'fingerprint' },
            { label: 'ID Card', value: 'idCard' },
            { label: 'Chart / Analytics', value: 'chart' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Text',
        },
        {
          name: 'darkImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild (Dark Theme, optional)',
        },
        {
          name: 'lightImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild (Light Theme, optional)',
        },
      ],
    },
  ],
}

