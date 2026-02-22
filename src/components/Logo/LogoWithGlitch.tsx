'use client'

import { Code2, Terminal, Braces, Binary, Zap, Globe, Skull, Star, Eye, Heart } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { PixelTransitionOverlay } from '@/components/PixelTransitionOverlay/PixelTransitionOverlay'
import { ScrambleText, HACKER_CHARS } from '@/components/ScrambleText/ScrambleText'
import { cn } from '@/utilities/ui'

const GLITCH_DURATION_MS = 1500
/** Nach ca. 5 s startet die Pixel-Transition zum B-Icon (React-Bits-Style) */
const PIXEL_TRANSITION_DELAY_MS = 5000
/** Dauer der Aufklapp-Animation (muss mit CSS übereinstimmen) */
const EXPAND_DURATION_MS = 450
/** Icons für den Icon-Scramble (läuft parallel zum Glitch, nur im Icon-Bereich) */
const SCRAMBLE_ICONS = [Zap, Globe, Skull, Star, Eye, Heart] as const
const SCRAMBLE_ICON_TICK_MS = 55
/** Pixel-Transition wie https://www.reactbits.dev/animations/pixel-transition */
const PIXEL_TRANSITION_GRID_SIZE = 18
const PIXEL_TRANSITION_DURATION_MS = 900

export interface LogoWithGlitchProps {
  className?: string
  /** Image mode: render children (Logo) and two clone layers with this src for glitch */
  imgSrc?: string | null
  /** Text mode: render scramble + glitch with this text (e.g. "Philipp Bacher") */
  textLogo?: string | null
  /** Size context for text logo styling */
  variant?: 'header' | 'footer'
  /** For text logo: invert for dark backgrounds */
  darkBackground?: boolean
  children?: React.ReactNode
}

/**
 * Logo: Beim Laden einmal Glitch/Scramble, dann reduziert auf Icon (Mask). Bei Hover gleitet das volle Logo heraus.
 */
export function LogoWithGlitch({
  className,
  imgSrc,
  textLogo,
  variant = 'header',
  darkBackground = false,
  children,
}: LogoWithGlitchProps) {
  const [glitchActive, setGlitchActive] = useState(false)
  const [scrambleKey, setScrambleKey] = useState(0)
  const [iconScrambleIndex, setIconScrambleIndex] = useState(0)
  const [initialRunDone, setInitialRunDone] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [pixelTransitionOut, setPixelTransitionOut] = useState(false)
  const initialTransitionRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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
      /* Bereits einmal gelaufen: Klasse kurz abziehen, damit die CSS-Animation beim erneuten Setzen neu startet (wie am Anfang) */
      setGlitchActive(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(startGlitchState)
      })
    } else {
      hasRunGlitchRef.current = true
      startGlitchState()
    }
  }, [])

  const collapsed = initialRunDone && !isHovered

  /* Icon-Scramble: parallel zum Glitch, nur im Icon-Bereich – Icons wechseln während glitchActive */
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
      setIconScrambleIndex((i) => Math.floor(Math.random() * SCRAMBLE_ICONS.length))
    }, SCRAMBLE_ICON_TICK_MS)
    return () => {
      if (iconScrambleIntervalRef.current) {
        clearInterval(iconScrambleIntervalRef.current)
        iconScrambleIntervalRef.current = null
      }
    }
  }, [glitchActive])

  const startGlitch = useCallback(() => {
    if (expandDelayRef.current) {
      clearTimeout(expandDelayRef.current)
      expandDelayRef.current = null
    }
    if (stayVisibleTimeoutRef.current) {
      clearTimeout(stayVisibleTimeoutRef.current)
      stayVisibleTimeoutRef.current = null
    }
    if (collapsed) {
      /* Glitch erst nach dem Aufklappen starten (collapsed ist bei uns nie true – Logo wird nicht verkleinert) */
      expandDelayRef.current = setTimeout(() => {
        expandDelayRef.current = null
        runGlitch(textLogo != null)
      }, EXPAND_DURATION_MS)
    } else {
      runGlitch(textLogo != null)
    }
  }, [runGlitch, textLogo, collapsed])

  const handlePixelTransitionComplete = useCallback(() => {
    setPixelTransitionOut(false)
    setInitialRunDone(true)
    setIsHovered(false)
  }, [])

  useEffect(() => {
    runGlitch(textLogo != null)
    /* Nach ca. 5 s: Pixel-Transition starten (nur Text-Logo), danach B-Icon anzeigen */
    if (textLogo != null) {
      initialTransitionRef.current = setTimeout(() => {
        initialTransitionRef.current = null
        setPixelTransitionOut(true)
      }, PIXEL_TRANSITION_DELAY_MS)
    } else {
      const t = setTimeout(() => {
        setInitialRunDone(true)
        setIsHovered(false)
      }, PIXEL_TRANSITION_DELAY_MS)
      return () => clearTimeout(t)
    }
    return () => {
      if (initialTransitionRef.current) {
        clearTimeout(initialTransitionRef.current)
        initialTransitionRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- only on mount

  const scrambleProps = {
    text: textLogo ?? '',
    chars: HACKER_CHARS,
    staggerMs: 40,
    scrambleDurationMs: 380,
    tickMs: 30,
    delayMs: 0,
  }

  const textSizeClass =
    variant === 'footer'
      ? 'text-base sm:text-lg md:text-xl'
      : 'text-xl sm:text-2xl'

  /** Im versteckten Modus: 1px-Punkt (Fallback) oder Logo-Icon (philippbacher-logo-b) */
  const collapsedDot = (
    <span
      className="logo-glitch-collapsed-dot"
      aria-hidden
    />
  )
  /** Eingeklapptes Text-Logo: echtes Logo-Icon (B) aus philippbacher-logo-b.svg, inline für currentColor */
  const collapsedLogoIcon = (
    <span className="logo-glitch-collapsed-icon" aria-hidden>
      <svg viewBox="0 0 91.48 88" fill="currentColor" className="logo-glitch-collapsed-icon-svg">
        <path d="M0,21.19h59.87c1.44,0,3.49,2.12,3.66,3.64.54,5.14-4.24,9.49-9.2,9.56l-42.55.14L0,87.99h20.13l8.66-33.67,36.64-.15c7.35,1.44,3.28,10.67-1.83,12.4-3.13.99-15.83,1.02-20.69,1.28l-6.02,20.14h23.49s9.05.53,19.45-8.31c10.41-8.86,16.86-29.18,6.08-40.1-.55-.56-2.94-2.12-2.98-2.31-.14-.68,2.27-5.98,2.63-7.4C89.23,15.39,80.01,2.16,65.42.03l-60.71-.03L0,21.19Z" />
      </svg>
    </span>
  )

  const CurrentScrambleIcon = SCRAMBLE_ICONS[iconScrambleIndex] ?? Zap
  /** Icon-Scramble: nur im Icon-Bereich (linker Streifen), sichtbar nur während Glitch */
  const iconScrambleLayer = (
    <div
      className="logo-glitch-icon-scramble pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center"
      aria-hidden
    >
      <CurrentScrambleIcon
        className="logo-glitch-icon-scramble-current text-current"
        strokeWidth={2}
      />
    </div>
  )

  const hackerIcons = (
    <div
      className={cn(
        'logo-glitch-icons pointer-events-none absolute inset-0',
        glitchActive && 'logo-glitch-icons-visible',
      )}
      aria-hidden
    >
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
        className={cn(
          'logo-glitch-wrapper logo-glitch-text',
          variant === 'footer' && 'logo-glitch-footer',
          glitchActive && 'logo-glitch-active',
          collapsed && 'logo-glitch-collapsed',
          pixelTransitionOut && 'logo-pixel-transition-active',
          darkBackground && 'logo-contrast logo-contrast-dark-bg',
          className,
        )}
        onMouseEnter={() => {
          setIsHovered(true)
          startGlitch()
        }}
        onMouseLeave={() => {
          if (expandDelayRef.current) {
            clearTimeout(expandDelayRef.current)
            expandDelayRef.current = null
          }
          if (stayVisibleTimeoutRef.current) {
            clearTimeout(stayVisibleTimeoutRef.current)
            stayVisibleTimeoutRef.current = null
          }
        }}
        role="presentation"
      >
        {collapsedDot}
        {collapsedLogoIcon}
        {pixelTransitionOut && (
          <PixelTransitionOverlay
            key="pixel-out"
            active={true}
            onComplete={handlePixelTransitionComplete}
            gridSize={PIXEL_TRANSITION_GRID_SIZE}
            durationMs={PIXEL_TRANSITION_DURATION_MS}
          />
        )}
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

  const imageWrapperSizeClass =
    variant === 'footer'
      ? 'max-w-[6rem] h-[28px] sm:max-w-[7.5rem] sm:h-[30px] md:max-w-[9.375rem] md:h-[34px]'
      : 'w-full max-w-[11.7rem] h-[42.5px]'

  const layerInvertClass = darkBackground ? 'logo-contrast logo-contrast-dark-bg' : ''

  if (imgSrc && children) {
    return (
      <div
        className={cn(
          'logo-glitch-wrapper relative logo-glitch-image',
          variant === 'footer' && 'logo-glitch-footer',
          imageWrapperSizeClass,
          glitchActive && 'logo-glitch-active',
          collapsed && 'logo-glitch-collapsed',
          className,
        )}
        onMouseEnter={() => {
          setIsHovered(true)
          startGlitch()
        }}
        onMouseLeave={() => {
          if (expandDelayRef.current) {
            clearTimeout(expandDelayRef.current)
            expandDelayRef.current = null
          }
          if (stayVisibleTimeoutRef.current) {
            clearTimeout(stayVisibleTimeoutRef.current)
            stayVisibleTimeoutRef.current = null
          }
          /* Logo wird nicht verkleinert */
        }}
        role="presentation"
      >
        {collapsedDot}
        {iconScrambleLayer}
        {hackerIcons}
        <img
          src={imgSrc}
          alt=""
          aria-hidden
          className={cn('logo-glitch-layer logo-glitch-layer-1', layerInvertClass)}
        />
        <img
          src={imgSrc}
          alt=""
          aria-hidden
          className={cn('logo-glitch-layer logo-glitch-layer-2', layerInvertClass)}
        />
        <div className="logo-glitch-main flex items-center shrink-0">
          {children}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
