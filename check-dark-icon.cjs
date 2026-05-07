const p = require('playwright');
(async () => {
  const b = await p.chromium.launch({headless:true});
  const page = await b.newPage();
  await page.setViewportSize({width:1400, height:900});
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => { localStorage.setItem('payload-theme','dark'); });
  await page.goto('http://localhost:3000', {waitUntil:'domcontentloaded', timeout:60000});
  await page.waitForTimeout(2000);
  await page.hover('button:has-text("Leistungen")');
  await page.waitForTimeout(900);
  await page.screenshot({path:'/tmp/mm-leistungen-dark.png'});
  const info = await page.evaluate(() => {
    const header = document.querySelector('header');
    const icons = document.querySelectorAll('.megamenu-item-icon img');
    return {
      headerDataTheme: header ? header.getAttribute('data-theme') : 'no header',
      htmlDataTheme: document.documentElement.getAttribute('data-theme'),
      iconCount: icons.length,
      icon9: (() => {
        const img = icons[9];
        if (!img) return null;
        const gp = img.parentElement?.parentElement;
        const ggp = gp?.parentElement;
        return {
          filter: window.getComputedStyle(img).filter,
          opacity: window.getComputedStyle(img).opacity,
          parentFullClass: img.parentElement?.className,
          gpFullClass: gp?.className,
          ggpFullClass: ggp?.className,
          gpTag: gp?.tagName,
          hasMegamenuItemIconInParent: img.parentElement?.classList.contains('megamenu-item-icon'),
          hasMegamenuFeaturedAncestor: !!img.closest('.megamenu-featured'),
          hasMegamenuAncestor: !!img.closest('.megamenu'),
          hasDropdownContentAncestor: !!img.closest('.megamenu-dropdown-content'),
          imgClasses: img.className,
        };
      })(),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
