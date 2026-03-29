/**
 * Bringt die lokale SQLite-DB an den vom Payload-Code erwarteten Schema-Stand,
 * damit ein späteres "push: true" keine Datenverlust-Warnung mehr auslöst.
 *
 * Führt aus:
 * - Umbenennung mega_menu_column_items → mega_menu_columns_items (Payload erwartet Plural)
 *
 * Hinweis: Spalten wie hero_background_video_id werden nicht umbenannt – Payload nutzt _id im SQL.
 *
 * Voraussetzung: sqlite3-CLI installiert (macOS: vorhanden; Linux: z. B. sqlite3 Paket).
 *
 * Aufruf: pnpm run fix:sqlite-schema
 */

import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')
dotenv.config({ path: path.join(projectRoot, '.env') })
dotenv.config({ path: path.join(projectRoot, '.env.local') })

const defaultDbPath = path.join(projectRoot, 'payload.db')

function getDbPath(): string {
  const url = process.env.SQLITE_URL
  if (url?.startsWith('file:')) {
    const filePath = url.slice(5).replace(/^\/(\w:)/, '$1')
    return path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath)
  }
  return defaultDbPath
}

function runSqlite3(dbPath: string, sql: string): void {
  if (!fs.existsSync(dbPath)) {
    console.error('DB-Datei nicht gefunden:', dbPath)
    process.exit(1)
  }
  try {
    // SQL über stdin: keine Shell-Escaping-Probleme bei Spalten wie "order".
    execFileSync('sqlite3', [dbPath], {
      input: sql.trim() + '\n',
      stdio: ['pipe', 'inherit', 'pipe'],
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    })
  } catch (e) {
    const err = e as { stderr?: string }
    const detail = typeof err.stderr === 'string' ? err.stderr.trim() : ''
    const wrapped = new Error(detail || (e as Error).message) as Error & { stderr?: string }
    if (detail) wrapped.stderr = detail
    throw wrapped
  }
}

/** Einzel-SQL-Abfrage (nur für Schema-Checks). */
function sqlite3Scalar(dbPath: string, sql: string): string {
  return execFileSync('sqlite3', [dbPath, sql], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  }).trim()
}

/**
 * Payload speichert Array-Zeilen-IDs als Text (ObjectId/UUID). INTEGER-PK → LibSQL „datatype mismatch“.
 */
function rebuildPayloadArrayRowIdColumnsIfInteger(dbPath: string): void {
  const tables: { name: string; rebuildSql: string }[] = [
    {
      name: 'site_pages_blocks_services_overview_services',
      rebuildSql: `
BEGIN;
DROP INDEX IF EXISTS site_pages_blocks_services_overview_services_order_idx;
DROP INDEX IF EXISTS site_pages_blocks_services_overview_services_parent_id_idx;
DROP TABLE IF EXISTS site_pages_blocks_services_overview_services_fixtmp;
ALTER TABLE site_pages_blocks_services_overview_services RENAME TO site_pages_blocks_services_overview_services_fixtmp;
CREATE TABLE site_pages_blocks_services_overview_services (
  _order INTEGER NOT NULL,
  _parent_id TEXT NOT NULL REFERENCES site_pages_blocks_services_overview(id) ON DELETE CASCADE,
  id TEXT PRIMARY KEY,
  icon TEXT DEFAULT 'compass',
  title TEXT,
  description TEXT
);
INSERT INTO site_pages_blocks_services_overview_services (_order, _parent_id, id, icon, title, description)
SELECT _order, _parent_id, CAST(id AS TEXT), icon, title, description FROM site_pages_blocks_services_overview_services_fixtmp;
DROP TABLE site_pages_blocks_services_overview_services_fixtmp;
CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_services_order_idx ON site_pages_blocks_services_overview_services (_order);
CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_services_parent_id_idx ON site_pages_blocks_services_overview_services (_parent_id);
COMMIT;
`,
    },
    {
      name: '_site_pages_v_blocks_services_overview_services',
      rebuildSql: `
BEGIN;
DROP INDEX IF EXISTS _site_pages_v_blocks_services_overview_services_order_idx;
DROP INDEX IF EXISTS _site_pages_v_blocks_services_overview_services_parent_id_idx;
DROP TABLE IF EXISTS _site_pages_v_blocks_services_overview_services_fixtmp;
ALTER TABLE _site_pages_v_blocks_services_overview_services RENAME TO _site_pages_v_blocks_services_overview_services_fixtmp;
CREATE TABLE _site_pages_v_blocks_services_overview_services (
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES _site_pages_v_blocks_services_overview(id) ON DELETE CASCADE,
  id TEXT PRIMARY KEY,
  icon TEXT DEFAULT 'compass',
  title TEXT,
  description TEXT,
  _uuid TEXT
);
INSERT INTO _site_pages_v_blocks_services_overview_services (_order, _parent_id, id, icon, title, description, _uuid)
SELECT _order, _parent_id, CAST(id AS TEXT), icon, title, description, _uuid FROM _site_pages_v_blocks_services_overview_services_fixtmp;
DROP TABLE _site_pages_v_blocks_services_overview_services_fixtmp;
CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_services_order_idx ON _site_pages_v_blocks_services_overview_services (_order);
CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_services_parent_id_idx ON _site_pages_v_blocks_services_overview_services (_parent_id);
COMMIT;
`,
    },
    {
      name: 'site_pages_blocks_why_work_with_me_intro_icon_list',
      rebuildSql: `
BEGIN;
DROP INDEX IF EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_order_idx;
DROP INDEX IF EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_parent_id_idx;
DROP TABLE IF EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_fixtmp;
ALTER TABLE site_pages_blocks_why_work_with_me_intro_icon_list RENAME TO site_pages_blocks_why_work_with_me_intro_icon_list_fixtmp;
CREATE TABLE site_pages_blocks_why_work_with_me_intro_icon_list (
  _order INTEGER NOT NULL,
  _parent_id TEXT NOT NULL REFERENCES site_pages_blocks_why_work_with_me(id) ON DELETE CASCADE,
  id TEXT PRIMARY KEY,
  icon TEXT DEFAULT 'brain',
  text TEXT
);
INSERT INTO site_pages_blocks_why_work_with_me_intro_icon_list (_order, _parent_id, id, icon, text)
SELECT _order, _parent_id, CAST(id AS TEXT), icon, text FROM site_pages_blocks_why_work_with_me_intro_icon_list_fixtmp;
DROP TABLE site_pages_blocks_why_work_with_me_intro_icon_list_fixtmp;
CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_order_idx ON site_pages_blocks_why_work_with_me_intro_icon_list (_order);
CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_parent_id_idx ON site_pages_blocks_why_work_with_me_intro_icon_list (_parent_id);
COMMIT;
`,
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me_intro_icon_list',
      rebuildSql: `
BEGIN;
DROP INDEX IF EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_order_idx;
DROP INDEX IF EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_parent_id_idx;
DROP TABLE IF EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_fixtmp;
ALTER TABLE _site_pages_v_blocks_why_work_with_me_intro_icon_list RENAME TO _site_pages_v_blocks_why_work_with_me_intro_icon_list_fixtmp;
CREATE TABLE _site_pages_v_blocks_why_work_with_me_intro_icon_list (
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES _site_pages_v_blocks_why_work_with_me(id) ON DELETE CASCADE,
  id TEXT PRIMARY KEY,
  icon TEXT DEFAULT 'brain',
  text TEXT,
  _uuid TEXT
);
INSERT INTO _site_pages_v_blocks_why_work_with_me_intro_icon_list (_order, _parent_id, id, icon, text, _uuid)
SELECT _order, _parent_id, CAST(id AS TEXT), icon, text, _uuid FROM _site_pages_v_blocks_why_work_with_me_intro_icon_list_fixtmp;
DROP TABLE _site_pages_v_blocks_why_work_with_me_intro_icon_list_fixtmp;
CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_order_idx ON _site_pages_v_blocks_why_work_with_me_intro_icon_list (_order);
CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_parent_id_idx ON _site_pages_v_blocks_why_work_with_me_intro_icon_list (_parent_id);
COMMIT;
`,
    },
    {
      name: 'site_pages_blocks_why_work_with_me_reasons',
      rebuildSql: `
BEGIN;
DROP INDEX IF EXISTS site_pages_blocks_why_work_with_me_reasons_order_idx;
DROP INDEX IF EXISTS site_pages_blocks_why_work_with_me_reasons_parent_id_idx;
DROP TABLE IF EXISTS site_pages_blocks_why_work_with_me_reasons_fixtmp;
ALTER TABLE site_pages_blocks_why_work_with_me_reasons RENAME TO site_pages_blocks_why_work_with_me_reasons_fixtmp;
CREATE TABLE site_pages_blocks_why_work_with_me_reasons (
  _order INTEGER NOT NULL,
  _parent_id TEXT NOT NULL REFERENCES site_pages_blocks_why_work_with_me(id) ON DELETE CASCADE,
  id TEXT PRIMARY KEY,
  icon TEXT DEFAULT 'user',
  title TEXT,
  description TEXT
);
INSERT INTO site_pages_blocks_why_work_with_me_reasons (_order, _parent_id, id, icon, title, description)
SELECT _order, _parent_id, CAST(id AS TEXT), icon, title, description FROM site_pages_blocks_why_work_with_me_reasons_fixtmp;
DROP TABLE site_pages_blocks_why_work_with_me_reasons_fixtmp;
CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_reasons_order_idx ON site_pages_blocks_why_work_with_me_reasons (_order);
CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_reasons_parent_id_idx ON site_pages_blocks_why_work_with_me_reasons (_parent_id);
COMMIT;
`,
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me_reasons',
      rebuildSql: `
BEGIN;
DROP INDEX IF EXISTS _site_pages_v_blocks_why_work_with_me_reasons_order_idx;
DROP INDEX IF EXISTS _site_pages_v_blocks_why_work_with_me_reasons_parent_id_idx;
DROP TABLE IF EXISTS _site_pages_v_blocks_why_work_with_me_reasons_fixtmp;
ALTER TABLE _site_pages_v_blocks_why_work_with_me_reasons RENAME TO _site_pages_v_blocks_why_work_with_me_reasons_fixtmp;
CREATE TABLE _site_pages_v_blocks_why_work_with_me_reasons (
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES _site_pages_v_blocks_why_work_with_me(id) ON DELETE CASCADE,
  id TEXT PRIMARY KEY,
  icon TEXT DEFAULT 'user',
  title TEXT,
  description TEXT,
  _uuid TEXT
);
INSERT INTO _site_pages_v_blocks_why_work_with_me_reasons (_order, _parent_id, id, icon, title, description, _uuid)
SELECT _order, _parent_id, CAST(id AS TEXT), icon, title, description, _uuid FROM _site_pages_v_blocks_why_work_with_me_reasons_fixtmp;
DROP TABLE _site_pages_v_blocks_why_work_with_me_reasons_fixtmp;
CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_reasons_order_idx ON _site_pages_v_blocks_why_work_with_me_reasons (_order);
CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_reasons_parent_id_idx ON _site_pages_v_blocks_why_work_with_me_reasons (_parent_id);
COMMIT;
`,
    },
  ]

  for (const { name, rebuildSql } of tables) {
    let idType: string
    try {
      idType = sqlite3Scalar(
        dbPath,
        `SELECT lower(type) FROM pragma_table_info('${name.replace(/'/g, "''")}') WHERE name = 'id';`,
      )
    } catch {
      continue
    }
    if (!idType || idType === 'text') continue
    if (!idType.includes('int')) continue
    console.log(`Repariere ${name}: id-Spalte INTEGER → TEXT (Payload-kompatibel)`)
    runSqlite3(dbPath, rebuildSql)
  }
}

function main() {
  const dbPath = getDbPath()
  console.log('SQLite-DB:', dbPath)

  const steps: { name: string; sql: string }[] = [
    // Globals: Tabellen anlegen falls nicht vorhanden (behebt "Nothing found" im Admin)
    {
      name: 'header: table',
      sql: `CREATE TABLE IF NOT EXISTS header (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        updated_at TEXT,
        created_at TEXT
      );`,
    },
    {
      name: 'footer: table',
      sql: `CREATE TABLE IF NOT EXISTS footer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        updated_at TEXT,
        created_at TEXT
      );`,
    },
    {
      name: 'Tabelle mega_menu_column_items → mega_menu_columns_items',
      sql: 'ALTER TABLE mega_menu_column_items RENAME TO mega_menu_columns_items;',
    },
    // Mega-Menü: fehlende Spalten für Backend (leere Admin-Seite ohne diese Spalten)
    { name: 'mega_menu: icon_id', sql: 'ALTER TABLE mega_menu ADD COLUMN icon_id INTEGER;' },
    { name: 'mega_menu: image_id', sql: 'ALTER TABLE mega_menu ADD COLUMN image_id INTEGER;' },
    { name: 'mega_menu: appearance', sql: "ALTER TABLE mega_menu ADD COLUMN appearance TEXT DEFAULT 'link';" },
    { name: 'mega_menu_sub_items: image_id', sql: 'ALTER TABLE mega_menu_sub_items ADD COLUMN image_id INTEGER;' },
    { name: 'mega_menu_sub_items: divider_before', sql: 'ALTER TABLE mega_menu_sub_items ADD COLUMN divider_before INTEGER DEFAULT 0;' },
    { name: 'mega_menu_sub_items: badge_color', sql: "ALTER TABLE mega_menu_sub_items ADD COLUMN badge_color TEXT DEFAULT 'success';" },
    { name: 'mega_menu_columns: divider_before', sql: 'ALTER TABLE mega_menu_columns ADD COLUMN divider_before INTEGER DEFAULT 0;' },
    { name: 'mega_menu_columns: column_background', sql: "ALTER TABLE mega_menu_columns ADD COLUMN column_background TEXT DEFAULT 'default';" },
    { name: 'mega_menu_columns_items: image_id', sql: 'ALTER TABLE mega_menu_columns_items ADD COLUMN image_id INTEGER;' },
    { name: 'mega_menu_columns_items: description', sql: 'ALTER TABLE mega_menu_columns_items ADD COLUMN description TEXT;' },
    { name: 'mega_menu_columns_items: badge_color', sql: "ALTER TABLE mega_menu_columns_items ADD COLUMN badge_color TEXT DEFAULT 'success';" },
    // Mega-Menü: Spaltenbreiten pro Menüpunkt (12er-Grid)
    { name: 'mega_menu: column_widths_col1', sql: 'ALTER TABLE mega_menu ADD COLUMN column_widths_col1 INTEGER;' },
    { name: 'mega_menu: column_widths_col2', sql: 'ALTER TABLE mega_menu ADD COLUMN column_widths_col2 INTEGER;' },
    { name: 'mega_menu: column_widths_col3', sql: 'ALTER TABLE mega_menu ADD COLUMN column_widths_col3 INTEGER;' },
    // Mega-Menü: Breite pro Unterpunkt-Spalte (1–12)
    { name: 'mega_menu_columns: column_width', sql: 'ALTER TABLE mega_menu_columns ADD COLUMN column_width INTEGER;' },
    // Mega-Menü: ggf. alten Index auf _order entfernen, damit Payload seinen eigenen anlegen kann
    { name: 'mega_menu_columns: drop legacy _order index', sql: 'DROP INDEX IF EXISTS mega_menu_columns_order_idx;' },
    // Mega-Menü: Spalte 1 Kategoriebeschreibung als Gruppe (title + description)
    { name: 'mega_menu: category_description_title', sql: 'ALTER TABLE mega_menu ADD COLUMN category_description_title TEXT;' },
    { name: 'mega_menu: category_description_description', sql: 'ALTER TABLE mega_menu ADD COLUMN category_description_description TEXT;' },
    {
      name: 'mega_menu: Migrate category_description → category_description_description',
      sql: 'UPDATE mega_menu SET category_description_description = category_description WHERE category_description IS NOT NULL;',
    },
    // Mega-Menü: Highlight-Block Position (rechts vs. unter den Unterpunkten)
    { name: 'mega_menu: highlight_position', sql: "ALTER TABLE mega_menu ADD COLUMN highlight_position TEXT DEFAULT 'right';" },
    // Mega-Menü: Highlight-Block Hintergrund (default | paths)
    { name: 'mega_menu: highlight_background', sql: "ALTER TABLE mega_menu ADD COLUMN highlight_background TEXT DEFAULT 'default';" },
    // Mega-Menü: Highlight-Icon (Legacy + Cards)
    { name: 'mega_menu: highlight_icon_id', sql: 'ALTER TABLE mega_menu ADD COLUMN highlight_icon_id INTEGER;' },
    // Mega-Menü: Highlight-Cards (Array in highlight.cards) – eigene Tabelle
    {
      name: 'mega_menu_highlight_cards: table',
      sql: `CREATE TABLE IF NOT EXISTS mega_menu_highlight_cards (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        icon_id INTEGER,
        image_id INTEGER,
        cta_label TEXT,
        cta_url TEXT
      );`,
    },
    {
      name: 'mega_menu_highlight_cards: drop legacy _order index',
      sql: 'DROP INDEX IF EXISTS mega_menu_highlight_cards_order_idx;',
    },
    // Falls Tabelle schon existiert, icon_id nachziehen
    {
      name: 'mega_menu_highlight_cards: icon_id',
      sql: 'ALTER TABLE mega_menu_highlight_cards ADD COLUMN icon_id INTEGER;',
    },
    // Site-Pages Layout-Blöcke: blockBackground + blockOverlay (Hintergrund/Overlay pro Block)
    { name: 'site_pages_blocks_content: block_background', sql: "ALTER TABLE site_pages_blocks_content ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: 'site_pages_blocks_content: block_overlay_enabled', sql: 'ALTER TABLE site_pages_blocks_content ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: 'site_pages_blocks_content: block_overlay_color', sql: "ALTER TABLE site_pages_blocks_content ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: 'site_pages_blocks_content: block_overlay_opacity', sql: 'ALTER TABLE site_pages_blocks_content ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: 'site_pages_blocks_cta: block_background', sql: "ALTER TABLE site_pages_blocks_cta ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: 'site_pages_blocks_cta: block_overlay_enabled', sql: 'ALTER TABLE site_pages_blocks_cta ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: 'site_pages_blocks_cta: block_overlay_color', sql: "ALTER TABLE site_pages_blocks_cta ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: 'site_pages_blocks_cta: block_overlay_opacity', sql: 'ALTER TABLE site_pages_blocks_cta ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: 'site_pages_blocks_media_block: block_background', sql: "ALTER TABLE site_pages_blocks_media_block ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: 'site_pages_blocks_media_block: block_overlay_enabled', sql: 'ALTER TABLE site_pages_blocks_media_block ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: 'site_pages_blocks_media_block: block_overlay_color', sql: "ALTER TABLE site_pages_blocks_media_block ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: 'site_pages_blocks_media_block: block_overlay_opacity', sql: 'ALTER TABLE site_pages_blocks_media_block ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: 'site_pages_blocks_archive: block_background', sql: "ALTER TABLE site_pages_blocks_archive ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: 'site_pages_blocks_archive: block_overlay_enabled', sql: 'ALTER TABLE site_pages_blocks_archive ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: 'site_pages_blocks_archive: block_overlay_color', sql: "ALTER TABLE site_pages_blocks_archive ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: 'site_pages_blocks_archive: block_overlay_opacity', sql: 'ALTER TABLE site_pages_blocks_archive ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: 'site_pages_blocks_form_block: block_background', sql: "ALTER TABLE site_pages_blocks_form_block ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: 'site_pages_blocks_form_block: block_overlay_enabled', sql: 'ALTER TABLE site_pages_blocks_form_block ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: 'site_pages_blocks_form_block: block_overlay_color', sql: "ALTER TABLE site_pages_blocks_form_block ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: 'site_pages_blocks_form_block: block_overlay_opacity', sql: 'ALTER TABLE site_pages_blocks_form_block ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    // Shadcn Block (neue Komponenten: feature215b, about15, hero238, …)
    {
      name: 'site_pages_blocks_shadcn_block: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_shadcn_block (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        _path TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        block_background TEXT DEFAULT 'none',
        block_overlay_enabled INTEGER DEFAULT 0,
        block_overlay_color TEXT DEFAULT 'dark',
        block_overlay_opacity INTEGER DEFAULT 30,
        variant TEXT NOT NULL,
        block_name TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_shadcn_block: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_shadcn_block (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        _path TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        block_background TEXT DEFAULT 'none',
        block_overlay_enabled INTEGER DEFAULT 0,
        block_overlay_color TEXT DEFAULT 'dark',
        block_overlay_opacity INTEGER DEFAULT 30,
        variant TEXT NOT NULL,
        _uuid TEXT,
        block_name TEXT
      );`,
    },
    // Shadcn Block: Content-Gruppe (headline, subheadline, body, images, links)
    { name: 'site_pages_blocks_shadcn_block: content_headline', sql: 'ALTER TABLE site_pages_blocks_shadcn_block ADD COLUMN content_headline TEXT;' },
    { name: 'site_pages_blocks_shadcn_block: content_subheadline', sql: 'ALTER TABLE site_pages_blocks_shadcn_block ADD COLUMN content_subheadline TEXT;' },
    { name: 'site_pages_blocks_shadcn_block: content_body', sql: 'ALTER TABLE site_pages_blocks_shadcn_block ADD COLUMN content_body TEXT;' },
    {
      name: 'site_pages_blocks_shadcn_block_content_images: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_shadcn_block_content_images (
        _order INTEGER NOT NULL,
        _parent_id TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        media_id INTEGER REFERENCES media(id)
      );`,
    },
    {
      name: 'lnks: table (ShadcnBlock content links)',
      sql: `CREATE TABLE IF NOT EXISTS lnks (
        _order INTEGER NOT NULL,
        _parent_id TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        link_type TEXT DEFAULT 'reference',
        link_new_tab INTEGER DEFAULT 0,
        link_url TEXT,
        link_label TEXT,
        link_appearance TEXT DEFAULT 'default'
      );`,
    },
    {
      name: '_lnks_v: table (ShadcnBlock content links versions)',
      sql: `CREATE TABLE IF NOT EXISTS _lnks_v (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        link_type TEXT DEFAULT 'reference',
        link_new_tab INTEGER DEFAULT 0,
        link_url TEXT,
        link_label TEXT,
        link_appearance TEXT DEFAULT 'default',
        _uuid TEXT
      );`,
    },
    {
      name: '_lnks_v_rels: table (ShadcnBlock content link relations versions)',
      sql: `CREATE TABLE IF NOT EXISTS _lnks_v_rels (
        "order" INTEGER NOT NULL,
        parent_id INTEGER NOT NULL,
        path TEXT NOT NULL,
        site_pages_id INTEGER,
        blog_posts_id INTEGER,
        categories_id INTEGER
      );`,
    },
    // Shadcn Block Content: Version-Tabellen (Drafts)
    { name: '_site_pages_v_blocks_shadcn_block: content_headline', sql: 'ALTER TABLE _site_pages_v_blocks_shadcn_block ADD COLUMN content_headline TEXT;' },
    { name: '_site_pages_v_blocks_shadcn_block: content_subheadline', sql: 'ALTER TABLE _site_pages_v_blocks_shadcn_block ADD COLUMN content_subheadline TEXT;' },
    { name: '_site_pages_v_blocks_shadcn_block: content_body', sql: 'ALTER TABLE _site_pages_v_blocks_shadcn_block ADD COLUMN content_body TEXT;' },
    {
      name: '_site_pages_v_blocks_shadcn_block_content_images: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_shadcn_block_content_images (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        media_id INTEGER REFERENCES media(id)
      );`,
    },
    // Introduction block (Einleitung)
    {
      name: 'site_pages_blocks_introduction: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_introduction (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES site_pages(id) ON DELETE CASCADE,
        _path TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        block_background TEXT DEFAULT 'none',
        block_overlay_enabled INTEGER DEFAULT 0,
        block_overlay_color TEXT DEFAULT 'dark',
        block_overlay_opacity INTEGER DEFAULT 30,
        heading TEXT,
        body TEXT,
        tagline TEXT,
        image_id INTEGER REFERENCES media(id),
        block_name TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_introduction: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS site_pages_blocks_introduction_order_idx ON site_pages_blocks_introduction (_order); CREATE INDEX IF NOT EXISTS site_pages_blocks_introduction_parent_id_idx ON site_pages_blocks_introduction (_parent_id); CREATE INDEX IF NOT EXISTS site_pages_blocks_introduction_path_idx ON site_pages_blocks_introduction (_path);',
    },
    {
      name: '_site_pages_v_blocks_introduction: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_introduction (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES _site_pages_v(id) ON DELETE CASCADE,
        _path TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        block_background TEXT DEFAULT 'none',
        block_overlay_enabled INTEGER DEFAULT 0,
        block_overlay_color TEXT DEFAULT 'dark',
        block_overlay_opacity INTEGER DEFAULT 30,
        heading TEXT,
        body TEXT,
        tagline TEXT,
        image_id INTEGER REFERENCES media(id),
        _uuid TEXT,
        block_name TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_introduction: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_introduction_order_idx ON _site_pages_v_blocks_introduction (_order); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_introduction_parent_id_idx ON _site_pages_v_blocks_introduction (_parent_id); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_introduction_path_idx ON _site_pages_v_blocks_introduction (_path);',
    },
    // Consulting Overview Block
    {
      name: 'site_pages_blocks_consulting_overview: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_consulting_overview (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        _path TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        block_background TEXT DEFAULT 'none',
        block_overlay_enabled INTEGER DEFAULT 0,
        block_overlay_color TEXT DEFAULT 'dark',
        block_overlay_opacity INTEGER DEFAULT 30,
        headline TEXT,
        intro_text TEXT,
        strategy_label TEXT,
        strategy_sub_label TEXT,
        strategy_title TEXT,
        strategy_text TEXT,
        pixel_layout_desktop INTEGER DEFAULT 1,
        colors_gradient_lavender TEXT DEFAULT '#DED9FF',
        colors_gradient_lime TEXT DEFAULT '#F3FFD9',
        colors_intro_blob TEXT DEFAULT '#DED9FF',
        colors_strategy_badge TEXT DEFAULT '#08D3BB',
        colors_benefits_badge TEXT DEFAULT '#1090CB',
        colors_experience_badge TEXT DEFAULT '#9208D3',
        colors_timeline_stroke TEXT DEFAULT '#999999',
        colors_divider TEXT DEFAULT '#C7C7C7',
        colors_headline TEXT DEFAULT '#252525',
        colors_body TEXT DEFAULT '#545454',
        colors_muted TEXT DEFAULT '#868686',
        benefits_label TEXT,
        benefits_sub_label TEXT,
        benefits_title TEXT,
        experience_label TEXT,
        experience_sub_label TEXT,
        experience_title TEXT,
        block_name TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_consulting_overview_benefit_items: drop (id TEXT)',
      sql: 'DROP TABLE IF EXISTS site_pages_blocks_consulting_overview_benefit_items;',
    },
    {
      name: 'site_pages_blocks_consulting_overview_benefit_items: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_consulting_overview_benefit_items (
        _order INTEGER NOT NULL,
        _parent_id TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        title TEXT,
        text TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_consulting_overview: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_consulting_overview (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        _path TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        block_background TEXT DEFAULT 'none',
        block_overlay_enabled INTEGER DEFAULT 0,
        block_overlay_color TEXT DEFAULT 'dark',
        block_overlay_opacity INTEGER DEFAULT 30,
        headline TEXT,
        intro_text TEXT,
        strategy_label TEXT,
        strategy_sub_label TEXT,
        strategy_title TEXT,
        strategy_text TEXT,
        pixel_layout_desktop INTEGER DEFAULT 1,
        colors_gradient_lavender TEXT DEFAULT '#DED9FF',
        colors_gradient_lime TEXT DEFAULT '#F3FFD9',
        colors_intro_blob TEXT DEFAULT '#DED9FF',
        colors_strategy_badge TEXT DEFAULT '#08D3BB',
        colors_benefits_badge TEXT DEFAULT '#1090CB',
        colors_experience_badge TEXT DEFAULT '#9208D3',
        colors_timeline_stroke TEXT DEFAULT '#999999',
        colors_divider TEXT DEFAULT '#C7C7C7',
        colors_headline TEXT DEFAULT '#252525',
        colors_body TEXT DEFAULT '#545454',
        colors_muted TEXT DEFAULT '#868686',
        benefits_label TEXT,
        benefits_sub_label TEXT,
        benefits_title TEXT,
        experience_label TEXT,
        experience_sub_label TEXT,
        experience_title TEXT,
        _uuid TEXT,
        block_name TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_consulting_overview_benefit_items: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_consulting_overview_benefit_items (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        text TEXT,
        _uuid TEXT
      );`,
    },
    // Warum mit mir: Überschrift, Einleitung, reasons-Array (Postgres: Migration 20260325)
    {
      name: 'site_pages_blocks_why_work_with_me: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_why_work_with_me (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES site_pages(id) ON DELETE CASCADE,
        _path TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        block_name TEXT,
        heading TEXT,
        intro TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_why_work_with_me (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES _site_pages_v(id) ON DELETE CASCADE,
        _path TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        _uuid TEXT,
        block_name TEXT,
        heading TEXT,
        intro TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_why_work_with_me_reasons: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_why_work_with_me_reasons (
        _order INTEGER NOT NULL,
        _parent_id TEXT NOT NULL REFERENCES site_pages_blocks_why_work_with_me(id) ON DELETE CASCADE,
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT 'user',
        title TEXT,
        description TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me_reasons: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_reasons (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES _site_pages_v_blocks_why_work_with_me(id) ON DELETE CASCADE,
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT 'user',
        title TEXT,
        description TEXT,
        _uuid TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_why_work_with_me_reasons: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_reasons_order_idx ON site_pages_blocks_why_work_with_me_reasons (_order); CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_reasons_parent_id_idx ON site_pages_blocks_why_work_with_me_reasons (_parent_id);',
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me_reasons: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_reasons_order_idx ON _site_pages_v_blocks_why_work_with_me_reasons (_order); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_reasons_parent_id_idx ON _site_pages_v_blocks_why_work_with_me_reasons (_parent_id);',
    },
    // Warum mit mir: introIconList (Postgres: Migration 20260329_100000_why_work_with_me_intro_icon_list)
    {
      name: 'site_pages_blocks_why_work_with_me_intro_icon_list: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_why_work_with_me_intro_icon_list (
        _order INTEGER NOT NULL,
        _parent_id TEXT NOT NULL REFERENCES site_pages_blocks_why_work_with_me(id) ON DELETE CASCADE,
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT 'brain',
        text TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me_intro_icon_list: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES _site_pages_v_blocks_why_work_with_me(id) ON DELETE CASCADE,
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT 'brain',
        text TEXT,
        _uuid TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_why_work_with_me_intro_icon_list: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_order_idx ON site_pages_blocks_why_work_with_me_intro_icon_list (_order); CREATE INDEX IF NOT EXISTS site_pages_blocks_why_work_with_me_intro_icon_list_parent_id_idx ON site_pages_blocks_why_work_with_me_intro_icon_list (_parent_id);',
    },
    {
      name: '_site_pages_v_blocks_why_work_with_me_intro_icon_list: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_order_idx ON _site_pages_v_blocks_why_work_with_me_intro_icon_list (_order); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_why_work_with_me_intro_icon_list_parent_id_idx ON _site_pages_v_blocks_why_work_with_me_intro_icon_list (_parent_id);',
    },
    // Leistungen Überblick (servicesOverview-Block)
    {
      name: 'site_pages_blocks_services_overview: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_services_overview (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES site_pages(id) ON DELETE CASCADE,
        _path TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        block_name TEXT,
        heading TEXT,
        intro TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_services_overview: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_order_idx ON site_pages_blocks_services_overview (_order); CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_parent_id_idx ON site_pages_blocks_services_overview (_parent_id); CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_path_idx ON site_pages_blocks_services_overview (_path);',
    },
    {
      name: 'site_pages_blocks_services_overview_services: table',
      sql: `CREATE TABLE IF NOT EXISTS site_pages_blocks_services_overview_services (
        _order INTEGER NOT NULL,
        _parent_id TEXT NOT NULL REFERENCES site_pages_blocks_services_overview(id) ON DELETE CASCADE,
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT 'compass',
        title TEXT,
        description TEXT
      );`,
    },
    {
      name: 'site_pages_blocks_services_overview_services: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_services_order_idx ON site_pages_blocks_services_overview_services (_order); CREATE INDEX IF NOT EXISTS site_pages_blocks_services_overview_services_parent_id_idx ON site_pages_blocks_services_overview_services (_parent_id);',
    },
    {
      name: '_site_pages_v_blocks_services_overview: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_services_overview (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES _site_pages_v(id) ON DELETE CASCADE,
        _path TEXT NOT NULL,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        _uuid TEXT,
        block_name TEXT,
        heading TEXT,
        intro TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_services_overview: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_order_idx ON _site_pages_v_blocks_services_overview (_order); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_parent_id_idx ON _site_pages_v_blocks_services_overview (_parent_id); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_path_idx ON _site_pages_v_blocks_services_overview (_path);',
    },
    {
      name: '_site_pages_v_blocks_services_overview_services: table',
      sql: `CREATE TABLE IF NOT EXISTS _site_pages_v_blocks_services_overview_services (
        _order INTEGER NOT NULL,
        _parent_id INTEGER NOT NULL REFERENCES _site_pages_v_blocks_services_overview(id) ON DELETE CASCADE,
        id TEXT PRIMARY KEY,
        icon TEXT DEFAULT 'compass',
        title TEXT,
        description TEXT,
        _uuid TEXT
      );`,
    },
    {
      name: '_site_pages_v_blocks_services_overview_services: indexes',
      sql: 'CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_services_order_idx ON _site_pages_v_blocks_services_overview_services (_order); CREATE INDEX IF NOT EXISTS _site_pages_v_blocks_services_overview_services_parent_id_idx ON _site_pages_v_blocks_services_overview_services (_parent_id);',
    },
    { name: 'site_pages_blocks_why_work_with_me: heading', sql: 'ALTER TABLE site_pages_blocks_why_work_with_me ADD COLUMN heading TEXT;' },
    { name: 'site_pages_blocks_why_work_with_me: intro', sql: 'ALTER TABLE site_pages_blocks_why_work_with_me ADD COLUMN intro TEXT;' },
    { name: '_site_pages_v_blocks_why_work_with_me: heading', sql: 'ALTER TABLE _site_pages_v_blocks_why_work_with_me ADD COLUMN heading TEXT;' },
    { name: '_site_pages_v_blocks_why_work_with_me: intro', sql: 'ALTER TABLE _site_pages_v_blocks_why_work_with_me ADD COLUMN intro TEXT;' },
    { name: 'site_pages_blocks_consulting_overview: pixel_layout_desktop', sql: 'ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN pixel_layout_desktop INTEGER DEFAULT 1;' },
    { name: 'site_pages_blocks_consulting_overview: colors_gradient_lavender', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_gradient_lavender TEXT DEFAULT '#DED9FF';" },
    { name: 'site_pages_blocks_consulting_overview: colors_gradient_lime', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_gradient_lime TEXT DEFAULT '#F3FFD9';" },
    { name: 'site_pages_blocks_consulting_overview: colors_intro_blob', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_intro_blob TEXT DEFAULT '#DED9FF';" },
    { name: 'site_pages_blocks_consulting_overview: colors_strategy_badge', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_strategy_badge TEXT DEFAULT '#08D3BB';" },
    { name: 'site_pages_blocks_consulting_overview: colors_benefits_badge', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_benefits_badge TEXT DEFAULT '#1090CB';" },
    { name: 'site_pages_blocks_consulting_overview: colors_experience_badge', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_experience_badge TEXT DEFAULT '#9208D3';" },
    { name: 'site_pages_blocks_consulting_overview: colors_timeline_stroke', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_timeline_stroke TEXT DEFAULT '#999999';" },
    { name: 'site_pages_blocks_consulting_overview: colors_divider', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_divider TEXT DEFAULT '#C7C7C7';" },
    { name: 'site_pages_blocks_consulting_overview: colors_headline', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_headline TEXT DEFAULT '#252525';" },
    { name: 'site_pages_blocks_consulting_overview: colors_body', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_body TEXT DEFAULT '#545454';" },
    { name: 'site_pages_blocks_consulting_overview: colors_muted', sql: "ALTER TABLE site_pages_blocks_consulting_overview ADD COLUMN colors_muted TEXT DEFAULT '#868686';" },
    { name: '_site_pages_v_blocks_consulting_overview: pixel_layout_desktop', sql: 'ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN pixel_layout_desktop INTEGER DEFAULT 1;' },
    { name: '_site_pages_v_blocks_consulting_overview: colors_gradient_lavender', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_gradient_lavender TEXT DEFAULT '#DED9FF';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_gradient_lime', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_gradient_lime TEXT DEFAULT '#F3FFD9';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_intro_blob', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_intro_blob TEXT DEFAULT '#DED9FF';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_strategy_badge', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_strategy_badge TEXT DEFAULT '#08D3BB';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_benefits_badge', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_benefits_badge TEXT DEFAULT '#1090CB';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_experience_badge', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_experience_badge TEXT DEFAULT '#9208D3';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_timeline_stroke', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_timeline_stroke TEXT DEFAULT '#999999';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_divider', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_divider TEXT DEFAULT '#C7C7C7';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_headline', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_headline TEXT DEFAULT '#252525';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_body', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_body TEXT DEFAULT '#545454';" },
    { name: '_site_pages_v_blocks_consulting_overview: colors_muted', sql: "ALTER TABLE _site_pages_v_blocks_consulting_overview ADD COLUMN colors_muted TEXT DEFAULT '#868686';" },
    // Version-Tabellen für Drafts (gleiche Spalten)
    { name: '_site_pages_v_blocks_content: block_background', sql: "ALTER TABLE _site_pages_v_blocks_content ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: '_site_pages_v_blocks_content: block_overlay_enabled', sql: 'ALTER TABLE _site_pages_v_blocks_content ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: '_site_pages_v_blocks_content: block_overlay_color', sql: "ALTER TABLE _site_pages_v_blocks_content ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: '_site_pages_v_blocks_content: block_overlay_opacity', sql: 'ALTER TABLE _site_pages_v_blocks_content ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: '_site_pages_v_blocks_cta: block_background', sql: "ALTER TABLE _site_pages_v_blocks_cta ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: '_site_pages_v_blocks_cta: block_overlay_enabled', sql: 'ALTER TABLE _site_pages_v_blocks_cta ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: '_site_pages_v_blocks_cta: block_overlay_color', sql: "ALTER TABLE _site_pages_v_blocks_cta ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: '_site_pages_v_blocks_cta: block_overlay_opacity', sql: 'ALTER TABLE _site_pages_v_blocks_cta ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: '_site_pages_v_blocks_media_block: block_background', sql: "ALTER TABLE _site_pages_v_blocks_media_block ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: '_site_pages_v_blocks_media_block: block_overlay_enabled', sql: 'ALTER TABLE _site_pages_v_blocks_media_block ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: '_site_pages_v_blocks_media_block: block_overlay_color', sql: "ALTER TABLE _site_pages_v_blocks_media_block ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: '_site_pages_v_blocks_media_block: block_overlay_opacity', sql: 'ALTER TABLE _site_pages_v_blocks_media_block ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: '_site_pages_v_blocks_archive: block_background', sql: "ALTER TABLE _site_pages_v_blocks_archive ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: '_site_pages_v_blocks_archive: block_overlay_enabled', sql: 'ALTER TABLE _site_pages_v_blocks_archive ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: '_site_pages_v_blocks_archive: block_overlay_color', sql: "ALTER TABLE _site_pages_v_blocks_archive ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: '_site_pages_v_blocks_archive: block_overlay_opacity', sql: 'ALTER TABLE _site_pages_v_blocks_archive ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    { name: '_site_pages_v_blocks_form_block: block_background', sql: "ALTER TABLE _site_pages_v_blocks_form_block ADD COLUMN block_background TEXT DEFAULT 'none';" },
    { name: '_site_pages_v_blocks_form_block: block_overlay_enabled', sql: 'ALTER TABLE _site_pages_v_blocks_form_block ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;' },
    { name: '_site_pages_v_blocks_form_block: block_overlay_color', sql: "ALTER TABLE _site_pages_v_blocks_form_block ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" },
    { name: '_site_pages_v_blocks_form_block: block_overlay_opacity', sql: 'ALTER TABLE _site_pages_v_blocks_form_block ADD COLUMN block_overlay_opacity INTEGER DEFAULT 30;' },
    // Header: Mega-Menü Spaltenbreiten (Group)
    { name: 'header: mega_menu_layout', sql: 'ALTER TABLE header ADD COLUMN mega_menu_layout TEXT;' },
    // Header: Mega-Menü Kontakt & Newsletter (WhatsApp, Rückruf, Newsletter)
    { name: 'header: mega_menu_show_whats_app', sql: 'ALTER TABLE header ADD COLUMN mega_menu_show_whats_app INTEGER;' },
    { name: 'header: mega_menu_whats_app_label', sql: 'ALTER TABLE header ADD COLUMN mega_menu_whats_app_label TEXT;' },
    { name: 'header: mega_menu_whats_app_url', sql: 'ALTER TABLE header ADD COLUMN mega_menu_whats_app_url TEXT;' },
    { name: 'header: mega_menu_show_callback', sql: 'ALTER TABLE header ADD COLUMN mega_menu_show_callback INTEGER;' },
    { name: 'header: mega_menu_callback_title', sql: 'ALTER TABLE header ADD COLUMN mega_menu_callback_title TEXT;' },
    { name: 'header: mega_menu_callback_placeholder', sql: 'ALTER TABLE header ADD COLUMN mega_menu_callback_placeholder TEXT;' },
    { name: 'header: mega_menu_callback_button_text', sql: 'ALTER TABLE header ADD COLUMN mega_menu_callback_button_text TEXT;' },
    { name: 'header: mega_menu_callback_form_id', sql: 'ALTER TABLE header ADD COLUMN mega_menu_callback_form_id INTEGER REFERENCES forms(id);' },
    { name: 'header: mega_menu_callback_phone_field_name', sql: 'ALTER TABLE header ADD COLUMN mega_menu_callback_phone_field_name TEXT;' },
    { name: 'header: mega_menu_show_newsletter', sql: 'ALTER TABLE header ADD COLUMN mega_menu_show_newsletter INTEGER;' },
    { name: 'header: mega_menu_newsletter_title', sql: 'ALTER TABLE header ADD COLUMN mega_menu_newsletter_title TEXT;' },
    { name: 'header: mega_menu_newsletter_placeholder', sql: 'ALTER TABLE header ADD COLUMN mega_menu_newsletter_placeholder TEXT;' },
    { name: 'header: mega_menu_newsletter_button_text', sql: 'ALTER TABLE header ADD COLUMN mega_menu_newsletter_button_text TEXT;' },
    { name: 'header: mega_menu_newsletter_form_id', sql: 'ALTER TABLE header ADD COLUMN mega_menu_newsletter_form_id INTEGER REFERENCES forms(id);' },
    { name: 'header: mega_menu_newsletter_email_field_name', sql: 'ALTER TABLE header ADD COLUMN mega_menu_newsletter_email_field_name TEXT;' },
    // Header: ggf. alten Index auf mega_menu_callback_form_id entfernen, damit Payload seinen eigenen anlegen kann
    { name: 'header: drop legacy mega_menu_callback_form_idx', sql: 'DROP INDEX IF EXISTS header_mega_menu_callback_form_idx;' },
    // Header: Mega-Menü Highlight-Karten Stil
    { name: 'header: mega_menu_card_border_radius', sql: "ALTER TABLE header ADD COLUMN mega_menu_card_border_radius TEXT DEFAULT 'rounded-lg';" },
    { name: 'header: mega_menu_card_shadow', sql: "ALTER TABLE header ADD COLUMN mega_menu_card_shadow TEXT DEFAULT 'shadow-sm';" },
    { name: 'header: mega_menu_card_hover_shadow', sql: "ALTER TABLE header ADD COLUMN mega_menu_card_hover_shadow TEXT DEFAULT 'hover:shadow-md';" },
    { name: 'header: mega_menu_card_hover_border', sql: "ALTER TABLE header ADD COLUMN mega_menu_card_hover_border TEXT DEFAULT 'hover:border-primary/40';" },
    // Footer-Global erweitert (Logo, Newsletter, Spalten, Social, Rechtliches, Design)
    { name: 'footer: footer_logo_id', sql: 'ALTER TABLE footer ADD COLUMN footer_logo_id INTEGER REFERENCES media(id);' },
    { name: 'footer: footer_logo_alt_text', sql: 'ALTER TABLE footer ADD COLUMN footer_logo_alt_text TEXT;' },
    { name: 'footer: newsletter_title', sql: 'ALTER TABLE footer ADD COLUMN newsletter_title TEXT;' },
    { name: 'footer: newsletter_description', sql: 'ALTER TABLE footer ADD COLUMN newsletter_description TEXT;' },
    { name: 'footer: newsletter_placeholder', sql: 'ALTER TABLE footer ADD COLUMN newsletter_placeholder TEXT;' },
    { name: 'footer: newsletter_button_text', sql: 'ALTER TABLE footer ADD COLUMN newsletter_button_text TEXT;' },
    { name: 'footer: columns', sql: 'ALTER TABLE footer ADD COLUMN columns TEXT;' },
    { name: 'footer: social_links', sql: 'ALTER TABLE footer ADD COLUMN social_links TEXT;' },
    { name: 'footer: copyright_text', sql: 'ALTER TABLE footer ADD COLUMN copyright_text TEXT;' },
    { name: 'footer: privacy_link', sql: 'ALTER TABLE footer ADD COLUMN privacy_link TEXT;' },
    { name: 'footer: terms_link', sql: 'ALTER TABLE footer ADD COLUMN terms_link TEXT;' },
    { name: 'footer: background_color', sql: 'ALTER TABLE footer ADD COLUMN background_color TEXT;' },
    { name: 'footer: text_color', sql: 'ALTER TABLE footer ADD COLUMN text_color TEXT;' },
    { name: 'footer: link_hover_color', sql: 'ALTER TABLE footer ADD COLUMN link_hover_color TEXT;' },
    { name: 'footer: logo_on_dark_background', sql: 'ALTER TABLE footer ADD COLUMN logo_on_dark_background INTEGER DEFAULT 1;' },
    // Design-Global (zentrale Farben & Schriften)
    {
      name: 'design: table',
      sql: `CREATE TABLE IF NOT EXISTS design (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        updated_at TEXT,
        created_at TEXT,
        colors_light TEXT,
        colors_dark TEXT,
        fonts TEXT
      );`,
    },
    // Hero Background Presets (Collection hero-backgrounds) – einfache Tabelle für SQLite
    {
      name: 'hero_backgrounds: table',
      sql: `CREATE TABLE IF NOT EXISTS hero_backgrounds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        updated_at TEXT,
        created_at TEXT,
        name TEXT,
        type TEXT,
        intensity REAL,
        hue REAL,
        pattern_color1 TEXT,
        pattern_color2 TEXT,
        custom_css TEXT
      );`,
    },
    // Globals: je 1 Eintrag anlegen, damit Admin „Design & Farben“ und „Header“ nicht „Nothing found“ anzeigt
    {
      name: 'header: seed',
      sql: "INSERT INTO header (updated_at, created_at) SELECT datetime('now'), datetime('now') WHERE (SELECT COUNT(*) FROM header) = 0;",
    },
    {
      name: 'footer: seed',
      sql: "INSERT INTO footer (updated_at, created_at) SELECT datetime('now'), datetime('now') WHERE (SELECT COUNT(*) FROM footer) = 0;",
    },
    {
      name: 'design: seed',
      sql: "INSERT INTO design (updated_at, created_at) SELECT datetime('now'), datetime('now') WHERE (SELECT COUNT(*) FROM design) = 0;",
    },
    // Footer: Index entfernen, damit Payload-Push ihn neu anlegen kann (vermeidet „index footer_footer_logo_idx already exists“)
    { name: 'footer: drop legacy footer_footer_logo_idx', sql: 'DROP INDEX IF EXISTS footer_footer_logo_idx;' },
    // Indizes für hero_media_id (Payload/Drizzle erwarten diese Namen; ohne sie schlägt CREATE INDEX beim Push fehl)
    { name: 'site_pages: index hero_media_id', sql: 'CREATE INDEX IF NOT EXISTS site_pages_hero_hero_media_idx ON site_pages(hero_media_id);' },
    { name: '_site_pages_v: index version_hero_media_id', sql: 'CREATE INDEX IF NOT EXISTS _site_pages_v_version_hero_version_hero_media_idx ON _site_pages_v(version_hero_media_id);' },
    // Hero Philipp Bacher: Logo-Anzeige (Marquee vs. Logo Carousel)
    { name: 'site_pages: hero_logo_display_type', sql: "ALTER TABLE site_pages ADD COLUMN hero_logo_display_type TEXT DEFAULT 'marquee';" },
    { name: '_site_pages_v: version_hero_logo_display_type', sql: "ALTER TABLE _site_pages_v ADD COLUMN version_hero_logo_display_type TEXT DEFAULT 'marquee';" },
    // Hero Philipp Bacher: Globales Hintergrund-Preset (Relationship hero-backgrounds)
    { name: 'site_pages: hero_background_preset_id', sql: 'ALTER TABLE site_pages ADD COLUMN hero_background_preset_id INTEGER;' },
    { name: '_site_pages_v: version_hero_background_preset_id', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_background_preset_id INTEGER;' },
    // Locked Documents: Relationship für hero-backgrounds (damit Admin-„Locking“ nicht mit „no such column hero_backgrounds_id“ fehlschlägt)
    {
      name: 'payload_locked_documents_rels: hero_backgrounds_id',
      sql: 'ALTER TABLE payload_locked_documents_rels ADD COLUMN hero_backgrounds_id INTEGER;',
    },
    // Hero Backgrounds: Musterfarben (patternColor1, patternColor2)
    { name: 'hero_backgrounds: pattern_color1', sql: 'ALTER TABLE hero_backgrounds ADD COLUMN pattern_color1 TEXT;' },
    { name: 'hero_backgrounds: pattern_color2', sql: 'ALTER TABLE hero_backgrounds ADD COLUMN pattern_color2 TEXT;' },
    // Hero Philipp Bacher: separater Hintergrund-Typ für Mobilgeräte (mediaTypeMobile)
    { name: 'site_pages: hero_media_type_mobile', sql: 'ALTER TABLE site_pages ADD COLUMN hero_media_type_mobile TEXT;' },
    { name: '_site_pages_v: version_hero_media_type_mobile', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_media_type_mobile TEXT;' },
    // Hero Philipp Bacher: Floating-Animation (Maus-Reaktion + Idle-Schweben)
    { name: 'site_pages: hero_floating_mouse_strength', sql: 'ALTER TABLE site_pages ADD COLUMN hero_floating_mouse_strength REAL;' },
    { name: 'site_pages: hero_floating_idle_amplitude', sql: 'ALTER TABLE site_pages ADD COLUMN hero_floating_idle_amplitude REAL;' },
    { name: '_site_pages_v: version_hero_floating_mouse_strength', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_floating_mouse_strength REAL;' },
    { name: '_site_pages_v: version_hero_floating_idle_amplitude', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_floating_idle_amplitude REAL;' },
    // Hero Halo (Vanta) + Overlay-Einstellungen
    { name: 'site_pages: hero_halo_amplitude_factor', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_amplitude_factor REAL;' },
    { name: 'site_pages: hero_halo_size', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_size REAL;' },
    { name: 'site_pages: hero_halo_speed', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_speed REAL;' },
    { name: 'site_pages: hero_halo_color2', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_color2 INTEGER;' },
    { name: 'site_pages: hero_halo_x_offset', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_x_offset REAL;' },
    { name: 'site_pages: hero_halo_y_offset', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_y_offset REAL;' },
    { name: 'site_pages: hero_halo_overlay_gradient', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_overlay_gradient REAL;' },
    { name: 'site_pages: hero_halo_overlay_grid', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_overlay_grid REAL;' },
    { name: 'site_pages: hero_halo_overlay_grid_size', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_overlay_grid_size INTEGER;' },
    { name: 'site_pages: hero_use_halo_background', sql: 'ALTER TABLE site_pages ADD COLUMN hero_use_halo_background INTEGER DEFAULT 1;' },
    { name: 'site_pages: hero_halo_overlay_grid_variant', sql: "ALTER TABLE site_pages ADD COLUMN hero_halo_overlay_grid_variant TEXT DEFAULT 'static';" },
    { name: 'site_pages: hero_halo_overlay_grid_custom_code', sql: 'ALTER TABLE site_pages ADD COLUMN hero_halo_overlay_grid_custom_code TEXT;' },
    { name: '_site_pages_v: version_hero_halo_amplitude_factor', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_amplitude_factor REAL;' },
    { name: '_site_pages_v: version_hero_halo_size', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_size REAL;' },
    { name: '_site_pages_v: version_hero_halo_speed', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_speed REAL;' },
    { name: '_site_pages_v: version_hero_halo_color2', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_color2 INTEGER;' },
    { name: '_site_pages_v: version_hero_halo_x_offset', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_x_offset REAL;' },
    { name: '_site_pages_v: version_hero_halo_y_offset', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_y_offset REAL;' },
    { name: '_site_pages_v: version_hero_halo_overlay_gradient', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_overlay_gradient REAL;' },
    { name: '_site_pages_v: version_hero_halo_overlay_grid', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_overlay_grid REAL;' },
    { name: '_site_pages_v: version_hero_halo_overlay_grid_size', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_overlay_grid_size INTEGER;' },
    { name: '_site_pages_v: version_hero_use_halo_background', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_use_halo_background INTEGER DEFAULT 1;' },
    { name: '_site_pages_v: version_hero_halo_overlay_grid_variant', sql: "ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_overlay_grid_variant TEXT DEFAULT 'static';" },
    { name: '_site_pages_v: version_hero_halo_overlay_grid_custom_code', sql: 'ALTER TABLE _site_pages_v ADD COLUMN version_hero_halo_overlay_grid_custom_code TEXT;' },
    // Falls ein älteres Fix-Script hero_background_video_id → hero_background_video umbenannt hat:
    // zurück zu _id, damit Payload-Abfragen wieder funktionieren.
    {
      name: 'site_pages: hero_background_video → hero_background_video_id (Rücknahme)',
      sql: 'ALTER TABLE site_pages RENAME COLUMN hero_background_video TO hero_background_video_id;',
    },
    {
      name: '_site_pages_v: version_hero_background_video → version_hero_background_video_id (Rücknahme)',
      sql: 'ALTER TABLE _site_pages_v RENAME COLUMN version_hero_background_video TO version_hero_background_video_id;',
    },
  ]

  for (const step of steps) {
    try {
      runSqlite3(dbPath, step.sql)
      console.log('OK:', step.name)
    } catch (e) {
      const err = e as { message?: string; stderr?: string }
      const msg = `${err.message ?? ''}\n${typeof err.stderr === 'string' ? err.stderr : ''}`
      // Nicht mehr err.status === 1: sonst würden echte CREATE-Fehler verschluckt.
      const skip =
        msg.includes('no such table') ||
        msg.includes('no such column') ||
        msg.includes('duplicate column name') ||
        msg.includes('already exists')
      if (skip) {
        const line = msg.split('\n').find((l) => l.includes('Error:')) ?? msg.split('\n')[0]
        if (line) console.warn(line)
        console.warn('Übersprungen:', step.name)
      } else {
        console.error(msg.trim())
        throw e
      }
    }
  }

  rebuildPayloadArrayRowIdColumnsIfInteger(dbPath)

  console.log('Fertig.')
  console.log('Falls Header/Footer/Design im Admin „Nothing found“ zeigten: Globals wurden per Seed angelegt. Dev-Server neu starten.')
}

main()
