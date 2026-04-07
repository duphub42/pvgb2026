import type { CSSProperties } from 'react'

type ScrambleTimingOptions = {
  delayMs?: number
  staggerMs?: number
  scrambleDurationMs?: number
  settleMs?: number
}

const DEFAULT_STAGGER_MS = 50
const DEFAULT_SCRAMBLE_DURATION_MS = 450
const DEFAULT_SETTLE_MS = 50

export function getScrambleRevealDurationMs(
  text: string | null | undefined,
  {
    delayMs = 0,
    staggerMs = DEFAULT_STAGGER_MS,
    scrambleDurationMs = DEFAULT_SCRAMBLE_DURATION_MS,
    settleMs = DEFAULT_SETTLE_MS,
  }: ScrambleTimingOptions = {},
): number {
  if (typeof text !== 'string' || text.length === 0) return 0
  return Math.max(0, delayMs + text.length * staggerMs + scrambleDurationMs + settleMs)
}

export function getScrambleLinesRevealDurationMs(
  lines: Array<{ text?: string | null; delayMs?: number | null }>,
  options: Omit<ScrambleTimingOptions, 'delayMs'> = {},
): number {
  if (!Array.isArray(lines) || lines.length === 0) return 0

  return lines.reduce((maxDuration, line) => {
    const duration = getScrambleRevealDurationMs(line?.text, {
      ...options,
      delayMs: line?.delayMs ?? 0,
    })
    return Math.max(maxDuration, duration)
  }, 0)
}

export function buildHeroCopyFadeStyle(
  headlineRevealMs: number,
  additionalDelayMs: number,
): CSSProperties | undefined {
  if (!Number.isFinite(headlineRevealMs) || headlineRevealMs <= 0) return undefined
  return {
    animationDelay: `${Math.max(0, headlineRevealMs + additionalDelayMs)}ms`,
  }
}
