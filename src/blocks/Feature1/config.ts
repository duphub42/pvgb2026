import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const Feature1: Block = {
  slug: 'feature1',
  interfaceName: 'Feature1Block',
  labels: {
    singular: 'Feature: Experience the Difference',
    plural: 'Feature: Experience the Difference',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Experience the Difference',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        'Discover why thousands of customers trust us for their shopping needs. We combine quality, convenience, and exceptional service.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Feature-Karten',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'sparkles',
          options: [
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Shield', value: 'shield' },
            { label: 'Truck', value: 'truck' },
            { label: 'Clock', value: 'clock' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'textarea', label: 'Beschreibung', required: true },
        { name: 'linkLabel', type: 'text', label: 'Link-Text', defaultValue: 'Learn more' },
        { name: 'linkUrl', type: 'text', label: 'Link-URL', defaultValue: '#' },
      ],
      defaultValue: [
        {
          icon: 'sparkles',
          title: 'Premium Quality',
          description: 'Handcrafted with premium materials and meticulous attention to detail.',
          linkLabel: 'Learn more',
          linkUrl: '#',
        },
        {
          icon: 'shield',
          title: 'Secure Shopping',
          description: '100% secure payment processing with end-to-end encryption.',
          linkLabel: 'Learn more',
          linkUrl: '#',
        },
        {
          icon: 'truck',
          title: 'Fast Delivery',
          description: 'Free worldwide shipping and hassle-free returns within 30 days.',
          linkLabel: 'Learn more',
          linkUrl: '#',
        },
        {
          icon: 'clock',
          title: '24/7 Support',
          description: 'Round-the-clock customer support to assist you anytime.',
          linkLabel: 'Learn more',
          linkUrl: '#',
        },
      ],
    },
    { name: 'ctaLabel', type: 'text', label: 'Button-Text (CTA unten)', defaultValue: 'Start Shopping' },
    { name: 'ctaUrl', type: 'text', label: 'Button-URL', defaultValue: '#' },
  ],
}
