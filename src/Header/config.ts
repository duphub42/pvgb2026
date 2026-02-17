import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const GRID_TOTAL = 12

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'useMegaMenu',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mega-Menü verwenden',
      admin: {
        description:
          'Wenn aktiviert, wird das Mega-Menü (Collection „MegaMenu Items“) angezeigt statt der einfachen Nav-Links. Mindestens ein Eintrag unter Navigation → MegaMenu Items muss existieren.',
      },
    },
    {
      name: 'megaMenuLayout',
      type: 'group',
      label: 'Mega-Menü Spaltenbreiten',
      admin: {
        description: 'Aufteilung des Dropdowns im 12-Spalten-Grid. Die drei Werte müssen zusammen 12 ergeben.',
        condition: (data) => Boolean((data as { useMegaMenu?: boolean })?.useMegaMenu),
      },
      fields: [
        {
          name: 'sidebarCols',
          type: 'number',
          label: 'Sidebar-Spalten',
          defaultValue: 3,
          min: 1,
          max: 12,
          required: true,
          admin: { description: 'Linke Spalte (Titel/Beschreibung).' },
        },
        {
          name: 'contentCols',
          type: 'number',
          label: 'Inhalts-Spalten',
          defaultValue: 6,
          min: 1,
          max: 12,
          required: true,
          admin: { description: 'Mitte (Link-Liste).' },
        },
        {
          name: 'featuredCols',
          type: 'number',
          label: 'Highlight-Spalten',
          defaultValue: 3,
          min: 1,
          max: 12,
          required: true,
          admin: { description: 'Rechte Spalte (Bild/CTA).' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Mega-Menü: Kontakt & Newsletter',
      admin: {
        description: 'WhatsApp-Button, Rückruf-Anfrage (Telefonnummer) und Newsletter-Anmeldung im Mega-Menü-Dropdown.',
        condition: (data) => Boolean((data as { useMegaMenu?: boolean })?.useMegaMenu),
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'megaMenuShowWhatsApp',
              type: 'checkbox',
              label: 'WhatsApp-Button anzeigen',
              defaultValue: false,
              admin: { width: '50%' },
            },
            {
              name: 'megaMenuWhatsAppLabel',
              type: 'text',
              label: 'WhatsApp-Button-Text',
              defaultValue: 'WhatsApp',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowWhatsApp),
              },
            },
          ],
        },
        {
          name: 'megaMenuWhatsAppUrl',
          type: 'text',
          label: 'WhatsApp-URL',
          admin: {
            description: 'z. B. https://wa.me/49123456789 oder https://wa.me/49123456789?text=...',
            condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowWhatsApp),
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'megaMenuShowCallback',
              type: 'checkbox',
              label: 'Rückruf-Anfrage anzeigen',
              defaultValue: false,
              admin: { width: '50%' },
            },
            {
              name: 'megaMenuCallbackTitle',
              type: 'text',
              label: 'Titel Rückruf',
              defaultValue: 'Rückruf anfordern',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowCallback),
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'megaMenuCallbackPlaceholder',
              type: 'text',
              label: 'Placeholder Telefonnummer',
              defaultValue: 'Ihre Telefonnummer',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowCallback),
              },
            },
            {
              name: 'megaMenuCallbackButtonText',
              type: 'text',
              label: 'Button-Text Rückruf',
              defaultValue: 'Anfragen',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowCallback),
              },
            },
          ],
        },
        {
          name: 'megaMenuCallbackForm',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Formular für Rückruf',
          admin: {
            description: 'Formular mit mindestens einem Feld für die Telefonnummer (Feldname unten angeben).',
            condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowCallback),
          },
        },
        {
          name: 'megaMenuCallbackPhoneFieldName',
          type: 'text',
          label: 'Feldname Telefonnummer (Rückruf)',
          defaultValue: 'phone',
          admin: {
            description: 'Name des Formularfelds für die Telefonnummer (muss zum gewählten Formular passen).',
            condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowCallback),
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'megaMenuShowNewsletter',
              type: 'checkbox',
              label: 'Newsletter-Anmeldung anzeigen',
              defaultValue: false,
              admin: { width: '50%' },
            },
            {
              name: 'megaMenuNewsletterTitle',
              type: 'text',
              label: 'Titel Newsletter',
              defaultValue: 'Newsletter',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowNewsletter),
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'megaMenuNewsletterPlaceholder',
              type: 'text',
              label: 'Placeholder E-Mail',
              defaultValue: 'E-Mail-Adresse',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowNewsletter),
              },
            },
            {
              name: 'megaMenuNewsletterButtonText',
              type: 'text',
              label: 'Button-Text Newsletter',
              defaultValue: 'Anmelden',
              admin: {
                width: '50%',
                condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowNewsletter),
              },
            },
          ],
        },
        {
          name: 'megaMenuNewsletterForm',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Formular für Newsletter',
          admin: {
            description: 'Formular mit mindestens einem E-Mail-Feld (Feldname unten angeben).',
            condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowNewsletter),
          },
        },
        {
          name: 'megaMenuNewsletterEmailFieldName',
          type: 'text',
          label: 'Feldname E-Mail (Newsletter)',
          defaultValue: 'email',
          admin: {
            description: 'Name des Formularfelds für die E-Mail (muss zum gewählten Formular passen).',
            condition: (_, siblingData) => Boolean(siblingData?.megaMenuShowNewsletter),
          },
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Wird im Header und Footer angezeigt. Leer = Standard-Payload-Logo.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const useMega = (data as { useMegaMenu?: boolean })?.useMegaMenu
        const layout = (data as { megaMenuLayout?: { sidebarCols?: number; contentCols?: number; featuredCols?: number } })?.megaMenuLayout
        if (!useMega || !layout) return data
        const a = Number(layout.sidebarCols) || 0
        const b = Number(layout.contentCols) || 0
        const c = Number(layout.featuredCols) || 0
        const sum = a + b + c
        if (sum !== GRID_TOTAL) {
          throw new Error(
            `Mega-Menü Spaltenbreiten müssen zusammen ${GRID_TOTAL} ergeben (aktuell: ${a}+${b}+${c}=${sum}).`,
          )
        }
        return data
      },
    ],
    afterChange: [revalidateHeader],
  },
}
