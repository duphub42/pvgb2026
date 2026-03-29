import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Profil: monolithischen Block profil_bacher entfernen; acht editierbare Blöcke mit kurzen dbName-Suffixen (Postgres ≤63 Zeichen).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_profil_bacher";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_profil_bacher";`))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_ueber" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "section_title" varchar,
      "einleitung" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_ueber_order_idx" ON "site_pages_blocks_prof_ueber" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_ueber_parent_id_idx" ON "site_pages_blocks_prof_ueber" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_ueber_path_idx" ON "site_pages_blocks_prof_ueber" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_ueber_werte" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_ueber"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'strategy',
      "wert" varchar,
      "beschreibung" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_ueber_werte_order_idx" ON "site_pages_blocks_prof_ueber_werte" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_ueber_werte_parent_id_idx" ON "site_pages_blocks_prof_ueber_werte" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_kern" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "ueberschrift" varchar,
      "einleitung" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_order_idx" ON "site_pages_blocks_prof_kern" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_parent_id_idx" ON "site_pages_blocks_prof_kern" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_path_idx" ON "site_pages_blocks_prof_kern" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_kern_bereiche" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_kern"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "titel" varchar,
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_bereiche_order_idx" ON "site_pages_blocks_prof_kern_bereiche" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_bereiche_parent_id_idx" ON "site_pages_blocks_prof_kern_bereiche" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_kern_bereiche_details" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages_blocks_prof_kern_bereiche"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "line" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_bereiche_details_order_idx" ON "site_pages_blocks_prof_kern_bereiche_details" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_kern_bereiche_details_parent_id_idx" ON "site_pages_blocks_prof_kern_bereiche_details" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_skills" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "section_title" varchar,
      "section_intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_order_idx" ON "site_pages_blocks_prof_skills" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_parent_id_idx" ON "site_pages_blocks_prof_skills" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_path_idx" ON "site_pages_blocks_prof_skills" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_skills_spalten" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_skills"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "bereich" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_spalten_order_idx" ON "site_pages_blocks_prof_skills_spalten" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_spalten_parent_id_idx" ON "site_pages_blocks_prof_skills_spalten" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_skills_spalten_skills" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages_blocks_prof_skills_spalten"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "skill" varchar,
      "level" varchar DEFAULT 'expert'
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_spalten_skills_order_idx" ON "site_pages_blocks_prof_skills_spalten_skills" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_skills_spalten_skills_parent_id_idx" ON "site_pages_blocks_prof_skills_spalten_skills" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_weg" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_weg_order_idx" ON "site_pages_blocks_prof_weg" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_weg_parent_id_idx" ON "site_pages_blocks_prof_weg" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_weg_path_idx" ON "site_pages_blocks_prof_weg" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_weg_eintraege" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_weg"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "zeitraum" varchar,
      "position" varchar,
      "unternehmen" varchar,
      "beschreibung" varchar,
      "typ" varchar DEFAULT 'freelance'
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_weg_eintraege_order_idx" ON "site_pages_blocks_prof_weg_eintraege" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_weg_eintraege_parent_id_idx" ON "site_pages_blocks_prof_weg_eintraege" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_zahl" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_zahl_order_idx" ON "site_pages_blocks_prof_zahl" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_zahl_parent_id_idx" ON "site_pages_blocks_prof_zahl" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_zahl_path_idx" ON "site_pages_blocks_prof_zahl" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_zahl_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_zahl"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "zahl" varchar,
      "bezeichnung" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_zahl_items_order_idx" ON "site_pages_blocks_prof_zahl_items" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_zahl_items_parent_id_idx" ON "site_pages_blocks_prof_zahl_items" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_tools" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_tools_order_idx" ON "site_pages_blocks_prof_tools" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_tools_parent_id_idx" ON "site_pages_blocks_prof_tools" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_tools_path_idx" ON "site_pages_blocks_prof_tools" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_tools_tools" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_tools"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "name" varchar,
      "kategorie" varchar DEFAULT 'dev'
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_tools_tools_order_idx" ON "site_pages_blocks_prof_tools_tools" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_tools_tools_parent_id_idx" ON "site_pages_blocks_prof_tools_tools" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_lang_zert" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "sprachen_section_title" varchar,
      "zertifikate_section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_order_idx" ON "site_pages_blocks_prof_lang_zert" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_parent_id_idx" ON "site_pages_blocks_prof_lang_zert" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_path_idx" ON "site_pages_blocks_prof_lang_zert" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_lang_zert_sprachen" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_lang_zert"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "sprache" varchar,
      "niveau" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_sprachen_order_idx" ON "site_pages_blocks_prof_lang_zert_sprachen" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_sprachen_parent_id_idx" ON "site_pages_blocks_prof_lang_zert_sprachen" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_lang_zert_zertifikate" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_prof_lang_zert"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "bezeichnung" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_zertifikate_order_idx" ON "site_pages_blocks_prof_lang_zert_zertifikate" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_lang_zert_zertifikate_parent_id_idx" ON "site_pages_blocks_prof_lang_zert_zertifikate" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_prof_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar,
      "headline" varchar,
      "text" varchar,
      "button_label" varchar,
      "button_link" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_cta_order_idx" ON "site_pages_blocks_prof_cta" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_cta_parent_id_idx" ON "site_pages_blocks_prof_cta" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_prof_cta_path_idx" ON "site_pages_blocks_prof_cta" ("_path");
  `))

  /* Versionstabellen (_site_pages_v_*) */
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_ueber" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "section_title" varchar,
      "einleitung" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_ueber_order_idx" ON "_site_pages_v_blocks_prof_ueber" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_ueber_parent_id_idx" ON "_site_pages_v_blocks_prof_ueber" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_ueber_path_idx" ON "_site_pages_v_blocks_prof_ueber" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_ueber_werte" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_ueber"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "icon" varchar DEFAULT 'strategy',
      "wert" varchar,
      "beschreibung" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_ueber_werte_order_idx" ON "_site_pages_v_blocks_prof_ueber_werte" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_ueber_werte_parent_id_idx" ON "_site_pages_v_blocks_prof_ueber_werte" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_kern" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "ueberschrift" varchar,
      "einleitung" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_order_idx" ON "_site_pages_v_blocks_prof_kern" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_parent_id_idx" ON "_site_pages_v_blocks_prof_kern" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_path_idx" ON "_site_pages_v_blocks_prof_kern" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_kern_bereiche" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_kern"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "titel" varchar,
      "text" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_bereiche_order_idx" ON "_site_pages_v_blocks_prof_kern_bereiche" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_bereiche_parent_id_idx" ON "_site_pages_v_blocks_prof_kern_bereiche" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_kern_bereiche_details" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_kern_bereiche"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "line" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_bereiche_details_order_idx" ON "_site_pages_v_blocks_prof_kern_bereiche_details" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_kern_bereiche_details_parent_id_idx" ON "_site_pages_v_blocks_prof_kern_bereiche_details" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_skills" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "section_title" varchar,
      "section_intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_order_idx" ON "_site_pages_v_blocks_prof_skills" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_parent_id_idx" ON "_site_pages_v_blocks_prof_skills" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_path_idx" ON "_site_pages_v_blocks_prof_skills" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_skills_spalten" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_skills"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "bereich" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_spalten_order_idx" ON "_site_pages_v_blocks_prof_skills_spalten" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_spalten_parent_id_idx" ON "_site_pages_v_blocks_prof_skills_spalten" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_skills_spalten_skills" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_skills_spalten"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "skill" varchar,
      "level" varchar DEFAULT 'expert',
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_spalten_skills_order_idx" ON "_site_pages_v_blocks_prof_skills_spalten_skills" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_skills_spalten_skills_parent_id_idx" ON "_site_pages_v_blocks_prof_skills_spalten_skills" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_weg" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_weg_order_idx" ON "_site_pages_v_blocks_prof_weg" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_weg_parent_id_idx" ON "_site_pages_v_blocks_prof_weg" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_weg_path_idx" ON "_site_pages_v_blocks_prof_weg" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_weg_eintraege" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_weg"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "zeitraum" varchar,
      "position" varchar,
      "unternehmen" varchar,
      "beschreibung" varchar,
      "typ" varchar DEFAULT 'freelance',
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_weg_eintraege_order_idx" ON "_site_pages_v_blocks_prof_weg_eintraege" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_weg_eintraege_parent_id_idx" ON "_site_pages_v_blocks_prof_weg_eintraege" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_zahl" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_zahl_order_idx" ON "_site_pages_v_blocks_prof_zahl" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_zahl_parent_id_idx" ON "_site_pages_v_blocks_prof_zahl" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_zahl_path_idx" ON "_site_pages_v_blocks_prof_zahl" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_zahl_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_zahl"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "zahl" varchar,
      "bezeichnung" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_zahl_items_order_idx" ON "_site_pages_v_blocks_prof_zahl_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_zahl_items_parent_id_idx" ON "_site_pages_v_blocks_prof_zahl_items" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_tools" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_tools_order_idx" ON "_site_pages_v_blocks_prof_tools" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_tools_parent_id_idx" ON "_site_pages_v_blocks_prof_tools" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_tools_path_idx" ON "_site_pages_v_blocks_prof_tools" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_tools_tools" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_tools"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "name" varchar,
      "kategorie" varchar DEFAULT 'dev',
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_tools_tools_order_idx" ON "_site_pages_v_blocks_prof_tools_tools" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_tools_tools_parent_id_idx" ON "_site_pages_v_blocks_prof_tools_tools" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "sprachen_section_title" varchar,
      "zertifikate_section_title" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_order_idx" ON "_site_pages_v_blocks_prof_lang_zert" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_parent_id_idx" ON "_site_pages_v_blocks_prof_lang_zert" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_path_idx" ON "_site_pages_v_blocks_prof_lang_zert" ("_path");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_sprachen" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_lang_zert"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "sprache" varchar,
      "niveau" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_sprachen_order_idx" ON "_site_pages_v_blocks_prof_lang_zert_sprachen" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_sprachen_parent_id_idx" ON "_site_pages_v_blocks_prof_lang_zert_sprachen" ("_parent_id");
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_zertifikate" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_prof_lang_zert"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "bezeichnung" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_zertifikate_order_idx" ON "_site_pages_v_blocks_prof_lang_zert_zertifikate" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_lang_zert_zertifikate_parent_id_idx" ON "_site_pages_v_blocks_prof_lang_zert_zertifikate" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_prof_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar,
      "headline" varchar,
      "text" varchar,
      "button_label" varchar,
      "button_link" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_cta_order_idx" ON "_site_pages_v_blocks_prof_cta" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_cta_parent_id_idx" ON "_site_pages_v_blocks_prof_cta" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_prof_cta_path_idx" ON "_site_pages_v_blocks_prof_cta" ("_path");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const drops = [
    '_site_pages_v_blocks_prof_cta',
    '_site_pages_v_blocks_prof_lang_zert_zertifikate',
    '_site_pages_v_blocks_prof_lang_zert_sprachen',
    '_site_pages_v_blocks_prof_lang_zert',
    '_site_pages_v_blocks_prof_tools_tools',
    '_site_pages_v_blocks_prof_tools',
    '_site_pages_v_blocks_prof_zahl_items',
    '_site_pages_v_blocks_prof_zahl',
    '_site_pages_v_blocks_prof_weg_eintraege',
    '_site_pages_v_blocks_prof_weg',
    '_site_pages_v_blocks_prof_skills_spalten_skills',
    '_site_pages_v_blocks_prof_skills_spalten',
    '_site_pages_v_blocks_prof_skills',
    '_site_pages_v_blocks_prof_kern_bereiche_details',
    '_site_pages_v_blocks_prof_kern_bereiche',
    '_site_pages_v_blocks_prof_kern',
    '_site_pages_v_blocks_prof_ueber_werte',
    '_site_pages_v_blocks_prof_ueber',
    'site_pages_blocks_prof_lang_zert_zertifikate',
    'site_pages_blocks_prof_lang_zert_sprachen',
    'site_pages_blocks_prof_lang_zert',
    'site_pages_blocks_prof_tools_tools',
    'site_pages_blocks_prof_tools',
    'site_pages_blocks_prof_zahl_items',
    'site_pages_blocks_prof_zahl',
    'site_pages_blocks_prof_weg_eintraege',
    'site_pages_blocks_prof_weg',
    'site_pages_blocks_prof_skills_spalten_skills',
    'site_pages_blocks_prof_skills_spalten',
    'site_pages_blocks_prof_skills',
    'site_pages_blocks_prof_kern_bereiche_details',
    'site_pages_blocks_prof_kern_bereiche',
    'site_pages_blocks_prof_kern',
    'site_pages_blocks_prof_ueber_werte',
    'site_pages_blocks_prof_ueber',
  ]
  for (const t of drops) {
    await db.execute(sql.raw(`DROP TABLE IF EXISTS "${t}";`))
  }

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_profil_bacher" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "block_name" varchar
    );
  `))
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_profil_bacher" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 30,
      "_uuid" varchar,
      "block_name" varchar
    );
  `))
}
