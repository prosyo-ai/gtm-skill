#!/usr/bin/env node
// Renders a 1200x630 cover image per skill (assets/covers/<name>.jpg) with
// headless Chrome. The website uses it as the skill's featured image and
// social card. Zero dependencies: drives Chrome over the DevTools protocol.
// Run from anywhere: node tools/build-covers.mjs [--all] [--only name,name]
//   Only skills whose title, category or version changed are re-rendered,
//   tracked in assets/covers/manifest.json. Set CHROME_PATH if Chrome is not
//   in a standard location.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { ROOT, SKILLS_DIR, CATEGORIES, parseFrontmatter, listSkills } from './lib.mjs';

const OUT = path.join(ROOT, 'assets', 'covers');
const MANIFEST = path.join(OUT, 'manifest.json');
const ALL = process.argv.includes('--all');
const onlyArg = process.argv.indexOf('--only');
const ONLY = onlyArg > -1 ? (process.argv[onlyArg + 1] || '').split(',').filter(Boolean) : null;

const CHROMES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].filter(Boolean);

const ICONS = {
  research: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  prospecting: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  signals: '<path d="M12 12 19 5"/><circle cx="12" cy="12" r="9"/><path d="M12 7a5 5 0 1 0 5 5"/>',
  'cold-email': '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  multichannel: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  deliverability: '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  'replies-meetings': '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  deals: '<path d="m11 17 2 2a2 2 0 0 0 3-3"/><path d="m14 14 2.5 2.5a2 2 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a2 2 0 0 1-3-3L10.3 4"/><path d="M21 8 17 4M3 13l6 6M3 8l4-4"/>',
  positioning: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  revops: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  'content-seo': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  'abm-expansion': '<path d="M4 21V5l8-3v19M12 9h8v12M8 8v.01M8 12v.01M8 16v.01M16 13v.01M16 17v.01M2 21h20"/>',
  enablement: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
};
const svg = (d, s = 28) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dataUri = (file) => `data:image/png;base64,${fs.readFileSync(path.join(ROOT, 'assets', 'brand', file)).toString('base64')}`;
const LOGO = dataUri('prosyo-logo-white.png');

const html = (s) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#06041a}
body{position:relative;font-family:Inter,sans-serif;color:#fff;
 background:radial-gradient(900px 520px at 78% 10%,#5b3bff59,transparent 60%),radial-gradient(700px 500px at 0% 100%,#8b5cf633,transparent 60%),#06041a}
.grid{position:absolute;inset:0;background-image:linear-gradient(#ffffff0b 1px,transparent 1px),linear-gradient(90deg,#ffffff0b 1px,transparent 1px);background-size:56px 56px;
 -webkit-mask-image:radial-gradient(ellipse 80% 70% at 60% 30%,#000 30%,transparent 80%)}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;justify-content:space-between}
.logo{height:40px}
.free{font-size:18px;font-weight:600;color:#cfcbe0;padding:9px 16px;border-radius:999px;border:1px solid #ffffff24;background:#ffffff0a}
.main{display:flex;gap:48px;margin-top:auto;align-items:flex-end}
.copy{flex:1;min-width:0}
.cat{display:inline-flex;align-items:center;gap:10px;padding:9px 16px 9px 12px;border-radius:999px;background:#8b5cf62e;border:1px solid #8b5cf666;color:#e4dcff;font-size:20px;font-weight:600}
.cat svg{color:#b9a3ff}
h1{margin-top:24px;font-size:${s.title.length > 34 ? 62 : 72}px;line-height:1.04;letter-spacing:-.035em;font-weight:700;max-width:720px}
.kick{display:block;margin-top:8px;background:linear-gradient(90deg,#c4b2ff,#8b5cf6);-webkit-background-clip:text;color:transparent;font-size:44px;letter-spacing:-.03em}
.cmd{margin-top:34px;display:inline-flex;align-items:center;gap:12px;padding:14px 20px;border-radius:14px;background:#0c0922;border:1px solid #ffffff21;
 font:500 19px/1 "JetBrains Mono",monospace;color:#e9e4ff}
.cmd b{color:#8b5cf6;font-weight:500}
.file{width:330px;flex:none;border-radius:22px;background:linear-gradient(180deg,#ffffff14,#ffffff06);border:1px solid #ffffff26;padding:22px 24px;box-shadow:0 40px 80px -30px #000}
.fh{display:flex;align-items:center;gap:8px;font:500 15px "JetBrains Mono",monospace;color:#a5a2b8;padding-bottom:14px;border-bottom:1px solid #ffffff17;margin-bottom:12px}
.dots{display:flex;gap:6px;margin-right:6px}.dots i{width:10px;height:10px;border-radius:50%;background:#ffffff26}
.row{display:flex;align-items:center;gap:12px;padding:9px 0;font-size:18px;color:#e4e0f5;font-weight:500}
.row span{display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:#5ee6a81f;color:#5ee6a8;flex:none}
</style></head><body><div class="grid"></div>
<div class="wrap">
 <div class="top"><img class="logo" src="${LOGO}" alt=""><span class="free">Free · Open source · MIT</span></div>
 <div class="main">
  <div class="copy">
   <span class="cat">${svg(ICONS[s.category] || ICONS.research, 24)}${esc(s.categoryName)}</span>
   <h1>${esc(s.title)}<span class="kick">Claude skill</span></h1>
   <div class="cmd"><b>$</b> npx skills add … --skill ${esc(s.name)}</div>
  </div>
  <div class="file"><div class="fh"><span class="dots"><i></i><i></i><i></i></span>SKILL.md</div>
   ${s.sections.slice(0, 5).map((t) => `<div class="row"><span>${svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 15)}</span>${esc(t)}</div>`).join('')}
  </div>
 </div>
</div></body></html>`;

/* Collect skills ----------------------------------------------------------------- */

const catName = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.name]));
const skills = listSkills().map((name) => {
  const file = path.join(SKILLS_DIR, name, 'SKILL.md');
  if (!fs.existsSync(file)) return null;
  const parsed = parseFrontmatter(fs.readFileSync(file, 'utf8'));
  if (!parsed) return null;
  const meta = parsed.data.metadata || {};
  const sections = [...parsed.body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim()).filter((t) => t !== 'Example prompts');
  const s = { name, title: meta.title || name, category: meta.category || '', categoryName: catName[meta.category] || '', version: meta.version || '', sections };
  s.hash = crypto.createHash('md5').update(JSON.stringify([s.title, s.category, s.version, s.sections, 3])).digest('hex');
  return s;
}).filter(Boolean);

fs.mkdirSync(OUT, { recursive: true });
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const todo = skills.filter((s) => (ONLY ? ONLY.includes(s.name) : ALL || manifest[s.name] !== s.hash || !fs.existsSync(path.join(OUT, `${s.name}.jpg`))));

// Drop covers of skills that left the library.
for (const f of fs.readdirSync(OUT)) {
  if (f.endsWith('.jpg') && !skills.some((s) => `${s.name}.jpg` === f)) {
    fs.unlinkSync(path.join(OUT, f));
    delete manifest[f.slice(0, -4)];
  }
}

if (!todo.length) {
  fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('covers: all up to date');
  process.exit(0);
}

/* Render ------------------------------------------------------------------------- */

const chromePath = CHROMES.find((p) => fs.existsSync(p));
if (!chromePath) {
  console.error('covers: Chrome not found — set CHROME_PATH');
  process.exit(1);
}
const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(process.env.TMPDIR || process.env.TEMP || '/tmp', 'gs-covers-'));
const chrome = spawn(chromePath, ['--headless=new', '--no-sandbox', '--hide-scrollbars', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 100 && !target; i++) {
  try {
    target = (await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json())).find((t) => t.type === 'page');
  } catch {}
  if (!target) await sleep(200);
}
if (!target) {
  chrome.kill();
  console.error('covers: could not connect to Chrome');
  process.exit(1);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) => new Promise((r) => {
  const id = ++seq;
  pending.set(id, r);
  ws.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
const { result: { frameTree } } = await send('Page.getFrameTree');

for (const s of todo) {
  await send('Page.setDocumentContent', { frameId: frameTree.frame.id, html: html(s) });
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => new Promise((r) => setTimeout(r, 150)))', awaitPromise: true });
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  fs.writeFileSync(path.join(OUT, `${s.name}.jpg`), Buffer.from(shot.result.data, 'base64'));
  manifest[s.name] = s.hash;
  console.log(`cover ${s.name}`);
}

ws.close();
chrome.kill();
fs.writeFileSync(MANIFEST, `${JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2)}\n`);
console.log(`covers: rendered ${todo.length}`);
