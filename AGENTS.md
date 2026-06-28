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
  - `public/index.html` — landing page. Outbound doc links use **absolute** GitHub URLs (so they
    work hosted *and* from a local file) — keep that convention.
  - `public/app.html` — the **Builder Loop PWA** (installable, offline, dual-mode kid/parent). All
    family data is **on-device** (localStorage behind a `Store` seam); **no external scripts or
    network calls for user data** — never add analytics/CDN/fetch of user data here. Backed by
    `manifest.webmanifest`, `sw.js`, `icons/`. `scripts/check-webapp.sh` (in CI) guards the shell.
- `agents/` — small, readable starter agents.
- `.claude/` — the **agent toolkit**: skills, workflows, and hooks you can use here.
- `tools/` — installable plugins.

## Your toolkit

Before any **judgment call** (a venture decision, trusting a claim, reviewing a plan for what's
missing), use the **`critical-thinking` skill** (`.claude/skills/critical-thinking/`) — the 5W1H
grid. For a deep multi-perspective pass, run the **`critical-thinking-review` workflow**
(`.claude/workflows/`), which fans the grid across six agents and returns a verdict. See
[`.claude/README.md`](.claude/README.md) for the full toolkit and how to add to it. This is the
*same* thinking tool the human curriculum teaches — keep humans and agents in sync.

## How to work here

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
  `check-links.sh`, and `check-status-truth.sh` (the last fails if a public surface claims
  venture #1 is live/shipping while its README says "build not started").
- Prefer plain, readable code and prose. If a 6-year-old's parent can't follow the *why*,
  simplify.

## When unsure

Ask in the PR or open a Discussion. A clarifying question is cheaper than a wrong large diff.
