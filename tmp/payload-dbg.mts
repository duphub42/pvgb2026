import "../src/scripts/load-env-import.ts"
import { getPayload } from "payload"
import config from "@payload-config"

console.log("DEBUG SCRIPT START")

async function main() {
  console.log("DEBUG PAYLOAD INIT")
  const payload = await getPayload({ config })
  console.log("DEBUG PAYLOAD READY")
  for (const slug of ["leistungen", "webdesign", "marketing", "wartung"]) {
    const results = await payload.find({
      collection: "site-pages",
      limit: 10,
      depth: 2,
      overrideAccess: true,
      where: { slug: { equals: slug } },
    })
    console.log("slug=", slug, "count=", results.docs.length)
    for (const d of results.docs) {
      console.log(JSON.stringify({ id: d.id, title: d.title, slug: d.slug, status: d._status, parent: d.parent }, null, 2))
    }
  }
}
main().catch((err) => { console.error(err); process.exit(1) })
