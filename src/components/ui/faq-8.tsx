import React from 'react'
import { PageFaqBox, type EditablePageFaq } from '@/components/PageFaqBox'
import { faqCategories } from '@/components/ui/faq-8.data'

export const homeFaqFallback = {
  categories: faqCategories,
  eyebrow: 'FAQ',
  title: 'Häufige Fragen für Ihren Website-Launch und Ihre digitale Wachstumsstrategie',
  description:
    'Klare Antworten zu Leistungen, Projektablauf, Budget und Support. So wissen Sie sofort, wie ich Ihre Website, SEO und Conversion nachhaltig verbessern kann.',
}

export function Faq8({ faq }: { faq?: EditablePageFaq | null }): React.JSX.Element | null {
  return <PageFaqBox faq={faq} fallback={homeFaqFallback} />
}

export default Faq8
