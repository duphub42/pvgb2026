import type { Field } from 'payload'

export const simpleHeroFields: Field[] = [
  {
    name: 'heroType',
    type: 'text',
    defaultValue: 'simple',
    admin: {
      hidden: true,
    },
  },
  {
    name: 'label',
    type: 'text',
    label: 'Label',
    admin: {
      description: 'Kleines Label über der Überschrift (z.B. "Neues Projekt")',
    },
  },
  {
    name: 'headline',
    type: 'textarea',
    label: 'Überschrift',
    admin: {
      description: 'Hauptüberschrift. Zeilenumbrüche mit Enter für mehrzeilige Überschriften.',
    },
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Beschreibung',
    admin: {
      description: 'Kurze Beschreibung unter der Überschrift.',
    },
  },
  {
    name: 'portrait',
    type: 'relationship',
    label: 'Portrait',
    relationTo: 'media',
    admin: {
      description: 'Portrait-Bild für die rechte Spalte.',
    },
  },
  {
    name: 'backgroundGlow',
    type: 'checkbox',
    label: 'Hintergrund-Glow Effekt',
    defaultValue: true,
    admin: {
      description: 'Zeigt abstrakte Glow-Effekte im Hintergrund.',
    },
  },
  {
    name: 'links',
    type: 'array',
    label: 'CTA Buttons',
    fields: [
      {
        name: 'link',
        type: 'group',
        fields: [
          {
            name: 'type',
            type: 'select',
            label: 'Link-Typ',
            options: [
              { label: 'Interner Link', value: 'reference' },
              { label: 'Externer Link', value: 'custom' },
            ],
            defaultValue: 'reference',
          },
          {
            name: 'label',
            type: 'text',
            label: 'Button-Text',
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            label: 'URL',
            admin: {
              condition: (data) => data.type === 'custom',
            },
          },
          {
            name: 'reference',
            type: 'relationship',
            label: 'Seite',
            relationTo: 'site-pages',
            admin: {
              condition: (data) => data.type === 'reference',
            },
          },
          {
            name: 'appearance',
            type: 'select',
            label: 'Erscheinungsbild',
            options: [
              { label: 'Primär', value: 'default' },
              { label: 'Sekundär', value: 'outline' },
              { label: 'Ghost', value: 'ghost' },
            ],
            defaultValue: 'default',
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'In neuem Tab öffnen',
            defaultValue: false,
          },
        ],
      },
    ],
    admin: {
      description: 'Call-to-Action Buttons. Maximal 2 Buttons.',
    },
  },
  {
    name: 'marqueeHeadline',
    type: 'text',
    label: 'Marquee Überschrift',
    admin: {
      description: 'Überschrift für die Logo-Marquee Sektion.',
    },
  },
  {
    name: 'marqueeLogos',
    type: 'array',
    label: 'Marquee Logos',
    fields: [
      {
        name: 'logo',
        type: 'relationship',
        label: 'Logo',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'alt',
        type: 'text',
        label: 'Alt-Text',
        admin: {
          description: 'Alternativer Text für das Logo.',
        },
      },
    ],
    admin: {
      description: 'Logos für die Marquee-Animation.',
    },
  },
  {
    name: 'sectionAriaLabel',
    type: 'text',
    label: 'ARIA Label',
    admin: {
      description: 'Accessibility Label für die Hero-Sektion.',
    },
  },
]
