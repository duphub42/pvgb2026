import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import { sql } from '@payloadcms/db-vercel-postgres'

const TABLES = [
  'services_grid_categories',
  'services_grid_categories_services',
  '_services_grid_v_categories',
  '_services_grid_v_categories_services',
  'site_pages_blocks_services_grid_categories',
  'site_pages_blocks_services_grid_categories_services',
  '_site_pages_v_blocks_services_grid_categories',
  '_site_pages_v_blocks_services_grid_categories_services',
] as const

/** 32-char hex; matches Payload-style string ids without requiring pgcrypto. */
const ID_DEFAULT_EXPR = `(replace(gen_random_uuid()::text, '-', ''))`

function setDefaultIfVarcharId(table: string): string {
  return `
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${table}'
      AND column_name = 'id' AND udt_name = 'varchar'
  ) THEN
    ALTER TABLE "${table}" ALTER COLUMN "id" SET DEFAULT ${ID_DEFAULT_EXPR};
  END IF;
END $$;
`
}

function dropDefaultIfVarcharId(table: string): string {
  return `
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = '${table}'
      AND column_name = 'id' AND udt_name = 'varchar'
  ) THEN
    ALTER TABLE "${table}" ALTER COLUMN "id" DROP DEFAULT;
  END IF;
END $$;
`
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const t of TABLES) {
    await db.execute(sql.raw(setDefaultIfVarcharId(t)))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const t of TABLES) {
    await db.execute(sql.raw(dropDefaultIfVarcharId(t)))
  }
}
