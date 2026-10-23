#!/usr/bin/env node
// Builds plugin/ : the Claude Code plugin that Anthropic's directory and the
// marketplace install. It holds only what an agent needs (the skills, the
// manifest, an icon, a README and the license) so nothing else in the repo
// (tools, CI, cover images) is part of the plugin. Zero dependencies.
// Run from anywhere: node tools/build-plugin.mjs [--check]
//   --check  exits 1 when plugin/ is out of date (CI)

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, SKILLS_DIR, CATEGORIES, parseFrontmatter, listSkills, walk } from './lib.mjs';

const OUT = path.join(ROOT, 'plugin');
const CHECK = process.argv.includes('--check');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'plugin.json'), 'utf8'));

// Every file the plugin should contain: relative path -> Buffer.
const files = new Map();
const text = (rel, body) => files.set(rel, Buffer.from(body.replace(/\r\n/g, '\n'), 'utf8'));

text('.claude-plugin/plugin.json', `${JSON.stringify(manifest, null, 2)}\n`);
files.set('.claude-plugin/icon.png', fs.readFileSync(path.join(ROOT, 'assets', 'brand', 'plugin-icon.png')));
text('LICENSE', fs.readFileSync(path.join(ROOT, 'LICENSE'), 'utf8'));

const byCat = new Map(CATEGORIES.map((c) => [c.slug, []]));
for (const name of listSkills()) {
  const dir = path.join(SKILLS_DIR, name);
  if (!fs.existsSync(path.join(dir, 'SKILL.md'))) continue;
  for (const file of walk(dir)) {
    if (!file.endsWith('.md')) continue;
    const rel = path.relative(SKILLS_DIR, file).split(path.sep).join('/');
    text(`skills/${rel}`, fs.readFileSync(file, 'utf8'));
  }
  const parsed = parseFrontmatter(fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8'));
  const meta = (parsed && parsed.data.metadata) || {};
  const when = String(parsed.data.description || '').split(/(?<=\.)\s/)[0].replace(/^Use this skill when\s*/i, '').replace(/:\s*".*$/, '').replace(/\.$/, '');
  (byCat.get(meta.category) || []).push(`- **${meta.title || name}** (\`${name}\`): use it when ${when}.`);
}

const count = [...byCat.values()].reduce((n, list) => n + list.length, 0);
let readme = `# ${manifest.displayName}

${count} open-source go-to-market skills for Claude: research, prospecting, buying signals, cold email, LinkedIn, deliverability, reply handling, deals, positioning, RevOps, SEO and AEO.

Each skill teaches Claude how a strong operator runs one play, including what good output looks like and the common mistakes, with reference pages for rubrics and examples. Skills draft, research and analyse; anything that would send messages or change records in bulk waits for your approval.

## Install

In Claude Code (2.1.275 or later):

\`\`\`
/plugin install ${manifest.name} --marketplace prosyo-ai/gtm-skill
\`\`\`

On older versions: \`/plugin marketplace add prosyo-ai/gtm-skill\`, then \`/plugin install ${manifest.name}@prosyo\`.

## Use it

Ask in plain words. Claude loads the right skill on its own, for example:

- "Write a cold email to the Head of SDR at Lumen. They're hiring four SDRs."
- "Build our ICP from these 40 closed-won deals."
- "Audit our email deliverability. Reply rates dropped this month."

You can also call a skill directly: \`/${manifest.name}:cold-email-writer\`.

## Skills
`;
for (const cat of CATEGORIES) {
  const list = byCat.get(cat.slug);
  if (!list || !list.length) continue;
  readme += `\n### ${cat.name}\n\n${list.join('\n')}\n`;
}
readme += `
## Source and contributions

Skills are maintained in the open at ${manifest.repository}. Browse them at ${manifest.homepage}. MIT licensed.
`;
text('README.md', readme);

/* Write or check ---------------------------------------------------------------- */

const existing = fs.existsSync(OUT)
  ? new Map(walk(OUT).map((f) => [path.relative(OUT, f).split(path.sep).join('/'), fs.readFileSync(f)]))
  : new Map();

const stale = [];
for (const [rel, body] of files) {
  if (!existing.has(rel) || !existing.get(rel).equals(body)) stale.push(rel);
}
for (const rel of existing.keys()) {
  if (!files.has(rel)) stale.push(rel);
}

if (CHECK) {
  if (stale.length) {
    console.error(`plugin/ out of date (${stale.length} files, e.g. ${stale.slice(0, 3).join(', ')}) — run: node tools/build-plugin.mjs`);
    process.exit(1);
  }
  console.log('plugin/ is up to date');
} else {
  fs.rmSync(OUT, { recursive: true, force: true });
  for (const [rel, body] of files) {
    const full = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
  console.log(`plugin/: ${count} skills, ${files.size} files`);
}
