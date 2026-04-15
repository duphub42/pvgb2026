#!/bin/bash

# Add block style columns to SQLite database

DB="payload.db"

echo "Adding block style columns to $DB..."

# Function to add columns to a table
add_columns() {
  local table=$1
  echo "Processing $table..."
  
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_spacing_padding TEXT DEFAULT 'default';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_spacing_padding_top TEXT DEFAULT 'default';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_spacing_margin_bottom TEXT DEFAULT 'default';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_container TEXT DEFAULT 'default';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_background TEXT DEFAULT 'none';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_border_enabled INTEGER DEFAULT 0;" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_border_style TEXT DEFAULT 'solid';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_border_radius TEXT DEFAULT 'medium';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_overlay_enabled INTEGER DEFAULT 0;" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_overlay_color TEXT DEFAULT 'dark';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_overlay_opacity INTEGER DEFAULT 0;" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_content_spacing TEXT DEFAULT 'default';" 2>/dev/null || true
  sqlite3 "$DB" "ALTER TABLE $table ADD COLUMN block_animation TEXT DEFAULT 'none';" 2>/dev/null || true
  
  echo "  Done with $table"
}

# Add to all block tables
add_columns "site_pages_blocks_hero_marketing"
add_columns "site_pages_blocks_hero_with_process"
add_columns "site_pages_blocks_introduction"
add_columns "site_pages_blocks_consulting_overview"
add_columns "site_pages_blocks_services_overview"
add_columns "services_grid"
add_columns "site_pages_blocks_why_work_with_me"
add_columns "radial_tl"
add_columns "portfolio_grid"
add_columns "portfolio_kpis"
add_columns "site_pages_blocks_brand_showcase"
add_columns "prof_ueber"
add_columns "prof_kern"
add_columns "prof_skills"
add_columns "prof_weg"
add_columns "prof_zahl"
add_columns "prof_tools"
add_columns "prof_lang_zert"
add_columns "prof_cta"
add_columns "site_pages_blocks_price_calculator"
add_columns "pricing_table"
add_columns "site_pages_blocks_cta"
add_columns "site_pages_blocks_cal_popup"
add_columns "contact_cards"
add_columns "site_pages_blocks_content"
add_columns "site_pages_blocks_media_block"
add_columns "site_pages_blocks_archive"
add_columns "site_pages_blocks_form_block"
add_columns "site_pages_blocks_html_embed"
add_columns "site_pages_blocks_code"
add_columns "site_pages_blocks_banner"

echo "Migration complete!"
