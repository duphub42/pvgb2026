# Bundle-Größe unter 500 KB

Ziel: Gesamtgröße von ~955 KB auf unter 500 KB reduzieren.

## Ausgangslage (Content Size)

| Typ    | Anteil  | Größe   |
|--------|---------|---------|
| Script | 52,60 % | 502 KB  |
| Font   | 29,44 % | 281 KB  |
| Image  | 10,12 % | 97 KB   |
| CSS    | 3,83 %  | 37 KB   |
| HTML   | 3,78 %  | 36 KB   |
| **Total** | 100 % | **~955 KB** |

---

## Umgesetzt

### 1. Fonts auf ein Gewicht reduziert (~217 KB gespart)

- **Inter, JetBrains Mono, Outfit:** jeweils nur **400** (normal), keine 500/600/700 und kein Kursiv.
- Gesamt Fonts: ~64 KB (24 + 24 + 16) statt ~281 KB.

**Ersparnis:** ca. 217 KB. `font-weight: 500/600/700` und *italic* im CSS werden vom Browser synthetisiert (kann bei Überschriften etwas matter wirken). Bei Bedarf ein zweites Gewicht (z. B. 600) wieder hinzufügen.

---

## Empfohlene nächste Schritte (Scripts ~502 KB)

### 2. Drittanbieter-Skript (cdn.jsdelivr.net, ~167 KB)

- **Aktuell:** Three.js wird für Vanta-Halo vom CDN geladen (`HeroBackgroundVantaHalo.tsx`).
- **Option A:** Three.min.js selbst hosten (z. B. unter `public/` oder als Chunk), dann kein jsDelivr-Request, gleiche Domain/Cache.
- **Option B:** Hero ohne 3D/Halo anbieten (z. B. nur Bild/CSS), dann wird Three/Vanta nie geladen → ~167 KB weniger auf Seiten ohne Halo.

### 3. JavaScript-Bundle analysieren (umgesetzt)

- **Bundle-Analyzer** ist eingebaut. Ausführen: `pnpm run analyze` (öffnet nach dem Build eine Übersicht im Browser).
- So siehst du, welche Pakete wie viel zum Script-Volumen beitragen.

### 4. AdminBar nur bei Preview laden (umgesetzt)

- **AdminBar** (Payload Admin Bar) wird nur noch geladen, wenn **Preview/Draft** aktiv ist (`draftMode().isEnabled`).
- Normale Besucher laden den Chunk `@payloadcms/admin-bar` nicht mehr → spart spürbar Script (Größe im Analyzer prüfen).
- Implementierung: `AdminBarGate` rendert nur bei `preview === true` und lädt dann per `next/dynamic` die eigentliche AdminBar.

### 5. Schwere Bibliotheken weiter auslagern

- **motion:** bereits in `optimizePackageImports`. Komponenten, die nur auf bestimmten Seiten genutzt werden, per `next/dynamic` mit `ssr: false` laden, wo sinnvoll.
- **three / ogl / vanta:** nur in Hero-Hintergründen, bereits per `dynamic()`. Sicherstellen, dass sie nicht im Haupt-Chunk landen (Analyzer prüfen).
- **Payload Admin Bar:** prüfen, ob nur bei Draft/Preview geladen wird; wenn ja, bereits optimal.

### 6. Preconnect nur bei Bedarf

- `preconnect` zu `cdn.jsdelivr.net` im Layout sorgt für frühen Verbindungsaufbau, auch wenn die Seite keinen Vanta-Hero hat.
- **Option:** Preconnect nur auf Routen setzen, die den Vanta-Hero nutzen (z. B. per Layout oder Component), oder nach Entfernen des CDN-Loads streichen.

---

## Grobe Zielrechnung

| Maßnahme              | Ersparnis (ca.) |
|-----------------------|-----------------|
| Fonts (umgesetzt, nur 400) | ~217 KB    |
| Three/Vanta nur bei Nutzung / self-host | bis ~167 KB |
| Weitere JS-Optimierung (Analyzer + Dynamic) | 100–200 KB möglich |
| **Gesamt**            | **~450–550 KB** |

Nach Font-Reduktion: ~955 − 217 ≈ **738 KB**. Mit weniger Script (Three nur bei Bedarf + weitere Optimierungen) sind **unter 500 KB** erreichbar.

---

## Nach Änderungen prüfen

- Lokal: `pnpm build` → `.next` prüfen; im Production-Build Netzwerk-Tab (z. B. DevTools) „Disable cache“, Seite laden, Größen prüfen.
- Vercel: Nach Deploy in den Vercel-Logs oder mit Tools wie WebPageTest / Lighthouse die geladene Gesamtgröße messen.
