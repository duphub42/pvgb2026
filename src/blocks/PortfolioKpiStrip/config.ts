import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const PortfolioKpiStrip: Block = {
  slug: 'portfolioKpiStrip',
  dbName: 'portfolio_kpis',
  interfaceName: 'PortfolioKpiStripBlock',
  labels: {
    singular: 'Portfolio KPI Strip',
    plural: 'Portfolio KPI Strips',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'Impact in Zahlen',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Ueberschrift',
      defaultValue: 'Die wichtigsten Leistungswerte auf einen Blick',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Design-Variante',
      defaultValue: 'glass',
      options: [
        { label: 'Glass', value: 'glass' },
        { label: 'Solid', value: 'solid' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'KPIs',
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Wert',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'context',
          type: 'text',
          label: 'Kontext',
        },
        {
          name: 'trend',
          type: 'select',
          label: 'Trend',
          defaultValue: 'up',
          options: [
            { label: 'Steigend', value: 'up' },
            { label: 'Fallend', value: 'down' },
            { label: 'Neutral', value: 'neutral' },
          ],
        },
        {
          name: 'delta',
          type: 'text',
          label: 'Delta',
          admin: {
            description: 'Beispiel: +34% YoY',
          },
        },
      ],
    },
  ],
}
