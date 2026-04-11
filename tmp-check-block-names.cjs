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
  const slug = slugMatch ? slugMatch[1] : null
  if (!slug) continue
  const normalizedSlug = slug.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
  const name = `enum__site_pages_v_blocks_${normalizedSlug}_block_overlay_color`
  if (name.length > 63) {
    console.log(path.relative(process.cwd(), file), slug, normalizedSlug, name.length, name)
  }
}
