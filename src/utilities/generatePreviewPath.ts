import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  'site-pages': '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req?: PayloadRequest
  /** When set, preview will load by document ID so it works even without draft cookie */
  id?: number | string
}

export const generatePreviewPath = ({ collection, slug, id }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  // Public URL: homepage is "/", other pages are "/slug". Must match [slug] route behavior.
  const isHome = collection === 'site-pages' && (slug === 'home' || slug === '')
  const path = isHome ? '/' : `${collectionPrefixMap[collection]}/${encodeURIComponent(slug)}`.replace(/^\/+/, '/')

  const encodedParams = new URLSearchParams({
    slug: slug || 'home',
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })
  if (id != null) {
    encodedParams.set('previewId', String(id))
  }

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
