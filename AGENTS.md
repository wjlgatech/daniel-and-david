# AGENTS.md — guide for AI teammates

This file (and its twin `CLAUDE.md`) tells AI agents how to work in this repository. We are
an **AI-native** project: agents are first-class teammates. But the human is always the
**editor and the owner of the outcome.**

## What this repo is

A venture studio + learning academy raising two kids (Daniel, 11; David, 6) into wealth
creators and Kingdom builders. It holds:

- `docs/` — vision, principles, and a two-track curriculum.
- `ventures/` — real businesses built in the open. **Venture #1 = `kc-matchday-basecamp/`.**
- `apps/web/` — the academy's own static landing page.
- `agents/` — small, readable starter agents.

## How to work here

1. **Small, reversible changes.** One PR = one focused, complete change. No giant rewrites.
2. **Docs ship with code.** Behavior change ⇒ update `CHANGELOG.md` + the relevant human doc
   (`README.md` / `docs/**` / `ventures/**`) + this agent guide if agent-facing behavior
   changed. Same PR, no deferral. (Formatting/test-only changes are exempt.)
3. **Evals over vibes.** Prefer changes you can verify — a test, a checklist, a screenshot,
   a measurable metric. See `docs/principles/agentic-engineering.md`.
4. **Keep it child-safe and kind.** Children read this repo. Language, images, and topics
   stay appropriate. See `CODE_OF_CONDUCT.md`.
5. **Legal and honest in `ventures/`.** Respect every compliance gate and "do-not" list in
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
- Run `./scripts/check.sh` before opening a PR.
- Prefer plain, readable code and prose. If a 6-year-old's parent can't follow the *why*,
  simplify.

## When unsure

Ask in the PR or open a Discussion. A clarifying question is cheaper than a wrong large diff.
