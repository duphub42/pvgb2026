import React from 'react'
import { notFound } from 'next/navigation'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Page({ params }: { params: { slug?: string } }) {
  const { slug = 'index' } = params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = result.docs[0]

  if (!page) {
    notFound()
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderHero hero={hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
  })

  return pages.docs.map(({ slug }) => ({
    slug,
  }))
}
