#!/usr/bin/env bash
# Validate the agent toolkit (.claude/ + tools/ plugins) so a malformed skill,
# workflow, hook, or plugin can never merge. Runs in CI and locally.
#
# Usage: ./scripts/validate-toolkit.sh
# Needs: python3 (JSON), node (workflow syntax), bash.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

fail=0
ok()  { printf "  ✓ %s\n" "$1"; }
err() { printf "::error::%s\n" "$1"; printf "  ✗ %s\n" "$1"; fail=1; }

all="$(git ls-files)"
sel() { printf '%s\n' "$all" | grep -E "$1" || true; }

echo "→ JSON (plugins, marketplace, hooks)"
for f in $(sel '\.json$' | grep -E '^(\.claude|tools/)'); do
  if python3 -c "import json,sys; json.load(open('$f'))" 2>/dev/null; then ok "$f"; else err "invalid JSON: $f"; fi
done

echo "→ Workflow scripts (node --check)"
if command -v node >/dev/null 2>&1; then
  for f in $(sel '^\.claude/workflows/.*\.js$'); do
    if node --check "$f" 2>/dev/null; then ok "$f"; else err "JS syntax error: $f"; fi
  done
else
  echo "  (node not found — skipping JS syntax check)"
fi

echo "→ Skill frontmatter (name + description)"
for f in $(sel 'SKILL\.md$'); do
  if [ "$(head -1 "$f")" = "---" ] && grep -q '^name:' "$f" && grep -q '^description:' "$f"; then
    ok "$f"
  else
    err "SKILL.md needs '---' frontmatter with name: and description: — $f"
  fi
done

echo "→ Command frontmatter (description)"
for f in $(sel '^tools/.*/commands/.*\.md$'); do
  if [ "$(head -1 "$f")" = "---" ] && grep -q '^description:' "$f"; then ok "$f"; else err "command needs frontmatter with description: — $f"; fi
done

echo "→ Hook scripts (bash -n)"
for f in $(sel '/hooks/.*\.sh$'); do
  if bash -n "$f" 2>/dev/null; then ok "$f"; else err "bash syntax error: $f"; fi
done

echo "→ Plugin hook references resolve"
for hj in $(sel '^tools/.*/hooks/hooks\.json$'); do
  dir="$(dirname "$hj")"
  refs="$(grep -oE '[A-Za-z0-9_./-]+\.sh' "$hj" | sed 's#.*/##' || true)"
  for r in $refs; do
    if [ -f "$dir/$r" ]; then ok "$hj → $r"; else err "hooks.json references missing script: $r (in $dir)"; fi
  done
done

echo ""
if [ "$fail" -ne 0 ]; then
  echo "✗ Toolkit validation FAILED"
  exit 1
fi
echo "✓ Toolkit validation passed."
