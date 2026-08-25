import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Faq8 } from '@/components/ui/faq-8'
import { CorporateIdentityFaqBox } from '@/components/CorporateIdentityFaqBox'
import { PortfolioFaqBox } from '@/components/PortfolioFaqBox'
import { PreiseFaqBox } from '@/components/PreiseFaqBox'
import { ProfilFaqBox } from '@/components/ProfilFaqBox'
import { LeistungenFaqBox } from '@/components/LeistungenFaqBox'
import { ContentFaqBox, SemFaqBox, SeoFaqBox } from '@/components/ServiceFaqBoxes'
import { WebdesignFaqBox } from '@/components/WebdesignFaqBox'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { appendDefaultCtaBlock } from '@/utilities/defaultCtaBlocks'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { resolveSharedPortfolioContent } from '@/utilities/sharedPortfolioContent'
import { getPortfolioPresetHero } from '@/collections/Pages/portfolioPresets'
import { cn } from '@/utilities/ui'
import {
  buildServiceJsonLd,
  buildWebPageJsonLd,
  getDocumentPath,
  safeJsonLd,
} from '@/utilities/structuredData'
import type { SitePage } from '@/payload-types'

export const revalidate = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'site-pages',
    where: { _status: { equals: 'published' } },
    limit: 200,
    pagination: false,
    select: { slug: true },
    depth: 0,
    draft: false,
  })
  return pages.docs
    .map((page) => ({ slug: typeof page.slug === 'string' ? page.slug : '' }))
    .filter((p) => p.slug && p.slug !== 'home')
}

type PageProps = {
  params: Promise<{ slug?: string }>
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

function isHomePageSlug(slug?: string | null): boolean {
  if (!slug) return true
  return slug.trim().toLowerCase() === 'home'
}

function isCorporateIdentityPageSlug(slug?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase()
  return normalizedSlug === 'corporate-identity' || normalizedSlug === 'ci-corporate-identity'
}

function isCorporateIdentityPageTitle(title?: string | null): boolean {
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedTitle.includes('corporate identity') || normalizedTitle.includes('corporate design')
  )
}

function isContentPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase()
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return normalizedSlug === 'content' || normalizedTitle.includes('content creation')
}

function isSemPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase()
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return normalizedSlug === 'sem' || normalizedTitle.includes('sem')
}

function isSeoPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase()
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return normalizedSlug === 'seo' || normalizedTitle.includes('seo')
}

function isPresentationPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? ''
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedSlug === 'keynotes' ||
    normalizedSlug === 'praesentationen-keynotes' ||
    normalizedSlug.includes('presentation') ||
    normalizedSlug.includes('praesentation') ||
    normalizedSlug.includes('präsentation') ||
    normalizedTitle.includes('keynote') ||
    normalizedTitle.includes('presentation') ||
    normalizedTitle.includes('praesentation') ||
    normalizedTitle.includes('präsentation')
  )
}

function isPrintPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? ''
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedSlug === 'print' ||
    normalizedSlug === 'printmedien-grafikdesign' ||
    normalizedSlug.includes('grafikdesign') ||
    normalizedTitle.includes('print') ||
    normalizedTitle.includes('grafikdesign')
  )
}

function isLogoPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? ''
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedSlug === 'logo' ||
    normalizedSlug === 'logo-entwicklung' ||
    normalizedSlug.includes('logo') ||
    normalizedTitle.includes('logo')
  )
}

function isBrandStrategyPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? ''
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedSlug === 'markenstrategie' ||
    normalizedSlug.includes('markenstrategie') ||
    normalizedSlug.includes('positionierung') ||
    normalizedTitle.includes('markenstrategie') ||
    normalizedTitle.includes('positionierung')
  )
}

function isBrandingPortfolioSlug(slug?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase()
  return normalizedSlug === 'portfolio-branding' || normalizedSlug === 'portfolio-marken'
}

function shouldUseBrandingPortfolioHeroFallback(hero: unknown): boolean {
  if (!hero || typeof hero !== 'object' || Array.isArray(hero)) return true
  const type = String((hero as { type?: unknown }).type ?? '').trim()
  return !type || type === 'none' || type === 'lowImpact'
}

function isAutomationPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? ''
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedSlug === 'automatisierung' ||
    normalizedSlug.includes('automatisierung') ||
    normalizedSlug.includes('automation') ||
    normalizedTitle.includes('automatisierung') ||
    normalizedTitle.includes('automation')
  )
}

function isWordPressAgencyPage(slug?: string | null, title?: string | null): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? ''
  const normalizedTitle = title?.trim().toLowerCase() ?? ''
  return (
    normalizedSlug === 'wordpress-agentur' ||
    normalizedSlug.includes('wordpress-agentur') ||
    normalizedSlug.includes('wp-agentur') ||
    normalizedTitle.includes('wordpress-agentur') ||
    normalizedTitle.includes('wp agentur')
  )
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

const SLUG_ALIASES: Record<string, string[]> = {
  'portfolio-branding': ['portfolio-marken'],
  'portfolio-marken': ['portfolio-branding'],
}

const PORTFOLIO_META_BY_SLUG: Record<string, { title: string; description: string }> = {
  portfolio: {
    title: 'Portfolio für Webdesign, SEO und Branding in Halle',
    description:
      'Ausgewählte Projekte aus Webdesign, SEO, Branding und Performance-Optimierung für Unternehmen in Halle und im 200-km-Umkreis.',
  },
  'portfolio-webdesign': {
    title: 'Portfolio Webdesign in Halle',
    description:
      'UX/UI- und Performance-Projekte: moderne Websites, klare Conversion-Pfade und technische Optimierung für Unternehmen in Halle und Region.',
  },
  'portfolio-marketing': {
    title: 'Portfolio Marketing in Halle',
    description:
      'Marketing-Cases mit Fokus auf Sichtbarkeit, Nachfrage und messbare Ergebnisse für lokale KMU, B2B und Startups in Halle und Umgebung.',
  },
  'portfolio-branding': {
    title: 'Portfolio Branding in Halle',
    description:
      'Branding-Projekte mit klarer Positionierung, visueller Identität und konsistentem Markenauftritt für Unternehmen in Halle und Region.',
  },
  'portfolio-marken': {
    title: 'Portfolio Branding in Halle',
    description:
      'Branding-Projekte mit klarer Positionierung, visueller Identität und konsistentem Markenauftritt für Unternehmen in Halle und Region.',
  },
}

async function findPublishedPageBySlug(slugParam: string): Promise<SitePage | null> {
  const payload = await getPayload({ config: configPromise })

  const runQuery = async (querySlug: string | string[], depth: 0 | 1 | 2 = 2) => {
    const where = Array.isArray(querySlug) ? { in: querySlug } : { equals: querySlug }

    const pages = await payload.find({
      collection: 'site-pages',
      limit: 1,
      pagination: false,
      depth,
      where: {
        and: [{ slug: where }, { _status: { equals: 'published' } }],
      },
      draft: false,
    })

    return (pages.docs[0] as SitePage | undefined) ?? null
  }

  const direct = await runQuery(slugParam)
  if (direct) return direct

  if (slugParam === 'home' || !slugParam) {
    const home = await runQuery(['home', 'Home'])
    if (home) return home
  }

  const aliases = SLUG_ALIASES[slugParam] ?? []
  if (aliases.length > 0) {
    const aliasPage = await runQuery(aliases)
    if (aliasPage) return aliasPage
  }

  return null
}

async function findPublishedPageMetaBySlug(slugParam: string): Promise<SitePage | null> {
  const payload = await getPayload({ config: configPromise })

  const runQuery = async (querySlug: string | string[]) => {
    const where = Array.isArray(querySlug) ? { in: querySlug } : { equals: querySlug }

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
        and: [{ slug: where }, { _status: { equals: 'published' } }],
      },
      draft: false,
    })

    return (pages.docs[0] as SitePage | undefined) ?? null
  }

  const direct = await runQuery(slugParam)
  if (direct) return direct

  if (slugParam === 'home' || !slugParam) {
    const home = await runQuery(['home', 'Home'])
    if (home) return home
  }

  const aliases = SLUG_ALIASES[slugParam] ?? []
  if (aliases.length > 0) {
    const aliasPage = await runQuery(aliases)
    if (aliasPage) return aliasPage
  }

  return null
}

const getCachedPublishedPageBySlug =
  process.env.NODE_ENV === 'development'
    ? async (slugParam: string): Promise<SitePage | null> => findPublishedPageBySlug(slugParam)
    : unstable_cache(
        async (slugParam: string): Promise<SitePage | null> => findPublishedPageBySlug(slugParam),
        ['site-pages-published-by-slug-depth-2'],
        {
          revalidate,
          tags: ['site-pages'],
        },
      )

const getCachedPublishedPageMetaBySlug =
  process.env.NODE_ENV === 'development'
    ? async (slugParam: string): Promise<SitePage | null> => findPublishedPageMetaBySlug(slugParam)
    : unstable_cache(
        async (slugParam: string): Promise<SitePage | null> =>
          findPublishedPageMetaBySlug(slugParam),
        ['site-pages-published-by-slug-meta'],
        {
          revalidate,
          tags: ['site-pages'],
        },
      )

export default async function Page({ params: paramsPromise }: PageProps) {
  const { slug = 'home' } = await paramsPromise

  const resolvedSlug = slug || 'home'

  try {
    const page = await getCachedPublishedPageBySlug(resolvedSlug)
    if (!page) {
      // Startseite: Fallback anzeigen statt 404, damit localhost nicht leer wirkt
      if (resolvedSlug === 'home' || !resolvedSlug) {
        return (
          <article className="container page-safe-top py-16">
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

    const rawHeroProps = page.hero && typeof page.hero === 'object' ? page.hero : {}
    const heroProps =
      isBrandingPortfolioSlug(resolvedSlug) && shouldUseBrandingPortfolioHeroFallback(rawHeroProps)
        ? getPortfolioPresetHero('branding')
        : rawHeroProps
    const resolvedLayoutBlocks = await resolveSharedPortfolioContent(
      resolvedSlug,
      resolveLayoutBlocks(resolvedSlug, page.layout),
    )
    const showHomeFaq = isHomePageSlug(resolvedSlug)
    const firstBlock = resolvedLayoutBlocks[0]
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
    const effectiveSlug =
      typeof page.slug === 'string' && page.slug.trim().length > 0
        ? page.slug.trim().toLowerCase()
        : resolvedSlug.trim().toLowerCase()
    const pageTitle = typeof page.title === 'string' ? page.title.trim().toLowerCase() : ''
    const isPortfolioPage =
      effectiveSlug === 'portfolio' ||
      effectiveSlug.startsWith('portfolio-') ||
      pageTitle.includes('portfolio')
    const isPricesPage = effectiveSlug === 'preise' || pageTitle.includes('preise')
    const isProfilePage = effectiveSlug === 'profil' || pageTitle.includes('profil')
    const isWebdesignPage = effectiveSlug === 'webdesign' || pageTitle.includes('webdesign')
    const isCorporateIdentityPage =
      isCorporateIdentityPageSlug(effectiveSlug) || isCorporateIdentityPageTitle(pageTitle)
    const isContentFaqPage = isContentPage(effectiveSlug, pageTitle)
    const isSemFaqPage = isSemPage(effectiveSlug, pageTitle)
    const isSeoFaqPage = isSeoPage(effectiveSlug, pageTitle)
    const isPresentationFaqPage = isPresentationPage(effectiveSlug, pageTitle)
    const isPrintFaqPage = isPrintPage(effectiveSlug, pageTitle)
    const isLogoFaqPage = isLogoPage(effectiveSlug, pageTitle)
    const isBrandStrategyFaqPage = isBrandStrategyPage(effectiveSlug, pageTitle)
    const isAutomationFaqPage = isAutomationPage(effectiveSlug, pageTitle)
    const isWordPressAgencyFaqPage = isWordPressAgencyPage(effectiveSlug, pageTitle)
    const hasServiceFaqBox =
      isWebdesignPage ||
      isCorporateIdentityPage ||
      isContentFaqPage ||
      isSemFaqPage ||
      isSeoFaqPage ||
      isPresentationFaqPage ||
      isPrintFaqPage ||
      isLogoFaqPage ||
      isBrandStrategyFaqPage ||
      isAutomationFaqPage
    const hasDedicatedFaqBox =
      isPricesPage ||
      isProfilePage ||
      isWebdesignPage ||
      isCorporateIdentityPage ||
      isContentFaqPage ||
      isSemFaqPage ||
      isSeoFaqPage ||
      isPresentationFaqPage ||
      isPrintFaqPage ||
      isLogoFaqPage ||
      isBrandStrategyFaqPage ||
      isAutomationFaqPage
    const shouldAddDefaultCta =
      hasServiceFaqBox ||
      (isPortfolioPage &&
        (effectiveSlug === 'portfolio' ||
          (effectiveSlug.startsWith('portfolio-') &&
            effectiveSlug !== 'portfolio-marketing' &&
            !isBrandingPortfolioSlug(effectiveSlug))))
    const layoutBlocks = shouldAddDefaultCta
      ? appendDefaultCtaBlock(resolvedLayoutBlocks, {
          slug: effectiveSlug,
          title: page.title,
          section: hasServiceFaqBox ? 'leistung' : 'portfolio',
        })
      : resolvedLayoutBlocks
    const firstCtaIndex = layoutBlocks.findIndex(
      (block) =>
        block && typeof block === 'object' && 'blockType' in block && block.blockType === 'cta',
    )
    const renderFaqAfterCta = isPortfolioPage && !hasDedicatedFaqBox && firstCtaIndex >= 0
    const renderFaqAtEnd = isPortfolioPage && !hasDedicatedFaqBox && firstCtaIndex < 0
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
    const webPageJsonLd = buildWebPageJsonLd(page, getDocumentPath(page))
    const serviceJsonLd = buildServiceJsonLd(page, getDocumentPath(page))

    return (
      <article
        className={cn(isSuperheroHero && 'hero-shell--superhero')}
        style={{ ['--hero-next-section-bg' as string]: nextSectionBackground }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageJsonLd) }}
        />
        {serviceJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }}
          />
        ) : null}
        {/*
          Hero z-36 for Superhero so the portrait can paint above the following section.
          Standard-Folgesection z-31, damit Mask nicht über Hero-Popout liegt.
          servicesOverview: Unter lg (Umbruch 1–2 Spalten) z-20 + kein Negativ-Margin — Karten liegen unter dem Hero.
          Ab lg (4 Spalten): z-33 + Flush — Karten dürfen in den Hero ragen / Hover darüber (s. globals services-flush).
        */}
        <div className={cn('relative isolate', isSuperheroHero ? 'z-[36]' : 'z-[32]')}>
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
              ? cn(
                  'hero-following-section--services-flush mt-0 max-lg:pt-8 md:max-lg:pt-10 lg:pt-2',
                  isSuperheroHero ? 'z-auto' : 'z-20 lg:z-[33]',
                )
              : isSuperheroHero
                ? 'z-auto mt-0 pt-24'
                : 'z-20 max-md:pt-8 pt-24 md:z-[31]',
          )}
        >
          <SectionReveal
            className={cn(
              'relative',
              isSuperheroHero ? 'pt-24' : 'z-0 pt-24',
              isSuperheroHero && 'hero-following-section-foreground',
            )}
          >
            <RenderBlocks blocks={blocksBeforeAndIncludingCta} />
            {renderFaqAfterCta && <PortfolioFaqBox faq={page.faq} />}
            {blocksAfterCta.length > 0 && <RenderBlocks blocks={blocksAfterCta} />}
            {renderFaqAtEnd && <PortfolioFaqBox faq={page.faq} />}
            {isPricesPage && <PreiseFaqBox faq={page.faq} />}
            {isProfilePage && <ProfilFaqBox faq={page.faq} />}
            {isWebdesignPage && <WebdesignFaqBox faq={page.faq} />}
            {isCorporateIdentityPage && <CorporateIdentityFaqBox faq={page.faq} />}
            {isContentFaqPage && <ContentFaqBox faq={page.faq} />}
            {isSemFaqPage && <SemFaqBox faq={page.faq} />}
            {isSeoFaqPage && <SeoFaqBox faq={page.faq} />}
            {isPresentationFaqPage && <LeistungenFaqBox faq={page.faq} />}
            {isPrintFaqPage && <LeistungenFaqBox faq={page.faq} />}
            {isLogoFaqPage && <LeistungenFaqBox faq={page.faq} />}
            {isBrandStrategyFaqPage && <LeistungenFaqBox faq={page.faq} />}
            {isAutomationFaqPage && <LeistungenFaqBox faq={page.faq} />}
            {isWordPressAgencyFaqPage && <LeistungenFaqBox faq={page.faq} />}
            {showHomeFaq && <Faq8 faq={page.faq} />}
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
            <Link href="/admin" className="underline">
              Zum Admin
            </Link>
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
    const page = await getCachedPublishedPageMetaBySlug(slug)
    const meta = await generateMeta({ doc: page })

    const portfolioMeta = PORTFOLIO_META_BY_SLUG[slug]
    if (portfolioMeta) {
      const canonicalPath = `/${slug}`
      return {
        ...meta,
        title: `${portfolioMeta.title} | Philipp Bacher`,
        description: portfolioMeta.description,
        alternates: {
          ...(meta.alternates ?? {}),
          canonical: canonicalPath,
        },
        openGraph: {
          ...(meta.openGraph ?? {}),
          title: `${portfolioMeta.title} | Philipp Bacher`,
          description: portfolioMeta.description,
          url: canonicalPath,
        },
      }
    }

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
