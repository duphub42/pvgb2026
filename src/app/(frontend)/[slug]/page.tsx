import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
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

// ISR: Published pages cached 60s (besserer TTFB). Draft/Preview bleibt dynamisch durch draftMode().
export const revalidate = 60

type PageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ previewId?: string }>
}

function isHomePageSlug(slug?: string | null): boolean {
  if (!slug) return true
  return slug.trim().toLowerCase() === 'home'
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

async function findPublishedPageBySlug(slugParam: string, depth: 1 | 2) {
  const p = await getPayload({ config: configPromise })
  let pages = await p.find({
    collection: 'site-pages',
    limit: 1,
    depth,
    where: {
      and: [{ slug: { equals: slugParam } }, { _status: { equals: 'published' } }],
    },
    draft: false,
  })

  if (pages.docs.length === 0 && (slugParam === 'home' || !slugParam)) {
    pages = await p.find({
      collection: 'site-pages',
      limit: 1,
      depth,
      where: {
        and: [{ slug: { in: ['home', 'Home'] } }, { _status: { equals: 'published' } }],
      },
      draft: false,
    })
  }

  return pages
}

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const { slug = 'home' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const previewId = searchParams?.previewId
  const { isEnabled: isDraftMode } = await draftMode()

  let payload
  try {
    payload = await getPayload({ config: configPromise })
  } catch (err) {
    console.error('[Page] getPayload failed:', formatUnknownError(err))
    return (
      <article className="container page-safe-top py-16">
        <div className="prose max-w-none">
          <h1>{slug === 'home' || !slug ? 'Willkommen' : 'Seite'}</h1>
          <p>
            Die Datenbank ist gerade nicht erreichbar. Bitte später erneut versuchen oder Admin
            prüfen.
          </p>
          <p>
            <a href="/admin" className="underline">
              Zum Admin
            </a>
          </p>
        </div>
      </article>
    )
  }

  // Admin preview: load by document ID so preview works even when draft cookie isn't sent in iframe
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
      if (pageById) {
        const previewSlug = typeof pageById.slug === 'string' ? pageById.slug : ''
        const previewLayoutBlocks = resolveLayoutBlocks(previewSlug, pageById.layout)

        return (
          <article className="hero-safe-top">
            <RenderHero {...pageById.hero} pageSlug={previewSlug} />
            <div className="relative z-0 pt-24">
              <RenderBlocks blocks={previewLayoutBlocks} />
              {isHomePageSlug(previewSlug) && <Faq8 />}
            </div>
          </article>
        )
      }
    } catch {
      // Invalid or missing id, fall through to slug lookup
    }
  }

  const resolvedSlug = slug || 'home'

  try {
    let pages: { docs: SitePage[] }

    if (isDraftMode) {
      pages = await payload.find({
        collection: 'site-pages',
        limit: 1,
        depth: 2,
        where: {
          and: [{ slug: { equals: resolvedSlug } }],
        },
        draft: true,
      })
    } else {
      pages = await findPublishedPageBySlug(resolvedSlug, 2)
    }

    const page = pages.docs[0]
    if (!page) {
      // Startseite: Fallback anzeigen statt 404, damit localhost nicht leer wirkt
      if (resolvedSlug === 'home' || !resolvedSlug) {
        return (
          <article className="container page-safe-top py-16">
            <div className="prose max-w-none">
              <h1>Willkommen</h1>
              <p>
                Noch keine Startseite eingerichtet. Im{' '}
                <a href="/admin" className="underline">
                  Admin
                </a>{' '}
                eine Seite mit Slug <strong>home</strong> anlegen und veröffentlichen.
              </p>
            </div>
          </article>
        )
      }
      notFound()
    }

    const heroProps = page.hero && typeof page.hero === 'object' ? page.hero : {}
    const isProAthleteHero =
      typeof (heroProps as { type?: unknown })?.type === 'string' &&
      (heroProps as { type?: string }).type === 'proAthlete'
    const layoutBlocks = resolveLayoutBlocks(resolvedSlug, page.layout)
    const showHomeFaq = isHomePageSlug(resolvedSlug)
    const firstBlock = layoutBlocks[0]
    const firstBlockIsServices =
      firstBlock &&
      typeof firstBlock === 'object' &&
      firstBlock !== null &&
      'blockType' in firstBlock &&
      (firstBlock as { blockType?: string }).blockType === 'servicesOverview'

    return (
      <article>
        {/*
          Hero z-32. Standard-Folgesection z-31, damit Mask nicht über Hero-Popout liegt.
          servicesOverview: Unter lg (Umbruch 1–2 Spalten) z-20 + kein Negativ-Margin — Karten liegen unter dem Hero.
          Ab lg (4 Spalten): z-33 + Flush — Karten dürfen in den Hero ragen / Hover darüber (s. globals services-flush).
        */}
        <div className={cn('relative isolate', isProAthleteHero ? 'z-[40]' : 'z-[32]')}>
          <SectionReveal>
            <HeroErrorBoundary>
              <RenderHero {...heroProps} pageSlug={resolvedSlug} />
            </HeroErrorBoundary>
          </SectionReveal>
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
          <SectionReveal className="relative z-0 pt-24">
            <RenderBlocks blocks={layoutBlocks} />
            {showHomeFaq && <Faq8 />}
          </SectionReveal>
        </div>
      </article>
    )
  } catch (err) {
    const e = err as Error & { digest?: string; cause?: Error }
    const isNotFound =
      e?.digest === 'NEXT_NOT_FOUND' ||
      (typeof e?.message === 'string' && e.message.includes('NEXT_HTTP_ERROR_FALLBACK;404'))
    if (isNotFound) {
      throw err
    }
    const causeMsg = e?.cause instanceof Error ? e.cause.message : String(e?.cause ?? '')
    const fullMsg = [e?.message, causeMsg].filter(Boolean).join(' — ')
    if (process.env.NODE_ENV === 'development') {
      console.error('[Page] find/render failed:', fullMsg || formatUnknownError(err), e?.stack)
    }
    return (
      <article className="container page-safe-top py-16">
        <div className="prose max-w-none">
          <h1>{resolvedSlug === 'home' || !resolvedSlug ? 'Willkommen' : 'Seite'}</h1>
          <p>Seite konnte nicht geladen werden. Bitte später erneut versuchen oder Admin prüfen.</p>
          {process.env.NODE_ENV === 'development' && fullMsg && (
            <pre className="mt-4 p-4 bg-[var(--muted)] rounded text-sm overflow-auto">
              {fullMsg}
            </pre>
          )}
          <p>
            <a href="/admin" className="underline">
              Zum Admin
            </a>
          </p>
        </div>
      </article>
    )
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const { slug: slugParam = 'home' } = await params
  const slug = slugParam || 'home'
  try {
    const pages = await findPublishedPageBySlug(slug, 1)
    const meta = await generateMeta({ doc: pages.docs[0] })

    return meta
  } catch (err) {
    const e = err as Error & { cause?: Error }
    const causeMsg = e?.cause instanceof Error ? e.cause.message : String(e?.cause ?? '')
    console.error(
      '[generateMetadata] site-pages find failed:',
      e?.message || formatUnknownError(err),
      causeMsg ? `cause: ${causeMsg}` : '',
    )
    return { title: 'Seite' }
  }
}
