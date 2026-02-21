import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Design: from jsonb groups to flat columns (so Payload queries succeed).
 * Theme-settings: create table (global was missing from migrations).
 */
const DESIGN_FLAT_COLUMNS = [
  // colors_light (text)
  'colors_light_success',
  'colors_light_background',
  'colors_light_foreground',
  'colors_light_card',
  'colors_light_card_foreground',
  'colors_light_popover',
  'colors_light_popover_foreground',
  'colors_light_link',
  'colors_light_link_hover',
  'colors_light_border',
  'colors_light_muted',
  'colors_light_muted_foreground',
  'colors_light_destructive',
  // colors_light mega menu (boolean + text)
  'colors_light_mega_menu_button_bg_use_custom',
  'colors_light_mega_menu_button_bg',
  'colors_light_mega_menu_button_fg_use_custom',
  'colors_light_mega_menu_button_fg',
  'colors_light_mega_menu_nav_text_use_custom',
  'colors_light_mega_menu_nav_text',
  'colors_light_mega_menu_heading_use_custom',
  'colors_light_mega_menu_heading',
  'colors_light_mega_menu_item_text_use_custom',
  'colors_light_mega_menu_item_text',
  'colors_light_mega_menu_description_use_custom',
  'colors_light_mega_menu_description',
  // colors_dark (same)
  'colors_dark_success',
  'colors_dark_background',
  'colors_dark_foreground',
  'colors_dark_card',
  'colors_dark_card_foreground',
  'colors_dark_popover',
  'colors_dark_popover_foreground',
  'colors_dark_link',
  'colors_dark_link_hover',
  'colors_dark_border',
  'colors_dark_muted',
  'colors_dark_muted_foreground',
  'colors_dark_destructive',
  'colors_dark_mega_menu_button_bg_use_custom',
  'colors_dark_mega_menu_button_bg',
  'colors_dark_mega_menu_button_fg_use_custom',
  'colors_dark_mega_menu_button_fg',
  'colors_dark_mega_menu_nav_text_use_custom',
  'colors_dark_mega_menu_nav_text',
  'colors_dark_mega_menu_heading_use_custom',
  'colors_dark_mega_menu_heading',
  'colors_dark_mega_menu_item_text_use_custom',
  'colors_dark_mega_menu_item_text',
  'colors_dark_mega_menu_description_use_custom',
  'colors_dark_mega_menu_description',
  // fonts
  'fonts_body',
  'fonts_heading',
  'fonts_mono',
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1) Design: drop old jsonb columns if present
  await db.execute(sql`
    ALTER TABLE "design"
      DROP COLUMN IF EXISTS "colors_light",
      DROP COLUMN IF EXISTS "colors_dark",
      DROP COLUMN IF EXISTS "fonts";
  `)

  // 2) Design: add flat columns (idempotent)
  for (const col of DESIGN_FLAT_COLUMNS) {
    const isBoolean = col.endsWith('_use_custom')
    const type = isBoolean ? 'boolean' : 'varchar'
    await db.execute(sql.raw(
      `ALTER TABLE "design" ADD COLUMN IF NOT EXISTS "${col}" ${type};`,
    ))
  }

  // 3) Theme-settings: create table if not exists
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "theme_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "primary_matches_base" boolean,
      "primary_color" varchar NOT NULL DEFAULT '#3B82F6',
      "theme_mode" varchar DEFAULT 'light',
      "generated_theme" jsonb,
      "css_string" text,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "theme_settings" CASCADE;`)

  for (const col of [...DESIGN_FLAT_COLUMNS].reverse()) {
    await db.execute(sql.raw(`ALTER TABLE "design" DROP COLUMN IF EXISTS "${col}";`))
  }

  await db.execute(sql`
    ALTER TABLE "design"
      ADD COLUMN IF NOT EXISTS "colors_light" jsonb,
      ADD COLUMN IF NOT EXISTS "colors_dark" jsonb,
      ADD COLUMN IF NOT EXISTS "fonts" jsonb;
  `)
}
