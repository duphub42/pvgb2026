# Tailwind- & CSS-Setup (Referenz für Component-Generierung)

## Stack

- **Tailwind CSS v4** (4.1.x) – Konfiguration über CSS (`@theme`, `@config`), nicht nur über `tailwind.config.mjs`
- **@tailwindcss/typography** (Prose-Styles)
- **tw-animate-css** (Animationen)
- **tailwind-merge** (z. B. über `cn()` aus `@/utilities/ui`) für Klassen-Merging
- **Custom CSS** in `src/app/(frontend)/globals.css` (viele Hero-, Header-, MegaMenu-, Theme-Styles)

## Konfiguration

- **Tailwind-Config:** `tailwind.config.mjs` (Theme-Extends: `boxShadow.soft`, `typography` mit CSS-Variablen)
- **Haupteinstieg CSS:** `src/app/(frontend)/globals.css`
  - `@import 'tailwindcss'`
  - `@config '../../../tailwind.config.mjs'`
  - `@import '../../theme/colors.css'` (eigentlich `src/theme/colors.css`)
  - `@theme { ... }` mit Breakpoints, `--header-height`, Fonts
  - `@custom-variant dark` über `[data-theme='dark']`
  - Zusätzliche Custom-Varianten: `landscape-short`, `landscape-narrow`, `hero-se`, `hero-pro-max`, `hero-playbook`, `hero-ipad` (und Landscape-Varianten)

## Breakpoints (in globals.css @theme)

- `--breakpoint-sm`: 40rem  
- `--breakpoint-md`: 48rem  
- `--breakpoint-lg`: 64rem  
- `--breakpoint-xl`: 80rem  
- `--breakpoint-2xl`: 86rem  

## Theme / Design-Tokens

- **Farben:** `src/theme/colors.css` + Design-Provider (z. B. `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--primary`, `--accent`, `--theme-elevation-*`, `--color-base-*`)
- **Dark Mode:** über `[data-theme='dark']` (nicht `.dark`), z. B. `[data-theme='dark'] .hero-box-inner { ... }`
- **Fonts:** `--font-outfit` (Body/Heading/Mono), `--font-heading`

## Wichtige Custom-Klassen (Beispiele)

- `.container` – in `@layer utilities`, full width, padding-inline 1rem
- `.hero-box-frame-shadow`, `.hero-box-inner`, `.hero-foreground-reveal`, `.hero-shape-divider`, `.hero-overlay-base`, `.hero-edge-darken`, `.hero-pattern-bg`, etc.
- `.site-header`, Megamenu-Styles
- Prose/Typography über Tailwind Typography-Plugin (CSS-Variablen wie `--tw-prose-body`, `--text`)

## Klassen-Nutzung im Code

- **Utility-First:** vor allem Tailwind-Klassen (`flex`, `absolute`, `max-w-6xl`, `backdrop-blur-md`, `rounded-xl`, etc.)
- **Custom-Klassen:** wo nötig (Hero, Header, spezielle Effekte) – sie leben in `globals.css`
- **Varianten:** `dark:`, `md:`, `lg:`, sowie eigene wie `hero-se:`, `hero-pro-max:` (nur in globals.css definiert, nicht in allen Komponenten genutzt)
- **Arbitrary values:** z. B. `top-[calc(77px-12rem)]`, `max-h-[700px]`, `bg-[var(--background)]`, `pt-[calc(var(--header-height)+3vh+10vh)]`

## Für eine passende Tailwind-Component

- **Tailwind v4**-Syntax verwenden (kein veraltetes v3-Setup).
- **Kein `style jsx`** (Next.js styled-jsx) – wir nutzen globals.css + Tailwind; Animationen lieber in globals.css oder über `tw-animate-css` / Motion.
- **Dark Mode:** Selektoren mit `[data-theme='dark']` oder Nutzung von `var(--background)` etc., die sich mit dem Theme ändern.
- **Abstände/Layout:** wo es zum Header gehört, kann `var(--header-height)` genutzt werden (z. B. `calc(var(--header-height) + 10vh)`).
- **Container:** unsere `.container` hat kein festes max-width wie Tailwind-Standard; bei Bedarf `max-w-6xl mx-auto` o. ä. explizit setzen.

Wenn du eine **konkrete Tailwind-Component** (z. B. Hero, Card, CTA-Block) vorschlagen willst: Am besten so bauen, dass sie **nur Tailwind-Utility-Klassen + ggf. eine Handvoll unserer CSS-Variablen** (`var(--background)`, `var(--muted)`, `var(--header-height)`) nutzt und **keine neuen Custom-Klassen** in globals.css braucht – dann passt sie direkt ins bestehende Setup.
