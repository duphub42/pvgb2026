import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds Philipp Bacher hero columns to site_pages (and _site_pages_v):
 * - hero_logo_display_type, hero_floating_*, hero_halo_*, hero_use_halo_background
 * Required for Vercel Postgres so site_pages queries (footer/header globals) succeed.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      ADD COLUMN IF NOT EXISTS "hero_logo_display_type" varchar DEFAULT 'marquee',
      ADD COLUMN IF NOT EXISTS "hero_floating_mouse_strength" double precision,
      ADD COLUMN IF NOT EXISTS "hero_floating_idle_amplitude" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_amplitude_factor" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_size" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_speed" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_color2" integer,
      ADD COLUMN IF NOT EXISTS "hero_halo_x_offset" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_y_offset" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_overlay_gradient" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_overlay_grid" double precision,
      ADD COLUMN IF NOT EXISTS "hero_halo_overlay_grid_size" integer,
      ADD COLUMN IF NOT EXISTS "hero_use_halo_background" boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS "hero_halo_overlay_grid_variant" varchar DEFAULT 'static',
      ADD COLUMN IF NOT EXISTS "hero_halo_overlay_grid_custom_code" text;
  `))
  try {
    await db.execute(sql.raw(`
      ALTER TABLE "public"."_site_pages_v"
        ADD COLUMN IF NOT EXISTS "version_hero_logo_display_type" varchar DEFAULT 'marquee',
        ADD COLUMN IF NOT EXISTS "version_hero_floating_mouse_strength" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_floating_idle_amplitude" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_amplitude_factor" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_size" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_speed" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_color2" integer,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_x_offset" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_y_offset" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_overlay_gradient" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_overlay_grid" double precision,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_overlay_grid_size" integer,
        ADD COLUMN IF NOT EXISTS "version_hero_use_halo_background" boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS "version_hero_halo_overlay_grid_variant" varchar DEFAULT 'static',
        ADD COLUMN IF NOT EXISTS "version_hero_halo_overlay_grid_custom_code" text;
    `))
  } catch {
    // Version table may not exist in some setups
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "public"."site_pages"
      DROP COLUMN IF EXISTS "hero_logo_display_type",
      DROP COLUMN IF EXISTS "hero_floating_mouse_strength",
      DROP COLUMN IF EXISTS "hero_floating_idle_amplitude",
      DROP COLUMN IF EXISTS "hero_halo_amplitude_factor",
      DROP COLUMN IF EXISTS "hero_halo_size",
      DROP COLUMN IF EXISTS "hero_halo_speed",
      DROP COLUMN IF EXISTS "hero_halo_color2",
      DROP COLUMN IF EXISTS "hero_halo_x_offset",
      DROP COLUMN IF EXISTS "hero_halo_y_offset",
      DROP COLUMN IF EXISTS "hero_halo_overlay_gradient",
      DROP COLUMN IF EXISTS "hero_halo_overlay_grid",
      DROP COLUMN IF EXISTS "hero_halo_overlay_grid_size",
      DROP COLUMN IF EXISTS "hero_use_halo_background",
      DROP COLUMN IF EXISTS "hero_halo_overlay_grid_variant",
      DROP COLUMN IF EXISTS "hero_halo_overlay_grid_custom_code";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "public"."_site_pages_v"
      DROP COLUMN IF EXISTS "version_hero_logo_display_type",
      DROP COLUMN IF EXISTS "version_hero_floating_mouse_strength",
      DROP COLUMN IF EXISTS "version_hero_floating_idle_amplitude",
      DROP COLUMN IF EXISTS "version_hero_halo_amplitude_factor",
      DROP COLUMN IF EXISTS "version_hero_halo_size",
      DROP COLUMN IF EXISTS "version_hero_halo_speed",
      DROP COLUMN IF EXISTS "version_hero_halo_color2",
      DROP COLUMN IF EXISTS "version_hero_halo_x_offset",
      DROP COLUMN IF EXISTS "version_hero_halo_y_offset",
      DROP COLUMN IF EXISTS "version_hero_halo_overlay_gradient",
      DROP COLUMN IF EXISTS "version_hero_halo_overlay_grid",
      DROP COLUMN IF EXISTS "version_hero_halo_overlay_grid_size",
      DROP COLUMN IF EXISTS "version_hero_use_halo_background",
      DROP COLUMN IF EXISTS "version_hero_halo_overlay_grid_variant",
      DROP COLUMN IF EXISTS "version_hero_halo_overlay_grid_custom_code";
  `))
}
