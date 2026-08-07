import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Faq8 } from '@/components/ui/faq-8'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { HomepageScrollEffects } from '@/components/HomepageScrollEffects'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { resolveSharedPortfolioContent } from '@/utilities/sharedPortfolioContent'
import { cn } from '@/utilities/ui'
import type { SitePage } from '@/payload-types'

export const revalidate = false
export const dynamic = 'force-static'

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

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`
  if (typeof error === 'string') return error
  if (error === null) return 'null'
  if (error === undefined) return 'undefined'
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

const getCachedPublishedHomePage = unstable_cache(
  async (depth: 1 | 2): Promise<SitePage | null> => {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'site-pages',
      limit: 1,
      pagination: false,
      depth,
      where: {
        and: [{ slug: { in: ['home', 'Home'] } }, { _status: { equals: 'published' } }],
      },
      draft: false,
    })

    return (pages.docs[0] as SitePage | undefined) ?? null
  },
  ['site-page-home'],
  {
    revalidate: false,
    tags: ['site-pages', 'page-home'],
  },
)

const getCachedPublishedHomePageMeta = unstable_cache(
  async (): Promise<SitePage | null> => {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'site-pages',
      limit: 1,
      pagination: false,
      depth: 0,
      select: {
        slug: true,
        parent: true,
        meta: true,
      } as const,
      where: {
        and: [{ slug: { in: ['home', 'Home'] } }, { _status: { equals: 'published' } }],
      },
      draft: false,
    })

    return (pages.docs[0] as SitePage | undefined) ?? null
  },
  ['site-page-home-meta'],
  {
    revalidate: false,
    tags: ['site-pages', 'page-home'],
  },
)

export default async function RootPage() {
  try {
    const page = await getCachedPublishedHomePage(2)

    if (!page) {
      return (
        <article className="container page-safe-top py-16">
          <div className="prose max-w-none">
            <h1>Willkommen</h1>
            <p>
              Noch keine Startseite eingerichtet. Im{' '}
              <Link href="/admin" className="underline">
                Admin
              </Link>{' '}
              eine Seite mit Slug <strong>home</strong> anlegen und veroeffentlichen.
            </p>
          </div>
        </article>
      )
    }

    const heroProps = page.hero && typeof page.hero === 'object' ? page.hero : {}
    const layoutBlocksForShell = await resolveSharedPortfolioContent(
      'home',
      resolveLayoutBlocks('home', page.layout),
    )
    const firstBlock = layoutBlocksForShell[0]
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
    const nextSectionBackground = getNextSectionBackgroundValue(firstBlockBackground)
    const isSuperheroHero =
      heroProps &&
      typeof heroProps === 'object' &&
      'type' in heroProps &&
      (heroProps as { type?: string }).type === 'superhero'

    // The "Warum mit mir" tiles need to render above the sticky hero portrait, so their
    // wrapper is lifted above it in z-index. Splitting the block list here keeps that
    // elevation scoped to whyWorkWithMe onward, instead of lifting the whole following
    // section (which used to also drag the Introduction block's maneki-neko decoration
    // above the portrait it's meant to sit behind).
    const whyWorkWithMeIndex = layoutBlocksForShell.findIndex(
      (block) =>
        block &&
        typeof block === 'object' &&
        'blockType' in block &&
        (block as { blockType?: string }).blockType === 'whyWorkWithMe',
    )
    const hasElevatedSplit = isSuperheroHero && whyWorkWithMeIndex > 0
    const earlyBlocks = hasElevatedSplit
      ? layoutBlocksForShell.slice(0, whyWorkWithMeIndex)
      : layoutBlocksForShell
    const elevatedBlocks = hasElevatedSplit ? layoutBlocksForShell.slice(whyWorkWithMeIndex) : []

    return (
      <article
        data-home-scroll-root
        className={cn(isSuperheroHero && 'hero-shell--superhero')}
        style={{ ['--hero-next-section-bg' as string]: nextSectionBackground }}
      >
        <HomepageScrollEffects />
        <div
          className={cn(
            'relative isolate',
            isSuperheroHero ? 'z-[44]' : 'z-[32]',
          )}
        >
          <SectionReveal>
            <HeroErrorBoundary>
              <RenderHero {...heroProps} pageSlug="home" />
            </HeroErrorBoundary>
          </SectionReveal>
        </div>
        <div
          className={cn(
            'relative w-full min-w-0 hero-following-section-mask',
            firstBlockIsServices
              ? cn(
                  'hero-following-section--services-flush mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:pt-2',
                  isSuperheroHero ? 'z-auto' : 'z-20 lg:z-[33]',
                )
              : isSuperheroHero
                ? 'z-auto mt-0 pt-0'
                : 'z-20 max-md:pt-8 pt-24 md:z-[31]',
          )}
        >
          <SectionReveal
            className={cn(
              'relative',
              isSuperheroHero ? 'pt-0' : 'z-0 pt-24',
              isSuperheroHero && 'hero-following-section-foreground',
            )}
          >
            <RenderBlocks
              blocks={earlyBlocks}
              totalLength={layoutBlocksForShell.length}
            />
            {!hasElevatedSplit && <Faq8 faq={page.faq} />}
          </SectionReveal>
          {hasElevatedSplit && (
            <SectionReveal className="relative hero-following-section-foreground-elevated">
              <RenderBlocks
                blocks={elevatedBlocks}
                startIndex={whyWorkWithMeIndex}
                totalLength={layoutBlocksForShell.length}
              />
              <Faq8 faq={page.faq} />
            </SectionReveal>
          )}
        </div>
      </article>
    )
  } catch (err) {
    console.error('[RootPage] failed:', formatUnknownError(err))
    return (
      <article className="container page-safe-top py-16">
        <div className="prose max-w-none">
          <h1>Willkommen</h1>
          <p>Startseite konnte nicht geladen werden. Bitte später erneut versuchen.</p>
          <p>
            <Link href="/admin" className="underline">
              Zum Admin
            </Link>
          </p>
        </div>
      </article>
    )
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getCachedPublishedHomePageMeta()
    return await generateMeta({ doc: page ?? null })
  } catch (err) {
    console.error('[RootPage/generateMetadata] failed:', formatUnknownError(err))
    return { title: 'Startseite' }
  }
}
