# The Builder Loop 🛠️

### A four-week family experiment — run as **5 fast iterations**, not one big reveal

This is the **atomic unit** of everything in this repo. Not a giant curriculum, not a global
hub — one small loop a family can actually run, finish, and repeat.

> **The promise, in one sentence:** in four weeks, a child runs **at least five quick
> build-show-learn cycles** — each one puts something real in front of a real person, fails at
> something, and gets a little better.

The old way is to plan for three weeks and reveal once. We do the opposite. **Fast, frequent,
failing-forward:** ship something tiny *this week*, watch a real person use it, learn what
broke, improve, repeat. You learn ten times more from five rough tries than from one polished
guess.

AI is the child's **teammate** the whole way — but the child stays the **mind and the
conscience**. The rule: *form your own first attempt before you ask the AI.* (See
[`docs/principles/values.md`](../principles/values.md) and the
[mission](../vision/mission.md).)

> ▶️ **Just want to run it?** Open the free **[Builder Loop app](https://wjlgatech.github.io/daniel-and-david/app.html)**
> — 1-click, no signup, installs to your home screen, works offline, keeps everything on your
> device. Prefer paper? Print the **[one-page family sheet](printable.md)** and copy the
> **[iteration log](iteration-log.md)** (one block per cycle). Devs can scaffold a dated log
> entry with `./scripts/builder-loop-log.sh` — see [Infrastructure](#infrastructure-that-keeps-you-iterating).

---

## The three rules (this is the whole philosophy)

| Rule | What it means | What it kills |
|---|---|---|
| ⚡ **Fast** | Each cycle is ~4–5 days and ships *something*, however rough (a v0.1). | Perfectionism, endless planning |
| 🔁 **Frequent** | Touch reality every cycle — show a real person, every time. | The "big reveal" that fails all at once |
| 💪 **Failing-forward** | A failure *with a lesson written down* is a **win**, not a setback. We celebrate it. | Fear of trying, hiding mistakes |

> **Climbing analogy:** nobody learns to climb by studying one perfect route for a month. You
> get on the wall, fall, adjust a foot, try again — fast, and often. Each fall *is* the lesson.
> *(Where it breaks: on a real climb a fall can hurt; here the whole point is that the falls are
> cheap — a $0 paper prototype, a rough drawing — so fail as much as you can afford to.)*

---

## The loop at a glance

<p align="center"><img src="../assets/builder-loop-4week.svg" alt="The Builder Loop: a repeating five-step micro-cycle — PICK the smallest next thing to test, BUILD it fast, SHOW it to one real person, LEARN what failed, DECIDE keep/change/drop — run about five times in four weeks. The principle is fast, frequent, failing-forward. Cadence: Week 1 Aim plus Iteration 1, Week 2 Iterations 2 and 3, Week 3 Iterations 4 and 5, Week 4 best version plus a family retro." width="100%"></p>

### Anatomy of **one** iteration (~4–5 days)

```text
PICK    →  BUILD   →  SHOW    →  LEARN    →  DECIDE  ─┐
the one    make it    to ONE     write what  keep /   │
smallest   fast &     real        failed +   change / │
thing to   rough      person      the lesson  drop    │
test                  (today!)                         │
  └──────────────  next iteration's PICK  ─────────────┘
```

Each iteration touches the **same six parts** (so it becomes a habit, not a surprise):

| Part | In one iteration |
|---|---|
| 🧒 **Child activity** | Pick → build the next tiny version → show it. |
| 👪 **Parent guide** | Hold the timebox, set up the "show" safely, protect the joy. |
| 🤖 **AI exercise** | Use the AI teammate — *after* a first human attempt — then verify it. |
| 🧠 **Independent thinking** | One step done *without* AI, to keep the child's own judgment strong. |
| 🌍 **Real-world action** | The "SHOW" — a real person uses it. Not a screen. Every cycle. |
| 📓 **Reflection** | The failure-lesson, written in the [iteration log](iteration-log.md). |

---

## The cadence — 5 iterations in 4 weeks

| When | Phase | What ships |
|---|---|---|
| **Week 1, days 1–3** | **🎯 Aim** (light) | Pick one problem; talk to 3 people; write one guess. *Don't over-plan — 3 days, max.* |
| **Week 1, days 4–7** | **Iteration 1** | A *rough* v0.1 (paper, drawing, a sentence) shown to one person. Expect it to flop. |
| **Week 2** | **Iterations 2 & 3** | Two fast cycles. Fix the biggest failure from last time, show again. |
| **Week 3** | **Iterations 4 & 5** | Two more. The thing is getting real now. |
| **Week 4** | **🏁 Best + Retro** | Best version to a real person; family retro: *what worked / failed / changed.* |

That's **5 build-show-learn iterations** plus an aim and a retro. More is fine — *faster is
better than bigger.* Fewer than 4 means the cycle is too slow; shrink what you build.

> **🎯 The Aim phase (keep it short).** Pick one *annoying / unfair / expensive / confusing /
> missing* problem. Run the **[5W1H grid](../curriculum/critical-thinking/)** on it and **talk to
> three real people** (an adult is present — see [child-safety](../safety/child-safety.md)).
> Write one sentence: "The real need is ___" (the child's words, not the AI's). Then **stop
> planning and start iterating** — you'll learn the rest by shipping.
>
> 🔎 **Want the pain understood deeply, not just noticed?** Run **[Pain2Gain](../principles/pain2gain.md)**
> on it — the depth ladder, the 5-Why root-cause drill, and which *side* of the pain is really live
> (psychological · relational · behavioral · organizational · spiritual). Get to **rung 4 (a causal
> chain), then build** — don't over-analyze. Worksheet: the [Pain Dossier](../principles/pain-dossier.md).

### What changes across the five iterations

You don't restart each time — each iteration builds on the last failure:

1. **v0.1 — the roughest thing that shows the idea.** A drawing, a paper mock, one sentence.
2. **v0.2 — fix the #1 thing that confused people.** Still rough.
3. **v0.3 — make it actually usable** by one person without you explaining it.
4. **v0.4 — polish the part people liked**, cut the part they ignored.
5. **v1.0 — the best small version**, handed to a real person for real.

Each version is a **hypothesis** ("I think people will ___"), tested against a real reaction.
Use the AI as a teammate at any step — first human attempt, then verify what it changed (find
one mistake it made and say how you checked).

---

## Infrastructure that keeps you iterating

The hard part isn't ideas — it's *keeping the cycles fast and logged.* So we give you scaffolding:

- 📋 **[Iteration log](iteration-log.md)** — copy it once per child/loop. One block per cycle:
  *hypothesis · what I built · who I showed it to · what failed · the lesson · decide next.*
  Filling a block is how an iteration "counts."
- 🖨️ **[Printable sheet](printable.md)** — the whole loop with five iteration tick-boxes; print
  and stick it on the fridge.
- 🛠️ **`./scripts/builder-loop-log.sh "<child>"`** — for the developer layer: appends a fresh,
  dated iteration block to `builder-loop-log-<child>.md` so logging takes ten seconds. Run it at
  the start of every cycle.

### The failing-forward ritual (this is how you *encourage* it)

Make failure safe and even fun, or kids will hide it and the loop dies:

- **Name the flop out loud.** Each cycle, the child says "this time, ___ didn't work" — and gets
  a high-five for finding it. (You're rewarding *honesty + learning*, not the mistake.)
- **One lesson per cycle, written down.** No lesson logged = the iteration isn't done.
- **Keep a "Best Flop" of the loop.** At the retro, celebrate the failure that taught the most.
- **Parents model it:** share one of *your* week's flops at dinner. Failing-forward is caught,
  not taught.

---

## How we know it worked (measurable outcomes)

The loop is graded on **iterations and lessons**, not polish. A loop "counts" when:

- ✅ the child completed **≥ 5 build-show-learn iterations** (each shown to a real person), and
- ✅ each iteration logged **≥ 1 failure-lesson**, and
- ✅ the child can independently do at least **four** of the capabilities below.

These roll up into the project's North Star — *Independent Builder Evidence per child per
month* — see the [Theory of Change](../vision/theory-of-change.md).

| Capability | What "done" looks like |
|---|---|
| Explain | State the problem and the solution in their own words. |
| Question | Find one unsupported claim and say what evidence would change their mind. |
| Interview | Run one real conversation and summarize the person's true need. |
| Test | Show their thing to a real person and report honest feedback — *every cycle.* |
| Build | Point to the series of versions they made (v0.1 → v1.0). |
| Revise | Name what they changed *because* of a specific failure. |
| Verify AI | Show one AI mistake they caught and how they checked. |
| Choose honesty | Name one shortcut they refused, and why. |

> **The science:** shipping fast and learning from each try is the documented way real things
> get built. Eric Ries's **Build–Measure–Learn** loop (*The Lean Startup*, 2011) is exactly
> this: smallest testable version → real feedback → learn → repeat. And learning research shows
> students who **struggle and fail first** understand more deeply than those taught up front
> (Kapur, 2008, *Productive Failure*) — see the [story](../marketing/the-daniel-and-david-story.md)
> for the full citations.

> **For parents/mentors:** the [curriculum tracks](../curriculum/) give age-tuned versions —
> [Daniel (11)](../curriculum/daniel-age-11/) iterates on pricing and code;
> [David (6)](../curriculum/david-age-6/) does the same cycles with drawings, counting, and
> greeting the customer.

> **Safety first.** Every real-world and AI step assumes adult supervision and the rules in
> [`docs/safety/`](../safety/). Read those before you run the loop with a child.
