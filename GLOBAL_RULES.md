# Global rules

Every skill in this library follows these rules, and every contribution is reviewed against them. They exist because a skill is a set of instructions that other people's agents will run against live inboxes, CRMs and real prospects.

The same rules ship as an installable skill, [`gtm-global-rules`](skills/gtm-global-rules/SKILL.md), so an agent can load them as its operating policy.

## 1. Human approval before action

Skills may research, score, draft and analyse freely. Anything that **sends** (email, LinkedIn, SMS, calls placed by software), **schedules**, **enrolls**, **deletes**, **merges** or **bulk-updates** records must show the exact action first and wait for a person's clear yes. One approval covers one action.

## 2. No invented facts

Personalization comes from a source the agent actually read, and the source stays attached. Customer names, results and quotes come only from an approved list. When research finds nothing, the skill says so and writes an honest, role-level line instead.

## 3. Respect the person on the other end

- Honour opt-outs immediately, across every channel.
- Follow the stricter privacy and consent rule when regions differ.
- Never imply a relationship or conversation that did not happen.
- Never reveal tracking (website visits, profile views, email opens) in outreach.
- Never use personal-life details (family, health, appearance) in B2B outreach.

## 4. Protect sending reputation and accounts

Skills stay inside safe volumes for mailboxes and social accounts, gate ramps on bounce and complaint rates, and never recommend tactics that evade spam filters or platform rules.

## 5. Honest numbers

Report counts as counts, label assumptions, state sample sizes, and never call a test winner on noise. Open rates are not a decision metric.

## 6. Tool-agnostic language

Skills describe the work ("check the CRM", "verify the list"), not a vendor's buttons, so they run on any stack. The validator rejects vendor names inside skill folders.

## 7. Data stays with its owner

No skill sends prospect or customer data to an endpoint, inbox or webhook the user does not own. No secrets, tokens or credentials in skill files, and no skill ever asks an end user for a password.

## 8. A consistent voice

Plain words, short sentences, specific claims. No hype, no fake urgency, no guilt-tripping follow-ups.

---

Violations of rules 1, 2, 3 or 7 are hard rejects in review. Report a published skill that breaks them through [SECURITY.md](SECURITY.md).
