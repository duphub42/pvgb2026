import { APIError } from 'payload'
import type { CollectionBeforeValidateHook, PayloadRequest } from 'payload'

import {
  FORM_SPAM_MAX_FORM_AGE_MS,
  FORM_SPAM_MIN_SUBMIT_MS,
  extractAndStripFormSpamMeta,
} from '@/utilities/formSpamProtection'

const parsePositiveInteger = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const RATE_LIMIT_WINDOW_MS = parsePositiveInteger(process.env.FORM_SPAM_RATE_LIMIT_WINDOW_MS, 60_000)
const RATE_LIMIT_MAX_REQUESTS = parsePositiveInteger(
  process.env.FORM_SPAM_RATE_LIMIT_MAX_REQUESTS,
  5,
)
const RATE_LIMIT_MAX_KEYS = parsePositiveInteger(process.env.FORM_SPAM_RATE_LIMIT_MAX_KEYS, 5000)

const rateLimitStore = new Map<string, number[]>()

const getHeaderValue = (req: PayloadRequest, name: string): string => {
  const value = req.headers.get(name)
  return typeof value === 'string' ? value : ''
}

const getClientIP = (req: PayloadRequest): string => {
  const forwardedFor =
    getHeaderValue(req, 'x-forwarded-for') ||
    getHeaderValue(req, 'x-real-ip') ||
    getHeaderValue(req, 'cf-connecting-ip')

  if (!forwardedFor) return 'unknown'

  const first = forwardedFor.split(',')[0]?.trim()
  return first || 'unknown'
}

const cleanupRateLimitStore = (now: number): void => {
  if (rateLimitStore.size <= RATE_LIMIT_MAX_KEYS) return

  for (const [key, attempts] of rateLimitStore.entries()) {
    const activeAttempts = attempts.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)

    if (activeAttempts.length === 0) {
      rateLimitStore.delete(key)
    } else {
      rateLimitStore.set(key, activeAttempts)
    }

    if (rateLimitStore.size <= RATE_LIMIT_MAX_KEYS) return
  }
}

const enforceRateLimit = (key: string): void => {
  const now = Date.now()
  const recentAttempts = (rateLimitStore.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    throw new APIError('Zu viele Anfragen. Bitte in einer Minute erneut versuchen.', 429)
  }

  recentAttempts.push(now)
  rateLimitStore.set(key, recentAttempts)
  cleanupRateLimitStore(now)
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

export const formSubmissionAntiSpam: CollectionBeforeValidateHook = ({ data, operation, req }) => {
  if (operation !== 'create') return data

  const nextData: Record<string, unknown> = isRecord(data) ? data : {}
  const { cleanSubmissionData, honeypotValue, startedAtValue } = extractAndStripFormSpamMeta(
    nextData.submissionData,
  )

  nextData.submissionData = cleanSubmissionData

  if (honeypotValue == null || startedAtValue == null) {
    throw new APIError('Ungültige Formularanfrage.', 400)
  }

  if (honeypotValue.trim().length > 0) {
    throw new APIError('Ungültige Formularanfrage.', 400)
  }

  const startedAt = Number.parseInt(startedAtValue, 10)
  if (!Number.isFinite(startedAt)) {
    throw new APIError('Ungültige Formularanfrage.', 400)
  }

  const ageMs = Date.now() - startedAt
  if (ageMs < FORM_SPAM_MIN_SUBMIT_MS) {
    throw new APIError('Bitte Formular kurz ausfüllen und erneut senden.', 429)
  }

  if (ageMs < 0 || ageMs > FORM_SPAM_MAX_FORM_AGE_MS) {
    throw new APIError('Formular abgelaufen. Bitte Seite neu laden und erneut versuchen.', 400)
  }

  const formValue = nextData.form
  const formId =
    typeof formValue === 'number' || typeof formValue === 'string' ? String(formValue) : 'unknown'
  const ip = getClientIP(req)

  enforceRateLimit(`${formId}:${ip}`)

  return nextData
}
