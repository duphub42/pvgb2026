import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { LeistungenFaqBox } from '@/components/LeistungenFaqBox'
import { RenderHero } from '@/heros/RenderHero'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { resolveSharedPortfolioContent } from '@/utilities/sharedPortfolioContent'
import { cn } from '@/utilities/ui'
import { generateMeta } from '@/utilities/generateMeta'
import type { SitePage } from '@/payload-types'

export const revalidate = false

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
      pagination: false,
      sort: '-updatedAt',
      draft: false,
    })
    .then(({ docs }) => docs[0] as SitePage | undefined)

  const heroProps = page?.hero || {}
  const pageSlug = typeof page?.slug === 'string' ? page.slug : 'leistungen'
  const layoutBlocks = await resolveSharedPortfolioContent(
    'leistungen',
    resolveLayoutBlocks('leistungen', page?.layout || []),
  )
  const firstBlock = layoutBlocks[0]
  const firstBlockIsServices =
    firstBlock &&
    typeof firstBlock === 'object' &&
    firstBlock !== null &&
    'blockType' in firstBlock &&
    (firstBlock as { blockType?: string }).blockType === 'servicesOverview'
  const firstBlockBackground =
    firstBlock &&
    typeof firstBlock === 'object' &&
    firstBlock !== null &&
    'blockBackground' in firstBlock
      ? ((firstBlock as { blockBackground?: string | null }).blockBackground ?? 'none')
      : 'none'
  const firstCtaIndex = layoutBlocks.findIndex(
    (block) =>
      block && typeof block === 'object' && 'blockType' in block && block.blockType === 'cta',
  )
  const renderFaqAfterCta = firstCtaIndex >= 0
  const blocksBeforeAndIncludingCta = renderFaqAfterCta
    ? layoutBlocks.slice(0, firstCtaIndex + 1)
    : layoutBlocks
  const blocksAfterCta = renderFaqAfterCta ? layoutBlocks.slice(firstCtaIndex + 1) : []
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
        <RenderBlocks blocks={blocksBeforeAndIncludingCta} />
        {renderFaqAfterCta && <LeistungenFaqBox faq={page?.faq} />}
        {blocksAfterCta.length > 0 && <RenderBlocks blocks={blocksAfterCta} />}
        {!renderFaqAfterCta && <LeistungenFaqBox faq={page?.faq} />}
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const page = await payload
    .find({
      collection: 'site-pages',
      where: {
        and: [{ slug: { in: ['leistungen', 'lei'] } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      pagination: false,
      sort: '-updatedAt',
      draft: false,
      depth: 0,
      select: {
        slug: true,
        parent: true,
        meta: true,
      } as const,
    })
    .then(({ docs }) => docs[0] as SitePage | undefined)

  const meta = await generateMeta({ doc: page ?? null })

  return {
    ...meta,
    alternates: {
      ...(meta.alternates ?? {}),
      canonical: '/leistungen',
    },
    openGraph: {
      ...(meta.openGraph ?? {}),
      url: '/leistungen',
    },
  }
}
