const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const sqlite3 = require('sqlite3').verbose()

// Einfacher direkter SQLite-Zugriff
const dbPath = './payload.db'
const db = new sqlite3.Database(dbPath)

async function resetPassword() {
  return new Promise((resolve, reject) => {
    // Generiere einen neuen Hash für "admin123"
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('admin123', salt)
    
    // Update den Benutzer
    db.run(
      'UPDATE users SET hash = ?, salt = ? WHERE email = ?',
      [hash, salt, 'mail@philippbacher.com'],
      function(err) {
        if (err) {
          console.error('Fehler beim Update:', err)
          reject(err)
        } else {
          console.log('Passwort erfolgreich zurückgesetzt!')
          console.log('Email: mail@philippbacher.com')
          console.log('Neues Passwort: admin123')
          console.log('Bitte unter http://localhost:3000/admin/login einloggen!')
          resolve(this.changes)
        }
      }
    )
  })
}

resetPassword()
  .then(() => {
    db.close()
    process.exit(0)
  })
  .catch((err) => {
    console.error('Script fehlgeschlagen:', err)
    db.close()
    process.exit(1)
  })
