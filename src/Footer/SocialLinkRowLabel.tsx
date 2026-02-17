'use client'

import type { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React from 'react'

const platformLabels: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  facebook: 'Facebook',
  instagram: 'Instagram',
}

export const SocialLinkRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['socialLinks']>[number]>()
  const platform = data?.data?.platform
  const num = data?.rowNumber != null ? data.rowNumber + 1 : ''
  const label = platform ? platformLabels[platform] ?? platform : 'Social'
  return <div>{`${label} ${num}`}</div>
}
