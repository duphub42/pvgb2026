-- Migration: create_radial_tl_block_table.sql
-- Creates the missing table for the RadialOrbitalTimeline block (dbName: 'radial_tl')

CREATE TABLE IF NOT EXISTS radial_tl (
    id SERIAL PRIMARY KEY,
    _order INTEGER,
    _parent_id INTEGER NOT NULL,
    section_title TEXT NOT NULL DEFAULT 'Projekt-Timeline',
    section_text TEXT,
    -- timelineItems is an array, but Payload stores arrays in a join table, so only the parent table here
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline items array table
CREATE TABLE IF NOT EXISTS radial_tl_items (
    id SERIAL PRIMARY KEY,
    _order INTEGER,
    _parent_id INTEGER NOT NULL REFERENCES radial_tl(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT DEFAULT 'Phase',
    i TEXT DEFAULT 'Calendar',
    s TEXT DEFAULT 'pending',
    energy INTEGER DEFAULT 50,
    content TEXT NOT NULL,
    related_ids TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_radial_tl_parent ON radial_tl(_parent_id);
CREATE INDEX IF NOT EXISTS idx_radial_tl_items_parent ON radial_tl_items(_parent_id);
