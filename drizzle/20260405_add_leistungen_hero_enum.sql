-- Migration: Add 'leistungenHero' to enum_site_pages_hero_type
ALTER TYPE enum_site_pages_hero_type ADD VALUE IF NOT EXISTS 'leistungenHero';
