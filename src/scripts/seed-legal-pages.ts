/**
 * Seed script für Impressum und Datenschutz Seiten
 * Nutzt die originalen Inhalte aus endpoints/seed/
 */

import './load-env-import'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  // Impressum Seite
  const impressumExists = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'impressum' } },
    depth: 0,
  })

  if (impressumExists.docs.length === 0) {
    console.log('Erstelle Impressum...')
    await payload.create({
      collection: 'site-pages',
      data: {
        slug: 'impressum',
        title: 'Impressum',
        _status: 'published',
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
                    children: [
                      {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', text: 'Impressum', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [{ type: 'text', text: 'Angaben gemäß § 5 DDG', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        children: [{ type: 'text', text: 'Dienstanbieter', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          { type: 'text', text: 'Philipp Bacher', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'Freierstrasse 47', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'CH-4450 Sissach', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'Schweiz', version: 1 },
                        ],
                        version: 1,
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        children: [{ type: 'text', text: 'Kontakt', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          { type: 'text', text: 'Telefon: +41 61 971 10 80', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'E-Mail: hello@philippbacher.ch', version: 1 },
                        ],
                        version: 1,
                      },
                    ],
                    version: 1,
                  },
                },
              },
            ],
          },
        ],
        meta: {
          title: 'Impressum | Philipp Bacher',
          description: 'Impressum und rechtliche Angaben',
        },
      } as RequiredDataFromCollectionSlug<'site-pages'>,
    })
    console.log('✓ Impressum erstellt')
  } else {
    console.log('ℹ Impressum existiert bereits')
  }

  // Datenschutz Seite
  const datenschutzExists = await payload.find({
    collection: 'site-pages',
    where: { slug: { equals: 'datenschutz' } },
    depth: 0,
  })

  if (datenschutzExists.docs.length === 0) {
    console.log('Erstelle Datenschutz...')
    await payload.create({
      collection: 'site-pages',
      data: {
        slug: 'datenschutz',
        title: 'Datenschutz',
        _status: 'published',
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
                    children: [
                      {
                        type: 'heading',
                        tag: 'h1',
                        children: [{ type: 'text', text: 'Datenschutzerklärung', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten bei der Nutzung dieser Website verarbeitet werden.',
                            version: 1,
                          },
                        ],
                        version: 1,
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        children: [{ type: 'text', text: '1. Verantwortlicher', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          { type: 'text', text: 'Philipp Bacher', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'Freierstrasse 47', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'CH-4450 Sissach', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'Schweiz', version: 1 },
                          { type: 'linebreak', version: 1 },
                          { type: 'text', text: 'E-Mail: hello@philippbacher.ch', version: 1 },
                        ],
                        version: 1,
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        children: [{ type: 'text', text: '2. Hosting', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Diese Website wird bei einem professionellen Hosting-Anbieter betrieben. Der Anbieter erhebt in sog. Logfiles folgende Daten, die Ihr Browser übermittelt:',
                            version: 1,
                          },
                        ],
                        version: 1,
                      },
                      {
                        type: 'list',
                        listType: 'bullet',
                        children: [
                          {
                            type: 'listitem',
                            children: [{ type: 'text', text: 'IP-Adresse', version: 1 }],
                            version: 1,
                          },
                          {
                            type: 'listitem',
                            children: [
                              { type: 'text', text: 'Datum und Uhrzeit der Anfrage', version: 1 },
                            ],
                            version: 1,
                          },
                          {
                            type: 'listitem',
                            children: [{ type: 'text', text: 'Zeitzone', version: 1 }],
                            version: 1,
                          },
                          {
                            type: 'listitem',
                            children: [
                              { type: 'text', text: 'Browsertyp und -version', version: 1 },
                            ],
                            version: 1,
                          },
                          {
                            type: 'listitem',
                            children: [{ type: 'text', text: 'Betriebssystem', version: 1 }],
                            version: 1,
                          },
                          {
                            type: 'listitem',
                            children: [{ type: 'text', text: 'Referrer URL', version: 1 }],
                            version: 1,
                          },
                        ],
                        version: 1,
                      },
                      {
                        type: 'heading',
                        tag: 'h2',
                        children: [{ type: 'text', text: '3. Ihre Rechte', version: 1 }],
                        version: 1,
                      },
                      {
                        type: 'paragraph',
                        children: [
                          {
                            type: 'text',
                            text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Bei Fragen zum Datenschutz wenden Sie sich bitte an die oben genannte Kontaktadresse.',
                            version: 1,
                          },
                        ],
                        version: 1,
                      },
                    ],
                    version: 1,
                  },
                },
              },
            ],
          },
        ],
        meta: {
          title: 'Datenschutz | Philipp Bacher',
          description: 'Datenschutzerklärung und Informationen zur Datenverarbeitung',
        },
      } as RequiredDataFromCollectionSlug<'site-pages'>,
    })
    console.log('✓ Datenschutz erstellt')
  } else {
    console.log('ℹ Datenschutz existiert bereits')
  }

  console.log('\n✅ Fertig!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Fehler:', err)
  process.exit(1)
})
