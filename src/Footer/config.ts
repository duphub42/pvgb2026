import type { GlobalConfig } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

const SOCIAL_PLATFORMS: { label: string; value: string }[] = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Twitter / X', value: 'twitter' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Footer-Inhalt: Logo, Newsletter-CTA, Navigationsspalten, Social-Media, Rechtliches und Design-Optionen. Spalten und Links sind per Drag & Drop sortierbar.',
    group: 'Globals',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Logo',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'footerLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Footer-Logo',
          admin: {
            description: 'Eigenes Logo im Footer (leer = Logo aus Header übernimmt die Anzeige, falls vorhanden).',
          },
        },
        {
          name: 'footerLogoAltText',
          type: 'text',
          label: 'Alt-Text (Logo)',
          admin: { description: 'Accessibility-Text für das Logo.' },
        },
        {
          name: 'logoOnDarkBackground',
          type: 'checkbox',
          label: 'Logo auf dunklem Hintergrund',
          defaultValue: false,
          admin: {
            description:
              'Aktivieren, wenn der Footer einen dunklen Hintergrund hat (Logo wird dann hell dargestellt). Bei hellem Hintergrund deaktiviert lassen.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Newsletter / Call-to-Action',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'newsletterTitle',
          type: 'text',
          label: 'Titel',
          admin: { description: 'z. B. „Newsletter abonnieren“.' },
        },
        {
          name: 'newsletterDescription',
          type: 'richText',
          label: 'Beschreibung',
          editor: defaultLexical,
          admin: { description: 'Kurzer Text über den Newsletter.' },
        },
        {
          name: 'newsletterPlaceholder',
          type: 'text',
          label: 'Placeholder (E-Mail-Feld)',
          defaultValue: 'E-Mail-Adresse',
        },
        {
          name: 'newsletterButtonText',
          type: 'text',
          label: 'Button-Text',
          defaultValue: 'Anmelden',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Navigationsspalten',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: 'Spalten',
          admin: {
            description: 'Reihenfolge per Drag & Drop ändern. Pro Spalte: Titel und Links.',
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/FooterColumnRowLabel#FooterColumnRowLabel',
            },
          },
          fields: [
            {
              name: 'columnTitle',
              type: 'text',
              label: 'Spaltentitel',
              required: true,
              admin: { description: 'z. B. „Produkt“, „Unternehmen“.' },
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              admin: {
                description: 'Links in dieser Spalte. Reihenfolge per Drag & Drop.',
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/FooterLinkRowLabel#FooterLinkRowLabel',
                },
              },
              fields: [
                {
                  name: 'linkText',
                  type: 'text',
                  label: 'Link-Text',
                  required: true,
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  label: 'URL',
                  required: true,
                  admin: { description: 'z. B. /datenschutz oder https://…' },
                },
                {
                  name: 'isExternal',
                  type: 'checkbox',
                  label: 'Externer Link',
                  defaultValue: false,
                  admin: { description: 'Öffnet in neuem Tab (target="_blank").' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Social Media',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social-Media-Links',
          admin: {
            description: 'Reihenfolge per Drag & Drop. Optional eigenes Icon pro Eintrag.',
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/SocialLinkRowLabel#SocialLinkRowLabel',
            },
          },
          fields: [
            {
              name: 'platform',
              type: 'select',
              label: 'Plattform',
              required: true,
              options: SOCIAL_PLATFORMS,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              required: true,
              admin: { description: 'Profil-URL (z. B. https://linkedin.com/company/…).' },
            },
            {
              name: 'iconUpload',
              type: 'upload',
              relationTo: 'media',
              label: 'Eigenes Icon (optional)',
              admin: { description: 'Leer = Standard-Icon der Plattform.' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Rechtliches / Unterer Bereich',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright-Text',
          admin: { description: 'z. B. „© 2026 Firmenname. Alle Rechte vorbehalten.“' },
        },
        {
          name: 'privacyLink',
          type: 'text',
          label: 'Link Datenschutz',
          admin: { description: 'URL zur Datenschutzseite (z. B. /datenschutz).' },
        },
        {
          name: 'termsLink',
          type: 'text',
          label: 'Link Impressum / AGB',
          admin: { description: 'URL zu Impressum oder AGB.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Design-Optionen',
      admin: {
        initCollapsed: true,
        description: 'Farben als Hex (z. B. #1a1a1a) oder rgb(r,g,b). Leer = Theme-Standard.',
      },
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Hintergrundfarbe',
        },
        {
          name: 'textColor',
          type: 'text',
          label: 'Textfarbe',
        },
        {
          name: 'linkHoverColor',
          type: 'text',
          label: 'Link-Hover-Farbe',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Legacy: Einfache Nav-Items',
      admin: { initCollapsed: true, description: 'Falls noch genutzt; ansonsten Spalten oben verwenden.' },
      fields: [
        {
          name: 'navItems',
          type: 'array',
          label: 'Nav-Items (Legacy)',
          maxRows: 6,
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
