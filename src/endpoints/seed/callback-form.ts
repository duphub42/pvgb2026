import { RequiredDataFromCollectionSlug } from 'payload'

export const callbackForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Rückruf-Anfrage',
  submitButtonLabel: 'Anfragen',
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
              text: 'Vielen Dank! Ihre Rückruf-Anfrage wurde erfolgreich übermittelt.',
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
      name: 'telefon',
      blockName: 'telefon',
      blockType: 'text',
      label: 'Telefonnummer',
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
