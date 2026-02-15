# Deployment: GitHub + Neon + Vercel

This project is set up for **code on GitHub**, **database on Neon**, and **deploys on Vercel**.

## 1. GitHub

- Push your code to a GitHub repository.
- Vercel will connect to this repo for automatic deployments.

## 2. Neon (Database)

1. Create a project at [neon.tech](https://neon.tech).
2. In the Neon dashboard, open **Connection details** and copy the connection string (use the **pooled** one for serverless).
3. The URL looks like:
   ```text
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. You will use this as `DATABASE_URL` in Vercel (see below).

## 3. Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com) (New Project → Import Git Repository).
2. Set the **Framework Preset** to Next.js and leave **Build Command** as `next build` (or use `pnpm run build` / `npm run build`).
3. If you use **pnpm**, set **Install Command** to `pnpm install` (Vercel often detects this from `pnpm-lock.yaml`).

### Required environment variables

In the Vercel project: **Settings → Environment Variables**. Add these for **Production** (and Preview if you use it):

| Variable | Description | Example |
|----------|-------------|--------|
| `DATABASE_URL` | Neon connection string (pooled) | `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require` |
| `PAYLOAD_SECRET` | Secret for Payload (JWT/session); use a long random string | e.g. generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the site (no trailing slash) | `https://your-app.vercel.app` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token (for Media uploads) | From Vercel project → Storage → Blob |
| `PREVIEW_SECRET` | Live Preview in Admin; **min. 12 characters** | e.g. `openssl rand -hex 12` |
| `CRON_SECRET` | Optional; for securing cron endpoints | Optional long random string |

- **Neon:** set `DATABASE_URL` to your Neon connection string. The app also accepts `POSTGRES_URL` if you prefer that name.
- **NEXT_PUBLIC_SERVER_URL:** for Vercel you can use `https://<your-vercel-domain>` or rely on `VERCEL_PROJECT_PRODUCTION_URL` (see `next.config.js`).

### Build and migrations

- **Build:** Default `next build` is enough. No need to run Payload migrations in the build step unless you want to.
- **Migrations (production):** Run migrations locally against the production DB when you change the schema, or add a CI step that runs `payload migrate` before deploy. The app uses `push: false` in production, so the schema is managed via migrations.

## 4. Optional: Vercel Cron

If you use the cron job in `vercel.json` (`/api/payload-jobs/run`), set `CRON_SECRET` in Vercel and call the endpoint with `Authorization: Bearer <CRON_SECRET>`.

## 5. Local development

1. Copy `.env.example` to `.env.local`.
2. For local Postgres, set `POSTGRES_URL` or `DATABASE_URL`. For Neon, you can use the same Neon connection string (e.g. in `.env.local`).
3. Run `pnpm install`, then `pnpm dev`.

## Troubleshooting

- **Build fails on Vercel:** Check that all required env vars are set for the environment (Production/Preview). Ensure Node version matches (e.g. 18 or 20 in **Settings → General**).
- **DB connection errors:** Use the **pooled** connection string from Neon for serverless. Ensure `DATABASE_URL` (or `POSTGRES_URL`) is set in Vercel.
- **Types out of date:** After changing Payload collections/globals, run `pnpm run generate:types` locally and commit the updated `src/payload-types.ts`.

### Backend zeigt keine Daten (Pages, Globals, Mega-Menü leer)

1. **Richtige Datenbank?**  
   Vercel **Preview**-Deployments können eine andere `DATABASE_URL` nutzen als Production (z. B. neuer Neon-Branch). Wenn die URL auf eine leere DB zeigt, sind alle Listen leer.  
   - In Vercel: **Settings → Environment Variables** prüfen: Welche URL gilt für **Production** vs. **Preview**?  
   - In Neon: Prüfen, ob du den gewünschten Branch (z. B. `main`) und die richtige DB verwendest.

2. **Datenbank wieder befüllen (Seed)**  
   Wenn die Datenbank leer ist oder du Demo-Daten neu anlegen willst:
   - Im Payload-Admin einloggen.
   - `POST /next/seed` aufrufen (z. B. mit einem Tool wie Postman oder von einer Seite aus per Button).  
   - **Hinweis:** Der Seed **löscht zuerst** alle Einträge in den konfigurierten Collections und setzt Globals (z. B. Nav) zurück, danach werden Demo-Pages, -Posts, -Media und Globals angelegt. Eigenes Logo / Mega-Menü / angepasste Globals danach im Admin wieder setzen.

3. **Seed per curl (eingeloggt)**  
   Nach dem Login im Admin (Cookie/Session im Browser) kannst du von derselben Domain aus z. B. in der Browser-Konsole ausführen:
   ```js
   fetch('/next/seed', { method: 'POST', credentials: 'include' }).then(r => r.json()).then(console.log)
   ```
   Oder mit curl die Session-Cookie-Werte übernehmen und `curl -X POST https://deine-domain.vercel.app/next/seed -b "payload-token=..."` ausführen.

### Backend: Bearbeitungsseiten leer (Create New / Dokument öffnen zeigt kein Formular)

Wenn die Listen (z. B. Pages, Posts) sichtbar sind, aber beim Klick auf **Create New** oder einen Eintrag die Bearbeitungsansicht leer bleibt:

1. **Kein eigenes Logo in der Config ohne Import-Map**  
   In `src/payload.config.ts` darf unter `admin.components` kein `graphics: { Logo: '…' }` stehen, wenn die zugehörige Komponente nicht in der generierten Import-Map (`src/app/(payload)/admin/importMap.js`) eingetragen ist. Sonst kann das gesamte Admin-Layout (inkl. Formulare) ausfallen. Eigenes Logo nur verwenden, wenn danach `pnpm run generate:importmap` ausgeführt wurde.

2. **Browser-Konsole prüfen**  
   DevTools (F12) → **Console**. Eine leere Bearbeitungsseite öffnen (z. B. Pages → Create New). Gibt es rote Fehlermeldungen? Typisch sind fehlende Komponenten (Import-Map) oder JavaScript-Fehler in einer Field-Komponente.

3. **Network-Tab**  
   DevTools → **Network**. Beim Öffnen einer Bearbeitungsseite: Schlägt ein Request fehl (z. B. `/api/site-pages/…` oder `/api/globals/…` mit 401/404/500)? Dann liegt das Problem eher an API/Zugriff als am Frontend.

4. **Andere Collection testen**  
   Z. B. **Posts** → Create New oder **Media** → Eintrag öffnen. Wenn dort das Formular erscheint, nur **Pages** betroffen (z. B. durch `layout` required oder Live-Preview-URL). Wenn überall leer, Ursache ist global (Config, Import-Map, oder Fehler in einer gemeinsamen Komponente).

5. **Cache / Inkognito**  
   Einmal Hard-Reload (Strg+Shift+R) oder im Inkognito-Fenster testen. Gespeicherte Admin-Einstellungen (z. B. „Live Preview“ als Standard-Ansicht) können in seltenen Fällen zu leeren Ansichten führen.

6. **Projekt-Code**  
   - In **Pages** ist `versions.drafts.validate: false` gesetzt, damit neue/leere Entwürfe (ohne Layout) geladen werden können.  
   - Die Live-Preview- und Preview-URLs nutzen `getServerSideURL()` mit Fallback, damit die Basis-URL nie leer ist.

### Collection-Slug „site-pages“ (ehemals „pages“)

Die Pages-Collection nutzt den Slug **`site-pages`** statt `pages`, weil in Payload 3 der Slug `pages` reserviert ist und zu leerer Bearbeitungsansicht führen kann.

- **Admin-URL:** `/admin/collections/site-pages` (nicht `/admin/collections/pages`).
- **API:** `/api/site-pages` (nicht `/api/pages`).
- **Nach dem ersten Deploy mit dieser Änderung:** Migration ausführen, damit die bestehenden Tabellen von `pages` auf `site_pages` umbenannt werden:
  ```bash
  pnpm run payload migrate
  ```
  Die Migration `20260215_400000_rename_pages_to_site_pages` benennt alle zugehörigen Tabellen und Enums um. Danach `pnpm run generate:types` ausführen und ggf. commiten.
