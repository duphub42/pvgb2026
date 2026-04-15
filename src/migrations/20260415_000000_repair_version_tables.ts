import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Repair migration: Creates missing version tables for main_old branch
 * These tables are needed for Payload versioning to work correctly
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Hero version tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_marquee_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "logo_id" integer,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_floating_elements" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "_uuid" varchar
    );
  `)

  // Core blocks
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "rich_text" jsonb,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content_columns" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "size" varchar DEFAULT 'oneThird',
      "rich_text" jsonb,
      "enable_link" boolean,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_media_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_archive" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "populate_by" varchar DEFAULT 'collection',
      "relation_to" varchar DEFAULT 'posts',
      "limit" integer DEFAULT 10,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_form_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "form_id" integer,
      "enable_intro" boolean,
      "intro_content" jsonb,
      "_uuid" varchar,
      "block_name" varchar
    );
  `)

  // Services grid version tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_services_grid_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "sub" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_services_grid_v_categories" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "category_label" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_services_grid_v_categories_services" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "service_id" integer,
      "_uuid" varchar
    );
  `)

  console.log('✅ Version tables created successfully')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Drop tables in reverse order
  const tables = [
    '_services_grid_v_categories_services',
    '_services_grid_v_categories',
    '_services_grid_v',
    '_site_pages_v_blocks_form_block',
    '_site_pages_v_blocks_archive',
    '_site_pages_v_blocks_media_block',
    '_site_pages_v_blocks_content_columns',
    '_site_pages_v_blocks_content',
    '_site_pages_v_blocks_cta_links',
    '_site_pages_v_blocks_cta',
    '_site_pages_v_version_hero_floating_elements',
    '_site_pages_v_version_hero_links',
    '_site_pages_v_version_hero_marquee_logos',
    '_site_pages_v_version_hero_stats',
  ]

  for (const table of tables) {
    await db.execute(sql.raw(`DROP TABLE IF EXISTS "${table}" CASCADE;`))
  }
}
