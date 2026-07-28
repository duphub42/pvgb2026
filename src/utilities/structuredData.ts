import type { BreadcrumbItem } from '@/components/Breadcrumbs'
import type { BlogPost, Media, SitePage } from '@/payload-types'
import { getPublicSiteURL } from '@/utilities/getURL'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPagePath } from '@/utilities/pagesTree'

type JsonLdObject = Record<string, unknown>

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Philipp Bacher'
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'mail@philippbacher.com'
const DEFAULT_IMAGE_PATH = '/website-template-OG.webp'
const SERVICE_AREAS = [
  'Halle (Saale)',
  'Leipzig',
  'Berlin',
  'Magdeburg',
  'Erfurt',
  'Dresden',
  'Chemnitz',
  'Deutschland',
  'DACH',
]

const SERVICE_TYPES_BY_SLUG: Record<string, string> = {
  leistungen: 'Webdesign, Branding, SEO, Online-Marketing und Automatisierung',
  webdesign: 'Webdesign und Webentwicklung',
  seo: 'Suchmaschinenoptimierung',
  sem: 'Suchmaschinenmarketing und Google Ads',
  content: 'Content Creation',
  'content-creation': 'Content Creation',
  print: 'Printdesign und Grafikdesign',
  'printmedien-grafikdesign': 'Printdesign und Grafikdesign',
  logo: 'Logo-Entwicklung',
  'logo-entwicklung': 'Logo-Entwicklung',
  markenstrategie: 'Markenstrategie',
  automatisierung: 'Automatisierung',
  automation: 'Automatisierung',
  'ci-corporate-identity': 'Corporate Identity',
  'corporate-identity': 'Corporate Identity',
}

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

export function buildWebPageJsonLd(
  doc: Partial<SitePage>,
  path = getDocumentPath(doc),
): JsonLdObject {
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

export function getServiceTypeForPage(
  doc: Partial<SitePage>,
  path = getDocumentPath(doc),
): string | null {
  const normalizedPath = path.replace(/^\/+|\/+$/g, '')
  const slug = String(doc.slug || normalizedPath.split('/').pop() || '').toLowerCase()
  const title = String(doc.title || doc.meta?.title || '').toLowerCase()
  const candidates = [slug, normalizedPath.toLowerCase()]

  for (const candidate of candidates) {
    if (SERVICE_TYPES_BY_SLUG[candidate]) return SERVICE_TYPES_BY_SLUG[candidate]
    const lastPart = candidate.split('/').pop() || ''
    if (SERVICE_TYPES_BY_SLUG[lastPart]) return SERVICE_TYPES_BY_SLUG[lastPart]
  }

  if (title.includes('webdesign')) return SERVICE_TYPES_BY_SLUG.webdesign
  if (title.includes('seo') || title.includes('suchmaschinenoptimierung'))
    return SERVICE_TYPES_BY_SLUG.seo
  if (title.includes('sem') || title.includes('google ads')) return SERVICE_TYPES_BY_SLUG.sem
  if (title.includes('content')) return SERVICE_TYPES_BY_SLUG.content
  if (title.includes('print') || title.includes('grafikdesign')) return SERVICE_TYPES_BY_SLUG.print
  if (title.includes('logo')) return SERVICE_TYPES_BY_SLUG.logo
  if (title.includes('markenstrategie')) return SERVICE_TYPES_BY_SLUG.markenstrategie
  if (title.includes('automatisierung') || title.includes('automation')) {
    return SERVICE_TYPES_BY_SLUG.automatisierung
  }
  if (title.includes('corporate identity') || title.includes('ci ')) {
    return SERVICE_TYPES_BY_SLUG['corporate-identity']
  }
  if (slug === 'leistungen') return SERVICE_TYPES_BY_SLUG.leistungen

  return null
}

export function buildServiceJsonLd(
  doc: Partial<SitePage>,
  path = getDocumentPath(doc),
): JsonLdObject | null {
  const serviceType = getServiceTypeForPage(doc, path)
  if (!serviceType) return null

  const url = absoluteSiteURL(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: doc.meta?.title || doc.title || serviceType,
    serviceType,
    description: doc.meta?.description || undefined,
    url,
    provider: {
      '@id': `${getPublicSiteURL()}/#localbusiness`,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    offers: {
      '@type': 'Offer',
      url: absoluteSiteURL('/termin'),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      eligibleRegion: SERVICE_AREAS.map((area) => ({
        '@type': 'Place',
        name: area,
      })),
    },
  }
}

export function buildOfferCatalogJsonLd(): JsonLdObject {
  const siteURL = getPublicSiteURL()
  const services = [
    ['Webdesign und Webentwicklung', '/webdesign'],
    ['Suchmaschinenoptimierung', '/seo'],
    ['Suchmaschinenmarketing und Google Ads', '/sem'],
    ['Branding und Corporate Identity', '/ci-corporate-identity'],
    ['Logo-Entwicklung', '/logo-entwicklung'],
    ['Markenstrategie', '/markenstrategie'],
    ['Content Creation', '/content-creation'],
    ['Printdesign und Grafikdesign', '/printmedien-grafikdesign'],
    ['Automatisierung', '/automatisierung'],
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${siteURL}/leistungen#offercatalog`,
    name: 'Leistungen von Philipp Bacher',
    url: `${siteURL}/leistungen`,
    itemListElement: services.map(([name, path]) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name,
        url: absoluteSiteURL(path),
        provider: {
          '@id': `${siteURL}/#localbusiness`,
        },
      },
    })),
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
