import type { MetadataRoute } from 'next'
import { getPublicSiteURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const siteURL = getPublicSiteURL()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/*',
      },
    ],
    sitemap: `${siteURL}/sitemap.xml`,
  }
}
