import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

const TABLES = [
  'services_grid',
  '_services_grid_v',
  'site_pages_blocks_services_grid',
  '_site_pages_v_blocks_services_grid',
] as const

const COLUMN = 'radial_background_strength'
const DEFAULT_VALUE = 'medium'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(
      sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${table}'
        ) THEN
          ALTER TABLE "${table}"
            ADD COLUMN IF NOT EXISTS "${COLUMN}" varchar DEFAULT '${DEFAULT_VALUE}';

          UPDATE "${table}"
          SET "${COLUMN}" = '${DEFAULT_VALUE}'
          WHERE "${COLUMN}" IS NULL;
        END IF;
      END $$;
    `),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(
      sql.raw(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = '${table}'
        ) THEN
          ALTER TABLE "${table}" DROP COLUMN IF EXISTS "${COLUMN}";
        END IF;
      END $$;
    `),
    )
  }
}
