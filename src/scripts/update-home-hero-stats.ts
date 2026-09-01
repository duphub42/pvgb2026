import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { SitePage } from '@/payload-types'

type Hero = NonNullable<SitePage['hero']>
type HeroStat = NonNullable<Hero['stats']>[number]

const NEXT_STATS: HeroStat[] = [
  { icon: 'TrendingUp', value: '+186%', label: 'Organischer Traffic' },
  { icon: 'Target', value: '-32%', label: 'Cost per Lead' },
  { icon: 'BarChart2', value: '4.8x', label: 'ROAS (Peak)' },
]

async function main() {
  const payload = await getPayload({ config: configPromise })
  payload.logger.info('Loaded Payload, fetching home page...')

  const page = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'home' } },
    depth: 0,
    limit: 1,
    pagination: false,
    draft: true,
  })

  const doc = page.docs[0]
  if (!doc) {
    throw new Error('site-pages slug=home not found')
  }

  const hero = (doc.hero ?? {}) as { stats?: HeroStat[]; [key: string]: unknown }
  const currentStats = Array.isArray(hero.stats) ? hero.stats : []

  const alreadyUpdated =
    currentStats.length === NEXT_STATS.length &&
    currentStats.every((stat, index) => stat.label === NEXT_STATS[index].label)

  if (alreadyUpdated) {
    payload.logger.info('No change needed (hero stats already updated).')
    return
  }

  await payload.update({
    collection: 'site-pages',
    id: doc.id,
    data: {
      hero: {
        ...hero,
        stats: NEXT_STATS,
      },
      _status: 'published' as never,
    },
    draft: false,
  })

  payload.logger.info('Updated page: home (hero stats).')
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    process.exit()
  })
