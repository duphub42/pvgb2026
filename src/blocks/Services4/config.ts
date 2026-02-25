import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const Services4: Block = {
  slug: 'services4',
  interfaceName: 'Services4Block',
  labels: {
    singular: 'Services (2x2 Grid)',
    plural: 'Services (2x2 Grid)',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      defaultValue: 'Services',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Untertitel',
      defaultValue:
        'We craft digital experiences that captivate and convert, bringing your vision to life.',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 1,
      maxRows: 8,
      defaultValue: [
        {
          icon: 'cog',
          title: 'Product Strategy',
          description:
            'Strategic planning and market positioning to ensure your product meets user needs and business goals.',
          items: ['Market Research', 'User Personas', 'Competitive Analysis'],
        },
        {
          icon: 'penTool',
          title: 'Design',
          description:
            'Beautiful, user-centered designs that create engaging experiences across all platforms.',
          items: ['UI/UX Design', 'Prototyping', 'Interaction Design'],
        },
        {
          icon: 'code',
          title: 'Web Development',
          description:
            'Modern, scalable web applications built with the latest technologies and best practices.',
          items: ['Frontend Dev', 'Backend Dev', 'API Integration'],
        },
        {
          icon: 'shrub',
          title: 'Marketing',
          description:
            'Data-driven strategies to launch successfully and scale your product efficiently.',
          items: ['SEO Strategy', 'Analytics & Data', 'A/B Testing'],
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          defaultValue: 'cog',
          options: [
            { label: 'Cog', value: 'cog' },
            { label: 'Pen Tool', value: 'penTool' },
            { label: 'Code', value: 'code' },
            { label: 'Shrub', value: 'shrub' },
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
        },
        {
          name: 'items',
          type: 'array',
          label: 'Bullet Points',
          minRows: 0,
          maxRows: 6,
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

