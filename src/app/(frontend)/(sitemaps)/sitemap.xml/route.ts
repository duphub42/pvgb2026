import { getServerSideSitemapIndex } from 'next-sitemap'
import { getPublicSiteURL } from '@/utilities/getURL'

export const dynamic = 'force-static'

export async function GET() {
  const siteURL = getPublicSiteURL()

  return getServerSideSitemapIndex([`${siteURL}/pages-sitemap.xml`, `${siteURL}/posts-sitemap.xml`])
}
