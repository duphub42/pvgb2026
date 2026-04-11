import "../src/scripts/load-env-import.ts"
import { getPayload } from "payload"
import config from "@payload-config"

async function main() {
  console.log("START")
  const payload = await getPayload({ config })
  console.log("GOT_PAYLOAD")
  const pages = await payload.find({ collection: "site-pages", limit: 20, depth: 2, overrideAccess: true, where: { slug: { in: ["leistungen", "webdesign", "marketing", "wartung"] } } })
  console.log("PAGES_COUNT=", pages.docs.length)
  for (const d of pages.docs) { console.log(JSON.stringify({ id: d.id, slug: d.slug, title: d.title, status: d._status, parent: d.parent }, null, 2)) }
}
main().catch((err) => { console.error(err); process.exit(1) })
