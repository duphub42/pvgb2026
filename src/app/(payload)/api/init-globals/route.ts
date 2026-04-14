/**
 * Legt die Global-Dokumente (Header, Footer, Design) an, falls sie fehlen.
 * Behebt 404 / "Nothing found" bei GET /admin/globals/header etc.
 *
 * Aufruf: GET /api/init-globals
 * - development: mit Auth-Cookie ODER ?secret=<INIT_GLOBALS_SECRET|CRON_SECRET>
 * - production: mit Auth-Cookie (Admin) UND Secret
 *
 * Wenn die DB ein veraltetes Schema hat (z. B. SQLite), zuerst Schema anpassen:
 * pnpm run db:reset  (löscht DB, legt alles neu an) oder pnpm run db:push
 * Siehe SQLITE-SETUP.md
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

const GLOBAL_SLUGS = ['header', 'footer', 'design', 'theme-settings'] as const
const isProduction = process.env.NODE_ENV === 'production'
const initGlobalsSecret =
  process.env.INIT_GLOBALS_SECRET?.trim() || process.env.CRON_SECRET?.trim()
const normalizedInitGlobalsSecret = initGlobalsSecret ?? ''
const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
)

function isSchemaError(e: unknown): boolean {
  const msg = e instanceof Error ? (e.cause as Error)?.message ?? e.message : String(e)
  return (
    /no such column/i.test(msg) ||
    /no such table/i.test(msg) ||
    /SQLITE_ERROR/i.test(String(e))
  )
}

function isAllowedAdminUser(user: unknown): boolean {
  if (!user || typeof user !== 'object') return false
  const maybeUser = user as { email?: unknown; roles?: unknown }
  const hasAdminRole =
    Array.isArray(maybeUser.roles) &&
    maybeUser.roles.some((role) => typeof role === 'string' && role.toLowerCase() === 'admin')
  if (hasAdminRole) return true
  if (typeof maybeUser.email !== 'string' || !maybeUser.email.trim()) return false
  if (adminEmails.size === 0) return false
  return adminEmails.has(maybeUser.email.trim().toLowerCase())
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: request.headers })
    const providedSecret =
      request.nextUrl.searchParams.get('secret') ||
      request.headers.get('x-init-globals-secret') ||
      request.headers.get('x-cron-secret') ||
      ''
    const hasValidSecret =
      normalizedInitGlobalsSecret.length >= 12 &&
      providedSecret === normalizedInitGlobalsSecret

    if (isProduction) {
      if (!hasValidSecret || !isAllowedAdminUser(user)) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Unauthorized. In production: pass a valid secret and authenticate as admin user.',
          },
          { status: 403 },
        )
      }
    } else if (!user && !hasValidSecret) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Unauthorized. Provide auth cookie or valid secret in development.',
        },
        { status: 403 },
      )
    }

    const results: Record<string, 'created' | 'exists' | 'error'> = {}
    let schemaErrorCount = 0

    for (const slug of GLOBAL_SLUGS) {
      try {
        let hasDoc = false
        try {
          const existing = await payload.findGlobal({ slug, depth: 0 })
          hasDoc = Boolean(
            existing &&
              typeof existing === 'object' &&
              'id' in existing &&
              (existing as { id: unknown }).id != null,
          )
        } catch (findErr) {
          if (isSchemaError(findErr)) schemaErrorCount++
          hasDoc = false
        }

        if (!hasDoc) {
          await payload.updateGlobal({
            slug,
            data: {},
            overrideAccess: true,
          })
          results[slug] = 'created'
        } else {
          results[slug] = 'exists'
        }
      } catch (e) {
        results[slug] = 'error'
        if (isSchemaError(e)) schemaErrorCount++
        console.error(`[init-globals] ${slug}:`, e)
      }
    }

    const schemaOutOfDate = schemaErrorCount > 0
    return NextResponse.json({
      ok: !schemaOutOfDate,
      message: schemaOutOfDate
        ? 'DB-Schema ist veraltet. Bitte zuerst Schema anpassen (siehe actionRequired).'
        : 'Globals initialisiert. Admin-Seite (Header/Footer/Design) neu laden.',
      results,
      ...(schemaOutOfDate && {
        actionRequired: 'Führe im Projektordner aus: pnpm run db:reset (dann pnpm dev). Siehe SQLITE-SETUP.md',
      }),
    })
  } catch (e) {
    console.error('[init-globals]', e)
    const schemaOutOfDate = isSchemaError(e)
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : String(e),
        actionRequired: schemaOutOfDate
          ? 'pnpm run db:reset (DB zurücksetzen) oder pnpm run db:push. Siehe SQLITE-SETUP.md'
          : 'SQLite: pnpm run db:reset. Postgres: pnpm exec payload migrate.',
      },
      { status: 500 },
    )
  }
}
