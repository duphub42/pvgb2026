import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const payload = await getPayload({ config })

try {
  // Finde den existierenden Benutzer
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: 'mail@philippbacher.com' } },
    overrideAccess: true,
  })

  if (users.docs.length > 0) {
    const user = users.docs[0]
    console.log('Benutzer gefunden:', user.email)

    // Setze ein neues Passwort
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: 'admin123', // Temporäres Passwort
      },
      overrideAccess: true,
    })

    console.log('Passwort wurde zurückgesetzt!')
    console.log('Email: mail@philippbacher.com')
    console.log('Neues Passwort: admin123')
    console.log(
      'Bitte unter http://localhost:3000/admin/login einloggen und sofort das Passwort ändern!',
    )
  } else {
    console.log('Kein Benutzer mit dieser Email gefunden')

    // Erstelle neuen Admin-Benutzer
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email: 'mail@philippbacher.com',
        name: 'Philipp',
        password: 'admin123',
      },
      overrideAccess: true,
    })

    console.log('Neuer Admin-Benutzer erstellt!')
    console.log('Email: mail@philippbacher.com')
    console.log('Passwort: admin123')
  }
} catch (error) {
  console.error('Fehler:', error)
}

process.exit(0)
