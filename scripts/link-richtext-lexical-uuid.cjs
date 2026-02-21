/**
 * Ensures @payloadcms/richtext-lexical can resolve uuid (pnpm may put it in .ignored).
 * Creates node_modules/@payloadcms/richtext-lexical/node_modules/uuid -> ../../../uuid
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const lexicalDir = path.join(root, 'node_modules', '@payloadcms', 'richtext-lexical')
const nestedModules = path.join(lexicalDir, 'node_modules')
const uuidTarget = path.join(root, 'node_modules', 'uuid')
const uuidLink = path.join(nestedModules, 'uuid')

if (!fs.existsSync(uuidTarget)) return
if (!fs.existsSync(lexicalDir)) return

try {
  if (!fs.existsSync(nestedModules)) fs.mkdirSync(nestedModules, { recursive: true })
  if (fs.existsSync(uuidLink)) {
    const stat = fs.lstatSync(uuidLink)
    if (stat.isSymbolicLink()) return
    fs.rmSync(uuidLink, { recursive: true })
  }
  fs.symlinkSync(path.relative(nestedModules, uuidTarget), uuidLink, 'dir')
} catch (e) {
  // ignore
}
