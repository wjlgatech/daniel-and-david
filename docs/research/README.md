# Research library — compound, don't restart 📚

Every deep research pass we run gets **saved here as a cited synthesis**, so the next person (or
agent) starts from what we already know instead of re-researching from zero.

> **The rule (for humans and agents):** *Before* dispatching a new research agent, **search this
> folder.** If the topic is covered, build on it and only research the *delta*. After any new deep
> research, **add a distilled, cited doc here** and a row in the table below. This is wired into
> `/goal-10x` (`.claude/commands/goal-10x.md`) as a step-0 habit.

## What's in the library

| Topic | Key finding (1-line) | Used by |
|---|---|---|
| [Deep problem understanding](deep-problem-understanding.md) | Pain depth has a 6-rung ladder; root cause = 5W1H→5-Why; multi-dimensional (biopsychosocial-spiritual) | [Pain2Gain](../principles/pain2gain.md) |
| [Family pains (6yo · 11yo · parents)](family-pains.md) | Evidence-based top pains per persona + which are safe to turn into a tiny app | [pain-analysis](../pain-analysis.md), [Conversation Spark](../../apps/web/public/demos/conversation-spark.html) |
| [Founding-cohort selection](founding-cohort-selection.md) | Select on role-construction · autonomous motivation · conscientiousness · giving — never wealth/credentials | [founding-families](../founding-families.md) |
| [Kids/family app UX + PWA](kids-family-app-ux.md) | One-thing-per-screen · celebrate-don't-punish (Finch) · on-device · PWA install | [Builder Loop app](../../apps/web/public/app.html) |
| [OSS landing pages + honest scarcity](oss-landing-pages.md) | Specific-promise hero · proof · one CTA; real caps beat fake urgency | [landing page](../../apps/web/public/index.html), [the Halving](../founding-families.md) |
| [Agentic app cards + hosting](agentic-app-cards.md) | Model card = one file + YAML that made HF a platform; 10×-simpler app card = 6 fields; host = *mix* (static registry + HF Spaces/proxy per app) | [Agentic App Card](../agentic-app-card.md), [apps gallery](../../apps/web/public/apps.html) |

## How to use & extend
- **Reuse:** cite the relevant doc; pull its sources; only research what's genuinely new.
- **Add:** one `docs/research/<topic>.md` per pass — *findings + sources*, not a raw dump (distilled
  is more reusable). Add a row above. Note **where it's used** so stale research gets caught.
- **Level up (optional):** a synthesis here can be **`kgfy`'d** into an interactive knowledge graph
  or **`skillfy`'d** into a bounded agent skill when a topic earns it — the markdown is the durable
  base either way.

> Distinct from [`docs/solutions/`](../solutions/) (engineering learnings via `ce-compound`): this
> folder is **external research** (the world's evidence); that folder is **our** bugs/patterns.
