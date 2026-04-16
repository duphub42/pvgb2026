-- Migration: Create RadialOrbitalTimeline block version tables
-- This fixes the missing _radial_tl_v and related tables
-- Created: 2026-04-15

-- Main block versions table
CREATE TABLE IF NOT EXISTS "_radial_tl_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "section_title" varchar,
  "section_text" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

-- Timeline items versions table
CREATE TABLE IF NOT EXISTS "_radial_tl_items_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_radial_tl_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" varchar,
  "date" varchar,
  "category" varchar DEFAULT 'Phase',
  "icon" varchar DEFAULT 'Calendar',
  "status" varchar DEFAULT 'pending',
  "energy" integer DEFAULT 50,
  "content" varchar,
  "related_ids" varchar,
  "_uuid" varchar
);

-- Also create the main tables if they don't exist yet (from the original migration)
CREATE TABLE IF NOT EXISTS "radial_tl" (
  "_order" integer,
  "_parent_id" integer NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "section_title" varchar NOT NULL DEFAULT 'Projekt-Timeline',
  "section_text" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "radial_tl_items" (
  "_order" integer,
  "_parent_id" integer NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" varchar NOT NULL,
  "date" varchar NOT NULL,
  "category" varchar DEFAULT 'Phase',
  "icon" varchar DEFAULT 'Calendar',
  "status" varchar DEFAULT 'pending',
  "energy" integer DEFAULT 50,
  "content" varchar NOT NULL,
  "related_ids" varchar,
  "_uuid" varchar
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS "_radial_tl_v_order_idx" ON "_radial_tl_v" ("_order");
CREATE INDEX IF NOT EXISTS "_radial_tl_v_parent_id_idx" ON "_radial_tl_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_radial_tl_v_path_idx" ON "_radial_tl_v" ("_path");
CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_order_idx" ON "_radial_tl_items_v" ("_order");
CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_id_idx" ON "_radial_tl_items_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "radial_tl_parent_idx" ON "radial_tl" ("_parent_id");
CREATE INDEX IF NOT EXISTS "radial_tl_items_parent_idx" ON "radial_tl_items" ("_parent_id");

-- Pricing Table version tables
CREATE TABLE IF NOT EXISTS "_pricing_table_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_spacing_padding" varchar,
  "block_spacing_padding_top" varchar,
  "block_spacing_margin_bottom" varchar,
  "block_container" varchar,
  "block_background" varchar,
  "block_border_enabled" integer DEFAULT 0,
  "block_border_style" varchar,
  "block_border_radius" varchar,
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" varchar,
  "block_overlay_opacity" integer,
  "block_content_spacing" varchar,
  "block_animation" varchar,
  "eyebrow" varchar,
  "heading" varchar,
  "description" varchar,
  "comparison_heading" varchar,
  "comparison_description" varchar,
  "comparison_footnote" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_pricing_table_v_order_idx" ON "_pricing_table_v" ("_order");
CREATE INDEX IF NOT EXISTS "_pricing_table_v_parent_id_idx" ON "_pricing_table_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pricing_table_v_path_idx" ON "_pricing_table_v" ("_path");

-- Pricing Table Plans version table
CREATE TABLE IF NOT EXISTS "_pricing_table_v_plans" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name" varchar,
  "badge" varchar,
  "description" varchar,
  "price" varchar,
  "price_suffix" varchar,
  "highlighted" integer DEFAULT 0,
  "cta_label" varchar,
  "cta_href" varchar,
  "cta_new_tab" integer DEFAULT 0,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_order_idx" ON "_pricing_table_v_plans" ("_order");
CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_parent_id_idx" ON "_pricing_table_v_plans" ("_parent_id");

-- Pricing Table Plans Features version table
CREATE TABLE IF NOT EXISTS "_pricing_table_v_plans_features" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v_plans"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "text" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_features_order_idx" ON "_pricing_table_v_plans_features" ("_order");
CREATE INDEX IF NOT EXISTS "_pricing_table_v_plans_features_parent_id_idx" ON "_pricing_table_v_plans_features" ("_parent_id");

-- Pricing Table Comparison Rows version table
CREATE TABLE IF NOT EXISTS "_pricing_table_v_comparison_rows" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "feature" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_order_idx" ON "_pricing_table_v_comparison_rows" ("_order");
CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_parent_id_idx" ON "_pricing_table_v_comparison_rows" ("_parent_id");

-- Pricing Table Comparison Row Values version table
CREATE TABLE IF NOT EXISTS "_pricing_table_v_comparison_rows_values" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_pricing_table_v_comparison_rows"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "type" varchar,
  "label" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_values_order_idx" ON "_pricing_table_v_comparison_rows_values" ("_order");
CREATE INDEX IF NOT EXISTS "_pricing_table_v_comparison_rows_values_parent_id_idx" ON "_pricing_table_v_comparison_rows_values" ("_parent_id");

-- Add hero_portrait_id column to site_pages tables (if missing)
ALTER TABLE "site_pages" ADD COLUMN IF NOT EXISTS "hero_portrait_id" integer REFERENCES "media"("id");
ALTER TABLE "_site_pages_v" ADD COLUMN IF NOT EXISTS "hero_portrait_id" integer REFERENCES "media"("id");
