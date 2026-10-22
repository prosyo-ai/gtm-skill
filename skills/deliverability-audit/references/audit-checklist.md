# Deliverability audit checklist

## Authentication

| Check | Pass | Common failure |
| --- | --- | --- |
| SPF record exists | One TXT record starting `v=spf1` | Two SPF records (invalid), or missing |
| SPF lookups | 10 DNS lookups or fewer | Too many includes → permerror |
| SPF covers the sender | Sending service included | Mail sent by a tool not listed |
| DKIM | Signing enabled, key published, passes | Key published but signing not turned on |
| DMARC | `v=DMARC1` record at `_dmarc.domain` | Missing, or invalid syntax |
| Alignment | From domain aligns with SPF or DKIM domain | Sending service signs with its own domain |
| Reverse DNS / sending infrastructure | Handled by the mailbox provider | Self-hosted servers without PTR |

## Domain and mailbox setup

- Sending domains separate from the primary domain for cold volume.
- Domains older than 30 days before cold sending; warmed for 2-4 weeks.
- 2-5 mailboxes per domain.
- Real names on mailboxes, profile photos, a signature with company details.
- Sending domain redirects to the main website.
- Custom tracking domain if tracking is used.

## Metrics thresholds (per mailbox, 7-day window)

| Metric | Healthy | Warning | Stop |
| --- | --- | --- | --- |
| Bounce rate | < 2% | 2-5% | > 5% |
| Spam complaints | < 0.1% | 0.1-0.3% | > 0.3% |
| Reply rate | > 3% | 1-3% | < 1% sustained (check placement) |
| Daily volume | Within plan | +50% jump | Doubling overnight |

## Content risks

- More than one link, link shorteners, links to new or low-reputation domains.
- Images, attachments, heavy HTML templates.
- Open tracking pixel on cold email.
- Spam-pattern words, all caps, many exclamation marks.
- Identical copy to thousands of recipients (use variation).

## Recovery timeline for a damaged mailbox

| Week | Action |
| --- | --- |
| 1 | Pause cold sending; fix authentication and list issues; keep warm-up running |
| 2 | Resume at 10-15 cold emails a day to the best-fit, verified contacts |
| 3 | 20-25 a day if bounces < 2% and no complaints |
| 4+ | Back to normal volume if placement tests show inbox |

If a domain is listed on major blocklists or placement stays in spam after four weeks, retire it and move volume to healthy domains gradually.
