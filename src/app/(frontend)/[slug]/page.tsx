import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

// ISR: Published pages cached 60s (besserer TTFB). Draft/Preview bleibt dynamisch durch draftMode().
export const revalidate = 60

type PageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ previewId?: string }>
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

const getCachedPublishedPageDepth2 = unstable_cache(
  async (slugParam: string) => findPublishedPageBySlug(slugParam, 2),
  ['site-pages', 'published', 'depth-2'],
  { revalidate: 60, tags: ['site-pages'] },
)

const getCachedPublishedPageDepth1 = unstable_cache(
  async (slugParam: string) => findPublishedPageBySlug(slugParam, 1),
  ['site-pages', 'published', 'depth-1'],
  { revalidate: 60, tags: ['site-pages'] },
)

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
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
      <article className="container py-16">
        <div className="prose max-w-none">
          <h1>{slug === 'home' || !slug ? 'Willkommen' : 'Seite'}</h1>
          <p>Die Datenbank ist gerade nicht erreichbar. Bitte später erneut versuchen oder Admin prüfen.</p>
          <p>
            <a href="/admin" className="underline">Zum Admin</a>
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
        return (
          <article>
            <RenderHero {...pageById.hero} />
            <div className="relative z-0 pt-24">
              <RenderBlocks blocks={Array.isArray(pageById.layout) ? pageById.layout : []} />
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
    let pages: Awaited<ReturnType<typeof payload.find>>

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
      pages = await getCachedPublishedPageDepth2(resolvedSlug)
    }

    const page = pages.docs[0]
    if (!page) {
      // Startseite: Fallback anzeigen statt 404, damit localhost nicht leer wirkt
      if (resolvedSlug === 'home' || !resolvedSlug) {
        return (
          <article className="container py-16">
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
    return (
      <article>
        <HeroErrorBoundary>
          <RenderHero {...heroProps} />
        </HeroErrorBoundary>
        <div className="relative z-20 md:z-[31] pt-24 md:-mt-16 hero-following-section-mask">
          <RenderBlocks blocks={Array.isArray(page.layout) ? page.layout : []} />
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
      <article className="container py-16">
        <div className="prose max-w-none">
          <h1>{resolvedSlug === 'home' || !resolvedSlug ? 'Willkommen' : 'Seite'}</h1>
          <p>Seite konnte nicht geladen werden. Bitte später erneut versuchen oder Admin prüfen.</p>
          {process.env.NODE_ENV === 'development' && fullMsg && (
            <pre className="mt-4 p-4 bg-[var(--muted)] rounded text-sm overflow-auto">
              {fullMsg}
            </pre>
          )}
          <p>
            <a href="/admin" className="underline">Zum Admin</a>
          </p>
        </div>
      </article>
    )
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }): Promise<Metadata> {
  const { slug: slugParam = 'home' } = await params
  const slug = slugParam || 'home'
  try {
    const pages = await getCachedPublishedPageDepth1(slug)
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
