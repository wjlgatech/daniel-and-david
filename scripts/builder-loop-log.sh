#!/usr/bin/env bash
# Builder Loop iteration logger — scaffolding for "fast, frequent, failing-forward".
#
# Appends a fresh, dated iteration block to a per-child log so logging a cycle takes ten
# seconds and never gets skipped. The whole point of the Builder Loop is to run 5+ cycles in
# 4 weeks (docs/builder-loop/) — this removes the friction that stops people iterating.
#
# Usage:
#   ./scripts/builder-loop-log.sh "Daniel"          # append a new iteration block
#   ./scripts/builder-loop-log.sh "Daniel" --status # show iteration count + last entry
#
# The log lives at builder-loop-log-<child>.md in the repo root and is git-ignored by default
# (it can contain a child's notes — keep it private; see docs/safety/privacy-by-design.md).
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

CHILD="${1:-}"
if [ -z "$CHILD" ] || [ "$CHILD" = "-h" ] || [ "$CHILD" = "--help" ]; then
  echo "Usage: ./scripts/builder-loop-log.sh \"<child name>\" [--status]"
  echo "Appends a dated Builder Loop iteration block (fast · frequent · failing-forward)."
  exit 0
fi

# Slugify the child's name for the filename (lower-case, spaces/punct -> '-').
slug=$(printf '%s' "$CHILD" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-//; s/-$//')
LOG="builder-loop-log-${slug}.md"
today=$(date +%Y-%m-%d)

# Count existing iterations (one '## Iteration' heading each).
count=0
[ -f "$LOG" ] && count=$(grep -c '^## Iteration' "$LOG" 2>/dev/null || echo 0)

if [ "${2:-}" = "--status" ]; then
  if [ ! -f "$LOG" ]; then echo "No log yet for $CHILD ($LOG). Run without --status to start."; exit 0; fi
  echo "Builder Loop — $CHILD"
  echo "  Log:        $LOG"
  echo "  Iterations: $count  (target: 5+ in 4 weeks)"
  echo "  Last entry:"
  grep '^## Iteration' "$LOG" | tail -1 | sed 's/^/    /'
  exit 0
fi

next=$((count + 1))

# Create the file with a header the first time.
if [ ! -f "$LOG" ]; then
  {
    echo "# Builder Loop log — $CHILD"
    echo ""
    echo "> Fast · frequent · failing-forward. One block per cycle; a cycle isn't done until it"
    echo "> has a failure-lesson. Aim for 5+ in 4 weeks. Template: docs/builder-loop/iteration-log.md"
    echo ""
  } > "$LOG"
fi

# Append the next dated iteration block.
{
  echo "## Iteration $next  ·  $today"
  echo "- **Hypothesis** — I think people will ___ if I ___:"
  echo "- **What I built (fast & rough):**"
  echo "- **Who I showed it to (a real person):**"
  echo "- **What failed / confused them:**  ⬅ the gold"
  echo "- **The one lesson:**"
  echo "- **AI helped with:** ___  ·  **One AI mistake I caught:** ___"
  echo "- **Decide → next:**  [ ] keep  [ ] change  [ ] drop  →  next PICK: ___"
  echo ""
} >> "$LOG"

echo "✅ Added Iteration $next to $LOG  (dated $today)."
[ "$next" -ge 5 ] && echo "🏁 $next iterations — you've hit the 5-cycle target. Keep going or run the retro!"
[ "$next" -lt 5 ] && echo "   $next/5 cycles. Fast & frequent — show a real person, then log the lesson."
