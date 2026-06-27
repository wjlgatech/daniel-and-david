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

# 3. Status-truth — don't claim venture #1 is live while its build hasn't started
if bash "$(dirname "$0")/check-status-truth.sh" >/dev/null 2>&1; then
  pass "Public status claims match reality (venture #1 not overclaimed)."
else
  warn "A public surface claims venture #1 is live/shipping but its README says 'build not started'. Run: scripts/check-status-truth.sh"
fi

# 4. Registration-safety — the signup form must stay adults-only & privacy-safe
if bash "$(dirname "$0")/check-registration-safety.sh" >/dev/null 2>&1; then
  pass "Signup form is adults-only and privacy-safe (or no form yet)."
else
  warn "The founding-cohort form is missing a child-safety guardrail. Run: scripts/check-registration-safety.sh"
fi

# 5. Web app (PWA) shell stays installable & coherent
if bash "$(dirname "$0")/check-webapp.sh" >/dev/null 2>&1; then
  pass "Web app PWA shell is coherent (or no app yet)."
else
  warn "The Builder Loop web app shell is broken. Run: scripts/check-webapp.sh"
fi

# 6. Big-PR nudge
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
