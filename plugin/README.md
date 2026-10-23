# Prosyo GTM Skills

77 open-source go-to-market skills for Claude: research, prospecting, buying signals, cold email, LinkedIn, deliverability, reply handling, deals, positioning, RevOps, SEO and AEO.

Each skill teaches Claude how a strong operator runs one play, including what good output looks like and the common mistakes, with reference pages for rubrics and examples. Skills draft, research and analyse; anything that would send messages or change records in bulk waits for your approval.

## Install

In Claude Code (2.1.275 or later):

```
/plugin install prosyo-gtm-skills --marketplace prosyo-ai/gtm-skill
```

On older versions: `/plugin marketplace add prosyo-ai/gtm-skill`, then `/plugin install prosyo-gtm-skills@prosyo`.

## Use it

Ask in plain words. Claude loads the right skill on its own, for example:

- "Write a cold email to the Head of SDR at Lumen. They're hiring four SDRs."
- "Build our ICP from these 40 closed-won deals."
- "Audit our email deliverability. Reply rates dropped this month."

You can also call a skill directly: `/prosyo-gtm-skills:cold-email-writer`.

## Skills

### Research & ICP

- **Account research brief** (`account-research-brief`): use it when you need to research a target company before outreach, a first call or an account plan.
- **Buyer persona builder** (`buyer-persona-builder`): use it when you need B2B buyer personas that sales and marketing will actually use: before writing outreach to a new title, when messaging feels generic, or when a deal stalls because the wrong person is engaged.
- **Competitor teardown** (`competitor-teardown`): use it when you need to understand a competitor well enough to beat them: a deal is going head to head, a new competitor appeared, positioning needs a refresh, or reps keep losing on the same objection.
- **Customer interview guide** (`customer-interview-guide`): use it when you want to learn from customers or prospects in a structured interview.
- **ICP builder** (`icp-builder`): use it when you need to define or sharpen an ideal customer profile (ICP) for B2B sales: starting outbound, the reply rate is low, the pipeline is full of bad-fit deals, or leadership asks who we should really sell to.
- **Prospect research brief** (`prospect-research-brief`): use it when you need to research a specific person before reaching out or meeting them.
- **TAM, SAM and SOM calculator** (`tam-calculator`): use it when you need a credible market size for a B2B product: a board or investor deck, territory planning, deciding which segment to attack, or checking whether outbound has enough accounts to sustain a quota.

### Prospecting

- **Account tiering** (`account-tiering`): use it when you need to decide which accounts get the most effort.
- **Buying committee mapper** (`buying-committee-mapper`): use it when a B2B deal or target account needs more than one contact.
- **Lead list builder** (`lead-list-builder`): use it when you need a B2B lead list for outbound.
- **Lead scoring model** (`lead-scoring-model`): use it when you need a lead scoring model that sales trusts: inbound leads pile up unworked, marketing and sales argue about MQL quality, or reps chase the wrong leads first.
- **List cleaning** (`list-cleaning`): use it when a prospect or contact list needs cleaning before outreach or import.
- **Lookalike account finder** (`lookalike-account-finder`): use it when you want more accounts like your best customers.

### Signals

- **Buying signal scoring** (`buying-signal-scoring`): use it when you track buying signals and need to decide which ones deserve outreach today.
- **Funding signal outreach** (`funding-signal-outreach`): use it when a target company announces a funding round, acquisition or major investment and you want to reach out.
- **Hiring signal outreach** (`hiring-signal-outreach`): use it when a target company is hiring for roles your product supports or replaces.
- **Job change plays** (`job-change-plays`): use it when a contact changes jobs: a champion or happy user joins a new company, a new leader starts at a target account, or a key contact leaves a customer.
- **Post engagement outreach** (`post-engagement-outreach`): use it when people engage with LinkedIn posts (yours, your team's, a competitor's or an industry voice's) and you want to turn that engagement into conversations.
- **Tech stack signal outreach** (`tech-stack-signal-outreach`): use it when a company's technology choices are a buying signal for you.
- **Website visitor follow-up** (`website-visitor-follow-up`): use it when you know which companies visited your website and want to follow up without being creepy.

### Cold Email

- **Break-up email** (`breakup-email`): use it when you want to close the loop with a prospect who has not replied after several touches, or a deal that went silent.
- **Cold email sequence** (`cold-email-sequence`): use it when you need a complete cold email sequence (cadence) for a campaign.
- **Cold email writer** (`cold-email-writer`): use it when you need to write a B2B cold email that gets replies.
- **Email copy review** (`email-copy-review`): use it when you want an honest review of outreach copy before sending.
- **First line personalization** (`first-line-personalization`): use it when you need personalised first lines (icebreakers) for cold emails or LinkedIn messages at scale.
- **Follow-up email writer** (`follow-up-email-writer`): use it when you need to follow up after no reply, after a meeting, after a proposal or after a prospect went quiet.
- **Subject line writer** (`subject-line-writer`): use it when you need cold email subject lines that get opened and do not look like marketing.

### LinkedIn

- **LinkedIn comment strategy** (`linkedin-comment-strategy`): use it when you want to use LinkedIn comments to get noticed by target buyers before reaching out.
- **LinkedIn connection note** (`linkedin-connection-note`): use it when you need LinkedIn connection request notes that get accepted.
- **LinkedIn message sequence** (`linkedin-message-sequence`): use it when you need a LinkedIn outreach sequence that starts conversations instead of collecting ignored pitches.
- **LinkedIn post writer** (`linkedin-post-writer`): use it when you need LinkedIn posts that build pipeline, not just likes.
- **LinkedIn profile optimizer** (`linkedin-profile-optimizer`): use it when a seller, founder or SDR needs a LinkedIn profile that converts prospects instead of reading like a resume.
- **Social selling routine** (`social-selling-routine`): use it when a seller or founder wants a repeatable daily LinkedIn social selling routine that fits in 30-45 minutes.

### Multichannel

- **Cold call script** (`cold-call-script`): use it when you need a B2B cold call script or talk track.
- **Multichannel cadence** (`multichannel-cadence`): use it when you need an outbound cadence that combines email, LinkedIn, phone and video so each touch builds on the last.
- **Video prospecting script** (`video-prospecting-script`): use it when you want to use short personalised videos in outbound.
- **Voicemail and voice note script** (`voicemail-script`): use it when you need sales voicemails and LinkedIn voice notes that get remembered.

### Deliverability

- **Deliverability audit** (`deliverability-audit`): use it when cold emails land in spam or reply rates suddenly drop.
- **Domain warm-up plan** (`domain-warmup-plan`): use it when you set up new domains or mailboxes for cold email and need a warm-up plan.
- **SPF, DKIM and DMARC setup** (`email-authentication-setup`): use it when you need to set up or fix SPF, DKIM and DMARC for a sending domain.
- **Outreach compliance check** (`outreach-compliance-check`): use it when you need to check that cold email or LinkedIn outreach follows privacy and anti-spam rules before it goes out.
- **Sending capacity planner** (`sending-capacity-planner`): use it when you need to know how many mailboxes, domains and LinkedIn accounts a meeting target requires, or how much a team can safely send.

### Replies & Meetings

- **Discovery call prep** (`discovery-call-prep`): use it when you have a discovery or first sales call coming up and want to run it well.
- **Meeting booking reply** (`meeting-booking-reply`): use it when a prospect shows interest and you need to turn it into a booked, confirmed meeting.
- **No-show recovery** (`no-show-recovery`): use it when a prospect misses a booked meeting or keeps rescheduling.
- **Objection handler** (`objection-handler`): use it when a prospect raises an objection in a reply, on a call or in a deal.
- **Reply handler** (`reply-handler`): use it when outbound replies need triage and answers.

### Deals & Pipeline

- **Closed-lost reactivation** (`closed-lost-reactivation`): use it when you want to revive closed-lost deals and old opportunities.
- **Deal qualification (MEDDICC)** (`deal-qualification`): use it when you need to qualify a B2B deal or check its health.
- **Mutual action plan** (`mutual-action-plan`): use it when a B2B deal needs a shared plan to get from evaluation to signature and go-live.
- **Negotiation playbook** (`negotiation-playbook`): use it when a B2B deal reaches pricing, discount or contract negotiation.
- **Pipeline review** (`pipeline-review`): use it when a manager or founder needs to review the sales pipeline and forecast.
- **Proposal follow-up** (`proposal-follow-up`): use it when a proposal or quote has been sent and the buyer has gone quiet or is stalling.
- **Sales demo script** (`sales-demo-script`): use it when you need to plan or run a B2B product demo that moves the deal forward.
- **Win-loss analysis** (`win-loss-analysis`): use it when you want to learn why deals are won and lost.

### Positioning & Messaging

- **Case study writer** (`case-study-writer`): use it when you need a B2B customer case study or success story that sales can use.
- **Competitive battlecard** (`competitive-battlecard`): use it when reps need a one-page battlecard to win against a specific competitor.
- **Messaging matrix** (`messaging-matrix`): use it when one message does not fit every buyer and you need messaging by persona, industry or stage.
- **Value proposition builder** (`value-proposition-builder`): use it when you need a sharp B2B value proposition.

### RevOps & Analytics

- **Campaign performance analyzer** (`campaign-performance-analyzer`): use it when you need to understand how outbound campaigns are performing and what to change.
- **CRM hygiene audit** (`crm-hygiene-audit`): use it when CRM data is messy and reports cannot be trusted.
- **Outbound A/B test** (`outbound-ab-test`): use it when you want to test what works in outbound instead of guessing.
- **Outbound math** (`outbound-math`): use it when you need to turn a revenue or pipeline target into outbound activity.

### Content, SEO & AEO

- **AEO answer optimizer** (`aeo-answer-optimizer`): use it when you want your brand recommended and cited by AI assistants and answer engines (ChatGPT, Claude, Gemini, Perplexity, AI Overviews).
- **Comparison page writer** (`comparison-page-writer`): use it when you need a comparison or alternatives page that ranks and converts.
- **Lead magnet builder** (`lead-magnet-builder`): use it when you need a B2B lead magnet that attracts real buyers, not just downloads.
- **SEO content brief** (`seo-content-brief`): use it when you need a B2B SEO content brief that a writer can turn into a page that ranks and converts.

### ABM & Expansion

- **ABM account plan** (`abm-account-plan`): use it when you run account-based marketing or sales on a short list of named accounts.
- **Churn win-back** (`churn-win-back`): use it when you want former customers back.
- **Event follow-up** (`event-follow-up`): use it when you need to turn a conference, trade show, webinar or roundtable into pipeline.
- **Expansion opportunity finder** (`expansion-opportunity-finder`): use it when you want to grow revenue from existing customers.
- **Referral ask** (`referral-ask`): use it when you want introductions and referrals from happy customers, partners or your network.
- **Renewal risk review** (`renewal-risk-review`): use it when renewals are coming up and you need to know which customers might not renew.

### Enablement & Leadership

- **Call coaching scorecard** (`call-coaching-scorecard`): use it when a manager or rep wants feedback on sales calls.
- **GTM global rules** (`gtm-global-rules`): use it when an agent is about to do any go-to-market work that touches real prospects, customers, a CRM, an inbox or a sending account: writing outreach, enriching lists, updating records, replying to buyers or reporting numbers.
- **Sales playbook builder** (`sales-playbook-builder`): use it when you need a written sales playbook a team can actually follow.
- **SDR onboarding plan** (`sdr-onboarding-plan`): use it when you hire SDRs or BDRs and need them productive fast.

## Source and contributions

Skills are maintained in the open at https://github.com/prosyo-ai/gtm-skill. Browse them at https://prosyo.com/gtm-skills/. MIT licensed.
