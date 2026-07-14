import { getClientSideURL } from '@/utilities/getURL'
import { openSiteSearch } from '@/utilities/webmcp/events'

export type SiteSearchResult = {
  title: string
  url: string
  source: 'search' | 'site-page' | 'static'
  slug?: string
}

export type OpenSiteSearchDetail = {
  query?: string
  navigate?: boolean
}

type PayloadListResponse<T> = {
  docs?: T[]
  totalDocs?: number
}

type SearchDoc = {
  title?: string | null
  slug?: string | null
}

type SitePageDoc = {
  title?: string | null
  slug?: string | null
}

const STATIC_PAGES: SiteSearchResult[] = [
  { title: 'Start', url: '/', source: 'static', slug: 'home' },
  { title: 'Blog', url: '/posts', source: 'static', slug: 'posts' },
  { title: 'Leistungen', url: '/leistungen', source: 'static', slug: 'leistungen' },
  { title: 'Portfolio', url: '/portfolio', source: 'static', slug: 'portfolio' },
  { title: 'Preise', url: '/preise', source: 'static', slug: 'preise' },
  { title: 'Kontakt', url: '/kontakt', source: 'static', slug: 'kontakt' },
]

function normalizeQuery(query: string): string {
  return query.trim()
}

function pageUrlFromSlug(slug?: string | null): string | null {
  if (!slug || slug === 'home') return '/'
  return `/${slug.replace(/^\/+/, '')}`
}

function matchesQuery(value: string | null | undefined, query: string): boolean {
  if (!value) return false
  return value.toLocaleLowerCase('de-DE').includes(query.toLocaleLowerCase('de-DE'))
}

async function fetchPayloadDocs<T>(
  collection: string,
  where: Record<string, unknown>,
  limit = 10,
): Promise<T[]> {
  const baseUrl = getClientSideURL()
  const params = new URLSearchParams({
    limit: String(limit),
    depth: '0',
    where: JSON.stringify(where),
  })

  const response = await fetch(`${baseUrl}/api/${collection}?${params.toString()}`)
  if (!response.ok) return []

  const json = (await response.json()) as PayloadListResponse<T>
  return Array.isArray(json.docs) ? json.docs : []
}

export async function searchSite(query: string, limit = 10): Promise<SiteSearchResult[]> {
  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) {
    return STATIC_PAGES.slice(0, limit)
  }

  const staticMatches = STATIC_PAGES.filter(
    (page) => matchesQuery(page.title, normalizedQuery) || matchesQuery(page.slug, normalizedQuery),
  )

  const where = {
    or: [
      { title: { like: normalizedQuery } },
      { slug: { like: normalizedQuery } },
      { 'meta.title': { like: normalizedQuery } },
      { 'meta.description': { like: normalizedQuery } },
    ],
  }

  const [searchDocs, sitePages] = await Promise.all([
    fetchPayloadDocs<SearchDoc>('search', where, limit),
    fetchPayloadDocs<SitePageDoc>(
      'site-pages',
      {
        and: [
          { _status: { equals: 'published' } },
          {
            or: [
              { title: { contains: normalizedQuery } },
              { slug: { contains: normalizedQuery } },
            ],
          },
        ],
      },
      limit,
    ),
  ])

  const merged = new Map<string, SiteSearchResult>()

  for (const page of staticMatches) {
    merged.set(page.url, page)
  }

  for (const doc of searchDocs) {
    const url = pageUrlFromSlug(doc.slug) ?? (doc.slug ? `/posts/${doc.slug}` : null)
    if (!url || !doc.title) continue
    merged.set(url, {
      title: doc.title,
      url,
      source: 'search',
      slug: doc.slug ?? undefined,
    })
  }

  for (const doc of sitePages) {
    const url = pageUrlFromSlug(doc.slug)
    if (!url || !doc.title) continue
    merged.set(url, {
      title: doc.title,
      url,
      source: 'site-page',
      slug: doc.slug ?? undefined,
    })
  }

  return [...merged.values()].slice(0, limit)
}

export async function runSiteSearchTool(input: Record<string, unknown>): Promise<string> {
  const query = typeof input.query === 'string' ? normalizeQuery(input.query) : ''
  const openDialog = input.openDialog === true
  const navigate = input.navigate === true

  if (!query) {
    return JSON.stringify({
      ok: false,
      message: 'Provide a non-empty query string.',
    })
  }

  const results = await searchSite(query)

  if (openDialog || navigate) {
    openSiteSearch({ query, navigate })
  }

  return JSON.stringify({
    ok: true,
    query,
    resultCount: results.length,
    results,
    searchPageUrl: `/search?q=${encodeURIComponent(query)}`,
  })
}
