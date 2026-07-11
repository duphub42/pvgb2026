import { getPayload } from 'payload'
import config from '@payload-config'

import { corporateIdentityFaqFallback } from '@/components/CorporateIdentityFaqBox'
import { leistungenFaqFallback } from '@/components/LeistungenFaqBox'
import { portfolioFaqFallback } from '@/components/PortfolioFaqBox'
import { preiseFaqFallback } from '@/components/PreiseFaqBox'
import { profilFaqFallback } from '@/components/ProfilFaqBox'
import { contentFaqFallback, semFaqFallback, seoFaqFallback } from '@/components/ServiceFaqBoxes'
import { homeFaqFallback } from '@/components/ui/faq-8'
import { webdesignFaqFallback } from '@/components/WebdesignFaqBox'

const force = process.argv.includes('--force')
const onlyArg = process.argv.find((arg) => arg.startsWith('--only='))
const onlySlugs = onlyArg
  ? new Set(
      onlyArg
        .replace(/^--only=/, '')
        .split(',')
        .map((slug) => slug.trim())
        .filter(Boolean),
    )
  : null

const allTargets = [
  { slugs: ['home', 'Home'], fallback: homeFaqFallback },
  { slugs: ['leistungen', 'lei'], fallback: leistungenFaqFallback },
  {
    slugs: [
      'portfolio',
      'portfolio-webdesign',
      'portfolio-marketing',
      'portfolio-branding',
      'portfolio-marken',
    ],
    fallback: portfolioFaqFallback,
  },
  { slugs: ['preise'], fallback: preiseFaqFallback },
  { slugs: ['profil'], fallback: profilFaqFallback },
  { slugs: ['webdesign'], fallback: webdesignFaqFallback },
  { slugs: ['content'], fallback: contentFaqFallback },
  { slugs: ['sem'], fallback: semFaqFallback },
  { slugs: ['seo'], fallback: seoFaqFallback },
  {
    slugs: ['corporate-identity', 'ci-corporate-identity'],
    fallback: corporateIdentityFaqFallback,
  },
]

const targets = onlySlugs
  ? allTargets.filter((target) => target.slugs.some((slug) => onlySlugs.has(slug)))
  : allTargets

function toStableId(...parts: Array<number | string>): string {
  return parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function withStableFaqIds(
  slug: string,
  categories: (typeof allTargets)[number]['fallback']['categories'],
) {
  return categories.map((category, categoryIndex) => {
    const categoryId = toStableId(slug, 'faq-category', category.value || categoryIndex)

    return {
      ...category,
      id: categoryId,
      faqs: category.faqs.map((faq, faqIndex) => ({
        ...faq,
        id: toStableId(categoryId, 'faq', faqIndex + 1),
      })),
    }
  })
}

async function run() {
  const payload = await getPayload({ config })

  for (const target of targets) {
    const result = await payload.find({
      collection: 'site-pages',
      where: { slug: { in: target.slugs } },
      limit: 20,
      depth: 0,
      pagination: false,
      overrideAccess: true,
    })

    for (const page of result.docs) {
      const hasFaqCategories = Array.isArray(page.faq?.categories) && page.faq.categories.length > 0

      if (hasFaqCategories && !force) {
        payload.logger.info(
          `FAQ uebersprungen: ${page.slug ?? page.id} hat bereits CMS-Kategorien.`,
        )
        continue
      }

      await payload.update({
        collection: 'site-pages',
        id: page.id,
        data: {
          faq: {
            enabled: true,
            eyebrow: target.fallback.eyebrow,
            title: target.fallback.title,
            description: target.fallback.description,
            categories: withStableFaqIds(
              String(page.slug ?? target.slugs[0]),
              target.fallback.categories,
            ),
          },
        },
        overrideAccess: true,
      })

      payload.logger.info(`FAQ geschrieben: ${page.slug ?? page.id}`)
    }
  }
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
