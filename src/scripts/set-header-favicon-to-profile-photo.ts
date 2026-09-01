import fs from 'fs'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const FAVICON_SOURCE_PATH = process.argv[2]

async function main() {
  if (!FAVICON_SOURCE_PATH) {
    throw new Error('Usage: tsx set-header-favicon-to-profile-photo.ts <path-to-square-png>')
  }

  const payload = await getPayload({ config: configPromise })

  const buffer = fs.readFileSync(FAVICON_SOURCE_PATH)

  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      alt: 'Favicon: Philipp Bacher Profilfoto',
    },
    file: {
      data: buffer,
      mimetype: 'image/png',
      name: 'favicon-profile.png',
      size: buffer.length,
    },
  })

  payload.logger.info(`Created media doc id=${mediaDoc.id}`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      favicon: mediaDoc.id,
    },
  })

  payload.logger.info('Updated header global favicon field.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    process.exit()
  })
