import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const MegaMenu: CollectionConfig = {
  slug: 'mega-menu',
  labels: { singular: 'MegaMenu Item', plural: 'MegaMenu Items' },
  admin: {
    defaultColumns: ['label', 'url', 'order'],
    useAsTitle: 'label',
    group: 'Navigation',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [({ req }) => { if (req.context?.skipRevalidate) return; revalidateTag('mega-menu') }],
    afterDelete: [({ req }) => { if (req.context?.skipRevalidate) return; revalidateTag('mega-menu') }],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL',
      admin: { description: 'z. B. /leistungen oder https://...' },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Reihenfolge',
      admin: { description: 'Sortierung (Drag & Drop im Listen-View).' },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon',
      admin: { description: 'Optionales Icon neben dem Label (z. B. für die Hauptnavigation).' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
      admin: { description: 'Optionales Bild im Dropdown (z. B. Teaser oder großes Bild).' },
    },
    {
      name: 'appearance',
      type: 'select',
      label: 'Darstellung',
      defaultValue: 'link',
      options: [
        { label: 'Normaler Link', value: 'link' },
        { label: 'Als Button/Badge', value: 'button' },
      ],
      admin: {
        description: 'Top-Level-Eintrag als normalen Link oder als hervorgehobenen Button/Badge anzeigen.',
      },
    },
    {
      name: 'subItems',
      type: 'array',
      label: 'Submenu-Einträge',
      minRows: 0,
      admin: { description: 'Einfache Liste unter dem Haupt-Label.' },
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: { description: 'Kleines Icon (z. B. 16×16).' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild',
          admin: { description: 'Größeres Bild statt oder neben Icon.' },
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          admin: { description: 'Kurzer Text für Badge (z. B. "Neu", "Pro").' },
        },
        {
          name: 'badgeColor',
          type: 'select',
          label: 'Badge-Farbe',
          defaultValue: 'success',
          options: [
            { label: 'Success (Blau)', value: 'success' },
            { label: 'Muted (Grau)', value: 'muted' },
            { label: 'Accent', value: 'accent' },
            { label: 'Warning (Orange)', value: 'warning' },
            { label: 'Error (Rot)', value: 'error' },
          ],
          admin: { description: 'Farbe des Badges.' },
        },
        { name: 'description', type: 'textarea', label: 'Beschreibung' },
        {
          name: 'dividerBefore',
          type: 'checkbox',
          label: 'Trennlinie davor',
          defaultValue: false,
          admin: { description: 'Zeigt eine Trennlinie vor diesem Eintrag.' },
        },
      ],
    },
    {
      name: 'columnWidths',
      type: 'group',
      label: 'Spaltenbreiten (12er-Grid)',
      admin: {
        description:
          'Breite der drei Dropdown-Spalten (1/12 bis 12/12). Leer = Werte aus Header-Global verwenden. Summe sollte 12 ergeben (z. B. 3 + 6 + 3).',
      },
      fields: [
        {
          name: 'col1',
          type: 'number',
          label: 'Spalte 1 (Kategoriebeschreibung)',
          min: 1,
          max: 12,
          admin: { description: '1 = schmal, 12 = volle Breite.' },
        },
        {
          name: 'col2',
          type: 'number',
          label: 'Spalte 2 (Unterpunkte)',
          min: 1,
          max: 12,
          admin: { description: '1 = schmal, 12 = volle Breite.' },
        },
        {
          name: 'col3',
          type: 'number',
          label: 'Spalte 3 (Highlight)',
          min: 1,
          max: 12,
          admin: { description: '1 = schmal, 12 = volle Breite.' },
        },
      ],
    },
    {
      name: 'categoryDescription',
      type: 'group',
      label: 'Spalte 1: Kategoriebeschreibung',
      admin: {
        description: 'Linke Spalte im Mega-Dropdown. Optional: Titel und Beschreibung. Spalte wird nur angezeigt, wenn mindestens eines ausgefüllt ist.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          admin: { description: 'Optional. Überschrift der Spalte (z. B. „Leistungen“).' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
          admin: { description: 'Fließtext für die Kategorie (z. B. Einleitungstext zu den Unterpunkten).' },
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Unterpunkte (Mitte)',
      minRows: 0,
      admin: {
        description:
          'Einträge für die mittlere Spalte. Alle Spalten-Titel + Einträge werden zu einer gemeinsamen Liste zusammengeführt. Spaltentitel können zur Gruppierung genutzt werden.',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Spaltentitel' },
        {
          name: 'columnWidth',
          type: 'number',
          label: 'Spaltenbreite (1/12–12/12)',
          min: 1,
          max: 12,
          defaultValue: 4,
          admin: {
            description: 'Breite dieser Unterpunkt-Spalte im 12er-Grid. Auf Desktop werden die Spalten nebeneinander angezeigt.',
          },
        },
        {
          name: 'dividerBefore',
          type: 'checkbox',
          label: 'Trennlinie davor',
          defaultValue: false,
          admin: { description: 'Zeigt eine vertikale Trennlinie vor dieser Spalte.' },
        },
        {
          name: 'columnBackground',
          type: 'select',
          label: 'Hintergrund der Spalte',
          defaultValue: 'default',
          options: [
            { label: 'Standard', value: 'default' },
            { label: 'Abgesetzt (muted)', value: 'muted' },
            { label: 'Abgesetzt (accent)', value: 'accent' },
          ],
          admin: { description: 'Optional anderer Hintergrund, um die Spalte visuell abzusetzen.' },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Einträge',
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Label' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
            { name: 'description', type: 'textarea', label: 'Beschreibung', admin: { description: 'Kurzer Text unter dem Label (z. B. Attio-Stil).' } },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Icon',
              admin: { description: 'Kleines Icon.' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Bild',
              admin: { description: 'Bild (z. B. Vorschaubild).' },
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              admin: { description: 'Kurzer Text für Badge (z. B. "Neu", "Pro").' },
            },
            {
              name: 'badgeColor',
              type: 'select',
              label: 'Badge-Farbe',
              defaultValue: 'success',
              options: [
                { label: 'Success (Blau)', value: 'success' },
                { label: 'Muted (Grau)', value: 'muted' },
                { label: 'Accent', value: 'accent' },
                { label: 'Warning (Orange)', value: 'warning' },
                { label: 'Error (Rot)', value: 'error' },
              ],
              admin: { description: 'Farbe des Badges.' },
            },
          ],
        },
      ],
    },
    {
      name: 'highlight',
      type: 'group',
      label: 'Highlight-Block',
      admin: {
        description:
          'Optionaler Block mit einer oder mehreren Karten (Card-Links, z. B. CTA). Ohne Cards wird ein einzelner Block aus den Feldern Titel/Beschreibung/Bild/Button gebaut (Legacy).',
      },
      fields: [
        {
          name: 'position',
          type: 'select',
          label: 'Position',
          defaultValue: 'right',
          options: [
            { label: 'Rechts (neben Unterpunkten)', value: 'right' },
            { label: 'Unter den Unterpunkten', value: 'below' },
          ],
          admin: {
            description: 'Rechts = Highlight als rechte Spalte. Unter den Unterpunkten = Highlight als eigene Zeile unter den Menüpunkten.',
          },
        },
        {
          name: 'background',
          type: 'select',
          label: 'Hintergrund',
          defaultValue: 'default',
          options: [
            { label: 'Standard (einfarbig)', value: 'default' },
            { label: 'Paths (animierte Linien)', value: 'paths' },
          ],
          admin: {
            description: 'Paths = animierte Bezierkurven im Hintergrund (shadcn-Style). Pro Highlight-Box individuell einstellbar.',
          },
        },
        {
          name: 'cards',
          type: 'array',
          label: 'Karten',
          minRows: 0,
          admin: {
            description: 'Mehrere Karten möglich. Jede Karte: optional Titel, Beschreibung, Bild und Link. Stil wie Card-Links (z. B. StackBlitz).',
            initCollapsed: false,
          },
          fields: [
            { name: 'title', type: 'text', label: 'Titel' },
            { name: 'description', type: 'textarea', label: 'Beschreibung' },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Bild',
            },
            { name: 'ctaLabel', type: 'text', label: 'Button-Text' },
            { name: 'ctaUrl', type: 'text', label: 'Button-URL' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titel (Legacy, eine Karte)',
          admin: { condition: (_, siblingData) => !(Array.isArray(siblingData?.cards) && siblingData.cards.length > 0) },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung (Legacy)',
          admin: { condition: (_, siblingData) => !(Array.isArray(siblingData?.cards) && siblingData.cards.length > 0) },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild (Legacy)',
          admin: { condition: (_, siblingData) => !(Array.isArray(siblingData?.cards) && siblingData.cards.length > 0) },
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Button-Text (Legacy)',
          admin: { condition: (_, siblingData) => !(Array.isArray(siblingData?.cards) && siblingData.cards.length > 0) },
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'Button-URL (Legacy)',
          admin: { condition: (_, siblingData) => !(Array.isArray(siblingData?.cards) && siblingData.cards.length > 0) },
        },
      ],
    },
  ],
}
