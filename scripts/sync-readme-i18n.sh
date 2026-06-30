#!/usr/bin/env bash
# Stamp each translated README with the current README.md fingerprint, marking the
# translations as "in sync." Run this AFTER you re-translate to match an English change.
# (It only updates the `<!-- i18n-source-sha: … -->` marker; it does not translate.)
#
# Usage: ./scripts/sync-readme-i18n.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

[ -f README.md ] || { echo "No README.md — nothing to sync."; exit 0; }
cur=$(python3 -c "import hashlib;print(hashlib.sha256(open('README.md','rb').read()).hexdigest()[:16])")
shopt -s nullglob
for f in README.*.md; do
  python3 - "$f" "$cur" <<'PY'
import sys, re
path, cur = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()
s = re.sub(r'^<!-- i18n-source-sha: [0-9a-f]+ -->\n', '', s)   # drop old marker if present
open(path, "w", encoding="utf-8").write(f"<!-- i18n-source-sha: {cur} -->\n" + s)
PY
  echo "  stamped $f → $cur"
done
echo "✅ Translations stamped to README.md @ $cur"
