/**
 * Legt Kategorien und Leistungen für den Preisrechner an (aus price-calculator-seed.json).
 * Idempotent: bricht ab, wenn bereits Kategorien existieren.
 *
 * Ausführen: pnpm run seed:price-calculator
 */
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import config from '@payload-config'
import { getPayload } from 'payload'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
dotenv.config({ path: path.join(root, '.env') })
dotenv.config({ path: path.join(root, '.env.local') })

type SeedItem = {
  categoryIndex: number
  title: string
  description: string
  pricingType: 'once' | 'monthly' | 'both'
  onceMin?: number
  onceMax?: number
  monthlyMin?: number
  monthlyMax?: number
}

type SeedFile = {
  categories: string[]
  items: SeedItem[]
}

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'price-calc-categories',
    limit: 1,
    depth: 0,
  })

  if (existing.totalDocs > 0) {
    console.info('[seed-price-calculator] Es existieren bereits Kategorien – übersprungen.')
    process.exit(0)
  }

  const raw = readFileSync(path.join(__dirname, 'price-calculator-seed.json'), 'utf8')
  const data = JSON.parse(raw) as SeedFile

  const categoryIds: number[] = []

  for (let i = 0; i < data.categories.length; i++) {
    const doc = await payload.create({
      collection: 'price-calc-categories',
      data: {
        title: data.categories[i],
        sortOrder: i * 10,
      },
      overrideAccess: true,
    })
    categoryIds.push(doc.id)
  }

  const sortByCategory: number[] = data.categories.map(() => 0)
  for (const item of data.items) {
    const categoryId = categoryIds[item.categoryIndex]
    if (categoryId == null) continue

    const order = sortByCategory[item.categoryIndex]++
    await payload.create({
      collection: 'price-calc-items',
      data: {
        category: categoryId,
        title: item.title,
        description: item.description,
        pricingType: item.pricingType,
        sortOrder: order * 10,
        onceMin: item.onceMin ?? undefined,
        onceMax: item.onceMax ?? undefined,
        monthlyMin: item.monthlyMin ?? undefined,
        monthlyMax: item.monthlyMax ?? undefined,
      },
      overrideAccess: true,
    })
  }

  console.info(
    `[seed-price-calculator] ${categoryIds.length} Kategorien, ${data.items.length} Leistungen angelegt.`,
  )
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
