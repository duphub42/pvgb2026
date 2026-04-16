'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
export const HACKER_CHARS = '01{}[]<>/\\|;:=*#@$%&_+-~`'

function randomCharFrom(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)]
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
}: ScrambleTextProps) {
  const scrambleChars = useMemo(() => chars || CHARS, [chars])
  const textLen = text?.length || 0

  // SSR-safe: empty initial, scramble happens client-side in effect
  const [display, setDisplay] = useState<string>('')
  const [isComplete, setIsComplete] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    setDisplay(Array.from({ length: textLen }, () => randomCharFrom(scrambleChars)).join(''))

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now()

      const tick = () => {
        const elapsed = performance.now() - startTime
        let allRevealed = true

        const newDisplay = Array.from({ length: textLen }, (_, i) => {
          const revealAt = i * staggerMs + scrambleDurationMs
          if (elapsed >= revealAt) return text[i]
          allRevealed = false
          return randomCharFrom(scrambleChars)
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
  ])

  if (disableAnimation || !text) {
    return <span className={cn('inline', className)}>{text}</span>
  }

  if (isComplete) {
    return <span className={cn('inline', className)}>{text}</span>
  }

  return (
    <span className={cn('relative inline-block', className)} aria-label={text}>
      {/* Placeholder hält den Platz mit finaler Schrift */}
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      {display && (
        <span
          className="absolute inset-0 font-mono whitespace-nowrap"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {display}
        </span>
      )}
    </span>
  )
}
