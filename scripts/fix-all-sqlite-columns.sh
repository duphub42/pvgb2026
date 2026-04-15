#!/bin/bash
# Vollständige SQLite Schema-Reparatur
# Prüft und fügt alle typischen Payload-Spalten hinzu

echo "🔧 Prüfe SQLite Schema..."

DB="payload.db"

# Alle Tabellen mit _uuid Spalte (Payload erwartet diese)
UUID_TABLES=$(sqlite3 "$DB" ".tables" | tr ' ' '\n' | grep -E "^site_pages_|^services_grid|^footer|^header|^mega_menu" | sort -u)

# Füge _uuid Spalte hinzu wo fehlend
for table in $UUID_TABLES; do
  # Prüfe ob _uuid Spalte existiert
  has_uuid=$(sqlite3 "$DB" "PRAGMA table_info($table)" | grep "_uuid" || echo "")
  if [ -z "$has_uuid" ]; then
    echo "  ➕ Füge _uuid zu $table hinzu..."
    sqlite3 "$DB" "ALTER TABLE \"$table\" ADD COLUMN _uuid TEXT;" 2>/dev/null || echo "    ⚠️  Fehler bei $table"
  fi
done

# Spezifische fehlende Spalten (bekannte Probleme)
echo ""
echo "📦 Prüfe bekannte fehlende Spalten..."

# Consulting Overview Benefit Items - icon
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_consulting_overview_benefit_items ADD COLUMN icon TEXT DEFAULT 'check';" 2>/dev/null && echo "  ✅ consulting_overview_benefit_items.icon"

# Hero Stats
sqlite3 "$DB" "ALTER TABLE site_pages_hero_stats ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ hero_stats._uuid"

# Hero Links
sqlite3 "$DB" "ALTER TABLE site_pages_hero_links ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ hero_links._uuid"

# Hero Marquee Logos
sqlite3 "$DB" "ALTER TABLE site_pages_hero_marquee_logos ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ hero_marquee_logos._uuid"

# CTA Blocks
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_cta ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_cta._uuid"
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_cta_links ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_cta_links._uuid"

# Content Blocks
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_content ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_content._uuid"
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_content_columns ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_content_columns._uuid"

# Media Block
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_media_block ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_media_block._uuid"

# Archive Block
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_archive ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_archive._uuid"

# Form Block
sqlite3 "$DB" "ALTER TABLE site_pages_blocks_form_block ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ blocks_form_block._uuid"

# Services Grid
sqlite3 "$DB" "ALTER TABLE services_grid ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ services_grid._uuid"
sqlite3 "$DB" "ALTER TABLE services_grid_categories ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ services_grid_categories._uuid"
sqlite3 "$DB" "ALTER TABLE services_grid_categories_services ADD COLUMN _uuid TEXT;" 2>/dev/null && echo "  ✅ services_grid_categories_services._uuid"

# Footer Columns
sqlite3 "$DB" "ALTER TABLE footer_columns ADD COLUMN column_icon TEXT;" 2>/dev/null && echo "  ✅ footer_columns.column_icon"
sqlite3 "$DB" "ALTER TABLE footer_columns ADD COLUMN column_icon_upload_id INTEGER;" 2>/dev/null && echo "  ✅ footer_columns.column_icon_upload_id"

# Mega Menu Spalten (falls fehlend)
sqlite3 "$DB" "ALTER TABLE mega_menu_columns ADD COLUMN _uuid TEXT;" 2>/dev/null || true
sqlite3 "$DB" "ALTER TABLE mega_menu_columns_items ADD COLUMN _uuid TEXT;" 2>/dev/null || true

echo ""
echo "✅ Schema-Reparatur abgeschlossen!"
echo "📝 Starte jetzt: pnpm dev"
