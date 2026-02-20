/**
 * Legt die Global-Dokumente (Header, Footer, Design) an, falls sie fehlen.
 * Behebt 404 / "Nothing found" bei GET /admin/globals/header etc.
 *
 * Einmal im Browser aufrufen: GET /api/init-globals
 * (oder: curl http://localhost:3000/api/init-globals)
 *
 * Wenn die DB ein veraltetes Schema hat (z. B. SQLite), zuerst Schema anpassen:
 * pnpm run db:reset  (löscht DB, legt alles neu an) oder pnpm run db:push
 * Siehe SQLITE-SETUP.md
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const GLOBAL_SLUGS = ['header', 'footer', 'design', 'theme-settings'] as const

function isSchemaError(e: unknown): boolean {
  const msg = e instanceof Error ? (e.cause as Error)?.message ?? e.message : String(e)
  return (
    /no such column/i.test(msg) ||
    /no such table/i.test(msg) ||
    /SQLITE_ERROR/i.test(String(e))
  )
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
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
