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
echo "-------------------------------------------------"
if [ "$rc" -ne 0 ]; then echo "::error::Free-LLM proxy safety tests failed."; echo ""; exit 1; fi
echo "🎉 Proxy keeps the key server-side and never forwards child data."
echo ""
exit 0
