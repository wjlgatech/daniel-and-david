# Hooks

Hooks let the **harness** (not the model) run a script automatically on an event — a perfect
way to make a good habit *unskippable*.

## critical-thinking-nudge.sh

A **PostToolUse** hook: whenever an agent edits a high-stakes file (anything under
`ventures/`, or `values.md` / `mission.md`), it prints a reminder to run the
[5W1H critical-thinking lens](../../docs/curriculum/critical-thinking/) before moving on. It is
**non-blocking** — it only nudges; it never fails a tool call.

### Enable it (opt-in)

Hooks run real commands, so they're opt-in. Add this to `.claude/settings.json` (create the
file if it doesn't exist), then restart Claude Code:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/critical-thinking-nudge.sh\""
          }
        ]
      }
    ]
  }
}
```

### Why a hook (and not just the skill)?

The [skill](../skills/critical-thinking/SKILL.md) is *available* when an agent chooses it. The
hook *fires on its own* — it closes the gap between "we have a good practice" and "the practice
actually happens every time." That difference (always-on enforcement vs. opt-in availability)
is the whole reason hooks exist. It's the same idea as this repo's doc-sync discipline:
mechanically enforce the habit you don't want to rely on memory for.
