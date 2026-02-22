import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Fix: Payload/Drizzle insert into _site_pages_v_version_hero_marquee_logos uses
 * "default" for id; column was varchar without default → null constraint violation.
 * Replace id with integer column and DEFAULT nextval(...).
 */
const TABLE = '_site_pages_v_version_hero_marquee_logos'
const SEQ = `${TABLE}_id_seq`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    CREATE SEQUENCE IF NOT EXISTS "${SEQ}";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" DROP CONSTRAINT IF EXISTS "${TABLE}_pkey";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" DROP COLUMN IF EXISTS "id";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" ADD COLUMN "id" integer NOT NULL DEFAULT nextval('"${SEQ}"'::regclass);
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" ADD PRIMARY KEY ("id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" DROP CONSTRAINT IF EXISTS "${TABLE}_pkey";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" DROP COLUMN IF EXISTS "id";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "${TABLE}" ADD COLUMN "id" varchar PRIMARY KEY NOT NULL;
  `))
  await db.execute(sql.raw(`
    DROP SEQUENCE IF EXISTS "${SEQ}";
  `))
}
