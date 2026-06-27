# critical-thinking — Claude Code plugin

The 5W1H critical-thinking grid packaged as an **installable, shareable** Claude Code plugin.
Where the repo's `.claude/` wires this capability into *this* project, the plugin lets *anyone*
add the same capability to *any* project — that's what a plugin is for.

## What's inside

| Component | File | What it does |
|---|---|---|
| **Slash command** | `commands/critical-thinking.md` | `/critical-thinking <target>` — interrogate anything, get a verdict |
| **Skill** | `skills/critical-thinking/SKILL.md` | auto-applies 5W1H when an agent faces a judgment call |
| **Hook** | `hooks/hooks.json` + `hooks/critical-thinking-nudge.sh` | nudges 5W1H after edits to high-stakes files |

(For multi-agent depth, this repo also ships a **dynamic workflow** at
`.claude/workflows/critical-thinking-review.js` that fans the grid out across six agents. A
workflow is project-run rather than packaged in a plugin, so it lives in `.claude/`.)

## Install

**From this repo (local):**
```
/plugin marketplace add wjlgatech/daniel-and-david
/plugin install critical-thinking
```

**Or point at a local path** while developing:
```
/plugin marketplace add ./tools
/plugin install critical-thinking
```

Then try it:
```
/critical-thinking Should venture #1 add a $99 group photo reel as its lead product?
```

## Why this exists (for Daniel & David)

This is a teaching artifact as much as a tool. It shows the **four ways to extend an AI-native
company's agent layer**, all built around one idea:

- a **skill** = a capability an agent *can choose*,
- a **command** = a capability *you* invoke on demand,
- a **hook** = a capability the harness fires *automatically*,
- a **workflow** = many agents orchestrated *deterministically*,
- a **plugin** = all of the above, *bundled to share*.

Learn the difference here, and you can teach an AI team to do almost anything. See the
[agent toolkit overview](../../.claude/README.md).
