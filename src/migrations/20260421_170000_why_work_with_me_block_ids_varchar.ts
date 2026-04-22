import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me_reasons";
    DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me_reasons";
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list";
    DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list";
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me";
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "site_pages_blocks_why_work_with_me" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "block_spacing_padding" varchar DEFAULT 'default',
      "block_spacing_padding_top" varchar DEFAULT 'default',
      "block_spacing_margin_bottom" varchar DEFAULT 'default',
      "block_container" varchar DEFAULT 'default',
      "block_background" varchar DEFAULT 'none',
      "block_background_image_id" integer REFERENCES media(id),
      "block_background_image_disable_inversion" boolean DEFAULT false,
      "block_border_enabled" boolean DEFAULT false,
      "block_border_style" varchar DEFAULT 'solid',
      "block_border_radius" varchar DEFAULT 'medium',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "block_content_spacing" varchar DEFAULT 'default',
      "block_animation" varchar DEFAULT 'none',
      "block_name" varchar,
      "heading" varchar,
      "intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_order_idx" ON "site_pages_blocks_why_work_with_me" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_parent_id_idx" ON "site_pages_blocks_why_work_with_me" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_path_idx" ON "site_pages_blocks_why_work_with_me" ("_path");

    CREATE TABLE IF NOT EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "icon" varchar DEFAULT 'brain',
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list_order_idx" ON "site_pages_blocks_why_work_with_me_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list_parent_id_idx" ON "site_pages_blocks_why_work_with_me_intro_icon_list" ("_parent_id");

    CREATE TABLE IF NOT EXISTS "site_pages_blocks_why_work_with_me_reasons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "icon" varchar DEFAULT 'user',
      "title" varchar,
      "description" varchar
    );
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_reasons_order_idx" ON "site_pages_blocks_why_work_with_me_reasons" ("_order");
    CREATE INDEX IF NOT EXISTS "site_pages_blocks_why_work_with_me_reasons_parent_id_idx" ON "site_pages_blocks_why_work_with_me_reasons" ("_parent_id");

    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "_uuid" varchar,
      "block_spacing_padding" varchar DEFAULT 'default',
      "block_spacing_padding_top" varchar DEFAULT 'default',
      "block_spacing_margin_bottom" varchar DEFAULT 'default',
      "block_container" varchar DEFAULT 'default',
      "block_background" varchar DEFAULT 'none',
      "block_background_image_id" integer REFERENCES media(id),
      "block_background_image_disable_inversion" boolean DEFAULT false,
      "block_border_enabled" boolean DEFAULT false,
      "block_border_style" varchar DEFAULT 'solid',
      "block_border_radius" varchar DEFAULT 'medium',
      "block_overlay_enabled" boolean DEFAULT false,
      "block_overlay_color" varchar DEFAULT 'dark',
      "block_overlay_opacity" integer DEFAULT 0,
      "block_content_spacing" varchar DEFAULT 'default',
      "block_animation" varchar DEFAULT 'none',
      "block_name" varchar,
      "heading" varchar,
      "intro" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_order_idx" ON "_site_pages_v_blocks_why_work_with_me" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_parent_id_idx" ON "_site_pages_v_blocks_why_work_with_me" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_path_idx" ON "_site_pages_v_blocks_why_work_with_me" ("_path");

    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "_site_pages_v_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "icon" varchar DEFAULT 'brain',
      "text" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list_order_idx" ON "_site_pages_v_blocks_why_work_with_me_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list_parent_id_idx" ON "_site_pages_v_blocks_why_work_with_me_intro_icon_list" ("_parent_id");

    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_reasons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "_site_pages_v_blocks_why_work_with_me"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL DEFAULT (replace(gen_random_uuid()::text, '-', '')),
      "icon" varchar DEFAULT 'user',
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_reasons_order_idx" ON "_site_pages_v_blocks_why_work_with_me_reasons" ("_order");
    CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_why_work_with_me_reasons_parent_id_idx" ON "_site_pages_v_blocks_why_work_with_me_reasons" ("_parent_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me_reasons";
    DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me_reasons";
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me_intro_icon_list";
    DROP TABLE IF EXISTS "site_pages_blocks_why_work_with_me_intro_icon_list";
    DROP TABLE IF EXISTS "_site_pages_v_blocks_why_work_with_me";
  `),
  )
}
