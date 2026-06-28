---
name: goal-10x
description: Drive any objective in this repo to green — research → absorb → drive against the repo's own checks → coach → self-improve. Project-tuned for Daniel & David.
argument-hint: <a goal, a messy dump, a link, or "review X">
---

# /goal-10x — the objective driver (Daniel & David edition)

A project-local, lighter cousin of the global `goal-10x`. It uses **this repo's own verification
harness** as the source of truth, so anyone who clones the repo gets a working driver with no
global setup.

**Your input:** $ARGUMENTS

Work the loop:

## 0. Research & understand (3–4 lines)
- `git log --oneline -15`, skim `README.md`, `AGENTS.md`, `CHANGELOG.md` (esp. "Investigated /
  Rejected"), and any `memory/`. Know what shipped and what's load-bearing.
- State what you understood: the codebase, recent lessons, and the user's real intent.

## 1. Absorb
Parse the input into: sources · explicit objectives · implied objectives · what "done" looks
like · genuine forks. Reflect it back in ≤6 lines so the user can correct in one reply.

## 2. Coach while you work
Ask clarifying questions ONLY at genuine forks (≤2). Explain decisions at the user's level; name
the breaking point of any analogy. Children read this repo — keep everything kind and clear.

## 3. Drive to green
Small, reversible change (≈ one PR). **Branch first if on `main`.** Then make it true against the
repo's checks — run and fix until all pass:

```bash
./scripts/check.sh            # friendly pre-PR check (secrets, changelog, status-truth, registration, webapp)
bash scripts/check-links.sh           # every relative doc link resolves
bash scripts/validate-toolkit.sh      # .claude/ + plugins parse
bash scripts/check-status-truth.sh    # no overclaiming venture status
bash scripts/check-registration-safety.sh   # signup stays adults-only & private
bash scripts/check-webapp.sh          # the PWA shell stays installable & on-device
```

Rules that bind here (see `AGENTS.md`): docs ship with code (CHANGELOG + human doc + agent
guide); never overclaim status ("pilot in design", not "live"); the signup is adults-only and
collects no child data; the web app keeps all data on-device. **Never fake a green** — an honest
❌ beats a bad fix. Surface human-judgment gates (the things a check can't score) to the user.

For UI work, **screenshot-verify at desktop width** before calling it done (headless narrow shots
show false clipping). For a tricky claim, run the `critical-thinking` skill (5W1H) on it.

## 4. Self-improve
After it's green: flag anything flaky, propose ONE concrete improvement (a new check, a tuned
threshold, a `memory/` note, or an edit to this command), and apply with consent. If you changed
feature code, update `CHANGELOG.md` + the docs it touches.

End with: **objective status · what you taught · the one improvement you made or propose.**
