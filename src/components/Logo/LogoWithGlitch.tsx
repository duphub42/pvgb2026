'use client'

import { Code2, Terminal, Braces, Binary, Zap, Globe, Skull, Star, Eye, Heart } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ScrambleText, HACKER_CHARS } from '@/components/ScrambleText/ScrambleText'
import { cn } from '@/utilities/ui'

const GLITCH_DURATION_MS = 1000
const SCRAMBLE_ICONS = [Zap, Globe, Skull, Star, Eye, Heart] as const
const SCRAMBLE_ICON_TICK_MS = 55

export interface LogoWithGlitchProps {
  className?: string
  imgSrc?: string | null
  textLogo?: string | null
  variant?: 'header' | 'footer'
  // FIX: darkBackground wird noch akzeptiert aber ignoriert —
  // invert läuft jetzt vollständig über CSS (data-theme).
  darkBackground?: boolean
  children?: React.ReactNode
}

export function LogoWithGlitch({
  className,
  imgSrc,
  textLogo,
  variant = 'header',
  // darkBackground ignoriert — CSS übernimmt
  children,
}: LogoWithGlitchProps) {
  const [glitchActive, setGlitchActive] = useState(false)
  const [scrambleKey, setScrambleKey] = useState(0)
  const [iconScrambleIndex, setIconScrambleIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iconScrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const expandDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stayVisibleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animatingRef = useRef(false)
  const hasRunGlitchRef = useRef(false)

  const runGlitch = useCallback((bumpScramble: boolean) => {
    if (animatingRef.current) return
    animatingRef.current = true
    if (bumpScramble) setScrambleKey((k) => k + 1)

    const startGlitchState = () => {
      setGlitchActive(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        setGlitchActive(false)
        animatingRef.current = false
      }, GLITCH_DURATION_MS)
    }

    if (hasRunGlitchRef.current) {
      setGlitchActive(false)
      requestAnimationFrame(() => requestAnimationFrame(startGlitchState))
    } else {
      hasRunGlitchRef.current = true
      startGlitchState()
    }
  }, [])

  useEffect(() => {
    if (!glitchActive) {
      if (iconScrambleIntervalRef.current) {
        clearInterval(iconScrambleIntervalRef.current)
        iconScrambleIntervalRef.current = null
      }
      return
    }
    setIconScrambleIndex((i) => (i + 1) % SCRAMBLE_ICONS.length)
    iconScrambleIntervalRef.current = setInterval(() => {
      setIconScrambleIndex(() => Math.floor(Math.random() * SCRAMBLE_ICONS.length))
    }, SCRAMBLE_ICON_TICK_MS)
    return () => {
      if (iconScrambleIntervalRef.current) {
        clearInterval(iconScrambleIntervalRef.current)
        iconScrambleIntervalRef.current = null
      }
    }
  }, [glitchActive])

  const startGlitch = useCallback(() => {
    if (expandDelayRef.current) { clearTimeout(expandDelayRef.current); expandDelayRef.current = null }
    if (stayVisibleTimeoutRef.current) { clearTimeout(stayVisibleTimeoutRef.current); stayVisibleTimeoutRef.current = null }
    runGlitch(textLogo != null)
  }, [runGlitch, textLogo])

  useEffect(() => {
    runGlitch(textLogo != null)
    return () => {}
  }, [runGlitch, textLogo])

  const scrambleProps = {
    text: textLogo ?? '',
    chars: HACKER_CHARS,
    staggerMs: 40,
    scrambleDurationMs: 380,
    tickMs: 30,
    delayMs: 0,
  }

  const textSizeClass = variant === 'footer' ? 'text-base sm:text-lg md:text-xl' : 'text-xl sm:text-2xl'
  const CurrentScrambleIcon = SCRAMBLE_ICONS[iconScrambleIndex] ?? Zap

  const iconScrambleLayer = (
    <div className="logo-glitch-icon-scramble pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center" aria-hidden>
      <CurrentScrambleIcon className="logo-glitch-icon-scramble-current text-current" strokeWidth={2} />
    </div>
  )

  const hackerIcons = (
    <div className={cn('logo-glitch-icons pointer-events-none absolute inset-0', glitchActive && 'logo-glitch-icons-visible')} aria-hidden>
      <Code2 className="logo-glitch-icon logo-glitch-icon-1" size={14} strokeWidth={2} style={{ top: '8%', left: '12%' }} />
      <Terminal className="logo-glitch-icon logo-glitch-icon-2" size={12} strokeWidth={2} style={{ top: '60%', left: '8%' }} />
      <Braces className="logo-glitch-icon logo-glitch-icon-3" size={13} strokeWidth={2} style={{ top: '15%', right: '15%' }} />
      <Binary className="logo-glitch-icon logo-glitch-icon-4" size={11} strokeWidth={2} style={{ bottom: '20%', right: '10%' }} />
      <Code2 className="logo-glitch-icon logo-glitch-icon-5" size={10} strokeWidth={2} style={{ top: '50%', left: '45%' }} />
    </div>
  )

  if (textLogo != null) {
    return (
      <div
        // FIX: logo-contrast immer gesetzt, kein darkBackground-conditional mehr
        className={cn(
          'logo-glitch-wrapper logo-glitch-text logo-contrast',
          variant === 'footer' && 'logo-glitch-footer',
          glitchActive && 'logo-glitch-active',
          className,
        )}
        onMouseEnter={() => startGlitch()}
        onMouseLeave={() => {
          if (expandDelayRef.current) { clearTimeout(expandDelayRef.current); expandDelayRef.current = null }
          if (stayVisibleTimeoutRef.current) { clearTimeout(stayVisibleTimeoutRef.current); stayVisibleTimeoutRef.current = null }
        }}
        role="presentation"
      >
        {iconScrambleLayer}
        {hackerIcons}
        <span className="logo-glitch-layer logo-glitch-layer-1" aria-hidden>
          <ScrambleText key={`${scrambleKey}-1`} {...scrambleProps} className={textSizeClass} />
        </span>
        <span className="logo-glitch-layer logo-glitch-layer-2" aria-hidden>
          <ScrambleText key={`${scrambleKey}-2`} {...scrambleProps} className={textSizeClass} />
        </span>
        <span className="logo-glitch-main">
          <ScrambleText key={`${scrambleKey}-0`} {...scrambleProps} className={textSizeClass} />
        </span>
      </div>
    )
  }

  const imageWrapperSizeClass = variant === 'footer' ? '' : 'w-full max-w-[11.7rem] h-[42.5px]'

  if (imgSrc && children) {
    const isFooterImage = variant === 'footer'
    return (
      <div
        /* logo-contrast nur auf dem inneren img (Logo), nicht auf dem Wrapper – sonst doppelte Inversion im Dark Mode (schwarz statt weiß). */
        className={cn(
          'logo-glitch-wrapper relative logo-glitch-image',
          variant === 'footer' && 'logo-glitch-footer',
          imageWrapperSizeClass,
          !isFooterImage && glitchActive && 'logo-glitch-active',
          className,
        )}
        onMouseEnter={isFooterImage ? undefined : () => startGlitch()}
        onMouseLeave={isFooterImage ? undefined : () => {
          if (expandDelayRef.current) { clearTimeout(expandDelayRef.current); expandDelayRef.current = null }
          if (stayVisibleTimeoutRef.current) { clearTimeout(stayVisibleTimeoutRef.current); stayVisibleTimeoutRef.current = null }
        }}
        role="presentation"
      >
        {!isFooterImage && iconScrambleLayer}
        {!isFooterImage && hackerIcons}
        {!isFooterImage && (
          <>
            {/* FIX: logo-contrast auf Glitch-Layern, kein layerInvertClass mehr */}
            <img src={imgSrc} alt="" aria-hidden className="logo-glitch-layer logo-glitch-layer-1 logo-contrast" />
            <img src={imgSrc} alt="" aria-hidden className="logo-glitch-layer logo-glitch-layer-2 logo-contrast" />
          </>
        )}
        <div className="logo-glitch-main flex items-center shrink-0">
          {children}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
