import React from 'react'
import { PageFaqBox, type EditablePageFaq } from '@/components/PageFaqBox'
import { faqCategories } from '@/components/ui/faq-8.data'
import type { Locale } from '@/utilities/locale'

export const homeFaqFallback = {
  categories: faqCategories,
  eyebrow: 'FAQ',
  title: 'Häufige Fragen für Ihren Website-Launch und Ihre digitale Wachstumsstrategie',
  description:
    'Klare Antworten zu Leistungen, Projektablauf, Budget und Support. So wissen Sie sofort, wie ich Ihre Website, SEO und Conversion nachhaltig verbessern kann.',
}

export function Faq8({
  faq,
  locale = 'de',
}: {
  faq?: EditablePageFaq | null
  locale?: Locale
}): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={homeFaqFallback} locale={locale} />
}

export default Faq8
