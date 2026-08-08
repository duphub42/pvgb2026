import { getPayload } from 'payload'
import config from '@payload-config'

async function run() {
  const payload = await getPayload({ config })

  const doc = await payload.create({
    collection: 'media',
    data: {
      alt: 'Philipp Bacher, Digital Consultant für Webdesign und Marketing mit persönlicher Beratung in Halle (optimiert, WebP)',
    },
    filePath:
      '/private/tmp/claude-501/-Users-horus-Desktop-pvgb2026-pvgb2026/9b9c5ee6-ac8a-4b48-9785-819eb5f56b18/scratchpad/philippbacher-13-optimized.webp',
  })

  console.log('Created media doc:', JSON.stringify(doc, null, 2))
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
