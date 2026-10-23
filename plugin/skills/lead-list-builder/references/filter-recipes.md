# Filter recipes

## Title keyword patterns

Titles are messy. Use include and exclude keyword sets rather than exact titles.

| Persona | Include | Exclude |
| --- | --- | --- |
| Sales leader | VP Sales, Head of Sales, Chief Revenue, CRO, Sales Director | Assistant, Intern, Coordinator, "Sales Operations" (separate persona) |
| SDR leader | Sales Development, SDR Manager, BDR Manager, Head of SDR | Representative, Associate |
| RevOps | Revenue Operations, Sales Operations, RevOps, GTM Operations | Analyst (unless targeting users) |
| Marketing leader | CMO, VP Marketing, Head of Marketing, Head of Growth, Demand Generation | Coordinator, Specialist, Intern |
| Operations | COO, VP Operations, Head of Operations, Director of Operations | Operations Assistant, Clerk |
| Founder | Founder, Co-founder, CEO (at under 50 employees) | Founder of unrelated side businesses (check the company) |

Seniority filters alone miss titles like "Head of"; keyword includes catch them.

## Exclusions people forget

- **Lookalike vendors.** Searching "payroll" returns payroll software companies, not companies with payroll pain.
- **Agencies and consultants** who describe themselves with your buyer's keywords.
- **Subsidiaries and parents** of current customers.
- **Former customers** who churned in the last 6 months (route to a win-back play instead).
- **Recruiters and job seekers** whose headlines contain the target title.
- **Students and "aspiring" profiles.**
- **Investors** at firms with your target industry in their description.

## Size bands that behave differently

| Headcount | Typical buyer | Notes |
| --- | --- | --- |
| 1-10 | Founder | Fast, price-sensitive, decides alone |
| 11-50 | Founder or first functional leader | Buyer is often also the user |
| 51-200 | Functional leader (VP, Head of) | First process and tool decisions |
| 201-1,000 | Director plus VP sign-off | Committee forms, procurement appears |
| 1,000+ | Committee | Security review, long cycles, multi-threading required |

## Recipe example

```
Accounts: industry = logistics, 3PL, freight forwarding
          headcount 50-500
          region = US, Canada
          hiring: any open role containing "operations" or "warehouse" in last 60 days
          exclude: description contains "software", "platform", "SaaS"
Contacts: include VP Operations, Director of Operations, Head of Operations, COO
          exclude assistant, coordinator, intern
          max 2 per account
Expected: about 1,100 accounts, about 1,700 contacts before cleaning
```
