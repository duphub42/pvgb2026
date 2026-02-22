/**
 * Entfernt verwaiste Referenzen auf nicht mehr existierende Dokumente (z. B. ID 21).
 * Behebt Fehler wie "document with ID X could not be found" und "id is invalid" beim Speichern.
 *
 * Aufruf: pnpm run fix:orphaned-refs [ID]
 *   Mit ID: entfernt Referenzen auf die angegebene ID (z. B. 21).
 *   Ohne ID: entfernt Referenzen auf ID 21 (häufiger Fall nach gelöschten Seiten).
 *
 * Benötigt: DATABASE_URL oder POSTGRES_URL in .env (Neon-URL).
 */

import './load-env-import'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
const targetId = process.argv[2] ? parseInt(process.argv[2], 10) : 21

if (!connectionString) {
  console.error('Fehler: DATABASE_URL oder POSTGRES_URL in .env setzen.')
  process.exit(1)
}

if (Number.isNaN(targetId)) {
  console.error('Fehler: Ungültige ID. Beispiel: pnpm run fix:orphaned-refs 21')
  process.exit(1)
}

/** Tabellen mit relationship-Spalten (site_pages_id, blog_posts_id, media_id) */
const RELS_TABLES = [
  'site_pages_rels',
  '_site_pages_v_rels',
  'header_rels',
  'footer_rels',
  'redirects_rels',
  'payload_locked_documents_rels',
  'blog_posts_rels',
  '_blog_posts_v_rels',
  'mega_menu_rels',
  'media_rels',
]

/** Tabellen mit direkter media_id / hero_media_id / meta_image_id Spalte */
const MEDIA_FK_TABLES: { table: string; col: string }[] = [
  { table: 'site_pages_blocks_media_block', col: 'media_id' },
  { table: '_site_pages_v_blocks_media_block', col: 'media_id' },
  { table: 'site_pages', col: 'hero_media_id' },
  { table: 'site_pages', col: 'meta_image_id' },
  { table: '_site_pages_v', col: 'hero_media_id' },
  { table: '_site_pages_v', col: 'meta_image_id' },
  { table: 'mega_menu', col: 'icon_id' },
  { table: 'mega_menu', col: 'image_id' },
  { table: 'mega_menu', col: 'highlight_image_id' },
  { table: 'mega_menu_sub_items', col: 'icon_id' },
  { table: 'mega_menu_sub_items', col: 'image_id' },
  { table: 'mega_menu_columns_items', col: 'icon_id' },
  { table: 'mega_menu_columns_items', col: 'image_id' },
  { table: 'mega_menu_columns_highlight_cards', col: 'image_id' },
]

async function main() {
  const pool = new Pool({ connectionString })

  try {
    console.log(`Entferne Referenzen auf ID ${targetId}…\n`)

    let totalFixed = 0

    for (const table of RELS_TABLES) {
      for (const col of ['site_pages_id', 'blog_posts_id', 'media_id']) {
        try {
          const res = await pool.query(
            `UPDATE "${table}" SET "${col}" = NULL WHERE "${col}" = $1`,
            [targetId],
          )
          if (res.rowCount && res.rowCount > 0) {
            console.log(`  ${table}.${col}: ${res.rowCount} Referenz(en) entfernt`)
            totalFixed += res.rowCount
          }
        } catch (err) {
          // Spalte oder Tabelle existiert evtl. nicht – ignorieren
        }
      }
    }

    for (const { table, col } of MEDIA_FK_TABLES) {
      try {
        const res = await pool.query(
          `UPDATE "${table}" SET "${col}" = NULL WHERE "${col}" = $1`,
          [targetId],
        )
        if (res.rowCount && res.rowCount > 0) {
          console.log(`  ${table}.${col}: ${res.rowCount} Referenz(en) entfernt`)
          totalFixed += res.rowCount
        }
      } catch {
        // skip
      }
    }

    if (totalFixed > 0) {
      console.log(`\nFertig. ${totalFixed} verwaiste Referenz(en) entfernt.`)
      console.log('Im Admin erneut speichern – betroffene Links ggf. neu setzen.')
    } else {
      console.log('Keine Referenzen auf ID', targetId, 'in den bekannten Tabellen gefunden.')
      console.log('Die ID könnte in JSONB-Feldern liegen (z. B. Lexical-Rich-Text).')
    }
  } finally {
    await pool.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
