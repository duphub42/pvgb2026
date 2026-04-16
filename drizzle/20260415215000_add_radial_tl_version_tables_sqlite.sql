-- Fix: Add missing radial_tl version tables for SQLite
-- This fixes the error: SQLITE_ERROR: no such table: _radial_tl_v
-- Run this directly in SQLite: sqlite3 payload.db < 20260415215000_add_radial_tl_version_tables_sqlite.sql

-- Main block versions table (needed by Payload for versioning)
CREATE TABLE IF NOT EXISTS "_radial_tl_v" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "section_title" varchar,
  "section_text" varchar,
  "_uuid" varchar,
  "block_name" varchar
);

-- Timeline items versions table
CREATE TABLE IF NOT EXISTS "_radial_tl_items_v" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
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

-- Also ensure main tables exist (non-versioned)
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
CREATE INDEX IF NOT EXISTS "_radial_tl_v_parent_idx" ON "_radial_tl_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_radial_tl_items_v_parent_idx" ON "_radial_tl_items_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "radial_tl_parent_idx" ON "radial_tl" ("_parent_id");
CREATE INDEX IF NOT EXISTS "radial_tl_items_parent_idx" ON "radial_tl_items" ("_parent_id");
