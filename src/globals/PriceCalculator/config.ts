import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { revalidatePriceCalculatorData } from '../../utilities/revalidatePriceCalculatorData'

const afterChange: GlobalAfterChangeHook = ({ req: { context } }) => {
  if (!context?.disableRevalidate && !context?.skipRevalidate) {
    revalidatePriceCalculatorData()
  }
}

export const PriceCalculatorGlobal: GlobalConfig = {
  slug: 'price-calculator',
  label: 'Preisrechner (Texte & Sätze)',
  admin: {
    group: 'Preisrechner',
    description:
      'Standard-Texte für den Preisrechner-Block und die Sektion Stundensatz / Tagessatz. Kategorien und Leistungen pflegen Sie unter „Preisrechner“ in den Collections.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Preisrechner',
          fields: [
            {
              name: 'sectionLabel',
              type: 'text',
              label: 'Kleine Überschrift',
              defaultValue: 'Preisrechner',
            },
            {
              name: 'heading',
              type: 'text',
              label: 'Hauptüberschrift',
              defaultValue: 'Was planen Sie?',
            },
            {
              name: 'sub',
              type: 'textarea',
              label: 'Einleitung',
              defaultValue:
                'Kategorie wählen, Leistungen anklicken – Richtwert erscheint sofort. Mehrere Kategorien kombinierbar.',
            },
            {
              name: 'offerButtonLabel',
              type: 'text',
              label: 'Button „Angebot“',
              defaultValue: 'Angebot anfragen ↗',
            },
            {
              name: 'offerLink',
              type: 'text',
              label: 'Link Angebot-Button',
              defaultValue: '/kontakt',
              admin: {
                description: 'z. B. /kontakt oder mailto:…',
              },
            },
            {
              name: 'emptyBreakdownMessage',
              type: 'textarea',
              label: 'Hinweis ohne Auswahl',
              defaultValue: 'Wählen Sie oben eine Kategorie und Leistungen aus.',
            },
          ],
        },
        {
          label: 'Stundensatz & Tagessatz',
          fields: [
            {
              name: 'ratesSectionLabel',
              type: 'text',
              label: 'Kleine Überschrift',
              defaultValue: 'Stundensatz & Tagessatz',
            },
            {
              name: 'ratesHeading',
              type: 'text',
              label: 'Überschrift',
              defaultValue: 'Für flexible & laufende Zusammenarbeit',
            },
            {
              name: 'hourlyRate',
              type: 'number',
              label: 'Stundensatz (€ netto)',
              defaultValue: 120,
              required: true,
            },
            {
              name: 'dayRate',
              type: 'number',
              label: 'Tagessatz 8h (€ netto)',
              defaultValue: 890,
              required: true,
            },
            {
              name: 'weekRate',
              type: 'number',
              label: 'Wochensatz (€ netto)',
              defaultValue: 3200,
              required: true,
            },
            {
              name: 'ratesNote',
              type: 'textarea',
              label: 'Erläuterungstext',
              defaultValue:
                'Stundensätze gelten für Beratung, Ad-hoc-Aufgaben und Projekte ohne definierten Scope. Bei Projekten mit klarem Umfang arbeite ich grundsätzlich auf Festpreisbasis – transparenter für Sie, planbarer für beide Seiten.',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [afterChange],
  },
}
