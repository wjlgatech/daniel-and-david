# Status board

**In plain words:** one page that says what is done, what is happening, what the agent does next, and the few things
only Paul can decide. A new session (or a new machine) starts here instead of from anyone's memory.

**For the engineer:** hand-kept, updated in the same PR as the work it describes. The `✋ Paul` column may hold only
**direction** (what to build, priorities, anything said or posted in Paul's name), **money** (with the price) or
**eval** (a judgment only his taste can make). A mechanical step in that column is a defect: the agent does it.

*Last updated: 2026-10-23.*

## Shepherd's Academy of War (SAW) — the article series

| | |
|---|---|
| ✅ Done | Five articles live in all five languages (25 pages): [part 1](https://agentic-portfolio-lovat.vercel.app/articles/saw-academy-of-war-learn-the-attack.html) · [2](https://agentic-portfolio-lovat.vercel.app/articles/saw-revelation-19-one-fighter.html) · [3](https://agentic-portfolio-lovat.vercel.app/articles/saw-courage-training-evidence.html) · [4](https://agentic-portfolio-lovat.vercel.app/articles/saw-guest-instructors-content-not-contact.html) · [5](https://agentic-portfolio-lovat.vercel.app/articles/saw-scorecard-drill-numbers-tripwires.html). Plan and ledger: [`saw/SERIES.md`](saw/SERIES.md), [`saw/signal.json`](saw/signal.json). README leads with SAW; first drill in [`saw/drills/`](saw/drills/). |
| 🔄 Doing | Waiting on the signal: all four numbers in `signal.json` are still `null`; due **2026-11-11** (`./scripts/saw-signal.sh`). |
| ⏭ Next (agent) | Draft the SBR companion article (Shaky · Bouncy · Rotating, any order) through the portfolio's SAW gate, five languages in one PR. Re-check every source on 2027-01-11. |
| ✋ Paul | **Direction:** post part 1 on LinkedIn (the share button at the bottom of the page; the text is prefilled). **Eval:** run the car-ride drill weekly and say the count; ask strangers how the name sounds and say the tally. **Direction:** if any instructor has said yes, say who. |

## SAW test case 1: a geometry coach

The first test of SAW's aim (turn a child who fears mathematics into a first-principles thinker and problem-maker),
built with a partner teacher in a separate **private** repository (`wjlgatech/geometry-coach`; the teacher's problem
bank and any student file never come here). Prototype live at <https://geometry-coach.vercel.app>.

| | |
|---|---|
| ✅ Done | Research (fear, AI tutors, transfer), a spec with 30-day numbers, a prototype: diagnose → pick the next problem with a reason → hints → answer locked until an attempt → teacher agrees or corrects. |
| 🔄 Doing | Round 1 sent to the teacher on 2026-10-23 (letter + 10 golden cards in the app's private teacher room); his answers apply themselves every 10 minutes. |
| ⏭ Next (agent) | Watch for answers the applier can't take on its own; scale past 10 golden cards once the keep-rate is ≥ 0.8; three "add a dimension" cards by 2026-11-21. |
| ✋ Paul | **Direction:** where the pilot students are; ownership with the teacher in writing; who holds guardian consent. **Eval:** try it as a student. |

## SAW first principles: five demos for the boys

| | |
|---|---|
| ✅ Done | [Up a Dimension](https://daniel-and-david.vercel.app/demos/up-a-dimension.html): the five demos (water ring, six matchsticks, folded paper, twenty doublings, ruler lever), each a real thing on the table plus an exact screen version; the child's words are kept on the device. |
| ⏭ Next (agent) | When the five sentences come back, log them in SAW's first-principles ledger (due 2026-11-21). |
| ✋ Paul | **Eval:** run the five with the boys (about 10 minutes each), write each one's words before showing the answer, then press "Copy all answers" and paste them to me. |

## Not SAW

Venture #1 ([`ventures/kc-matchday-basecamp/`](../ventures/kc-matchday-basecamp/)) stays "pilot in design, build not
started" (gated by `scripts/check-status-truth.sh`).
