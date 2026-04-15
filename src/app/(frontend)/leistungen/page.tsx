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

  // Handle missing database columns gracefully
  const heroData = page?.hero || {}
  const processedHero = {
    ...heroData,
    // Provide default values for potentially missing columns
    backgroundGlow: heroData.backgroundGlow ?? true,
  }
  const heroProps = processedHero
  const isProAthleteHero =
    typeof (heroProps as { type?: unknown })?.type === 'string' &&
    (heroProps as { type?: string }).type === 'proAthlete'
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
      <div className={cn('relative isolate', isProAthleteHero ? 'z-[40]' : 'z-[32]')}>
        <HeroErrorBoundary>
          <RenderHero {...heroProps} pageSlug={pageSlug} />
        </HeroErrorBoundary>
      </div>
      <div
        className={cn(
          'relative w-full min-w-0 hero-following-section-mask',
          firstBlockIsServices
            ? isProAthleteHero
              ? 'hero-following-section--services-flush z-20 mt-0 max-lg:pt-10 md:max-lg:pt-12 lg:pt-16'
              : 'hero-following-section--services-flush z-20 mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:z-[33] lg:-mt-28 lg:pt-2'
            : isProAthleteHero
              ? 'z-20 pt-16 md:pt-20 lg:pt-24'
              : 'z-20 max-md:-mt-16 max-md:pt-8 pt-24 md:z-[31] md:-mt-16',
        )}
      >
        <RenderBlocks blocks={layoutBlocks} />
      </div>
    </article>
  )
}
