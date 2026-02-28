# Hero-Aufbau: Philipp Bacher vs. Referenz (HeroWithMarquee)

## Referenz-Struktur (HeroWithMarquee)

```
Äußerer Wrapper: relative min-h-screen, Gradient-Hintergrund
├── Desktop-Portrait: absolute bottom-0 right-0 z-10 (hidden sm:flex)
├── Hero-Box: relative max-w-6xl mx-auto px-6 py-20 lg:py-32, z-20, Glas (backdrop-blur)
│   ├── Linke Spalte: sm:w-1/2, z-30 → Headline, Text, Button, Marquee (mt-auto)
│   └── Mobile-Portrait: sm:hidden absolute bottom-0 right-4 w-40 z-0
```

- **Desktop:** Portrait **hinter** der Box (z-10 < z-20).
- **Mobile:** Portrait **hinter** dem Inhalt (z-0, innerhalb der Box).
- **Box:** Inhalt in der Breite begrenzt (max-w-6xl), Glas, relativ positioniert.
- **Marquee:** Am unteren Ende der linken Spalte (mt-auto).

---

## Aktueller Philipp-Bacher-Hero

```
Section: relative, min-h 96vh/777px, max-h 777px, -mt-24 pt-48
├── Hintergrund-Layer (z-0): Preset, Pattern, Halo/Orbit/Video
├── Overlay (z-[1]): hero-overlay-base, hero-edge-darken
├── Content-Container: container, Grid lg:grid-cols-[3fr_2fr], pt calc(header+10vh)
│   ├── Hero-Box: absolute top-[77px-12rem] bottom-0 max-h-[700px], z-[2], Glas
│   ├── Vordergrund/Portrait: absolute right-0 bottom-0, z-0 (max-lg) / z-[6] (lg)
│   └── Linke Spalte: pt wie Box, Text + Marquee
└── Shape-Divider (z-[2]/z-[3])
```

- **Desktop:** Portrait **vor** der Box (z-[6] > z-[2]).
- **Mobile:** Portrait **hinter** der Box (z-0). ✓ wie Referenz
- **Box:** Absolut, am unteren Hero-Rand fixiert, max 700px hoch, 77px Abstand oben.
- **Marquee:** In der linken Spalte, unter Text/CTAs. ✓ wie Referenz

---

## Abgleich

| Aspekt | Referenz | Philipp Bacher | Entspricht? |
|--------|----------|----------------|-------------|
| Äußerer Bereich | min-h-screen, Gradient | Section min-h 96vh/777px, komplexer BG | ✓ Konzept |
| Hero-Box | relative, max-w-6xl, Glas | absolute, Container-Breite, Glas | ✓ (andere Technik) |
| Linke Spalte | Headline, Text, Button, Marquee | Subheadline, Headline, Beschreibung, Links, Marquee | ✓ |
| Marquee | mt-auto in linker Spalte | In linker Spalte unter Content | ✓ |
| **Desktop Portrait** | **z-10, hinter Box (z-20)** | **z-[6], vor Box (z-[2])** | ❌ **Umgekehrt** |
| Mobile Portrait | z-0, hinter Box | z-0, hinter Box | ✓ |
| Portrait Position | bottom-0 right-0 / right-4 | bottom-0 right-0, lg: right -2% | ✓ |

---

## Wichtigste Abweichung

**Desktop-Z-Order:** In der Referenz liegt das Portrait **hinter** der Hero-Box (Box darüber). Bei uns liegt das Portrait **vor** der Box. Wenn das Layout wie in der Referenz sein soll, muss die Box auf Desktop **über** dem Portrait liegen (z.B. Box z-20, Portrait z-10) bzw. bei uns: Box > Portrait.

---

## Optionale Anpassung

- **Box über Portrait (wie Referenz):** Portrait `lg:z-[2]` oder niedriger, Box `z-[6]` oder höher, sodass die Box über dem Portrait liegt.
