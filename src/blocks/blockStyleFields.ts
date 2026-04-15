import type { Field } from 'payload'

/**
 * Erweiterte Style-Felder für alle Layout-Blöcke.
 * Ermöglicht zentrale Steuerung von Spacing, Container, Hintergrund, Rahmen und Overlay.
 *
 * HINWEIS: dbName wird NUR auf Feldern verwendet, die direkt in die DB geschrieben werden
 * (nicht auf Groups oder Checkboxes, da diese keine dbName unterstützen).
 */

// ============================================================================
// STYLE FELDER
// ============================================================================

const spacingFields: Field[] = [
  {
    name: 'padding',
    dbName: 'p',
    type: 'select',
    label: 'Innenabstand (Padding)',
    defaultValue: 'default',
    options: [
      { label: 'Keiner (0)', value: 'none' },
      { label: 'Klein (py-8)', value: 'sm' },
      { label: 'Standard (py-16)', value: 'default' },
      { label: 'Groß (py-24)', value: 'lg' },
      { label: 'Extra groß (py-32)', value: 'xl' },
    ],
  },
  {
    name: 'paddingTop',
    dbName: 'pt',
    type: 'select',
    label: 'Oben zusätzlich',
    defaultValue: 'default',
    options: [
      { label: 'Standard', value: 'default' },
      { label: 'Negativ (überschneidet vorherigen)', value: 'negative' },
      { label: 'Extra groß', value: 'xl' },
    ],
  },
  {
    name: 'marginBottom',
    dbName: 'mb',
    type: 'select',
    label: 'Außenabstand unten',
    defaultValue: 'default',
    options: [
      { label: 'Keiner', value: 'none' },
      { label: 'Klein', value: 'sm' },
      { label: 'Standard', value: 'default' },
      { label: 'Groß', value: 'lg' },
    ],
  },
]

const borderFields: Field[] = [
  {
    name: 'enabled',
    type: 'checkbox',
    label: 'Rahmen aktivieren',
    defaultValue: false,
  },
  {
    name: 'style',
    dbName: 'bs',
    type: 'select',
    label: 'Rahmen-Stil',
    defaultValue: 'default',
    options: [
      { label: 'Standard', value: 'default' },
      { label: 'Akzent', value: 'accent' },
      { label: 'Subtil', value: 'subtle' },
    ],
    admin: {
      condition: (_: unknown, siblingData: { enabled?: boolean } | null | undefined) =>
        Boolean(siblingData?.enabled),
    },
  } as Field,
  {
    name: 'radius',
    dbName: 'br',
    type: 'select',
    label: 'Eckradius',
    defaultValue: 'default',
    options: [
      { label: 'Standard (1rem)', value: 'default' },
      { label: 'Klein', value: 'sm' },
      { label: 'Groß', value: 'lg' },
      { label: 'Keiner', value: 'none' },
    ],
    admin: {
      condition: (_: unknown, siblingData: { enabled?: boolean } | null | undefined) =>
        Boolean(siblingData?.enabled),
    },
  } as Field,
]

const overlayFields: Field[] = [
  {
    name: 'enabled',
    type: 'checkbox',
    label: 'Overlay aktiv',
    defaultValue: false,
  },
  {
    name: 'color',
    dbName: 'oc',
    type: 'select',
    label: 'Farbe',
    defaultValue: 'dark',
    options: [
      { label: 'Dunkel', value: 'dark' },
      { label: 'Hell', value: 'light' },
    ],
    admin: {
      condition: (_: unknown, siblingData: { enabled?: boolean } | null | undefined) =>
        Boolean(siblingData?.enabled),
    },
  } as Field,
  {
    name: 'opacity',
    dbName: 'oo',
    type: 'number',
    label: 'Deckkraft (%)',
    min: 0,
    max: 100,
    defaultValue: 0,
    admin: {
      condition: (_: unknown, siblingData: { enabled?: boolean } | null | undefined) =>
        Boolean(siblingData?.enabled),
      description: '0 = transparent, 100 = voll deckend.',
    },
  } as Field,
]

// ============================================================================
// EXPORT
// ============================================================================

export const blockStyleFields: Field[] = [
  // --- Spacing ---
  {
    name: 'blockSpacing',
    type: 'group',
    label: 'Abstände',
    admin: {
      description: 'Padding und Margin des Blocks',
    },
    fields: spacingFields,
  },

  // --- Container ---
  {
    name: 'blockContainer',
    dbName: 'ct',
    type: 'select',
    label: 'Container-Breite',
    defaultValue: 'default',
    options: [
      { label: 'Standard (max-w-7xl)', value: 'default' },
      { label: 'Vollbreite', value: 'full' },
      { label: 'Schmal (max-w-4xl)', value: 'narrow' },
      { label: 'Extrabreit (max-w-[90rem])', value: 'wide' },
      { label: 'Kein Container (randlos)', value: 'none' },
    ],
  },

  // --- Hintergrund (erweitert) ---
  {
    name: 'blockBackground',
    dbName: 'bg',
    type: 'select',
    label: 'Hintergrund',
    defaultValue: 'none',
    options: [
      { label: 'Keiner', value: 'none' },
      { label: 'Hell (muted)', value: 'muted' },
      { label: 'Akzent (accent)', value: 'accent' },
      { label: 'Sehr hell', value: 'light' },
      { label: 'Dunkel', value: 'dark' },
      { label: 'Karte (card)', value: 'card' },
      { label: 'Primär (primary/5)', value: 'primary' },
    ],
    admin: {
      description: 'Hintergrundfarbe des gesamten Blocks',
    },
  },

  // --- Rahmen ---
  {
    name: 'blockBorder',
    type: 'group',
    label: 'Rahmen',
    fields: borderFields,
  },

  // --- Overlay ---
  {
    name: 'blockOverlay',
    type: 'group',
    label: 'Overlay-Filter',
    admin: {
      description: 'Optionaler Farbfilter über dem Blockinhalt',
    },
    fields: overlayFields,
  },

  // --- Content-Spacing ---
  {
    name: 'blockContentSpacing',
    dbName: 'cs',
    type: 'select',
    label: 'Content-Abstand',
    defaultValue: 'default',
    options: [
      { label: 'Kompakt', value: 'compact' },
      { label: 'Standard', value: 'default' },
      { label: 'Luftig', value: 'airy' },
    ],
    admin: {
      description: 'Abstand zwischen Elementen im Block (Headings, Texte, etc.)',
    },
  },

  // --- Animation ---
  {
    name: 'blockAnimation',
    dbName: 'an',
    type: 'select',
    label: 'Animation',
    defaultValue: 'default',
    options: [
      { label: 'Standard (Fade-In)', value: 'default' },
      { label: 'Keine', value: 'none' },
      { label: 'Slide-Up', value: 'slideUp' },
      { label: 'Blur-Fade', value: 'blur' },
    ],
  },
]
