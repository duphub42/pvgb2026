import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds _uuid to all site_pages version and block array tables (Payload expects _uuid on array rows).
 * Fixes: column _site_pages_v_version_hero_marqueeLogos._uuid does not exist (admin page load / create).
 */
const VERSION_TABLES = [
  '_site_pages_v_version_hero_marquee_logos',
  '_site_pages_v_version_hero_links',
  '_site_pages_v_version_hero_stats',
  '_site_pages_v_blocks_cta',
  '_site_pages_v_blocks_cta_links',
  '_site_pages_v_blocks_content',
  '_site_pages_v_blocks_content_columns',
  '_site_pages_v_blocks_media_block',
  '_site_pages_v_blocks_archive',
  '_site_pages_v_blocks_form_block',
  '_services_grid_v',
  '_services_grid_v_categories',
  '_services_grid_v_categories_services',
]

const MAIN_TABLES = [
  'site_pages_hero_marquee_logos',
  'site_pages_hero_links',
  'site_pages_hero_stats',
  'site_pages_blocks_cta',
  'site_pages_blocks_cta_links',
  'site_pages_blocks_content',
  'site_pages_blocks_content_columns',
  'site_pages_blocks_media_block',
  'site_pages_blocks_archive',
  'site_pages_blocks_form_block',
  'services_grid',
  'services_grid_categories',
  'services_grid_categories_services',
]

async function addUuidToTable(db: MigrateUpArgs['db'], table: string) {
  // First check if table exists
  const tableExists = await db.execute(
    sql.raw(`
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = '${table}'
    `),
  )

  if (tableExists.rows.length === 0) {
    console.log(`Skipping ${table} - table does not exist`)
    return
  }

  await db.execute(
    sql.raw(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = '${table}' AND column_name = '_uuid'
      ) THEN
        ALTER TABLE "${table}" ADD COLUMN "_uuid" varchar;
      END IF;
    END $$;
  `),
  )
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of [...VERSION_TABLES, ...MAIN_TABLES]) {
    await addUuidToTable(db, table)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of [...VERSION_TABLES, ...MAIN_TABLES]) {
    await db.execute(sql.raw(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "_uuid";`))
  }
}
