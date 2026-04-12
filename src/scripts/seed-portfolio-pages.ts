/**
 * Legt Portfolio-Unterseiten als editierbare `site-pages` an bzw. aktualisiert Platzhalter.
 *
 * Standardverhalten:
 * - erstellt fehlende Seiten
 * - aktualisiert nur "Platzhalter"-Seiten (leer oder nur 1x `content`-Block)
 * - überschreibt bestehende, ausgebaute Seiten NICHT
 *
 * Flags:
 * - --overwrite      überschreibt alle Zielseiten mit den Templates
 * - --dry-run        zeigt nur an, was passieren würde
 *
 * Ausführen:
 *   DATABASE_URL= POSTGRES_URL= tsx src/scripts/seed-portfolio-pages.ts
 *   DATABASE_URL= POSTGRES_URL= tsx src/scripts/seed-portfolio-pages.ts --overwrite
 */

import './load-env-import'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'
import { execFileSync } from 'child_process'
import path from 'path'

type ServiceItemTemplate = {
  title: string
  description: string
  iconUrl: string
  iconAlt: string
  slug?: string
}

type ServicesCategoryTemplate = {
  categoryLabel: string
  services: ServiceItemTemplate[]
}

type PageTemplate = {
  slug: string
  title: string
  hero: Record<string, unknown>
  layout: Array<Record<string, unknown>>
  metaTitle: string
  metaDescription: string
} 

function resolveSqlitePath(): string {
  const url = String(process.env.SQLITE_URL || 'file:./payload.db').trim()
  if (url.startsWith('file:')) {
    const raw = url.slice('file:'.length)
    return path.resolve(process.cwd(), raw)
  }
  return path.resolve(process.cwd(), 'payload.db')
}

function sqliteHasColumn(sqlitePath: string, table: string, column: string): boolean {
  const pragma = execFileSync('sqlite3', [sqlitePath, `PRAGMA table_info("${table}");`], {
    stdio: 'pipe',
    encoding: 'utf8',
  })

  return pragma
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .some((line) => line.split('|')[1] === column)
}

function ensureSqliteColumn(
  sqlitePath: string,
  table: string,
  column: string,
  definition: string,
): void {
  if (sqliteHasColumn(sqlitePath, table, column)) return

  execFileSync('sqlite3', [sqlitePath, `ALTER TABLE "${table}" ADD COLUMN "${column}" ${definition};`], {
    stdio: 'pipe',
  })
}

function ensurePortfolioBlockTablesForSqlite(): void {
  const hasPostgresUrl = Boolean(process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim())
  if (hasPostgresUrl) return

  const sqlitePath = resolveSqlitePath()
  const sql = `
CREATE TABLE IF NOT EXISTS "site_pages_blocks_cal_popup" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" text PRIMARY KEY NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 0,
  "headline" text,
  "description" text,
  "cal_link" text NOT NULL,
  "button_label" text DEFAULT 'Termin buchen',
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "site_pages_blocks_cal_popup_order_idx" ON "site_pages_blocks_cal_popup" ("_order");
CREATE INDEX IF NOT EXISTS "site_pages_blocks_cal_popup_parent_id_idx" ON "site_pages_blocks_cal_popup" ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_pages_blocks_cal_popup_path_idx" ON "site_pages_blocks_cal_popup" ("_path");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cal_popup" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 0,
  "headline" text,
  "description" text,
  "cal_link" text NOT NULL,
  "button_label" text DEFAULT 'Termin buchen',
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cal_popup_order_idx" ON "_site_pages_v_blocks_cal_popup" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cal_popup_parent_id_idx" ON "_site_pages_v_blocks_cal_popup" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cal_popup_path_idx" ON "_site_pages_v_blocks_cal_popup" ("_path");

CREATE TABLE IF NOT EXISTS "contact_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" text PRIMARY KEY NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 0,
  "cta_label" text,
  "cta_href" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "contact_cards_order_idx" ON "contact_cards" ("_order");
CREATE INDEX IF NOT EXISTS "contact_cards_parent_id_idx" ON "contact_cards" ("_parent_id");
CREATE INDEX IF NOT EXISTS "contact_cards_path_idx" ON "contact_cards" ("_path");

CREATE TABLE IF NOT EXISTS "contact_cards_cards" (
  "_order" integer NOT NULL,
  "_parent_id" text NOT NULL REFERENCES "contact_cards"("id") ON DELETE CASCADE,
  "id" text PRIMARY KEY NOT NULL,
  "icon" text,
  "title" text NOT NULL,
  "lines" text NOT NULL
);
CREATE INDEX IF NOT EXISTS "contact_cards_cards_order_idx" ON "contact_cards_cards" ("_order");
CREATE INDEX IF NOT EXISTS "contact_cards_cards_parent_id_idx" ON "contact_cards_cards" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_contact_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 0,
  "cta_label" text,
  "cta_href" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_order_idx" ON "_site_pages_v_blocks_contact_cards" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_parent_id_idx" ON "_site_pages_v_blocks_contact_cards" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_path_idx" ON "_site_pages_v_blocks_contact_cards" ("_path");

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_contact_cards_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_contact_cards"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon" text,
  "title" text NOT NULL,
  "lines" text NOT NULL,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_cards_order_idx" ON "_site_pages_v_blocks_contact_cards_cards" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_cards_parent_id_idx" ON "_site_pages_v_blocks_contact_cards_cards" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_services_grid_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "heading" text DEFAULT 'Leistungen',
  "intro" text,
  "tagline" text,
  "intro_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
  "intro_image_position" text DEFAULT 'left',
  "radial_background" integer DEFAULT 0,
  "radial_background_variant" text DEFAULT 'default',
  "radial_background_strength" text DEFAULT 'medium',
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_services_grid_v_order_idx" ON "_services_grid_v" ("_order");
CREATE INDEX IF NOT EXISTS "_services_grid_v_parent_id_idx" ON "_services_grid_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_services_grid_v_path_idx" ON "_services_grid_v" ("_path");
CREATE INDEX IF NOT EXISTS "_services_grid_v_intro_image_idx" ON "_services_grid_v" ("intro_image_id");

CREATE TABLE IF NOT EXISTS "_services_grid_v_intro_icon_list" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_services_grid_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon" text DEFAULT 'zap',
  "text" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_services_grid_v_intro_icon_list_order_idx" ON "_services_grid_v_intro_icon_list" ("_order");
CREATE INDEX IF NOT EXISTS "_services_grid_v_intro_icon_list_parent_id_idx" ON "_services_grid_v_intro_icon_list" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_services_grid_v_categories" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_services_grid_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "category_label" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_services_grid_v_categories_order_idx" ON "_services_grid_v_categories" ("_order");
CREATE INDEX IF NOT EXISTS "_services_grid_v_categories_parent_id_idx" ON "_services_grid_v_categories" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_services_grid_v_categories_services" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_services_grid_v_categories"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon_url" text,
  "icon_alt" text,
  "title" text,
  "description" text,
  "link_slug" text,
  "featured" integer DEFAULT 0,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_services_grid_v_categories_services_order_idx" ON "_services_grid_v_categories_services" ("_order");
CREATE INDEX IF NOT EXISTS "_services_grid_v_categories_services_parent_id_idx" ON "_services_grid_v_categories_services" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_contact_cards_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 0,
  "cta_label" text,
  "cta_href" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_contact_cards_v_order_idx" ON "_contact_cards_v" ("_order");
CREATE INDEX IF NOT EXISTS "_contact_cards_v_parent_id_idx" ON "_contact_cards_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_contact_cards_v_path_idx" ON "_contact_cards_v" ("_path");

CREATE TABLE IF NOT EXISTS "_contact_cards_v_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_contact_cards_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon" text,
  "title" text,
  "lines" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_contact_cards_v_cards_order_idx" ON "_contact_cards_v_cards" ("_order");
CREATE INDEX IF NOT EXISTS "_contact_cards_v_cards_parent_id_idx" ON "_contact_cards_v_cards" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_ueber_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "section_title" text,
  "einleitung" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_ueber_v_order_idx" ON "_prof_ueber_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_ueber_v_parent_id_idx" ON "_prof_ueber_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_ueber_v_path_idx" ON "_prof_ueber_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_ueber_v_werte" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_ueber_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon" text DEFAULT 'strategy',
  "wert" text,
  "beschreibung" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_ueber_v_werte_order_idx" ON "_prof_ueber_v_werte" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_ueber_v_werte_parent_id_idx" ON "_prof_ueber_v_werte" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_kern_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "ueberschrift" text,
  "einleitung" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_kern_v_order_idx" ON "_prof_kern_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_kern_v_parent_id_idx" ON "_prof_kern_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_kern_v_path_idx" ON "_prof_kern_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_kern_v_bereiche" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_kern_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "titel" text,
  "text" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_kern_v_bereiche_order_idx" ON "_prof_kern_v_bereiche" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_kern_v_bereiche_parent_id_idx" ON "_prof_kern_v_bereiche" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_kern_v_bereiche_details" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_kern_v_bereiche"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "line" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_kern_v_bereiche_details_order_idx" ON "_prof_kern_v_bereiche_details" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_kern_v_bereiche_details_parent_id_idx" ON "_prof_kern_v_bereiche_details" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_skills_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "section_title" text,
  "section_intro" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_skills_v_order_idx" ON "_prof_skills_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_skills_v_parent_id_idx" ON "_prof_skills_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_skills_v_path_idx" ON "_prof_skills_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_skills_v_spalten" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_skills_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "bereich" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_skills_v_spalten_order_idx" ON "_prof_skills_v_spalten" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_skills_v_spalten_parent_id_idx" ON "_prof_skills_v_spalten" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_skills_v_spalten_skills" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_skills_v_spalten"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "skill" text,
  "level" text DEFAULT 'expert',
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_skills_v_spalten_skills_order_idx" ON "_prof_skills_v_spalten_skills" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_skills_v_spalten_skills_parent_id_idx" ON "_prof_skills_v_spalten_skills" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_weg_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "section_title" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_weg_v_order_idx" ON "_prof_weg_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_weg_v_parent_id_idx" ON "_prof_weg_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_weg_v_path_idx" ON "_prof_weg_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_weg_v_eintraege" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_weg_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "zeitraum" text,
  "position" text,
  "unternehmen" text,
  "beschreibung" text,
  "typ" text DEFAULT 'freelance',
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_weg_v_eintraege_order_idx" ON "_prof_weg_v_eintraege" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_weg_v_eintraege_parent_id_idx" ON "_prof_weg_v_eintraege" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_zahl_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "section_title" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_zahl_v_order_idx" ON "_prof_zahl_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_zahl_v_parent_id_idx" ON "_prof_zahl_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_zahl_v_path_idx" ON "_prof_zahl_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_zahl_v_items" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_zahl_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "zahl" text,
  "bezeichnung" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_zahl_v_items_order_idx" ON "_prof_zahl_v_items" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_zahl_v_items_parent_id_idx" ON "_prof_zahl_v_items" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_tools_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "section_title" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_tools_v_order_idx" ON "_prof_tools_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_tools_v_parent_id_idx" ON "_prof_tools_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_tools_v_path_idx" ON "_prof_tools_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_tools_v_tools" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_tools_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name" text,
  "kategorie" text DEFAULT 'dev',
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_tools_v_tools_order_idx" ON "_prof_tools_v_tools" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_tools_v_tools_parent_id_idx" ON "_prof_tools_v_tools" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_lang_zert_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "sprachen_section_title" text,
  "zertifikate_section_title" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_order_idx" ON "_prof_lang_zert_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_parent_id_idx" ON "_prof_lang_zert_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_path_idx" ON "_prof_lang_zert_v" ("_path");

CREATE TABLE IF NOT EXISTS "_prof_lang_zert_v_sprachen" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_lang_zert_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "sprache" text,
  "niveau" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_sprachen_order_idx" ON "_prof_lang_zert_v_sprachen" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_sprachen_parent_id_idx" ON "_prof_lang_zert_v_sprachen" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_lang_zert_v_zertifikate" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_prof_lang_zert_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "bezeichnung" text,
  "_uuid" text
);
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_zertifikate_order_idx" ON "_prof_lang_zert_v_zertifikate" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_lang_zert_v_zertifikate_parent_id_idx" ON "_prof_lang_zert_v_zertifikate" ("_parent_id");

CREATE TABLE IF NOT EXISTS "_prof_cta_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" text DEFAULT 'none',
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" text DEFAULT 'dark',
  "block_overlay_opacity" real DEFAULT 30,
  "headline" text,
  "text" text,
  "button_label" text,
  "button_link" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_prof_cta_v_order_idx" ON "_prof_cta_v" ("_order");
CREATE INDEX IF NOT EXISTS "_prof_cta_v_parent_id_idx" ON "_prof_cta_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_prof_cta_v_path_idx" ON "_prof_cta_v" ("_path");

CREATE TABLE IF NOT EXISTS "price_calc_categories" (
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" text NOT NULL,
  "sort_order" real DEFAULT 0,
  "updated_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS "price_calc_categories_updated_at_idx" ON "price_calc_categories" ("updated_at");
CREATE INDEX IF NOT EXISTS "price_calc_categories_created_at_idx" ON "price_calc_categories" ("created_at");

CREATE TABLE IF NOT EXISTS "price_calc_items" (
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "category_id" integer NOT NULL REFERENCES "price_calc_categories"("id") ON DELETE SET NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "sort_order" real DEFAULT 0,
  "pricing_type" text NOT NULL DEFAULT 'once',
  "once_min" real,
  "once_max" real,
  "monthly_min" real,
  "monthly_max" real,
  "updated_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS "price_calc_items_category_idx" ON "price_calc_items" ("category_id");
CREATE INDEX IF NOT EXISTS "price_calc_items_updated_at_idx" ON "price_calc_items" ("updated_at");
CREATE INDEX IF NOT EXISTS "price_calc_items_created_at_idx" ON "price_calc_items" ("created_at");

CREATE TABLE IF NOT EXISTS "price_calculator" (
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "section_label" text DEFAULT 'Preisrechner',
  "heading" text DEFAULT 'Was planen Sie?',
  "sub" text DEFAULT 'Kategorie wählen, Leistungen anklicken – Richtwert erscheint sofort. Mehrere Kategorien kombinierbar.',
  "offer_button_label" text DEFAULT 'Angebot anfragen ↗',
  "offer_link" text DEFAULT '/kontakt',
  "empty_breakdown_message" text DEFAULT 'Wählen Sie oben eine Kategorie und Leistungen aus.',
  "rates_section_label" text DEFAULT 'Stundensatz & Tagessatz',
  "rates_heading" text DEFAULT 'Für flexible & laufende Zusammenarbeit',
  "hourly_rate" real DEFAULT 120 NOT NULL,
  "day_rate" real DEFAULT 890 NOT NULL,
  "week_rate" real DEFAULT 3200 NOT NULL,
  "rates_note" text DEFAULT 'Stundensätze gelten für Beratung, Ad-hoc-Aufgaben und Projekte ohne definierten Scope. Bei Projekten mit klarem Umfang arbeite ich grundsätzlich auf Festpreisbasis – transparenter für Sie, planbarer für beide Seiten.',
  "updated_at" text DEFAULT CURRENT_TIMESTAMP,
  "created_at" text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_price_calculator" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "show_rates_section" integer DEFAULT 1,
  "section_label" text,
  "heading" text,
  "sub" text,
  "_uuid" text,
  "block_name" text
);
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_price_calculator_order_idx" ON "_site_pages_v_blocks_price_calculator" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_price_calculator_parent_id_idx" ON "_site_pages_v_blocks_price_calculator" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_price_calculator_path_idx" ON "_site_pages_v_blocks_price_calculator" ("_path");
`

  execFileSync('sqlite3', [sqlitePath, sql], { stdio: 'pipe' })
  ensureSqliteColumn(sqlitePath, '_site_pages_v', 'version_hero_badge', 'text')
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_surface_pattern',
    "text DEFAULT 'none'",
  )
  ensureSqliteColumn(sqlitePath, '_site_pages_v', 'version_hero_stack_back_image_id', 'integer')
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_stack_back_offset_x',
    'real DEFAULT 0',
  )
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_stack_back_offset_y',
    'real DEFAULT 0',
  )
  ensureSqliteColumn(sqlitePath, '_site_pages_v', 'version_hero_stack_mid_image_id', 'integer')
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_stack_mid_offset_x',
    'real DEFAULT 0',
  )
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_stack_mid_offset_y',
    'real DEFAULT 0',
  )
  ensureSqliteColumn(sqlitePath, '_site_pages_v', 'version_hero_stack_front_image_id', 'integer')
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_stack_front_offset_x',
    'real DEFAULT 0',
  )
  ensureSqliteColumn(
    sqlitePath,
    '_site_pages_v',
    'version_hero_stack_front_offset_y',
    'real DEFAULT 0',
  )
  ensureSqliteColumn(sqlitePath, '_site_pages_v_blocks_shadcn_block_content_images', '_uuid', 'text')
  ensureSqliteColumn(
    sqlitePath,
    'payload_locked_documents_rels',
    'price_calc_categories_id',
    'integer',
  )
  ensureSqliteColumn(sqlitePath, 'payload_locked_documents_rels', 'price_calc_items_id', 'integer')
}

const ICONS = {
  portfolioWebdesign: '/api/media/file/portfolio-webdesign.svg',
  portfolioMarketing: '/api/media/file/portfolio-marketing.svg',
  portfolioBrands: '/api/media/file/portfolio-brands.svg',
  webdesign: '/api/media/file/webdesign.svg',
  seo: '/api/media/file/SEO.svg',
  logo: '/api/media/file/Logo-Design.svg',
  leads: '/api/media/file/Leadgenerierung.svg',
  design: '/api/media/file/design-leistungen.svg',
  marketing: '/api/media/file/marketing-leistungen.svg',
} as const

function buildServicesGridBlock(args: {
  heading: string
  intro: string
  tagline?: string
  categories: ServicesCategoryTemplate[]
  radialBackgroundVariant?: 'default' | 'blue' | 'orange'
}): Record<string, unknown> {
  const {
    heading,
    intro,
    tagline,
    categories,
    radialBackgroundVariant = 'default',
  } = args

  return {
    blockType: 'servicesGrid',
    heading,
    intro,
    tagline,
    radialBackground: true,
    radialBackgroundVariant,
    radialBackgroundStrength: 'medium',
    categories: categories.map((category) => ({
      categoryLabel: category.categoryLabel,
      services: category.services.map((service) => ({
        title: service.title,
        description: service.description,
        icon: {
          url: service.iconUrl,
          alt: service.iconAlt,
        },
        ...(service.slug ? { link: { slug: service.slug } } : {}),
      })),
    })),
  }
}

function buildWhyWorkWithMeBlock(args: {
  heading: string
  intro: string
  reasons: Array<{ icon: string; title: string; description: string }>
}): Record<string, unknown> {
  return {
    blockType: 'whyWorkWithMe',
    heading: args.heading,
    intro: args.intro,
    reasons: args.reasons,
  }
}

function buildIntroductionBlock(args: {
  heading: string
  body: string
  tagline?: string
}): Record<string, unknown> {
  return {
    blockType: 'introduction',
    heading: args.heading,
    body: args.body,
    tagline: args.tagline ?? '',
  }
}

function buildContactInfoCardsBlock(): Record<string, unknown> {
  return {
    blockType: 'contactInfoCards',
    cards: [
      {
        icon: 'map-pin',
        title: 'Standort',
        lines: 'Halle (Saale) & Remote\nDACH-weit verfügbar',
      },
      {
        icon: 'mail',
        title: 'Kontakt',
        lines: 'mail@philippbacher.com\nAntwort in der Regel innerhalb 24h',
      },
      {
        icon: 'clock-3',
        title: 'Verfügbarkeit',
        lines: 'Mo-Fr: 09:00-18:00 Uhr\nKickoff kurzfristig möglich',
      },
    ],
    ctaLabel: 'Projektgespräch anfragen',
    ctaHref: '/kontakt',
  }
}

function buildCalPopupBlock(args: { headline: string; description: string }): Record<string, unknown> {
  return {
    blockType: 'calPopup',
    headline: args.headline,
    description: args.description,
    calLink: 'philippbacher/30min',
    buttonLabel: 'Termin buchen',
  }
}

function isPlaceholderLayout(layout: unknown): boolean {
  if (!Array.isArray(layout)) return true
  if (layout.length === 0) return true

  if (layout.length === 1 && layout[0] && typeof layout[0] === 'object') {
    const blockType = (layout[0] as { blockType?: unknown }).blockType
    return blockType === 'content'
  }

  return false
}

const templates: PageTemplate[] = [
  {
    slug: 'portfolio',
    title: 'Portfolio',
    hero: {
      type: 'lowImpact',
      subheadline: 'Portfolio',
      headline: 'Webdesign, Marketing und Branding mit messbarem Anspruch',
      description:
        'Drei Disziplinen, ein Ziel: digitale Auftritte und Kampagnen, die sichtbar wirken und zuverlässig Ergebnisse liefern.',
    },
    layout: [
      buildIntroductionBlock({
        heading: 'Portfolio als strukturierter Leistungsnachweis',
        body: 'Hier findest du ausgewählte Arbeiten aus Webdesign, Marketing und Branding. Jede Unterseite zeigt Vorgehen, Umsetzung und Ergebnis in einem klaren Aufbau.',
        tagline:
          'Fokus auf reale Anforderungen statt Showcases ohne Kontext.\nBearbeitbar im Backend über modulare Blöcke.',
      }),
      buildServicesGridBlock({
        heading: 'Portfolio-Bereiche',
        intro: 'Wähle den Bereich, der zu deinem Vorhaben passt.',
        tagline: 'Jede Unterseite folgt einer eigenen visuellen und inhaltlichen Logik.',
        categories: [
          {
            categoryLabel: 'Webdesign',
            services: [
              {
                title: 'Webdesign & Entwicklung',
                description:
                  'UX-orientierte Websites und digitale Produkte mit sauberer technischer Umsetzung.',
                iconUrl: ICONS.portfolioWebdesign,
                iconAlt: 'Portfolio Webdesign',
                slug: 'portfolio-webdesign',
              },
            ],
          },
          {
            categoryLabel: 'Marketing',
            services: [
              {
                title: 'Marketing-Projekte',
                description:
                  'SEO, SEM und Lead-Strategien mit klaren KPIs und datenbasierten Entscheidungen.',
                iconUrl: ICONS.portfolioMarketing,
                iconAlt: 'Portfolio Marketing',
                slug: 'portfolio-marketing',
              },
            ],
          },
          {
            categoryLabel: 'Branding',
            services: [
              {
                title: 'Marken und Logos',
                description:
                  'Markenauftritte mit klarer Identität, konsistenter Gestaltung und Wiedererkennung.',
                iconUrl: ICONS.portfolioBrands,
                iconAlt: 'Portfolio Branding',
                slug: 'portfolio-branding',
              },
            ],
          },
        ],
      }),
      buildWhyWorkWithMeBlock({
        heading: 'Warum dieses Setup',
        intro:
          'Die Portfolio-Unterseiten sind nicht statisch, sondern als editierbare Inhaltsmodule aufgebaut.',
        reasons: [
          {
            icon: 'zap',
            title: 'Schnell pflegbar',
            description: 'Inhalte und Reihenfolge lassen sich direkt im Payload-Backend anpassen.',
          },
          {
            icon: 'target',
            title: 'Bereichsspezifische Dramaturgie',
            description: 'Webdesign, Marketing und Branding bekommen jeweils eine eigene Storyline.',
          },
          {
            icon: 'trending-up',
            title: 'Skalierbar',
            description:
              'Neue Cases können ohne Code-Duplikate ergänzt werden und folgen derselben Struktur.',
          },
        ],
      }),
      buildCalPopupBlock({
        headline: 'Projektidee besprechen',
        description: 'In 30 Minuten klären wir Zielbild, Prioritäten und nächsten sinnvollen Schritt.',
      }),
    ],
    metaTitle: 'Portfolio | Webdesign, Marketing & Branding',
    metaDescription:
      'Portfolio mit Bereichen für Webdesign, Marketing und Branding. Klar strukturiert und im Backend editierbar.',
  },
  {
    slug: 'portfolio-webdesign',
    title: 'Portfolio Webdesign',
    hero: {
      type: 'lowImpact',
      subheadline: 'Portfolio Webdesign',
      headline: 'Webseiten und digitale Erlebnisse mit Fokus auf UX und Conversion',
      description:
        'Von Struktur und Interface bis Technik und Performance: jedes Projekt verbindet Designqualität mit klarer Funktion.',
    },
    layout: [
      buildIntroductionBlock({
        heading: 'Wie Webdesign-Projekte hier aufgebaut sind',
        body: 'Jeder Case zeigt Ausgangslage, Konzept, UI-Umsetzung und das messbare Ergebnis. So wird nachvollziehbar, warum Designentscheidungen getroffen wurden.',
        tagline: 'Design ist nicht Dekoration.\nDesign ist ein System für Orientierung und Handlung.',
      }),
      {
        blockType: 'shadcnBlock',
        variant: 'feature267',
        content: {
          subheadline: 'Case Highlights',
          headline: 'Ausgewählte Webdesign-Projekte',
          body: 'Visuelle Qualität, klare Informationsarchitektur und performante Frontends als gemeinsame Leitlinie.',
        },
      },
      buildServicesGridBlock({
        heading: 'Leistungsfelder im Webdesign',
        intro: 'Typische Schwerpunkte in Webdesign- und Umsetzungsprojekten.',
        categories: [
          {
            categoryLabel: 'Design & UX',
            services: [
              {
                title: 'Corporate Website',
                description: 'Klare Positionierung, moderne Gestaltung und konsistente Nutzerführung.',
                iconUrl: ICONS.webdesign,
                iconAlt: 'Webdesign',
              },
              {
                title: 'Landingpage-Systeme',
                description: 'Conversion-orientierte Seitenstrukturen für Kampagnen und Lead-Generierung.',
                iconUrl: ICONS.design,
                iconAlt: 'Design Leistungen',
              },
            ],
          },
          {
            categoryLabel: 'Technik & Performance',
            services: [
              {
                title: 'Responsive Frontend',
                description: 'Saubere Umsetzung für Desktop, Tablet und Mobile mit konsistentem Verhalten.',
                iconUrl: ICONS.webdesign,
                iconAlt: 'Responsive Webdesign',
              },
              {
                title: 'Core Web Vitals',
                description:
                  'Optimierung für Ladezeit, Stabilität und Interaktion zur Verbesserung der User Experience.',
                iconUrl: ICONS.leads,
                iconAlt: 'Performance',
              },
            ],
          },
        ],
        radialBackgroundVariant: 'blue',
      }),
      buildContactInfoCardsBlock(),
      buildCalPopupBlock({
        headline: 'Webdesign-Projekt starten',
        description: 'Wir definieren Scope, Prioritäten und einen realistischen Umsetzungsplan.',
      }),
    ],
    metaTitle: 'Portfolio Webdesign | UX, UI und Performance',
    metaDescription:
      'Webdesign-Portfolio mit Fokus auf UX, Interface-Qualität und performanter Umsetzung.',
  },
  {
    slug: 'portfolio-marketing',
    title: 'Portfolio Marketing',
    hero: {
      type: 'lowImpact',
      subheadline: 'Portfolio Marketing',
      headline: 'Marketing-Projekte mit Fokus auf SEO, SEM und Leads',
      description:
        'Strategie, Umsetzung und Optimierung in einem datengetriebenen Prozess mit klaren Leistungskennzahlen.',
    },
    layout: [
      buildIntroductionBlock({
        heading: 'Marketing-Cases mit nachvollziehbarer Wirkung',
        body: 'Die Cases folgen einer klaren Logik: Ziel, Kanalmix, Maßnahmen, Ergebnis. So bleibt sichtbar, welche Entscheidung welchen Effekt erzeugt hat.',
        tagline:
          'Nicht nur Reichweite zählen.\nRelevante Leads und stabile Performance zählen.',
      }),
      {
        blockType: 'servicesOverview',
        heading: 'Kernbereiche im Marketing-Portfolio',
        intro: 'Die Projekte verteilen sich auf drei wiederkehrende Schwerpunkte.',
        services: [
          {
            icon: 'trending-up',
            title: 'SEO',
            description:
              'Technische und inhaltliche Optimierung für nachhaltige organische Sichtbarkeit.',
          },
          {
            icon: 'rocket',
            title: 'SEM',
            description:
              'Performance-Kampagnen mit sauberem Setup, Testing und laufender Effizienzsteigerung.',
          },
          {
            icon: 'zap',
            title: 'Lead-Strategie',
            description:
              'Funnel-orientierte Maßnahmen zur Steigerung qualifizierter Anfragen und Conversion-Raten.',
          },
        ],
      },
      buildServicesGridBlock({
        heading: 'Case-Typen im Marketing',
        intro: 'Auswahl typischer Marketing-Projektformen.',
        categories: [
          {
            categoryLabel: 'Organic & Paid',
            services: [
              {
                title: 'SEO-Relaunch-Begleitung',
                description:
                  'Migration, Onpage-Optimierung und Content-Struktur zur Stabilisierung von Rankings.',
                iconUrl: ICONS.seo,
                iconAlt: 'SEO',
              },
              {
                title: 'SEM-Kampagnen-Optimierung',
                description:
                  'Anzeigenstruktur, Suchintentionen und Budgetsteuerung für bessere Kosten-Umsatz-Relation.',
                iconUrl: ICONS.marketing,
                iconAlt: 'Marketing',
              },
              {
                title: 'Lead-Generierung',
                description:
                  'Kampagnen, Landingpages und Tracking zu einem performanten Akquise-Setup verbunden.',
                iconUrl: ICONS.leads,
                iconAlt: 'Leads',
              },
            ],
          },
        ],
        radialBackgroundVariant: 'orange',
      }),
      buildWhyWorkWithMeBlock({
        heading: 'Was Marketing-Projekte hier auszeichnet',
        intro: 'Der Fokus liegt auf Wirkung und klaren Entscheidungsgrundlagen.',
        reasons: [
          {
            icon: 'target',
            title: 'KPI-orientierter Aufbau',
            description: 'Jeder Case ist entlang konkreter Ziele und Kennzahlen dokumentiert.',
          },
          {
            icon: 'briefcase',
            title: 'Analytischer Prozess',
            description:
              'Hypothesen, Tests und Optimierungsschleifen sind nachvollziehbar dargestellt.',
          },
          {
            icon: 'trending-up',
            title: 'Skalierbare Learnings',
            description:
              'Erkenntnisse aus Cases lassen sich auf neue Kampagnen und Märkte übertragen.',
          },
        ],
      }),
      buildCalPopupBlock({
        headline: 'Marketing-Ziele in einen Plan übersetzen',
        description: 'Wir priorisieren Kanäle, Budget und Quick Wins in einem kompakten Kickoff.',
      }),
    ],
    metaTitle: 'Portfolio Marketing | SEO, SEM und Lead-Strategien',
    metaDescription:
      'Marketing-Portfolio mit Cases aus SEO, SEM und Lead-Generierung, strukturiert nach Ziel, Maßnahmen und Ergebnis.',
  },
  {
    slug: 'portfolio-branding',
    title: 'Portfolio Marken',
    hero: {
      type: 'lowImpact',
      subheadline: 'Portfolio Branding',
      headline: 'Markenprojekte von Logoentwicklung bis konsistenter Markenwelt',
      description:
        'Branding-Cases, die Strategie und Gestaltung verbinden und eine klare Wiedererkennbarkeit schaffen.',
    },
    layout: [
      buildIntroductionBlock({
        heading: 'Branding mit klarer Identität',
        body: 'Die Cases zeigen, wie aus Positionierung, Tonalität und Design eine konsistente Markenwahrnehmung entsteht - vom ersten Logo bis zur Anwendung im Alltag.',
        tagline: 'Marke ist ein System.\nNicht nur ein einzelnes Zeichen.',
      }),
      buildServicesGridBlock({
        heading: 'Leistungsfelder im Branding',
        intro: 'Ausgewählte Projektarten aus Markenaufbau und Weiterentwicklung.',
        categories: [
          {
            categoryLabel: 'Marke & Designsystem',
            services: [
              {
                title: 'Logo-Entwicklung',
                description:
                  'Einprägsame Logos mit Varianten für digitale und analoge Anwendungen.',
                iconUrl: ICONS.logo,
                iconAlt: 'Logo Design',
              },
              {
                title: 'Corporate Identity',
                description:
                  'Farbwelt, Typografie und Gestaltungsprinzipien als konsistente Markenbasis.',
                iconUrl: ICONS.design,
                iconAlt: 'Corporate Identity',
              },
              {
                title: 'Markenstrategie',
                description:
                  'Positionierung, Kernbotschaften und visuelle Leitplanken für langfristige Wiedererkennung.',
                iconUrl: ICONS.portfolioBrands,
                iconAlt: 'Branding',
              },
            ],
          },
        ],
        radialBackgroundVariant: 'default',
      }),
      buildWhyWorkWithMeBlock({
        heading: 'Warum Branding-Cases separat dargestellt werden',
        intro:
          'Branding-Projekte folgen anderen Kriterien als Webdesign oder Performance-Marketing.',
        reasons: [
          {
            icon: 'heart',
            title: 'Emotion und Klarheit',
            description:
              'Die Darstellung kombiniert rationale Entscheidungen mit emotionaler Markenwirkung.',
          },
          {
            icon: 'shield',
            title: 'Konsistenz',
            description:
              'Logo, Typografie und Tonalität werden als zusammenhängendes System dokumentiert.',
          },
          {
            icon: 'briefcase',
            title: 'Anwendung im Alltag',
            description:
              'Cases zeigen nicht nur Entwürfe, sondern konkrete Einsätze in Kommunikation und Vertrieb.',
          },
        ],
      }),
      buildContactInfoCardsBlock(),
      buildCalPopupBlock({
        headline: 'Markenauftritt schärfen',
        description:
          'Wir analysieren Status quo, definieren Positionierung und priorisieren die nächsten Design-Schritte.',
      }),
    ],
    metaTitle: 'Portfolio Marken | Branding, Logo und Corporate Identity',
    metaDescription:
      'Branding-Portfolio mit Cases aus Logoentwicklung, Corporate Identity und Markenstrategie.',
  },
]

async function main() {
  ensurePortfolioBlockTablesForSqlite()

  const args = new Set(process.argv.slice(2))
  const overwrite = args.has('--overwrite')
  const dryRun = args.has('--dry-run')

  const payload = await getPayload({ config })
  const now = new Date().toISOString()

  let created = 0
  let updated = 0
  let skipped = 0

  for (const template of templates) {
    const existing = await payload.find({
      collection: 'site-pages',
      limit: 1,
      depth: 0,
      overrideAccess: true,
      where: {
        slug: {
          equals: template.slug,
        },
      },
    })

    const page = existing.docs[0]
    const data: RequiredDataFromCollectionSlug<'site-pages'> = {
      title: template.title,
      slug: template.slug,
      hero: template.hero as RequiredDataFromCollectionSlug<'site-pages'>['hero'],
      layout: template.layout as unknown as RequiredDataFromCollectionSlug<'site-pages'>['layout'],
      meta: {
        title: template.metaTitle,
        description: template.metaDescription,
      },
      _status: 'published',
      publishedAt: now,
    }

    if (!page) {
      if (dryRun) {
        console.log(`[dry-run] create: ${template.slug}`)
      } else {
        await payload.create({
          collection: 'site-pages',
          data,
          draft: false,
          overrideAccess: true,
          depth: 0,
          context: { skipRevalidate: true },
        })
        console.log(`create: ${template.slug}`)
      }
      created += 1
      continue
    }

    const placeholder = isPlaceholderLayout(page.layout)
    if (!overwrite && !placeholder) {
      console.log(`skip (existing content): ${template.slug}`)
      skipped += 1
      continue
    }

    if (dryRun) {
      console.log(`[dry-run] update: ${template.slug}${placeholder ? ' (placeholder)' : ''}`)
    } else {
      await payload.update({
        collection: 'site-pages',
        id: page.id,
        data,
        overrideAccess: true,
        depth: 0,
        context: { skipRevalidate: true },
      })
      console.log(`update: ${template.slug}${placeholder ? ' (placeholder)' : ''}`)
    }
    updated += 1
  }

  console.log('')
  console.log(`done: created=${created}, updated=${updated}, skipped=${skipped}, dryRun=${dryRun}`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
