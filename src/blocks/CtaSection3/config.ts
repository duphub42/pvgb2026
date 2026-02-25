import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const CtaSection3: Block = {
  slug: 'ctaSection3',
  interfaceName: 'CtaSection3Block',
  labels: {
    singular: 'CTA Section 3',
    plural: 'CTA Section 3',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'badgeIcon',
      type: 'select',
      label: 'Badge-Icon',
      defaultValue: 'rocket',
      options: [
        { label: 'Rocket', value: 'rocket' },
        { label: 'Zap', value: 'zap' },
        { label: 'BookOpen', value: 'bookOpen' },
        { label: 'PlayCircle', value: 'playCircle' },
      ],
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge-Text',
      defaultValue: 'Launch Your Success',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Accelerate your digital transformation journey',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        'Join thousands of innovative companies using our cutting-edge platform to automate workflows, boost team productivity, and deliver exceptional results faster than ever before.',
    },
    {
      name: 'primaryButtonIcon',
      type: 'select',
      label: 'Primärer Button: Icon',
      defaultValue: 'zap',
      options: [
        { label: 'Keins', value: 'none' },
        { label: 'Zap', value: 'zap' },
        { label: 'Rocket', value: 'rocket' },
        { label: 'ArrowRight', value: 'arrowRight' },
      ],
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      label: 'Primärer Button: Text',
      defaultValue: 'Start Free Trial',
    },
    {
      name: 'primaryButtonHref',
      type: 'text',
      label: 'Primärer Button: URL',
      defaultValue: '#',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
      label: 'Sekundärer Button: Text',
      defaultValue: 'Watch Demo',
    },
    {
      name: 'secondaryButtonHref',
      type: 'text',
      label: 'Sekundärer Button: URL',
      defaultValue: '#',
    },
    {
      name: 'rightCards',
      type: 'array',
      label: 'Karten rechts (z. B. Documentation, Video Tutorials)',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'bookOpen',
          options: [
            { label: 'BookOpen', value: 'bookOpen' },
            { label: 'PlayCircle', value: 'playCircle' },
            { label: 'Rocket', value: 'rocket' },
            { label: 'Zap', value: 'zap' },
          ],
        },
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'description', type: 'textarea', label: 'Beschreibung', required: true },
        { name: 'href', type: 'text', label: 'Link-URL', defaultValue: '#' },
      ],
      defaultValue: [
        {
          icon: 'bookOpen',
          title: 'Documentation',
          description:
            'Complete guides, API references, and best practices to get you started.',
          href: '#',
        },
        {
          icon: 'playCircle',
          title: 'Video Tutorials',
          description:
            'Step-by-step video guides to help you master the platform quickly.',
          href: '#',
        },
      ],
    },
  ],
}
