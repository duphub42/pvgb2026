import type { Metadata } from 'next'

import type { Media, SitePage, BlogPost, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getPagePath } from './pagesTree'
import { getServerSideURL } from './getURL'

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

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  const rawSlug = (doc as any)?.slug
  let path = '/'
  if (Array.isArray(rawSlug)) {
    const parts = rawSlug.filter(Boolean)
    if (parts.length > 0) path = `/${parts.join('/')}`
  } else if (typeof rawSlug === 'string' && rawSlug) {
    if (rawSlug === 'home') {
      path = '/'
    } else if ('parent' in (doc as any) && (doc as any).parent != null) {
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
