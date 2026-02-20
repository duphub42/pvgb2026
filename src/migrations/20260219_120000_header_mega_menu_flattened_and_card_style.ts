import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds flattened mega_menu_layout columns (sidebar_cols, content_cols, featured_cols)
 * and mega_menu_card_* columns for highlight card style to header global.
 * Required for Vercel Postgres where Payload expects these columns.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "mega_menu_layout_sidebar_cols" integer,
      ADD COLUMN IF NOT EXISTS "mega_menu_layout_content_cols" integer,
      ADD COLUMN IF NOT EXISTS "mega_menu_layout_featured_cols" integer,
      ADD COLUMN IF NOT EXISTS "mega_menu_card_border_radius" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_card_shadow" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_card_hover_shadow" varchar,
      ADD COLUMN IF NOT EXISTS "mega_menu_card_hover_border" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header"
      DROP COLUMN IF EXISTS "mega_menu_layout_sidebar_cols",
      DROP COLUMN IF EXISTS "mega_menu_layout_content_cols",
      DROP COLUMN IF EXISTS "mega_menu_layout_featured_cols",
      DROP COLUMN IF EXISTS "mega_menu_card_border_radius",
      DROP COLUMN IF EXISTS "mega_menu_card_shadow",
      DROP COLUMN IF EXISTS "mega_menu_card_hover_shadow",
      DROP COLUMN IF EXISTS "mega_menu_card_hover_border";
  `)
}
