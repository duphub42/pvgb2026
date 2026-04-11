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
