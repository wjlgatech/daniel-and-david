#!/usr/bin/env bash
# Wire the deployed free-LLM proxy URL into every demo that uses the SPARK seam — one command.
#
# Usage: ./scripts/set-spark-endpoint.sh https://<your-project>.vercel.app/api/spark
#        ./scripts/set-spark-endpoint.sh ""     # turn it back off (offline question bank only)
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

URL="${1-__MISSING__}"
if [ "$URL" = "__MISSING__" ]; then
  echo "Usage: $0 <proxy-url|''>"; echo "  e.g. $0 https://daniel-and-david.vercel.app/api/spark"; exit 2
fi
# Accept an absolute https URL (cross-origin host) OR a same-origin path like /api/spark
# (when the whole site is hosted on Netlify/Vercel) OR "" to disable.
if [ -n "$URL" ] && ! printf '%s' "$URL" | grep -qE '^(https://|/)'; then
  echo "❌ Endpoint must be https://… , a /same-origin/path , or '' to disable. Got: $URL"; exit 1
fi

changed=0
for f in apps/web/public/demos/*.html; do
  [ -e "$f" ] || continue
  if grep -q 'const SPARK = {' "$f"; then
    # Replace the endpoint string inside:  const SPARK = { endpoint: "..." }
    python3 - "$f" "$URL" <<'PY'
import re, sys
path, url = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()
new = re.sub(r'(const SPARK = \{\s*endpoint:\s*)"[^"]*"', r'\1"' + url.replace('\\', '\\\\') + '"', s, count=1)
if new != s:
    open(path, "w", encoding="utf-8").write(new)
    print("  ✅ " + path + (" → " + url if url else " → (disabled)"))
else:
    print("  •  " + path + " (no change)")
PY
    changed=1
  fi
done
[ "$changed" -eq 1 ] || { echo "  ⚠️  No demo with a SPARK seam found."; exit 0; }
echo ""
echo "Done. Commit the change to go live: git add -A && git commit -m 'enable free-LLM proxy' && git push"
