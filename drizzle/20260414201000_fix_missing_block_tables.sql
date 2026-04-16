-- Fix missing block tables for SQLite
-- radial_tl (RadialOrbitalTimeline block) and related tables

-- radial_tl block table
CREATE TABLE IF NOT EXISTS "radial_tl" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "block_background" varchar,
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" varchar,
  "block_overlay_opacity" integer,
  "section_title" varchar,
  "section_text" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "radial_tl_order_idx" ON "radial_tl" ("_order");
CREATE INDEX IF NOT EXISTS "radial_tl_parent_id_idx" ON "radial_tl" ("_parent_id");
CREATE INDEX IF NOT EXISTS "radial_tl_path_idx" ON "radial_tl" ("_path");

-- radial_tl_items (nested array)
CREATE TABLE IF NOT EXISTS "radial_tl_items" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "radial_tl"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "title" varchar,
  "date" varchar,
  "category" varchar,
  "icon" varchar,
  "status" varchar,
  "energy" integer,
  "content" varchar,
  "related_ids" varchar
);

CREATE INDEX IF NOT EXISTS "radial_tl_items_order_idx" ON "radial_tl_items" ("_order");
CREATE INDEX IF NOT EXISTS "radial_tl_items_parent_id_idx" ON "radial_tl_items" ("_parent_id");

-- Version tables for radial_tl
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" varchar,
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" varchar,
  "block_overlay_opacity" integer,
  "section_title" varchar,
  "section_text" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline_order_idx" ON "_site_pages_v_blocks_radialOrbitalTimeline" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline_parent_id_idx" ON "_site_pages_v_blocks_radialOrbitalTimeline" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline_path_idx" ON "_site_pages_v_blocks_radialOrbitalTimeline" ("_path");

-- Version table for radial_tl_items
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline_timelineItems" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_radialOrbitalTimeline"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" varchar,
  "date" varchar,
  "category" varchar,
  "icon" varchar,
  "status" varchar,
  "energy" integer,
  "content" varchar,
  "related_ids" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline_timelineItems_order_idx" ON "_site_pages_v_blocks_radialOrbitalTimeline_timelineItems" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_radialOrbitalTimeline_timelineItems_parent_id_idx" ON "_site_pages_v_blocks_radialOrbitalTimeline_timelineItems" ("_parent_id");

-- _radial_tl_v (version table for radial_tl block)
CREATE TABLE IF NOT EXISTS "_radial_tl_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" varchar,
  "block_overlay_enabled" integer DEFAULT 0,
  "block_overlay_color" varchar,
  "block_overlay_opacity" integer,
  "section_title" varchar,
  "section_text" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

CREATE INDEX IF NOT EXISTS "_radial_tl_v_order_idx" ON "_radial_tl_v" ("_order");
CREATE INDEX IF NOT EXISTS "_radial_tl_v_parent_id_idx" ON "_radial_tl_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_radial_tl_v_path_idx" ON "_radial_tl_v" ("_path");

-- _radial_tl_items_v (version table for radial_tl_items)
CREATE TABLE IF NOT EXISTS "_radial_tl_items_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_radial_tl_v"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "title" varchar,
  "date" varchar,
  "category" varchar,
  "icon" varchar,
  "status" varchar,
  "energy" integer,
  "content" varchar,
  "related_ids" varchar,
  "_uuid" varchar
);

CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_order_idx" ON "_radial_tl_items_v" ("_order");
CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_id_idx" ON "_radial_tl_items_v" ("_parent_id");
