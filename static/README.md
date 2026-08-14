# PVGB Static Export

This folder is an independent static version of the site. It does not modify the Payload/Next app.

## Export

Start the existing site first, preferably in production mode:

```bash
cd ..
pnpm build
pnpm exec cross-env NODE_OPTIONS="--no-deprecation --require ./scripts/load-env-for-payload.cjs" next start -p 3003
```

Then export one of the static variants:

```bash
cd static
SOURCE_URL=http://localhost:3003 npm run export
```

The exporter first fetches server HTML and uses a Playwright browser snapshot only when a route still contains a loading or error fallback. This keeps normal pages fast while still producing complete static HTML for routes that need client hydration before their content is visible.

## Variants

### Lite

```bash
SOURCE_URL=http://localhost:3003 npm run export:lite
npm run serve:lite
```

Output: `static/dist/`

This version intentionally does not ship the full Next.js runtime. Header interactions are restored by the small files in `static/static-assets/`:

- desktop mega menu
- mobile menu
- language switcher
- theme toggle
- contact and search buttons

This is the fastest version, but advanced Motion/React interactions are only available where they are rebuilt in the static runtime.

### Hydrated

```bash
SOURCE_URL=http://localhost:3003 npm run export:hydrated
npm run serve:hydrated
```

Output: `static/dist-hydrated/`

This version keeps the Next.js client runtime and copies `.next/static`, so Motion, scroll effects and complex React interactions can run. It is larger than Lite, but still serves pages from static files instead of Payload rendering each request.

## Output

```txt
static/dist/
static/dist-hydrated/
```

For a quick local preview:

```bash
npm run serve
```

## Febas Upload

Upload the contents of the chosen output folder to the web root. Keep the folder structure intact, especially:

- `_next/`
- `api/media/`
- `media/`
- `branding/`

For the hydrated variant, Febas also needs a small replacement for the Next image optimizer route `/_next/image`. The local preview server already handles that route.

Contact forms are not static yet. For Febas, the next step is replacing the form action with a small PHP endpoint.
The placeholder file already exists at `static/dist/api/contact.php`, but it deliberately returns a "not configured yet" JSON response until the final mail handling is added.
