import React from 'react'
import { notFound } from 'next/navigation'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page as PageType } from '@/payload-types'

// Next.js 15: params als Promise
export default async function Page({ params: paramsPromise }: { params: Promise<{ slug?: string }> }) {
  const { slug = 'index' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const page = result.docs[0] as PageType | undefined

  if (!page) return notFound()

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {hero && <RenderHero hero={hero} />}
      {layout && <RenderBlocks blocks={layout} />}
    </article>
  )
}

// Statische Pfade für Next.js-Build
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({ collection: 'pages', limit: 1000, select: { slug: true } })

  return pages.docs.map(({ slug }) => ({ slug: slug || 'index' }))
}

// ✅ Neuer Export: generateMetadata
export async function generateMetadata({ params }: { params: { slug?: string } }) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: params.slug || 'index' } },
  })

  const page = result.docs[0] as PageType | undefined

  return {
    title: page?.title || 'Meine Seite', // Optional: dynamisch aus Payload
    description: page?.description || 'Beschreibung der Seite',
  }
}
