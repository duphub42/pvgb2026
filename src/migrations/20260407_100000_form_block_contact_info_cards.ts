import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Form-Block: Kontakt-Infoboxen (Karten + CTA) im CMS editierbar.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "site_pages_blocks_form_block"
      ADD COLUMN IF NOT EXISTS "show_contact_info_cards" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "contact_info_cta_label" varchar,
      ADD COLUMN IF NOT EXISTS "contact_info_cta_href" varchar;
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_form_block"
      ADD COLUMN IF NOT EXISTS "show_contact_info_cards" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "contact_info_cta_label" varchar,
      ADD COLUMN IF NOT EXISTS "contact_info_cta_href" varchar;
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_form_block_contact_info_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_form_block"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "icon" varchar DEFAULT 'map-pin',
      "title" varchar,
      "lines" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_form_block_contact_info_cards_order_idx" ON "site_pages_blocks_form_block_contact_info_cards" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_form_block_contact_info_cards_parent_id_idx" ON "site_pages_blocks_form_block_contact_info_cards" ("_parent_id");
  `))

  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_form_block_contact_info_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_form_block"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "icon" varchar DEFAULT 'map-pin',
      "title" varchar,
      "lines" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_form_block_contact_info_cards_order_idx" ON "_site_pages_v_blocks_form_block_contact_info_cards" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_form_block_contact_info_cards_parent_id_idx" ON "_site_pages_v_blocks_form_block_contact_info_cards" ("_parent_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "_site_pages_v_blocks_form_block_contact_info_cards";
    DROP TABLE IF EXISTS "site_pages_blocks_form_block_contact_info_cards";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "_site_pages_v_blocks_form_block"
      DROP COLUMN IF EXISTS "contact_info_cta_href",
      DROP COLUMN IF EXISTS "contact_info_cta_label",
      DROP COLUMN IF EXISTS "show_contact_info_cards";
  `))

  await db.execute(sql.raw(`
    ALTER TABLE "site_pages_blocks_form_block"
      DROP COLUMN IF EXISTS "contact_info_cta_href",
      DROP COLUMN IF EXISTS "contact_info_cta_label",
      DROP COLUMN IF EXISTS "show_contact_info_cards";
  `))
}
