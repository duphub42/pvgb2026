'use client'

import React from 'react'

import { LogoWithGlitch } from './LogoWithGlitch'

export interface LogoWithGlitchWrapperProps {
  /** When true, show text scramble + glitch ("Philipp Bacher"). When false, show image glitch with children. */
  useTextLogo: boolean
  /** Image URL for glitch layers when useTextLogo is false. */
  logoUrl: string
  variant?: 'header' | 'footer'
  darkBackground?: boolean
  children?: React.ReactNode
}

/**
 * Client wrapper for LogoWithGlitch used from server (e.g. Footer).
 * Server passes pre-rendered Logo as children when useTextLogo is false.
 */
export function LogoWithGlitchWrapper({
  useTextLogo,
  logoUrl,
  variant = 'footer',
  darkBackground = false,
  children,
}: LogoWithGlitchWrapperProps) {
  if (useTextLogo) {
    return (
      <LogoWithGlitch
        textLogo="Philipp Bacher"
        variant={variant}
        darkBackground={darkBackground}
      />
    )
  }
  return (
    <LogoWithGlitch imgSrc={logoUrl} variant={variant} darkBackground={darkBackground}>
      {children}
    </LogoWithGlitch>
  )
}
