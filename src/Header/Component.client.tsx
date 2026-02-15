'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { MegaMenu, type MegaMenuItem } from '@/components/MegaMenu'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  megaMenuItems?: MegaMenuItem[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, megaMenuItems = [] }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const useMegaMenu = (data as Header & { useMegaMenu?: boolean })?.useMegaMenu === true && megaMenuItems.length > 0

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const logoEl = (
    <Link href="/" className="flex items-center shrink-0">
      <Logo
        loading="eager"
        priority="high"
        logo={data?.logo}
        darkBackground={theme === 'dark'}
      />
    </Link>
  )

  if (useMegaMenu) {
    return (
      <MegaMenu
        items={megaMenuItems}
        logo={logoEl}
        className={theme ? `data-theme:${theme}` : ''}
      />
    )
  }

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        {logoEl}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
