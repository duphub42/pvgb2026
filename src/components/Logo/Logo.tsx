import clsx from 'clsx'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

const FALLBACK_LOGO_SRC =
  'https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** Logo aus dem Header-Global (Media-Upload). Wenn gesetzt, wird dieses statt des Standard-Logos angezeigt. */
  logo?: MediaType | number | null
}

const logoSizeClass = 'max-w-[9.375rem] w-full h-[34px] object-contain object-left'

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logo } = props

  const loading = loadingFromProps ?? 'lazy'
  const priority = priorityFromProps ?? 'low'

  if (logo && typeof logo === 'object' && 'url' in logo) {
    return (
      <Media
        resource={logo}
        imgClassName={clsx(logoSizeClass, className)}
        loading={loading}
        priority={priority}
        alt={(logo as MediaType).alt ?? 'Logo'}
      />
    )
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(logoSizeClass, className)}
      src={FALLBACK_LOGO_SRC}
    />
  )
}
