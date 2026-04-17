/**
 * Muss als erstes importiert werden, damit .env / .env.local vor dem
 * Payload-Config-Import geladen sind (Payload liest PAYLOAD_SECRET beim Import).
 */
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fs from 'fs'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')

dotenv.config({ path: path.join(projectRoot, '.env') })
dotenv.config({ path: path.join(projectRoot, '.env.local'), override: true })
dotenv.config({ path: path.join(projectRoot, 'env.local'), override: false })

function parseDbTarget(url: string): { host: string; database: string } | null {
	try {
		const parsed = new URL(url.replace(/^postgresql:\/\//, 'https://'))
		return {
			host: parsed.hostname,
			database: parsed.pathname.replace(/^\//, '') || '(default)',
		}
	} catch {
		return null
	}
}

function getEnvLocalDatabaseUrl(): string | null {
	const legacyEnvPath = path.join(projectRoot, 'env.local')
	if (!fs.existsSync(legacyEnvPath)) return null
	try {
		const raw = fs.readFileSync(legacyEnvPath, 'utf8')
		const match = raw.match(/^(DATABASE_URL|POSTGRES_URL)=(.*)$/m)
		return match?.[2]?.trim() || null
	} catch {
		return null
	}
}

const activeDbUrl = process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim() || ''
const legacyDbUrl = getEnvLocalDatabaseUrl()

if (activeDbUrl && legacyDbUrl && activeDbUrl !== legacyDbUrl) {
	const active = parseDbTarget(activeDbUrl)
	const legacy = parseDbTarget(legacyDbUrl)
	const activeLabel = active ? `${active.host}/${active.database}` : 'unbekanntes Ziel'
	const legacyLabel = legacy ? `${legacy.host}/${legacy.database}` : 'unbekanntes Ziel'
	console.warn(
		`[load-env] WARN: env.local zeigt auf ${legacyLabel}, aktiv ist ${activeLabel}. Nutze nur eine DB-URL-Quelle, sonst landen Migration/Import in verschiedenen Neon-DBs.`,
	)
}
