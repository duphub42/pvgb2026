import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1000);
const info = await page.evaluate(() => {
  const el = document.querySelector('.hero-scroll-bg-image--home-mobile');
  const chain = [];
  let p = el.parentElement;
  let depth = 0;
  while (p && depth < 8) {
    const cs = getComputedStyle(p);
    chain.push({
      tag: p.tagName,
      className: p.className,
      overflow: cs.overflow,
      overflowY: cs.overflowY,
      position: cs.position,
      rect: p.getBoundingClientRect(),
    });
    p = p.parentElement;
    depth++;
  }
  return chain;
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
