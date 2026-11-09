import { chromium } from 'playwright';
import path from 'node:path';
const [w, h, out] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errs = [];
page.on('console', (m) => { if (!m.text().includes('GL Driver Message') && (m.type() === 'error' || m.type() === 'warning')) errs.push(m.text()); });
page.on('pageerror', (e) => errs.push(e.message));
await page.goto('file://' + path.resolve('rooms/geometries.html'));
await page.waitForTimeout(1500);
await page.evaluate(() => { document.getElementById('speed').value = 0; document.getElementById('speed').dispatchEvent(new Event('input')); });
// pad stroke: ink scribble across the cell
await page.click('[data-brush="counter"]');
await page.locator('#size').fill('30');
await page.locator('#pad').scrollIntoViewIfNeeded();
const pb = await page.locator('#pad').boundingBox();
await page.mouse.move(pb.x + pb.width*0.3, pb.y + pb.height*0.75);
await page.mouse.down();
for (let i = 0; i <= 20; i++) await page.mouse.move(pb.x + pb.width*(0.3 + 0.4*i/20), pb.y + pb.height*(0.75 - 0.3*Math.sin(i/20*Math.PI)));
await page.mouse.up();
// plate paint: ink spiral on the plate
await page.click('[data-brush="ink"]');
await page.locator('#size').fill('14');
await page.click('#platePaint');
const cx = 888, cy = 450;
await page.mouse.move(cx + 40, cy); await page.mouse.down();
for (let i = 0; i <= 40; i++) { const a = i/40*Math.PI*2; await page.mouse.move(cx + 40*Math.cos(a), cy + 40*Math.sin(a)); }
await page.mouse.up();
await page.click('#platePaint');
// drag the plate
await page.mouse.move(cx, cy); await page.mouse.down();
for (let i = 1; i <= 15; i++) await page.mouse.move(cx + i*14, cy + i*6);
await page.waitForTimeout(150);
await page.mouse.up();
await page.waitForTimeout(2500);
await page.screenshot({ path: out });
console.log(errs.length ? errs.join('\n') : 'no console errors');
await browser.close();
