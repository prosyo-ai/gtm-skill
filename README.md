# GTM Skills for Claude, Codex and every AI agent

[![Validate](https://github.com/prosyo-ai/gtm-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/prosyo-ai/gtm-skill/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-69-8b5cf6.svg)](#the-library)

**<!-- count -->69<!-- /count --> free, open-source go-to-market skills** for AI agents: prospecting, research, buying signals, cold email, LinkedIn, deliverability, reply handling, deals, positioning, RevOps, SEO and AI search. Built and maintained by [Prosyo](https://prosyo.com), open to contributions from every GTM operator.

Every skill is a plain `SKILL.md` that any agent can read: Claude Code, Claude.ai, Codex, Cursor, Gemini CLI, Windsurf and the rest. Each one encodes the judgment of a good operator (what to notice first, the common mistake, what good output looks like), not just a list of steps.

Browse the directory with search and filters at **[prosyo.com/gtm-skills](https://prosyo.com/gtm-skills/)**.

## Install

**Claude Code** (all skills, as a plugin):

```bash
/plugin marketplace add prosyo-ai/gtm-skill
/plugin install gtm-skills@prosyo
```

**Any agent** (Claude Code, Codex, Cursor and 40+ more) with the open `skills` installer:

```bash
# one skill
npx skills add prosyo-ai/gtm-skill --skill cold-email-writer

# pick from the whole library
npx skills add prosyo-ai/gtm-skill

# see what's here
npx skills add prosyo-ai/gtm-skill --list
```

**Claude.ai**: download a skill folder as a .zip from its page on [prosyo.com/gtm-skills](https://prosyo.com/gtm-skills/) and upload it under Settings → Capabilities → Skills.

**By hand**: copy any `skills/<name>/` folder into your agent's skills directory (for Claude Code, `~/.claude/skills/<name>/`).

## Start here

1. Install **`gtm-global-rules`** first. It is the always-on guardrail every other skill assumes: human approval before anything is sent, no invented facts, opt-outs honoured, honest reporting.
2. Then pick the skill for the job: *"Use the cold email writer to draft three variants for Dana at Lumen"*.
3. Every skill has a `## What good looks like` section. Hold the output to it.

## The library

<!-- catalog:start -->
**69 skills** across 14 categories.

### Research & ICP

| Skill | What it does | Install |
| --- | --- | --- |
| [Account research brief](skills/account-research-brief/SKILL.md) | You need to research a target company before outreach, a first call or an account plan: "research this account", "what should I know about Acme before the call", "find a reason to reach out". | `--skill account-research-brief` |
| [Buyer persona builder](skills/buyer-persona-builder/SKILL.md) | You need B2B buyer personas that sales and marketing will actually use: before writing outreach to a new title, when messaging feels generic, or when a deal stalls because the wrong person is engaged. | `--skill buyer-persona-builder` |
| [Competitor teardown](skills/competitor-teardown/SKILL.md) | You need to understand a competitor well enough to beat them: a deal is going head to head, a new competitor appeared, positioning needs a refresh, or reps keep losing on the same objection. | `--skill competitor-teardown` |
| [ICP builder](skills/icp-builder/SKILL.md) | You need to define or sharpen an ideal customer profile (ICP) for B2B sales: starting outbound, the reply rate is low, the pipeline is full of bad-fit deals, or leadership asks who we should really sell to. | `--skill icp-builder` |
| [Prospect research brief](skills/prospect-research-brief/SKILL.md) | You need to research a specific person before reaching out or meeting them: "look up this prospect", "what do I say to Jane", "find a personalised first line". | `--skill prospect-research-brief` |
| [TAM, SAM and SOM calculator](skills/tam-calculator/SKILL.md) | You need a credible market size for a B2B product: a board or investor deck, territory planning, deciding which segment to attack, or checking whether outbound has enough accounts to sustain a quota. | `--skill tam-calculator` |

### Prospecting

| Skill | What it does | Install |
| --- | --- | --- |
| [Account tiering](skills/account-tiering/SKILL.md) | You need to decide which accounts get the most effort: "tier my account list", "which accounts should get 1:1 research", "prioritise my territory", "score these companies". | `--skill account-tiering` |
| [Buying committee mapper](skills/buying-committee-mapper/SKILL.md) | A B2B deal or target account needs more than one contact: "who else should I talk to", "map the buying committee", "multi-thread this deal", or a single-threaded deal is at risk. | `--skill buying-committee-mapper` |
| [Lead list builder](skills/lead-list-builder/SKILL.md) | You need a B2B lead list for outbound: "build me a list of 500 heads of operations at logistics companies", "find leads for this campaign", "who should we target next". | `--skill lead-list-builder` |
| [Lead scoring model](skills/lead-scoring-model/SKILL.md) | You need a lead scoring model that sales trusts: inbound leads pile up unworked, marketing and sales argue about MQL quality, or reps chase the wrong leads first. | `--skill lead-scoring-model` |
| [List cleaning](skills/list-cleaning/SKILL.md) | A prospect or contact list needs cleaning before outreach or import: "clean this CSV", "dedupe my leads", "fix the names and titles", "why are my bounces high". | `--skill list-cleaning` |
| [Lookalike account finder](skills/lookalike-account-finder/SKILL.md) | You want more accounts like your best customers: "find companies like our top 10", "build a lookalike list", "who else looks like Acme". | `--skill lookalike-account-finder` |

### Signals

| Skill | What it does | Install |
| --- | --- | --- |
| [Buying signal scoring](skills/buying-signal-scoring/SKILL.md) | You track buying signals and need to decide which ones deserve outreach today: "which accounts are in market", "prioritise these signals", "build a signal-based selling system". | `--skill buying-signal-scoring` |
| [Funding signal outreach](skills/funding-signal-outreach/SKILL.md) | A target company announces a funding round, acquisition or major investment and you want to reach out: "they just raised a Series B", "write a funding congratulations email that is not generic", "use funding as a buying signal". | `--skill funding-signal-outreach` |
| [Hiring signal outreach](skills/hiring-signal-outreach/SKILL.md) | A target company is hiring for roles your product supports or replaces: "they are hiring SDRs", "use job postings as a buying signal", "write outreach based on their job listing". | `--skill hiring-signal-outreach` |
| [Job change plays](skills/job-change-plays/SKILL.md) | A contact changes jobs: a champion or happy user joins a new company, a new leader starts at a target account, or a key contact leaves a customer. | `--skill job-change-plays` |
| [Post engagement outreach](skills/post-engagement-outreach/SKILL.md) | People engage with LinkedIn posts (yours, your team's, a competitor's or an industry voice's) and you want to turn that engagement into conversations: "reach out to people who liked our post", "warm outreach from post engagers", "turn commenters into leads". | `--skill post-engagement-outreach` |
| [Website visitor follow-up](skills/website-visitor-follow-up/SKILL.md) | You know which companies visited your website and want to follow up without being creepy: "turn website visitors into meetings", "who should we contact from yesterday's visitors", "write outreach for high-intent visits". | `--skill website-visitor-follow-up` |

### Cold Email

| Skill | What it does | Install |
| --- | --- | --- |
| [Break-up email](skills/breakup-email/SKILL.md) | You want to close the loop with a prospect who has not replied after several touches, or a deal that went silent: "write a breakup email", "last email in the sequence", "close the loop politely". | `--skill breakup-email` |
| [Cold email sequence](skills/cold-email-sequence/SKILL.md) | You need a complete cold email sequence (cadence) for a campaign: "write a 4-step outbound sequence", "build an email campaign for this segment", "plan the follow-ups". | `--skill cold-email-sequence` |
| [Cold email writer](skills/cold-email-writer/SKILL.md) | You need to write a B2B cold email that gets replies: "write a cold email to a VP of Sales", "draft outreach for this prospect", "my cold emails get no replies". | `--skill cold-email-writer` |
| [Email copy review](skills/email-copy-review/SKILL.md) | You want an honest review of outreach copy before sending: "roast my cold email", "review this sequence", "why is nobody replying", "score my email". | `--skill email-copy-review` |
| [First line personalization](skills/first-line-personalization/SKILL.md) | You need personalised first lines (icebreakers) for cold emails or LinkedIn messages at scale: "write personalised openers for this list", "add a custom first line for each lead", "make my outreach feel 1:1". | `--skill first-line-personalization` |
| [Follow-up email writer](skills/follow-up-email-writer/SKILL.md) | You need to follow up after no reply, after a meeting, after a proposal or after a prospect went quiet: "write a follow-up email", "they ghosted me", "follow up after the demo". | `--skill follow-up-email-writer` |
| [Subject line writer](skills/subject-line-writer/SKILL.md) | You need cold email subject lines that get opened and do not look like marketing: "write subject lines for this email", "my open rates are low", "A/B test subject lines". | `--skill subject-line-writer` |

### LinkedIn

| Skill | What it does | Install |
| --- | --- | --- |
| [LinkedIn comment strategy](skills/linkedin-comment-strategy/SKILL.md) | You want to use LinkedIn comments to get noticed by target buyers before reaching out: "comment strategy for prospects", "warm up accounts on LinkedIn", "write thoughtful comments". | `--skill linkedin-comment-strategy` |
| [LinkedIn connection note](skills/linkedin-connection-note/SKILL.md) | You need LinkedIn connection request notes that get accepted: "write a connection note", "my acceptance rate is low", "connect with prospects without being salesy". | `--skill linkedin-connection-note` |
| [LinkedIn message sequence](skills/linkedin-message-sequence/SKILL.md) | You need a LinkedIn outreach sequence that starts conversations instead of collecting ignored pitches: "write a LinkedIn message sequence", "what do I send after they accept", "LinkedIn prospecting messages". | `--skill linkedin-message-sequence` |
| [LinkedIn post writer](skills/linkedin-post-writer/SKILL.md) | You need LinkedIn posts that build pipeline, not just likes: "write a LinkedIn post", "turn this idea into a post", "ghostwrite posts for our founder", "plan a week of LinkedIn content". | `--skill linkedin-post-writer` |
| [LinkedIn profile optimizer](skills/linkedin-profile-optimizer/SKILL.md) | A seller, founder or SDR needs a LinkedIn profile that converts prospects instead of reading like a resume: "optimise my LinkedIn profile", "rewrite my headline", "make my profile buyer-focused", "why don't prospects accept my requests". | `--skill linkedin-profile-optimizer` |
| [Social selling routine](skills/social-selling-routine/SKILL.md) | A seller or founder wants a repeatable daily LinkedIn social selling routine that fits in 30-45 minutes: "build my social selling routine", "what should I do on LinkedIn every day", "how to sell on LinkedIn consistently". | `--skill social-selling-routine` |

### Multichannel

| Skill | What it does | Install |
| --- | --- | --- |
| [Cold call script](skills/cold-call-script/SKILL.md) | You need a B2B cold call script or talk track: "write a cold call script", "what do I say when they pick up", "help me prep cold calls for this list", "handle objections on the phone". | `--skill cold-call-script` |
| [Multichannel cadence](skills/multichannel-cadence/SKILL.md) | You need an outbound cadence that combines email, LinkedIn, phone and video so each touch builds on the last: "build a multichannel sequence", "combine email and LinkedIn outreach", "plan a 3-week cadence for Tier 1 accounts". | `--skill multichannel-cadence` |
| [Video prospecting script](skills/video-prospecting-script/SKILL.md) | You want to use short personalised videos in outbound: "write a prospecting video script", "personalised video for this account", "how do I use video in my sequence". | `--skill video-prospecting-script` |
| [Voicemail and voice note script](skills/voicemail-script/SKILL.md) | You need sales voicemails and LinkedIn voice notes that get remembered: "write a voicemail script", "what should I say in a voice note", "voicemail for a cold call follow-up". | `--skill voicemail-script` |

### Deliverability

| Skill | What it does | Install |
| --- | --- | --- |
| [Deliverability audit](skills/deliverability-audit/SKILL.md) | Cold emails land in spam or reply rates suddenly drop: "audit my email deliverability", "why are my emails going to spam", "check my sending setup", "open and reply rates fell off a cliff". | `--skill deliverability-audit` |
| [Domain warm-up plan](skills/domain-warmup-plan/SKILL.md) | You set up new domains or mailboxes for cold email and need a warm-up plan: "how do I warm up a new domain", "warm-up schedule for new inboxes", "how fast can I ramp sending". | `--skill domain-warmup-plan` |
| [SPF, DKIM and DMARC setup](skills/email-authentication-setup/SKILL.md) | You need to set up or fix SPF, DKIM and DMARC for a sending domain: "set up SPF DKIM DMARC", "my DMARC is failing", "write my SPF record", "meet bulk sender requirements". | `--skill email-authentication-setup` |
| [Sending capacity planner](skills/sending-capacity-planner/SKILL.md) | You need to know how many mailboxes, domains and LinkedIn accounts a meeting target requires, or how much a team can safely send: "how many inboxes do I need", "plan our sending capacity", "can we hit 40 meetings a month". | `--skill sending-capacity-planner` |

### Replies & Meetings

| Skill | What it does | Install |
| --- | --- | --- |
| [Discovery call prep](skills/discovery-call-prep/SKILL.md) | You have a discovery or first sales call coming up and want to run it well: "prep me for this discovery call", "what questions should I ask", "build a discovery call agenda", "call plan for tomorrow". | `--skill discovery-call-prep` |
| [Meeting booking reply](skills/meeting-booking-reply/SKILL.md) | A prospect shows interest and you need to turn it into a booked, confirmed meeting: "they said yes, what do I send", "book the meeting", "write the meeting confirmation", "reduce back and forth scheduling". | `--skill meeting-booking-reply` |
| [No-show recovery](skills/no-show-recovery/SKILL.md) | A prospect misses a booked meeting or keeps rescheduling: "they didn't show up", "no-show follow-up email", "how to rebook a no-show", "reduce no-shows". | `--skill no-show-recovery` |
| [Objection handler](skills/objection-handler/SKILL.md) | A prospect raises an objection in a reply, on a call or in a deal: "how do I respond to 'too expensive'", "handle this objection", "build an objection handling guide", "they said they're happy with their current vendor". | `--skill objection-handler` |
| [Reply handler](skills/reply-handler/SKILL.md) | Outbound replies need triage and answers: "sort these replies", "draft responses to my inbox", "what do I say to this reply", "handle replies from my campaign". | `--skill reply-handler` |

### Deals & Pipeline

| Skill | What it does | Install |
| --- | --- | --- |
| [Closed-lost reactivation](skills/closed-lost-reactivation/SKILL.md) | You want to revive closed-lost deals and old opportunities: "re-engage lost deals", "win back closed lost opportunities", "reactivation campaign", "which lost deals should we try again". | `--skill closed-lost-reactivation` |
| [Deal qualification (MEDDICC)](skills/deal-qualification/SKILL.md) | You need to qualify a B2B deal or check its health: "qualify this opportunity", "MEDDICC this deal", "is this deal real", "score my opportunity". | `--skill deal-qualification` |
| [Mutual action plan](skills/mutual-action-plan/SKILL.md) | A B2B deal needs a shared plan to get from evaluation to signature and go-live: "build a mutual action plan", "close plan for this deal", "what are the steps to sign", "deal keeps slipping". | `--skill mutual-action-plan` |
| [Pipeline review](skills/pipeline-review/SKILL.md) | A manager or founder needs to review the sales pipeline and forecast: "review my pipeline", "prep for the forecast call", "which deals are at risk", "is our quarter going to land". | `--skill pipeline-review` |
| [Proposal follow-up](skills/proposal-follow-up/SKILL.md) | A proposal or quote has been sent and the buyer has gone quiet or is stalling: "follow up on my proposal", "they have the quote but no decision", "proposal stuck in review". | `--skill proposal-follow-up` |
| [Win-loss analysis](skills/win-loss-analysis/SKILL.md) | You want to learn why deals are won and lost: "run a win-loss analysis", "why are we losing to competitor X", "analyse last quarter's closed deals", "prepare win-loss interviews". | `--skill win-loss-analysis` |

### Positioning & Messaging

| Skill | What it does | Install |
| --- | --- | --- |
| [Case study writer](skills/case-study-writer/SKILL.md) | You need a B2B customer case study or success story that sales can use: "write a case study", "turn this customer interview into a story", "customer success story for our website", "one-pager for sales". | `--skill case-study-writer` |
| [Competitive battlecard](skills/competitive-battlecard/SKILL.md) | Reps need a one-page battlecard to win against a specific competitor: "make a battlecard for X", "how do we beat X", "competitive talk track", "what to say when they mention X". | `--skill competitive-battlecard` |
| [Messaging matrix](skills/messaging-matrix/SKILL.md) | One message does not fit every buyer and you need messaging by persona, industry or stage: "build a messaging matrix", "tailor our pitch for each persona", "different messages for CFO and CTO", "sales messaging framework". | `--skill messaging-matrix` |
| [Value proposition builder](skills/value-proposition-builder/SKILL.md) | You need a sharp B2B value proposition: "write our value prop", "our messaging is generic", "how do we describe what we do", "homepage headline", "one-liner for outbound". | `--skill value-proposition-builder` |

### RevOps & Analytics

| Skill | What it does | Install |
| --- | --- | --- |
| [Campaign performance analyzer](skills/campaign-performance-analyzer/SKILL.md) | You need to understand how outbound campaigns are performing and what to change: "analyse my campaign results", "why is this sequence underperforming", "compare my campaigns", "weekly outbound report". | `--skill campaign-performance-analyzer` |
| [CRM hygiene audit](skills/crm-hygiene-audit/SKILL.md) | CRM data is messy and reports cannot be trusted: "audit our CRM", "clean up our CRM data", "duplicates and missing fields", "why is our pipeline report wrong". | `--skill crm-hygiene-audit` |
| [Outbound A/B test](skills/outbound-ab-test/SKILL.md) | You want to test what works in outbound instead of guessing: "A/B test my cold emails", "design an outbound experiment", "which variant won", "testing plan for our sequences". | `--skill outbound-ab-test` |
| [Outbound math](skills/outbound-math/SKILL.md) | You need to turn a revenue or pipeline target into outbound activity: "how many emails to hit quota", "reverse funnel calculator", "how many SDRs do we need", "what activity does our pipeline target require". | `--skill outbound-math` |

### Content, SEO & AEO

| Skill | What it does | Install |
| --- | --- | --- |
| [AEO answer optimizer](skills/aeo-answer-optimizer/SKILL.md) | You want your brand recommended and cited by AI assistants and answer engines (ChatGPT, Claude, Gemini, Perplexity, AI Overviews): "answer engine optimisation", "get cited by ChatGPT", "AEO audit", "why doesn't AI recommend us", "generative engine optimization". | `--skill aeo-answer-optimizer` |
| [Comparison page writer](skills/comparison-page-writer/SKILL.md) | You need a comparison or alternatives page that ranks and converts: "write an X vs Y page", "competitor alternatives page", "best alternatives to X", "comparison landing page". | `--skill comparison-page-writer` |
| [Lead magnet builder](skills/lead-magnet-builder/SKILL.md) | You need a B2B lead magnet that attracts real buyers, not just downloads: "create a lead magnet", "what should we gate", "ideas for a free resource", "build a template or calculator for lead gen". | `--skill lead-magnet-builder` |
| [SEO content brief](skills/seo-content-brief/SKILL.md) | You need a B2B SEO content brief that a writer can turn into a page that ranks and converts: "write an SEO brief", "content brief for this keyword", "plan a blog post that ranks", "outline for a landing page". | `--skill seo-content-brief` |

### ABM & Expansion

| Skill | What it does | Install |
| --- | --- | --- |
| [ABM account plan](skills/abm-account-plan/SKILL.md) | You run account-based marketing or sales on a short list of named accounts: "build an ABM plan", "account plan for our top 20", "how do we break into this enterprise account", "1:1 ABM program". | `--skill abm-account-plan` |
| [Event follow-up](skills/event-follow-up/SKILL.md) | You need to turn a conference, trade show, webinar or roundtable into pipeline: "follow up with event leads", "post-webinar email", "trade show follow-up sequence", "pre-event outreach to book meetings". | `--skill event-follow-up` |
| [Expansion opportunity finder](skills/expansion-opportunity-finder/SKILL.md) | You want to grow revenue from existing customers: "find upsell and cross-sell opportunities", "which customers are ready to expand", "net revenue retention plan", "expansion playbook". | `--skill expansion-opportunity-finder` |
| [Referral ask](skills/referral-ask/SKILL.md) | You want introductions and referrals from happy customers, partners or your network: "ask for a referral", "get warm intros", "customer referral program", "write an introduction request". | `--skill referral-ask` |

### Enablement & Leadership

| Skill | What it does | Install |
| --- | --- | --- |
| [Call coaching scorecard](skills/call-coaching-scorecard/SKILL.md) | A manager or rep wants feedback on sales calls: "score this call", "review my discovery call transcript", "coaching feedback for my SDR", "build a call scorecard". | `--skill call-coaching-scorecard` |
| [GTM global rules](skills/gtm-global-rules/SKILL.md) | An agent is about to do any go-to-market work that touches real prospects, customers, a CRM, an inbox or a sending account: writing outreach, enriching lists, updating records, replying to buyers or reporting numbers. | `--skill gtm-global-rules` |
| [SDR onboarding plan](skills/sdr-onboarding-plan/SKILL.md) | You hire SDRs or BDRs and need them productive fast: "30-60-90 day plan for a new SDR", "SDR onboarding program", "ramp plan for new reps", "how to train new BDRs". | `--skill sdr-onboarding-plan` |

<!-- catalog:end -->

## How a skill is built

```
skills/
  cold-email-writer/
    SKILL.md              # the skill: frontmatter + the play, judgment and rules
    references/           # optional depth the skill points to: rubrics, examples, templates
      cold-email-frameworks.md
authors/
  prosyo.md               # who wrote it; every skill credits its author
```

- **Tool-agnostic.** Skills speak in GTM verbs ("check the CRM", "pull the list"), never vendor names, so they work on any stack.
- **Judgment, not checklists.** Every skill has a `## What good looks like` and a `## Rules` section.
- **Human in the loop.** Skills draft, score and research freely; anything that sends, deletes or bulk-changes waits for a person's approval. See [GLOBAL_RULES.md](GLOBAL_RULES.md).
- **Spec-compliant.** Frontmatter follows the open Agent Skills format (`name`, `description`, `license`, `metadata`).

## Contribute a skill

You know a play that works? Add it. Paste this into Claude, Codex or any capable agent:

> Fetch https://raw.githubusercontent.com/prosyo-ai/gtm-skill/main/AGENTS.md and follow its submission flow. Interview me about my GTM play (the real numbers, rubrics and examples), draft it in their format with reference pages, validate it and open the pull request.

Or by hand: read [CONTRIBUTING.md](CONTRIBUTING.md), copy [templates/skill/](templates/skill/), run `node tools/validate.mjs`, open a PR. No git? [Submit through an issue](https://github.com/prosyo-ai/gtm-skill/issues/new?template=submit-skill.yml).

Merged skills appear on [prosyo.com/gtm-skills](https://prosyo.com/gtm-skills/) with your name on them.

## For tools and sites

`catalog.json` at the repo root is a machine-readable index of every skill (metadata, rendered HTML, references, install commands). It is rebuilt by CI on every merge with `node tools/build-catalog.mjs`, and `node tools/build-covers.mjs` renders a 1200×630 cover per skill into `assets/covers/` (used as the featured image and social card on the website). Contributors don't need to run it; CI does.

## License

MIT, see [LICENSE](LICENSE). Attribution stays with each skill's author.
