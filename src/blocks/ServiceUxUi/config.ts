import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'
import { defaultLexical } from '@/fields/defaultLexical'

export const ServiceUxUi: Block = {
  slug: 'serviceUxUi',
  interfaceName: 'ServiceUxUiBlock',
  labels: {
    singular: 'Service: UX/UI Design',
    plural: 'Service: UX/UI Design',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'title',
      type: 'text',
      label: 'Titel (Hero)',
      defaultValue: 'UX/UI Design',
    },
    {
      name: 'introHeadline',
      type: 'text',
      label: 'Intro-Überschrift',
      defaultValue: 'User-Centered Design That Converts',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Intro-Text',
      defaultValue:
        "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Hauptinhalt',
      editor: defaultLexical,
      admin: {
        description:
          'Freier Textbereich für den Service-Abschnitt (Überschriften, Absätze, Listen …). Wenn leer, wird der Standardtext aus dem Code verwendet.',
      },
    },
  ],
}

