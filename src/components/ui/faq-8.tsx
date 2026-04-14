import React from 'react'
import { Faq8Client } from '@/components/ui/faq-8.client'
import { faqCategories } from '@/components/ui/faq-8.data'

export function Faq8(): React.JSX.Element {
  return <Faq8Client categories={faqCategories} />
}

export default Faq8

