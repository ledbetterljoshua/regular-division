import { chromium } from 'playwright';
import path from 'node:path';
const b = await chromium.launch();
for (const [label, js] of [['as-is', ''], ['textures plain', "document.querySelectorAll('#kfBtns .btn').length; window.__noTex=1"]]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.resolve('rooms/metamorphosis.html'));
  await p.waitForTimeout(1000);
  if (js) await p.evaluate(js);
  const r = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 3000) requestAnimationFrame(f); else res(n / 3); }; requestAnimationFrame(f); }));
  console.log(label, r.toFixed(1));
}
await b.close();
