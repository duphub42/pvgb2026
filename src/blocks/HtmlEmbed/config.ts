import type { Block } from 'payload'

import { blockStyleFields } from '@/blocks/blockStyleFields'

/** Eingebetteter Roh-HTML/CSS-Block für Lexical (z. B. Diagramme, Custom-Markup). Nur für vertrauenswürdige Redakteure. */
export const HtmlEmbed: Block = {
  slug: 'htmlEmbed',
  interfaceName: 'HtmlEmbedBlock',
  labels: {
    singular: 'HTML / CSS',
    plural: 'HTML / CSS',
  },
  fields: [
    ...blockStyleFields,
    {
      name: 'html',
      type: 'textarea',
      label: 'HTML & CSS',
      required: true,
      admin: {
        rows: 20,
        description:
          'Vollständiges Markup inkl. optionaler <style>-Blöcke. Wird ungefiltert ausgegeben — nur vertrauenswürdige Inhalte einfügen.',
      },
    },
  ],
}
