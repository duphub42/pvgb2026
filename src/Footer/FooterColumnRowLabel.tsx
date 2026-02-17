'use client'

import type { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const FooterColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['columns']>[number]>()
  const title = data?.data?.columnTitle
  const num = data?.rowNumber != null ? data.rowNumber + 1 : ''
  return <div>{title ? `Spalte ${num}: ${title}` : `Spalte ${num}`}</div>
}
