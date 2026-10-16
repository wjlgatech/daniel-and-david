# Shepherd's Academy of War — the article series (written before any build)

**In plain words:** Paul started "Shepherd's Academy of War" (SAW) with his two sons on car rides. Before changing
this repo, the website or anything else, he is publishing five articles that test the idea in public. This page is
the plan for those articles and the scoreboard for whether they worked.

**For the engineer:** the articles are generated pages in the author's portfolio repository
(`content/series/saw/source/*.md` → `scripts/build-saw.py` → `public/articles/saw-*.html`, gated by
`scripts/check-saw.mjs`). This repo holds the research ([dossier](../research/shepherd-warrior-formation.md)), this
plan, and the signal ledger ([`signal.json`](signal.json), read by [`scripts/saw-signal.sh`](../../scripts/saw-signal.sh)).
**Status: published 2026-10-12** in English, with 15 of the 20 translated pages (Chinese, Spanish, Korean, Japanese);
the other 5 are queued by name. Reviewed twice by an independent reviewer (latest scores 82 to 85 against a bar of
85; not scored a third time). **SAW itself is not built, and this repo is not renamed.** Start reading at
[part 1](https://agentic-portfolio-lovat.vercel.app/articles/saw-academy-of-war-learn-the-attack.html).

## §0 — The request, evaluated

**The request, reflected back.** (1) Upgrade `daniel-and-david` to "SAW: Shepherd's Academy of War", an academy to
raise warriors who can win the last battle of Revelation 19–20, with instructors from special operations,
intelligence, combat sports, the Olympics and unusual businesses. (2) Then: research, design and write a series of
articles before any serious build, in the manner of the June LinkedIn article and the Play-Engineering series.
(3) Along the way: a defender must be trained as an attacker; the war is fought in every arena; children are
trained to break rules in order to keep their purpose.

**What was weak in it, said plainly.**

- *The mission sentence does not match its source.* In Revelation 19–20 the armies follow and one rider fights.
  Left as written, the sentence hands children a job the text gives to someone else. (Part 2 of the series is the
  correction, in the author's own voice.)
- *The first request built before it tested.* Rebranding a public site about two named children around the word
  "war", in the month a national survey tied that vocabulary to political violence, with no measure of how
  strangers read the name. The second request fixed this: articles first.
- *The instructor list was a wish stated as a roster.* No instructor is confirmed. This repo's first law is
  status truth, so the series says "wish list" and a gate refuses anything stronger.
- *There was no way to lose.* Nothing in the request said what result would mean "change it" or "stop".

**The 10X, defined so it can fail.** Not "a bigger academy". A series that produces a decision. See the next section.

## The 10X

By **2026-11-11** (30 days), [`signal.json`](signal.json) must hold these numbers, and `scripts/saw-signal.sh`
prints the verdict:

| Number | Pass | What it decides |
|---|---|---|
| `strangers_asked` and `strangers_heard_militant` | at least 20 asked, under half hear "militant" | Whether the public name stays |
| `reader_mission_numbers` | at least 10 mission results posted by readers across the five parts | Whether anyone but us runs it |
| `outside_reviewers_of_guest_rules` | at least 1 person qualified in child safeguarding has reviewed part 4 | Whether a first guest may be invited |
| `family_drills_run` | at least 4 weekly drills, with the children's own cards | Whether the drill survives contact with a seven-year-old |

**Supplementary, not one of the four:** `shepherd_demo_drills` counts families who ran the
[Shepherd's World Model](https://agentic-portfolio-lovat.vercel.app/play/shepherd.html), a world-model demo from Stanford's CS229
notes that uses SAW's shepherd picture (essay: [World Models Start in Six Lines of CS229](https://agentic-portfolio-lovat.vercel.app/articles/world-models-start-in-cs229.html)).
It is not the SAW build and never counts toward `family_drills_run`.

Four passes: design the first build (a SAW page in this repo, behind the same honesty gates). Any fail: fix that
thing first, and the build waits. A blank on the date counts as a fail and is said publicly.

## Decisions only the founder can make

1. **Approve the text.** The series speaks in Paul's voice about his sons and his faith, and part 2 tests a
   sentence he wrote. *Decided 2026-10-12: publish.*
2. **Translation credit.** The four other languages needed about 10 US dollars of API credit. *Decided 2026-10-12:
   credit added; the pipeline run followed.*
3. **The roster.** If any instructor has actually said yes, that is one number to change (`faculty_confirmed` in the
   series config) and one sentence to add. Until then the series says none.
4. **The name, after the signal.** Keep "Shepherd's Academy of War" in public, or keep it as the family's name and
   publish under a quieter one. Part 1's three tripwires are the rule.
5. **Whether this repo is renamed at all.** Recommendation: no. "Daniel & David" is the field lab; SAW would be one
   program inside it, and the two names in the title are already the academy's two houses.

## The spine

Five parts, one question each, each saying what it leaves to the others.

| Part | The one question | Slug |
|---|---|---|
| 1 · The name | What is Shepherd's Academy of War, and why keep the word "war" in a school for children? | [`saw-academy-of-war-learn-the-attack`](https://agentic-portfolio-lovat.vercel.app/articles/saw-academy-of-war-learn-the-attack.html) |
| 2 · The war | Where is the war fought, who wins the last battle, and what does that leave a child to train for? | [`saw-revelation-19-one-fighter`](https://agentic-portfolio-lovat.vercel.app/articles/saw-revelation-19-one-fighter.html) |
| 3 · The evidence | What actually builds courage and self-control in a seven-year-old and an eleven-year-old? | [`saw-courage-training-evidence`](https://agentic-portfolio-lovat.vercel.app/articles/saw-courage-training-evidence.html) |
| 4 · The teachers | How can an elite adult teach my child without ever being alone with my child? | [`saw-guest-instructors-content-not-contact`](https://agentic-portfolio-lovat.vercel.app/articles/saw-guest-instructors-content-not-contact.html) |
| 5 · The scorecard | How will we know whether it works, and what would make us stop? | [`saw-scorecard-drill-numbers-tripwires`](https://agentic-portfolio-lovat.vercel.app/articles/saw-scorecard-drill-numbers-tripwires.html) |

What every part carries: the one question and what it does not answer · a picture · five whys with evidence at
each step · a 30-day mission · operate, feedback, feedforward · the series table · five exits · a 30-minute build ·
TRUE · a self-score with evidence in every row · sources.

The five laws the series argues for: people are never the enemy · every fight ends in a rescue · fierce and gentle,
both to the nth · tested tools only · the last battle is not ours to win. The five arenas: body, money, information,
public life, spirit. The two houses: David (step forward and rescue) and Daniel (refuse, then offer a better rule).

## Operate

What runs today: the field lab at <https://daniel-and-david.vercel.app/>, the series gate in the portfolio
repository (it refuses an instructor claim while none is confirmed, violent language about people, illness described
as a spiritual verdict, a missing honest status, a verse that is not the World English Bible text, and a quotation
with no recorded source), and `scripts/saw-signal.sh` here.

## Feedback

`signal.json` is the measurement. What it cannot see: whether a child is braver or kinder. It counts whether the
idea travels, whether the name is misread, and whether the family keeps doing the drill. Those are the questions
that decide a build; they are not the questions that decide whether SAW is good for a child.

## Feedforward

Written before any result:

- Name read as militant by half or more of 20 strangers → the public name changes; the family keeps its nickname.
- No outside safeguarding review by the date → no guest is invited, however good the offer.
- Fewer than 4 drills run → the academy is an article series, and that is said plainly in part 5's update.
- Any child-safety concern raised by a reader → that part comes down until a responsible adult has reviewed it
  ([child-safety rule 10](../safety/child-safety.md)).
