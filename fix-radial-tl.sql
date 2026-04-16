-- Fix missing _radial_tl_v tables in SQLite

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

CREATE INDEX IF NOT EXISTS "_radial_tl_v_order_idx" ON "_radial_tl_v" ("_order");
CREATE INDEX IF NOT EXISTS "_radial_tl_v_parent_id_idx" ON "_radial_tl_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_radial_tl_v_path_idx" ON "_radial_tl_v" ("_path");

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

CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_order_idx" ON "_radial_tl_items_v" ("_order");
CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_id_idx" ON "_radial_tl_items_v" ("_parent_id");
