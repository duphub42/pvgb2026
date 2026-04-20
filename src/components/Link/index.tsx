import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import * as Icons from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'

import type { SitePage, BlogPost } from '@/payload-types'

/** Fallback wenn next/link im Client-Bundle undefined ist (verhindert "Cannot read properties of undefined (reading 'call')"). */
function LinkFallback(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return <a {...props} href={props.href ?? '#'} />
}
const Link = NextLink ?? LinkFallback

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

  // Default sizing behavior:
  // - If appearance is 'link' -> keep default size
  // - If caller provided a size -> use it
  // - If variant resolves to 'cta' (hero/main CTA) and no size provided -> use the larger 'cta' size
  // - Otherwise fall back to Button default
  const size: ButtonProps['size'] =
    resolvedAppearance === 'link'
      ? 'default'
      : (sizeFromProps ?? (buttonVariant === 'cta' ? 'cta' : 'default'))
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const iconRegistry = Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>

  const resolveLucideIcon = (
    name?: string | null,
  ): React.ComponentType<{ size?: number }> | null => {
    const value = (name ?? '').trim()
    if (!value) return null

    const normalized = value
      .replace(/^lucide[-_: ]*/i, '')
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    const pascal = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : ''

    return iconRegistry[value] ?? iconRegistry[pascal] ?? null
  }

  /* Get Lucide icon component if specified */
  const IconComponent = resolveLucideIcon(icon)

  const ChevronRight = Icons.ChevronRight
  const ArrowUpRight = Icons.ArrowUpRight

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
  const IconSwapFrom = resolveLucideIcon(iconSwapFrom) ?? IconComponent ?? ChevronRight
  const IconSwapTo = resolveLucideIcon(iconSwapTo) ?? ArrowUpRight

  const buttonContent = shouldEnableIconSwap ? (
    <>
      {linkContent}
      <span className="megamenu-special-icon-swap inline-flex shrink-0">
        <span className="megamenu-special-icon-layer megamenu-special-icon-layer--a">
          <IconSwapFrom size={16} />
        </span>
        <span className="megamenu-special-icon-layer megamenu-special-icon-layer--b">
          <IconSwapTo size={16} />
        </span>
      </span>
    </>
  ) : IconComponent ? (
    <>
      {linkContent}
      <IconComponent size={16} />
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
