import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Hero: Oberflächenmuster + 3-lagiger Bild-Stack (Offsets in px).
 * Hero-Typ `heroStylePreview` im Enum (Popout-Felder auch für Style Preview).
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

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_front_offset_y";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_front_offset_x";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_front_image_id";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_mid_offset_y";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_mid_offset_x";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_mid_image_id";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_back_offset_y";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_back_offset_x";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_stack_back_image_id";`,
  )
  await db.execute(
    sql`ALTER TABLE "_site_pages_v" DROP COLUMN IF EXISTS "version_hero_surface_pattern";`,
  )

  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_front_offset_y";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_front_offset_x";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_front_image_id";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_mid_offset_y";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_mid_offset_x";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_mid_image_id";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_back_offset_y";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_back_offset_x";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_stack_back_image_id";`)
  await db.execute(sql`ALTER TABLE "site_pages" DROP COLUMN IF EXISTS "hero_surface_pattern";`)
}
