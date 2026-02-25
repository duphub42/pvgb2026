import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

export const ContactSection1: Block = {
  slug: 'contactSection1',
  interfaceName: 'ContactSection1Block',
  labels: {
    singular: 'Contact: Get in Touch',
    plural: 'Contact: Get in Touch',
  },
  fields: [
    ...blockStyleFields,
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Überschrift',
          defaultValue: 'Get in Touch',
          admin: { width: '50%' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung (unter Überschrift)',
          defaultValue:
            "Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'formTitle',
      type: 'text',
      label: 'Formular-Karte Titel',
      defaultValue: 'Send us a Message',
    },
    {
      name: 'formFirstNameLabel',
      type: 'text',
      label: 'Form: Vorname Label',
      defaultValue: 'First name',
      admin: { description: 'Label für Vorname' },
    },
    {
      name: 'formFirstNamePlaceholder',
      type: 'text',
      label: 'Form: Vorname Placeholder',
      defaultValue: 'John',
    },
    {
      name: 'formLastNameLabel',
      type: 'text',
      label: 'Form: Nachname Label',
      defaultValue: 'Last name',
    },
    {
      name: 'formLastNamePlaceholder',
      type: 'text',
      label: 'Form: Nachname Placeholder',
      defaultValue: 'Doe',
    },
    {
      name: 'formEmailLabel',
      type: 'text',
      label: 'Form: E-Mail Label',
      defaultValue: 'Email',
    },
    {
      name: 'formEmailPlaceholder',
      type: 'text',
      label: 'Form: E-Mail Placeholder',
      defaultValue: 'john@example.com',
    },
    {
      name: 'formSubjectLabel',
      type: 'text',
      label: 'Form: Betreff Label',
      defaultValue: 'Subject',
    },
    {
      name: 'formSubjectPlaceholder',
      type: 'text',
      label: 'Form: Betreff Placeholder',
      defaultValue: 'How can we help?',
    },
    {
      name: 'formMessageLabel',
      type: 'text',
      label: 'Form: Nachricht Label',
      defaultValue: 'Message',
    },
    {
      name: 'formMessagePlaceholder',
      type: 'text',
      label: 'Form: Nachricht Placeholder',
      defaultValue: 'Tell us more about your project...',
    },
    {
      name: 'formButtonText',
      type: 'text',
      label: 'Form: Button-Text',
      defaultValue: 'Send Message',
    },
    {
      name: 'formActionUrl',
      type: 'text',
      label: 'Form: Action-URL (optional)',
      admin: {
        description: 'Leer lassen = kein Submit. Sonst z.B. /api/contact oder URL eines Form-Handlers.',
      },
    },
    {
      name: 'contactCardTitle',
      type: 'text',
      label: 'Karte „Kontakt“: Titel',
      defaultValue: 'Contact Information',
    },
    {
      name: 'contactEmailLabel',
      type: 'text',
      label: 'Kontakt: E-Mail Label',
      defaultValue: 'Email',
    },
    {
      name: 'contactEmailValue',
      type: 'text',
      label: 'Kontakt: E-Mail Wert',
      defaultValue: 'hello@company.com',
    },
    {
      name: 'contactPhoneLabel',
      type: 'text',
      label: 'Kontakt: Telefon Label',
      defaultValue: 'Phone',
    },
    {
      name: 'contactPhoneValue',
      type: 'text',
      label: 'Kontakt: Telefon Wert',
      defaultValue: '+1 (555) 123-4567',
    },
    {
      name: 'contactOfficeLabel',
      type: 'text',
      label: 'Kontakt: Büro Label',
      defaultValue: 'Office',
    },
    {
      name: 'contactOfficeValue',
      type: 'textarea',
      label: 'Kontakt: Büro Adresse',
      defaultValue: '123 Business Ave, Suite 100\nSan Francisco, CA 94105',
    },
    {
      name: 'hoursCardTitle',
      type: 'text',
      label: 'Karte „Öffnungszeiten“: Titel',
      defaultValue: 'Business Hours',
    },
    {
      name: 'hoursRows',
      type: 'array',
      label: 'Öffnungszeiten Zeilen',
      minRows: 1,
      maxRows: 10,
      fields: [
        { name: 'label', type: 'text', label: 'Zeile (z.B. Monday - Friday)', required: true },
        { name: 'value', type: 'text', label: 'Wert (z.B. 9:00 AM - 6:00 PM)', required: true },
      ],
      defaultValue: [
        { label: 'Monday - Friday', value: '9:00 AM - 6:00 PM' },
        { label: 'Saturday', value: '10:00 AM - 4:00 PM' },
        { label: 'Sunday', value: 'Closed' },
      ],
    },
    {
      name: 'altCardTitle',
      type: 'text',
      label: 'Karte „Alternative“: Titel',
      defaultValue: 'Prefer to Call?',
    },
    {
      name: 'altCardDescription',
      type: 'textarea',
      label: 'Karte „Alternative“: Beschreibung',
      defaultValue: 'Speak directly with our team for immediate assistance.',
    },
    {
      name: 'altCardButtonText',
      type: 'text',
      label: 'Karte „Alternative“: Button-Text',
      defaultValue: 'Schedule a Call',
    },
    {
      name: 'altCardButtonUrl',
      type: 'text',
      label: 'Karte „Alternative“: Button-URL',
      defaultValue: '#',
    },
  ],
}
