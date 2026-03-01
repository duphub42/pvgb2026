# Hero-Bild Position – Analyse

## Warum sitzt das Hero-Bild nicht auf dem unteren Rand der Hero-Box?

**Kurz:** Das Bild ist mit **`object-fit: contain`** eingestellt. Es wird also **vollständig** sichtbar skaliert und behält sein Seitenverhältnis. Der Container (Bild-Wrapper) ist oft **höher** als die sichtbare Bildhöhe nach dem Skalieren. Mit **`object-position: bottom`** liegt das Bild am **unteren** Rand des Containers – der freie Bereich entsteht **über** dem Bild. Was du als „Abstand unter dem Bild“ siehst, kann sein:

1. **Eigenes Bild-Layout:** Das Foto hat unten im Bild selbst hellen Hintergrund (z. B. Boden/Studio), der wie ein Abstand zur Box wirkt.
2. **Zwei verschiedene „Böden“:**  
   - **Mobile:** Bild liegt in **Layer 1** (z-[1]), Box in **Container** (z-[6]). Beide sind auf „Section + 9vh“ ausgerichtet. Wenn die Section keine feste Min-Höhe hat, können sich die Bezugshöhen minimal unterscheiden.  
   - **Desktop:** Bild ist **in** der Box mit `absolute bottom-0`. Die Box hat Innenabstand (`pb-6` etc.). Der **sichtbare** untere Rand ist die Glasbox; das Bild-Container-Ende kann mit dem Box-Innenrand zusammenfallen, aber durch **contain** füllt das Bild die Container-Höhe nicht – es bleibt „schwebend“ mit sichtbarem Bereich unter dem Motiv.
3. **Contain vs. Box-Höhe:** Bei **contain** wird das Bild so skaliert, dass es **ganz** ins Rechteck passt. Ist der Container höher als nötig, bleibt unten (oder oben) Fläche frei. Mit **bottom** liegt das Bild am unteren Containerrand; der „Loch“-Eindruck kommt oft vom Motiv selbst (helle Fläche im Bild) oder davon, dass die Box optisch weiter nach unten geht (Logos, Padding).

**Fazit:** Technisch ist das Bild mit `object-bottom` am **unteren Rand des Bild-Containers** ausgerichtet. Dass es nicht **optisch** auf dem unteren Rand der Hero-Box sitzt, liegt an: **contain** (Bild füllt die Höhe nicht), evtl. eigenem Bildaufbau (heller Bereich unten) und getrennter Layer-Struktur (Mobile: Bild in Layer 1, Box in Container).

---

## Kann das Hero-Bild der Lynchpin sein?

**Ja.** Dafür muss das Bild (oder sein Container) die **Referenz** für die untere Kante und optional die Höhe der Hero-Box sein.

- **Option A – Bild füllt die Höhe und definiert den unteren Rand (empfohlen):**  
  - **`object-fit: cover`** + **`object-position: bottom`** für das Hero-Bild.  
  - Das Bild füllt dann die Höhe des Containers und wird oben ggf. beschnitten; die **untere Kante** des sichtbaren Bildes ist immer die **untere Kante** des Containers.  
  - Container der Hero-Box und Bild-Container weiterhin wie jetzt auf dieselbe untere Kante legen (Section + 9vh auf Mobile; `absolute bottom-0` auf Desktop). Dann ist das Bild optisch der „Lynchpin“ für den unteren Rand.

- **Option B – Box-Höhe vom Bild ableiten:**  
  - Hero-Box (oder Section) bekommt keine feste Min-Höhe, sondern z. B. **min-height: auto** und die Höhe wird vom Bild-Container (z. B. festes Seitenverhältnis oder Bildhöhe) vorgegeben.  
  - Text/CTA/Logos liegen dann darüber bzw. daneben. Aufwendiger, weil das Layout dann explizit vom Bild abhängt.

Empfehlung: **Option A** umsetzen (Hero-Bild mit **cover** + **bottom**), damit das Bild klar auf dem unteren Rand der Hero-Box sitzt und als Lynchpin für die untere Kante wirkt.

---

## Was passiert in der Panorama-Ansicht?

- **Mobile/Panorama (max-lg):** Das Vordergrundbild liegt in **Layer 1** (z-[1]), **nicht** in der Hero-Box. Der Wrapper hat `absolute inset-0` + `max-lg:bottom-[-9vh]`, der innere Container `top-0 bottom-0` und `object-contain object-bottom object-right`.
- **CSS in Panorama:** In `globals.css` gilt für `(orientation: landscape) and (max-height: 40rem) and (max-width: 64rem)` eine **`transform: scale(0.8)`** mit **`transform-origin: bottom right`** auf den Scan-Img. Das verkleinert das Bild um 20 %; trotz `bottom right` kann das je nach Layout/Overflow wirken, als ob das Bild „nach oben flieht“ (weniger Höhe, mehr Freiraum unten).

## Welche Faktoren verschieben das Bild?

| Faktor | Wo | Wirkung |
|--------|-----|--------|
| **Zwei getrennte Darstellungen** | max-lg vs. lg+ | Bis lg: Bild in Layer 1 (Section). Ab lg: Bild in der Hero-Box (absolute bottom-0). Unterschiedliche Bezugspunkte. |
| **Panorama-CSS** | globals.css | `scale(0.8)` + `transform-origin: bottom right` auf Scan-Img – verkleinert Bild, kann optisch vom unteren Rand abrücken. |
| **Desktop-Scale** | Hero TSX | `lg:scale-[1.02] lg:origin-bottom-right` – leichte Vergrößerung; optisch kann die Unterkante vom Box-Rand abweichen. |
| **object-position** | globals.css / imgClassName | `object-position: bottom right` (Desktop-Scan) bzw. `object-bottom object-right` (Mobile) – Ausrichtung unten rechts; bei unterschiedlichen Container-Höhen wirkt das Bild trotzdem nicht immer bündig mit der Box. |
| **Wrapper-Struktur** | Layer 1 vs. Box | Mobile: Wrapper = Section + 9vh (bottom-[-9vh]). Box = Container mit -mb-[9vh]. Beide enden bei Section + 9vh; wenn eine der Höhen (z. B. 96vh, 12rem Padding) sich in Panorama anders auswirkt, wirkt das Bild verschoben. |
| **Scan-Layer (Desktop)** | hero-foreground-scan1/2 | `position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end` – Bild am unteren rechten Rand des Containers; Container selbst ist `absolute bottom-0` in der Box. |

## Kurz: Warum wirkt es, als ob das Bild „flieht“ / nicht auf der unteren Kante liegt?

1. **Panorama:** `scale(0.8)` verkleinert das Bild; trotz `origin: bottom right` kann der Eindruck entstehen, das Bild weiche vom unteren Hero-Box-Rand ab.
2. **Desktop:** `scale-[1.02]` und die vielen Wrapper (Container mit bottom-0 → hero-foreground-reveal → scan1/2 → img) können die sichtbare Unterkante des Bildes minimal vom unteren Rand der Hero-Box verschieben.
3. **Mobile:** Bild liegt in einem anderen Layer als die Box; die gemeinsame „untere Kante“ ist nur über Section + 9vh definiert. Abweichungen bei Höhen/Padding können die Wahrnehmung verschieben.

## Empfohlene Anpassungen (kurz)

- **Panorama:** `scale(0.8)` entfernen oder durch eine Lösung ersetzen, die das Bild explizit am unteren Rand des sichtbaren Bereichs hält (z. B. nur Breite begrenzen, Höhe mit `object-fit`/`object-position` steuern).
- **Desktop:** `scale-[1.02]` prüfen (ggf. entfernen oder auf 1 setzen), damit die Unterkante des Bildes exakt mit dem unteren Rand der Hero-Box übereinstimmt.
- **Mobile:** Sicherstellen, dass der Bild-Container (z. B. mit `flex` + `align-items: flex-end`) und `object-bottom` das Bild fest am unteren Rand des Wrappers verankern.
