import { RequiredDataFromCollectionSlug } from 'payload'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Kontaktformular',
  submitButtonLabel: 'Absenden',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  confirmationType: 'message',
  emails: [
    {
      emailFrom: '"Website" <noreply@example.com>',
      emailTo: '{{email}}',
      subject: 'Ihre Kontaktanfrage wurde eingegangen',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Vielen Dank für Ihre Nachricht. Wir melden uns so bald wie möglich bei Ihnen.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ],
  fields: [
    {
      name: 'name',
      blockName: 'name',
      blockType: 'text',
      label: 'Name',
      required: true,
      width: 100,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'E-Mail',
      required: true,
      width: 100,
    },
    {
      name: 'telefon',
      blockName: 'telefon',
      blockType: 'number',
      label: 'Telefon',
      required: false,
      width: 100,
    },
    {
      name: 'firma',
      blockName: 'firma',
      blockType: 'text',
      label: 'Firma',
      required: false,
      width: 100,
    },
    {
      name: 'anliegen',
      blockName: 'anliegen',
      blockType: 'select',
      label: 'Anliegen',
      required: true,
      width: 100,
      options: [
        { label: 'Beratung', value: 'beratung' },
        { label: 'Angebot', value: 'angebot' },
        { label: 'Support', value: 'support' },
        { label: 'Allgemeine Frage', value: 'allgemeine_frage' },
      ],
    },
    {
      name: 'nachricht',
      blockName: 'nachricht',
      blockType: 'textarea',
      label: 'Nachricht',
      required: true,
      width: 100,
    },
    {
      name: 'datenschutz',
      blockName: 'datenschutz',
      blockType: 'checkbox',
      label: 'Ich akzeptiere die Datenschutzerklärung',
      required: true,
      width: 100,
    },
  ],
}
