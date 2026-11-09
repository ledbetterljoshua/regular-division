// render several states of the room into separate PNGs in one browser
import { chromium } from 'playwright';
import path from 'node:path';
const [file, outPrefix, w, h, ...cases] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errs = [];
page.on('console', (m) => { if (!m.text().includes('GL Driver Message') && (m.type() === 'error' || m.type() === 'warning')) errs.push(m.text()); });
page.on('pageerror', (e) => errs.push(e.message));
await page.goto('file://' + path.resolve(file));
await page.waitForTimeout(2000);
for (const c of cases) {
  const [name, js] = c.split('::');
  await page.evaluate(js);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${outPrefix}-${name}.png` });
}
console.log(errs.length ? errs.join('\n') : 'no console errors');
await browser.close();
