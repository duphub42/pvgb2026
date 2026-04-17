import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'CTA (Primary)',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['site-pages', 'blog-posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  linkResult.fields.push({
    type: 'row',
    fields: [
      {
        name: 'icon',
        type: 'text',
        label: 'Icon (optional)',
        admin: {
          description: 'Lucide icon name (z. B. ArrowRight, Mail, Phone, ChevronRight).',
          width: '50%',
        },
      },
      {
        name: 'enableIconSwap',
        type: 'checkbox',
        label: 'Icon-Swap aktivieren',
        admin: {
          description: 'Wechselt beim Hover von Icon A zu Icon B.',
          width: '50%',
        },
        defaultValue: false,
      },
    ],
  })

  linkResult.fields.push({
    type: 'row',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableIconSwap),
    },
    fields: [
      {
        name: 'iconSwapFrom',
        type: 'text',
        label: 'Swap Icon A (Default)',
        admin: {
          description: 'Icon vor Hover. Leer = Icon-Feld, sonst ChevronRight.',
          width: '50%',
        },
      },
      {
        name: 'iconSwapTo',
        type: 'text',
        label: 'Swap Icon B (Hover)',
        admin: {
          description: 'Icon bei Hover. Leer = ArrowUpRight.',
          width: '50%',
        },
      },
    ],
  })

  return deepMerge(linkResult, overrides)
}
