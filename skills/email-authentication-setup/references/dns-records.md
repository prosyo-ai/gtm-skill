# DNS records and alignment

## Record examples

| Record | Host | Type | Example value |
| --- | --- | --- | --- |
| SPF | `@` (the domain) | TXT | `v=spf1 include:_spf.mailprovider.example include:send.marketing.example ~all` |
| DKIM | `s1._domainkey` | CNAME or TXT | Value given by the sending service |
| DMARC (monitor) | `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; fo=1` |
| DMARC (enforce) | `_dmarc` | TXT | `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@yourdomain.com` |

Host names and include values above are placeholders; use the exact values each service documents.

## Alignment in plain words

DMARC passes when at least one of these is true:

- **SPF aligned**: the message passes SPF and the envelope sender domain (Return-Path) matches the visible From domain.
- **DKIM aligned**: the message has a valid DKIM signature whose `d=` domain matches the visible From domain.

Many services send with their own Return-Path, so SPF alignment fails even though SPF passes. That is why custom DKIM for each service matters most: it is usually the route to alignment.

Relaxed alignment (the default) accepts subdomains: `news.yourdomain.com` aligns with `yourdomain.com`.

## SPF lookup counting

Each of these costs one lookup: `include`, `a`, `mx`, `ptr`, `exists`, `redirect`. Nested includes inside an include also count. `ip4` and `ip6` cost nothing.

Ways to stay under 10:
- Move a high-volume service to a subdomain with its own SPF.
- Remove services you no longer use.
- Replace an include with its `ip4` ranges only if the service publishes stable ranges (otherwise this breaks when they change).

## Reading aggregate (rua) reports

Group rows by source IP and sending service:

| Source | Volume | SPF aligned | DKIM aligned | Verdict |
| --- | --- | --- | --- | --- |
| Mailbox provider | 12,400 | yes | yes | Good |
| Marketing platform | 8,100 | no | yes | Good (DKIM carries it) |
| Support desk | 640 | no | no | Fix: enable custom DKIM |
| Unknown IP range | 90 | no | no | Investigate: possible spoofing or a forgotten service |

Move to quarantine only when every legitimate source is aligned.
