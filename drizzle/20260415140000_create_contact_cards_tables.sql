-- Create contact_cards tables for ContactInfoCards block

-- Main block table
CREATE TABLE IF NOT EXISTS "site_pages_blocks_contact_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "site_pages"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "block_background" varchar DEFAULT 'none',
  "block_overlay_enabled" boolean DEFAULT false,
  "block_overlay_color" varchar DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 30,
  "cta_label" varchar,
  "cta_href" varchar,
  "block_name" varchar
);
CREATE INDEX IF NOT EXISTS "site_pages_blocks_contact_cards_order_idx" ON "site_pages_blocks_contact_cards" ("_order");
CREATE INDEX IF NOT EXISTS "site_pages_blocks_contact_cards_parent_id_idx" ON "site_pages_blocks_contact_cards" ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_pages_blocks_contact_cards_path_idx" ON "site_pages_blocks_contact_cards" ("_path");

-- Cards array table
CREATE TABLE IF NOT EXISTS "site_pages_blocks_contact_cards_cards" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL REFERENCES "site_pages_blocks_contact_cards"("id") ON DELETE CASCADE,
  "id" varchar PRIMARY KEY NOT NULL,
  "icon" varchar DEFAULT 'map-pin',
  "title" varchar,
  "lines" varchar
);
CREATE INDEX IF NOT EXISTS "site_pages_blocks_contact_cards_cards_order_idx" ON "site_pages_blocks_contact_cards_cards" ("_order");
CREATE INDEX IF NOT EXISTS "site_pages_blocks_contact_cards_cards_parent_id_idx" ON "site_pages_blocks_contact_cards_cards" ("_parent_id");

-- Version block table
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_contact_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v"("id") ON DELETE CASCADE,
  "_path" text NOT NULL,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "block_background" varchar DEFAULT 'none',
  "block_overlay_enabled" boolean DEFAULT false,
  "block_overlay_color" varchar DEFAULT 'dark',
  "block_overlay_opacity" integer DEFAULT 30,
  "cta_label" varchar,
  "cta_href" varchar,
  "_uuid" varchar,
  "block_name" varchar
);
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_order_idx" ON "_site_pages_v_blocks_contact_cards" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_parent_id_idx" ON "_site_pages_v_blocks_contact_cards" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_path_idx" ON "_site_pages_v_blocks_contact_cards" ("_path");

-- Version cards array table
CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_contact_cards_cards" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL REFERENCES "_site_pages_v_blocks_contact_cards"("id") ON DELETE CASCADE,
  "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "icon" varchar DEFAULT 'map-pin',
  "title" varchar,
  "lines" varchar,
  "_uuid" varchar
);
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_cards_order_idx" ON "_site_pages_v_blocks_contact_cards_cards" ("_order");
CREATE INDEX IF NOT EXISTS "_site_pages_v_blocks_contact_cards_cards_parent_id_idx" ON "_site_pages_v_blocks_contact_cards_cards" ("_parent_id");
