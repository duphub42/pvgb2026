'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

/** Hacker-Style: mehr Ziffern, Klammern, Code-Zeichen */
export const HACKER_CHARS = '01{}[]<>/\\|;:=*#@$%&_+-~`'

function randomCharFrom(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)]
}

/** Erzeugt ein zufälliges Wort der gleichen Länge wie das Original */
function scrambleWord(word: string, chars: string): string {
  return Array.from({ length: word.length }, () => randomCharFrom(chars)).join('')
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

interface WordSegment {
  original: string
  display: string
  isRevealed: boolean
  isWhitespace: boolean
}

export function ScrambleText({
  text,
  className,
  chars = CHARS,
  staggerMs = 200,
  scrambleDurationMs = 400,
  tickMs = 60,
  delayMs = 0,
  disableAnimation = false,
}: ScrambleTextProps) {
  const scrambleChars = useMemo(() => chars || CHARS, [chars])

  // Parse words once
  const parsedWords = useMemo(() => {
    return text.split(/(\s+)/).map((w) => ({
      text: w,
      isWhitespace: !w.trim(),
    }))
  }, [text])

  const actualWordCount = useMemo(
    () => parsedWords.filter((w) => !w.isWhitespace).length,
    [parsedWords],
  )

  // Use ref to store initial segments - persists across Strict Mode remounts
  const initialSegmentsRef = useRef<WordSegment[] | null>(null)

  // Generate initial segments only once per text change (not on every render)
  if (
    initialSegmentsRef.current === null ||
    initialSegmentsRef.current.length !== parsedWords.length
  ) {
    if (!text || actualWordCount === 0) {
      initialSegmentsRef.current = parsedWords.map((w) => ({
        original: w.text,
        display: w.text,
        isRevealed: true,
        isWhitespace: w.isWhitespace,
      }))
    } else {
      initialSegmentsRef.current = parsedWords.map((w) => ({
        original: w.text,
        display: w.isWhitespace ? w.text : scrambleWord(w.text, scrambleChars),
        isRevealed: w.isWhitespace,
        isWhitespace: w.isWhitespace,
      }))
    }
  }

  const [segments, setSegments] = useState<WordSegment[]>(initialSegmentsRef.current)
  const [isAnimating, setIsAnimating] = useState(() => {
    if (disableAnimation || !text || actualWordCount === 0) return false
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return true
  })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)
  const hasStartedRef = useRef(false)

  // Start animation
  useEffect(() => {
    // Skip if already started (React Strict Mode protection)
    if (hasStartedRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (disableAnimation || prefersReducedMotion || !text || actualWordCount === 0) {
      setIsAnimating(false)
      return
    }

    hasStartedRef.current = true
    setIsAnimating(true)

    // Start animation after delay
    const timeoutId = setTimeout(() => {
      startTimeRef.current = performance.now()

      const tick = () => {
        const elapsed = performance.now() - startTimeRef.current
        let wordIndex = 0
        let allRevealed = true

        setSegments((prev) => {
          const next = prev.map((seg) => {
            if (seg.isWhitespace || seg.isRevealed) return seg

            const revealAt = wordIndex * staggerMs + scrambleDurationMs
            const scrambleStart = wordIndex * staggerMs

            if (elapsed >= revealAt) {
              wordIndex++
              return { ...seg, display: seg.original, isRevealed: true }
            }

            allRevealed = false
            wordIndex++

            if (elapsed >= scrambleStart) {
              // Still scrambling - update random chars
              return { ...seg, display: scrambleWord(seg.original, scrambleChars) }
            }
            // Not started yet - keep scrambled
            return seg
          })
          return next
        })

        const totalDuration = actualWordCount * staggerMs + scrambleDurationMs + 50
        if (elapsed >= totalDuration || allRevealed) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setIsAnimating(false)
          // Ensure all are revealed
          setSegments((prev) =>
            prev.map((seg) =>
              seg.isWhitespace ? seg : { ...seg, display: seg.original, isRevealed: true },
            ),
          )
        }
      }

      // Clear any existing interval
      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = setInterval(tick, tickMs)
      tick() // First tick immediately
    }, delayMs)

    return () => {
      clearTimeout(timeoutId)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [
    text,
    actualWordCount,
    scrambleChars,
    staggerMs,
    scrambleDurationMs,
    tickMs,
    delayMs,
    disableAnimation,
  ])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return (
    <span className={cn('inline', className)} aria-label={text}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={cn(
            'inline',
            seg.isWhitespace && 'whitespace-pre',
            isAnimating && !seg.isRevealed && 'opacity-90',
          )}
        >
          {seg.display}
        </span>
      ))}
    </span>
  )
}
