import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds column_icon and column_icon_upload_id to footer_columns (Neon may have been created
 * from 20260219_200000 which only had column_title).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."footer_columns"
      ADD COLUMN IF NOT EXISTS "column_icon" varchar,
      ADD COLUMN IF NOT EXISTS "column_icon_upload_id" integer REFERENCES "public"."media"("id") ON DELETE SET NULL;
  `))
  await db.execute(sql.raw(`
    CREATE INDEX IF NOT EXISTS "footer_columns_column_icon_upload_idx" ON "public"."footer_columns" ("column_icon_upload_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP INDEX IF EXISTS "public"."footer_columns_column_icon_upload_idx";`))
  await db.execute(sql.raw(`
    ALTER TABLE "public"."footer_columns"
      DROP COLUMN IF EXISTS "column_icon",
      DROP COLUMN IF EXISTS "column_icon_upload_id";
  `))
}
