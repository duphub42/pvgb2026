/**
 * Muss als erstes importiert werden, damit .env / .env.local vor dem
 * Payload-Config-Import geladen sind (Payload liest PAYLOAD_SECRET beim Import).
 */
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirnameScript = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirnameScript, '../..')

dotenv.config({ path: path.join(projectRoot, '.env') })
dotenv.config({ path: path.join(projectRoot, '.env.local') })
dotenv.config({ path: path.join(projectRoot, 'env.local') })
