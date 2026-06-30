# AGENTS.md — guide for AI teammates

This file (and its twin `CLAUDE.md`) tells AI agents how to work in this repository. We are
an **AI-native** project: agents are first-class teammates. But the human is always the
**editor and the owner of the outcome.**

## What this repo is

A **family field lab** for raising wise, creative, AI-ready builders — anchored on two kids
(Daniel, 11; David, 6) and opening to other families. The public promise leads with
**capability** (think clearly, use AI responsibly, create value, serve people), *not* the money
ladder (which is a deliberately-demoted "venture track"). It holds:

- `docs/builder-loop/` — **the atomic unit**: the four-week family Builder Loop, run as **5 fast
  build-show-learn iterations** (fast · frequent · failing-forward), *not* one big reveal. Includes
  an `iteration-log.md` template and `scripts/builder-loop-log.sh` (a per-child log scaffolder;
  output `builder-loop-log-*.md` is git-ignored — it can hold a child's notes). Start here.
- `docs/vision/` — mission, the **Theory of Change + North Star metric**, and the two ladders
  (Capability Ladder = public/measured; money ladder = advanced venture track).
- `docs/safety/` — **child-safety governance** (read before any community/account/upload feature).
- `docs/founding-families.md` + `FOUNDERS.md` — **The Halving**: the founding-cohort program (honor
  halves each epoch, cohort doubles; Genesis = 8) and its public, consent-based ledger. The
  application form lives in `apps/web/public/index.html` and posts through one swappable
  `FORM` endpoint (mailto fallback). It is **adults-only** — never collect a child's identity;
  `scripts/check-registration-safety.sh` (in CI) enforces the honeypot/consent/adults-only/privacy
  guardrails. Privacy notice: `apps/web/public/privacy.html`.
- `docs/` — principles and a two-track curriculum (now written against measurable outcomes).
- `ventures/` — real businesses designed in the open. **Venture #1 = `kc-matchday-basecamp/`**
  (spec complete; **build not started** — say "pilot in design", never "live"/"shipping").
- `apps/web/` — the static site, **hosted on GitHub Pages**
  (`https://wjlgatech.github.io/daniel-and-david/`) via `.github/workflows/pages.yml`:
  - `public/index.html` — landing page (bold hero + a full-width **"See it work" showcase** that
    runs the three demos **live in inline phone-frame iframes**, plus an honest "AI, the safe way"
    note for the free-LLM seam). **Multilingual** (EN/中文/ES/한국어/日本語 via a `data-i18n`
    system + `I18N` dict + a 🌐 selector). **English is the source and the in-HTML default**; when you
    add/edit a `data-i18n` string you MUST update all 4 other languages — `scripts/check-i18n.sh`
    (in CI) fails otherwise. See `docs/i18n/`. Outbound doc links use **absolute** GitHub URLs (so
    they work hosted *and* from a local file) — keep that convention.
  - `public/app.html` — the **Builder Loop PWA** (installable, offline, dual-mode kid/parent;
    multiple children + history + Best-Flops; on-device **photo evidence** via an IndexedDB `Media`
    seam; **🎤 voice dictation** + a **WebXR AR-readiness** probe — see `docs/builder-loop-app-xr.md`).
    All family data is **on-device** (localStorage `Store` seam + IndexedDB `Media` seam); **no
    external scripts and no network calls for user data** — never add analytics/CDN/fetch of user
    data, and photos must stay on-device (never uploaded). Backed by `manifest.webmanifest`,
    `sw.js`, `icons/`. `scripts/check-webapp.sh` (in CI) enforces all of this. **Multilingual**
    core via a `STR` dict + `t()` (reuses `dd.lang`); English is the source — `check-i18n.sh` also
    verifies the app's `STR` stays in sync across all languages.
  - `public/apps.html` — the **apps gallery**: a static registry that renders an **Agentic App
    Card** for every small app we build (warm palette + modern card patterns). It reads
    `public/cards/registry.json`; the portable card standard is one `.md` per app in
    `public/cards/<slug>.md` (copy `_template.md`). The card's `host` field (`static`/`space`/
    `proxy`/`cli`/`concept`) is what lets the gallery **mix** apps that run on Pages, a HuggingFace
    Space, or our proxy. The standard (6 required fields, ~10× simpler than a HF model card) is
    documented in `docs/agentic-app-card.md`; `scripts/check-cards.sh` (in CI) enforces required
    fields, allowed vocab, honest status, and card↔registry sync. To add an app: copy the template,
    fill 6 fields, add a registry line, run the check.
  - `public/demos/` — small, playable on-device demo apps (e.g. `conversation-spark.html`,
    `transition-timer.html`, `homework-chunker.html`), each grounded in `docs/pain-analysis.md`. **Every demo must:** stay
    on-device (the privacy banner + no `<script src>`), collect **no child name/data**, and ship a
    matching card in `public/cards/` so it appears in the gallery. `check-webapp.sh` scans every demo
    for the on-device note + no child-name field + JS parse.
- `apps/web-agent/` — the **Builder Loop Coach** (🟡 spec-in-design / PR2 skeleton, **not deployed**):
  a voice-first **conversational** second door into the Builder Loop, built with **Next.js +
  CopilotKit** (a deliberate, scoped exception to the repo's "no build" norm). The agent *guides*
  a family through the 5-cycle SOP and **does real work** via CopilotKit actions
  (`recordCycleField`/`advanceCycle`), backed by the free-LLM **survival chain**
  (`lib/llm.ts`) with stream-init failover. Cloud brain is **adults-only** (`COACH_ADULT_TOKEN`)
  until the on-device WebLLM brain lands; all family data stays on-device (`lib/store.ts`). See
  `apps/web-agent/SPEC.md` (design + privacy model) and its `README.md` (run it). Modeled on the
  `wjlgatech/agentic-portfolio` reference build. The conversational-agent rules live in
  `docs/safety/ai-use-boundaries.md`.
- `agents/` — small, readable starter agents.
- `.claude/` — the **agent toolkit**: skills, workflows, hooks, and **project commands**
  (`commands/goal-10x.md` — a repo-tuned objective driver wired to the five checks; `commands/check.md`
  — run every guardrail). 1-click setup: `./scripts/setup.sh`.
- `tools/` — installable plugins.

## Your toolkit

Before any **judgment call** (a venture decision, trusting a claim, reviewing a plan for what's
missing), use the **`critical-thinking` skill** (`.claude/skills/critical-thinking/`) — the 5W1H
grid. For a deep multi-perspective pass, run the **`critical-thinking-review` workflow**
(`.claude/workflows/`), which fans the grid across six agents and returns a verdict. To understand
a **pain** at root-cause / first-principle depth (not just scope it), use
**[Pain2Gain](docs/principles/pain2gain.md)** — the depth ladder, 5-Why, the six dimensions of a
pain, burden, and the [Pain Dossier](docs/principles/pain-dossier.md) worksheet (reach rung 4, then
build — don't over-analyze). See
[`.claude/README.md`](.claude/README.md) for the full toolkit and how to add to it. This is the
*same* thinking tool the human curriculum teaches — keep humans and agents in sync.

## How to work here

0. **Compound research — don't restart.** Before any deep web research, check
   [`docs/research/`](docs/research/) (the cited research library); reuse it and research only the
   *delta*. After new research, add a distilled, cited doc there. (Wired into `/goal-10x` step 0.)
1. **Small, reversible changes.** One PR = one focused, complete change. No giant rewrites.
2. **Docs ship with code.** Behavior change ⇒ update `CHANGELOG.md` + the relevant human doc
   (`README.md` / `docs/**` / `ventures/**`) + this agent guide if agent-facing behavior
   changed. Same PR, no deferral. (Formatting/test-only changes are exempt.)
3. **Evals over vibes.** Prefer changes you can verify — a test, a checklist, a screenshot,
   a measurable metric. See `docs/principles/agentic-engineering.md`.
4. **Keep it child-safe and kind.** Children read, use, and contribute to this repo. Language,
   images, and topics stay appropriate, and the **hard rules in [`docs/safety/`](docs/safety/)
   bind agents too** — no child personal data, no private adult–child contact, no child–adult
   matching, public child contributions reviewed first, AI never replaces the child's own
   thinking. When a safety rule and a feature conflict, the rule wins and the feature waits.
   See also `CODE_OF_CONDUCT.md`.
5. **Tell the truth about status.** Never describe a planned thing as shipped. Venture #1 is
   "pilot in design / build not started," not "live." Match every public claim to reality —
   it's literally the first of our [4 questions](docs/principles/values.md).
6. **Legal and honest in `ventures/`.** Respect every compliance gate and "do-not" list in
   the venture specs. Never generate marketing that implies false affiliation, and never
   weaken a go/no-go gate.

## Venture #1 guardrails (KC Matchday Basecamp)

The spec at `ventures/kc-matchday-basecamp/SPEC.md` is authoritative. Hard constraints:

- **No protected branding.** Never use FIFA / World Cup / team / stadium / "official" /
  "Fan Festival" marks or imagery in code, seed data, or copy. Brand is generic + an
  independent-business disclaimer.
- **No food, alcohol, tickets, or counterfeit goods.** Ever.
- **Payments via Stripe; never store cards; never commit secrets.** Use `.env.example`.
- **Compliance gates are real.** Do not write code or copy that assumes an operating
  permission that the gates require to be verified first.

## Repo conventions

- Default branch: `main`. Branch names: `name/short-description`.
- Run `./scripts/check.sh` before opening a PR. CI also runs `validate-toolkit.sh`,
  `check-links.sh`, `check-status-truth.sh` (the last fails if a public surface claims
  venture #1 is live/shipping while its README says "build not started"),
  `check-registration-safety.sh`, `check-webapp.sh`, `check-i18n.sh`, `check-cards.sh`
  (app cards + gallery coherent), and `check-spark.sh` (free-LLM proxy: key stays server-side, no
  child data forwarded — runs `apps/web/api/spark.test.mjs`).
- **Free-LLM proxy** (parent-facing, NVIDIA NIM): an optional ✨ enhancement — **LIVE** at
  `https://daniel-and-david.vercel.app/api/spark` (`NIM_API_KEY` set in Vercel; Conversation Spark's
  `SPARK.endpoint` is wired to it; falls back to the offline bank if unavailable).
  One host-agnostic core (`apps/web/api/_spark-core.js`) is shared by the Vercel entry
  (`api/spark.js`) and the Netlify edge function (`netlify/edge-functions/spark.js`) — never fork the
  logic (`check-spark.sh` enforces both delegate to the core). Deploy via Vercel
  (`scripts/deploy-spark.sh`) or **Netlify** (`apps/web/netlify.toml`, git-integration like rbit-ai),
  then `scripts/set-spark-endpoint.sh <url|/api/spark>`. See `apps/web/DEPLOY.md`. Kid-facing demos
  stay LLM-free.
- Prefer plain, readable code and prose. If a 6-year-old's parent can't follow the *why*,
  simplify.

## When unsure

Ask in the PR or open a Discussion. A clarifying question is cheaper than a wrong large diff.
