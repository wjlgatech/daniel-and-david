# .claude — the Agent Toolkit

This folder is where we teach our **AI teammates** new capabilities. In an
[AI-native company](../docs/principles/ai-native-company.md), the agent layer is as real a part
of the company as the code or the curriculum — so we build it deliberately and in the open.

## The five ways to extend an agent (and when to use each)

| Type | Lives in | Fires when | Use it for |
|---|---|---|---|
| 🧠 **Skill** | `.claude/skills/<name>/SKILL.md` | the agent *chooses* it for a fitting task | a reusable capability/judgment the agent should reach for |
| ⌨️ **Command** | a plugin's `commands/*.md` | *you* type `/<name>` | an on-demand action you trigger yourself |
| 🪝 **Hook** | `.claude/hooks/` + settings | the harness fires it *automatically* on an event | making a habit *unskippable* (enforcement, not memory) |
| 🔀 **Workflow** | `.claude/workflows/*.js` | run on demand, *orchestrates many agents* deterministically | fan-out / multi-perspective / pipeline work |
| 📦 **Plugin** | `tools/<name>-plugin/` | installed via `/plugin` | *bundling* skills+commands+hooks to share anywhere |

> Skill = *can* do it · Command = *I* do it · Hook = *always* does it · Workflow = *many* do it ·
> Plugin = *share* it.

## What's here now: `critical-thinking` (5W1H)

One capability — interrogate anything before acting — built as **all** of the above, so the
toolkit doubles as a worked example for the curriculum:

- **Skill** — [`skills/critical-thinking/SKILL.md`](skills/critical-thinking/SKILL.md)
- **Workflow** — [`workflows/critical-thinking-review.js`](workflows/critical-thinking-review.js)
  (six agents, one per question-word, then a synthesized verdict)
- **Hook** — [`hooks/critical-thinking-nudge.sh`](hooks/critical-thinking-nudge.sh)
  (nudges 5W1H after edits to `ventures/**`, `values.md`, `mission.md`)
- **Plugin** (command + skill + hook, packaged to install) —
  [`../tools/critical-thinking-plugin/`](../tools/critical-thinking-plugin/), listed in the
  repo's [`marketplace.json`](../.claude-plugin/marketplace.json)

The matching **human** lessons live in
[`docs/curriculum/critical-thinking/`](../docs/curriculum/critical-thinking/). Humans and agents
using the *same* thinking tool is the entire point.

## Adding to the toolkit

Keep each capability small, readable, and documented. Prefer a **skill** first (lowest
ceremony); reach for a **workflow** only when the work genuinely needs many agents; add a
**hook** only to enforce something that must not be skipped; **bundle a plugin** when others
should be able to install it. Update this table when you add one.
