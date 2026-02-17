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

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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
  const quoted = sql.replace(/'/g, "'\"'\"'")
  execSync(`sqlite3 "${dbPath}" "${quoted}"`, { stdio: 'inherit' })
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
      const err = e as { status?: number; message?: string }
      const msg = err.message ?? ''
      const skip =
        err.status === 1 ||
        msg.includes('no such table') ||
        msg.includes('no such column') ||
        msg.includes('duplicate column name')
      if (skip) {
        console.warn('Übersprungen:', step.name)
      } else {
        throw e
      }
    }
  }

  console.log('Fertig.')
  console.log('Falls Header/Footer/Design im Admin „Nothing found“ zeigten: Globals wurden per Seed angelegt. Dev-Server neu starten.')
}

main()
