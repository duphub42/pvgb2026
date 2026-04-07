import React from 'react'

import type { ContactInfoCardsBlock as ContactInfoCardsBlockData } from '@/payload-types'
import { ContactInfoCards } from '@/components/ContactInfoCards'

type Props = ContactInfoCardsBlockData & { disableInnerContainer?: boolean }

export const ContactInfoCardsBlock: React.FC<Props> = ({
  disableInnerContainer: _disableInnerContainer,
  cards,
  ctaLabel,
  ctaHref,
}) => {
  return (
    <div className="container">
      <ContactInfoCards cards={cards} ctaLabel={ctaLabel} ctaHref={ctaHref} />
    </div>
  )
}
