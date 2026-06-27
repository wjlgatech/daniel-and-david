#!/usr/bin/env bash
# PostToolUse hook: when an agent edits a high-stakes file (a venture or the values doc),
# nudge it to run the 5W1H critical-thinking lens before moving on.
#
# Non-blocking: it only prints a reminder. It never fails a tool call.
# Wire it up by adding the snippet from .claude/hooks/README.md to .claude/settings.json.
#
# Input: Claude Code passes the tool event as JSON on stdin.

set -uo pipefail

payload="$(cat)"

# Extract the edited file path (python3 for a robust JSON parse; fall back to grep).
file_path="$(printf '%s' "$payload" | python3 -c '
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get("tool_input", {}).get("file_path", ""))
except Exception:
    pass
' 2>/dev/null)"

if [ -z "$file_path" ]; then
  file_path="$(printf '%s' "$payload" | grep -oE '"file_path"[^,}]*' | head -1 | sed -E 's/.*:\s*"//; s/"\s*$//')"
fi

case "$file_path" in
  *ventures/*|*docs/principles/values.md|*docs/vision/mission.md)
    cat <<'MSG' >&2
🧠 Critical-thinking nudge — you just edited a high-stakes file (a venture / values / mission).
Before you continue, run the 5W1H lens on this change:
  WHO is helped or harmed?   WHAT is the worst case?   WHY is this the right call?   HOW could it harm us/others?
Check it against the four-question values test (true? legal & word kept? serves? proud?).
Tip: the `critical-thinking` skill and `/critical-thinking` command do this for you.
MSG
    ;;
esac

exit 0
