# Contributing

Thanks for sharing a play. The easiest route is to let your AI agent do it: paste the prompt from the [README](README.md#contribute-a-skill) into Claude, Codex or any capable agent. It interviews you, drafts the skill in this format, validates it and opens the pull request.

## The model

- One skill = one folder: `skills/<skill-name>/SKILL.md` plus optional `references/*.md`.
- Authors live in `authors/<slug>.md`. Your profile is credited on every skill you write, here and on [prosyo.com/gtm-skills](https://prosyo.com/gtm-skills/).
- The folder name is permanent (it is the install name and the URL). Kebab-case, unique, never renamed after merge.
- Categories are fixed in [tools/categories.json](tools/categories.json). Propose a new one in an issue first.
- Full format spec: [AGENTS.md](AGENTS.md). Templates: [templates/](templates/).

## Submitting

1. Fork, branch, add `skills/<skill-name>/` (and `authors/<you>.md` the first time).
2. Run `node tools/validate.mjs` and fix everything it reports.
3. Run `node tools/build-catalog.mjs` to refresh `catalog.json` and the README table.
4. Open a pull request, one skill per PR, and fill in the checklist.

No git? Use the [Submit a skill issue form](https://github.com/prosyo-ai/gtm-skill/issues/new?template=submit-skill.yml).

Improving an existing skill is welcome too: edit its folder, bump `metadata.version`, and add yourself to `metadata.contributors`.

## The quality bar

- **Judgment, not steps.** What the best operator notices first, the trap the average one falls into, and what good output looks like. Every skill has `## What good looks like`.
- **Real numbers.** Thresholds, rubrics, benchmarks and worked examples. "It depends" is where the skill should start, not end.
- **Tool-agnostic.** "Check the CRM", not a vendor's menu path. The validator rejects vendor names inside skills.
- **Dense description.** Starts with "Use this skill when…" and includes the phrases people actually say. It is what an agent reads to decide whether to load your skill.
- **Deep, not padded.** A sharp 450-800 word body; depth goes into `references/`.
- **No rot.** No dates, no "recently", no UI screenshots.

## Review gates

1. **Convention**: the validator passes and the format matches the spec.
2. **Safety**: follows [GLOBAL_RULES.md](GLOBAL_RULES.md). Hard rejects: sending data to endpoints the reader does not own, secrets or tokens, prompt-injection patterns, sending or bulk actions without a human approval step, asking end users for credentials.
3. **Judgment and voice**: maintainers may edit for clarity and house voice; the substance stays yours.
4. **Author identity**: a real person or organisation with a verifiable profile.
5. **Publish**: merge, then CI rebuilds the catalog and the site picks it up.

## License

Contributions are MIT-licensed. Attribution is structural: your author profile travels with your skills.
