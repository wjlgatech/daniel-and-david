#!/usr/bin/env bash
# Status-truth check — turns the first of our 4 questions ("Is it true?") into an eval.
#
# Catches "status drift": a public surface (README, the landing page) claiming venture #1 is
# live/shipping while the venture's own README says the build hasn't started. This is the exact
# bug that once shipped — the site said "live now / SHIPPING", the spec said "build not started".
#
# It self-disables automatically: once the venture README no longer says "build not started",
# the venture has shipped and these phrases become legitimate.
#
# Usage: ./scripts/check-status-truth.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

VENTURE_README="ventures/kc-matchday-basecamp/README.md"
# Public surfaces a parent/visitor sees first.
SURFACES=("README.md" "apps/web/public/index.html")

# High-signal overclaim phrases. Curated to catch real status claims, NOT metaphors like
# "the boys first feel demand, margin, and shipping for real" or "shipping a decision".
#  - "live now"            : the old kicker
#  - "now live"            : reversed phrasing
#  - ">SHIPPING<"          : the old status pill
#  - "venture #1 — live" / "venture #1 - live" : status assertion
FORBIDDEN='live now|now live|>SHIPPING<|venture #1[[:space:]]*[—-][[:space:]]*live'

fail=0

echo ""
echo "🔎 Status-truth check (Is it true?)"
echo "-----------------------------------"

if [ ! -f "$VENTURE_README" ]; then
  echo "  ⚠️  $VENTURE_README not found — skipping (nothing to compare against)."
  echo ""
  exit 0
fi

# Only enforce while the venture build has NOT started. Once it ships, stand down.
if ! grep -qiE 'build not started' "$VENTURE_README"; then
  echo "  ✅ Venture build appears to have started — 'live'/'shipping' claims are now allowed."
  echo ""
  exit 0
fi

echo "  Venture #1 status: build not started → public surfaces must NOT claim it's live."
for f in "${SURFACES[@]}"; do
  [ -f "$f" ] || continue
  hits=$(grep -niE "$FORBIDDEN" "$f" || true)
  if [ -n "$hits" ]; then
    echo "  ❌ $f overclaims venture status:"
    echo "$hits" | sed 's/^/       /'
    fail=1
  else
    echo "  ✅ $f — no status overclaim."
  fi
done

echo "-----------------------------------"
if [ "$fail" -ne 0 ]; then
  echo "::error::A public surface says venture #1 is live/shipping, but its README says 'build not started'."
  echo "Fix the wording (e.g. 'pilot in design · build not started') or, if it really shipped,"
  echo "update $VENTURE_README so this check stands down."
  echo ""
  exit 1
fi
echo "🎉 Status claims match reality."
echo ""
exit 0
