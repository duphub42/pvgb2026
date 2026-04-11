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
  dotenv.config({ path: path.join(root, 'env.local'), override: true })
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
