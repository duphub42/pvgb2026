/**
 * Preload for Payload CLI (`pnpm run payload migrate`, etc.): load `.env` then `.env.local`
 * with override, matching Next.js so migrations hit the same DB as `next dev`.
 * `dotenv/config` alone only reads `.env`, which causes schema drift when URLs live in `.env.local`.
 */
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

const root = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(root, '.env') })
dotenv.config({ path: path.join(root, '.env.local'), override: true })
if (fs.existsSync(path.join(root, 'env.local'))) {
  dotenv.config({ path: path.join(root, 'env.local'), override: false })
}

function parseDbTarget(url) {
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

function getLegacyDbUrl() {
  const legacyEnvPath = path.join(root, 'env.local')
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
const legacyDbUrl = getLegacyDbUrl()

if (activeDbUrl && legacyDbUrl && activeDbUrl !== legacyDbUrl) {
  const active = parseDbTarget(activeDbUrl)
  const legacy = parseDbTarget(legacyDbUrl)
  const activeLabel = active ? `${active.host}/${active.database}` : 'unbekanntes Ziel'
  const legacyLabel = legacy ? `${legacy.host}/${legacy.database}` : 'unbekanntes Ziel'
  throw new Error(
    `[load-env-for-payload] DB-Konflikt: env.local zeigt auf ${legacyLabel}, aktiv ist ${activeLabel}. Entferne oder benenne env.local um, damit Payload CLI und App dieselbe Neon-DB verwenden.`,
  )
}
