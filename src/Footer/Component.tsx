import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer, Header } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  let footerData: Footer | null = null
  let headerData: Header | null = null
  try {
    ;[footerData, headerData] = await Promise.all([
      getCachedGlobal('footer', 1)(),
      getCachedGlobal('header', 1)(),
    ])
  } catch (err) {
    console.error('[Footer] Failed to load footer/header globals:', err)
  }
  const navItems = (footerData as Footer)?.navItems || []
  const logo = (headerData as Header)?.logo ?? null

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo logo={logo} darkBackground />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
