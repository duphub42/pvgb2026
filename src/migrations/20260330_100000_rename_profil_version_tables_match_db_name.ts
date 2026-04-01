import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Profil-Blöcke nutzen block.dbName (prof_ueber, prof_kern, …). Payload/Drizzle erwartet
 * Versionstabellen "_prof_ueber_v", nicht "_site_pages_v_blocks_prof_ueber".
 * 20260329_700000 hat nur die Live-Tabellen umbenannt — ohne diese Migration schlagen
 * Admin-Listen/Version-Queries fehl (relation "_prof_ueber_v" does not exist).
 */
const RENAMES_UP: [string, string][] = [
  ['_site_pages_v_blocks_prof_kern_bereiche_details', '_prof_kern_v_bereiche_details'],
  ['_site_pages_v_blocks_prof_skills_spalten_skills', '_prof_skills_v_spalten_skills'],
  ['_site_pages_v_blocks_prof_ueber_werte', '_prof_ueber_v_werte'],
  ['_site_pages_v_blocks_prof_weg_eintraege', '_prof_weg_v_eintraege'],
  ['_site_pages_v_blocks_prof_zahl_items', '_prof_zahl_v_items'],
  ['_site_pages_v_blocks_prof_tools_tools', '_prof_tools_v_tools'],
  ['_site_pages_v_blocks_prof_lang_zert_sprachen', '_prof_lang_zert_v_sprachen'],
  ['_site_pages_v_blocks_prof_lang_zert_zertifikate', '_prof_lang_zert_v_zertifikate'],
  ['_site_pages_v_blocks_services_grid', '_services_grid_v'],
  ['_site_pages_v_blocks_services_grid_categories', '_services_grid_v_categories'],
  [
    '_site_pages_v_blocks_services_grid_categories_services',
    '_services_grid_v_categories_services',
  ],
  ['_site_pages_v_blocks_prof_kern_bereiche', '_prof_kern_v_bereiche'],
  ['_site_pages_v_blocks_prof_skills_spalten', '_prof_skills_v_spalten'],
  ['_site_pages_v_blocks_prof_ueber', '_prof_ueber_v'],
  ['_site_pages_v_blocks_prof_kern', '_prof_kern_v'],
  ['_site_pages_v_blocks_prof_skills', '_prof_skills_v'],
  ['_site_pages_v_blocks_prof_weg', '_prof_weg_v'],
  ['_site_pages_v_blocks_prof_zahl', '_prof_zahl_v'],
  ['_site_pages_v_blocks_prof_tools', '_prof_tools_v'],
  ['_site_pages_v_blocks_prof_lang_zert', '_prof_lang_zert_v'],
  ['_site_pages_v_blocks_prof_cta', '_prof_cta_v'],
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [from, to] of RENAMES_UP) {
    await db.execute(
      sql.raw(`
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
    `),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (let i = RENAMES_UP.length - 1; i >= 0; i--) {
    const [from, to] = RENAMES_UP[i]!
    await db.execute(
      sql.raw(`
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
    `),
    )
  }
}
