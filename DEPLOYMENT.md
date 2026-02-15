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
