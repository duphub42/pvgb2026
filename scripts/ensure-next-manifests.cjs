/**
 * Ensures .next/routes-manifest.json and .next/prerender-manifest.json exist
 * before next dev runs. Fixes ENOENT when Payload/Next dev server reads them
 * before the dev bundler has written them.
 */
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', '.next')

const routesManifest = {
  version: 3,
  caseSensitive: false,
  basePath: '',
  rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
  redirects: [],
  headers: [],
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

if (!fs.existsSync(routesPath)) {
  fs.writeFileSync(routesPath, JSON.stringify(routesManifest))
  console.log('Wrote .next/routes-manifest.json')
}

if (!fs.existsSync(prerenderPath)) {
  fs.writeFileSync(prerenderPath, JSON.stringify(prerenderManifest))
  console.log('Wrote .next/prerender-manifest.json')
}
