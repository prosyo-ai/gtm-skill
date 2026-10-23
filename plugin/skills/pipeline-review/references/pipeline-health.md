# Pipeline health checks

## Coverage targets by win rate

| Win rate (created to won) | Healthy coverage |
| --- | --- |
| 15% | 5-6x |
| 20% | 4-5x |
| 25% | 3-4x |
| 33% | 2.5-3x |

Coverage counts only deals with close dates inside the period and stages past discovery.

## Risk scoring

| Check | Risk points |
| --- | --- |
| Close date moved 2+ times | 3 |
| No activity in 14+ days | 3 |
| No next step scheduled | 2 |
| Single-threaded | 2 |
| Economic buyer not met (proposal stage or later) | 3 |
| Aging: 1.5x+ average time in stage | 2 |
| Close date in the past | 3 |
| Champion not tested | 1 |
| Competitor preferred by buyer (stated) | 2 |

Risk: 0-2 low, 3-5 medium, 6+ high.

## Stage conversion sanity check

| Stage | Typical win probability (calibrate with your data) |
| --- | --- |
| Discovery | 10-15% |
| Evaluation | 25-35% |
| Proposal | 40-55% |
| Negotiation / verbal | 65-80% |
| Commit with paper process underway | 85-95% |

If the team's commit category historically closes below 80%, the commit rules are too loose.

## Weekly review flow (30 minutes)

1. Numbers: target, closed, gap, coverage (5 min).
2. Commit deals: confirm each with evidence (10 min).
3. Best-case deals: what moves them to commit (10 min).
4. Hygiene and pipeline creation: past dates, missing next steps, new pipeline needed (5 min).
