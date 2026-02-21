/**
 * Neon/Postgres-Schema prüfen: Liest die aktuelle DB-Struktur und vergleicht sie
 * mit den von Payload (Collections/Globals) erwarteten Spalten.
 *
 * Aufruf: pnpm run inspect:neon  (mit .env / DATABASE_URL = Neon-URL)
 *
 * Wann ausführen: Vor migrate:neon und vor import:neon, damit fehlende Spalten
 * (z. B. _uuid in Array-Tabellen) erkannt werden. Erst Migrationen laufen lassen,
 * dann ggf. import:neon – so vermeidest du Fehler im Admin (Seiten laden, neue Seite anlegen).
 *
 * Bei neuen Feldern: EXPECTED_COLUMNS / ARRAY_TABLES_REQUIRING_UUID erweitern,
 * Migration anlegen, dann pnpm run migrate:neon.
 */

import './load-env-import'
import { Pool } from 'pg'

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL

if (!connectionString) {
  console.error('Fehler: DATABASE_URL oder POSTGRES_URL in .env setzen.')
  process.exit(1)
}

/**
 * Payload erwartet für Array-Felder die Spalte _uuid.
 * Alle site_pages / _site_pages_v Array-Tabellen müssen _uuid haben,
 * sonst schlagen Admin (Seiten-Liste, neue Seite anlegen) und Version-Cleanup fehl.
 */
const ARRAY_TABLES_REQUIRING_UUID = [
  'site_pages_hero_floating_elements',
  'site_pages_hero_marquee_logos',
  'site_pages_hero_links',
  'site_pages_blocks_cta',
  'site_pages_blocks_cta_links',
  'site_pages_blocks_content',
  'site_pages_blocks_content_columns',
  'site_pages_blocks_media_block',
  'site_pages_blocks_archive',
  'site_pages_blocks_form_block',
  '_site_pages_v_version_hero_floating_elements',
  '_site_pages_v_version_hero_marquee_logos',
  '_site_pages_v_version_hero_links',
  '_site_pages_v_blocks_cta',
  '_site_pages_v_blocks_cta_links',
  '_site_pages_v_blocks_content',
  '_site_pages_v_blocks_content_columns',
  '_site_pages_v_blocks_media_block',
  '_site_pages_v_blocks_archive',
  '_site_pages_v_blocks_form_block',
]

/** Erwartete Spalten pro Tabelle (Payload-Schema aus Collections/Globals + Migrationen). */
const EXPECTED_COLUMNS: Record<string, string[]> = {
  // Mega-Menu
  mega_menu_sub_items: [
    'id', '_parent_id', '_order', 'label', 'url', 'icon_id', 'image_id',
    'badge', 'badge_color', 'description', 'divider_before',
  ],
  mega_menu_columns_items: [
    'id', '_parent_id', '_order', 'label', 'url', 'description',
    'icon_id', 'image_id', 'badge', 'badge_color',
  ],
  mega_menu_columns: [
    'id', '_parent_id', '_order', 'title', 'column_width', 'divider_before', 'column_background',
  ],
  mega_menu: [
    'id', 'label', 'url', 'order', 'icon_id', 'image_id', 'appearance',
    'column_widths_col1', 'column_widths_col2', 'column_widths_col3',
    'category_description_title', 'category_description_description',
    'highlight_position', 'highlight_title', 'highlight_description',
    'highlight_image_id', 'highlight_cta_label', 'highlight_cta_url',
  ],
  // Site Pages: alle Array-Tabellen brauchen _uuid (Admin/Version-Cleanup)
  ...Object.fromEntries(
    ARRAY_TABLES_REQUIRING_UUID.map((t) => [t, ['id', '_parent_id', '_order', '_uuid']]),
  ),
  // Locked documents (Mega-Menu im Admin)
  payload_locked_documents_rels: [
    'id', 'order', 'parent_id', 'path', 'site_pages_id', 'blog_posts_id', 'categories_id',
    'media_id', 'mega_menu_id', 'payload_folders_id', 'redirects_id', 'search_id', 'users_id',
    'forms_id', 'form_submissions_id',
  ],
}

type Row = { table_name: string; column_name: string }

async function main() {
  const pool = new Pool({ connectionString })
  try {
    const res = await pool.query<Row>(`
      SELECT table_schema, table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `)

    const byTable = new Map<string, Set<string>>()
    for (const row of res.rows) {
      const key = row.table_name
      if (!byTable.has(key)) byTable.set(key, new Set())
      byTable.get(key)!.add(row.column_name)
    }

    console.log('=== Neon/Postgres Schema (public) ===\n')
    const payloadTables = [...byTable.keys()].filter(
      (t) =>
        t.startsWith('mega_menu') ||
        t.startsWith('site_pages') ||
        t.startsWith('_site_pages') ||
        t.startsWith('header') ||
        t.startsWith('footer') ||
        t.startsWith('design') ||
        t.startsWith('theme_settings') ||
        t.startsWith('payload_'),
    )
    payloadTables.sort()

    for (const table of payloadTables) {
      const cols = [...(byTable.get(table) ?? [])].sort()
      console.log(`${table}`)
      console.log(`  Spalten (${cols.length}): ${cols.join(', ')}\n`)
    }

    console.log('=== Abgleich: Erwartete Spalten vs. vorhanden ===\n')
    let hasMissing = false
    for (const [table, expected] of Object.entries(EXPECTED_COLUMNS)) {
      const actual = byTable.get(table)
      if (!actual) {
        console.log(`[FEHLT] Tabelle "${table}" existiert nicht.`)
        hasMissing = true
        continue
      }
      const missing = expected.filter((c) => !actual.has(c))
      if (missing.length > 0) {
        console.log(`[FEHLENDE SPALTEN] ${table}: ${missing.join(', ')}`)
        hasMissing = true
      } else {
        console.log(`[OK] ${table}: alle erwarteten Spalten vorhanden.`)
      }
    }

    if (hasMissing) {
      console.log('\n→ Migrationen ausführen: pnpm run migrate:neon')
      process.exitCode = 1
    } else {
      console.log('\n→ Schema passt zu den erwarteten Spalten.')
    }
  } finally {
    await pool.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
