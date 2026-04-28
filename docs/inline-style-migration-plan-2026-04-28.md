# Inline Style Audit & Migration Plan (2026-04-28)

## Scope
- Search pattern: `style={...}` in `src/**`
- Total inline-style hits: **113**
- Files affected: **54**

Raw hit list:
- `docs/inline-style-audit-2026-04-28.txt`

## Distribution by area
- `components`: 66
- `heros`: 12
- `blocks`: 19
- `app`: 13
- `Footer`: 2
- `Header`: 1

## Top files by hit count
1. `src/components/MegaMenu/index.tsx` (12)
2. `src/components/ThemeGeneratorPage/ThemeGeneratorClient.tsx` (11)
3. `src/heros/PopoutHeroStackVisual.tsx` (4)
4. `src/blocks/ConsultingOverview/Component.tsx` (4)
5. `src/heros/HeroBackgroundPresetLayer.tsx` (3)
6. `src/components/ui/animated-theme-toggle.tsx` (3)
7. `src/components/ui/animated-text-cycle.tsx` (3)

## Progress
- Phase 1 has been implemented:
  - `src/components/Logo/LogoWithGlitch.tsx`: **5 -> 0**
  - `src/components/PopoutPortrait.tsx`: **5 -> 0**
  - `src/heros/Superhero/SuperheroHero.tsx`: **11 -> 2** (remaining styles are dynamic runtime values)
- Net reduction after Phase 1: **132 -> 113** inline-style hits (**-19**, ~14.4%).

## Migration strategy

### Category A: static inline styles (move first)
Examples: fixed `top/left`, `z-index`, `position`, fixed colors/opacity.

Action:
- Replace with utility classes where possible.
- Else create semantic classes in `src/app/(frontend)/globals.part*.css`.

### Category B: semi-dynamic values (move to CSS variables)
Examples: per-component responsive tweaks and design constants.

Action:
- Keep only CSS custom properties inline (or set on wrapper).
- Move visual rules to global CSS classes consuming those variables.

### Category C: highly dynamic runtime layout (keep, but constrain)
Examples: calculated transforms, per-item coordinates, live measurements.

Action:
- Keep inline for runtime numbers, but normalize pattern:
  - inline only sets `--var` values
  - class does all actual `transform/filter/layout` rules

## Proposed rollout

### Phase 1 (highest ROI, low risk)
- `src/components/Logo/LogoWithGlitch.tsx`
- `src/components/PopoutPortrait.tsx`
- static fragments in `src/heros/Superhero/SuperheroHero.tsx`

### Phase 2 (medium complexity)
- `src/blocks/ConsultingOverview/Component.tsx`
- `src/heros/PopoutHeroStackVisual.tsx`
- `src/components/ThemeGeneratorPage/ThemeGeneratorClient.tsx` (except dynamic preview colors)

### Phase 3 (high complexity, dynamic-heavy)
- `src/components/MegaMenu/index.tsx`

## Guardrails to prevent regression
- Add ESLint rule for JSX `style` usage with allowlist comment for exceptions.
- Require CSS-variable pattern for unavoidable dynamic inline values.
- Add PR checklist item: "No new inline styles without justification".

## SEO / performance note
- Inline styles are **not a direct SEO ranking factor**.
- Indirect impact exists via Core Web Vitals and HTML/SSR payload size.
- Biggest wins come from reducing large/duplicated inline blocks, improving cacheability and maintainability.
