import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Add block table for site_pages layout block calPopup.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_cal_popup" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "headline" varchar,
      "description" varchar,
      "cal_link" varchar NOT NULL,
      "button_label" varchar DEFAULT 'Termin buchen',
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_cal_popup_order_idx" ON "site_pages_blocks_cal_popup" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_cal_popup_parent_id_idx" ON "site_pages_blocks_cal_popup" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_cal_popup_path_idx" ON "site_pages_blocks_cal_popup" ("_path");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cal_popup" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_background" varchar DEFAULT 'none',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "headline" varchar,
      "description" varchar,
      "cal_link" varchar NOT NULL,
      "button_label" varchar DEFAULT 'Termin buchen',
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cal_popup_order_idx" ON "_site_pages_v_blocks_cal_popup" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cal_popup_parent_id_idx" ON "_site_pages_v_blocks_cal_popup" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cal_popup_path_idx" ON "_site_pages_v_blocks_cal_popup" ("_path");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "_site_pages_v_blocks_cal_popup";`))
  await db.execute(sql.raw(`DROP TABLE IF EXISTS "site_pages_blocks_cal_popup";`))
}
