import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds Philipp Bacher hero type and fields to pages.
 * Run with: pnpm payload migrate
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE IF NOT EXISTS 'philippBacher';
    ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'philippBacher';
  `)
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "hero_subheadline" varchar,
      ADD COLUMN IF NOT EXISTS "hero_headline" varchar,
      ADD COLUMN IF NOT EXISTS "hero_description" text,
      ADD COLUMN IF NOT EXISTS "hero_media_type" varchar DEFAULT 'image',
      ADD COLUMN IF NOT EXISTS "hero_background_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "hero_background_video_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "hero_foreground_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "hero_overlay_opacity" double precision DEFAULT 0.5;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_hero_subheadline" varchar,
      ADD COLUMN IF NOT EXISTS "version_hero_headline" varchar,
      ADD COLUMN IF NOT EXISTS "version_hero_description" text,
      ADD COLUMN IF NOT EXISTS "version_hero_media_type" varchar DEFAULT 'image',
      ADD COLUMN IF NOT EXISTS "version_hero_background_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "version_hero_background_video_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "version_hero_foreground_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "version_hero_overlay_opacity" double precision DEFAULT 0.5;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages"
      DROP COLUMN IF EXISTS "hero_subheadline",
      DROP COLUMN IF EXISTS "hero_headline",
      DROP COLUMN IF EXISTS "hero_description",
      DROP COLUMN IF EXISTS "hero_media_type",
      DROP COLUMN IF EXISTS "hero_background_image_id",
      DROP COLUMN IF EXISTS "hero_background_video_id",
      DROP COLUMN IF EXISTS "hero_foreground_image_id",
      DROP COLUMN IF EXISTS "hero_overlay_opacity";
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      DROP COLUMN IF EXISTS "version_hero_subheadline",
      DROP COLUMN IF EXISTS "version_hero_headline",
      DROP COLUMN IF EXISTS "version_hero_description",
      DROP COLUMN IF EXISTS "version_hero_media_type",
      DROP COLUMN IF EXISTS "version_hero_background_image_id",
      DROP COLUMN IF EXISTS "version_hero_background_video_id",
      DROP COLUMN IF EXISTS "version_hero_foreground_image_id",
      DROP COLUMN IF EXISTS "version_hero_overlay_opacity";
  `)
}
