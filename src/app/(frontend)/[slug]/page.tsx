import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

// Always render on demand so new/updated pages are found (no cached 404)
export const dynamic = 'force-dynamic'
export const revalidate = 0

type PageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ previewId?: string }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const { slug = 'home' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const previewId = searchParams?.previewId
  const { isEnabled: isDraftMode } = await draftMode()

  let payload
  try {
    payload = await getPayload({ config: configPromise })
  } catch (err) {
    console.error('[Page] getPayload failed:', err)
    return (
      <article className="container py-16">
        <div className="prose max-w-none">
          <h1>{slug === 'home' || !slug ? 'Willkommen' : 'Seite'}</h1>
          <p>Die Datenbank ist gerade nicht erreichbar. Bitte später erneut versuchen oder Admin prüfen.</p>
          <p>
            <Link href="/admin" className="underline">Zum Admin</Link>
          </p>
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
            <RenderBlocks blocks={Array.isArray(pageById.layout) ? pageById.layout : []} />
          </article>
        )
      }
    } catch {
      // Invalid or missing id, fall through to slug lookup
    }
  }

  const resolvedSlug = slug || 'home'

  try {
    let pages = await payload.find({
      collection: 'site-pages',
      limit: 1,
      depth: 2,
      where: {
        and: [
          { slug: { equals: resolvedSlug } },
          ...(isDraftMode ? [] : [{ _status: { equals: 'published' } }]),
        ],
      },
      draft: isDraftMode,
    })

    // Fallback: only treat canonical homepage slugs (home / Home); do not use 'h' etc.
    if (pages.docs.length === 0 && (resolvedSlug === 'home' || !resolvedSlug) && !isDraftMode) {
      pages = await payload.find({
        collection: 'site-pages',
        limit: 1,
        depth: 2,
        where: {
          and: [
            { slug: { in: ['home', 'Home'] } },
            { _status: { equals: 'published' } },
          ],
        },
      })
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
                <Link href="/admin" className="underline">
                  Admin
                </Link>{' '}
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
        <RenderBlocks blocks={Array.isArray(page.layout) ? page.layout : []} />
      </article>
    )
  } catch (err) {
    const e = err as Error & { cause?: Error }
    const causeMsg = e?.cause instanceof Error ? e.cause.message : String(e?.cause ?? '')
    const fullMsg = [e?.message, causeMsg].filter(Boolean).join(' — ')
    if (process.env.NODE_ENV === 'development') {
      console.error('[Page] find/render failed:', fullMsg, e?.stack)
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
            <Link href="/admin" className="underline">Zum Admin</Link>
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
    const payload = await getPayload({ config: configPromise })
    let pages = await payload.find({
      collection: 'site-pages',
      limit: 1,
      depth: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
    })
    if (pages.docs.length === 0 && (slug === 'home' || !slug)) {
      pages = await payload.find({
        collection: 'site-pages',
        limit: 1,
        depth: 1,
        where: {
          and: [
            { slug: { in: ['home', 'Home'] } },
            { _status: { equals: 'published' } },
          ],
        },
      })
    }
    return generateMeta({ doc: pages.docs[0] })
  } catch (err) {
    const e = err as Error & { cause?: Error }
    const causeMsg = e?.cause instanceof Error ? e.cause.message : String(e?.cause ?? '')
    console.error('[generateMetadata] site-pages find failed:', e?.message, causeMsg ? `cause: ${causeMsg}` : '')
    return { title: 'Seite' }
  }
}
