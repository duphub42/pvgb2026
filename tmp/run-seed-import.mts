console.log('START_WRAP')
import '../src/scripts/load-env-import.ts'
console.log('LOADED_ENV')
import('../src/scripts/seed-service-pages.ts').then(() => console.log('MODULE_DONE')).catch((err) => { console.error('MODULE_ERR', err); process.exit(1) })
