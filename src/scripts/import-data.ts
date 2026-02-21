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

const REPLACE = process.argv.includes('--replace')
const GLOBAL_SLUGS = ['header', 'footer', 'design', 'theme-settings'] as const

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

  console.log('Lade Payload...')
  const payload = await getPayload({ config })

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
          await payload.delete({ collection: slug, id: doc.id, depth: 0 })
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
        await payload.updateGlobal({
          slug: slug as 'header' | 'footer' | 'design' | 'theme-settings',
          data: {},
          overrideAccess: true,
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
      const data = stripMeta(
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
        if (!Array.isArray(data.layout)) data.layout = []
        if (data.layout.length === 0) {
          data.layout = [
            {
              blockType: 'content',
              id: `import-${doc.id}-block`,
              columns: [
                {
                  id: `import-${doc.id}-col`,
                  size: 'full',
                  richText: emptyLexicalRoot,
                },
              ],
            },
          ]
        }
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

      let file: { name: string; data: Buffer; mimetype: string; size: number } | undefined
      if (slug === 'media') {
        const url = doc.url && typeof doc.url === 'string' ? doc.url : ''
        const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://')
        if (isAbsoluteUrl) {
          try {
            const res = await fetch(url)
            if (res.ok) {
              const buf = Buffer.from(await res.arrayBuffer())
              const name = (doc.filename as string) || `media-${doc.id}.bin`
              file = {
                name,
                data: buf,
                mimetype: (doc.mimeType as string) || 'application/octet-stream',
                size: buf.length,
              }
            }
          } catch {
            // fetch fehlgeschlagen
          }
        }
        if (!file) {
          file = placeholderMediaFile(
            (doc.filename as string) || `media-${doc.id}.bin`,
            doc.mimeType as string | null,
          )
        }
      }

      try {
        const created = await payload.create({
          collection: slug,
          data: data as never,
          file,
          depth: 0,
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
      const mapped = mapRelations(
        stripMeta(data),
        idMaps,
        FIELD_TO_COLLECTION,
      ) as Record<string, unknown>
      await payload.updateGlobal({
        slug: slug as 'header' | 'footer' | 'design' | 'theme-settings',
        data: mapped as never,
        overrideAccess: true,
      })
      console.log(`  Global "${slug}" aktualisiert`)
    }
  }

  console.log('\nImport fertig. Lokale App mit npm run dev starten und prüfen.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
