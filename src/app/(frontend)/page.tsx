import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Faq8 } from '@/components/ui/faq-8'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { cn } from '@/utilities/ui'
import type { SitePage } from '@/payload-types'

export const revalidate = 300

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
    revalidate: 300,
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
    const layoutBlocksForShell = resolveLayoutBlocks('home', page.layout)
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

    return (
      <article
        className={cn(isSuperheroHero && 'hero-shell--superhero')}
        style={{ ['--hero-next-section-bg' as string]: nextSectionBackground }}
      >
        <div className={cn('relative isolate z-[32]', !isSuperheroHero && 'hero-bottom-border')}>
          <SectionReveal>
            <HeroErrorBoundary>
              <RenderHero {...heroProps} pageSlug="home" />
            </HeroErrorBoundary>
          </SectionReveal>
        </div>
        <hr className="hero-content-divider" aria-hidden />
        <div
          className={cn(
            'relative w-full min-w-0 hero-following-section-mask',
            firstBlockIsServices
              ? cn(
                  'hero-following-section--services-flush z-20 mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:pt-2',
                  isSuperheroHero ? 'z-[34]' : 'lg:z-[33]',
                )
              : isSuperheroHero
                ? 'z-[34] mt-0 pt-24'
                : 'z-20 max-md:pt-8 pt-24 md:z-[31]',
          )}
        >
          <SectionReveal className="relative z-0 pt-24">
            <RenderBlocks blocks={layoutBlocksForShell} />
            <Faq8 />
          </SectionReveal>
        </div>
      </article>
    )
  } catch (err) {
    console.error('[RootPage] failed:', formatUnknownError(err))
    return (
      <article className="container page-safe-top py-16">
        <div className="prose max-w-none">
          <h1>Willkommen</h1>
          <p>Startseite konnte nicht geladen werden. Bitte spaeter erneut versuchen.</p>
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
    const page = await getCachedPublishedHomePage(1)
    return await generateMeta({ doc: page ?? null })
  } catch (err) {
    console.error('[RootPage/generateMetadata] failed:', formatUnknownError(err))
    return { title: 'Startseite' }
  }
}
