import { getPayload } from "payload"
async function main(){
  const config = (await import("./src/payload.config.ts")).default
  const p = await getPayload({config})
  console.log("got payload")
  const slugs = ["leistungen","webdesign","marketing","wartung"]
  for (const slug of slugs) {
    const pages = await p.find({collection:"site-pages",limit:5,depth:2,where:{slug:{equals:slug}},draft:false})
    console.log("slug", slug, "count", pages.docs.length)
    for (const d of pages.docs) {
      console.log(JSON.stringify({id:d.id,title:d.title,slug:d.slug,status:d._status,parent:d.parent,layoutLength:Array.isArray(d.layout)?d.layout.length:null,heroType:d.hero?.type}, null, 2))
    }
  }
}
main().catch(err=>{ console.error(err); process.exit(1); });
