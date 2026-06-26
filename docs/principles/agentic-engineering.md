# Principle: Agentic Engineering

How we actually build software (and most things) when AI agents do a lot of the typing.
These are the working habits that keep agent-assisted work **fast *and* trustworthy.**

## The core loop

```
   PLAN  →  small step  →  VERIFY  →  WRITE IT DOWN  →  repeat
    │                         │                          │
 say what &              prove it works              docs + changelog
 why, in writing         (test/metric/eyes)          ship WITH the code
```

Every change is a lap of this loop. Big features are just many small laps.

## The rules

### 1. Small, reversible changes
One PR = one focused change you can describe in a sentence and undo in a click. Small diffs
are easy for a human to review and easy for an agent to get right. If a change is sprawling,
split it.

### 2. Evals over vibes
Before you believe a change works, prove it: a unit test, an end-to-end test, a measured
metric, a screenshot, a checklist walked by hand. "Looks fine" is how bugs ship. The
venture-#1 PRD lists concrete [acceptance tests](../../ventures/kc-matchday-basecamp/SPEC.md)
for exactly this reason.

### 3. The human is the editor
The agent drafts; **you** read every line, understand it, and own it. If you can't explain
what the code does, it's not ready — not because the agent failed, but because *you* haven't
finished your job yet.

### 4. Docs ship with code
A behavior change updates, in the **same** change:
- `CHANGELOG.md` (one line: what + why),
- the human doc it touches (`README.md` / `docs/**` / `ventures/**`),
- the agent guide (`AGENTS.md` / `CLAUDE.md`) if agent-facing behavior changed.

No "docs later." Later never comes, and the next person (or agent) inherits the confusion.

### 5. Context is the product
Agents are only as good as the written context you give them. Clear specs, clear file names,
clear comments, clear PRDs. Time spent making context crisp is repaid every time an agent
reads it. This repo *is* a context machine.

### 6. Make wrong cheap
Prefer designs where a mistake is caught early and costs little: feature flags, mock/test
modes (the PRD asks for a mock payment mode), dry runs, staging before production. The
braver you can afford to be, the faster you learn.

### 7. Verify, then trust
An agent will state a falsehood with total confidence. Treat its output like a brilliant
intern's first draft: probably useful, possibly wrong, always to be checked against reality
(run it, test it, read the docs). See `claude-api` / provider docs before trusting model
claims.

### 8. Leave the campsite cleaner
Match the surrounding style. Remove dead code you touch. Fix the small thing while you're in
there — but in its *own* commit, so reviews stay clean.

## A worked example: building venture #1's app

1. **Plan** — the PRD already says what each page and flow must do.
2. **Small step** — build *one* flow (e.g., "buy a $29 kit in mock mode and get a QR code").
3. **Verify** — run the acceptance test: *can a user buy R01 on a phone in under 60s and get
   a QR?* Green or not green — no vibes.
4. **Write it down** — changelog entry, update the venture README's "status" section.
5. **Repeat** — next flow: staff redemption, then inventory, then partner attribution.

Five small, verified laps beat one giant untested PR every single time.

## Why a kid can do this

Because the loop is small enough to hold in your head, and the agent does the tedious part.
Daniel can direct an agent to build a checkout page and *check that it works* long before he
could write every line himself. Doing it teaches him to read code, to test, and to demand
proof — which is most of what senior engineers actually do.
