import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidatePriceCalculatorData } from '../../utilities/revalidatePriceCalculatorData'

const afterChange: CollectionAfterChangeHook = ({ req: { context } }) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    revalidatePriceCalculatorData()
  }
}

const afterDelete: CollectionAfterDeleteHook = ({ req: { context } }) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    revalidatePriceCalculatorData()
  }
}

export const PriceCalculatorItems: CollectionConfig = {
  slug: 'price-calc-items',
  labels: {
    singular: 'Preisrechner-Leistung',
    plural: 'Preisrechner-Leistungen',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'pricingType', 'sortOrder', 'updatedAt'],
    group: 'Preisrechner',
    description: 'Einzelne Leistungen mit Preisspannen (einmalig und/oder monatlich).',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'price-calc-categories',
      required: true,
      label: 'Kategorie',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Beschreibung',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sortierung (in Kategorie)',
      defaultValue: 0,
    },
    {
      name: 'pricingType',
      type: 'select',
      required: true,
      label: 'Preistyp',
      defaultValue: 'once',
      options: [
        { label: 'Nur einmalig', value: 'once' },
        { label: 'Nur monatlich', value: 'monthly' },
        { label: 'Einmalig & monatlich', value: 'both' },
      ],
    },
    {
      name: 'onceMin',
      type: 'number',
      label: 'Einmalig · Min (€ netto)',
      admin: {
        condition: (data) =>
          data?.pricingType === 'once' || data?.pricingType === 'both',
      },
    },
    {
      name: 'onceMax',
      type: 'number',
      label: 'Einmalig · Max (€ netto)',
      admin: {
        condition: (data) =>
          data?.pricingType === 'once' || data?.pricingType === 'both',
      },
    },
    {
      name: 'monthlyMin',
      type: 'number',
      label: 'Monatlich · Min (€ netto)',
      admin: {
        condition: (data) =>
          data?.pricingType === 'monthly' || data?.pricingType === 'both',
      },
    },
    {
      name: 'monthlyMax',
      type: 'number',
      label: 'Monatlich · Max (€ netto)',
      admin: {
        condition: (data) =>
          data?.pricingType === 'monthly' || data?.pricingType === 'both',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const t = data?.pricingType
        if (t === 'once' || t === 'both') {
          if (data?.onceMin == null || data?.onceMax == null) {
            throw new APIError('Bei einmaligen Preisen sind Min- und Max-Betrag erforderlich.', 400)
          }
          if (Number(data.onceMin) > Number(data.onceMax)) {
            throw new APIError('Einmalig: Min darf nicht größer als Max sein.', 400)
          }
        }
        if (t === 'monthly' || t === 'both') {
          if (data?.monthlyMin == null || data?.monthlyMax == null) {
            throw new APIError('Bei monatlichen Preisen sind Min- und Max-Betrag erforderlich.', 400)
          }
          if (Number(data.monthlyMin) > Number(data.monthlyMax)) {
            throw new APIError('Monatlich: Min darf nicht größer als Max sein.', 400)
          }
        }
        return data
      },
    ],
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
}
