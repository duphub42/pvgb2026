-- Repair SQL for missing version tables on main_old branch
-- Generated: 2026-04-15
-- Run this in Neon SQL Editor to create missing version tables

-- ============================================
-- HERO VERSION TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_stats" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "value" varchar,
  "label" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_marquee_logos" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "logo_id" integer,
  "_uuid" varchar
);

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

CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_floating_elements" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "label" varchar,
  "_uuid" varchar
);

-- ============================================
-- BLOCKS VERSION TABLES - Core
-- ============================================

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_marketing" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "layout_style" varchar DEFAULT 'default',
  "eyebrow" varchar,
  "heading" varchar,
  "subheading" varchar,
  "media_id" integer,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_with_process" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "eyebrow" varchar,
  "heading" varchar,
  "subheading" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_steps" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "title" varchar,
  "description" text,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_introduction" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "eyebrow" varchar,
  "heading" varchar,
  "body" jsonb,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_grid" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "eyebrow" varchar,
  "heading" varchar,
  "sub" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "category_label" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_services" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "service_id" integer,
  "_uuid" varchar
);

-- ============================================
-- CTA & CONTENT BLOCKS
-- ============================================

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "rich_text" jsonb,
  "_uuid" varchar,
  "block_name" varchar
);

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

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "_uuid" varchar,
  "block_name" varchar
);

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

CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_media_block" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "media_id" integer,
  "_uuid" varchar,
  "block_name" varchar
);

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

-- ============================================
-- GLOBALS VERSION TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS "_services_grid_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "eyebrow" varchar,
  "heading" varchar,
  "sub" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_services_grid_v_categories" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "category_label" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_services_grid_v_categories_services" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "service_id" integer,
  "_uuid" varchar
);

-- ============================================
-- INDICES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS "_site_pages_v_version_hero_stats_parent_idx" ON "_site_pages_v_version_hero_stats" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_version_hero_marquee_logos_parent_idx" ON "_site_pages_v_version_hero_marquee_logos" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_version_hero_links_parent_idx" ON "_site_pages_v_version_hero_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_hero_with_process_steps_parent_idx" ON "_site_pages_v_blocks_hero_with_process_steps" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_parent_idx" ON "_site_pages_v_blocks_services_grid_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_services_grid_categories_services_parent_idx" ON "_site_pages_v_blocks_services_grid_categories_services" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_cta_links_parent_idx" ON "_site_pages_v_blocks_cta_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_content_columns_parent_idx" ON "_site_pages_v_blocks_content_columns" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_services_grid_v_categories_parent_idx" ON "_services_grid_v_categories" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_services_grid_v_categories_services_parent_idx" ON "_services_grid_v_categories_services" ("_parent_id");

-- ============================================
-- DONE - Now run: pnpm migrate:neon
-- ============================================
