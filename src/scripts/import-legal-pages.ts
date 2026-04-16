import { getPayload } from 'payload'
import config from '@payload-config'

// Einfacher Content-Block für Impressum
const impressumData = {
  slug: 'impressum',
  _status: 'published' as const,
  title: 'Impressum',
  hero: {
    type: 'none' as const,
  },
  layout: [
    {
      blockName: 'Impressum Content',
      blockType: 'content' as const,
      columns: [
        {
          size: 'full' as const,
          enableLink: false,
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h1',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Impressum',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Angaben gemäß § 5 DDG',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Dienstanbieter',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Philipp Bacher',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Händelstr. 3, D-06114 Halle/Saale',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Kontakt',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  direction: 'ltr' as const,
                  format: '' as const,
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  ],
}

async function importLegalPages() {
  const payload = await getPayload({ config })

  // Delete existing pages first
  try {
    await payload.delete({ collection: 'site-pages', id: 12 })
    console.log('Old Impressum deleted')
  } catch {
    /* ignore */
  }
  try {
    await payload.delete({ collection: 'site-pages', id: 13 })
    console.log('Old Datenschutz deleted')
  } catch {
    /* ignore */
  }

  // Create Impressum
  try {
    await payload.create({
      collection: 'site-pages',
      data: {
        slug: 'impressum',
        _status: 'published',
        title: 'Impressum',
        hero: { type: 'none' },
        layout: [
          {
            blockName: 'Impressum Content',
            blockType: 'content',
            columns: [
              {
                size: 'full',
                enableLink: false,
                richText: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'heading',
                        tag: 'h1',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Impressum', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Angaben gemäß § 5 DDG', version: 1 }],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Dienstanbieter', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Philipp Bacher', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          { type: 'text', text: 'Händelstr. 3, D-06114 Halle/Saale', version: 1 },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Kontakt', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Vertreten durch', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Philipp Bacher', version: 1 }],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          { type: 'text', text: 'Philipp Bacher, Händelstr. 3', version: 1 },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Umsatzsteuer-ID', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE337118461',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          { type: 'text', text: 'Verbraucherstreitbeilegung', version: 1 },
                        ],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Haftung für Inhalte', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Haftung für Links', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Urheberrecht', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Stand: 11. April 2026', version: 1 }],
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
          },
        ],
      },
    })
    console.log('Impressum created')
  } catch (err) {
    console.error('Fehler bei Impressum:', err)
  }

  // Create Datenschutz
  try {
    await payload.create({
      collection: 'site-pages',
      data: {
        slug: 'datenschutz',
        _status: 'published',
        title: 'Datenschutz',
        hero: { type: 'none' },
        layout: [
          {
            blockName: 'Datenschutz Content',
            blockType: 'content',
            columns: [
              {
                size: 'full',
                enableLink: false,
                richText: {
                  root: {
                    type: 'root',
                    children: [
                      {
                        type: 'heading',
                        tag: 'h1',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Datenschutzerklärung', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten bei der Nutzung dieser Website verarbeitet werden.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: '1. Verantwortlicher', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Philipp Bacher, Händelstr. 3, D-06114 Halle/Saale. Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: '2. Server-Logfiles', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet (z.B. IP-Adresse, Datum/Uhrzeit des Zugriffs, angeforderte URL). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: '3. Kontaktaufnahme', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Wenn Sie uns kontaktieren, verarbeiten wir die übermittelten Daten zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder lit. f DSGVO.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: '4. Ihre Rechte', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Sie haben Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und Widerruf (Art. 7 Abs. 3 DSGVO).',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: '5. Beschwerderecht', version: 1 }],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            text: 'Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren.',
                            version: 1,
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [{ type: 'text', text: 'Stand: 11. April 2026', version: 1 }],
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
          },
        ],
      },
    })
    console.log('Datenschutz created')
  } catch (err) {
    console.error('Fehler bei Datenschutz:', err)
  }

  process.exit(0)
}

importLegalPages()
