import './load-env-import'

import config from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

import { datenschutz } from '@/endpoints/seed/datenschutz-page'

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'datenschutz' } },
    depth: 0,
    limit: 10,
    overrideAccess: true,
  })

  const data = datenschutz as unknown as RequiredDataFromCollectionSlug<'site-pages'>

  if (existing.docs.length === 0) {
    const created = await payload.create({
      collection: 'site-pages',
      data,
      overrideAccess: true,
    })

    console.log(`Created Datenschutz page ${created.id}`)
    return
  }

  const [primary, ...duplicates] = existing.docs

  await payload.update({
    collection: 'site-pages',
    id: primary.id,
    data,
    overrideAccess: true,
  })

  console.log(`Updated Datenschutz page ${primary.id}`)

  if (duplicates.length > 0) {
    console.log(`Found ${duplicates.length} duplicate Datenschutz page(s); left unchanged.`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
