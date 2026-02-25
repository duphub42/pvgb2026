import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const SerpContent: Block = {
  slug: 'serpContent',
  interfaceName: 'SerpContentBlock',
  labels: {
    singular: 'Content 1 (SERP)',
    plural: 'Content 1 (SERP)',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Free Plan',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'A Workflow Revolution',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        "Transform your team's productivity with our intuitive platform. Seamlessly integrate tasks, communication, and project tracking in one powerful solution.",
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Unterüberschrift',
      defaultValue: 'Flexibility at Your Fingertips',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Unterüberschrift Beschreibung',
      defaultValue:
        "Whether you're a startup or an enterprise, our scalable solution grows with you. Customize workflows, integrate with your favorite tools, and automate repetitive tasks.",
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Bullet Points',
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          label: 'Instant Updates.',
          description:
            'Changes sync across all devices in real-time, ensuring your team always has the latest information at their fingertips.',
        },
        {
          label: 'Robust Security.',
          description:
            'Your data is protected with enterprise-grade encryption and customizable access controls, giving you peace of mind.',
        },
        {
          label: 'Intelligent Insights.',
          description:
            'Our analytics engine provides actionable data on team performance, helping you optimize workflows and boost productivity.',
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Titel',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'cardTitle',
      type: 'text',
      label: 'Karten-Titel (rechts)',
      defaultValue: 'Revolutionize your workflow',
    },
    {
      name: 'cardSubtitle',
      type: 'text',
      label: 'Karten-Untertitel',
      defaultValue: 'Professional headshot portrait',
    },
    {
      name: 'cardBadge',
      type: 'text',
      label: 'Karten-Badge',
      defaultValue: '20+ expert services at your fingertips',
    },
    {
      name: 'statPrimaryLabel',
      type: 'text',
      label: 'Erste Kennzahl: Label',
      defaultValue: 'Teams onboarded',
    },
    {
      name: 'statPrimaryValue',
      type: 'text',
      label: 'Erste Kennzahl: Wert',
      defaultValue: '500+',
    },
    {
      name: 'statSecondaryLabel',
      type: 'text',
      label: 'Zweite Kennzahl: Label',
      defaultValue: 'Average productivity gain',
    },
    {
      name: 'statSecondaryValue',
      type: 'text',
      label: 'Zweite Kennzahl: Wert',
      defaultValue: '35%',
    },
  ],
}

