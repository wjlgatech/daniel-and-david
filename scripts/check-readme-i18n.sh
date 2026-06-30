#!/usr/bin/env bash
# README i18n staleness check (WARN-ONLY by design).
#
# The README is multilingual: README.md (English) is the source of truth and
# README.<lang>.md are AI-assisted translations that are ALLOWED to lag. Each
# translation embeds a fingerprint of the English README it was last synced to:
#   <!-- i18n-source-sha: <16-hex> -->
# This check recomputes README.md's fingerprint and flags any translation whose
# recorded fingerprint differs (or is missing). It never blocks (exit 0) — a stale
# translation is a nudge, not a failure. Run `scripts/sync-readme-i18n.sh` after you
# re-translate to re-stamp. Set STRICT=1 to make it exit non-zero (e.g. a gated job).
#
# Usage: ./scripts/check-readme-i18n.sh   ·   STRICT=1 ./scripts/check-readme-i18n.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

echo ""
echo "🌐 README i18n staleness check (English is the source of truth)"
echo "--------------------------------------------------------------"

[ -f README.md ] || { echo "  ✅ No README.md — nothing to check."; echo ""; exit 0; }
shopt -s nullglob
translations=(README.*.md)
if [ ${#translations[@]} -eq 0 ]; then
  echo "  ✅ No translated READMEs yet — nothing to check."; echo ""; exit 0
fi

cur=$(python3 -c "import hashlib;print(hashlib.sha256(open('README.md','rb').read()).hexdigest()[:16])")
stale=0
for f in "${translations[@]}"; do
  rec=$(grep -oE 'i18n-source-sha: [0-9a-f]+' "$f" | head -1 | awk '{print $2}')
  if [ -z "$rec" ]; then
    echo "  ⚠️  $f — no source marker (run: scripts/sync-readme-i18n.sh)"; stale=1
  elif [ "$rec" != "$cur" ]; then
    echo "  ⚠️  $f — STALE: README.md changed since this was last synced"; stale=1
  else
    echo "  ✓ $f — in sync"
  fi
done

echo "--------------------------------------------------------------"
if [ "$stale" -eq 0 ]; then
  echo "🎉 All translations are in sync with README.md."
  echo ""; exit 0
fi
echo "👆 Translations may be out of date. English is canonical, so this is just a heads-up."
echo "   Re-translate the changed parts, then run: scripts/sync-readme-i18n.sh"
echo ""
[ "${STRICT:-0}" = "1" ] && exit 1 || exit 0
