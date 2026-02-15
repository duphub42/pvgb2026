import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

// Always render on demand so new/updated pages are found (no cached 404)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({ params: paramsPromise }: { params: Promise<{ slug?: string }> }) {
  const { slug = 'home' } = await paramsPromise
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(isDraftMode ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    draft: isDraftMode,
  })

  const page = pages.docs[0]
  if (!page) notFound()

  return (
    <article>
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }): Promise<Metadata> {
  const { slug = 'home' } = await params
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
  })
  return generateMeta({ doc: pages.docs[0] })
}
