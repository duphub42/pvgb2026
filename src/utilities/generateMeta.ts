import type { Metadata } from 'next'

import type { Media, SitePage, BlogPost, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getPagePath } from './pagesTree'
import { getServerSideURL } from './getURL'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Philipp Bacher'

const normalizeTitle = (value: string): string =>
  value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([|:–-])\s*/g, ' $1 ')
    .toLowerCase()

const titleIncludesSiteName = (title: string): boolean =>
  normalizeTitle(title).includes(normalizeTitle(SITE_NAME))

const getTitleFallbackForSlug = (slug?: unknown): string | null => {
  if (typeof slug !== 'string') return null

  switch (slug.trim().toLowerCase()) {
    case 'profil':
      return 'Profil: Philipp Bacher - Digital Consultant in Halle'
    default:
      return null
  }
}

const getMeaningfulDocumentTitle = (doc?: Partial<SitePage> | Partial<BlogPost> | null) => {
  const title = typeof doc?.title === 'string' ? doc.title.trim() : ''
  const normalizedTitle = title.toLowerCase()

  if (!title || normalizedTitle === 'home' || normalizedTitle === 'startseite') return null

  return title
}

const getMetaTitle = (doc?: Partial<SitePage> | Partial<BlogPost> | null): string => {
  const metaTitle = typeof doc?.meta?.title === 'string' ? doc.meta.title.trim() : ''
  const siteNameOnly = normalizeTitle(metaTitle) === normalizeTitle(SITE_NAME)
  const baseTitle =
    (metaTitle && !siteNameOnly ? metaTitle : null) ||
    getTitleFallbackForSlug((doc as { slug?: unknown } | null | undefined)?.slug) ||
    getMeaningfulDocumentTitle(doc) ||
    SITE_NAME

  return titleIncludesSiteName(baseTitle) ? baseTitle : `${baseTitle} | ${SITE_NAME}`
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<SitePage> | Partial<BlogPost> | null
}): Promise<Metadata> => {
  const { doc } = args
  const docWithPathFields = doc as
    | (Partial<SitePage> & { slug?: unknown; parent?: unknown })
    | (Partial<BlogPost> & { slug?: unknown; parent?: unknown })
    | null

  const ogImage = getImageURL(doc?.meta?.image)

  const title = getMetaTitle(doc)

  const rawSlug = docWithPathFields?.slug
  let path = '/'
  if (Array.isArray(rawSlug)) {
    const parts = rawSlug.filter(Boolean)
    if (parts.length > 0) path = `/${parts.join('/')}`
  } else if (typeof rawSlug === 'string' && rawSlug) {
    if (rawSlug === 'home') {
      path = '/'
    } else if (
      docWithPathFields &&
      'parent' in docWithPathFields &&
      docWithPathFields.parent != null
    ) {
      path = `/${getPagePath(doc as SitePage)}`
    } else {
      path = `/${rawSlug}`
    }
  }

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    alternates: {
      canonical: path,
    },
    title,
  }
}
