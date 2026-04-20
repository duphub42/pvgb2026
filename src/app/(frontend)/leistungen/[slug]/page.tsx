import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { cn } from '@/utilities/ui'
import type { SitePage } from '@/payload-types'
import { getPagePath } from '@/utilities/pagesTree'

export const revalidate = 60
const LEISTUNGEN_HUB_SLUGS = new Set(['leistungen', 'lei'])

type PageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ previewId?: string }>
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

function isLeistungenSubpage(page: SitePage | null | undefined): boolean {
  if (!page?.parent) return false
  return (
    typeof page.parent === 'object' &&
    typeof page.parent.slug === 'string' &&
    LEISTUNGEN_HUB_SLUGS.has(page.parent.slug.toLowerCase())
  )
}

async function findPublishedLeistungenSubpage(slugParam: string) {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'site-pages',
    limit: 5,
    depth: 2,
    where: {
      and: [{ slug: { equals: slugParam } }, { _status: { equals: 'published' } }],
    },
    draft: false,
  })

  return pages.docs.find(isLeistungenSubpage)
}

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const { slug = '' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const previewId = searchParams?.previewId
  const { isEnabled: isDraftMode } = await draftMode()

  let payload
  try {
    payload = await getPayload({ config: configPromise })
  } catch (err) {
    console.error('[Leistungen Unterseite] getPayload failed:', formatUnknownError(err))
    notFound()
  }

  const rawPreviewId = previewId && previewId !== 'undefined' ? String(previewId).trim() : ''
  const previewIdNum = rawPreviewId ? Number(rawPreviewId) : NaN
  const validPreviewId = rawPreviewId && Number.isFinite(previewIdNum) ? previewIdNum : null
  if (validPreviewId != null) {
    try {
      const pageById = await payload.findByID({
        collection: 'site-pages',
        id: validPreviewId,
        depth: 2,
        draft: true,
      })

      if (pageById && isLeistungenSubpage(pageById)) {
        const previewSlug = typeof pageById.slug === 'string' ? pageById.slug : ''
        const previewLayoutBlocks = resolveLayoutBlocks(previewSlug, pageById.layout)
        const previewFirstBlock = previewLayoutBlocks[0]
        const previewFirstBlockBackground =
          previewFirstBlock &&
          typeof previewFirstBlock === 'object' &&
          previewFirstBlock !== null &&
          'blockBackground' in previewFirstBlock
            ? ((previewFirstBlock as { blockBackground?: string | null }).blockBackground ?? 'none')
            : 'none'
        const previewNextSectionBackground =
          getNextSectionBackgroundValue(previewFirstBlockBackground)

        return (
          <article
            className="hero-safe-top"
            style={{ ['--hero-next-section-bg' as string]: previewNextSectionBackground }}
          >
            <HeroErrorBoundary>
              <RenderHero {...pageById.hero} pageSlug={getPagePath(pageById)} />
            </HeroErrorBoundary>
            <div className="relative z-0 pt-24">
              <RenderBlocks blocks={previewLayoutBlocks} />
            </div>
          </article>
        )
      }
    } catch {
      // previewId invalid, fall through to slug lookup
    }
  }

  const page = isDraftMode
    ? (
        await payload.find({
          collection: 'site-pages',
          limit: 1,
          depth: 2,
          where: {
            and: [{ slug: { equals: slug } }],
          },
          draft: true,
        })
      ).docs[0]
    : await findPublishedLeistungenSubpage(slug)

  if (!page || !isLeistungenSubpage(page)) {
    notFound()
  }

  const heroProps = page.hero && typeof page.hero === 'object' ? page.hero : {}
  const layoutBlocks = resolveLayoutBlocks(slug, page.layout)
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
        <SectionReveal>
          <HeroErrorBoundary>
            <RenderHero {...heroProps} pageSlug={getPagePath(page)} />
          </HeroErrorBoundary>
        </SectionReveal>
      </div>
      <div
        className={cn(
          'relative w-full min-w-0 hero-following-section-mask',
          firstBlockIsServices
            ? cn(
                'hero-following-section--services-flush z-20 mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:pt-2',
                isSuperheroHero ? 'lg:z-[31]' : 'lg:z-[33]',
              )
            : 'z-20 max-md:pt-8 pt-24 md:z-[31]',
        )}
      >
        <SectionReveal className="relative z-0 pt-24">
          <RenderBlocks blocks={layoutBlocks} />
        </SectionReveal>
      </div>
    </article>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const { slug = '' } = await params
  const payload = await getPayload({ config: configPromise })
  const page = await payload.find({
    collection: 'site-pages',
    limit: 5,
    depth: 2,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    draft: false,
  })

  return generateMeta({ doc: page.docs.find(isLeistungenSubpage) ?? null })
}
