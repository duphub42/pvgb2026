import type { Block } from 'payload'

import { blockStyleFields } from '../blockStyleFields'

export const Introduction: Block = {
  slug: 'introduction',
  interfaceName: 'IntroductionBlock',
  labels: {
    singular: 'Einleitung',
    plural: 'Einleitungen',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      required: true,
      defaultValue: 'Automatisierung, Marketing & Webdesign',
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Inhalt',
      required: true,
      defaultValue:
        'Ich begleite Unternehmen bei der Entwicklung klarer digitaler Strategien – von Positionierung und Marketing bis zur technischen Umsetzung moderner Weblösungen. Der Fokus liegt auf messbaren Ergebnissen: strukturierte Prozesse, performante Kampagnen und Websites, die nicht nur gut aussehen, sondern verkaufen.',
      admin: {
        description: 'Haupttext der Einleitung.',
      },
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline / Zusatz',
      defaultValue:
        'Persönlich. Effizient. Mit Blick auf langfristiges Wachstum.\nAls Freelancer in Halle (Saale) stehe ich für direkte Zusammenarbeit und transparente Umsetzung.',
      admin: {
        description: 'Optionaler Zusatztext unter dem Hauptinhalt (z. B. persönliches Statement).',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
      admin: {
        description: 'Optionales Bild neben dem Text (z. B. Porträt oder Illustration).',
      },
    },
    {
      name: 'imageDarkModeInvert',
      type: 'checkbox',
      label: 'Bild im Dark Mode invertieren',
      defaultValue: true,
      admin: {
        description:
          'Im Dark Mode wird das Bild standardmäßig invertiert. Deaktiviere diese Einstellung bei Personen- oder Produktbildern.',
      },
    },
  ],
}
