# Pre-flight checklist

Run every item before a send, an enrollment or a bulk record change. Each line names the failure it prevents.

## Audience

| Check | How | Failure it prevents |
| --- | --- | --- |
| ICP fit | Sample 20 random rows and score them against the ICP. Stop if more than 3 miss. | A list built on the wrong filter, found after 2,000 sends. |
| Exclusions | Remove current customers, open opportunities owned by someone else, partners, competitors and the do-not-contact list. | Emailing a customer a cold pitch for the product they already pay for. |
| Opt-outs | Match on email, domain and LinkedIn URL, not just email. | Someone who unsubscribed from one address hearing from a colleague's mailbox. |
| Duplicates | One person, one sequence. Check across all active campaigns. | Two reps sending the same prospect two different first emails on the same day. |
| Recency | Skip anyone contacted in the last 90 days unless they replied positively. | Looking careless and triggering spam complaints. |

## Content

- Render three real records end to end. Look for empty merge fields, "Hi ,", wrong company names and broken links.
- Every personalised line traces to a source the agent saved. Delete any line that does not.
- Numbers and customer names come from the approved claims list only.
- The opt-out line is present where the region needs it.

## Sending

- Volume per mailbox and per LinkedIn account sits under the agreed caps. Typical safe ceilings: 30 to 50 cold emails per warmed mailbox per day, 15 to 25 LinkedIn invitations per account per day.
- Sending is spread across working hours in the prospect's time zone.
- Bounce and complaint stop-loss is set: pause at 3% bounces or 0.1% complaints.

## Approval

Show the approver one summary:

```
Action: enroll 412 contacts in "Q3 restaurant owners" (3 emails, 2 LinkedIn steps)
Senders: 4 mailboxes, about 25 new contacts per mailbox per day, 4 days to fully enroll
Excluded: 37 customers, 12 open deals, 9 opt-outs, 18 duplicates
Sample: 3 rendered emails attached
```

Wait for a clear yes. "Looks good" on a different summary is not approval for this one.

## Failures this catches, from real programs

- A list filter of "restaurants" pulled restaurant software vendors, competitors included.
- A merge field for first name held full names in capitals for 300 rows.
- A follow-up step referenced "the case study I sent" for prospects who never received step one because it bounced.
