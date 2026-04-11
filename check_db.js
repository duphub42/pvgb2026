import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
const requireM = createRequire(process.cwd() + '/')
const pg = requireM(path.resolve(process.cwd(), 'node_modules/.pnpm/pg@8.16.3/node_modules/pg'))
const envText = fs.readFileSync('.env.local', 'utf8')
const vars = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf('=')
      return [line.slice(0, idx), line.slice(idx + 1)]
    }),
)
console.log('DEBUG env text:', JSON.stringify(envText))
console.log('DEBUG parser entries:', Object.entries(vars))
console.log('DEBUG DATABASE_URL set?', Boolean(vars.DATABASE_URL), vars.DATABASE_URL)
const client = new pg.Client({ connectionString: vars.DATABASE_URL })
;(async () => {
  try {
    await client.connect()
    const sp = await client.query('SHOW search_path')
    console.log('search_path=', sp.rows[0].search_path)
    const r = await client.query('SELECT count(*) FROM portfolio_grid_cases')
    console.log('cnt=', r.rows[0].count)
  } catch (err) {
    console.error('ERR', err.message)
    console.error(err.stack)
  } finally {
    await client.end()
  }
})()
