# Hero – alle CSS-Stile (Copy-Paste für KI-Überprüfung)

Quelle: `src/app/(frontend)/globals.css` (und @theme). Klassen, die nur im Hero-TSX verwendet werden (z. B. `hero-box-animate`), können in globals.css fehlen oder von tw-animate kommen.

---

## 1. Custom Variants (Hero-Geräte)

```css
@custom-variant hero-se (@media (max-width: 26.5rem));
@custom-variant hero-se-landscape (@media (orientation: landscape) and (max-height: 26.5rem));
@custom-variant hero-pro-max (@media (min-width: 26.5rem) and (max-width: 29rem));
@custom-variant hero-pro-max-landscape (@media (orientation: landscape) and (min-width: 57rem) and (max-width: 59rem));
@custom-variant hero-playbook (@media (min-width: 37rem) and (max-width: 44rem));
@custom-variant hero-playbook-landscape (@media (orientation: landscape) and (min-width: 63rem) and (max-width: 65rem) and (max-height: 44rem));
@custom-variant hero-ipad (@media (min-width: 48rem) and (max-width: 64rem));
@custom-variant hero-ipad-landscape (@media (orientation: landscape) and (min-width: 63rem) and (max-width: 65rem) and (min-height: 44rem));
```

---

## 2. @theme (Hero-relevante Variablen)

```css
--header-height: 6rem;
--breakpoint-sm: 40rem;
--breakpoint-md: 48rem;
--breakpoint-lg: 64rem;
--breakpoint-xl: 80rem;
--breakpoint-2xl: 86rem;
```

---

## 3. Hero-Box (Rahmen, Schatten, Inner, Animation)

```css
.hero-box-frame-shadow {
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.08),
    0 4px 24px rgba(0, 0, 0, 0.04),
    0 0 64px rgba(255, 255, 255, 0.04),
    0 0 120px rgba(255, 255, 255, 0.015);
}
[data-theme='dark'] .hero-box-frame-shadow {
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.03),
    0 0 80px rgba(255, 255, 255, 0.025),
    0 0 160px rgba(255, 255, 255, 0.01);
}
@media (max-width: 63.99rem) {
  .hero-box-frame-shadow {
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.06),
      0 2px 16px rgba(0, 0, 0, 0.03),
      0 0 48px rgba(255, 255, 255, 0.035),
      0 0 96px rgba(255, 255, 255, 0.02),
      0 0 160px rgba(255, 255, 255, 0.01);
  }
  [data-theme='dark'] .hero-box-frame-shadow {
    box-shadow:
      0 2px 16px rgba(0, 0, 0, 0.025),
      0 0 56px rgba(255, 255, 255, 0.022),
      0 0 120px rgba(255, 255, 255, 0.012),
      0 0 200px rgba(255, 255, 255, 0.006);
  }
}

.hero-shape-divider {
  bottom: -1px;
}

@keyframes hero-box-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.hero-box-inner {
  position: relative;
  transform: translateY(100%);
  animation: hero-box-slide-up 1100ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: radial-gradient(
    ellipse 260% 260% at 0% 100%,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.75) 30%,
    rgba(0, 0, 0, 0.45) 55%,
    rgba(0, 0, 0, 0.2) 78%,
    rgba(0, 0, 0, 0.08) 100%
  );
  mask-image: radial-gradient(
    circle at 100% 0%,
    transparent 0%, transparent 34%,
    rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 70%,
    black 86%, black 100%
  );
  -webkit-mask-image: radial-gradient(
    circle at 100% 0%,
    transparent 0%, transparent 34%,
    rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 70%,
    black 86%, black 100%
  );
  mask-repeat: no-repeat;
  mask-position: 0 0;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: 0 0;
  -webkit-mask-size: 100% 100%;
}
[data-theme='dark'] .hero-box-inner {
  background: radial-gradient(
    ellipse 260% 260% at 0% 100%,
    rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.78) 30%,
    rgba(0, 0, 0, 0.52) 55%, rgba(0, 0, 0, 0.26) 78%,
    rgba(0, 0, 0, 0.12) 100%
  );
}
@media (min-width: 64rem) {
  .hero-box-inner {
    background: radial-gradient(
      ellipse 240% 240% at 100% 0%,
      rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.045) 40%,
      rgba(0, 0, 0, 0.09) 80%, rgba(0, 0, 0, 0.2) 100%
    );
    mask-image: none;
    -webkit-mask-image: none;
  }
  [data-theme='dark'] .hero-box-inner {
    background: radial-gradient(
      ellipse 240% 240% at 100% 0%,
      rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.07) 40%,
      rgba(0, 0, 0, 0.13) 80%, rgba(0, 0, 0, 0.28) 100%
    );
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-box-inner {
    transform: translateY(0);
    animation: none;
  }
}
```

---

## 4. Hero Overlay & Edge Darken

```css
.hero-overlay-base {
  background: radial-gradient(
    ellipse 220% 220% at 100% calc(0.5rem + 5vh),
    transparent 0%, transparent 55%,
    rgba(0, 0, 0, calc(var(--hero-overlay, 0.45) * 0.4)) 75%,
    rgba(0, 0, 0, var(--hero-overlay, 0.45)) 92%,
    rgba(0, 0, 0, var(--hero-overlay, 0.45)) 100%
  );
}
@media (min-width: 768px) {
  .hero-overlay-base {
    background: radial-gradient(
      ellipse 220% 220% at 100% calc(1rem + 6vh),
      transparent 0%, transparent 55%,
      rgba(0, 0, 0, calc(var(--hero-overlay, 0.45) * 0.4)) 75%,
      rgba(0, 0, 0, var(--hero-overlay, 0.45)) 92%,
      rgba(0, 0, 0, var(--hero-overlay, 0.45)) 100%
    );
  }
}

.hero-edge-darken {
  background-image:
    linear-gradient(to bottom, rgba(0,0,0,0.88) 0, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.12) 70%, transparent 100%),
    radial-gradient(ellipse 180% 180% at 100% calc(0.5rem + 5vh), transparent 0%, transparent 35%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.88) 92%, rgba(0,0,0,0.92) 100%);
  background-size: 100% 55%, 100% 100%;
  background-position: 0 0, 0 0;
  background-repeat: no-repeat;
}
@media (min-width: 768px) {
  .hero-edge-darken {
    background-image:
      linear-gradient(to bottom, rgba(0,0,0,0.88) 0, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.12) 70%, transparent 100%),
      radial-gradient(ellipse 180% 180% at 100% calc(1rem + 6vh), transparent 0%, transparent 35%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.88) 92%, rgba(0,0,0,0.92) 100%);
  }
}
```

---

## 5. Hero Subheadline Badge & Headline

```css
@media (max-width: 63.99rem) {
  .hero-subheadline-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.7rem;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: none;
    background: rgba(0, 0, 0, 0.92);
    color: rgba(248, 250, 252, 0.98);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  [data-theme='dark'] .hero-subheadline-badge {
    border: none;
    background: rgba(0, 0, 0, 0.96);
    color: rgba(248, 250, 252, 0.98);
  }
}

.hero-headline {
  word-break: normal;
  overflow-wrap: normal;
  hyphens: manual;
}
```

---

## 6. Hero Vordergrund (Reveal / Scan)

```css
@keyframes hero-foreground-scan1 {
  0% { clip-path: inset(0 0 100% 0); filter: blur(10px) contrast(0.75); opacity: 1; }
  50% { clip-path: inset(0 0 0 0); filter: blur(10px) contrast(0.75); opacity: 1; }
  100% { clip-path: inset(0 0 0 0); filter: blur(10px) contrast(0.75); opacity: 0; }
}
@keyframes hero-foreground-scan2 {
  0% { mask-size: 100% 0%; mask-position: bottom; }
  50% { mask-size: 100% 0%; mask-position: bottom; }
  100% { mask-size: 100% 100%; mask-position: bottom; }
}
@keyframes hero-foreground-scanline {
  0% { transform: translateY(-100%); opacity: 0.9; }
  85% { transform: translateY(100%); opacity: 0.9; }
  100% { transform: translateY(100%); opacity: 0; visibility: hidden; }
}

.hero-foreground-reveal {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2));
}
.hero-foreground-reveal .hero-foreground-scan1,
.hero-foreground-reveal .hero-foreground-scan2 { overflow: visible; }
@media (max-width: 30rem) {
  .hero-foreground-reveal .hero-foreground-scan1 img,
  .hero-foreground-reveal .hero-foreground-scan2 img { object-position: center right; }
}
@media (orientation: landscape) and (max-height: 40rem) and (max-width: 64rem) {
  .hero-foreground-reveal .hero-foreground-scan1 img,
  .hero-foreground-reveal .hero-foreground-scan2 img {
    transform: scale(0.8);
    transform-origin: bottom right;
  }
}
.hero-foreground-reveal::after { content: none; }

.hero-foreground-scan1 {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  clip-path: inset(0 0 100% 0);
  filter: blur(10px) contrast(0.75);
}
.hero-foreground-reveal-active .hero-foreground-scan1 {
  animation: hero-foreground-scan1 2.2s steps(50, end) forwards;
}
.hero-foreground-scan2 {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  mask-image: linear-gradient(to top, black, black);
  mask-size: 100% 0%;
  mask-position: bottom;
  mask-repeat: no-repeat;
}
.hero-foreground-reveal-active .hero-foreground-scan2 {
  animation: hero-foreground-scan2 2.2s steps(50, end) forwards;
}
.hero-foreground-reveal .hero-foreground-scan2 img,
.hero-foreground-reveal .hero-foreground-scan1 img {
  image-rendering: -webkit-optimize-contrast;
  max-height: 100%;
  min-height: 0;
  object-fit: contain;
  object-position: bottom right;
}
```

---

## 7. Hero Hintergrund (Pattern, Halo, Orbit, Animation)

```css
.hero-pattern-bg {
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: /* ... radial/linear gradients ... */;
  background-size: 40px 60px;
}

.hero-pattern-square {
  opacity: 0.5;
  --mx: 0; --my: 0;
  /* ... --hero-pattern-c1, --hero-pattern-c2 ... */
  background: repeating-linear-gradient(...);
  background-size: 64px 64px;
}

.hero-pattern-gold-radial {
  opacity: 0.5;
  width: 100%; height: 100%;
  --s: 200px;
  --c1: var(--hero-pattern-c1, #a0a0a0);
  --c2: var(--hero-pattern-c2, #121212);
  background: radial-gradient(...);
  background-size: var(--s) var(--s);
}
```

```css
.hero-css-halo .halo {
  position: absolute;
  border-radius: 50%;
  width: 60vw; height: 60vw;
  filter: blur(120px);
  opacity: 0.4;
  mix-blend-mode: screen;
  animation: hero-css-halo-float 18s ease-in-out infinite alternate;
  will-change: transform;
}
.hero-css-halo .halo-1 { background: radial-gradient(circle, #00e1ff, transparent 60%); top: -20%; left: -10%; }
.hero-css-halo .halo-2 { background: radial-gradient(circle, #2b00ff, transparent 60%); bottom: -30%; right: -20%; animation-duration: 22s; }
.hero-css-halo .halo-3 { background: radial-gradient(circle, #004cff, transparent 60%); top: 30%; right: 10%; animation-duration: 25s; }
@media (max-width: 63.99rem) {
  .hero-css-halo .halo { width: 85vw; height: 85vw; filter: blur(160px); opacity: 0.26; }
}
@keyframes hero-css-halo-float {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-40px) scale(1.05); }
  100% { transform: translateY(20px) scale(0.95); }
}
.hero-css-halo .halo-noise {
  position: absolute; inset: 0;
  background: url('/noise.png');
  opacity: 0.03;
  pointer-events: none;
}
```

```css
@keyframes hero-bg-shift {
  0%, 100% { opacity: 1; transform: scale(1) translate(0, 0); }
  33% { opacity: 0.95; transform: scale(1.05) translate(2%, -1%); }
  66% { opacity: 1; transform: scale(0.98) translate(-1%, 2%); }
}
.hero-bg-animation {
  background-color: #0a0a0a;
  background-image: radial-gradient(...), radial-gradient(...), radial-gradient(...);
  background-size: 100% 100%;
}
.hero-bg-animation::before {
  content: '';
  position: absolute;
  inset: -20%;
  background: radial-gradient(...), radial-gradient(...);
  animation: hero-bg-shift 18s ease-in-out infinite;
  pointer-events: none;
}
```

```css
@keyframes hero-orbit-core-pulse { ... }
@keyframes hero-orbit-ring-rotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes hero-orbit-flare-orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.hero-orbit {
  position: relative;
  background: radial-gradient(...), radial-gradient(...), radial-gradient(...), #020617;
}
.hero-orbit__core {
  position: absolute; left: 50%; top: 50%;
  width: 80vmin; height: 80vmin;
  border-radius: 9999px;
  background: radial-gradient(...), radial-gradient(...), radial-gradient(...);
  transform: translate(-50%, -50%);
  filter: blur(46px);
  opacity: 0.95;
  animation: hero-orbit-core-pulse 18s ease-in-out infinite alternate;
  box-shadow: 0 0 0 0 #020617, 0 0 0 18vmin #020617 inset;
}
.hero-orbit__ring {
  position: absolute; left: 50%; top: 50%;
  width: 70vmin; height: 70vmin;
  border-radius: 9999px;
  border: 2px solid rgba(148, 163, 184, 0.4);
  box-shadow: 0 0 40px rgba(148, 163, 184, 0.6), 0 0 80px rgba(59, 130, 246, 0.8);
  transform: translate(-50%, -50%);
  animation: hero-orbit-ring-rotate 40s linear infinite;
}
.hero-orbit__flare {
  position: absolute; left: 50%; top: 50%;
  width: 0; height: 0;
  transform-origin: center;
  animation: hero-orbit-flare-orbit 22s linear infinite;
}
.hero-orbit__flare::before {
  content: '';
  position: absolute;
  width: 26px; height: 26px;
  border-radius: 9999px;
  background: radial-gradient(...), radial-gradient(...), radial-gradient(...);
  box-shadow: 0 0 36px ..., 0 0 72px ..., 0 0 96px ...;
  transform: translateX(36vmin);
}
@media (max-width: 63.99rem) {
  .hero-orbit { background: ...; }
  .hero-orbit__core { width: 95vmin; height: 95vmin; filter: blur(72px); opacity: 0.82; box-shadow: ... 20vmin ... inset; }
  .hero-orbit__ring { width: 85vmin; height: 85vmin; border: 1.5px solid ...; box-shadow: ...; }
  .hero-orbit__flare::before { box-shadow: ...; }
}
```

---

## 8. Hero Halo (Vanta) Overlays & Dark Mode

```css
.hero-halo-overlay-gradient {
  --halo-overlay-gradient: 0.68;
  background-image: linear-gradient(to bottom, ...), linear-gradient(to right, ...);
  background-size: 100% 100%, 100% 100%;
}

.hero-halo-overlay {
  --halo-overlay-gradient: 0.68;
  --halo-overlay-grid: 0.08;
  --halo-overlay-grid-size: 12px;
  background-image: linear-gradient(...), linear-gradient(...), repeating-linear-gradient(...), repeating-linear-gradient(...);
  background-size: 100% 100%, 100% 100%, var(--halo-overlay-grid-size) var(--halo-overlay-grid-size), var(--halo-overlay-grid-size) var(--halo-overlay-grid-size);
}

[data-theme='dark'] .hero-halo-layer,
[data-theme='dark'] .hero-halo-layer .hero-halo-overlay,
[data-theme='dark'] .hero-halo-layer .hero-halo-overlay-gradient {
  opacity: 1 !important;
  visibility: visible !important;
}
[data-theme='dark'] .hero-halo-layer { color-scheme: light; isolation: isolate; }
[data-theme='dark'] .hero-bg-wrap { color-scheme: light; }
```

---

## 9. Hero Marquee / Logos

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-50% * var(--marquee-direction, 1))); }
}
.animate-marquee {
  animation: marquee var(--marquee-duration, 30s) linear infinite;
}

.hero-logo-grayscale {
  filter: brightness(0.93) contrast(0.33) saturate(0);
  opacity: 0.92;
}
.hero-logo-marquee-item .hero-logo-grayscale {
  transition: filter 0.2s ease, opacity 0.2s ease;
}
.hero-logo-marquee-item:hover .hero-logo-grayscale {
  filter: none;
  opacity: 1;
}
```

---

## 10. Im Hero-TSX verwendete Klassen (Tailwind / Utility)

- **Wrapper:** `hero-box-animate` (in globals.css nicht definiert, ggf. tw-animate oder leer)
- **Konstanten im Code:**  
  `HERO_BOX_WRAPPER_CLASS` = `pointer-events-none absolute inset-x-0 top-[calc(var(--header-height)+10vh)] bottom-[-10vh] max-h-[700px] z-[6] -m-8 p-8 sm:-m-10 sm:p-10 md:-m-6 md:p-6 lg:-m-[60px] lg:p-[60px] overflow-hidden hero-box-animate`  
  `HERO_BOX_INNER_CLASS` = `hero-box-inner h-full w-full rounded-2xl lg:rounded-3xl border-[0.5px] border-white/5 hero-box-frame-shadow`

---

## Kurz-Übersicht: Hero-Klassen

| Klasse | Zweck |
|--------|--------|
| `hero-box-frame-shadow` | Schatten der Hero-Box |
| `hero-shape-divider` | Shape-Divider Position (bottom: -1px) |
| `hero-box-inner` | Glasbox (Blur, Gradient, Mask, Animation) |
| `hero-overlay-base` | Radialer Overlay (--hero-overlay) |
| `hero-edge-darken` | Linear + radial Edge-Darken |
| `hero-subheadline-badge` | Badge-Styles Mobile |
| `hero-headline` | Headline Wortumbruch |
| `hero-foreground-reveal`, `hero-foreground-scan1`, `hero-foreground-scan2` | Vordergrundbild-Reveal |
| `hero-pattern-bg`, `hero-pattern-square`, `hero-pattern-gold-radial` | Hintergrundmuster |
| `hero-css-halo` (.halo, .halo-1–3, .halo-noise) | CSS-Halo-Hintergrund |
| `hero-bg-animation` | Animierter Hintergrund |
| `hero-orbit`, `hero-orbit__core`, `hero-orbit__ring`, `hero-orbit__flare` | Orbit-Hintergrund |
| `hero-halo-overlay`, `hero-halo-overlay-gradient` | Halo-Overlays |
| `hero-halo-layer`, `hero-bg-wrap` | Container (u. a. Dark Mode) |
| `hero-logo-grayscale`, `hero-logo-marquee-item` | Marquee-Logos |
| `hero-box-animate` | Nur im TSX, nicht in globals.css definiert |
