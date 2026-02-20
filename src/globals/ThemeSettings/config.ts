import type { GlobalConfig } from 'payload'
import { revalidateThemeSettings } from './hooks/revalidateThemeSettings'
import { updateGeneratedTheme } from './hooks/updateGeneratedTheme'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Theme Colors',
  admin: {
    description: 'Eine Primary Color setzen – alle shadcn/ui Theme-Tokens werden daraus abgeleitet.',
    group: 'Einstellungen',
    hideAPIURL: false,
    // Nur über Custom-View „Theme Colors“ in der Nav erreichbar, nicht doppelt in der Sidebar
    hidden: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'primaryMatchesBase',
      type: 'checkbox',
      label: 'Primary = Base (Neutral)',
      defaultValue: false,
      admin: {
        description: 'Wie shadcn „Match base color“: Primary nutzt die gleiche neutrale Grauskala wie das Base-Theme (kein eigener Farbton).',
      },
    },
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Primary Color',
      required: true,
      defaultValue: '#3B82F6',
      admin: {
        description: 'Hex-Farbe (z. B. #3B82F6). Wird ignoriert, wenn „Primary = Base“ aktiv ist.',
      },
    },
    {
      name: 'themeMode',
      type: 'select',
      label: 'Theme-Modus (Vorschau)',
      options: [
        { label: 'Hell', value: 'light' },
        { label: 'Dunkel', value: 'dark' },
      ],
      defaultValue: 'light',
      admin: {
        description: 'Nur für Vorschau; Light/Dark-Tokens werden immer beide gespeichert.',
      },
    },
    {
      name: 'generatedTheme',
      type: 'json',
      label: 'Generierte Tokens (Light & Dark)',
      admin: {
        description: 'Automatisch aus Primary Color erzeugt.',
        readOnly: true,
        condition: () => false,
      },
    },
    {
      name: 'cssString',
      type: 'textarea',
      label: 'CSS-Variablen (Export)',
      admin: {
        description: 'Fertiger CSS-Block :root + .dark fürs Frontend.',
        readOnly: true,
        condition: () => false,
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      label: 'Zuletzt aktualisiert',
      admin: {
        readOnly: true,
        date: { displayFormat: 'dd.MM.yyyy HH:mm' },
      },
    },
  ],
  hooks: {
    beforeChange: [updateGeneratedTheme],
    afterChange: [revalidateThemeSettings],
  },
}
