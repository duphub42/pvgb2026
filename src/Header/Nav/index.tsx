'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { HeaderActions } from '@/components/HeaderActions/HeaderActions'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="link" />
      ))}
      <HeaderActions />
    </nav>
  )
}
