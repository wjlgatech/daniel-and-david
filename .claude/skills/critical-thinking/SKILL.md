---
name: critical-thinking
description: Apply the 5W1H critical-thinking grid (Who/What/Where/When/Why/How) to interrogate a claim, plan, product, venture idea, or decision before acting. Use when evaluating whether something is true, sound, safe, or worth doing — especially before spending money, shipping a venture decision, trusting a factual claim, or selling to someone. Surfaces hidden risks, missing stakeholders, and untested assumptions.
---

# Critical Thinking (5W1H)

A structured lens for interrogating *any* target — a claim, a plan, a product, a venture
decision, a piece of information, a PR — before you act on it. The same tool the humans in
this repo learn (`docs/curriculum/critical-thinking/`). Humans and agents thinking the same
way is the point of an AI-native company.

## When to use this

Reach for this skill when the task involves **judgment, not just execution**:
- Before a venture decision (pricing, a new SKU, a partner, a launch) — esp. anything that
  spends money or makes a customer promise.
- Before trusting a factual claim or an AI-generated answer (the *verify, then trust* rule).
- Before selling or marketing — can you honestly answer "who does this serve?"
- When reviewing a plan or PR for what's *missing*, not just what's wrong.

Do **not** perform a heavyweight 5W1H on trivial, reversible mechanical work — that's ceremony.

## How to apply it

Point all six question-words at the target. You don't need all 48 questions every time — pick
the 3–5 that bite hardest for *this* target. Always include the uncomfortable ones.

**WHO** — benefits? · is harmed? · makes the decision? · is most affected? · should be
consulted? · are the key people? · deserves recognition?

**WHAT** — are the strengths/weaknesses? · is another perspective or alternative? · is the
counter-argument? · is the best/worst case? · is most/least important? · is getting in the way?

**WHERE** — would we see this in the real world? · are there similar situations? · is the most
need? · could it be a problem? · can we get more information or help? · are the areas to improve?

**WHEN** — is this acceptable/unacceptable? · would it benefit or harm society? · is the best
time to act? · will we know we've succeeded? · can we expect it to change?

**WHY** — is this a problem worth solving? · is it relevant? · is it the best/worst scenario? ·
are people influenced by it? · has it been this way so long? · is there a need *today*? · (and
keep asking "why?" up the chain.)

**HOW** — is this similar to something known? · does it disrupt or help? · do we know the truth
about it? · will we approach it safely? · does it benefit or harm us/others? · can we change it
for good?

## Output format

Return a tight, honest assessment — not a wall of 48 answers:

1. **Target** — one line: what you interrogated.
2. **Sharpest findings** — 3–6 bullets, each tagged with its word, e.g.
   `WHO: the 6-year-old in the photo can't consent — needs a guardian. (risk)`
3. **The uncomfortable question** — the one most tempting to skip, answered honestly.
4. **Verdict** — proceed / proceed-with-changes / stop, plus the single most important reason.

## Guardrails for this repo

- Cross-check the verdict against the [four-question test](../../../docs/principles/values.md)
  and venture compliance gates. A 5W1H that ignores values is incomplete.
- Surface human-judgment calls to the user — don't self-answer a values or legal gate.
- An honest "stop" is more valuable than a rationalized "proceed."
