// Shared helpers for the validator and the catalog builder. Zero dependencies.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS_DIR = path.join(ROOT, 'skills');
export const AUTHORS_DIR = path.join(ROOT, 'authors');
export const CATEGORIES = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'categories.json'), 'utf8'));

// Metadata fields that hold comma-separated lists. The Agent Skills spec keeps
// metadata values as strings, so lists are written "a, b, c".
export const LIST_FIELDS = new Set(['tags', 'keywords', 'inputs', 'outputs', 'works_with', 'contributors']);

const unquote = (v) => {
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1).replace(/\\"/g, '"');
  }
  return t;
};

// Reads the YAML subset skills use: top-level `key: value`, one level of
// nested maps (`metadata:` + indented `key: value`), and `|` / `>` blocks.
export const parseFrontmatter = (raw) => {
  const text = raw.replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  if (end === -1) return null;
  const block = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\n+/, '');
  const data = {};
  const dupes = [];
  let parent = null;
  let blockKey = null;
  let blockTarget = null;
  let blockStyle = null;

  for (const line of block.split('\n')) {
    if (blockKey) {
      if (/^\s+\S/.test(line) || line.trim() === '') {
        blockTarget[blockKey] += (blockTarget[blockKey] ? (blockStyle === '|' ? '\n' : ' ') : '') + line.trim();
        continue;
      }
      blockKey = null;
    }
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const indented = /^\s+/.test(line);
    const m = line.trim().match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    const target = indented && parent ? data[parent] : data;
    if (!indented) parent = null;
    if (Object.prototype.hasOwnProperty.call(target, key)) dupes.push(key);
    if (value === '' && !indented) {
      data[key] = {};
      parent = key;
    } else if (value === '|' || value === '>') {
      target[key] = '';
      blockKey = key;
      blockTarget = target;
      blockStyle = value;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      target[key] = value.slice(1, -1).split(',').map((s) => unquote(s)).filter(Boolean);
    } else {
      target[key] = unquote(value);
    }
  }
  return { data, body, dupes };
};

export const asList = (value) => {
  if (Array.isArray(value)) return value.map((s) => String(s).trim()).filter(Boolean);
  if (typeof value !== 'string' || !value.trim()) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
};

export const listSkills = () =>
  fs.existsSync(SKILLS_DIR)
    ? fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
        .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
        .map((e) => e.name)
        .sort()
    : [];

export const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
};

export const slugify = (s) =>
  String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const countWords = (md) =>
  md.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_`|\-[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
