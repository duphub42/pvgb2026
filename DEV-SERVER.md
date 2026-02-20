# Dev-Server & Schema

## Dev-Server starten

```bash
pnpm run dev
```

Öffnen: **http://localhost:3000**

---

## Port 3000 ist belegt (EADDRINUSE)

Alten Prozess beenden:

```bash
lsof -ti :3000 | xargs kill -9
pnpm run dev
```

---

## Schema-Push (Spalten entfernt, z. B. Design Primary)

Wenn du Felder aus dem Design-Global entfernt hast, will Drizzle die alten Spalten löschen und fragt:

```
Accept warnings and push schema to database? (y/N)
```

**Wichtig:** Die Eingabe musst du machen, **während** der Prozess noch läuft und auf die Antwort wartet.

1. `pnpm run db:push` starten (startet Next.js mit Schema-Push).
2. Warten, bis die Meldung erscheint.
3. **Sofort** `y` tippen und **Enter** drücken (nicht erst, wenn der Prozess schon beendet ist – sonst wird `y` als Shell-Befehl ausgeführt und du siehst "command not found: y").

Alternativ Bestätigung automatisch senden:

```bash
echo y | pnpm run db:push
```

(Der Server startet trotzdem; beim ersten Schema-Push wird "y" als Antwort verwendet.)

---

## Nur Dev-Server ohne Schema-Push

Einfach:

```bash
pnpm run dev
```

Schema-Push läuft nur mit `db:push` bzw. wenn `PAYLOAD_FORCE_DRIZZLE_PUSH=true` gesetzt ist.
