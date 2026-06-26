#!/usr/bin/env bash
# Friendly pre-PR check. Tells you what to fix in plain language.
# Usage: ./scripts/check.sh
set -uo pipefail

cd "$(dirname "$0")/.." || exit 1

ok=0
say()  { printf "  %s\n" "$1"; }
pass() { printf "  ✅ %s\n" "$1"; }
warn() { printf "  ⚠️  %s\n" "$1"; ok=1; }

echo ""
echo "🌱 Daniel & David — pre-PR check"
echo "--------------------------------"

# 1. No secrets staged
if git diff --cached --name-only 2>/dev/null | grep -qE '(^|/)\.env($|\.)' ; then
  warn "It looks like a .env file is staged. Secrets must never be committed. Unstage it."
else
  pass "No .env / secret files staged."
fi

# 2. Changelog touched when source changed
changed=$(git diff --cached --name-only 2>/dev/null)
if echo "$changed" | grep -qE '\.(ts|tsx|js|jsx|py|html|css)$'; then
  if echo "$changed" | grep -q 'CHANGELOG.md'; then
    pass "Code changed and CHANGELOG.md was updated. Nice."
  else
    warn "You changed code but not CHANGELOG.md. Add one line under '## [Unreleased]'."
  fi
fi

# 3. Big-PR nudge
count=$(echo "$changed" | grep -c . )
if [ "${count:-0}" -gt 40 ]; then
  warn "This PR touches $count files — that's large. Consider splitting it. Small PRs merge faster."
else
  say "Files staged: ${count:-0}"
fi

echo "--------------------------------"
if [ "$ok" -eq 0 ]; then
  echo "🎉 Looks good. Open your Pull Request!"
else
  echo "👆 A couple of friendly fixes above, then you're good. You've got this."
fi
echo ""
exit 0
