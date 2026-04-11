console.log('SCRIPT START')
process.stdin.resume()
console.log('KEEPALIVE')
import '../src/scripts/load-env-import.ts'
import { getPayload } from 'payload'
import config from '@payload-config'

const servicePages = [
  {
    slug: 'webdesign',
    title: 'Webdesign',
    hero: {
      type: 'lowImpact',
      headline: 'Webdesign für hochwertige Markenauftritte',
      description: 'Moderne, minimalistische Websites mit klarer Struktur, Performance und technischer Zuverlässigkeit.',
    },
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    hero: {
      type: 'lowImpact',
      headline: 'Marketing mit klarem Fokus auf Sichtbarkeit und Leads',
      description: 'Strategie, Kampagnen und Tracking für messbare digitale Reichweite.',
    },
  },
  {
    slug: 'wartung',
    title: 'Wartung',
    hero: {
      type: 'lowImpact',
      headline: 'Wartung und Support für langfristig stabile Websites',
      description: 'Sicherheitsupdates, Monitoring und kontinuierliche Pflege für sorgenfreien Betrieb.',
    },
  },
]

async function main() {
  const payload = await getPayload({ config })
  const parentPage = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'leistungen' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (!parentPage.docs[0]) {
    throw new Error('Parent page leistungen not found')
  }

  const parentId = parentPage.docs[0].id

  for (const page of servicePages) {
    const existing = await payload.find({
      collection: 'site-pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.docs[0]) {
      console.log('skip existing:', page.slug)
      continue
    }

    await payload.create({
      collection: 'site-pages',
      data: {
        title: page.title,
        slug: page.slug,
        parent: parentId,
        _status: 'published',
        hero: page.hero,
      },
      overrideAccess: true,
      depth: 0,
    })
    console.log('created:', page.slug)
  }
}

;(async () => {
  try {
    await main()
    console.log('done')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
