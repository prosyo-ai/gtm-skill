#!/usr/bin/env node
// Builds catalog.json (the machine-readable index the website and other tools
// read) and refreshes the skill table in README.md. Zero dependencies.
// Run from anywhere: node tools/build-catalog.mjs [--check]
//   --check  exits 1 when catalog.json or README.md are out of date (CI)

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  ROOT, SKILLS_DIR, AUTHORS_DIR, CATEGORIES, parseFrontmatter, asList, listSkills, slugify, countWords,
} from './lib.mjs';

const REPO = 'prosyo-ai/gtm-skill';
const BRANCH = 'main';
const CHECK = process.argv.includes('--check');

/* Markdown → HTML ---------------------------------------------------------------
 * The subset skills use: headings, paragraphs, nested lists, tables, fenced code,
 * blockquotes, rules and inline code/bold/italic/links. Output is plain HTML
 * that a site can sanitise and style.
 */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inline = (text, base) => {
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    let url = href;
    if (!/^(https?:|mailto:|#)/.test(url)) url = `${base}/${url.replace(/^\.\//, '')}`;
    const ext = /^https?:/.test(url) && !url.startsWith(`https://github.com/${REPO}`);
    return `<a href="${url}"${ext ? ' rel="nofollow noopener" target="_blank"' : ''}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^\w*])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^\w])_([^_\n]+)_(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
  return s;
};

const headingId = (text, used) => {
  let id = slugify(text.replace(/[`*_]/g, '')) || 'section';
  let n = 2;
  const baseId = id;
  while (used.has(id)) id = `${baseId}-${n++}`;
  used.add(id);
  return id;
};

const LIST_RE = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

const renderList = (lines, base) => {
  // lines: [{indent, ordered, text}] — builds nested lists by indentation.
  let html = '';
  const stack = [];
  for (const item of lines) {
    while (stack.length && item.indent < stack[stack.length - 1].indent) {
      html += `</li></${stack.pop().tag}>`;
    }
    const top = stack[stack.length - 1];
    if (!top || item.indent > top.indent) {
      const tag = item.ordered ? 'ol' : 'ul';
      stack.push({ indent: item.indent, tag });
      html += `<${tag}><li>${inline(item.text, base)}`;
    } else {
      html += `</li><li>${inline(item.text, base)}`;
    }
  }
  while (stack.length) html += `</li></${stack.pop().tag}>`;
  return html;
};

const splitRow = (row) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

export const markdownToHtml = (md, base = '') => {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const used = new Set();
  const headings = [];
  let out = '';
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const fence = line.match(/^```\s*([\w-]*)/);
    if (fence) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out += `<pre><code${fence[1] ? ` class="language-${fence[1]}"` : ''}>${esc(buf.join('\n'))}</code></pre>\n`;
      continue;
    }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      const id = headingId(text, used);
      if (level === 2 || level === 3) headings.push({ level, id, text: text.replace(/[`*_]/g, '') });
      out += `<h${level} id="${id}">${inline(text, base)}</h${level}>\n`;
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,})\s*$/.test(line)) { out += '<hr>\n'; i++; continue; }

    if (/^\|/.test(line) && i + 1 < lines.length && /^\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(splitRow(lines[i++]));
      out += '<div class="md-table"><table><thead><tr>' + head.map((c) => `<th>${inline(c, base)}</th>`).join('') + '</tr></thead><tbody>';
      out += rows.map((r) => '<tr>' + r.map((c) => `<td>${inline(c, base)}</td>`).join('') + '</tr>').join('');
      out += '</tbody></table></div>\n';
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out += `<blockquote>${markdownToHtml(buf.join('\n'), base).html}</blockquote>\n`;
      continue;
    }

    if (LIST_RE.test(line)) {
      const items = [];
      while (i < lines.length) {
        const l = lines[i];
        const m = l.match(LIST_RE);
        if (m) {
          items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] });
          i++;
        } else if (l.trim() && /^\s{2,}\S/.test(l) && items.length) {
          items[items.length - 1].text += ` ${l.trim()}`;
          i++;
        } else break;
      }
      out += renderList(items, base) + '\n';
      continue;
    }

    const buf = [];
    while (
      i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>|\|)/.test(lines[i]) && !LIST_RE.test(lines[i]) &&
      !/^(-{3,}|\*{3,})\s*$/.test(lines[i])
    ) buf.push(lines[i++].trim());
    out += `<p>${inline(buf.join(' '), base)}</p>\n`;
  }
  return { html: out, headings };
};

/* Sections the website lifts out of a skill ------------------------------------ */

const section = (body, title) => {
  const m = body.match(new RegExp(`^## ${title}\\s*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, 'm'));
  return m ? m[1].trim() : '';
};

const prompts = (body) => {
  const block = section(body, 'Example prompts');
  if (!block) return [];
  const fromFences = [...block.matchAll(/```[\w-]*\n([\s\S]*?)```/g)].map((m) => m[1].trim());
  const fromList = block.split('\n').map((l) => l.match(/^[-*]\s+(.*)$/)).filter(Boolean).map((m) => m[1].replace(/^"|"$/g, '').trim());
  return [...fromFences, ...fromList].filter(Boolean);
};

const gitDate = (p) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', p], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return out || null;
  } catch {
    return null;
  }
};

/* Build ---------------------------------------------------------------------------- */

const authors = {};
if (fs.existsSync(AUTHORS_DIR)) {
  for (const file of fs.readdirSync(AUTHORS_DIR).filter((f) => f.endsWith('.md'))) {
    const parsed = parseFrontmatter(fs.readFileSync(path.join(AUTHORS_DIR, file), 'utf8'));
    if (!parsed) continue;
    const slug = file.slice(0, -3);
    authors[slug] = {
      slug,
      name: parsed.data.name || slug,
      title: parsed.data.title || '',
      url: parsed.data.url || parsed.data.linkedin || '',
      linkedin: parsed.data.linkedin || '',
      avatar: parsed.data.avatar || '',
      bio: parsed.body.trim(),
    };
  }
}

const catBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));
const skills = [];

for (const name of listSkills()) {
  const dir = path.join(SKILLS_DIR, name);
  const file = path.join(dir, 'SKILL.md');
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const parsed = parseFrontmatter(raw);
  if (!parsed) continue;
  const { data, body } = parsed;
  const meta = data.metadata || {};
  const repoPath = `skills/${name}`;
  const base = `https://github.com/${REPO}/blob/${BRANCH}/${repoPath}`;
  const rendered = markdownToHtml(body, base);

  const refDir = path.join(dir, 'references');
  const references = fs.existsSync(refDir)
    ? fs.readdirSync(refDir).filter((f) => f.endsWith('.md')).sort().map((f) => {
        const md = fs.readFileSync(path.join(refDir, f), 'utf8').replace(/\r\n/g, '\n');
        const title = (md.match(/^#\s+(.*)$/m) || [null, f.replace(/\.md$/, '').replace(/-/g, ' ')])[1].trim();
        const withoutTitle = md.replace(/^#\s+.*\n+/, '');
        return {
          file: `references/${f}`,
          title,
          markdown: md,
          html: markdownToHtml(withoutTitle, `${base}/references`).html,
          words: countWords(md),
        };
      })
    : [];

  const cat = catBySlug[meta.category] || { slug: meta.category || 'other', name: meta.category || 'Other' };
  const author = authors[meta.author] || { slug: meta.author || '', name: meta.author || '' };
  const intro = body.split(/\n## /)[0].trim();

  skills.push({
    name,
    title: meta.title || name,
    description: data.description || '',
    summary: intro.replace(/\s+/g, ' '),
    category: cat.slug,
    category_name: cat.name,
    tags: asList(meta.tags),
    keywords: asList(meta.keywords),
    inputs: asList(meta.inputs),
    outputs: asList(meta.outputs),
    works_with: asList(meta.works_with),
    version: meta.version || '1.0.0',
    license: data.license || 'MIT',
    author: { slug: author.slug, name: author.name, url: author.url || '' },
    contributors: asList(meta.contributors),
    path: repoPath,
    url: `https://github.com/${REPO}/tree/${BRANCH}/${repoPath}`,
    raw_url: `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${repoPath}/SKILL.md`,
    install: `npx skills add ${REPO} --skill ${name}`,
    markdown: raw,
    html: rendered.html,
    headings: rendered.headings,
    prompts: prompts(body),
    references,
    words: countWords(body) + references.reduce((n, r) => n + r.words, 0),
    updated: gitDate(repoPath),
  });
}

const categories = CATEGORIES.map((c) => ({ ...c, count: skills.filter((s) => s.category === c.slug).length }));

const catalog = {
  name: 'GTM Skills by Prosyo',
  repo: `https://github.com/${REPO}`,
  branch: BRANCH,
  license: 'MIT',
  count: skills.length,
  categories,
  authors: Object.values(authors),
  skills,
};

// Stable output: no build timestamp, so the file only changes when skills do.
const catalogJson = `${JSON.stringify(catalog, null, 2)}\n`;

/* README table ------------------------------------------------------------------ */

const table = [];
table.push(`**${skills.length} skills** across ${categories.filter((c) => c.count).length} categories.\n`);
for (const c of categories.filter((x) => x.count)) {
  table.push(`### ${c.name}\n`);
  table.push('| Skill | What it does | Install |');
  table.push('| --- | --- | --- |');
  for (const s of skills.filter((x) => x.category === c.slug)) {
    const what = s.description.replace(/^Use this skill when\s*/i, '').split(/(?<=\.)\s/)[0].replace(/\|/g, '/');
    table.push(`| [${s.title}](skills/${s.name}/SKILL.md) | ${what.charAt(0).toUpperCase()}${what.slice(1)} | \`--skill ${s.name}\` |`);
  }
  table.push('');
}
const readmePath = path.join(ROOT, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8').replace(/\r\n/g, '\n');
const START = '<!-- catalog:start -->';
const END = '<!-- catalog:end -->';
let nextReadme = readme;
if (readme.includes(START) && readme.includes(END)) {
  nextReadme = readme.slice(0, readme.indexOf(START) + START.length) + '\n' + table.join('\n') + '\n' + readme.slice(readme.indexOf(END));
}
nextReadme = nextReadme.replace(/<!-- count -->\d*<!-- \/count -->/g, `<!-- count -->${skills.length}<!-- /count -->`);

const catalogPath = path.join(ROOT, 'catalog.json');
if (CHECK) {
  // Dates come from git and differ between a checkout and CI, so compare without them.
  const strip = (s) => s.replace(/"updated": ("[^"]*"|null)/g, '"updated": null');
  const current = fs.existsSync(catalogPath) ? fs.readFileSync(catalogPath, 'utf8') : '';
  const stale = [];
  if (strip(current) !== strip(catalogJson)) stale.push('catalog.json');
  if (readme !== nextReadme) stale.push('README.md');
  if (stale.length) {
    console.error(`${stale.join(' and ')} out of date — run: node tools/build-catalog.mjs`);
    process.exit(1);
  }
  console.log('catalog.json and README.md are up to date');
} else {
  fs.writeFileSync(catalogPath, catalogJson);
  fs.writeFileSync(readmePath, nextReadme);
  console.log(`catalog.json: ${skills.length} skills, ${categories.filter((c) => c.count).length} categories`);
}
