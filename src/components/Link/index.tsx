import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { DynamicIcon, iconNames } from 'lucide-react/dynamic'
import NextLink from 'next/link'
import React from 'react'

import type { SitePage, BlogPost } from '@/payload-types'

/** Fallback wenn next/link im Client-Bundle undefined ist (verhindert "Cannot read properties of undefined (reading 'call')"). */
function LinkFallback(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return <a {...props} href={props.href ?? '#'} />
}
const Link = NextLink ?? LinkFallback

type LucideIconName = (typeof iconNames)[number]

const findLucideIconName = (candidate: string): LucideIconName | null => {
  const found = iconNames.find((iconName) => iconName === candidate)
  return found ?? null
}

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  /** When set, hero-style expand-icon animation (icon slides in on hover). Overrides appearance to expandIcon when not inline. */
  expandIcon?: 'left' | 'right'
  /** Lucide icon name (e.g., ArrowRight, Mail, Phone) */
  icon?: string | null
  /** When true, enables icon swap animation (ChevronRight → ArrowUpRight) */
  enableIconSwap?: boolean | null
  /** Swap icon shown before hover. Falls back to `icon`, then ChevronRight. */
  iconSwapFrom?: string | null
  /** Swap icon shown on hover. Falls back to ArrowUpRight. */
  iconSwapTo?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'site-pages' | 'blog-posts' | 'pages' | 'posts' // 'pages'/'posts' = legacy/cache
    value: SitePage | BlogPost | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    enableIconSwap,
    expandIcon: _expandIcon,
    icon,
    iconSwapFrom,
    iconSwapTo,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const relationTo = reference?.relationTo
  const isPage = relationTo === 'site-pages' || relationTo === 'pages'
  const isPost = relationTo === 'blog-posts' || relationTo === 'posts'
  const pathPrefix = isPage ? '' : isPost ? '/posts' : relationTo ? `/${relationTo}` : ''
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${pathPrefix}/${reference.value.slug}`
      : url

  if (!href) return null

  // Keep legacy stored value "default" but render it as the shared CTA style.
  const resolvedAppearance = appearance === 'default' ? 'cta' : appearance
  const buttonVariant: ButtonProps['variant'] =
    resolvedAppearance === 'inline' ? 'default' : resolvedAppearance
  const size = resolvedAppearance === 'link' ? 'default' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const resolveLucideIconName = (name?: string | null): LucideIconName | null => {
    const value = (name ?? '').trim()
    if (!value) return null

    const normalized = value
      .replace(/^lucide[-_: ]*/i, '')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[_\s]+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()

    const direct = value.toLowerCase()

    return findLucideIconName(value) ?? findLucideIconName(direct) ?? findLucideIconName(normalized)
  }

  const renderIcon = (name: LucideIconName) => {
    if (name === 'chevron-right') return <ChevronRight size={16} />
    if (name === 'arrow-up-right') return <ArrowUpRight size={16} />

    return <DynamicIcon name={name} size={16} />
  }

  /* Get Lucide icon component if specified */
  const iconName = resolveLucideIconName(icon)

  /* Ensure we don't break any styles set by richText */
  const linkContent =
    label && children ? (
      <span>
        {label}
        {children}
      </span>
    ) : (
      (children ?? label)
    )

  if (!linkContent) return null

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {linkContent}
      </Link>
    )
  }

  // Build content with icon swap animation if enabled
  const shouldEnableIconSwap = enableIconSwap ?? resolvedAppearance === 'cta'
  const iconSwapFromName = resolveLucideIconName(iconSwapFrom) ?? iconName ?? 'chevron-right'
  const iconSwapToName = resolveLucideIconName(iconSwapTo) ?? 'arrow-up-right'

  const buttonContent = shouldEnableIconSwap ? (
    <>
      {linkContent}
      <span className="megamenu-special-icon-swap inline-flex shrink-0">
        <span className="megamenu-special-icon-layer megamenu-special-icon-layer--a">
          {renderIcon(iconSwapFromName)}
        </span>
        <span className="megamenu-special-icon-layer megamenu-special-icon-layer--b">
          {renderIcon(iconSwapToName)}
        </span>
      </span>
    </>
  ) : iconName ? (
    <>
      {linkContent}
      {renderIcon(iconName)}
    </>
  ) : (
    linkContent
  )

  return (
    <Button asChild className={className} size={size} variant={buttonVariant}>
      <Link href={href || url || ''} {...newTabProps}>
        {buttonContent}
      </Link>
    </Button>
  )
}
