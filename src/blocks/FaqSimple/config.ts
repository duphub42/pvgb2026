import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const FaqSimple: Block = {
  slug: 'faqSimple',
  interfaceName: 'FaqSimpleBlock',
  labels: {
    singular: 'FAQ: Liste',
    plural: 'FAQ: Liste',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'badge',
      type: 'text',
      label: 'Badge-Label',
      defaultValue: 'FAQ',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Common Questions & Answers',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      defaultValue:
        'Find out all the essential details about our platform and how it can serve your needs.',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Fragen & Antworten',
      minRows: 1,
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
      defaultValue: [
        {
          question: 'What is a FAQ and why is it important?',
          answer:
            'FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.',
        },
        {
          question: 'Why should I use a FAQ on my website or app?',
          answer:
            'Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers.',
        },
      ],
    },
  ],
}

