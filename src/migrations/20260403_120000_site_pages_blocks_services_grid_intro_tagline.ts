import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Ergänzt ServicesGrid um Intro-Tagline, Intro-Icon-Liste, Intro-Bild, Bild-Position und radialen Hintergrund.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    ALTER TABLE "services_grid"
      ADD COLUMN IF NOT EXISTS "tagline" varchar,
      ADD COLUMN IF NOT EXISTS "intro_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "intro_image_position" varchar DEFAULT 'left',
      ADD COLUMN IF NOT EXISTS "radial_background" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "radial_background_variant" varchar DEFAULT 'default';
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_services_grid_v"
      ADD COLUMN IF NOT EXISTS "tagline" varchar,
      ADD COLUMN IF NOT EXISTS "intro_image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS "intro_image_position" varchar DEFAULT 'left',
      ADD COLUMN IF NOT EXISTS "radial_background" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "radial_background_variant" varchar DEFAULT 'default';
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "services_grid_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL REFERENCES "services_grid"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar NOT NULL DEFAULT 'zap',
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "services_grid_intro_icon_list_order_idx" ON "services_grid_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "services_grid_intro_icon_list_parent_id_idx" ON "services_grid_intro_icon_list" ("_parent_id");
  `),
  )

  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "_services_grid_v_intro_icon_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "_services_grid_v"("id") ON DELETE CASCADE,
      "id" serial PRIMARY KEY,
      "_uuid" varchar,
      "icon" varchar NOT NULL DEFAULT 'zap',
      "text" varchar
    );
    CREATE INDEX IF NOT EXISTS "_services_grid_v_intro_icon_list_order_idx" ON "_services_grid_v_intro_icon_list" ("_order");
    CREATE INDEX IF NOT EXISTS "_services_grid_v_intro_icon_list_parent_id_idx" ON "_services_grid_v_intro_icon_list" ("_parent_id");
  `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
    DROP TABLE IF EXISTS "_services_grid_v_intro_icon_list";
    DROP TABLE IF EXISTS "services_grid_intro_icon_list";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "_services_grid_v"
      DROP COLUMN IF EXISTS "radial_background_variant",
      DROP COLUMN IF EXISTS "radial_background",
      DROP COLUMN IF EXISTS "intro_image_position",
      DROP COLUMN IF EXISTS "intro_image_id",
      DROP COLUMN IF EXISTS "tagline";
  `),
  )

  await db.execute(
    sql.raw(`
    ALTER TABLE "services_grid"
      DROP COLUMN IF EXISTS "radial_background_variant",
      DROP COLUMN IF EXISTS "radial_background",
      DROP COLUMN IF EXISTS "intro_image_position",
      DROP COLUMN IF EXISTS "intro_image_id",
      DROP COLUMN IF EXISTS "tagline";
  `),
  )
}
