# Header-Kontrast (Light-Modus, keine dunkler Hero)

**Problem:** Im Hellmodus ist der Header transparent mit heller Schrift (#fafafa) – optimal über dunklem Hero. Auf Seiten ohne dunklen Hero: weißer Inhalt → weiße Schrift auf weißem Grund, nicht lesbar.

---

## Lösung 1 – **Light-Theme immer lesbar** (empfohlen, umgesetzt)

Im Light-Theme den Header **ohne Hover** nie transparent mit weißer Schrift darstellen, sondern:
- Leichter Hintergrund (z. B. `rgba(255,255,255,0.95)` oder festes Weiß) + dunkle Schrift.
- Logo nicht invertieren.

**Vorteil:** Überall lesbar, keine Anpassung pro Seite.  
**Nachteil:** Über dunklem Hero keine „reine“ Transparenz mehr, sondern leichte weiße Schicht (optional mit Backdrop-Blur).

---

## Lösung 2 – **Scroll wie auf Mobile (auch Desktop)**

Die bestehende Logik „bei `data-scrolled='true'` fester weißer Header + dunkle Schrift“ auch **außerhalb** der Mobile-Media-Query nutzen. Oben ohne Scroll bleibt es transparent (Problem auf hellen Seiten nur ganz oben).

**Vorteil:** Verhalten wie gewohnt, nur erweitert.  
**Nachteil:** Direkt unter dem Fold auf heller Seite weiterhin schlecht lesbar, bis man scrollt.

---

## Lösung 3 – **Seiten-Attribut „Header über dunklem Bereich“**

Layout/Seite setzt z. B. `data-header-over-dark="true"` (nur auf Startseite oder Seiten mit dunklem Hero).  
CSS: Nur wenn `data-header-over-dark="true"` → transparent + weiße Schrift; sonst im Light-Theme immer fester/leichter Hintergrund + dunkle Schrift.

**Vorteil:** Volle Kontrolle, dunkler Hero kann weiterhin „clean“ transparent genutzt werden.  
**Nachteil:** Jede solche Seite muss das Attribut setzen (Layout oder Page-Komponente).

---

## Lösung 4 – **Leichter Glas-Effekt statt voll transparent**

Im Light-Theme ohne Hover: `background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);` und **dunkle Schrift**. So ist der Header auf hell und dunkel lesbar, wirkt aber weiterhin leicht schwebend.

**Vorteil:** Einheitliches, modernes Verhalten.  
**Nachteil:** Über dunklem Hero kein reines Transparent mehr.

---

## Lösung 5 – **Text-Schatten / Kontur**

Header-Text mit `text-shadow` (z. B. dünner Schatten in beide Richtungen) oder leichter Stroke, damit er auf hell und dunkel lesbar bleibt. Hintergrund bleibt transparent.

**Vorteil:** Keine Änderung der Hintergrund-Logik.  
**Nachteil:** Optik nicht auf jeder Seite ideal, kann „billig“ wirken.

---

**Umsetzung:** Lösung 1 (Light-Theme immer lesbar) ist im CSS umgesetzt.
