const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'payload.db');
const db = sqlite3(dbPath);

// Impressum RichText Content
const impressumRichText = {
  root: {
    type: 'root',
    children: [
      { type: 'heading', tag: 'h1', children: [{ type: 'text', text: 'Impressum' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Angaben gemäß § 5 DDG' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Dienstanbieter' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Philipp Bacher' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Händelstr. 3, D-06114 Halle/Saale' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Kontakt' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Vertreten durch' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Philipp Bacher' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Philipp Bacher, Händelstr. 3' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Umsatzsteuer-ID' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE337118461' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Verbraucherstreitbeilegung' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Haftung für Inhalte' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Haftung für Links' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Urheberrecht' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Stand: 11. April 2026' }] },
    ],
    direction: 'ltr',
  },
};

// Datenschutz RichText Content
const datenschutzRichText = {
  root: {
    type: 'root',
    children: [
      { type: 'heading', tag: 'h1', children: [{ type: 'text', text: 'Datenschutzerklärung' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Mit dieser Datenschutzerklärung informieren wir Sie darüber, welche personenbezogenen Daten bei der Nutzung dieser Website verarbeitet werden.' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '1. Verantwortlicher' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Philipp Bacher, Händelstr. 3, D-06114 Halle/Saale. Telefon: +49 3459 6393323 | E-Mail: mail@philippbacher.com' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '2. Server-Logfiles' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Beim Aufruf der Website werden technisch erforderliche Daten verarbeitet (z.B. IP-Adresse, Datum/Uhrzeit des Zugriffs, angeforderte URL). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '3. Kontaktaufnahme' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Wenn Sie uns kontaktieren, verarbeiten wir die übermittelten Daten zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder lit. f DSGVO.' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '4. Ihre Rechte' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Sie haben Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und Widerruf (Art. 7 Abs. 3 DSGVO).' }] },
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '5. Beschwerderecht' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren.' }] },
      { type: 'paragraph', children: [{ type: 'text', text: 'Stand: 11. April 2026' }] },
    ],
    direction: 'ltr',
  },
};

function generateUUID() {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Delete existing pages
console.log('Deleting existing legal pages...');
db.prepare("DELETE FROM site_pages_blocks_content_columns WHERE _parent_id IN (SELECT id FROM site_pages_blocks_content WHERE _parent_id IN (12, 13))").run();
db.prepare("DELETE FROM site_pages_blocks_content WHERE _parent_id IN (12, 13)").run();
db.prepare("DELETE FROM site_pages WHERE id IN (12, 13)").run();

// Insert Impressum page
console.log('Creating Impressum page...');
db.prepare(`
  INSERT INTO site_pages (id, slug, title, _status, hero_type, updated_at, created_at)
  VALUES (12, 'impressum', 'Impressum', 'published', 'none', datetime('now'), datetime('now'))
`).run();

const impressumBlockId = generateUUID();
db.prepare(`
  INSERT INTO site_pages_blocks_content (_order, _parent_id, _path, id, block_name)
  VALUES (0, 12, 'layout.0', ?, 'Impressum Content')
`).run(impressumBlockId);

db.prepare(`
  INSERT INTO site_pages_blocks_content_columns (_order, _parent_id, id, size, rich_text, enable_link)
  VALUES (0, ?, ?, 'full', ?, 0)
`).run(impressumBlockId, generateUUID(), JSON.stringify(impressumRichText));

// Insert Datenschutz page
console.log('Creating Datenschutz page...');
db.prepare(`
  INSERT INTO site_pages (id, slug, title, _status, hero_type, updated_at, created_at)
  VALUES (13, 'datenschutz', 'Datenschutz', 'published', 'none', datetime('now'), datetime('now'))
`).run();

const datenschutzBlockId = generateUUID();
db.prepare(`
  INSERT INTO site_pages_blocks_content (_order, _parent_id, _path, id, block_name)
  VALUES (0, 13, 'layout.0', ?, 'Datenschutz Content')
`).run(datenschutzBlockId);

db.prepare(`
  INSERT INTO site_pages_blocks_content_columns (_order, _parent_id, id, size, rich_text, enable_link)
  VALUES (0, ?, ?, 'full', ?, 0)
`).run(datenschutzBlockId, generateUUID(), JSON.stringify(datenschutzRichText));

console.log('Done! Legal pages created with content.');
db.close();
