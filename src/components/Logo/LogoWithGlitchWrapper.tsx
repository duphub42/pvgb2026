'use client'

import React from 'react'
import { LogoWithGlitch } from './LogoWithGlitch'

export interface LogoWithGlitchWrapperProps {
  useTextLogo: boolean
  logoUrl: string
  variant?: 'header' | 'footer'
  // FIX: darkBackground wird nicht mehr weitergegeben —
  // Logo-Inversion läuft vollständig über CSS (data-theme)
  darkBackground?: boolean
  children?: React.ReactNode
}

export function LogoWithGlitchWrapper({
  useTextLogo,
  logoUrl,
  variant = 'footer',
  // darkBackground bewusst ignoriert
  children,
}: LogoWithGlitchWrapperProps) {
  if (useTextLogo) {
    return <LogoWithGlitch textLogo="Philipp Bacher" variant={variant} />
  }
  return (
    <LogoWithGlitch imgSrc={logoUrl} variant={variant}>
      {children}
    </LogoWithGlitch>
  )
}
