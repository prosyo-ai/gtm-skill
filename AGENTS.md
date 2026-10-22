# AGENTS.md: working with this repo

You are an AI agent. This file is written for you. It covers the two things a user may ask of you here: **installing** skills from this library, and **submitting** a new skill to it.

This is GTM Skills by Prosyo: open, MIT-licensed go-to-market skills (research, prospecting, signals, cold email, LinkedIn, deliverability, replies, deals, positioning, RevOps, SEO and AEO). The browsable directory is at https://prosyo.com/gtm-skills/.

## Decide what the user wants

- "Install / use / get skill X" → [Installing](#installing)
- "Submit / contribute / publish my skill" → [Submitting a skill](#submitting-a-skill)
- "Improve an existing skill" → open a PR that edits that skill's folder only, and bump `metadata.version`

## Installing

```bash
npx skills add prosyo-ai/gtm-skill --skill <skill-name>   # one skill, any agent
npx skills add prosyo-ai/gtm-skill                        # pick interactively
npx skills add prosyo-ai/gtm-skill --list                 # list everything
```

In Claude Code, the whole library installs as a plugin:

```
/plugin marketplace add prosyo-ai/gtm-skill
/plugin install gtm-skills@prosyo
```

If the user cannot run a terminal, fetch the raw files of `skills/<skill-name>/` (SKILL.md and references/) and place them in the agent's skills directory yourself. Recommend installing `gtm-global-rules` alongside any skill that touches real prospects.

## Submitting a skill

The flow is **interview → draft → validate → submit**. One pull request contains one skill.

### 0. Ground rules

- You create files only in `skills/<new-skill-name>/` and, for a first-time author, `authors/<author-slug>.md`. Nothing else.
- The folder name is the skill's permanent identity: kebab-case, descriptive, 64 characters or fewer, unique (`ls skills/`).
- A skill folder holds `SKILL.md` and optional `references/*.md`. Nothing deeper, no scripts.
- Follow [GLOBAL_RULES.md](GLOBAL_RULES.md). A skill that sends anything without human approval, invents facts or moves data to third parties is rejected.

### 1. Interview the user

Extract judgment, not a procedure. Ask, in the user's language:

1. When does this play run? What triggers it?
2. What does it produce, concretely?
3. Walk me through how you actually do it, including the branches by segment, deal size or what the data shows.
4. What are the real numbers: thresholds, rubrics, benchmarks, caps?
5. Give me two or three real examples, including one that went wrong.
6. What do you notice first that others miss?
7. What does the mediocre version look like?
8. How do you know the output is good?
9. (First submission only) Who are you? Name, role, LinkedIn, company site.

Keep asking "what else do you check here?" until the answer is genuinely nothing. Depth from the interview becomes `references/` pages.

### 2. Draft the files

Copy [templates/skill/SKILL.md](templates/skill/SKILL.md) and, for a new author, [templates/author.md](templates/author.md).

Frontmatter:

```yaml
---
name: <kebab-case, equal to the folder name>
description: "Use this skill when <trigger>. <What it produces>. <Phrases a user would say>."
license: MIT
metadata:
  title: <Display name>
  category: <one slug from tools/categories.json>
  tags: "<comma separated: Sales, SDR, Founders, Marketing, RevOps, Sales Leaders, Customer Success, Demand Gen, Agencies>"
  author: <author slug = authors/<slug>.md>
  version: "1.0.0"
  keywords: "<comma separated search phrases>"
  inputs: "<comma separated>"
  outputs: "<comma separated>"
---
```

Body, in this order:

1. One or two lines: when this applies and what it produces.
2. `## Inputs`
3. `## The play`, with `###` steps. GTM verbs, never vendor names. Point to `references/<page>.md` for rubrics, examples and templates.
4. `## What good looks like`: mandatory. The expert's tell, the common mistake, the quality bar.
5. `## Rules`: MUST and NEVER lines.
6. `## Example prompts`: three bullet lines a user would type.

Aim for a 450-800 word body plus 1-3 reference pages. No dates, no "recently", no placeholder text.

### 3. Validate

```bash
node tools/validate.mjs
node tools/build-catalog.mjs
```

Fix every error. CI runs both on the pull request.

### 4. Submit

```bash
gh repo fork prosyo-ai/gtm-skill --clone && cd gtm-skill
git checkout -b add-<skill-name>
# add files, validate, build the catalog
git add skills/<skill-name> authors/ catalog.json README.md
git commit -m "add <skill-name>"
git push -u origin add-<skill-name>
gh pr create --repo prosyo-ai/gtm-skill --title "add <skill-name>" --fill
```

No git available: open a "Submit a skill" issue at https://github.com/prosyo-ai/gtm-skill/issues/new?template=submit-skill.yml and paste each file. A maintainer turns it into a pull request credited to the user.

### After merge

The skill appears in `catalog.json`, in the README table, and on https://prosyo.com/gtm-skills/ with the author's name, usually within a day.
