import '../src/scripts/load-env-import.ts'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'site-pages',
    limit: 20,
    depth: 2,
    overrideAccess: true,
    where: { slug: { in: ['leistungen', 'webdesign', 'marketing', 'wartung', 'printmedien-grafikdesign', 'seo-rankings'] } },
  })
  console.log('PAGE_COUNT', pages.docs.length)
  for (const p of pages.docs) {
    console.log(JSON.stringify({ id: p.id, slug: p.slug, status: p._status, parent: p.parent }, null, 2))
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
