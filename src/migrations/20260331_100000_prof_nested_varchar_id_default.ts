import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import { sql } from '@payloadcms/db-vercel-postgres'

/**
 * After 20260330_130000, nested profil array tables use varchar `id` without DEFAULT.
 * Payload/Drizzle version writes still insert `DEFAULT` for `id` → NOT NULL violation
 * (e.g. `_prof_ueber_v_werte`). Restore a DB-generated default (hex string, no extension).
 */
const TABLES = [
  'prof_kern_bereiche',
  'prof_kern_bereiche_details',
  'prof_skills_spalten',
  'prof_skills_spalten_skills',
  'prof_ueber_werte',
  'prof_weg_eintraege',
  'prof_zahl_items',
  'prof_tools_tools',
  'prof_lang_zert_sprachen',
  'prof_lang_zert_zertifikate',
  '_prof_kern_v_bereiche',
  '_prof_kern_v_bereiche_details',
  '_prof_skills_v_spalten',
  '_prof_skills_v_spalten_skills',
  '_prof_ueber_v_werte',
  '_prof_weg_v_eintraege',
  '_prof_zahl_v_items',
  '_prof_tools_v_tools',
  '_prof_lang_zert_v_sprachen',
  '_prof_lang_zert_v_zertifikate',
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
