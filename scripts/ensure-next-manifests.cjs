/**
 * Ensures routes-manifest.json and prerender-manifest.json exist under each
 * Next output dir before `next dev` runs. Fixes ENOENT when Payload/Next reads
 * them before the dev bundler has written them.
 *
 * Dev uses distDir `.next-dev` (see next.config.js); production uses `.next`.
 * We seed both so tooling that still looks at `.next` does not race empty dirs.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const devDistDir = process.env.NEXT_DIST_DIR || '.next-dev'
const devDir = path.join(root, devDistDir)

// Do not delete dev distDir here.
// If multiple `next dev` instances are running, deleting the shared directory can
// remove compiled files while another process is serving them, causing ENOENT.
const dirs = Array.from(new Set([path.join(root, '.next'), devDir]))

const routesManifest = {
  version: 3,
  pages404: true,
  caseSensitive: false,
  basePath: '',
  rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
  redirects: [],
  headers: [],
  dynamicRoutes: [],
  i18n: undefined,
  skipMiddlewareUrlNormalize: undefined,
}

const prerenderManifest = {
  version: 4,
  routes: {},
  dynamicRoutes: {},
  notFoundRoutes: [],
  preview: {
    previewModeId: '',
    previewModeSigningKey: '',
    previewModeEncryptionKey: '',
  },
}

const appPathsManifest = {}
const pagesManifest = {}

const distPackageJson = { type: 'commonjs' }

function tryParseJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    JSON.parse(content)
    return true
  } catch {
    return false
  }
}

function writeFileAtomic(filePath, value) {
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`
  fs.writeFileSync(tempPath, value)
  fs.renameSync(tempPath, filePath)
}

function ensureJSONFile(filePath, data) {
  if (fs.existsSync(filePath) && tryParseJSON(filePath)) {
    return
  }

  writeFileAtomic(filePath, JSON.stringify(data, null, 0))
}

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const packageJsonPath = path.join(dir, 'package.json')
  ensureJSONFile(packageJsonPath, distPackageJson)

  const routesPath = path.join(dir, 'routes-manifest.json')
  const prerenderPath = path.join(dir, 'prerender-manifest.json')
  const appPathsPath = path.join(dir, 'app-paths-manifest.json')
  const pagesPath = path.join(dir, 'pages-manifest.json')

  ensureJSONFile(routesPath, routesManifest)
  ensureJSONFile(prerenderPath, prerenderManifest)
  ensureJSONFile(appPathsPath, appPathsManifest)
  ensureJSONFile(pagesPath, pagesManifest)
}
