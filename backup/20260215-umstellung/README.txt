Sicherheitskopie vor Umstellung (Import nach Neon)
Erstellt: 2026-02-15

Inhalt:
- payload.db  = lokale SQLite-Datenbank (komplette Kopie)
- export/     = JSON-Export aller Collections/Globals + media/ (aus export:local)

Wiederherstellung lokal (nur SQLite ersetzen):
  cp payload.db ../../payload.db

Import dieser Daten nach Neon (falls Neon zurückgesetzt werden soll):
  Aus Projektroot: pnpm run import:neon
  (verwendet data/export – dafür ggf. dieses export/ nach data/export kopieren)
