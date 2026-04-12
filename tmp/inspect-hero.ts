import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function main() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'site-pages',
    depth: 2,
    limit: 1,
    where: { slug: { equals: 'kontakt' } },
    draft: false,
  })
  console.log(JSON.stringify(pages.docs[0]?.hero, null, 2))
}

main().catch((err) => { console.error(err); process.exit(1) })
