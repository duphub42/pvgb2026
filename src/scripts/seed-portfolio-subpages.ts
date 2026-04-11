import './load-env-import'
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  getPortfolioPresetPages,
  isPlaceholderLayout,
} from '../collections/Pages/portfolioPresets'

const log = (message: string): void => {
  process.stderr.write(`${message}\n`)
}

const withTimeout = async <T>(
  promise: Promise<T>,
  ms: number,
  message: string,
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms)
    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })

async function main() {
  const args = new Set(process.argv.slice(2))
  const overwrite = args.has('--overwrite')
  const dryRun = args.has('--dry-run')

  log('init payload...')
  const payload = await withTimeout(
    getPayload({ config }),
    20_000,
    'getPayload timeout after 20s. Bitte DATABASE_URL/POSTGRES_URL, DB-Erreichbarkeit und PAYLOAD_SECRET pruefen.',
  )
  log('payload ready')
  const now = new Date().toISOString()
  const templates = getPortfolioPresetPages()

  let created = 0
  let updated = 0
  let skipped = 0

  for (const template of templates) {
    const existing = await payload.find({
      collection: 'site-pages',
      limit: 1,
      depth: 0,
      overrideAccess: true,
      where: {
        slug: {
          equals: template.slug,
        },
      },
    })

    const page = existing.docs[0]
    const data: Record<string, unknown> = {
      title: template.title,
      slug: template.slug,
      portfolioType: template.portfolioType,
      hero: template.hero,
      layout: template.layout,
      meta: {
        title: template.metaTitle,
        description: template.metaDescription,
      },
      _status: 'published',
      publishedAt: now,
    }

    if (!page) {
      if (dryRun) {
        log(`[dry-run] create: ${template.slug}`)
      } else {
        await payload.create({
          collection: 'site-pages',
          data,
          overrideAccess: true,
          depth: 0,
          context: { skipRevalidate: true },
        } as never)
        log(`create: ${template.slug}`)
      }
      created += 1
      continue
    }

    const placeholder = isPlaceholderLayout(page.layout)
    if (!overwrite && !placeholder) {
      log(`skip (existing content): ${template.slug}`)
      skipped += 1
      continue
    }

    if (dryRun) {
      log(`[dry-run] update: ${template.slug}${placeholder ? ' (placeholder)' : ''}`)
    } else {
      await payload.update({
        collection: 'site-pages',
        id: page.id,
        data,
        overrideAccess: true,
        depth: 0,
        context: { skipRevalidate: true },
      } as never)
      log(`update: ${template.slug}${placeholder ? ' (placeholder)' : ''}`)
    }
    updated += 1
  }

  log('')
  log(`done: created=${created}, updated=${updated}, skipped=${skipped}, dryRun=${dryRun}`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
