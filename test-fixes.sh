#!/bin/bash
# Test-Script für R2 Upload Funktionalität

echo "🧪 R2 Upload Test Suite"
echo ""

# 1. Server-Status
echo "1️⃣ Server-Status:"
if lsof -i :3000 2>/dev/null | grep -q node; then
  echo "   ✓ Dev-Server läuft auf Port 3000"
else
  echo "   ✗ Dev-Server läuft nicht - starte mit: pnpm dev"
  exit 1
fi

# 2. R2 Konfiguration
echo ""
echo "2️⃣ R2 Konfiguration:"
source .env.local

if [[ -n "$R2_ACCOUNT_ID" && -n "$R2_ACCESS_KEY_ID" && -n "$R2_SECRET_ACCESS_KEY" && -n "$R2_BUCKET" ]]; then
  echo "   ✓ R2 Credentials vollständig"
  echo "   ✓ Account ID: ${R2_ACCOUNT_ID:0:10}..."
  echo "   ✓ Bucket: $R2_BUCKET"
else
  echo "   ✗ R2 Credentials fehlen"
  exit 1
fi

# 3. Datenbank
echo ""
echo "3️⃣ Datenbank:"
if [[ "$USE_SQLITE" == "false" && -n "$DATABASE_URL" ]]; then
  echo "   ✓ Postgres/Neon konfiguriert (nicht SQLite)"
else
  echo "   ✗ SQLite ist noch aktiviert - .env.local prüfen"
  exit 1
fi

# 4. Icons
echo ""
echo "4️⃣ Icon-Sprite:"
if [ -f "public/icons-sprite.svg" ]; then
  ICON_COUNT=$(grep -c "hf-twitter\|hf-facebook\|hf-instagram\|hf-linkedin" public/icons-sprite.svg)
  echo "   ✓ Icon-Sprite existiert mit $ICON_COUNT Social-Icons"
else
  echo "   ✗ Icon-Sprite nicht gefunden"
  exit 1
fi

# 5. FooterClient Fix
echo ""
echo "5️⃣ Footer Twitter Icon:"
if grep -q "twitter: 'hf-twitter'" src/Footer/FooterClient.tsx; then
  echo "   ✓ twitter: 'hf-twitter' (nicht hf-x)"
else
  echo "   ✗ Twitter-Icon Mapping nicht korrekt"
  exit 1
fi

echo ""
echo "✅ ALLE TESTS ERFOLGREICH - READY FOR TESTING"
echo ""
echo "📝 Nächste Schritte:"
echo "   1. Öffne http://localhost:3000/admin"
echo "   2. Gehe zu Media Collection"
echo "   3. Lade ein Test-Bild hoch"
echo "   4. Überprüfe ob Bild zu R2 hochgeladen wird"
echo "   5. Überprüfe Footer - Twitter-Icon sollte sichtbar sein"
