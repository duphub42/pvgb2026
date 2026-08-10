import React from 'react'

import { Faq8Client } from '@/components/ui/faq-8.client'
import type { FaqCategory, FaqIconName } from '@/components/ui/faq-8.data'
import { translateValueForLocale } from '@/i18n/translationOverlay'
import type { Locale } from '@/utilities/locale'

const FAQ_ICONS = new Set<FaqIconName>([
  'BriefcaseBusiness',
  'LockKeyhole',
  'CreditCard',
  'Headphones',
])

export type EditablePageFaq = {
  enabled?: boolean | null
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  categories?:
    | {
        value?: string | null
        label?: string | null
        icon?: string | null
        faqs?:
          | {
              question?: string | null
              answer?: string | null
            }[]
          | null
      }[]
    | null
}

export type PageFaqFallback = {
  categories: FaqCategory[]
  eyebrow: string
  title: string
  description: string
}

function slugifyFaqValue(value: string, index: number): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || `faq-${index + 1}`
}

function normalizeFaqCategories(faq?: EditablePageFaq | null): FaqCategory[] {
  return (faq?.categories ?? [])
    .map((category, categoryIndex) => {
      const label = category?.label?.trim()
      const faqs = (category?.faqs ?? [])
        .map((entry) => ({
          question: entry?.question?.trim() ?? '',
          answer: entry?.answer?.trim() ?? '',
        }))
        .filter((entry) => entry.question && entry.answer)

      if (!label || faqs.length === 0) return null

      const icon = FAQ_ICONS.has(category?.icon as FaqIconName)
        ? (category?.icon as FaqIconName)
        : 'BriefcaseBusiness'

      return {
        value: slugifyFaqValue(category?.value || label, categoryIndex),
        label,
        icon,
        faqs,
      }
    })
    .filter((category): category is FaqCategory => Boolean(category))
}

function buildFaqSchema(categories: FaqCategory[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    ),
  }
}

export function PageFaqBox({
  faq,
  fallback,
  locale = 'de',
}: {
  faq?: EditablePageFaq | null
  fallback: PageFaqFallback
  locale?: Locale
}): React.JSX.Element | null {
  const cmsCategories = normalizeFaqCategories(faq)
  if (faq?.enabled === false && cmsCategories.length > 0) return null

  const categories = translateValueForLocale(
    cmsCategories.length > 0 ? cmsCategories : fallback.categories,
    locale,
  )

  if (categories.length === 0) return null

  const eyebrow = translateValueForLocale(faq?.eyebrow?.trim() || fallback.eyebrow, locale)
  const title = translateValueForLocale(faq?.title?.trim() || fallback.title, locale)
  const description = translateValueForLocale(
    faq?.description?.trim() || fallback.description,
    locale,
  )

  return (
    <>
      <Faq8Client
        categories={categories}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(categories)) }}
      />
    </>
  )
}
