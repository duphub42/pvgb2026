import clsx from 'clsx'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

/** Eigenes Logo (Philipp Bacher) – wird verwendet, wenn im Header-Global kein Logo gesetzt ist. */
const FALLBACK_LOGO_SRC = '/media/weblogo-philippbacher.svg'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /** Logo aus dem Header-Global (Media-Upload). Wenn gesetzt, wird dieses statt des Standard-Logos angezeigt. */
  logo?: MediaType | number | null
  /**
   * true = Hintergrund ist dunkel → Logo wird automatisch hell (invert) für Kontrast.
   * false/undefined = Hintergrund ist hell → Logo bleibt dunkel.
   * Empfehlung: Logo immer als „dunkle“ Version (für helle Hintergründe) hochladen.
   */
  darkBackground?: boolean
  /** 'footer' = kleinere, responsive Größen für Footer. */
  variant?: 'header' | 'footer'
}

const logoSizeClass =
  'w-full max-w-[11.7rem] h-[42.5px] object-contain object-left'
const logoSizeFooterClass =
  'max-w-[8rem] h-[36px] sm:max-w-[9.5rem] sm:h-[40px] md:max-w-[11rem] md:h-[44px]'

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    logo,
    darkBackground,
    variant = 'header',
  } = props

  const loading = loadingFromProps ?? 'lazy'
  const priority = priorityFromProps ?? 'low'
  // Logo-Kontrast: invert bei Dark Mode ODER bei darkBackground; eine Klasse, damit nie doppelt invertiert wird (siehe globals.css .logo-contrast)
  const invertClass = clsx('logo-contrast', darkBackground && 'logo-contrast-dark-bg')
  const sizeClass = variant === 'footer' ? logoSizeFooterClass : logoSizeClass
  const animateClass = 'logo-animate'

  if (logo && typeof logo === 'object' && 'url' in logo) {
    return (
      <Media
        resource={logo}
        imgClassName={clsx(sizeClass, invertClass, animateClass, className)}
        loading={loading}
        priority={priority === 'high'}
        alt={(logo as MediaType).alt ?? 'Logo'}
      />
    )
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Philipp Bacher"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(sizeClass, invertClass, animateClass, className)}
      src={FALLBACK_LOGO_SRC}
    />
  )
}
