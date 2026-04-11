import '../src/scripts/load-env-import.ts'
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  console.log('BEFORE_GET_PAYLOAD')
  const payload = await getPayload({ config })
  console.log('AFTER_GET_PAYLOAD')
  console.log('HAS_FIND', typeof payload.find)
}

main().catch((err) => { console.error('ERR', err); process.exit(1) })
