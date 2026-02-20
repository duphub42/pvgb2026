import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds header columns for Mega-Menü: Kontakt & Newsletter
 * (WhatsApp, Rückruf, Newsletter) so Payload queries succeed on Vercel Postgres.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "mega_menu_show_whats_app" boolean,
      ADD COLUMN IF NOT EXISTS "mega_menu_whats_app_label" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_whats_app_url" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "mega_menu_show_callback" boolean,
      ADD COLUMN IF NOT EXISTS "mega_menu_callback_title" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_callback_placeholder" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_callback_button_text" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_callback_form_id" integer,
      ADD COLUMN IF NOT EXISTS "mega_menu_callback_phone_field_name" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "mega_menu_show_newsletter" boolean,
      ADD COLUMN IF NOT EXISTS "mega_menu_newsletter_title" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_newsletter_placeholder" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_newsletter_button_text" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_newsletter_form_id" integer,
      ADD COLUMN IF NOT EXISTS "mega_menu_newsletter_email_field_name" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      DROP COLUMN IF EXISTS "mega_menu_show_whats_app",
      DROP COLUMN IF EXISTS "mega_menu_whats_app_label",
      DROP COLUMN IF EXISTS "mega_menu_whats_app_url",
      DROP COLUMN IF EXISTS "mega_menu_show_callback",
      DROP COLUMN IF EXISTS "mega_menu_callback_title",
      DROP COLUMN IF EXISTS "mega_menu_callback_placeholder",
      DROP COLUMN IF EXISTS "mega_menu_callback_button_text",
      DROP COLUMN IF EXISTS "mega_menu_callback_form_id",
      DROP COLUMN IF EXISTS "mega_menu_callback_phone_field_name",
      DROP COLUMN IF EXISTS "mega_menu_show_newsletter",
      DROP COLUMN IF EXISTS "mega_menu_newsletter_title",
      DROP COLUMN IF EXISTS "mega_menu_newsletter_placeholder",
      DROP COLUMN IF EXISTS "mega_menu_newsletter_button_text",
      DROP COLUMN IF EXISTS "mega_menu_newsletter_form_id",
      DROP COLUMN IF EXISTS "mega_menu_newsletter_email_field_name";
  `)
}
