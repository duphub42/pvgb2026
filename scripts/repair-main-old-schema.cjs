#!/usr/bin/env node
/**
 * Repariert das Schema des main_old Branches
 * Erstellt alle fehlenden Tabellen und Spalten
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Lade .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
const envPath = path.join(process.cwd(), '.env');

if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  content.split('\n').forEach(line => {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^"|"$/g, '');
    }
  });
}

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL nicht gefunden in .env.local');
  console.error('Stelle sicher, dass .env.local existiert und DATABASE_URL enthält');
  process.exit(1);
}

console.log('🔗 Verbinde mit Neon...');
console.log('   URL:', DATABASE_URL.replace(/:([^:@]+)@/, ':****@'));

const TABLES_TO_CREATE = [
  // Hero Version Tables
  {
    name: '_site_pages_v_version_hero_stats',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "_uuid" varchar
    );`
  },
  {
    name: '_site_pages_v_version_hero_marquee_logos',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_marquee_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "logo_id" integer,
      "_uuid" varchar
    );`
  },
  {
    name: '_site_pages_v_version_hero_links',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_version_hero_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );`
  },
  // Block Version Tables
  {
    name: '_site_pages_v_blocks_cta',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "rich_text" jsonb,
      "_uuid" varchar,
      "block_name" varchar
    );`
  },
  {
    name: '_site_pages_v_blocks_cta_links',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_cta_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default',
      "_uuid" varchar
    );`
  },
  {
    name: '_site_pages_v_blocks_content',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "block_name" varchar
    );`
  },
  {
    name: '_site_pages_v_blocks_content_columns',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_content_columns" (
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
    );`
  },
  {
    name: '_site_pages_v_blocks_media_block',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_media_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );`
  },
  {
    name: '_site_pages_v_blocks_archive',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_archive" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "populate_by" varchar DEFAULT 'collection',
      "relation_to" varchar DEFAULT 'posts',
      "limit" integer DEFAULT 10,
      "_uuid" varchar,
      "block_name" varchar
    );`
  },
  {
    name: '_site_pages_v_blocks_form_block',
    sql: `CREATE TABLE IF NOT EXISTS "_site_pages_v_blocks_form_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "form_id" integer,
      "enable_intro" boolean,
      "intro_content" jsonb,
      "_uuid" varchar,
      "block_name" varchar
    );`
  },
  // Services Grid Version Tables
  {
    name: '_services_grid_v',
    sql: `CREATE TABLE IF NOT EXISTS "_services_grid_v" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "eyebrow" varchar,
      "heading" varchar,
      "sub" varchar,
      "_uuid" varchar
    );`
  },
  {
    name: '_services_grid_v_categories',
    sql: `CREATE TABLE IF NOT EXISTS "_services_grid_v_categories" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "category_label" varchar,
      "_uuid" varchar
    );`
  },
  {
    name: '_services_grid_v_categories_services',
    sql: `CREATE TABLE IF NOT EXISTS "_services_grid_v_categories_services" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "service_id" integer,
      "_uuid" varchar
    );`
  },
];

const COLUMNS_TO_ADD = [
  { table: 'site_pages_hero_marquee_logos', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_hero_links', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_hero_stats', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_cta', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_cta_links', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_content', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_content_columns', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_media_block', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_archive', column: '_uuid', type: 'varchar' },
  { table: 'site_pages_blocks_form_block', column: '_uuid', type: 'varchar' },
  { table: 'services_grid', column: '_uuid', type: 'varchar' },
  { table: 'services_grid_categories', column: '_uuid', type: 'varchar' },
  { table: 'services_grid_categories_services', column: '_uuid', type: 'varchar' },
  { table: 'footer_columns', column: 'column_icon', type: 'varchar' },
  { table: 'footer_columns', column: 'column_icon_upload_id', type: 'integer' },
];

async function main() {
  const client = new Client({ connectionString: DATABASE_URL });
  
  try {
    await client.connect();
    console.log('✅ Verbindung hergestellt\n');

    // 1. Erstelle fehlende Tabellen
    console.log('📦 Erstelle fehlende Tabellen...');
    for (const { name, sql } of TABLES_TO_CREATE) {
      try {
        await client.query(sql);
        console.log(`  ✅ ${name}`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`  ⏭️  ${name} (existiert bereits)`);
        } else {
          console.error(`  ❌ ${name}: ${err.message}`);
        }
      }
    }

    // 2. Füge fehlende Spalten hinzu
    console.log('\n📦 Füge fehlende Spalten hinzu...');
    for (const { table, column, type } of COLUMNS_TO_ADD) {
      try {
        // Prüfe ob Spalte existiert
        const checkRes = await client.query(`
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1 AND column_name = $2
        `, [table, column]);

        if (checkRes.rows.length === 0) {
          await client.query(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type};`);
          console.log(`  ✅ ${table}.${column}`);
        } else {
          console.log(`  ⏭️  ${table}.${column} (existiert bereits)`);
        }
      } catch (err) {
        if (err.message.includes('does not exist')) {
          console.log(`  ⚠️  ${table} existiert nicht, überspringe`);
        } else {
          console.error(`  ❌ ${table}.${column}: ${err.message}`);
        }
      }
    }

    console.log('\n✅ Reparatur abgeschlossen!');
    console.log('\n📝 Nächster Schritt:');
    console.log('   pnpm dev');

  } catch (err) {
    console.error('\n❌ Fehler:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
