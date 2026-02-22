/**
 * Import aus data/export/ in die Payload-DB.
 * Welche DB: aktuell konfiguriert (DATABASE_URL = Neon, sonst SQLite).
 *
 * – Lokal (SQLite): DATABASE_URL= POSTGRES_URL= npx tsx src/scripts/import-data.ts
 * – Neon überschreiben (lokale Daten einspielen): DATABASE_URL="postgresql://..." npx tsx src/scripts/import-data.ts --replace
 *
 * --replace: Zuerst alle Collections und Globals in der Zieldatenbank leeren, dann importieren.
 */

import './load-env-import'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const exportDir = path.resolve(__dirname, '../../data/export')
const mediaExportDir = path.join(exportDir, 'media')

const REPLACE = process.argv.includes('--replace')
const GLOBAL_SLUGS = ['header', 'footer', 'design', 'theme-settings'] as const

/** Verhindert revalidateTag/revalidatePath in Hooks (Skript läuft außerhalb von Next.js). */
const SCRIPT_CONTEXT = { skipRevalidate: true, disableRevalidate: true }

const MAX_SQLITE_RETRIES = 5
const SQLITE_RETRY_DELAY_MS = 2500

function isSqliteBusy(err: unknown): boolean {
  for (let e: unknown = err; e != null; e = (e as { cause?: unknown })?.cause) {
    const msg = e instanceof Error ? e.message : String(e)
    const code = (e as { code?: string })?.code
    const rawCode = (e as { rawCode?: number })?.rawCode
    if (code === 'SQLITE_BUSY' || rawCode === 5) return true
    if (/database is locked|SQLITE_BUSY/i.test(msg)) return true
  }
  return false
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const CACHE_TAGS = [
  'global_header',
  'global_footer',
  'global_design',
  'global_theme-settings',
  'mega-menu',
]

/** Ruft die Revalidate-API der lokalen App auf, damit Logo/Hero nach Import sofort sichtbar sind. */
async function revalidateFrontendCache(): Promise<void> {
  const base =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'
  const url = base.replace(/\/$/, '') + '/api/revalidate?' + CACHE_TAGS.map((t) => `tag=${encodeURIComponent(t)}`).join('&')
  const secret = process.env.REVALIDATE_SECRET?.trim()
  const finalUrl = secret ? `${url}&secret=${encodeURIComponent(secret)}` : url
  try {
    const res = await fetch(finalUrl, { method: 'GET', signal: AbortSignal.timeout(5000) })
    if (res.ok) {
      console.log('  Frontend-Cache invalidiert (Logo/Hero werden beim nächsten Aufruf neu geladen).')
    } else {
      console.log('  Hinweis: App-Cache nicht invalidiert (App evtl. nicht unter', base + '). Logo/Hero nach Neustart von "pnpm run dev" sichtbar.')
    }
  } catch {
    console.log('  Hinweis: App läuft evtl. nicht – Logo/Hero nach Start von "pnpm run dev" sichtbar oder Seite neu laden.')
  }
}

type IdMap = Record<number, number>

function stripMeta(doc: Record<string, unknown>): Record<string, unknown> {
  const { id, createdAt, updatedAt, ...rest } = doc
  return rest
}

function mapRelations(
  obj: unknown,
  idMaps: Record<string, IdMap>,
  fieldToCollection: Record<string, string>,
  currentPath = '',
): unknown {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) {
    return obj.map((item, i) =>
      mapRelations(item, idMaps, fieldToCollection, `${currentPath}[${i}]`),
    )
  }
  if (typeof obj === 'number') {
    for (const [coll, map] of Object.entries(idMaps)) {
      if (obj in map) return map[obj as number]
    }
    return obj
  }
  if (typeof obj === 'object') {
    const ref = obj as Record<string, unknown>
    if (
      'relationTo' in ref &&
      typeof ref.relationTo === 'string' &&
      'value' in ref &&
      typeof ref.value === 'number' &&
      ref.relationTo in idMaps
    ) {
      const newId = idMaps[ref.relationTo][ref.value as number]
      return { ...ref, value: newId ?? ref.value }
    }
    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(ref)) {
      const nextPath = currentPath ? `${currentPath}.${key}` : key
      const collectionHint = fieldToCollection[key]
      if (collectionHint && idMaps[collectionHint] && typeof val === 'number') {
        out[key] = idMaps[collectionHint][val] ?? val
      } else {
        out[key] = mapRelations(val, idMaps, fieldToCollection, nextPath)
      }
    }
    return out
  }
  return obj
}

const FIELD_TO_COLLECTION: Record<string, string> = {
  heroImage: 'media',
  image: 'media',
  logo: 'media',
  media: 'media',
  backgroundImage: 'media',
  backgroundVideo: 'media',
  foregroundImage: 'media',
  parent: 'site-pages',
  author: 'users',
  contactForm: 'forms',
}

const RELATION_COLLECTIONS = new Set(['site-pages', 'blog-posts', 'media', 'users', 'forms'])

/** Exportierte Select-Werte manchmal als "\"value\"" gespeichert – auf "value" normalisieren. */
function unwrapQuotedString(val: unknown): unknown {
  if (typeof val !== 'string') return val
  const t = val.trim()
  if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) return t.slice(1, -1).replace(/^"|"$/g, '')
  return val
}

const HEADER_GRID_TOTAL = 12

/** Header-Global: Mega-Menü-Karten-Stil und Spaltenbreiten für Import korrigieren. */
function normalizeHeaderGlobal(data: Record<string, unknown>): Record<string, unknown> {
  const keys = [
    'megaMenuCardBorderRadius',
    'megaMenuCardShadow',
    'megaMenuCardHoverShadow',
    'megaMenuCardHoverBorder',
  ] as const
  const out = { ...data }
  for (const k of keys) {
    if (k in out) out[k] = unwrapQuotedString(out[k])
  }
  const layout = out.megaMenuLayout
  if (layout && typeof layout === 'object' && layout !== null) {
    const l = layout as Record<string, unknown>
    const a = toHeaderCol(l.sidebarCols)
    const b = toHeaderCol(l.contentCols)
    const c = toHeaderCol(l.featuredCols)
    const sum = a + b + c
    if (sum !== HEADER_GRID_TOTAL) {
      out.megaMenuLayout = {
        sidebarCols: 3,
        contentCols: 6,
        featuredCols: 3,
      }
    } else {
      out.megaMenuLayout = { sidebarCols: a, contentCols: b, featuredCols: c }
    }
  }
  return out
}

function toHeaderCol(val: unknown): number {
  if (val == null || val === '') return 3
  const n = typeof val === 'string' ? parseInt(val, 10) : Number(val)
  if (!Number.isFinite(n) || n < 1 || n > 12) return 3
  return n
}

/** Zahl 1–12 oder null für Spaltenbreiten (Schema min/max). */
function toColWidth(val: unknown): number | null {
  if (val == null || val === '') return null
  const n = typeof val === 'string' ? parseInt(val, 10) : Number(val)
  if (!Number.isFinite(n)) return null
  if (n >= 1 && n <= 12) return n
  return null
}

/** Entfernt id aus allen Objekten, die in Arrays liegen (Payload erzeugt beim Create neue IDs). */
function stripNestedIds(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (item != null && typeof item === 'object') {
        const o = { ...(item as Record<string, unknown>) }
        delete o.id
        return stripNestedIds(o) as Record<string, unknown>
      }
      return item
    })
  }
  if (typeof obj === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(obj)) {
      out[k] = stripNestedIds(v)
    }
    return out
  }
  return obj
}

/** Mega-Menü: Select- und Zahlenfelder für Import korrigieren (Anführungszeichen, String→Zahl). */
function normalizeMegaMenuItem(data: Record<string, unknown>): Record<string, unknown> {
  const out = { ...data }

  const highlight = data.highlight
  if (highlight && typeof highlight === 'object' && highlight !== null && 'position' in highlight) {
    out.highlight = { ...(highlight as Record<string, unknown>) }
    ;(out.highlight as Record<string, unknown>).position = unwrapQuotedString(
      (highlight as Record<string, unknown>).position,
    )
  }

  const cw = data.columnWidths
  if (cw && typeof cw === 'object' && cw !== null) {
    const cwObj = cw as Record<string, unknown>
    out.columnWidths = {
      col1: toColWidth(cwObj.col1),
      col2: toColWidth(cwObj.col2),
      col3: toColWidth(cwObj.col3),
    }
  }

  const columns = data.columns
  if (Array.isArray(columns)) {
    out.columns = columns.map((col) => {
      if (!col || typeof col !== 'object') return col
      const row = { ...(col as Record<string, unknown>) }
      if ('columnWidth' in row) row.columnWidth = toColWidth(row.columnWidth)
      if ('columnBackground' in row)
        row.columnBackground = unwrapQuotedString(row.columnBackground)
      return row
    })
  }

  return out
}

/** Entfernt Relation-Referenzen, deren Ziel-ID noch nicht importiert wurde (nicht in idMaps). */
function clearInvalidRelations(
  obj: unknown,
  idMaps: Record<string, IdMap>,
): unknown {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) {
    return obj.map((item) => clearInvalidRelations(item, idMaps))
  }
  if (typeof obj === 'object') {
    const o = obj as Record<string, unknown>
    if (
      'relationTo' in o &&
      typeof (o as { relationTo?: string }).relationTo === 'string' &&
      'value' in o
    ) {
      const ref = o as { relationTo: string; value: number }
      if (RELATION_COLLECTIONS.has(ref.relationTo)) {
        const map = idMaps[ref.relationTo]
        const validIds = new Set(Object.values(map))
        if (ref.value != null && !validIds.has(ref.value)) {
          return { ...ref, value: null }
        }
      }
      return obj
    }
    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(o)) {
      out[key] = clearInvalidRelations(val, idMaps)
    }
    return out
  }
  return obj
}

/** Minimale Platzhalter-Datei, wenn Media-Datei nicht vorhanden ist (z. B. Export nur mit relativer URL). */
function placeholderMediaFile(
  filename: string,
  mimeType?: string | null,
): { name: string; data: Buffer; mimetype: string; size: number } {
  const name = filename || 'placeholder.bin'
  const mt = mimeType || 'application/octet-stream'
  let data: Buffer
  if (mt === 'image/svg+xml' || name.endsWith('.svg')) {
    data = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>', 'utf-8')
  } else if (mt.startsWith('image/')) {
    data = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    )
  } else {
    data = Buffer.alloc(0)
  }
  return { name, data, mimetype: mt, size: data.length }
}

async function main() {
  if (!fs.existsSync(exportDir)) {
    console.error(
      'Ordner data/export/ nicht gefunden. Zuerst exportieren: DATABASE_URL= POSTGRES_URL= npx tsx src/scripts/export-data.ts',
    )
    process.exit(1)
  }

  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
    console.log('Zieldatenbank: Postgres (DATABASE_URL/POSTGRES_URL gesetzt).')
  } else {
    console.log('Zieldatenbank: SQLite (lokal).')
  }

  let lastErr: unknown
  for (let attempt = 1; attempt <= MAX_SQLITE_RETRIES; attempt++) {
    if (attempt > 1) {
      console.log(`\nWiederholung ${attempt}/${MAX_SQLITE_RETRIES} (nach Datenbank-Sperre)...`)
      await sleep(SQLITE_RETRY_DELAY_MS)
    }
    console.log('Lade Payload...')
    const payload = await getPayload({ config })

    try {
      await runImport(payload)
      console.log('\nImport fertig. Lokale App mit npm run dev starten und prüfen.')
      if (!fs.existsSync(mediaExportDir) || fs.readdirSync(mediaExportDir).length === 0) {
        console.log(
          '  Hinweis: Bilder/Icons fehlen evtl., weil der Export keine Mediendateien enthielt. Beim nächsten Mal zuerst exportieren (kopiert Dateien nach data/export/media/), dann importieren.',
        )
      }
      const pwdHint = process.env.IMPORT_USER_PASSWORD
        ? 'Passwort aus Umgebungsvariable IMPORT_USER_PASSWORD'
        : "Admin-Passwort (nicht im Export): ChangeMeAfterImport1! – nach dem Login im Admin unter Nutzer ändern."
      console.log('  ' + pwdHint)
      await revalidateFrontendCache()
      process.exit(0)
    } catch (e) {
      lastErr = e
      if (attempt < MAX_SQLITE_RETRIES && isSqliteBusy(e)) {
        console.warn(
          `Datenbank gesperrt (SQLITE_BUSY). Warte ${SQLITE_RETRY_DELAY_MS}ms vor nächstem Versuch...`,
        )
        continue
      }
      throw e
    }
  }
  throw lastErr
}

async function runImport(payload: Awaited<ReturnType<typeof getPayload>>) {
  if (REPLACE) {
    console.log('--replace: Leere Zieldatenbank...')
    const collectionsToClear = [
      'media',
      'categories',
      'users',
      'site-pages',
      'blog-posts',
      'mega-menu',
      'redirects',
      'forms',
    ] as const
    for (const slug of collectionsToClear) {
      if (!payload.collections[slug]) continue
      try {
        const result = await payload.find({
          collection: slug,
          limit: 5000,
          depth: 0,
          pagination: false,
        })
        for (const doc of result.docs) {
          await payload.delete({ collection: slug, id: doc.id, depth: 0, context: SCRIPT_CONTEXT })
        }
        if (result.docs.length > 0) {
          console.log(`  ${slug}: ${result.docs.length} Einträge gelöscht`)
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        if (!/relation .* does not exist|no such table/i.test(msg)) throw e
      }
    }
    for (const slug of GLOBAL_SLUGS) {
      if (!payload.globals?.config?.find((g) => g.slug === slug)) continue
      try {
        const resetData: Record<string, unknown> = {}
        if (slug === 'header') {
          resetData.megaMenuCardBorderRadius = 'rounded-lg'
          resetData.megaMenuCardShadow = 'shadow-sm'
          resetData.megaMenuCardHoverShadow = 'hover:shadow-md'
          resetData.megaMenuCardHoverBorder = 'hover:border-primary/40'
        }
        await payload.updateGlobal({
          slug: slug as 'header' | 'footer' | 'design' | 'theme-settings',
          data: resetData,
          overrideAccess: true,
          context: SCRIPT_CONTEXT,
        })
        console.log(`  Global "${slug}" zurückgesetzt`)
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        if (!/relation .* does not exist|no such table/i.test(msg)) throw e
      }
    }
    console.log('Zieldatenbank geleert.')
  }

  const idMaps: Record<string, IdMap> = {
    media: {},
    categories: {},
    users: {},
    'site-pages': {},
    'blog-posts': {},
    'mega-menu': {},
    redirects: {},
    forms: {},
  }

  const order: (keyof typeof idMaps)[] = [
    'media',
    'categories',
    'users',
    'site-pages',
    'blog-posts',
    'mega-menu',
    'redirects',
    'forms',
  ]

  for (const slug of order) {
    const file = path.join(exportDir, `${slug}.json`)
    if (!fs.existsSync(file)) continue
    if (!payload.collections[slug]) continue

    const docs = JSON.parse(fs.readFileSync(file, 'utf-8')) as Record<string, unknown>[]
    if (!Array.isArray(docs) || docs.length === 0) {
      console.log(`  ${slug}: keine Einträge`)
      continue
    }

    for (const doc of docs) {
      let data = stripMeta(
        mapRelations(doc, idMaps, FIELD_TO_COLLECTION) as Record<string, unknown>,
      ) as Record<string, unknown>

      if (slug === 'users') {
        if (!data.password || typeof data.password !== 'string' || data.password.length < 8) {
          data.password =
            process.env.IMPORT_USER_PASSWORD || 'ChangeMeAfterImport1!'
        }
        delete data.sessions
        delete data.collection
      }

      const emptyLexicalRoot = {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [],
              direction: null,
            },
          ],
        },
      }
      if (slug === 'site-pages') {
        if (!data.title || (typeof data.title === 'string' && !data.title.trim())) {
          data.title = `Seite ${doc.id}`
        }
        if (!data.slug || (typeof data.slug === 'string' && !data.slug.trim())) {
          data.slug = `seite-${doc.id}`
        }
        // Als veröffentlicht importieren, damit sie im Admin unter „Seiten“ sichtbar sind
        if (data._status !== 'published') data._status = 'published'
        if (!Array.isArray(data.layout)) data.layout = []
        if (data.layout.length === 0) {
          data.layout = [
            {
              blockType: 'content',
              columns: [
                {
                  size: 'full',
                  richText: emptyLexicalRoot,
                },
              ],
            },
          ]
        }
        // IDs in layout/hero-Arrays entfernen, Payload erzeugt sie beim Create
        data = stripNestedIds(data) as Record<string, unknown>
        const existingPageIds = new Set(Object.values(idMaps['site-pages']))
        const parentId = data.parent != null && typeof data.parent === 'number' ? data.parent : null
        if (parentId != null && !existingPageIds.has(parentId)) {
          data.parent = null
        }
        data = clearInvalidRelations(data, idMaps) as Record<string, unknown>
        const hero = data.hero as Record<string, unknown> | undefined
        if (hero?.links && Array.isArray(hero.links)) {
          hero.links = hero.links.filter((item: unknown) => {
            const link = (item as Record<string, unknown>)?.link as { reference?: { value?: number | null } } | undefined
            if (link?.reference && link.reference.value == null) return false
            return true
          })
        }
      }

      if (slug === 'blog-posts') {
        if (!data.title || (typeof data.title === 'string' && !data.title.trim())) {
          data.title = `Beitrag ${doc.id}`
        }
        if (!data.slug || (typeof data.slug === 'string' && !data.slug.trim())) {
          data.slug = `beitrag-${doc.id}`
        }
        data = clearInvalidRelations(data, idMaps) as Record<string, unknown>
      }

      if (slug === 'mega-menu') {
        data = normalizeMegaMenuItem(data) as Record<string, unknown>
        data = stripNestedIds(data) as Record<string, unknown>
      }

      delete data.id

      let file: { name: string; data: Buffer; mimetype: string; size: number } | undefined
      if (slug === 'media') {
        const filename = (doc.filename as string) || `media-${doc.id}.bin`
        const id = doc.id as number
        const localPath = path.join(mediaExportDir, `${id}-${filename}`)
        if (fs.existsSync(localPath)) {
          try {
            const data = fs.readFileSync(localPath)
            file = {
              name: filename,
              data,
              mimetype: (doc.mimeType as string) || 'application/octet-stream',
              size: data.length,
            }
          } catch {
            // fallback below
          }
        }
        if (!file) {
          const url = doc.url && typeof doc.url === 'string' ? doc.url : ''
          const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://')
          if (isAbsoluteUrl) {
            try {
              const res = await fetch(url)
              if (res.ok) {
                const buf = Buffer.from(await res.arrayBuffer())
                file = {
                  name: filename,
                  data: buf,
                  mimetype: (doc.mimeType as string) || 'application/octet-stream',
                  size: buf.length,
                }
              }
            } catch {
              // fetch fehlgeschlagen
            }
          }
        }
        if (!file) {
          file = placeholderMediaFile(filename, doc.mimeType as string | null)
        }
      }

      try {
        const created = await payload.create({
          collection: slug,
          data: data as never,
          file,
          depth: 0,
          context: SCRIPT_CONTEXT,
        })
        idMaps[slug][doc.id as number] = created.id
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        if (slug === 'users' && data.email && typeof data.email === 'string') {
          try {
            const existing = await payload.find({
              collection: 'users',
              where: { email: { equals: data.email } },
              limit: 1,
              depth: 0,
            })
            if (existing.docs.length > 0) {
              idMaps.users[doc.id as number] = existing.docs[0].id as number
              continue
            }
          } catch {
            // find fehlgeschlagen
          }
        }
        const dataSlug = data.slug && typeof data.slug === 'string' ? data.slug : null
        const slugCollections = ['categories', 'site-pages', 'blog-posts', 'mega-menu']
        if (dataSlug && slugCollections.includes(slug)) {
          try {
            const existing = await payload.find({
              collection: slug as 'categories' | 'site-pages' | 'blog-posts' | 'mega-menu',
              where: { slug: { equals: dataSlug } },
              limit: 1,
              depth: 0,
            })
            if (existing.docs.length > 0) {
              idMaps[slug][doc.id as number] = existing.docs[0].id as number
              continue
            }
          } catch {
            // find fehlgeschlagen, weiter mit throw
          }
        }
        console.error(`  [${slug}] Fehler bei ID ${doc.id}: ${msg}`)
        throw err
      }
    }
    console.log(`  ${slug}: ${docs.length} importiert`)
  }

  const pagesFile = path.join(exportDir, 'site-pages.json')
  if (fs.existsSync(pagesFile)) {
    const pageDocs = JSON.parse(fs.readFileSync(pagesFile, 'utf-8')) as Record<string, unknown>[]
    let parentsRestored = 0
    for (const doc of pageDocs) {
      const oldParent = doc.parent != null && typeof doc.parent === 'number' ? doc.parent : null
      if (oldParent == null) continue
      const newPageId = idMaps['site-pages'][doc.id as number]
      const newParentId = idMaps['site-pages'][oldParent]
      if (newPageId != null && newParentId != null) {
        await payload.update({
          collection: 'site-pages',
          id: newPageId,
          data: { parent: newParentId },
          depth: 0,
          context: SCRIPT_CONTEXT,
        })
        parentsRestored += 1
      }
    }
    if (parentsRestored > 0) {
      console.log(`  site-pages: ${parentsRestored} Parent-Links nachgezogen`)
    }
  }

  const globalsPath = path.join(exportDir, 'globals.json')
  if (fs.existsSync(globalsPath)) {
    const globalsData = JSON.parse(fs.readFileSync(globalsPath, 'utf-8')) as Record<
      string,
      Record<string, unknown>
    >
    for (const slug of GLOBAL_SLUGS) {
      const data = globalsData[slug]
      if (!data || typeof data !== 'object') continue
      if (!payload.globals?.config?.find((g) => g.slug === slug)) continue
      let mapped = mapRelations(
        stripMeta(data),
        idMaps,
        FIELD_TO_COLLECTION,
      ) as Record<string, unknown>
      if (slug === 'header') mapped = normalizeHeaderGlobal(mapped)
      await payload.updateGlobal({
        slug: slug as 'header' | 'footer' | 'design' | 'theme-settings',
        data: mapped as never,
        overrideAccess: true,
        context: SCRIPT_CONTEXT,
      })
      console.log(`  Global "${slug}" aktualisiert`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
