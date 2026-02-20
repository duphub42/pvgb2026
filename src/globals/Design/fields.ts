/**
 * Gemeinsame Farbfelder für Hell- und Dunkel-Modus.
 * Leer = Standard aus theme/colors.css wird beibehalten.
 * Jedes Feld nutzt den ColorPicker (Hex, rgb, hsl) als zentrale UI.
 */
const colorPickerField = (overrides: {
  name: string
  label: string
  description: string
}) => ({
  name: overrides.name,
  type: 'text' as const,
  label: overrides.label,
  admin: {
    description: overrides.description,
    components: {
      Field: '/components/ColorPicker',
    },
  },
})

/** Mega-Menü-Farben: Checkbox "Eigene Farbe" + bedingtes ColorPicker-Feld. Ohne Häkchen = Farbe wird aus Primary abgeleitet. */
const megaMenuColorSlots: Array<{
  name: string
  label: string
  description: string
}> = [
  { name: 'megaMenuButtonBg', label: 'Mega-Menü Button Hintergrund', description: 'Hintergrundfarbe des hervorgehobenen Buttons.' },
  { name: 'megaMenuButtonFg', label: 'Mega-Menü Button Text', description: 'Textfarbe des Buttons.' },
  { name: 'megaMenuNavText', label: 'Mega-Menü Navigation', description: 'Textfarbe der Hauptnavigation.' },
  { name: 'megaMenuHeading', label: 'Mega-Menü Überschriften', description: 'Spaltenüberschriften im Dropdown.' },
  { name: 'megaMenuItemText', label: 'Mega-Menü Einträge', description: 'Text der Menüeinträge.' },
  { name: 'megaMenuDescription', label: 'Mega-Menü Beschreibung', description: 'Beschreibungstext im Mega-Menü.' },
]

const megaMenuColorFields = megaMenuColorSlots.flatMap((slot) => {
  const colorField = colorPickerField({ name: slot.name, label: slot.label, description: slot.description })
  return [
    {
      name: `${slot.name}UseCustom` as const,
      type: 'checkbox' as const,
      label: `Eigene Farbe: ${slot.label}`,
      admin: {
        description: 'Aktivieren, um eine eigene Farbe zu setzen. Sonst wird die Farbe automatisch aus der Primary-Farbe abgeleitet.',
      },
      defaultValue: false,
    },
    {
      ...colorField,
      admin: {
        ...colorField.admin,
        condition: (_: unknown, siblingData: Record<string, unknown>) => Boolean(siblingData?.[`${slot.name}UseCustom`]),
      },
    },
  ]
})

/** Theme-Primary (Primary, Secondary, Accent) nur in „Theme Colors“ einstellbar – nicht hier. */
export const colorFields = [
  colorPickerField({
    name: 'success',
    label: 'Success',
    description: 'Erfolg/CTA (z. B. Mega-Menü-Button).',
  }),
  colorPickerField({
    name: 'background',
    label: 'Hintergrund',
    description: 'Seitenhintergrund.',
  }),
  colorPickerField({
    name: 'foreground',
    label: 'Vordergrund (Text)',
    description: 'Haupttextfarbe.',
  }),
  colorPickerField({
    name: 'card',
    label: 'Card-Hintergrund',
    description: 'Hintergrund für Karten/Boxen.',
  }),
  colorPickerField({
    name: 'cardForeground',
    label: 'Card-Text',
    description: 'Text auf Karten.',
  }),
  colorPickerField({
    name: 'popover',
    label: 'Popover / Dropdown-Hintergrund',
    description: 'Hintergrund für Dropdowns, Mega-Menü-Panel, Tooltips.',
  }),
  colorPickerField({
    name: 'popoverForeground',
    label: 'Popover-Text',
    description: 'Textfarbe in Dropdowns und Tooltips.',
  }),
  colorPickerField({
    name: 'link',
    label: 'Link',
    description: 'Standard-Linkfarbe (globale Links).',
  }),
  colorPickerField({
    name: 'linkHover',
    label: 'Link (Hover)',
    description: 'Linkfarbe bei Hover.',
  }),
  colorPickerField({
    name: 'border',
    label: 'Rahmen',
    description: 'Rahmenfarbe (border).',
  }),
  colorPickerField({
    name: 'muted',
    label: 'Muted (Hintergrund)',
    description: 'Gedämpfter Hintergrund.',
  }),
  colorPickerField({
    name: 'mutedForeground',
    label: 'Muted (Text)',
    description: 'Gedämpfte Textfarbe (Beschreibungen).',
  }),
  colorPickerField({
    name: 'destructive',
    label: 'Destructive',
    description: 'Fehler/Löschen.',
  }),
  /* Mega-Menü: Standard = automatisch von Primary abgeleitet. Bei "Eigene Farbe" kann pro Element eine Ausnahme gesetzt werden. */
  ...megaMenuColorFields,
]
