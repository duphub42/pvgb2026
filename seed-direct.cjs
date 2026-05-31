const path = require('path');
process.chdir('/Users/horus/Desktop/pvgb2026/pvgb2026');
const { neon } = require('./node_modules/@neondatabase/serverless');
const fs = require('fs');
const envContent = fs.readFileSync('./env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(l => { const [k,...v] = l.split('='); if(k&&v.length) env[k.trim()]=v.join('=').trim(); });
const sql = neon(env.DATABASE_URL || env.POSTGRES_URL);
async function run() {
  console.log('Clearing...');
  await sql`DELETE FROM site_pages_blocks_introduction WHERE _parent_id = 146`;
  const sgIds = (await sql`SELECT id FROM services_grid WHERE _parent_id = 146`).map(r=>r.id);
  for (const id of sgIds) {
    const catIds = (await sql`SELECT id FROM services_grid_categories WHERE _parent_id = ${id}`).map(r=>r.id);
    for (const c of catIds) await sql`DELETE FROM services_grid_categories_services WHERE _parent_id = ${c}`;
    await sql`DELETE FROM services_grid_categories WHERE _parent_id = ${id}`;
    await sql`DELETE FROM services_grid_intro_icon_list WHERE _parent_id = ${id}`;
  }
  await sql`DELETE FROM services_grid WHERE _parent_id = 146`;
  console.log('Cleared old blocks');
  const [pt] = await sql`INSERT INTO site_pages_blocks_portfolio_teaser (_order,_parent_id,_path,id,eyebrow,heading,intro,variant,block_container,block_background,block_spacing_padding,block_spacing_padding_top,block_spacing_margin_bottom,block_content_spacing,block_animation,block_border_enabled,block_overlay_enabled) VALUES (1,146,'layout',gen_random_uuid()::text,'Meine Arbeitsbereiche','Drei Disziplinen, ein Qualitätsanspruch','Webdesign, Marketing und Branding greifen in meiner Arbeit direkt ineinander.','cards','default','none','default','default','default','default','default',false,false) RETURNING id`;
  const ptId = pt.id;
  console.log('Block:', ptId);
  const areas=[
    {o:1,d:'webdesign',t:'Webdesign & Entwicklung',desc:'UX-orientierte Websites und digitale Produkte – von der Informationsarchitektur über Interface-Design bis zur performanten, SEO-optimierten Umsetzung.',h:'/portfolio-webdesign',cta:'Webdesign-Cases ansehen',tags:['UX & Interface','Responsive Design','Performance','Relaunch']},
    {o:2,d:'marketing',t:'Marketing & SEO/SEM',desc:'Datengetriebene Kampagnen aus SEO, SEM und Lead-Generierung mit nachvollziehbarem Prozess: Analyse, Kanalstrategie, Tests, Optimierung.',h:'/portfolio-marketing',cta:'Marketing-Cases ansehen',tags:['SEO & Rankings','Google Ads','Lead-Generierung','KPI-Fokus']},
    {o:3,d:'branding',t:'Branding & Corporate Identity',desc:'Markenauftritte mit klarer Identität – von Logoentwicklung und Farbwelt bis zur konsistenten Anwendung über alle Touchpoints.',h:'/portfolio-marken',cta:'Branding-Cases ansehen',tags:['Logo & Wortmarke','Corporate Design','Designsystem','Brand Strategy']}
  ];
  for(const a of areas){
    const [row]=await sql`INSERT INTO site_pages_blocks_portfolio_teaser_areas(_order,_parent_id,id,discipline,title,description,href,cta_label) VALUES(${a.o},${ptId},gen_random_uuid()::text,${a.d},${a.t},${a.desc},${a.h},${a.cta}) RETURNING id`;
    console.log('Area:',a.d,row.id);
    for(let i=0;i<a.tags.length;i++) await sql`INSERT INTO site_pages_blocks_portfolio_teaser_areas_tags(_order,_parent_id,id,label) VALUES(${i+1},${row.id},gen_random_uuid()::text,${a.tags[i]})`;
  }
  await sql`UPDATE site_pages SET updated_at=NOW() WHERE id=146`;
  console.log('Done!');
}
run().catch(e=>console.error('ERR:',e.message));
