import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-horus-Desktop-pvgb2026-pvgb2026/db0ed490-d460-465e-92e0-bd4a24969c2c/scratchpad/hero-top.png' });

// scroll a bit to see if there's more of hero / edges
await page.evaluate(() => window.scrollTo(0, 100));
await page.waitForTimeout(500);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-horus-Desktop-pvgb2026-pvgb2026/db0ed490-d460-465e-92e0-bd4a24969c2c/scratchpad/hero-scroll100.png' });

await browser.close();
