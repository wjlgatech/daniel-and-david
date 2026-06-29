#!/usr/bin/env bash
# Free-LLM proxy check — guards the parent-facing, tag-only safety invariant of api/spark.js.
#
# Runs the mocked unit tests (no key/network needed): a child's name or free text must never reach
# the LLM, the key stays server-side, and missing-key / wrong-method / upstream-failure all degrade
# gracefully. Self-disables if there is no proxy. See apps/web/DEPLOY.md.
# Usage: ./scripts/check-spark.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

TEST="apps/web/api/spark.test.mjs"
echo ""
echo "✨ Free-LLM proxy check (parent-facing, tag-only)"
echo "-------------------------------------------------"
if [ ! -f "$TEST" ]; then echo "  ⚠️  $TEST not found — skipping (no proxy yet)."; echo ""; exit 0; fi
if ! command -v node >/dev/null 2>&1; then echo "  ⚠️  node not found — skipped (CI runs it)."; echo ""; exit 0; fi

node "$TEST"; rc=$?

# Structural guard: both host entry points must delegate to the one shared core (no logic forks).
core="apps/web/api/_spark-core.js"
for entry in "apps/web/api/spark.js" "apps/web/netlify/edge-functions/spark.js"; do
  if [ -f "$entry" ]; then
    if grep -q "_spark-core" "$entry"; then echo "  ✅ $entry delegates to the shared core";
    else echo "  ❌ $entry does not import $core (logic must not fork)"; rc=1; fi
  fi
done

echo "-------------------------------------------------"
if [ "$rc" -ne 0 ]; then echo "::error::Free-LLM proxy safety tests failed."; echo ""; exit 1; fi
echo "🎉 Proxy keeps the key server-side and never forwards child data."
echo ""
exit 0
