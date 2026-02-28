# Hero-Vordergrund & Hero-Box – Snippet zum Überprüfen (z. B. mit ChatGPT)

**So kannst du es prüfen lassen:**  
Den Inhalt dieses Dokuments (ab „--- SNIP START ---“) in ChatGPT (oder ein anderes Tool) einfügen und z. B. fragen:

- „Sieh dir die CSS- und Klassen-Logik für Hero-Box und Vordergrundbild an. Wo können sich Positionierung (top/bottom/left/right), height, oder Breakpoints (max-lg/lg/xl) gegenseitig stören?“
- „Entspricht die Reihenfolge und Semantik der Klassen der Referenz (Desktop: Portrait bottom-right hinter Box; Mobile: Portrait bottom-right, Kopf sichtbar)?“

---

## SNIP START – Zum Kopieren

### 1) Referenz (soll so aussehen)

- **Desktop:** Portrait `absolute bottom-0 right-0 z-10`, Hero-Box `relative … z-20` (Box über Portrait). Portrait-Bild z. B. `w-96 object-cover`, `objectPosition: "top"`.
- **Mobile:** Portrait `absolute bottom-0 right-4 z-0`, Bild mit fester Breite (z. B. `w-40`), optional dynamische Höhe und `objectPosition: "top"` (Kopf sichtbar).
- Kein `top` am Portrait-Container, nur `bottom-0`, damit die Höhe vom Inhalt kommt und nichts „irgendwo“ hängt.

### 2) Aktueller TSX-Ausschnitt (Vordergrund-Wrapper + innere Struktur)

```tsx
{/* Vordergrund-Bild */}
<div
  className={cn(
    'pointer-events-none absolute bottom-0 overflow-visible z-0 lg:z-[2] transition-opacity duration-500',
    'max-lg:right-0 max-lg:left-0 max-lg:flex max-lg:justify-end max-lg:items-end',
    'lg:right-0 lg:w-[41%] lg:max-w-[414px]',
    'xl:left-[58%] xl:right-auto',
    mounted ? 'opacity-100' : 'opacity-0',
  )}
>
  <div className={cn(
    'hero-foreground-reveal hero-foreground-reveal-active',
    'max-lg:w-[min(88vw,394px)] max-lg:max-h-[85vh]',
    'lg:w-full lg:max-h-none lg:scale-[1.02] lg:origin-bottom-right',
  )}>
    <div className="hero-foreground-scan1">…<Media imgClassName="w-full h-full object-contain object-bottom max-lg:object-top" /></div>
    <div className="hero-foreground-scan2">…<Media imgClassName="…" /></div>
  </div>
</div>
```

- **Parent-Container:** `container relative z-10 flex … lg:grid lg:grid-cols-[3fr_2fr]`, mit `pt-[calc(var(--header-height)+3vh+10vh)]` usw.
- **Hero-Box:** `absolute inset-x-0 top-[calc(77px-12rem)] bottom-0 max-h-[700px] z-[6]` (am unteren Hero-Rand fixiert).

### 3) Relevante globals.css (Hero-Vordergrund)

- `.hero-foreground-reveal`: `position: relative; width: 100%; height: 100%; overflow: visible; filter: drop-shadow(...)`.
- `.hero-foreground-scan1`, `.hero-foreground-scan2`: `position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end;` (+ clip-path / mask für Einblendung).
- Bilder: `object-fit: contain; object-position: bottom right;` (in CSS), im TSX zusätzlich `object-bottom max-lg:object-top`.

**Fragen an die Prüfung:**

1. Kann `inset: 0` in `.hero-foreground-scan1/2` zusammen mit `height: 100%` in `.hero-foreground-reveal` auf einem nur durch Content hohen Container zu unerwarteter Höhe oder Position führen?
2. Sind `max-lg:left-0 max-lg:right-0` plus `max-lg:flex max-lg:justify-end max-lg:items-end` ausreichend, damit das Bild auf Mobile wirklich unten rechts sitzt, ohne dass ein verstecktes `top`/`height` es verschiebt?
3. Würde es helfen, die Hero-Box und den Vordergrund komplett auf die Referenz-Struktur zurückzusetzen (nur `bottom-0` + Breiten, keine negativen top/left, keine dynamischen Höhen) und dann schrittweise zu erweitern?

--- SNIP END ---

## Nach der Prüfung

- Wenn ChatGPT (oder du) konkrete Änderungen vorschlägt, am besten zuerst in einer Kopie der Komponente testen.
- Wenn du die Hero-Box „komplett neu aufsetzen“ willst: Nur die Klassen und Wrapper für Hero-Box + Vordergrund anfassen, den Rest (Inhalt, Marquee, Links) erstmal lassen; dann nacheinander wieder ergänzen.
