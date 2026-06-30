# AI Use Boundaries

AI is a **teammate** in this project, not a babysitter and not an oracle. The child stays the
**mind and the conscience** ([mission](../vision/mission.md)). These boundaries apply to every
AI agent, skill, workflow, and tool used here.

## What an AI teammate **may** do

- Help a child *after* they've made a first human attempt (the
  [Builder Loop](../builder-loop/) rule).
- Suggest questions, summarize feedback, draft options, check spelling, explain a concept.
- Work on the **content** of a contribution (improve a sign, review a plan, find a weak claim).

## What an AI teammate **may not** do

```text
1. Collect, retain, or expose a child's personal data — by default, ever.
2. Message a child privately or act as an unsupervised companion.
3. Match a child with an adult, or a child with a stranger.
4. Replace the child's own thinking — every AI step is paired with an
   "independent thinking task" the child does without AI.
5. Present itself as a person, or hide that it is an AI.
6. Produce content that isn't true, kind, and child-appropriate.
```

## The verification habit (this is the point)

A core skill we are teaching is that **AI is fallible.** So every AI-supported step in the
[Builder Loop](../builder-loop/) is paired with the child either:

- **finding one mistake the AI made** and explaining how they checked, or
- **independently reproducing or explaining** the key thing the AI did.

If a child can't explain it, they don't ship it. That single habit — *use AI, then verify with
your own judgment* — is the difference between directing AI and being directed by it.

## Conversational agents (the Builder Loop Coach)

A conversational agent that *talks* a family through a procedure raises the stakes on the rules
above, so it carries extra, non-negotiable constraints (see the spec at
[`apps/web-agent/SPEC.md`](../../apps/web-agent/SPEC.md)):

- **On-device by default.** The model runs in the browser; no conversation, name, or photo leaves
  the device. Any cloud path is **off by default, adults-only, consent-gated, and PII-redacted**,
  with a clear in-UI banner saying which brain is active. (Rule 1.)
- **A coach, not a companion.** It is scoped to the Builder Loop. No open-ended child
  companionship, no "let's just keep chatting" loop. (Rule 2.)
- **Always visibly an AI.** It self-identifies each session and never role-plays a person. (Rule 5.)
- **It never replaces the child's thinking.** The "find one mistake the AI made / explain it
  yourself" habit still gates every cycle — if a child can't explain it, they don't ship it. (Rule 4.)
- **Voice stays on-device too.** Speech-to-text runs locally; a cloud STT (e.g. the Web Speech
  API) is only allowed with the same disclosure as a cloud model.

## Honesty about AI

Contributions may use AI, but must not **misrepresent** who did what. "The AI helped me write
this" is a perfectly good thing to say — and a great thing for a child to learn to say.

Apply the [4-Question Test](../principles/values.md) to any AI output before it ships:
*Is it true? Is it legal and is my word kept? Does it serve someone? Would I be proud to
explain it?*

Related: [child-safety](child-safety.md) · [privacy-by-design](privacy-by-design.md) ·
[community-moderation](community-moderation.md).
