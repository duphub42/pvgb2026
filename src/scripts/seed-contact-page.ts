/**
 * Seed/Restore nur die Kontaktseite
 * Nutzung: npx tsx src/scripts/seed-contact-page.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { contactForm as contactFormData } from '@/endpoints/seed/contact-form'
import { contact as contactPageData } from '@/endpoints/seed/contact-page'

async function seedContactPage() {
  const payload = await getPayload({ config })

  console.log('🔍 Prüfe Kontaktformular...')

  // Finde oder erstelle Kontaktformular
  let contactForm = await payload
    .find({
      collection: 'forms',
      where: { title: { equals: 'Contact Form' } },
      limit: 1,
    })
    .then((r) => r.docs[0])

  if (!contactForm) {
    console.log('📋 Erstelle Kontaktformular...')
    contactForm = await payload.create({
      collection: 'forms',
      data: contactFormData,
    })
    console.log('✅ Kontaktformular erstellt')
  } else {
    console.log('⏭️  Kontaktformular existiert bereits')
  }

  console.log('🔍 Prüfe Kontaktseite...')

  // Lösche alte englische Version falls vorhanden
  const oldContactPage = await payload
    .find({
      collection: 'site-pages',
      where: { slug: { equals: 'contact' } },
      limit: 1,
    })
    .then((r) => r.docs[0])

  if (oldContactPage) {
    console.log('🗑️  Lösche alte /contact Seite...')
    await payload.delete({
      collection: 'site-pages',
      id: oldContactPage.id,
    })
    console.log('✅ Alte Seite gelöscht')
  }

  // Prüfe ob Kontaktseite existiert
  const existingPage = await payload
    .find({
      collection: 'site-pages',
      where: { slug: { equals: 'kontakt' } },
      limit: 1,
    })
    .then((r) => r.docs[0])

  const pageData = contactPageData({ contactForm })
  pageData.slug = 'kontakt' // Auf Deutsch ändern

  if (existingPage) {
    console.log('📝 Aktualisiere bestehende Kontaktseite...')
    await payload.update({
      collection: 'site-pages',
      id: existingPage.id,
      data: pageData,
    })
    console.log('✅ Kontaktseite aktualisiert')
  } else {
    console.log('📄 Erstelle Kontaktseite...')
    await payload.create({
      collection: 'site-pages',
      data: pageData,
    })
    console.log('✅ Kontaktseite erstellt')
  }

  console.log('\n🎉 Fertig! Die Kontaktseite ist jetzt befüllt.')
  console.log('   URL: http://localhost:3000/kontakt')
  process.exit(0)
}

seedContactPage().catch((err) => {
  console.error('❌ Fehler:', err)
  process.exit(1)
})
