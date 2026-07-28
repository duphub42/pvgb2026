import type { BreadcrumbItem } from '@/components/Breadcrumbs'
import type { BlogPost, Media, SitePage } from '@/payload-types'
import { getPublicSiteURL } from '@/utilities/getURL'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPagePath } from '@/utilities/pagesTree'

type JsonLdObject = Record<string, unknown>

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Philipp Bacher'
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'mail@philippbacher.com'
const DEFAULT_IMAGE_PATH = '/website-template-OG.webp'

export function safeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function absoluteSiteURL(path = '/'): string {
  const siteURL = getPublicSiteURL()
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${siteURL}${path.startsWith('/') ? path : `/${path}`}`
}

export function getDocumentPath(doc?: Partial<SitePage> | Partial<BlogPost> | null): string {
  const slug = doc?.slug

  if (!slug || slug === 'home') return '/'
  if (doc && 'parent' in doc && doc.parent != null) return `/${getPagePath(doc as SitePage)}`

  return `/${slug}`
}

export function getStructuredImageURL(image?: Media | number | null): string {
  if (image && typeof image === 'object' && 'url' in image) {
    const mediaPath = getMediaUrl(image.sizes?.og?.url || image.url, image.updatedAt)
    return absoluteSiteURL(mediaPath)
  }

  return absoluteSiteURL(DEFAULT_IMAGE_PATH)
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject | null {
  const sanitized = items
    .map((item) => ({
      label: item.label.trim(),
      href: item.href?.trim(),
    }))
    .filter((item) => item.label)

  if (sanitized.length < 2) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: sanitized.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteSiteURL(item.href) } : {}),
    })),
  }
}

export function buildWebPageJsonLd(doc: Partial<SitePage>, path = getDocumentPath(doc)): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteSiteURL(path)}#webpage`,
    url: absoluteSiteURL(path),
    name: doc.meta?.title || doc.title || SITE_NAME,
    description: doc.meta?.description || undefined,
    isPartOf: {
      '@id': `${getPublicSiteURL()}/#website`,
    },
    about: {
      '@id': `${getPublicSiteURL()}/#person`,
    },
    datePublished: doc.publishedAt || doc.createdAt || undefined,
    dateModified: doc.updatedAt || undefined,
  }
}

export function buildArticleJsonLd(post: BlogPost): JsonLdObject {
  const path = `/posts/${post.slug}`
  const authorName = post.populatedAuthors?.[0]?.name || SITE_NAME

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteSiteURL(path)}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${absoluteSiteURL(path)}#webpage`,
    },
    headline: post.meta?.title || post.title,
    description: post.meta?.description || undefined,
    image: getStructuredImageURL(
      typeof post.meta?.image === 'object' ? post.meta.image : post.heroImage,
    ),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@id': `${getPublicSiteURL()}/#organization`,
    },
  }
}
