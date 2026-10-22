# Security

Skills are instructions that agents run against live inboxes, CRMs and prospect data. We review every file before merge, and we take reports seriously.

## Report a problem

If a published skill could exfiltrate data, contains secrets or hidden endpoints, includes prompt-injection patterns, removes human approval before sending or bulk changes, or otherwise breaks [GLOBAL_RULES.md](GLOBAL_RULES.md):

- Open a private report through GitHub: **Security → Report a vulnerability** on this repository, with the skill name and the lines of concern.

Please do not open a public issue for a security problem. We aim to respond within two business days and will credit reporters who want credit.

## What we reject outright

- Sending data to any endpoint, inbox or webhook the reader does not own.
- Hardcoded secrets, tokens or credentials.
- "Ignore previous instructions" and similar injection patterns.
- Sending, deleting or bulk-editing without an explicit human approval step.
- Asking end users for passwords or credentials.
