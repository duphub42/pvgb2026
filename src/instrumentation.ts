/**
 * Next.js instrumentation hook – läuft einmal beim Start des Servers (Node.js).
 * Bei SQLite: Index-Konflikte (z. B. footer_footer_logo_idx) ggf. mit
 *   pnpm run fix:sqlite-schema
 * beheben. Kein child_process/fs hier, damit das Modul bundler-kompatibel bleibt.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.DATABASE_URL || process.env.POSTGRES_URL) return
  // SQLite: Index-Drop o. ä. nur über separate Skripte (fix:sqlite-schema),
  // um "Module not found: child_process" in Next/Turbopack zu vermeiden.
}
