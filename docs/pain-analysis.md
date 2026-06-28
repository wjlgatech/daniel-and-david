# Pain2Gain, applied — the everyday pains of a 6-year-old, an 11-year-old, and their parents

A worked example of [Pain2Gain](principles/pain2gain.md): we ran the depth ladder + dimensions +
burden on real, evidence-based family pains, then turned the top ones into **small, safe, on-device
app concepts**. **Three are built and playable** — Conversation Spark, the Transition Timer, and the
Homework Chunker (see *The demos* below) — all surfaced in the
[apps gallery](../apps/web/public/apps.html); the rest stay scoped.

> **Honesty about depth:** these sit at **rung 2–4** of the [depth ladder](principles/pain2gain.md)
> — backed by developmental research (prevalence + mechanism), not just a survey. Before building
> each, a family runs the [Pain Dossier](principles/pain-dossier.md) to rung 4 on *their* child.

---

## 👧 The 6-year-old (top pains)

A 6-year-old's prefrontal cortex is still under construction — inhibitory control and working
memory (~2–3 items) are immature, and emotion regulation is still **co-regulated** with a caregiver
(the child borrows the adult's nervous system). So most "misbehavior" is a *capacity* gap, not a
choice (Zelazo/IES 2025; Eisenberg et al.).

| Pain | Dimension | Burden | App concept (on-device, no PII) |
|---|---|---|---|
| **Transition refusal** (can't stop one thing to start the next) | Behavioral | daily × high × 20-min meltdowns | Visual countdown + "what's next" picture cards (parent-set) |
| **Bedtime resistance** | Behavioral/Relational | nightly · ~32% of school-age kids weekly | Wind-down breathing animation + dimming + short audio story |
| **Emotion explosion / meltdown** | Psychological | multiple/week × high | "Volcano meter" 1–5 tap + 60-sec body-calming exercise |
| **Morning routine chaos** | Organizational | every school day × parent depletion | Child-run checklist with stars (parent sets tasks once) |
| **"I can't" / gives up instantly** | Meaning/Psych | per hard task · high meaning | "Try again" micro-moment: steps the task down + 20-sec growth-mindset clip |

## 🧒 The 11-year-old (top pains)

Early adolescence: the limbic system races ahead of the prefrontal cortex, **peer evaluation becomes
neurologically salient** (amygdala/insula light up to social exclusion), the **autonomy** need
sharpens (external control now feels *aversive*), and **11 is the median onset age for anxiety**
(Ryan & Deci 2020; SCAN 2009; NCS-R).

| Pain | Dimension | Burden | App concept (on-device) |
|---|---|---|---|
| **Homework overwhelm / avoidance** | Psych/Organizational | daily × high anxiety | Task-chunker: list → 15-min focused blocks (restores SDT *competence*) |
| **Academic identity threat** ("I'm not a math person") | Meaning/Psych | cumulative · self-reinforcing | Learning journal: separates *effort* from outcome + growth-mindset prompts |
| **Autonomy conflict with parents** | Relational | daily flashpoints | "Choice architect": parent sets the task *set*, child picks order/method |
| **Screen self-regulation failure** | Behavioral | daily conflict | "Intention contract": child commits *before* opening, gets own-authored reminder |
| **Emotional shutdown with parents** | Relational | daily · worsens with age | Low-friction end-of-day mood check (child→parent, on-device only) |

## 👪 The parents (top pains)

Three daily stress transitions (morning, pickup, evening); **screen-time conflict is near-universal**
(93% report conflict; 37% "almost always a fight" — Pew 2025); the **mental load is asymmetric**
(mothers carry ~71% of cognitive household labor); **sibling conflict** is the single most-cited
"painful experience of parenting"; and most parents *emotion-dismiss* under stress not from lack of
love but lack of a **usable protocol** (Gottman).

| Pain | Dimension | Burden | App concept (on-device) |
|---|---|---|---|
| **Can't get my kid to open up** | Relational | daily · 70% struggle · convos <10 min | ⭐ **Conversation Spark** — 3 interest-aligned opener questions to try tonight *(built — see below)* |
| **Morning routine battle** | Organizational | 5×/week × universal | Shared family morning dashboard (removes parent as the nagger) |
| **Screen-time conflict** | Behavioral | daily · 37% always a fight | Predictive 10/5-min end-warning + "save your game" (removes the *surprise*) |
| **Managing a big outburst** | Psych/Relational | multiple/week × depleting | Parent-side co-regulation coach (Gottman 5-step, on-screen, in the moment) |
| **Mental load / logistics** | Organizational | constant background drain | "Family brain": shared local task+calendar with school-year templates |

---

## The child-safety line — what we will **not** build

The research is blunt, and so are we ([safety](safety/)):

1. **No cloud emotion-profiling of under-13s.** COPPA's 2026 rules add emotional/behavioral data to
   protected categories. *Emotion data stays on-device, parent-visible only, never transmitted.*
2. **No AI-companion relationship for young kids.** A parasocial AI *replaces* caregiver
   co-regulation; it doesn't build self-regulation. *The tool is an instrument, not a friend.*
3. **No peer-comparison / leaderboards for preadolescents** — it *amplifies* the exact pain it claims
   to help (peer-exclusion neurology peaks at 11–13).
4. **No surveillance dressed up as "help"** — hidden monitoring erodes the trust (*relatedness*) that
   intrinsic motivation needs, and contradicts the 11-year-old's core task: autonomy.
5. **No autonomous mental-health handling.** *Flag distress to the parent, never to a chatbot.*

**Affirmative design rules** (every demo follows these): on-device processing · no child PII leaves
the device · parent-mediated setup · behavioral *scaffold* (cue/timer/checklist) over psychological
profiling · child→parent sharing only · **LLM-optional** — core works with no model call, and any
LLM use is **parent-facing only** (no child data).

---

## The demos we built — ⭐ Conversation Spark

**The pain:** *"I can't get my kid to open up."* (Parents; helps with both the 6- and 11-year-old.)
70% of parents struggle to have a real conversation with their child; the average is under 10
minutes. The mechanism (rung-4 causal chain): generic prompts ("how was school?") invite generic
answers ("fine"); under stress parents default to *emotion-dismissing*; they lack a ready
**protocol** of warm, open, interest-aligned openers — so the moment passes.

**The solution:** a parent picks the child's age + a couple of interests + the moment (dinner / car /
bedtime / big feelings) and gets **3 Gottman-style opener questions to try tonight** — open-ended,
non-threatening, feeling-friendly. A curated bank works **fully offline, no key, no data**. An
optional **"✨ fresh ideas"** button calls a free-LLM proxy (your key, your deploy) to generate
fresh, personalized openers — sending only the *age + interest tags the parent picked*, never the
child's name or any data.

> ▶️ **Play it:** [Conversation Spark](https://wjlgatech.github.io/daniel-and-david/demos/conversation-spark.html)
> · the LLM enhancement is wired but off until a maintainer deploys the proxy (see
> [`apps/web/DEPLOY.md`](../apps/web/DEPLOY.md)).

**Why it clears the safety line:** parent-facing (adults), no child PII, on-device core, LLM-optional
and parent-only. **Evidence:** Gottman emotion-coaching; SDT *relatedness*.

## The second demo — ⏳ Transition Timer

**The pain:** *transition refusal* — the #1 daily pain of a six-year-old (can't stop one activity to
start the next), worth ~20-minute meltdowns. The mechanism (rung-4): a 6-year-old's working memory
holds ~2–3 items and emotion is still *co-regulated*, so an abrupt "we're leaving now" is a genuine
*capacity* gap, not defiance. Two things prevent the meltdown — **predictability** (what's now /
what's next, in pictures a pre-reader can read) and **agency** (the child controls *when* to move on).

**The solution:** a grown-up taps a preset routine (Morning / Wind-down / Screen-time) or builds one
from picture-steps + minutes; the child then sees a big picture, a **shrinking countdown ring**, a
**1-minute warning**, and an always-visible **"Next:"** preview — and chooses when to advance. It
celebrates finishing and **never punishes**. No LLM, no network, nothing stored online.

> ▶️ **Play it:** [Transition Timer](https://wjlgatech.github.io/daniel-and-david/demos/transition-timer.html)

**Why it clears the safety line:** a pure **behavioral scaffold** (cue/timer/checklist) — exactly what
the [safety line](#the-child-safety-line--what-we-will-not-build) prescribes over anything
psychological; parent-set, on-device, no child name or data. **Evidence:** Zelazo/IES on executive
function; Eisenberg on co-regulation.

## The third demo — 📚 Homework Chunker

**The pain:** *homework overwhelm / avoidance* — the #1 daily pain of an eleven-year-old, carrying
high anxiety (11 is the median onset age for anxiety). The mechanism (rung-4): a big undifferentiated
pile reads as threat → avoidance; early-adolescent psychology makes **external control aversive** and
**competence** fragile, so "just do your homework" backfires.

**The solution:** the kid (not a parent) dumps in everything due, tags each as Quick/Medium/Big/Huge
(→ 15-minute blocks), then Focus mode runs **one block at a time** — a 15:00 timer with "done early"
and "+5 min", and a progress bar that fills as blocks clear. **They choose the order.** It's calm and
un-babyish (no confetti), ends with a quiet "Plan cleared. 💪". On-device, no LLM, no data.

> ▶️ **Play it:** [Homework Chunker](https://wjlgatech.github.io/daniel-and-david/demos/homework-chunker.html)

**Why it clears the safety line:** kid-facing → **LLM-free** (no AI companion/profiling for a minor);
on-device, no name/account/data; a behavioral scaffold built on **autonomy** (kid-owned) + **competence**
(small finishable wins). **Evidence:** Ryan & Deci (SDT autonomy/competence); chunking & task-initiation.

*All three top demos are now built. Further pains in the tables above remain scoped (same safety rules).*
