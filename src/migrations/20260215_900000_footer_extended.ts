import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Erweiterung des Footer-Globals: Logo, Newsletter, Spalten, Social, Rechtliches, Design.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer"
      ADD COLUMN IF NOT EXISTS "footer_logo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "footer_logo_alt_text" varchar,
      ADD COLUMN IF NOT EXISTS "newsletter_title" varchar,
      ADD COLUMN IF NOT EXISTS "newsletter_description" jsonb,
      ADD COLUMN IF NOT EXISTS "newsletter_placeholder" varchar,
      ADD COLUMN IF NOT EXISTS "newsletter_button_text" varchar,
      ADD COLUMN IF NOT EXISTS "columns" jsonb,
      ADD COLUMN IF NOT EXISTS "social_links" jsonb,
      ADD COLUMN IF NOT EXISTS "copyright_text" varchar,
      ADD COLUMN IF NOT EXISTS "privacy_link" varchar,
      ADD COLUMN IF NOT EXISTS "terms_link" varchar,
      ADD COLUMN IF NOT EXISTS "background_color" varchar,
      ADD COLUMN IF NOT EXISTS "text_color" varchar,
      ADD COLUMN IF NOT EXISTS "link_hover_color" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer"
      DROP COLUMN IF EXISTS "footer_logo_id",
      DROP COLUMN IF EXISTS "footer_logo_alt_text",
      DROP COLUMN IF EXISTS "newsletter_title",
      DROP COLUMN IF EXISTS "newsletter_description",
      DROP COLUMN IF EXISTS "newsletter_placeholder",
      DROP COLUMN IF EXISTS "newsletter_button_text",
      DROP COLUMN IF EXISTS "columns",
      DROP COLUMN IF EXISTS "social_links",
      DROP COLUMN IF EXISTS "copyright_text",
      DROP COLUMN IF EXISTS "privacy_link",
      DROP COLUMN IF EXISTS "terms_link",
      DROP COLUMN IF EXISTS "background_color",
      DROP COLUMN IF EXISTS "text_color",
      DROP COLUMN IF EXISTS "link_hover_color";
  `)
}
