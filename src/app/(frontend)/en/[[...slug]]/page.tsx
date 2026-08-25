import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HomepageScrollEffects } from '@/components/HomepageScrollEffects'
import { Faq8 } from '@/components/ui/faq-8'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { generateMeta } from '@/utilities/generateMeta'
import { getGermanSlugFromEnglishSegments, localizePathname } from '@/i18n/routing'
import { getPublicSiteURL } from '@/utilities/getURL'
import { HeroErrorBoundary } from '@/components/HeroErrorBoundary'
import { LeistungenFaqBox } from '@/components/LeistungenFaqBox'
import { RenderHero } from '@/heros/RenderHero'
import { resolveLayoutBlocks } from '@/utilities/profilLayoutFallback'
import { resolveSharedPortfolioContent } from '@/utilities/sharedPortfolioContent'
import { translateValueForLocale } from '@/i18n/translationOverlay'
import { cn } from '@/utilities/ui'
import type { SitePage } from '@/payload-types'

export const revalidate = false
export const dynamic = 'force-static'

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

type BlockBackground = 'none' | 'muted' | 'accent' | 'light' | 'dark'

const EN_SEGMENT_TO_DE_SLUG: Record<string, string> = {
  automation: 'automatisierung',
  'brand-strategy': 'markenstrategie',
  branding: 'corporate-identity',
  content: 'content',
  keynotes: 'keynotes',
  logo: 'logo',
  'corporate-identity': 'corporate-identity',
  markenstrategie: 'markenstrategie',
  presentations: 'keynotes',
  'portfolio-branding': 'portfolio-marken',
  'portfolio-marken': 'portfolio-marken',
  'portfolio-web-design': 'portfolio-webdesign',
  print: 'print',
  seo: 'seo',
  sem: 'sem',
  'web-design': 'webdesign',
  webdesign: 'webdesign',
}

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

function getOriginalSlug(segments: string[]): string {
  if (segments.length === 0) return 'home'
  const last = segments[segments.length - 1] ?? ''
  return EN_SEGMENT_TO_DE_SLUG[last] ?? getGermanSlugFromEnglishSegments(segments)
}

function applyEnglishHeroOverrides(hero: Record<string, unknown>, originalSlug: string) {
  const overrides: Record<string, Record<string, unknown>> = {
    home: {
      headline: 'Creative solutions.\nClear messages.\nConcrete results.',
      headlineLine1: 'Creative solutions.',
      headlineLine2: 'Clear messages.',
      headlineLine3: 'Concrete results.',
      description:
        'More visibility. More inquiries. More growth. Through web design, branding, marketing and smart automation.',
      stats: [
        { id: 'experience', value: '25+ Years', label: 'EXPERIENCE IN DIGITAL MARKETING' },
        { id: 'projects', value: '300+', label: 'COMPLETED PROJECTS' },
        { id: 'satisfaction', value: '100%', label: 'CUSTOMER SATISFACTION' },
      ],
    },
    seo: {
      subheadline: 'SEO - Search Engine Optimization',
      headline: 'Visibility That Brings Customers',
      description:
        'Search engine optimization ensures that companies are found exactly where decisions are made. With clear structure, relevant content and a technically clean foundation, presence becomes measurable demand.',
    },
    sem: {
      subheadline: 'SEM - Search Engine Marketing',
      headline: 'Be Visible When Customers Are Searching',
      description:
        'Search engine marketing puts offers in front of people at the exact moment real demand emerges. Precisely managed, clearly measurable and directly effective: visibility that is planned, not accidental.',
    },
    content: {
      subheadline: 'Content Creation',
      headline: 'Content That Shapes Perception and Builds Relevance',
      description:
        'Content creation shapes perception and creates meaning. At its core is the ability to create content that holds attention, builds trust and positions brands clearly.',
    },
    markenstrategie: {
      subheadline: 'Brand Strategy',
      headline: 'Brands Are Created in Strategy',
      description:
        'A clear brand strategy gives direction, creates focus and ensures that every design, message and decision contributes to one goal.',
    },
    'corporate-identity': {
      subheadline: 'Corporate Identity',
      headline: 'Not Just Present. Unmistakable.',
      description:
        'A corporate identity that ensures your company does not disappear, but is noticed, remembered and recognized.',
    },
    'portfolio-marken': {
      subheadline: 'Portfolio Branding',
      headline: 'Brand Projects From Logo Design to a Consistent Brand World',
      description: 'Branding cases that connect strategy and design and create clear recognition.',
    },
    preise: {
      subheadline: 'Price Overview',
      headline: 'A Clear Investment With Full Transparency and a Comprehensible Structure',
      description: 'Every euro is directed toward growth, impact and measurable results.',
    },
    automatisierung: {
      headline: 'Automation that reduces complexity and makes efficiency scalable.',
      description:
        'Process automation creates space by reliably handling recurring tasks in the background. This frees up room for what really matters: decisions, growth and focus. Efficiency is no longer worked for, but made systematically possible.',
    },
    profil: {
      subheadline: 'Profile',
      headline: 'Web Designer, Marketing Expert and Automation Partner',
      description:
        'More than 25 years of experience flow into solutions that build visibility, simplify processes and enable sustainable growth.',
    },
  }

  const override = overrides[originalSlug]
  if (!override) return hero
  return { ...hero, ...override }
}

function getEnglishPath(segments: string[]): string {
  const path = `/en/${segments.join('/')}`.replace(/\/+$/, '')
  return path || '/en'
}

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

  return pages.docs.map((page) => {
    const slug = typeof page.slug === 'string' ? page.slug : ''
    if (!slug || slug.toLowerCase() === 'home') return { slug: [] }

    const englishPath = localizePathname(`/${slug}`, 'en')
    const segments = englishPath
      .replace(/^\/en\/?/, '')
      .split('/')
      .filter(Boolean)
    return { slug: segments }
  })
}

async function findPublishedPageBySlug(slug: string): Promise<SitePage | null> {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'site-pages',
    limit: 1,
    pagination: false,
    depth: 2,
    where: {
      and: [
        slug === 'home' ? { slug: { in: ['home', 'Home'] } } : { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    draft: false,
  })

  return (pages.docs[0] as SitePage | undefined) ?? null
}

async function findPublishedPageMetaBySlug(slug: string): Promise<SitePage | null> {
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
      and: [
        slug === 'home' ? { slug: { in: ['home', 'Home'] } } : { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    draft: false,
  })

  return (pages.docs[0] as SitePage | undefined) ?? null
}

export default async function EnglishPage({ params: paramsPromise }: PageProps) {
  const { slug: segments = [] } = await paramsPromise
  const originalSlug = getOriginalSlug(segments)
  const page = await findPublishedPageBySlug(originalSlug)

  if (!page) notFound()

  const translatedPage = translateValueForLocale(page, 'en')
  const translatedHeroProps =
    translatedPage.hero && typeof translatedPage.hero === 'object' ? translatedPage.hero : {}
  const heroProps = applyEnglishHeroOverrides(
    translatedHeroProps as Record<string, unknown>,
    originalSlug,
  )
  const resolvedBlocks = await resolveSharedPortfolioContent(
    originalSlug,
    resolveLayoutBlocks(originalSlug, page.layout),
  )
  const isServicesPage =
    originalSlug === 'leistungen' || segments[0] === 'services' || originalSlug === 'wordpress-agentur'
  const translatedBlocks = translateValueForLocale(resolvedBlocks, 'en')
  const layoutBlocks = translatedBlocks.map((block) =>
    block && typeof block === 'object' ? { ...block, locale: 'en' } : block,
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
  const nextSectionBackground = getNextSectionBackgroundValue(firstBlockBackground)
  const isSuperheroHero =
    heroProps &&
    typeof heroProps === 'object' &&
    'type' in heroProps &&
    (heroProps as { type?: string }).type === 'superhero'

  const showHomeFaq = originalSlug === 'home'
  const whyWorkWithMeIndex = layoutBlocks.findIndex(
    (block) =>
      block &&
      typeof block === 'object' &&
      'blockType' in block &&
      (block as { blockType?: string }).blockType === 'whyWorkWithMe',
  )
  const hasElevatedSplit = showHomeFaq && isSuperheroHero && whyWorkWithMeIndex > 0
  const earlyBlocks = hasElevatedSplit ? layoutBlocks.slice(0, whyWorkWithMeIndex) : layoutBlocks
  const elevatedBlocks = hasElevatedSplit ? layoutBlocks.slice(whyWorkWithMeIndex) : []

  return (
    <article
      {...(showHomeFaq ? { 'data-home-scroll-root': true } : {})}
      className={cn(isSuperheroHero && 'hero-shell--superhero')}
      style={{ ['--hero-next-section-bg' as string]: nextSectionBackground }}
    >
      {showHomeFaq ? <HomepageScrollEffects /> : null}
      <div className={cn('relative isolate', isSuperheroHero ? 'z-[44]' : 'z-[32]')}>
        <SectionReveal>
          <HeroErrorBoundary>
            <RenderHero {...heroProps} pageSlug={originalSlug} locale="en" />
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
          <RenderBlocks blocks={earlyBlocks} totalLength={layoutBlocks.length} />
          {showHomeFaq && !hasElevatedSplit ? <Faq8 faq={translatedPage.faq} locale="en" /> : null}
        </SectionReveal>
        {hasElevatedSplit ? (
          <SectionReveal className="relative hero-following-section-foreground-elevated">
            <RenderBlocks
              blocks={elevatedBlocks}
              startIndex={whyWorkWithMeIndex}
              totalLength={layoutBlocks.length}
            />
            <Faq8 faq={translatedPage.faq} locale="en" />
          </SectionReveal>
        ) : null}
        {isServicesPage ? <LeistungenFaqBox faq={translatedPage.faq} locale="en" /> : null}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { slug: segments = [] } = await paramsPromise
  const originalSlug = getOriginalSlug(segments)
  const page = await findPublishedPageMetaBySlug(originalSlug)
  const translatedPage = translateValueForLocale(page, 'en')
  const meta = await generateMeta({ doc: translatedPage ?? null })
  const title =
    originalSlug === 'home'
      ? 'Philipp Bacher - Web Design, Marketing & Automation in Halle'
      : meta.title
  const path = getEnglishPath(segments)
  const dePath = localizePathname(path, 'de')
  const siteUrl = getPublicSiteURL()

  return {
    ...meta,
    title,
    alternates: {
      ...(meta.alternates ?? {}),
      canonical: path,
      languages: {
        de: dePath,
        en: path,
        'x-default': dePath,
      },
    },
    openGraph: {
      ...(meta.openGraph ?? {}),
      url: `${siteUrl}${path}`,
    },
  }
}
