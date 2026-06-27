# Contributing to Daniel & David

Welcome. This project is built **in the open** so that anyone — a curious kid, a parent, a
seasoned engineer, a designer, a marketer — can help raise the next generation of builders.
We are designed for **~100 contributions a day from around the world**. That only works if
every contribution is **small, clear, reviewable, and kind.**

## The one rule that makes 100/day work

> **One contribution = one small, complete, reviewable change.**

A typo fix is a contribution. A new curriculum exercise is a contribution. A cleaner sign
design for venture #1 is a contribution. You do **not** need to build something huge. Small
and finished beats big and stuck.

## Who can contribute (everyone)

| You are… | Great first contributions |
|---|---|
| 🧒 A kid / student | Try a curriculum exercise, then improve it. Suggest a venture idea. |
| 👨‍👩‍👧 A parent / teacher | Add an exercise, simplify an explanation, translate a page. |
| 💻 An engineer | Build a slice of the [venture #1 app](ventures/kc-matchday-basecamp/), fix a bug, add a test. |
| 🎨 A designer | Improve the academy landing page or the venture's signage/UI. |
| 📈 A marketer / operator | Sharpen the partner scripts, pricing, or go-to-market in `ventures/`. |
| ✍️ A writer / translator | Translate docs (Spanish, French, and more are explicitly wanted). |

## How to contribute (the loop)

1. **Find work.** Browse [good first issues](https://github.com/wjlgatech/daniel-and-david/contribute)
   or open an issue describing what you want to do.
2. **Claim it.** Comment "I'll take this" so we don't double up.
3. **Fork & branch.** `git checkout -b your-name/short-description`
4. **Make one small change.** Keep it focused. If it grows, split it.
5. **Check your work.** Run `./scripts/check.sh` (friendly pre-PR checks). If you touched docs
   or the agent toolkit, also run `./scripts/check-links.sh` and `./scripts/validate-toolkit.sh` —
   CI runs both, so catching issues locally saves a round-trip.
6. **Open a Pull Request.** Fill in the template. Link the issue. Describe the *why*.
7. **Respond to review.** We review fast and kindly. Iterate. Merge. 🎉

## What every change must include (the studio rule)

When you change behavior — a feature, an API/CLI surface, a data model, a config — include
**in the same PR**:

1. **A `CHANGELOG.md` entry** under `## [Unreleased]` — one line: *what* changed and *why*.
2. **The human doc** it touches (`README.md` or the relevant file under `docs/**` / `ventures/**`).
3. **The agent doc** if behavior for AI teammates changed (`CLAUDE.md` / `AGENTS.md`).

Docs ship *with* the code, never "later." Pure formatting, comments, or test-only changes
are exempt. (Genuinely doc-free change? Note it in the PR.)

## Style we hold

- **Be kind.** See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). This is a place where a
  6-year-old is watching how adults treat each other.
- **Explain like the reader is smart but new.** If a kid can't follow it, make it clearer.
- **Legal and honest, always.** Especially in `ventures/` — respect the compliance gates
  and the "do-not" lists. We win by being trustworthy.
- **Small, reversible steps.** Match the style of the code and docs around you.

## Working with AI (encouraged)

This is an AI-native project — using an AI pair (Claude, Codex, etc.) is welcomed, not
frowned upon. But **you are the editor.** Read what the AI writes, understand it, test it,
and take responsibility for it. See [docs/principles/agentic-engineering.md](docs/principles/agentic-engineering.md).

## Questions?

Open a [Discussion](https://github.com/wjlgatech/daniel-and-david/discussions) or an issue.
There are no dumb questions here — that's the whole point.

Thank you for helping build something good. 🌱
