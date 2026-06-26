# Principle: Run It Like an AI-Native Company

An *AI-native* company isn't a normal company that "uses AI." It's one designed from the
ground up so that **AI agents are teammates**, and a very small group of humans can do the
work that used to need a large org. This is the single biggest leverage available to a young
builder today — so we learn it first.

## The mental model

```
        Old way                         AI-native way
   ┌──────────────────┐          ┌────────────────────────────┐
   │  1 human  = 1 job │          │  1 human directs a TEAM of │
   │  hire to scale    │          │  AI agents; hire to scale  │
   │                   │          │  JUDGMENT, not headcount   │
   └──────────────────┘          └────────────────────────────┘
```

You are the **director, editor, and conscience.** Agents draft, search, build, test, and
crunch. You decide *what's worth doing*, *whether it's good*, and *whether it's right.*

## The ten habits we build

1. **Agents are teammates, not features.** Give them clear roles, clear instructions, and
   clear standards — the way you would a new human teammate. (See `agents/hello-agent/`.)
2. **Humans own the outcome.** An agent can be wrong with total confidence. You read, verify,
   and sign your name to it. *You* are responsible, always.
3. **Write everything down (docs-as-code).** Agents and humans both work from the same
   written context. If it isn't written, it doesn't reliably exist. This whole repo is that
   habit made real.
4. **Default to small, reversible steps.** Ship a slice, check it, ship the next. Easy to
   review, easy to undo, easy for an agent to get right.
5. **Measure, don't guess (evals over vibes).** A test, a metric, a checklist, a screenshot.
   "It feels good" is where bugs hide. See [agentic-engineering.md](agentic-engineering.md).
6. **Cheap to try, cheap to be wrong.** AI makes experiments nearly free. Run ten small ones
   instead of betting everything on one big plan. Kill the losers fast, fund the winners.
7. **Automate the boring, keep the human in the loop on the important.** Let agents do the
   repetitive work; humans approve anything that touches money, customers, or the law.
8. **Build in the open.** Transparency invites help (we want 100 contributors/day), builds
   trust, and forces clarity. Secrets stay secret; everything else is shared.
9. **Customer first, model second.** The AI is a means. The customer's real problem is the
   end. No amount of clever automation matters if nobody needs the result.
10. **Compound trust.** Reliability with customers, partners, and contributors is the moat.
    Agents help you *scale* trust — they never excuse breaking it.

## What this looks like for our ventures

Take [venture #1](../../ventures/kc-matchday-basecamp/). An AI-native operator:

- uses an agent to **build the web app** from the PRD (the Codex prompt in the spec),
- uses agents to **draft** partner outreach, signage copy, and the local guide — then
  **edits** them for truth and tone,
- uses dashboards and analytics so decisions are **measured**, not guessed,
- keeps a **human hand** on every compliance gate, every payment, every customer promise.

One kid + a few AI teammates can run a real business. That's not the future. That's now —
and it's exactly what Daniel and David are learning to do.

## The trap to avoid

**Don't outsource your thinking.** The agent is the strongest intern you'll ever have and
the most confident liar. Use it to go faster, never to stop understanding. The moment you
ship something you don't understand, you've handed away the one thing that makes you a
builder: your judgment.
