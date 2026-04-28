/**
 * Runs Payload migrations only when Postgres/Neon is active.
 * For local SQLite development we skip migrations to avoid the interactive
 * "dev mode dynamic push" warning prompt blocking `pnpm dev`.
 */
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const root = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(root, '.env') })
dotenv.config({ path: path.join(root, '.env.local'), override: true })
if (fs.existsSync(path.join(root, 'env.local'))) {
  // Keep precedence aligned with runtime (src/payload.config.ts + load-env-for-payload.cjs)
  // so `pnpm dev` migration preflight and app queries hit the same database.
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
  console.error(
    `[dev] DB-Konflikt: env.local zeigt auf ${legacyLabel}, aktiv ist ${activeLabel}. Entferne oder benenne env.local um, bevor du den Dev-Server startest.`,
  )
  process.exit(1)
}

const hasPostgresUrl = Boolean(
  process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim(),
)
const forceSqlite = String(process.env.USE_SQLITE || '').toLowerCase() === 'true'
const useSqlite = forceSqlite || !hasPostgresUrl

if (useSqlite) {
  console.log('[dev] SQLite aktiv: payload migrate wird uebersprungen.')
  process.exit(0)
}

const payloadBin = path.join(root, 'node_modules', 'payload', 'dist', 'bin', 'index.js')
const preload = path.join(root, 'scripts', 'load-env-for-payload.cjs')

const result = spawnSync(
  process.execPath,
  ['--no-deprecation', '-r', preload, payloadBin, 'migrate'],
  {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
  },
)

if (typeof result.status === 'number') {
  process.exit(result.status)
}

if (result.error) {
  console.error(`[dev] payload migrate failed: ${result.error.message}`)
}

process.exit(1)
