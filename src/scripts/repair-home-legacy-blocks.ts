import './load-env-import'

import { getPayload } from 'payload'
import config from '@payload-config'

import { getPortfolioPresetLayout } from '@/collections/Pages/portfolioPresets'
import type { SitePage } from '@/payload-types'

type LayoutBlock = Record<string, unknown> & { blockType?: string }

const LEGACY_HOME_BLOCK_TYPES = new Set(['serpContent', 'lyraContent', 'lyraFeature', 'featuresGrid'])

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

function getBlockType(block: unknown): string {
  if (!block || typeof block !== 'object') return ''
  const value = (block as { blockType?: unknown }).blockType
  return typeof value === 'string' ? value : ''
}

function pickPresetBlock(blockType: string): LayoutBlock {
  const marketingPresetLayout = getPortfolioPresetLayout('marketing') as LayoutBlock[]
  const found = marketingPresetLayout.find((block) => getBlockType(block) === blockType)
  if (!found) {
    throw new Error(`Preset block "${blockType}" not found.`)
  }
  return clone(found)
}

async function main() {
  const payload = await getPayload({ config })

  const pageQuery = await payload.find({
    collection: 'site-pages',
    limit: 1,
    pagination: false,
    depth: 2,
    where: {
      slug: { equals: 'home' },
    },
    overrideAccess: true,
  })

  const page = pageQuery.docs[0] as SitePage | undefined
  if (!page) throw new Error('No home page found.')

  const currentLayout = (Array.isArray(page.layout) ? page.layout : []) as LayoutBlock[]
  const filteredLayout = currentLayout.filter(
    (block) => !LEGACY_HOME_BLOCK_TYPES.has(getBlockType(block)),
  ) as LayoutBlock[]

  const hasType = (type: string): boolean => filteredLayout.some((block) => getBlockType(block) === type)

  if (!hasType('portfolioCaseGrid')) {
    filteredLayout.push(pickPresetBlock('portfolioCaseGrid'))
  }
  if (!hasType('portfolioKpiStrip')) {
    filteredLayout.push(pickPresetBlock('portfolioKpiStrip'))
  }
  if (!hasType('calPopup')) {
    filteredLayout.push(pickPresetBlock('calPopup'))
  }

  await payload.update({
    collection: 'site-pages',
    id: page.id,
    data: {
      layout: filteredLayout as SitePage['layout'],
      _status: 'published',
    },
    draft: false,
    depth: 0,
    overrideAccess: true,
  })

  const types = filteredLayout.map((block) => getBlockType(block)).filter(Boolean)
  console.log(`Updated home layout: ${types.length} blocks`)
  console.log(types.join(' -> '))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
