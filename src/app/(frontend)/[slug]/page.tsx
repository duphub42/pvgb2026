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

type PageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ previewId?: string }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const { slug = 'home' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const previewId = searchParams?.previewId
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  // Admin preview: load by document ID so preview works even when draft cookie isn't sent in iframe
  const validPreviewId = previewId && previewId !== 'undefined' && String(previewId).trim()
  if (validPreviewId) {
    try {
      const pageById = await payload.findByID({
        collection: 'pages',
        id: validPreviewId,
        depth: 2,
        draft: true,
      })
      if (pageById) {
        return (
          <article>
            <RenderHero {...pageById.hero} />
            <RenderBlocks blocks={pageById.layout} />
          </article>
        )
      }
    } catch {
      // Invalid or missing id, fall through to slug lookup
    }
  }

  const resolvedSlug = slug || 'home'

  let pages = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 2,
    where: {
      and: [
        { slug: { equals: resolvedSlug } },
        ...(isDraftMode ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    draft: isDraftMode,
  })

  // Fallback: homepage by common slugs (home, Home, or e.g. "h" if set that way)
  if (pages.docs.length === 0 && (resolvedSlug === 'home' || !resolvedSlug) && !isDraftMode) {
    pages = await payload.find({
      collection: 'pages',
      limit: 1,
      depth: 2,
      where: {
        and: [
          { slug: { in: ['home', 'Home', 'h'] } },
          { _status: { equals: 'published' } },
        ],
      },
    })
  }

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
  const { slug: slugParam = 'home' } = await params
  const slug = slugParam || 'home'
  const payload = await getPayload({ config: configPromise })
  let pages = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
  })
  if (pages.docs.length === 0 && (slug === 'home' || !slug)) {
    pages = await payload.find({
      collection: 'pages',
      limit: 1,
      depth: 1,
      where: {
        and: [
          { slug: { in: ['home', 'Home', 'h'] } },
          { _status: { equals: 'published' } },
        ],
      },
    })
  }
  return generateMeta({ doc: pages.docs[0] })
}
