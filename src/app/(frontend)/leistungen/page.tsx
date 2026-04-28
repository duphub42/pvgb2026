import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { cn } from '@/utilities/ui'
import type { SitePage } from '@/payload-types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Meine Leistungen im Überblick',
}

type BlockBackground = 'none' | 'muted' | 'accent' | 'light' | 'dark'

function getNextSectionBackgroundValue(blockBackground?: string | null): string {
  const bg = (blockBackground ?? 'none') as BlockBackground
  switch (bg) {
    case 'muted':
      return 'var(--muted)'
    case 'accent':
      return 'var(--accent)'
    case 'light':
      return 'var(--theme-elevation-50)'
    case 'dark':
      return 'var(--theme-elevation-800)'
    default:
      return 'var(--background)'
  }
}

export default async function LeistungenPage() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload
    .find({
      collection: 'site-pages',
      where: {
        and: [{ slug: { in: ['leistungen', 'lei'] } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      sort: '-updatedAt',
      draft: false,
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
  const firstBlockBackground =
    firstBlock && typeof firstBlock === 'object' && firstBlock !== null && 'blockBackground' in firstBlock
      ? ((firstBlock as { blockBackground?: string | null }).blockBackground ?? 'none')
      : 'none'
  const nextSectionBackground = getNextSectionBackgroundValue(firstBlockBackground)
  const isSuperheroHero =
    heroProps &&
    typeof heroProps === 'object' &&
    'type' in heroProps &&
    (heroProps as { type?: string }).type === 'superhero'

  return (
    <article style={{ ['--hero-next-section-bg' as string]: nextSectionBackground }}>
      <div className="relative isolate z-[32]">
        <HeroErrorBoundary>
          <RenderHero {...heroProps} pageSlug={pageSlug} />
        </HeroErrorBoundary>
      </div>
      <div
        className={cn(
          'relative w-full min-w-0 hero-following-section-mask',
          firstBlockIsServices
            ? cn(
                'hero-following-section--services-flush z-20 mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:-mt-28 lg:pt-2',
                isSuperheroHero ? 'lg:z-[31]' : 'lg:z-[33]',
              )
            : 'z-20 max-md:-mt-16 max-md:pt-8 pt-24 md:z-[31] md:-mt-16',
        )}
      >
        <RenderBlocks blocks={layoutBlocks} />
      </div>
    </article>
  )
}
