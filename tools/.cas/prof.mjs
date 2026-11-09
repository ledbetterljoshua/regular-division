import { chromium } from 'playwright';
import path from 'node:path';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
await page.goto('file://' + path.resolve('rooms/droste.html'));
await page.waitForTimeout(500);
const r = await page.evaluate(() => {
  const D = window.__droste; const out = {};
  const c = document.createElement('canvas'); c.width = c.height = 2048; const ctx = c.getContext('2d', {willReadFrequently:true});
  for (let k = 0; k < 4; k++) {
    const Z = 2 ** k, ppu = 1024 / 1.2 * Z;
    ctx.setTransform(ppu, 0, 0, -ppu, 1024, 1024);
    let t = performance.now(); D.drawArchive(ctx, ppu, 1.2 / Z); out['flat' + k] = Math.round(performance.now() - t);
    t = performance.now(); D.drawNest(ctx, D.archive, 16, ppu, 1.2 / Z, -1); ctx.getImageData(0,0,1,1); out['nest' + k] = Math.round(performance.now() - t);
  }
  return out;
});
console.log(r, await page.evaluate(()=>window.__T), 'build', await page.evaluate(() => window.__buildMs));
await browser.close();
