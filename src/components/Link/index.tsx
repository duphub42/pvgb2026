import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

/** Fallback wenn next/link im Client-Bundle undefined ist (verhindert "Cannot read properties of undefined (reading 'call')"). */
function LinkFallback(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string },
) {
  return <a {...props} href={props.href ?? '#'} />
}
const Link = NextLink ?? LinkFallback

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  /** When set, hero-style expand-icon animation (icon slides in on hover). Overrides appearance to expandIcon when not inline. */
  expandIcon?: 'left' | 'right'
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'site-pages' | 'blog-posts' | 'pages' | 'posts' // 'pages'/'posts' = legacy/cache
    value: Page | Post | string | number
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
    expandIcon,
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

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
