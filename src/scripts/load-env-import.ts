/**
 * Für import-data.ts: lädt .env/.env.local (z. B. PAYLOAD_SECRET).
 * Zieldatenbank: DATABASE_URL/POSTGRES_URL aus der Umgebung (z. B. von der Kommandozeile).
 * Für Import in lokale SQLite: DATABASE_URL= POSTGRES_URL= vor dem Befehl setzen.
 *
 * Bei Ziel Postgres (Neon): NODE_ENV=production setzen, damit kein Schema-Push läuft
 * (vermeidet fehlerhafte ALTER TABLE … serial-Migrationen unter PostgreSQL).
 */
import './load-env'

if (process.env.DATABASE_URL || process.env.POSTGRES_URL) {
  process.env.NODE_ENV = 'production'
}
