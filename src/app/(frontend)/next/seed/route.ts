import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

const isProduction = process.env.NODE_ENV === 'production'
const seedSecret = process.env.SEED_SECRET?.trim() || process.env.CRON_SECRET?.trim()
const allowedSeedEmails = new Set(
  (process.env.SEED_ALLOWED_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
)

function userEmailAllowed(email: unknown): boolean {
  if (typeof email !== 'string' || !email.trim()) return false
  if (allowedSeedEmails.size === 0) return false
  return allowedSeedEmails.has(email.trim().toLowerCase())
}

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const providedSecret =
    requestHeaders.get('x-seed-secret') || requestHeaders.get('x-cron-secret') || ''

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  if (isProduction) {
    if (!seedSecret || seedSecret.length < 12) {
      return new Response(
        'Seed endpoint not configured. Set SEED_SECRET (or CRON_SECRET) with at least 12 characters.',
        { status: 503 },
      )
    }
    if (providedSecret !== seedSecret) {
      return new Response('Action forbidden.', { status: 403 })
    }
    if (!userEmailAllowed(user.email)) {
      return new Response(
        'Seed endpoint requires allowlisted user email (SEED_ALLOWED_EMAILS or ADMIN_EMAIL).',
        { status: 403 },
      )
    }
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
