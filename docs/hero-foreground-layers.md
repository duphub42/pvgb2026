# Vordergrundbild Hero – Ebenen, Filter und Verläufe

Das Vordergrundbild hat **z-0** und liegt **hinter** der Hero-Box (z-[2]). Die Box liegt also darüber; nur durch ihre transparenten Bereiche ist das Bild sichtbar.

## 1. Ebenen ÜBER dem Vordergrundbild (beeinflussen die Anzeige)

| Ebene | Klasse / Element | Wirkung |
|--------|------------------|--------|
| **Hero-Box** | `.hero-box-inner` | Liegt über dem Bild (z-[2]). Nur wo die Box transparent ist, scheint das Bild durch. |
| **Glas-Hintergrund** | `.hero-box-inner` (background) | Hell (rgba 0.04 Light / 0.08 Dark); **backdrop-filter** für Milchglas. |
| **Transparente Ecke** | `.hero-box-inner` (mask) Desktop/Tablet, **Mobile:** `.hero-box-inner::after` (Verdunklungsverlauf mit Maske) | Desktop/Tablet: Maske auf der Glasebene (circle at 100% 0%, transparent 0–34 %). Mobile: Keine Maske auf dem Glas; Verdunklung in **::after** mit gleicher Maske – rechte obere Ecke ohne Verlauf = transparent (Safari-tauglich). |
| **Abdunklungsverlauf** | **Mobile:** `.hero-box-inner::after` | Nur ≤640px: radialer Verlauf (ellipse 260% at 0% 100%), in der rechten oberen Ecke per Maske ausgespart. |
| **Rahmen/Schatten** | `.hero-box-frame-shadow` (am Wrapper) | Box-Schatten um die Hero-Box. |

## 2. Ebenen AM Vordergrundbild (eigene Struktur)

| Ebene | Klasse / Element | Wirkung |
|--------|------------------|--------|
| **Wrapper** | Vordergrund-`div` (TSX) | Position: max-lg an Hero-Box angepasst (top/bottom), z-0, overflow visible. |
| **Reveal-Container** | `.hero-foreground-reveal` | Breite/Höhe (max-lg: w min(88vw,394px), h-full, max-h-full), **Filter:** `drop-shadow(0 4px 16px rgba(0,0,0,0.2))`, lg: `scale(1.034)` origin bottom-right. |
| **Scan-Layer 1** | `.hero-foreground-scan1` | **clip-path:** Animation von `inset(0 0 100% 0)` auf `inset(0 0 0 0)`; **filter:** `blur(10px) contrast(0.75)` (während Reveal); overflow hidden (auf iPhone SE & Landscape teils visible). |
| **Scan-Layer 2** | `.hero-foreground-scan2` | **mask:** linear-gradient(to top, black, black), mask-size 0→100 % (Animation); overflow wie scan1. |
| **Scanbalken** | `.hero-foreground-reveal::after` | Linie (3px), **linear-gradient** (transparent→weiß→transparent), Animation von oben nach unten, am Ende ausgeblendet. |
| **Bild** | `img` in scan1/scan2 | **object-fit:** contain, **object-position:** bottom right (iPhone ≤30rem & Landscape: center right), **max-height:** 100 %, **min-height:** 0, image-rendering: -webkit-optimize-contrast. |

## 3. Verläufe (Zusammenfassung)

- **Hero-Box:** radialer Verlauf oben rechts (100 % 0 %), 88 % Radius transparent, danach Glas/Abdunklung.
- **Hero-Box ::before:** radiale Maske (kein Farbverlauf), steuert nur die Blur-Sichtbarkeit.
- **Hero-Box ::after:** radialer Abdunklungsverlauf (rgba(0,0,0,…)).
- **Scanbalken:** linearer Gradient (vertikal, weiß, für die Scanlinie).

## 4. Was das Vordergrundbild NICHT beeinflusst (liegt dahinter)

- **hero-overlay-base** (z-[1]): Section-Overlay mit radialem Schwarzverlauf und Backdrop-Blur – liegt unter dem gesamten Content (z-10), also unter dem Vordergrundbild.
- **Gradient links** (from-black/80 via-black/60 to-transparent): ebenfalls im Overlay-Container z-[1].
- **hero-edge-darken**: linear + radial, ebenfalls z-[1].

Diese drei liegen **hinter** dem Content-Bereich und damit hinter dem Vordergrundbild; sie verändern nicht die Darstellung des Bildes selbst, nur den Hintergrund der Section.
