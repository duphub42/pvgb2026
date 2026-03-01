# Hero-Vordergrundbild (Desktop) – Analyse

## Welche Faktoren beeinflussen die Positionierung?

### 1. **Breakpoints & Sichtbarkeit**
- **Mobile/Tablet (max-lg, &lt; 1024px):** Das Vordergrundbild liegt in **Layer z-[1]** (absolut, rechte Seite `w-[min(24rem,88vw)]` bzw. `md:w-[min(28rem,50vw)]`) und wird mit `lg:hidden` auf Desktop ausgeblendet.
- **Desktop (lg+, ≥ 1024px):** Das Vordergrundbild liegt **innerhalb der Hero-Box** (z-[20]), in einem eigenen Container mit:
  - `max-lg:hidden` → nur auf lg+ sichtbar
  - `absolute bottom-0` → am unteren Rand der Hero-Box verankert
  - `lg:right-0 lg:w-[41%] lg:max-w-[414px] lg:min-h-[420px]`
  - `xl:left-[58%] xl:right-auto xl:w-[42%]`

### 2. **Größe**
- Breite: **41 % der Hero-Box** (lg), max. **414px**; xl: **42 %**, Position ab **58 %** von links.
- Höhe: mind. **420px** (`min-h-[420px]`), Deckung mit der Box-Höhe (max 666px).
- Bild: `object-contain object-bottom` → Bild füllt den Container proportional, am unteren Rand ausgerichtet.

### 3. **Z-Index & Überlagerung**
- Vordergrund-Container: **z-[20]**
- Content-Grid (Text/CTA): **z-10**
- Das Bild liegt also über dem rechten Grid-Bereich und sollte nicht von Text überdeckt werden.

### 4. **Opacity (Hauptgrund für „nicht sichtbar“)**
- Die **gesamte** Desktop-Vordergrund-Div bekommt nur dann `opacity-100`, wenn **beides** gilt:
  - `foregroundMedia` ist gesetzt (Vordergrundbild in den Block-Daten),
  - **und** `mounted === true`.
- `mounted` wird erst nach **zwei requestAnimationFrame** gesetzt (`setMounted(true)`), also erst nach dem ersten Client-Render.
- Bis dahin: **`opacity-0`** + `transition-opacity duration-500`.
- Folge: Ohne laufendes JS oder bei Hydration-Problemen bleibt der Block dauerhaft unsichtbar.

### 5. **Reveal-Animation (CSS)**
- Zwei Layer: `hero-foreground-scan1` (blur-Aufbau) und `hero-foreground-scan2` (scharfes Bild mit Maske).
- **Desktop (min-width: 64rem):**
  - **scan1:** `opacity: 0` → wird ausgeblendet, nur scan2 zeigt das Bild.
  - **scan2:** `mask-size: 100% 100%` → Bild voll sichtbar.
- Wenn die Maske in manchen Browsern (z. B. Safari) nicht greift, könnte scan2 unsichtbar wirken (unwahrscheinlich, da -webkit-mask-size gesetzt).

### 6. **Overflow**
- Hero-Section: `overflow-visible`
- Hero-Box-Wrapper: `overflow-visible`
- Kein Abschneiden des Bildes durch overflow.

---

## Warum ist das Bild auf dem Desktop nicht sichtbar?

Die wahrscheinlichsten Ursachen:

1. **Opacity bleibt 0**  
   Der Container hat `foregroundMedia && mounted ? 'opacity-100' : 'opacity-0'`. Wenn `mounted` nie auf `true` wechselt (z. B. durch Hydration, Strict Mode oder fehlendes JS), bleibt das Bild unsichtbar.

2. **Kein Vordergrundbild in den Daten**  
   Wenn im Hero-Block kein `foregroundImage` / `foregroundMedia` gesetzt ist, wird der Desktop-Vordergrund-Container gar nicht mit Inhalt gefüllt und wirkt leer (die Bedingung `foregroundMedia && mounted` verhindert dann auch opacity-100).

3. **Reveal-CSS auf Desktop**  
   Theoretisch möglich: scan2-Maske oder -opacity in einem Browser nicht wie erwartet; in der Regel sollte es aber durch `mask-size: 100% 100%` und die gesetzte Opacity des umgebenden Divs sichtbar sein.

---

## Empfohlene Maßnahmen

1. **Sichtbarkeit unabhängiger von `mounted` machen (Empfehlung)**  
   - Wenn `foregroundMedia` existiert: Container immer rendern und z. B. mit einer **CSS-Animation** oder `animation-fill-mode: forwards` nach kurzer Verzögerung auf `opacity: 1` gehen (statt erst bei `mounted`).  
   - So wird das Bild auch sichtbar, wenn `mounted` aus irgendeinem Grund nie `true` wird.

2. **Im CMS prüfen**  
   Sicherstellen, dass für die betreffende Seite im Hero-Block ein **Vordergrundbild** (foreground image) ausgewählt ist.

3. **Im Browser prüfen**  
   - DevTools: Element mit den Klassen `hero-foreground-reveal` / `hero-foreground-scan2` suchen.  
   - Computed Styles: `opacity` des umschließenden Divs und von scan2 prüfen.  
   - Wenn das umschließende Div dauerhaft `opacity: 0` hat → Ursache ist die `mounted`-Logik (oder fehlendes `foregroundMedia`).

---

## Umgesetzter Fix

- **Opacity nicht mehr an `mounted` gebunden:** Der Desktop-Vordergrund-Container bekommt bei vorhandenem `foregroundMedia` die Klasse `hero-desktop-foreground-fade-in`.
- **CSS-Fade-in:** In `globals.css` blendet die Animation `hero-desktop-foreground-fade` das Bild nach 0,15 s Verzögerung über 0,5 s ein (`forwards` = bleibt sichtbar).
- Das Bild erscheint damit auch bei verzögerter Hydration oder wenn `mounted` aus anderen Gründen nicht gesetzt wird.
