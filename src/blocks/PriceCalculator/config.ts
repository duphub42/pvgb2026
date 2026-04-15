import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const PriceCalculator: Block = {
  slug: 'priceCalculator',
  interfaceName: 'PriceCalculatorBlock',
  labels: {
    singular: 'Preisrechner',
    plural: 'Preisrechner',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'showRatesSection',
      type: 'checkbox',
      label: 'Sektion „Stundensatz & Tagessatz“ anzeigen',
      defaultValue: true,
    },
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Kleine Überschrift (optional)',
      admin: {
        description: 'Leer = Wert aus Global „Preisrechner“.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Hauptüberschrift (optional)',
    },
    {
      name: 'sub',
      type: 'textarea',
      label: 'Einleitung (optional)',
    },
  ],
}
