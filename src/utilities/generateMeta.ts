import type { Metadata } from 'next'

import type { Media, SitePage, BlogPost, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getPagePath } from './pagesTree'
import { getPublicSiteURL } from './getURL'
import { getMediaUrl } from './getMediaUrl'

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
    case 'kontakt':
      return 'Kontakt - Webdesign, Marketing und Automatisierung in Halle'
    case 'preise':
      return 'Preise für Webdesign, Branding und Marketing'
    case 'profil':
      return 'Profil: Philipp Bacher - Digital Consultant in Halle'
    case 'datenschutz':
      return 'Datenschutz'
    case 'impressum':
      return 'Impressum'
    default:
      return null
  }
}

const getDescriptionFallbackForSlug = (slug?: unknown): string | undefined => {
  if (typeof slug !== 'string') return undefined

  switch (slug.trim().toLowerCase()) {
    case 'kontakt':
      return 'Kontakt zu Philipp Bacher in Halle (Saale) für Webdesign, Branding, SEO, Marketing und digitale Automatisierung.'
    case 'preise':
      return 'Orientierung zu Preisen und Paketen für Webdesign, Branding, SEO, Marketing und Automatisierung bei Philipp Bacher.'
    case 'profil':
      return 'Philipp Bacher ist Digital Consultant in Halle (Saale) mit Fokus auf Webdesign, Branding, Marketing, SEO und Automatisierung.'
    case 'datenschutz':
      return 'Datenschutzerklärung von Philipp Bacher für philippbacher.com.'
    case 'impressum':
      return 'Impressum und Anbieterkennzeichnung von Philipp Bacher, Halle (Saale).'
    default:
      return undefined
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
  const siteUrl = getPublicSiteURL()

  let url = siteUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    const mediaUrl = getMediaUrl(ogUrl || image.url, image.updatedAt)
    url =
      mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://')
        ? mediaUrl
        : `${siteUrl}${mediaUrl}`
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
  const description =
    doc?.meta?.description || getDescriptionFallbackForSlug(docWithPathFields?.slug)

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
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
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
