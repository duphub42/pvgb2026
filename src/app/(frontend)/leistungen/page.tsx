import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { cn } from '@/utilities/ui'
import type { SitePage } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Meine Leistungen im Überblick',
}

export default async function LeistungenPage() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload
    .find({
      collection: 'site-pages',
      where: {
        slug: { equals: 'leistungen' },
      },
    })
    .then(({ docs }) => docs[0] as SitePage | undefined)

  const heroProps = page?.hero || {}
  const pageSlug = typeof page?.slug === 'string' ? page.slug : 'leistungen'
  const layoutBlocks = resolveLayoutBlocks('leistungen', page?.layout || [])
  const firstBlock = layoutBlocks[0]
  const firstBlockIsServices =
    firstBlock &&
    typeof firstBlock === 'object' &&
    firstBlock !== null &&
    'blockType' in firstBlock &&
    (firstBlock as { blockType?: string }).blockType === 'servicesOverview'

  return (
    <article>
      <div className="relative isolate z-[32]">
        <HeroErrorBoundary>
          <RenderHero {...heroProps} pageSlug={pageSlug} />
        </HeroErrorBoundary>
      </div>
      <div
        className={cn(
          'relative w-full min-w-0 hero-following-section-mask',
          firstBlockIsServices
            ? 'hero-following-section--services-flush z-20 mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:z-[33] lg:-mt-28 lg:pt-2'
            : 'z-20 max-md:-mt-16 max-md:pt-8 pt-24 md:z-[31] md:-mt-16',
        )}
      >
        <RenderBlocks blocks={layoutBlocks} />
      </div>
    </article>
  )
}
