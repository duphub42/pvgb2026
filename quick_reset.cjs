const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./payload.db');

const password = 'admin123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Generated salt:', salt);
console.log('Generated hash:', hash.substring(0, 40) + '...');

db.serialize(() => {
  db.run(
    'UPDATE users SET hash = ?, salt = ?, login_attempts = 0, lock_until = NULL WHERE email = ?',
    [hash, salt, 'mail@philippbacher.com'],
    function(err) {
      if (err) {
        console.error('Update error:', err);
        process.exit(1);
      }
      console.log('Rows updated:', this.changes);
    }
  );
  
  db.get(
    'SELECT email, hash, salt FROM users WHERE email = ?',
    ['mail@philippbacher.com'],
    (err, row) => {
      if (err) {
        console.error('Select error:', err);
      } else if (row) {
        console.log('Stored hash:', row.hash ? row.hash.substring(0, 40) + '...' : 'NULL');
        console.log('Stored salt:', row.salt);
        const verify = bcrypt.compareSync(password, row.hash);
        console.log('Local verify:', verify);
      }
      db.close();
    }
  );
});
