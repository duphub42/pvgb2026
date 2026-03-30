import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-vercel-postgres'
import { sql } from '@payloadcms/db-vercel-postgres'

/**
 * Idempotent repair: ensures hero stack / surface columns exist.
 * Use when 20260330_140000 was recorded on another DB or never applied to the DB the app uses.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(
      `ALTER TYPE "public"."enum_site_pages_hero_type" ADD VALUE IF NOT EXISTS 'heroStylePreview'`,
    ),
  )
  await db.execute(
    sql.raw(
      `ALTER TYPE "public"."enum__site_pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'heroStylePreview'`,
    ),
  )

  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_surface_pattern" varchar DEFAULT 'none';
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_back_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_back_offset_x" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_back_offset_y" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_mid_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_mid_offset_x" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_mid_offset_y" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_front_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_front_offset_x" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "site_pages"
    ADD COLUMN IF NOT EXISTS "hero_stack_front_offset_y" numeric DEFAULT 0;
  `)

  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_surface_pattern" varchar DEFAULT 'none';
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_back_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_back_offset_x" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_back_offset_y" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_mid_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_mid_offset_x" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_mid_offset_y" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_front_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_front_offset_x" numeric DEFAULT 0;
  `)
  await db.execute(sql`
    ALTER TABLE "_site_pages_v"
    ADD COLUMN IF NOT EXISTS "version_hero_stack_front_offset_y" numeric DEFAULT 0;
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Forward-only repair; use 20260330_140000 down to drop these columns.
}
