import type { Metadata } from 'next'
import { getPublicSiteURL } from './getURL'

const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Philipp Bacher'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Webdesign, Branding, SEO und digitale Beratung für Unternehmen in Halle, Leipzig und der DACH-Region.',
  images: [
    {
      url: `${getPublicSiteURL()}/website-template-OG.webp`,
    },
  ],
  siteName,
  title: siteName,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
