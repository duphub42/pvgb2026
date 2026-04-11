import "../src/scripts/load-env-import.ts"
console.log("START")
import { getPayload } from "payload"
console.log("AFTER_PAYLOAD_IMPORT")
import config from "@payload-config"
console.log("AFTER_CONFIG_IMPORT")
async function main() {
  console.log("BEFORE_GETPAYLOAD")
  const payload = await getPayload({ config })
  console.log("AFTER_GETPAYLOAD")
  const pages = await payload.find({ collection: "site-pages", limit: 1, depth: 0, overrideAccess: true })
  console.log("PAGES_LEN=", pages.docs.length)
}
main().catch((err) => { console.error(err); process.exit(1) })
