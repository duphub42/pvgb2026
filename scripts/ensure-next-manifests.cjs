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
const devDir = path.join(root, '.next-dev')

// Clear stale development artifacts to avoid missing runtime chunks
// such as vendor-chunks/date-fns@4.1.0.js when Next rebuilds incrementally.
if (fs.existsSync(devDir)) {
  fs.rmSync(devDir, { recursive: true, force: true })
}

const dirs = [path.join(root, '.next'), devDir]

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

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const packageJsonPath = path.join(dir, 'package.json')
  fs.writeFileSync(packageJsonPath, JSON.stringify(distPackageJson, null, 2))

  const routesPath = path.join(dir, 'routes-manifest.json')
  const prerenderPath = path.join(dir, 'prerender-manifest.json')
  const appPathsPath = path.join(dir, 'app-paths-manifest.json')
  const pagesPath = path.join(dir, 'pages-manifest.json')

  fs.writeFileSync(routesPath, JSON.stringify(routesManifest, null, 0))
  fs.writeFileSync(prerenderPath, JSON.stringify(prerenderManifest, null, 0))
  fs.writeFileSync(appPathsPath, JSON.stringify(appPathsManifest, null, 0))
  fs.writeFileSync(pagesPath, JSON.stringify(pagesManifest, null, 0))
}
