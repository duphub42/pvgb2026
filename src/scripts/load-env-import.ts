/**
 * Für import-data.ts: lädt .env/.env.local (z. B. PAYLOAD_SECRET),
 * entfernt aber DATABASE_URL/POSTGRES_URL, damit der Import in die lokale SQLite geht.
 */
import './load-env'

delete process.env.DATABASE_URL
delete process.env.POSTGRES_URL
