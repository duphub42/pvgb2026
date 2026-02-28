# Einfache Philipp-Bacher-Hero (Copy-Paste-Paket)

Die **vereinfachte** Hero-Komponente liegt unter:

- **`src/heros/PhilippBacher/PhilippBacherHeroSimple.tsx`**

## Was ist drin

- **Tailwind-only:** Kein Custom-CSS aus `globals.css`, keine Hero-Box-Animation.
- **Payload-kompatibel:** Gleiche Prop-Namen wie aus dem CMS (subheadline, headlineLine1/2/3, foregroundImage, marqueeLogos, …).
- **Features:** Hintergrundbild/Video, Overlay, Vordergrundbild unten rechts, Floating Elements, Marquee, Links (CMSLink).

## Verwendung

### Option A: Direkt einbauen (z. B. Testseite)

```tsx
import { PhilippBacherHeroSimple } from '@/heros/PhilippBacher/PhilippBacherHeroSimple'

<PhilippBacherHeroSimple
  subheadline="CREATIVE DIGITAL STRATEGIST"
  headlineLine1="Kreative Lösungen."
  headlineLine2="Klare Botschaften."
  headlineLine3="Digitale Erfolge."
  description="…"
  foregroundImage={page.hero?.foregroundImage}
  marqueeHeadline="ERGEBNISSE DURCH MARKTFÜHRENDE TECHNOLOGIEN"
  marqueeLogos={page.hero?.marqueeLogos}
  links={page.hero?.links}
/>
```

### Option B: Als Standard-Hero nutzen (RenderHero umstellen)

In `src/heros/RenderHero.tsx` den Import umstellen:

```tsx
// Statt:
import { PhilippBacherHero } from '@/heros/PhilippBacher'
// Optional:
import { PhilippBacherHeroSimple as PhilippBacherHero } from '@/heros/PhilippBacher/PhilippBacherHeroSimple'
```

Dann verwendet jede Seite mit Hero-Typ `philippBacher` die einfache Variante (ohne Glasbox, ohne Shape-Divider, ohne Vanta/Halo).

## Unterschied zur „vollen“ Hero

| | PhilippBacherHero (index) | PhilippBacherHeroSimple |
|--|---------------------------|--------------------------|
| Hero-Box (Glas) | Ja, mit Animation | Nein |
| Shape-Divider | Ja | Nein |
| Hintergrund | Halo/Vanta/Orbit/Video/Bild | Nur Bild/Video + Overlay |
| Vordergrund | Scan-Animation, komplexes Layout | Einfach unten rechts |
| Marquee | Motion + LogoCarousel/Marquee | Einfache Leiste |
| Payload-Props | Ja | Ja (gleiche Namen) |

## Hinweise für Cursor

- Props können angepasst werden; die Komponente bleibt responsive.
- Floating Elements, Marquee, Overlay und Vordergrundbild sind direkt eingebaut.
- Für volle CMS-Anbindung (Richtext, Media-URLs) wird `getMediaUrl` und `CMSLink` aus dem Projekt genutzt.
