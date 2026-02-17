'use client'

import type { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React from 'react'

type LinkRow = NonNullable<NonNullable<Footer['columns']>[number]['links']>[number]

export const FooterLinkRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<LinkRow>()
  const text = data?.data?.linkText
  const num = data?.rowNumber != null ? data.rowNumber + 1 : ''
  return <div>{text ? `Link ${num}: ${text}` : `Link ${num}`}</div>
}
