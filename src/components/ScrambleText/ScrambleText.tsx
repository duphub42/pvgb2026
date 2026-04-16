'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

/** Hacker-Style: mehr Ziffern, Klammern, Code-Zeichen */
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

  const [display, setDisplay] = useState<string>('')
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (disableAnimation || !text || mountedRef.current) return
    mountedRef.current = true

    // Check reduced motion - show final text immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      setIsComplete(true)
      return
    }

    // Start immediately with scrambled text (no visible original text first)
    const initialScrambled = Array.from({ length: textLen }, () =>
      randomCharFrom(scrambleChars),
    ).join('')
    setDisplay(initialScrambled)
    setHasStarted(true)

    // Start reveal animation after delay
    const startTimeout = setTimeout(() => {
      const startTime = performance.now()

      const tick = () => {
        const elapsed = performance.now() - startTime
        let allRevealed = true

        const newDisplay = Array.from({ length: textLen }, (_, i) => {
          const revealAt = i * staggerMs + scrambleDurationMs

          if (elapsed >= revealAt) {
            return text[i]
          }

          allRevealed = false

          const scrambleStart = i * staggerMs
          if (elapsed >= scrambleStart) {
            return randomCharFrom(scrambleChars)
          }

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
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // No animation: show plain text
  if (disableAnimation || !text) {
    return <span className={cn('inline', className)}>{text}</span>
  }

  // Complete: show final text
  if (isComplete) {
    return <span className={cn('inline', className)}>{text}</span>
  }

  // Text builds from empty -> scrambled -> revealed
  return (
    <span
      className={cn('inline font-mono transition-all duration-300 ease-out', className)}
      aria-label={text}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </span>
  )
}
