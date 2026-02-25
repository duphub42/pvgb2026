import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const Feature2: Block = {
  slug: 'feature2',
  interfaceName: 'Feature2Block',
  labels: {
    singular: 'Feature: Why Choose Us',
    plural: 'Feature: Why Choose Us',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        'We deliver exceptional quality and service that sets us apart. Experience the difference with our dedicated approach.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Features',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'heart',
          options: [
            { label: 'Heart', value: 'heart' },
            { label: 'Zap', value: 'zap' },
            { label: 'Clock', value: 'clock' },
            { label: 'Users', value: 'users' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'heart',
          title: 'Quality Assurance',
          description:
            'Every product in our catalog undergoes rigorous quality checks to meet the highest standards of excellence and performance.',
        },
        {
          icon: 'zap',
          title: 'Fast Service',
          description:
            'Experience lightning-fast order processing and delivery with our advanced logistics network and efficient service protocols.',
        },
        {
          icon: 'clock',
          title: 'Timely Updates',
          description:
            'Get real-time notifications and detailed tracking for all your orders, keeping you informed throughout the delivery process.',
        },
        {
          icon: 'users',
          title: 'Expert Team',
          description:
            'Our team of dedicated professionals is available 24/7 to assist you with personalized support and expert advice.',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild (rechte Spalte)',
      admin: {
        description: 'Optional. Ohne Auswahl wird ein Platzhalterbild angezeigt.',
      },
    },
  ],
}
