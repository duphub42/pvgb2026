# Block Style System

Zentrale Style-Regulierung für alle Payload CMS Layout-Blöcke.

## Übersicht

Dieses System ermöglicht konsistente, zentral gesteuerte Styles für alle Blöcke über das Payload CMS Admin Panel.

## Features

- **Padding**: 5 Stufen (none, sm, default, lg, xl)
- **Margin**: Flexible Außenabstände
- **Container**: 5 Breiten-Varianten
- **Hintergrund**: 7 Optionen (inkl. Cards und Akzent)
- **Rahmen**: Aktivierbar mit Stil und Radius
- **Overlay**: Farbfilter mit Opacity
- **Content-Spacing**: Abstände zwischen Inhaltselementen
- **Animation**: 4 Varianten (Fade, Slide, Blur, None)

## Installation

### 1. Felder zu Block-Config hinzufügen

```typescript
import type { Block } from 'payload'
import { blockStyleFields } from '@/blocks/BlockStyleSystem'

export const MyBlock: Block = {
  slug: 'myBlock',
  fields: [
    // ... deine bestehenden Felder
    ...blockStyleFields,
  ],
}
```

### 2. Komponente mit BlockContainer wrappen

```tsx
import { BlockContainer, useBlockStyles } from '@/components/BlockContainer'
import type { MyBlockType } from '@/payload-types'

export function MyBlock(props: MyBlockType & { index?: number }) {
  const { heading, body, index = 0, ...rest } = props
  const styles = useBlockStyles(rest)

  return (
    <BlockContainer styles={styles} index={index}>
      <h2 className="text-3xl font-bold">{heading}</h2>
      <p className="text-muted-foreground">{body}</p>
    </BlockContainer>
  )
}
```

## Style-Optionen

### Padding (Innenabstand)

| Option | Klasse | Beschreibung |
|--------|--------|--------------|
| none | `py-0` | Kein Padding |
| sm | `py-8` | Klein |
| default | `py-16 md:py-20` | Standard (empfohlen) |
| lg | `py-24 md:py-32` | Groß |
| xl | `py-32 md:py-40` | Extra groß |

### Container-Breite

| Option | Klasse | Beschreibung |
|--------|--------|--------------|
| default | `max-w-7xl` | Standard |
| full | `w-full` | Vollbreite |
| narrow | `max-w-4xl` | Schmal |
| wide | `max-w-[90rem]` | Extrabreit |
| none | - | Kein Container (randlos) |

### Hintergrund

| Option | Beschreibung |
|--------|--------------|
| none | Keiner |
| muted | Muted-Farbe |
| accent | Akzent-Farbe |
| light | Sehr hell |
| dark | Dunkel (ändert auch Textfarbe) |
| card | Card-Hintergrund |
| primary | Primärfarbe (5% Opacity) |

### Content-Spacing

| Option | Klasse | Beschreibung |
|--------|--------|--------------|
| compact | `space-y-3` | Kompakt |
| default | `space-y-6` | Standard |
| airy | `space-y-10` | Luftig |

## Migration bestehender Komponenten

### Vorher (inkonsistent)

```tsx
// Introduction/Component.tsx
<section className="w-full min-w-0 py-16 md:py-24 container px-0">
  <div className="grid items-center gap-10">
    {/* Content */}
  </div>
</section>

// PricingTable/Component.tsx
<section className="container w-full min-w-0 py-14 md:py-16 lg:py-20">
  <div className="relative p-6 md:p-8">
    {/* Content */}
  </div>
</section>
```

### Nachher (konsistent)

```tsx
// Introduction/Component.tsx
<BlockContainer styles={styles} index={index}>
  <div className="grid items-center">
    {/* Content - keine Layout-Klassen mehr nötig */}
  </div>
</BlockContainer>

// PricingTable/Component.tsx
<BlockContainer styles={styles} index={index}>
  {/* Content - padding/width via CMS steuerbar */}
</BlockContainer>
```

## TypeScript Types

```typescript
import type { BlockStyles } from '@/blocks/BlockStyleSystem'

interface MyBlockProps extends BlockStyles {
  heading?: string
  body?: string
}
```

## Best Practices

1. **Keine Layout-Klassen in Komponenten**: Entferne `py-`, `container`, `max-w-` aus den Komponenten
2. **Nur Content-Styles**: Nutze Komponenten-Klassen nur für interne Elemente (Cards, Buttons)
3. **Consistente Headings**: Verwende die Heading-Komponente des Systems
4. **Color Tokens**: Nutze `text-foreground`, `text-muted-foreground` statt hardcoded Farben

## Debug/Hilfe

Im Payload Admin Panel sind alle Style-Optionen unter dem Tab "Styles" (Gruppe am Ende) verfügbar.

## Dateien

- `src/blocks/BlockStyleSystem.ts` - Felder und Style-Mappings
- `src/components/BlockContainer.tsx` - Container-Komponente
- `src/blocks/BLOCK_STYLE_SYSTEM.md` - Diese Dokumentation
