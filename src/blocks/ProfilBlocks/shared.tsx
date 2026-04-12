'use client'

import type React from 'react'
import Link from 'next/link'
import {
  Globe2,
  Layers,
  Target,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

export const WERT_ICON_MAP: Record<string, LucideIcon> = {
  strategy: Target,
  global: Globe2,
  depth: Layers,
  direct: UserRound,
}

export const LEVEL_PCT: Record<string, number> = {
  expert: 100,
  advanced: 72,
  basic: 40,
}

export const TOOL_CATEGORY_LABEL: Record<string, string> = {
  dev: 'Entwicklung',
  design: 'Design',
  analytics: 'Analytics',
  marketing: 'Marketing & Systeme',
  automation: 'Automatisierung & Projekte',
}

export function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:\/\//i.test(href)
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    )
  }
  return <Link href={href}>{children}</Link>
}
