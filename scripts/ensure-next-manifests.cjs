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
const dirs = [path.join(root, '.next'), path.join(root, '.next-dev')]

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

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const routesPath = path.join(dir, 'routes-manifest.json')
  const prerenderPath = path.join(dir, 'prerender-manifest.json')
  fs.writeFileSync(routesPath, JSON.stringify(routesManifest, null, 0))
  fs.writeFileSync(prerenderPath, JSON.stringify(prerenderManifest, null, 0))
}
