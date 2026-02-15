import React from 'react'
import { notFound } from 'next/navigation'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page as PageType } from '@/payload-types'

// Next.js 15 erwartet, dass params ein Promise ist
export default async function Page({ params: paramsPromise }: { params: Promise<{ slug?: string }> }) {
  const { slug = 'index' } = await paramsPromise
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

  const page = result.docs[0] as PageType | undefined

  if (!page) {
    return notFound()
  }

  // Wir extrahieren hero und layout. 
  // Da RenderHero "hero={hero}" erwartet, übergeben wir es genau so.
  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* Falls 'hero' in PageType optional ist, stellen wir sicher, 
          dass RenderHero damit umgehen kann oder prüfen es hier.
      */}
      <RenderHero hero={hero} />
      
      {/* Layout-Blöcke rendern */}
      {layout && <RenderBlocks blocks={layout} />}
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    // Wir brauchen nur den Slug für die Pfad-Generierung
    select: {
      slug: true,
    },
  })

  return pages.docs.map(({ slug }) => {
    if (!slug) return { slug: 'index' }
    return { slug }
  })
}
