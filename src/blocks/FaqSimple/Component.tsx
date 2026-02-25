import React from 'react'

import { Faq5 } from '@/components/ui/faq-5'

// Konkreter Typ kommt nach payload generate:types (FaqSimpleBlock)
type FaqSimpleBlockProps = any

export const FaqSimpleBlock: React.FC<FaqSimpleBlockProps> = (props) => {
  const { badge, heading, description, faqs } = props ?? {}

  return (
    <Faq5
      badge={badge}
      heading={heading}
      description={description}
      faqs={faqs}
    />
  )
}

