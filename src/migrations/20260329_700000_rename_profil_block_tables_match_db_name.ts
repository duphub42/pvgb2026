import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Profil-Blöcke: In der Config ist dbName z. B. prof_ueber gesetzt – Drizzle fragt "prof_ueber" ab.
 * Migration 20260329_400000 hatte dagegen "site_pages_blocks_prof_ueber" angelegt.
 * Live-Tabellen (ohne _site_pages_v_) auf die dbName-Namen umbenennen.
 */
const RENAMES: [string, string][] = [
  ['site_pages_blocks_prof_ueber_werte', 'prof_ueber_werte'],
  ['site_pages_blocks_prof_ueber', 'prof_ueber'],
  ['site_pages_blocks_prof_kern_bereiche_details', 'prof_kern_bereiche_details'],
  ['site_pages_blocks_prof_kern_bereiche', 'prof_kern_bereiche'],
  ['site_pages_blocks_prof_kern', 'prof_kern'],
  ['site_pages_blocks_prof_skills_spalten_skills', 'prof_skills_spalten_skills'],
  ['site_pages_blocks_prof_skills_spalten', 'prof_skills_spalten'],
  ['site_pages_blocks_prof_skills', 'prof_skills'],
  ['site_pages_blocks_prof_weg_eintraege', 'prof_weg_eintraege'],
  ['site_pages_blocks_prof_weg', 'prof_weg'],
  ['site_pages_blocks_prof_zahl_items', 'prof_zahl_items'],
  ['site_pages_blocks_prof_zahl', 'prof_zahl'],
  ['site_pages_blocks_prof_tools_tools', 'prof_tools_tools'],
  ['site_pages_blocks_prof_tools', 'prof_tools'],
  ['site_pages_blocks_prof_lang_zert_zertifikate', 'prof_lang_zert_zertifikate'],
  ['site_pages_blocks_prof_lang_zert_sprachen', 'prof_lang_zert_sprachen'],
  ['site_pages_blocks_prof_lang_zert', 'prof_lang_zert'],
  ['site_pages_blocks_prof_cta', 'prof_cta'],
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [from, to] of RENAMES) {
    await db.execute(sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${from}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${to}'
        ) THEN
          ALTER TABLE "${from}" RENAME TO "${to}";
        END IF;
      END $$;
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const [from, to] of RENAMES) {
    await db.execute(sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${to}'
        ) AND NOT EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${from}'
        ) THEN
          ALTER TABLE "${to}" RENAME TO "${from}";
        END IF;
      END $$;
    `))
  }
}
