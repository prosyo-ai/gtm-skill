#!/usr/bin/env node
// Validates the library layout, frontmatter and the house rules. Zero dependencies.
// Run from anywhere: node tools/validate.mjs
// One problem per line, written for humans and agents alike:
//   <path>: <what is wrong> — <how to fix it>

import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT, SKILLS_DIR, AUTHORS_DIR, CATEGORIES, parseFrontmatter, asList, listSkills, walk, countWords,
} from './lib.mjs';

const errors = [];
const warnings = [];
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const err = (file, msg) => errors.push(`${rel(file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${rel(file)}: ${msg}`);

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug));
const ALLOWED_TOP_KEYS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const REQUIRED_META = ['title', 'category', 'author', 'version'];
const ALLOWED_EXT = new Set(['.md', '.txt', '.json', '.csv', '.yaml', '.yml']);

// Skills speak in GTM verbs, never vendor names: readers run every stack there is.
const VENDORS = [
  'HubSpot', 'Salesforce', 'Pipedrive', 'Attio', 'Apollo', 'ZoomInfo', 'Lusha', 'Clay', 'Clearbit', 'Cognism',
  'Lemlist', 'Instantly', 'Smartlead', 'Salesloft', 'Outreach.io', 'Gong', 'Chorus', 'Calendly', 'Zapier',
  'HeyReach', 'Expandi', 'Dripify', 'Waalaxy', 'Sales Navigator', 'Seamless.AI', 'Prosyo', 'Penny',
];
const vendorRe = new RegExp(`\\b(${VENDORS.map((v) => v.replace(/[.]/g, '\\.')).join('|')})\\b`);

// A skill is instructions other people's agents run against their live data.
const UNSAFE = [
  [/ignore (all |any )?(previous|prior) instructions/i, 'prompt-injection phrase'],
  [/(api[_-]?key|secret|token|password)\s*[:=]\s*\S{8,}/i, 'hardcoded secret'],
  [/https?:\/\/[^\s)]*(webhook|hooks\.|requestbin|ngrok)/i, 'third-party endpoint that receives data'],
  [/(skip|disable|bypass)(ping)? (the )?(human )?(approval|review) (step|gate)/i, 'removes the human approval step'],
];

if (fs.existsSync(path.join(ROOT, 'SKILL.md'))) {
  err(path.join(ROOT, 'SKILL.md'), 'a SKILL.md at the repo root hides the library from installers — remove it');
}

// Authors -----------------------------------------------------------------------
const authors = new Set();
if (fs.existsSync(AUTHORS_DIR)) {
  for (const file of fs.readdirSync(AUTHORS_DIR)) {
    const full = path.join(AUTHORS_DIR, file);
    if (!file.endsWith('.md')) { err(full, 'only <slug>.md profiles live in authors/'); continue; }
    const slug = file.slice(0, -3);
    if (!KEBAB.test(slug)) err(full, 'author file name must be kebab-case — rename to your-name.md');
    const parsed = parseFrontmatter(fs.readFileSync(full, 'utf8'));
    if (!parsed) { err(full, 'missing frontmatter — copy templates/author.md'); continue; }
    if (!parsed.data.name) err(full, 'frontmatter needs `name:`');
    if (!parsed.data.url && !parsed.data.linkedin) err(full, 'frontmatter needs `linkedin:` (a personal profile) or `url:` (an organisation)');
    if (!parsed.body.trim()) err(full, 'add a two to four sentence bio under the frontmatter');
    authors.add(slug);
  }
}

// Skills ------------------------------------------------------------------------
const names = listSkills();
if (!names.length) err(SKILLS_DIR, 'no skills found — skills live in skills/<skill-name>/SKILL.md');

for (const entry of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) err(path.join(SKILLS_DIR, entry.name), 'loose file — every skill is a folder: skills/<skill-name>/SKILL.md');
}

for (const name of names) {
  const dir = path.join(SKILLS_DIR, name);
  const file = path.join(dir, 'SKILL.md');
  if (!KEBAB.test(name) || name.length > 64) err(dir, 'folder name must be kebab-case, 64 characters at most');
  if (!fs.existsSync(file)) { err(dir, 'missing SKILL.md — copy templates/skill/SKILL.md'); continue; }

  const raw = fs.readFileSync(file, 'utf8');
  const parsed = parseFrontmatter(raw);
  if (!parsed) { err(file, 'missing frontmatter — the file must start with a --- block'); continue; }
  const { data, body, dupes } = parsed;
  const meta = typeof data.metadata === 'object' && !Array.isArray(data.metadata) ? data.metadata : {};

  if (dupes.length) err(file, `duplicate frontmatter keys: ${dupes.join(', ')} — keep exactly one of each`);
  for (const key of Object.keys(data)) {
    if (!ALLOWED_TOP_KEYS.has(key)) err(file, `unknown top-level key \`${key}\` — put extra fields under \`metadata:\``);
  }
  if (data.name !== name) err(file, `\`name:\` must equal the folder name "${name}"`);

  const desc = typeof data.description === 'string' ? data.description : '';
  if (!desc) err(file, '`description:` is required');
  else {
    if (!/^Use this skill when/.test(desc)) err(file, 'description must start with "Use this skill when" — it is what agents read to decide when to fire');
    if (desc.length > 1024) err(file, `description is ${desc.length} characters — keep it at 1024 or fewer`);
    if (desc.length < 120) warn(file, 'description is short — add the phrases a user would say when they need this');
  }
  if (data.license && data.license !== 'MIT') err(file, 'skills in this library are MIT — set `license: MIT` or drop the key');

  for (const key of REQUIRED_META) {
    if (!meta[key]) err(file, `\`metadata.${key}\` is required`);
  }
  if (meta.category && !CATEGORY_SLUGS.has(meta.category)) {
    err(file, `unknown category "${meta.category}" — use one of: ${[...CATEGORY_SLUGS].join(', ')}`);
  }
  if (meta.author && !authors.has(meta.author)) {
    err(file, `author "${meta.author}" has no profile — add authors/${meta.author}.md (copy templates/author.md)`);
  }
  for (const c of asList(meta.contributors)) {
    if (!authors.has(c)) err(file, `contributor "${c}" has no profile in authors/`);
  }
  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) err(file, '`metadata.version` must look like 1.0.0');
  if (!asList(meta.tags).length) warn(file, 'add `metadata.tags` (comma separated) so people can filter to it');

  if (!/^## What good looks like\s*$/m.test(body)) err(file, 'missing a `## What good looks like` section — the judgment is what makes it a skill');
  if (!/^## Rules\s*$/m.test(body)) err(file, 'missing a `## Rules` section (MUST / NEVER lines)');
  if (!/^## Example prompts\s*$/m.test(body)) warn(file, 'add a `## Example prompts` section — it powers the website and helps people start');
  if (/\[(TODO|TBD|placeholder)\]/i.test(body)) err(file, 'leftover placeholder text');

  const words = countWords(body);
  if (words < 300) err(file, `body is ${words} words — skills here go deep (aim for 450+ with references for the detail)`);
  if (words > 2500) warn(file, `body is ${words} words — move depth into references/ pages`);

  const files = walk(dir);
  for (const f of files) {
    const r = path.relative(dir, f).split(path.sep);
    const ext = path.extname(f).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) err(f, `file type ${ext} is not allowed in a skill`);
    if (r.length > 2 || (r.length === 2 && r[0] !== 'references')) err(f, 'a skill holds SKILL.md and optional references/*.md — nothing deeper');
    if (r.length === 2 && !KEBAB.test(path.basename(f, ext))) err(f, 'reference file names must be kebab-case');
    const text = fs.readFileSync(f, 'utf8');
    const v = text.match(vendorRe);
    if (v) err(f, `names the vendor "${v[1]}" — use the GTM verb instead ("check the CRM", "pull the list")`);
    for (const [re, label] of UNSAFE) {
      if (re.test(text)) err(f, `${label} — skills must keep a human in the loop and never send data anywhere the reader does not own`);
    }
    if (r.length === 2) {
      const link = `references/${r[1]}`;
      if (!body.includes(link)) warn(f, `SKILL.md never points to ${link} — say when to read it`);
    }
  }
  for (const m of body.matchAll(/\]\((references\/[^)]+)\)/g)) {
    if (!fs.existsSync(path.join(dir, m[1]))) err(file, `links to ${m[1]}, which does not exist`);
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`\n${names.length} skills, ${authors.size} authors — ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
