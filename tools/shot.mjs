// Screenshot a page with working WebGL (SwiftShader) and dump console errors.
// usage: node tools/shot.mjs <file.html> <out.png> [width=1440] [height=900] [waitMs=2500] [--eval "js"]
import { chromium } from 'playwright';
import path from 'node:path';

const [file, out, w = '1440', h = '900', wait = '2500', ...rest] = process.argv.slice(2);
const evalIdx = rest.indexOf('--eval');
const evalJs = evalIdx >= 0 ? rest[evalIdx + 1] : null;

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'],
});
try {
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const errs = [];
  page.on('console', (m) => { if (!m.text().includes('GL Driver Message') && (m.type() === 'error' || m.type() === 'warning')) errs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => errs.push(`[pageerror] ${e.message}`));
  await page.goto('file://' + path.resolve(file));
  await page.waitForTimeout(+wait);
  if (evalJs) { await page.evaluate(evalJs); await page.waitForTimeout(800); }
  await page.screenshot({ path: out });
  console.log(errs.length ? errs.join('\n') : 'no console errors');
} finally {
  await browser.close();
}
