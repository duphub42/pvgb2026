import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Aligns Neon footer table with current schema by adding
 * newer footer fields that were not part of the original
 * migrations but are present in the generated schema.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "public"."footer"
        ADD COLUMN IF NOT EXISTS "mobile_footer_logo_id" integer,
        ADD COLUMN IF NOT EXISTS "footer_description" jsonb,
        ADD COLUMN IF NOT EXISTS "footer_address" varchar,
        ADD COLUMN IF NOT EXISTS "footer_phone" varchar,
        ADD COLUMN IF NOT EXISTS "newsletter_icon" varchar,
        ADD COLUMN IF NOT EXISTS "newsletter_icon_upload_id" integer;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "public"."footer"
        DROP COLUMN IF EXISTS "mobile_footer_logo_id",
        DROP COLUMN IF EXISTS "footer_description",
        DROP COLUMN IF EXISTS "footer_address",
        DROP COLUMN IF EXISTS "footer_phone",
        DROP COLUMN IF EXISTS "newsletter_icon",
        DROP COLUMN IF EXISTS "newsletter_icon_upload_id";
    `),
  )
}

