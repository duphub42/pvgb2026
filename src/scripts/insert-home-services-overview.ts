import { getPayload } from 'payload'
import configPromise from '@payload-config'

type LayoutBlock = {
  id?: string
  blockType?: string
  [key: string]: unknown
}

const servicesOverviewBlock = {
  blockType: 'servicesOverview',
  heading: 'Meine Leistungen im Überblick',
  services: [
    {
      icon: 'compass',
      title: 'Digital Consulting',
      description:
        'Strategische Beratung, Roadmaps, Business- & Marketing-Strategien – fundiert, praktisch, wirksam.',
    },
    {
      icon: 'code',
      title: 'Webentwicklung & Apps',
      description:
        'Moderne, performante Websites und Web-Apps – responsiv, SEO-optimiert, auf Conversion ausgelegt.',
    },
    {
      icon: 'palette',
      title: 'Branding & Design',
      description:
        'Klare Markenbotschaften, einprägsame Designs und ein einheitlicher Auftritt – für hohe Wiedererkennung.',
    },
    {
      icon: 'megaphone',
      title: 'Marketing & Automatisierung',
      description:
        'Cross-Channel Kampagnen, Ads, E-Mail-Marketing, Social Media, Automatisierungen – effizient und messbar.',
    },
  ],
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'home' } },
    depth: 0,
    limit: 1,
    pagination: false,
    draft: true,
  })

  const doc = page.docs[0]
  if (!doc) throw new Error('site-pages slug=home not found')

  const layout = Array.isArray(doc.layout) ? (doc.layout as unknown[]) : []
  const whyIndex = layout.findIndex(
    (b) => b && typeof b === 'object' && (b as LayoutBlock).blockType === 'whyWorkWithMe',
  )
  if (whyIndex === -1) throw new Error('whyWorkWithMe block not found on home page')

  const alreadyPresent = layout.some(
    (b) => b && typeof b === 'object' && (b as LayoutBlock).blockType === 'servicesOverview',
  )
  if (alreadyPresent) {
    payload.logger.info('servicesOverview block already present on home page — no change made.')
    return
  }

  const nextLayout = [
    ...layout.slice(0, whyIndex),
    servicesOverviewBlock,
    ...layout.slice(whyIndex),
  ]

  await payload.update({
    collection: 'site-pages',
    id: doc.id,
    data: {
      layout: nextLayout as never,
      _status: 'published' as never,
    },
    draft: false,
  })

  payload.logger.info('Inserted servicesOverview block on home page before whyWorkWithMe.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    process.exit()
  })
