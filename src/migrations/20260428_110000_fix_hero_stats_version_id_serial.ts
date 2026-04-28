import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

/**
 * Fix: Payload/Drizzle inserts into _site_pages_v_version_hero_stats using "default"
 * for the id column. The column was created as varchar without a default → null
 * constraint violation on autosave/draft save.
 *
 * Same root cause as _site_pages_v_version_hero_marquee_logos (fixed in 20260221_900000).
 * Replace varchar id with an integer backed by a sequence (serial-equivalent).
 *
 * Also fix site_pages_hero_stats for consistency (published saves go through same path).
 */

const TABLES = ['_site_pages_v_version_hero_stats', 'site_pages_hero_stats'] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const TABLE of TABLES) {
    const SEQ = `${TABLE}_id_seq`

    await db.execute(`CREATE SEQUENCE IF NOT EXISTS "${SEQ}";`)
    await db.execute(`ALTER TABLE "${TABLE}" DROP CONSTRAINT IF EXISTS "${TABLE}_pkey";`)
    await db.execute(`ALTER TABLE "${TABLE}" DROP COLUMN IF EXISTS "id";`)
    await db.execute(
      `ALTER TABLE "${TABLE}" ADD COLUMN "id" integer NOT NULL DEFAULT nextval('"${SEQ}"'::regclass);`,
    )
    await db.execute(`ALTER TABLE "${TABLE}" ADD PRIMARY KEY ("id");`)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const TABLE of TABLES) {
    const SEQ = `${TABLE}_id_seq`

    await db.execute(`ALTER TABLE "${TABLE}" DROP CONSTRAINT IF EXISTS "${TABLE}_pkey";`)
    await db.execute(`ALTER TABLE "${TABLE}" DROP COLUMN IF EXISTS "id";`)
    await db.execute(`ALTER TABLE "${TABLE}" ADD COLUMN "id" varchar PRIMARY KEY NOT NULL;`)
    await db.execute(`DROP SEQUENCE IF EXISTS "${SEQ}";`)
  }
}
