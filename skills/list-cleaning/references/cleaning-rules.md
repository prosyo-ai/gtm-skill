# Cleaning rules

## Names

| Raw | Clean | Rule |
| --- | --- | --- |
| JOHN SMITH | John Smith | Proper case all-caps names |
| john o'neil | John O'Neil | Capitalise after apostrophe |
| Dr. Sarah Lee, PhD | Sarah Lee | Strip honorifics and post-nominals |
| Ludwig van Beethoven | Ludwig van Beethoven | Keep lowercase particles: van, von, de, da, di, le |
| mcdonald | McDonald | Mc and Mac prefixes (check Mack, Macy exceptions) |
| J. | (flag) | Initial only: not usable as a first name |
| Jos├⌐ | José | Fix encoding before anything else |

## Companies

Strip for display: Inc, Inc., LLC, Ltd, Ltd., Limited, GmbH, AG, SA, S.A., BV, Pty Ltd, PLC, Corp, Corporation, Co., Holdings, Group (only when it is a suffix and the remainder is still recognisable).

Keep: "The" at the start only when it is how the company refers to itself. Brand casing like "eBay" or "iRobot" should be kept exactly as the company writes it on its site.

## Email risk

| Status | Action for cold email |
| --- | --- |
| Valid | Keep |
| Invalid, unknown mailbox | Remove |
| Catch-all (accept-all domain) | Keep for small Tier 1 lists; remove for volume campaigns or send to them last |
| Role address (info@, sales@, hello@, admin@, support@, careers@) | Remove |
| Disposable or temporary domain | Remove |
| Personal domain on a B2B list | Remove, or keep only if the person is a sole founder and the domain is their business |
| Previously bounced | Remove |

## Stale contacts

Flag for review when:
- The last verification is over 90 days old.
- The title or company in the list differs from the current public profile.
- The email domain differs from the company domain (possible acquisition or old job).

## Duplicate merge priority

When merging, keep values from the record with, in order: verified email, most recent update, most filled columns. Never merge two people who share only a first name and a domain.
