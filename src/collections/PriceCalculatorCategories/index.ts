import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'

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

export const PriceCalculatorCategories: CollectionConfig = {
  slug: 'price-calc-categories',
  labels: {
    singular: 'Preisrechner-Kategorie',
    plural: 'Preisrechner-Kategorien',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'updatedAt'],
    group: 'Preisrechner',
    description: 'Kategorien für den Preisrechner (z. B. Website & Webdesign, SEO).',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 0,
      admin: {
        description: 'Niedrigere Zahlen erscheinen zuerst.',
      },
    },
  ],
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
}
