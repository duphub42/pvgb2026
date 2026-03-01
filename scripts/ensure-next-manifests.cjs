/**
 * Ensures .next/routes-manifest.json and .next/prerender-manifest.json exist
 * before next dev runs. Fixes ENOENT when Payload/Next dev server reads them
 * before the dev bundler has written them. Always writes at dev start so
 * they exist even after hot reload or a fresh .next.
 */
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', '.next')

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

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const routesPath = path.join(dir, 'routes-manifest.json')
const prerenderPath = path.join(dir, 'prerender-manifest.json')

// Always write at dev start so manifests exist (e.g. after rm -rf .next or hot reload)
fs.writeFileSync(routesPath, JSON.stringify(routesManifest, null, 0))
fs.writeFileSync(prerenderPath, JSON.stringify(prerenderManifest, null, 0))
