import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Creates the hero_backgrounds table for the HeroBackgrounds collection.
 * Required for Neon/Postgres so the admin panel can list and edit hero background presets.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "hero_backgrounds" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone,
      "name" varchar NOT NULL,
      "type" varchar NOT NULL DEFAULT 'orbit',
      "intensity" real DEFAULT 1,
      "hue" real DEFAULT 220,
      "pattern_color1" varchar,
      "pattern_color2" varchar,
      "custom_css" text
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "hero_backgrounds";`)
}
