'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
export const HACKER_CHARS = '01{}[]<>/\\|;:=*#@$%&_+-~`'

function randomCharFrom(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)]
}

function randomCharForTarget(targetChar: string, chars: string) {
  if (!targetChar) return randomCharFrom(chars)
  if (/\s/.test(targetChar)) return targetChar
  return randomCharFrom(chars)
}

type ScrambleTextProps = {
  text: string
  className?: string
  chars?: string
  staggerMs?: number
  scrambleDurationMs?: number
  tickMs?: number
  delayMs?: number
  disableAnimation?: boolean
  useMonospaceOverlay?: boolean
  startFromText?: boolean
}

export function ScrambleText({
  text,
  className,
  chars = CHARS,
  staggerMs = 50,
  scrambleDurationMs = 450,
  tickMs = 40,
  delayMs = 0,
  disableAnimation = false,
  useMonospaceOverlay = true,
  startFromText = false,
}: ScrambleTextProps) {
  const scrambleChars = useMemo(() => chars || CHARS, [chars])
  const textLen = text?.length || 0

  // SSR-safe: empty initial, scramble happens client-side in effect
  const [display, setDisplay] = useState<string>('')
  const [isComplete, setIsComplete] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const contentClassName = cn('block w-full whitespace-nowrap overflow-hidden', className)

  // Alles in einem Effect – kein hasStartedRef nötig
  useEffect(() => {
    if (disableAnimation || !text) return

    // Cleanup vorheriger Animation (Strict Mode Guard)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsComplete(false)

    // Reduced Motion: sofort fertig
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplay(text)
      setIsComplete(true)
      return
    }

    // Client-side only: scramble text (SSR-safe)
    if (typeof window === 'undefined') return
    setDisplay(
      startFromText
        ? text
        : Array.from({ length: textLen }, (_, i) => randomCharForTarget(text[i], scrambleChars)).join(
            '',
          ),
    )

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now()

      const tick = () => {
        const elapsed = performance.now() - startTime
        let allRevealed = true

        const newDisplay = Array.from({ length: textLen }, (_, i) => {
          const revealAt = i * staggerMs + scrambleDurationMs
          if (elapsed >= revealAt) return text[i]
          allRevealed = false
          if (startFromText && Math.random() < 0.42) return text[i]
          return randomCharForTarget(text[i], scrambleChars)
        }).join('')

        setDisplay(newDisplay)

        const totalDuration = textLen * staggerMs + scrambleDurationMs + 50
        if (elapsed >= totalDuration || allRevealed) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setDisplay(text)
          setIsComplete(true)
        }
      }

      intervalRef.current = setInterval(tick, tickMs)
      tick()
    }, delayMs)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    // text als direkter Trigger – kein animationKey-Wrapper mehr nötig
  }, [
    text,
    textLen,
    scrambleChars,
    disableAnimation,
    staggerMs,
    scrambleDurationMs,
    tickMs,
    delayMs,
    startFromText,
  ])

  if (disableAnimation || !text || isComplete) {
    return (
      <span className="relative inline-grid overflow-hidden align-baseline" aria-label={text}>
        <span className={cn('[grid-area:1/1]', contentClassName)}>{text}</span>
      </span>
    )
  }

  return (
    <span className="relative inline-grid overflow-hidden align-baseline" aria-label={text}>
      {/* Placeholder hält den Platz mit finaler Schrift */}
      <span className={cn('invisible [grid-area:1/1]', contentClassName)} aria-hidden="true">
        {text}
      </span>
      {display && (
        <span
          className={cn(
            '[grid-area:1/1]',
            contentClassName,
            useMonospaceOverlay && 'font-mono',
          )}
          style={useMonospaceOverlay ? { fontVariantNumeric: 'tabular-nums' } : undefined}
        >
          {display}
        </span>
      )}
    </span>
  )
}
