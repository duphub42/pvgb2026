import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1000);

const info = await page.evaluate(() => {
  const el = document.querySelector('.hero-scroll-bg-image--home-mobile');
  if (!el) return { found: false };
  const cs = getComputedStyle(el);
  return {
    found: true,
    className: el.className,
    maskImage: cs.getPropertyValue('mask-image') || cs.getPropertyValue('-webkit-mask-image'),
    maskComposite: cs.getPropertyValue('mask-composite'),
    webkitMaskComposite: cs.getPropertyValue('-webkit-mask-composite'),
    display: cs.display,
    width: cs.width,
    height: cs.height,
    opacity: cs.opacity,
    rect: el.getBoundingClientRect(),
  };
});
console.log(JSON.stringify(info, null, 2));
console.log('viewport width used by media query check:', 390);

await browser.close();
