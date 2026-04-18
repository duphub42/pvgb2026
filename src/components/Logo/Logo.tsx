import clsx from 'clsx'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: MediaType | number | null
  // FIX: darkBackground wird noch akzeptiert aber ignoriert —
  // Theme-Anpassung läuft jetzt vollständig über CSS (data-theme).
  // Prop bleibt für Rückwärtskompatibilität erhalten.
  darkBackground?: boolean
  disableAnimation?: boolean
  variant?: 'header' | 'footer'
}

const logoSizeClass =
  'w-full max-w-[8.5rem] sm:max-w-[10.5rem] h-[30px] sm:h-[38px] object-contain object-left lg:max-w-[5.6rem] xl:max-w-[11.5rem] xl:h-[43px]'
const logoSizeFooterClass =
  'max-w-[8rem] h-[36px] sm:max-w-[9.5rem] sm:h-[40px] md:max-w-[11rem] md:h-[44px]'

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    logo,
    variant = 'header',
    disableAnimation,
  } = props

  const loading = loadingFromProps ?? 'lazy'
  const priority = priorityFromProps ?? 'low'

  // FIX: Immer logo-contrast setzen — CSS in globals.css steuert
  // automatisch ob invert(1) oder none je nach data-theme.
  // Kein darkBackground-Prop mehr nötig.
  const invertClass = 'logo-contrast'
  const sizeClass = variant === 'footer' ? logoSizeFooterClass : logoSizeClass
  const animateClass = disableAnimation ? undefined : 'logo-animate'

  if (logo && typeof logo === 'object' && 'url' in logo) {
    return (
      <Media
        resource={logo}
        imgClassName={clsx(sizeClass, invertClass, animateClass, className)}
        loading={loading}
        priority={priority === 'high'}
        alt={(logo as MediaType).alt ?? 'Logo'}
        disableBlurPlaceholder
      />
    )
  }

  return null
}
