import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Check existing
    const existing = await payload.find({
      collection: 'site-pages',
      where: { slug: { in: ['impressum', 'datenschutz'] } },
    })

    // Delete existing
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'site-pages', id: doc.id })
    }

    // Create Impressum
    const impressum = await payload.create({
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
                richText: {
                  root: {
                    type: 'root',
                    version: 1,
                    direction: null,
                    format: '',
                    indent: 0,
                    children: [
                      {
                        type: 'heading',
                        tag: 'h1',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Impressum' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Angaben gemäß § 5 DDG' }],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Dienstanbieter' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Philipp Bacher' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          { type: 'text', version: 1, text: 'Händelstr. 3, D-06114 Halle/Saale' },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Kontakt' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Vertreten durch' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Philipp Bacher' }],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          { type: 'text', version: 1, text: 'Philipp Bacher, Händelstr. 3' },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Umsatzsteuer-ID' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE337118461',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [
                          { type: 'text', version: 1, text: 'Verbraucherstreitbeilegung' },
                        ],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Haftung für Inhalte' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Haftung für Links' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Urheberrecht' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Stand: 11. April 2026' }],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    } as any)

    // Create Datenschutz
    const datenschutz = await payload.create({
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
                richText: {
                  root: {
                    type: 'root',
                    version: 1,
                    direction: null,
                    format: '',
                    indent: 0,
                    children: [
                      {
                        type: 'heading',
                        tag: 'h1',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Datenschutzerklärung' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten bei der Nutzung dieser Website verarbeitet werden.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: '1. Verantwortlicher' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Philipp Bacher, Händelstr. 3, D-06114 Halle/Saale. Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: '2. Server-Logfiles' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet (z.B. IP-Adresse, Datum/Uhrzeit des Zugriffs, angeforderte URL). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: '3. Kontaktaufnahme' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Wenn Sie uns kontaktieren, verarbeiten wir die übermittelten Daten zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder lit. f DSGVO.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: '4. Ihre Rechte' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Sie haben Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und Widerruf (Art. 7 Abs. 3 DSGVO).',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: '5. Beschwerderecht' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren.',
                          },
                        ],
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: '6. Änderungen' }],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [
                          {
                            type: 'text',
                            version: 1,
                            text: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen.',
                          },
                        ],
                      },
                      {
                        type: 'paragraph',
                        version: 1,
                        children: [{ type: 'text', version: 1, text: 'Stand: 11. April 2026' }],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    } as any)

    return NextResponse.json({
      success: true,
      message: `Created Impressum (id: ${impressum.id}) and Datenschutz (id: ${datenschutz.id})`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
