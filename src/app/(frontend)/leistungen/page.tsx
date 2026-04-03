import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Meine Leistungen im Überblick',
}

export default async function LeistungenPage() {
  console.log('[LeistungenPage] render start')
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'leistungen' } },
    limit: 1,
    depth: 2,
    draft: false,
  })

  const page = pages.docs[0]

  if (!page) {
    return (
      <main className="container py-20">
        <div className="prose mx-auto">
          <h1>Leistungen</h1>
          <p>Die Seite wurde noch nicht angelegt oder veröffentlicht.</p>
        </div>
      </main>
    )
  }

  const layout = Array.isArray(page.layout) ? page.layout : []

  return (
    <main>
      <RenderBlocks blocks={layout} />
    </main>
  )
}
