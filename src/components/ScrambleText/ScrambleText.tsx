'use client'

import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/** Hacker-Style: mehr Ziffern, Klammern, Code-Zeichen */
export const HACKER_CHARS = '01{}[]<>/\\|;:=*#@$%&_+-~`'

function randomCharFrom(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)]
}

type ScrambleTextProps = {
  text: string
  className?: string
  /** Zeichensatz für Scramble (z. B. HACKER_CHARS). Ohne = Standard. */
  chars?: string
  /** Verzögerung pro Zeichen in ms (Stagger) */
  staggerMs?: number
  /** Dauer pro Zeichen im Scramble-Zustand in ms, danach wird der Endbuchstabe angezeigt */
  scrambleDurationMs?: number
  /** Intervall zum Ersetzen der Zufallszeichen in ms */
  tickMs?: number
  /** Verzögerung bis die Animation startet */
  delayMs?: number
}

/**
 * Zeigt Text mit Scramble-Effekt: Zufallszeichen wechseln, dann Einblendung des echten Zeichens (von links nach rechts).
 * Orientierung an GSAP ScrambleText / CodePen GreenSock.
 */
export function ScrambleText({
  text,
  className,
  chars = CHARS,
  staggerMs = 50,
  scrambleDurationMs = 450,
  tickMs = 40,
  delayMs = 0,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  const run = useCallback(() => {
    if (!text) {
      setDisplay('')
      return
    }
    const len = text.length
    const scrambleChars = chars || CHARS
    startTimeRef.current = performance.now()

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current
      const next: string[] = []
      for (let i = 0; i < len; i++) {
        const revealAt = i * staggerMs + scrambleDurationMs
        if (elapsed >= revealAt) {
          next.push(text[i])
        } else if (elapsed >= i * staggerMs) {
          next.push(randomCharFrom(scrambleChars))
        } else {
          next.push(' ')
        }
      }
      const str = next.join('')
      setDisplay(str)
      if (elapsed >= len * staggerMs + scrambleDurationMs + 50) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setDisplay(text)
      }
    }

    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, tickMs)
    tick()
  }, [text, chars, staggerMs, scrambleDurationMs, tickMs])

  useEffect(() => {
    if (!text) {
      setDisplay('')
      return
    }
    setDisplay(' '.repeat(text.length))

    const t = setTimeout(() => run(), delayMs)
    return () => {
      clearTimeout(t)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text, delayMs, run])

  return (
    <span className={cn('inline-block', className)} aria-label={text}>
      {display || '\u00A0'}
    </span>
  )
}
