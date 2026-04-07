export const FORM_SPAM_META_FIELDS = {
  honeypot: '__form_honeypot',
  startedAt: '__form_started_at',
} as const

export const FORM_SPAM_MIN_SUBMIT_MS = 3000
export const FORM_SPAM_MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000

export type SubmissionDataItem = {
  field: string
  value: unknown
}

export type SubmissionMetaItem = {
  field: string
  value: string
}

type SubmissionDataCandidate = {
  field?: unknown
  value?: unknown
}

const toStringValue = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (value == null) return ''
  return String(value)
}

const isSubmissionDataCandidate = (value: unknown): value is SubmissionDataCandidate => {
  return typeof value === 'object' && value !== null
}

export const buildFormSpamMetaSubmissionData = ({
  honeypotValue,
  startedAt,
}: {
  honeypotValue: string
  startedAt: number
}): SubmissionMetaItem[] => {
  return [
    {
      field: FORM_SPAM_META_FIELDS.honeypot,
      value: honeypotValue,
    },
    {
      field: FORM_SPAM_META_FIELDS.startedAt,
      value: String(Math.trunc(startedAt)),
    },
  ]
}

export const extractAndStripFormSpamMeta = (submissionData: unknown): {
  cleanSubmissionData: SubmissionDataItem[]
  honeypotValue: string | null
  startedAtValue: string | null
} => {
  const cleanSubmissionData: SubmissionDataItem[] = []
  let honeypotValue: string | null = null
  let startedAtValue: string | null = null

  if (!Array.isArray(submissionData)) {
    return { cleanSubmissionData, honeypotValue, startedAtValue }
  }

  for (const entry of submissionData) {
    if (!isSubmissionDataCandidate(entry)) continue

    const fieldName = typeof entry.field === 'string' ? entry.field : ''
    if (!fieldName) continue

    const value = entry.value

    if (fieldName === FORM_SPAM_META_FIELDS.honeypot) {
      honeypotValue = toStringValue(value)
      continue
    }

    if (fieldName === FORM_SPAM_META_FIELDS.startedAt) {
      startedAtValue = toStringValue(value)
      continue
    }

    cleanSubmissionData.push({
      field: fieldName,
      value,
    })
  }

  return {
    cleanSubmissionData,
    honeypotValue,
    startedAtValue,
  }
}
