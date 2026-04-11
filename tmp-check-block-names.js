const fs = require('fs')
const path = require('path')
function walk(dir) {
  let results = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) results = results.concat(walk(p))
    else if (stat.isFile() && name === 'config.ts') results.push(p)
  }
  return results
}
const root = path.join(process.cwd(), 'src/blocks')
for (const file of walk(root).sort()) {
  const text = fs.readFileSync(file, 'utf8')
  const slugMatch = text.match(/slug:\s*'([^']+)'/)
  const dbNameMatch = text.match(/dbName:\s*'([^']+)'/)
  const slug = slugMatch ? slugMatch[1] : null
  const dbName = dbNameMatch ? dbNameMatch[1] : null
  if (!slug) continue
  const id = dbName || slug
  const name = `enum__site_pages_v_blocks_${id}_block_overlay_color`
  if (name.length >= 63) {
    console.log(path.relative(process.cwd(), file), slug, dbName || '(none)', name.length, name)
  }
}
