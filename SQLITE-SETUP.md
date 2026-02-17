# SQLite – Schema synchronisieren

Wenn du lokal mit SQLite arbeitest und Fehler wie diese siehst:

- **Header:** `no such column: mega_menu_layout_sidebar_cols`
- **Footer:** `no such table: footer_columns`
- **Design:** `no such table: design`

liegt das daran, dass die Datenbank nicht das aktuelle Payload/Drizzle-Schema hat.

## Empfohlen: DB-Datei löschen und neu starten

**Hinweis:** Alle Daten in der SQLite-Datei gehen verloren.

Wenn du „index … already exists“ oder andere Schema-Konflikte siehst, die DB-Datei komplett entfernen – dann legt Payload beim nächsten Start alles neu an.

1. **Dev-Server stoppen** (Ctrl+C).

2. **SQLite-Datei(en) im Projektroot löschen:**

   ```bash
   rm -f payload.db payload.db-wal payload.db-shm
   ```

   (Ohne `SQLITE_URL` liegt die DB als `payload.db` im Projektordner.)

3. **Server starten** (Schema wird neu erstellt):

   ```bash
   pnpm dev
   ```

   Warte, bis die App fertig geladen ist.

4. **Globals anlegen:** Im Browser **erst danach** aufrufen:

   ```
   http://localhost:3000/api/init-globals
   ```

Danach sollten Header-, Footer- und Design-Globals im Admin funktionieren.

### Alternative: db:reset

Statt die Datei zu löschen, kannst du den Server mit Reset-Flag starten (löscht alle Tabellen in der bestehenden Datei):

```bash
pnpm run db:reset
```

Warte auf „Ready“, dann Ctrl+C, danach `pnpm dev` und anschließend `/api/init-globals`. Wenn danach weiter „index already exists“ kommt, stattdessen die DB-Datei wie oben manuell löschen.

## Alternative: Nur Schema pushen (ohne Datenverlust)

Wenn du die DB nicht löschen willst, kannst du versuchen, nur fehlende Tabellen/Spalten anzulegen:

```bash
pnpm run db:push
```

Warte, bis die App hochgefahren ist und ggf. Drizzle-Warnungen bestätigt sind. Dann Ctrl+C und `pnpm dev`. Bei stark veralteter DB kann der Push fehlschlagen oder unvollständig sein – dann hilft nur `pnpm run db:reset`.
