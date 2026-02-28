import clsx from 'clsx'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

const FALLBACK_LOGO_SRC = '/media/weblogo-philippbacher.svg'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: MediaType | number | null
  // FIX: darkBackground wird noch akzeptiert aber ignoriert —
  // Theme-Anpassung läuft jetzt vollständig über CSS (data-theme).
  // Prop bleibt für Rückwärtskompatibilität erhalten.
  darkBackground?: boolean
  variant?: 'header' | 'footer'
}

const logoSizeClass = 'w-full max-w-[11.7rem] h-[42.5px] object-contain object-left'
const logoSizeFooterClass =
  'max-w-[8rem] h-[36px] sm:max-w-[9.5rem] sm:h-[40px] md:max-w-[11rem] md:h-[44px]'

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, logo, variant = 'header' } = props

  const loading = loadingFromProps ?? 'lazy'
  const priority = priorityFromProps ?? 'low'

  // FIX: Immer logo-contrast setzen — CSS in globals.css steuert
  // automatisch ob invert(1) oder none je nach data-theme.
  // Kein darkBackground-Prop mehr nötig.
  const invertClass = 'logo-contrast'
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
