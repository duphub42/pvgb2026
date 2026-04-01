import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const RENAMES: [string, string][] = [
  ['site_pages_blocks_services_grid', 'services_grid'],
  ['site_pages_blocks_services_grid_categories', 'services_grid_categories'],
  ['site_pages_blocks_services_grid_categories_services', 'services_grid_categories_services'],
  ['_site_pages_v_blocks_services_grid', '_services_grid_v'],
  ['_site_pages_v_blocks_services_grid_categories', '_services_grid_v_categories'],
  [
    '_site_pages_v_blocks_services_grid_categories_services',
    '_services_grid_v_categories_services',
  ],
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const [from, to] of RENAMES) {
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
  for (let i = RENAMES.length - 1; i >= 0; i--) {
    const [from, to] = RENAMES[i]!
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
