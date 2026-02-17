/**
 * Gemeinsame Farbfelder für Hell- und Dunkel-Modus.
 * Leer = Standard aus theme/colors.css wird beibehalten.
 */
export const colorFields = [
  {
    name: 'primary',
    type: 'text' as const,
    label: 'Primary',
    admin: { description: 'Hauptfarbe (Buttons, Links, Akzente). Hex z. B. #1587ba oder rgb(21, 135, 186)' },
  },
  {
    name: 'primaryForeground',
    type: 'text' as const,
    label: 'Primary (Text darauf)',
    admin: { description: 'Textfarbe auf Primary-Hintergrund' },
  },
  {
    name: 'secondary',
    type: 'text' as const,
    label: 'Secondary',
    admin: { description: 'Sekundärfläche (z. B. abgesetzte Blöcke)' },
  },
  {
    name: 'accent',
    type: 'text' as const,
    label: 'Accent',
    admin: { description: 'Hover/Highlight (z. B. Menü-Hover)' },
  },
  {
    name: 'success',
    type: 'text' as const,
    label: 'Success',
    admin: { description: 'Erfolg/CTA (z. B. Mega-Menü-Button)' },
  },
  {
    name: 'background',
    type: 'text' as const,
    label: 'Hintergrund',
    admin: { description: 'Seitenhintergrund' },
  },
  {
    name: 'foreground',
    type: 'text' as const,
    label: 'Vordergrund (Text)',
    admin: { description: 'Haupttextfarbe' },
  },
  {
    name: 'card',
    type: 'text' as const,
    label: 'Card-Hintergrund',
    admin: { description: 'Hintergrund für Karten/Boxen' },
  },
  {
    name: 'cardForeground',
    type: 'text' as const,
    label: 'Card-Text',
    admin: { description: 'Text auf Karten' },
  },
  {
    name: 'link',
    type: 'text' as const,
    label: 'Link',
    admin: { description: 'Standard-Linkfarbe (globale Links)' },
  },
  {
    name: 'linkHover',
    type: 'text' as const,
    label: 'Link (Hover)',
    admin: { description: 'Linkfarbe bei Hover' },
  },
  {
    name: 'border',
    type: 'text' as const,
    label: 'Rahmen',
    admin: { description: 'Rahmenfarbe (border)' },
  },
  {
    name: 'muted',
    type: 'text' as const,
    label: 'Muted (Hintergrund)',
    admin: { description: 'Gedämpfter Hintergrund' },
  },
  {
    name: 'mutedForeground',
    type: 'text' as const,
    label: 'Muted (Text)',
    admin: { description: 'Gedämpfte Textfarbe (Beschreibungen)' },
  },
  {
    name: 'destructive',
    type: 'text' as const,
    label: 'Destructive',
    admin: { description: 'Fehler/Löschen' },
  },
  {
    name: 'megaMenuButtonBg',
    type: 'text' as const,
    label: 'Mega-Menü Button Hintergrund',
    admin: { description: 'Hintergrundfarbe des hervorgehobenen Buttons im Mega-Menü' },
  },
  {
    name: 'megaMenuButtonFg',
    type: 'text' as const,
    label: 'Mega-Menü Button Text',
    admin: { description: 'Textfarbe des Buttons im Mega-Menü' },
  },
  {
    name: 'megaMenuNavText',
    type: 'text' as const,
    label: 'Mega-Menü Navigation',
    admin: { description: 'Textfarbe der Hauptnavigation' },
  },
  {
    name: 'megaMenuHeading',
    type: 'text' as const,
    label: 'Mega-Menü Überschriften',
    admin: { description: 'Spaltenüberschriften im Dropdown' },
  },
  {
    name: 'megaMenuItemText',
    type: 'text' as const,
    label: 'Mega-Menü Einträge',
    admin: { description: 'Text der Menüeinträge im Dropdown' },
  },
  {
    name: 'megaMenuDescription',
    type: 'text' as const,
    label: 'Mega-Menü Beschreibung',
    admin: { description: 'Beschreibungstext im Mega-Menü' },
  },
]
