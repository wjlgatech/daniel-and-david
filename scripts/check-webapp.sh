#!/usr/bin/env bash
# Web app (PWA) smoke check — keeps the installable Builder Loop app shippable.
#
# Verifies the PWA shell is coherent: app.html + manifest + service worker + icons exist,
# the manifest is valid JSON with the required installability fields, the service worker and the
# app's inline JS parse, and app.html references the manifest + registers the service worker.
# Self-disables if there is no web app yet.
# Usage: ./scripts/check-webapp.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

DIR="apps/web/public"
APP="$DIR/app.html"
fail=0
echo ""
echo "📱 Web app (PWA) smoke check"
echo "----------------------------"

if [ ! -f "$APP" ]; then
  echo "  ⚠️  $APP not found — skipping (no web app yet)."; echo ""; exit 0
fi

exist() { if [ -f "$1" ]; then echo "  ✅ $1"; else echo "  ❌ MISSING: $1"; fail=1; fi; }
exist "$APP"
exist "$DIR/manifest.webmanifest"
exist "$DIR/sw.js"
exist "$DIR/icons/icon-192.png"
exist "$DIR/icons/icon-512.png"
exist "$DIR/icons/apple-touch-icon.png"

# manifest: valid JSON with the installability-critical fields
python3 - "$DIR/manifest.webmanifest" <<'PY' || fail=1
import json,sys
try:
    m=json.load(open(sys.argv[1]))
except Exception as e:
    print(f"  ❌ manifest is not valid JSON: {e}"); sys.exit(1)
missing=[k for k in ("name","start_url","display","icons") if k not in m]
if missing: print("  ❌ manifest missing fields:",", ".join(missing)); sys.exit(1)
if not any(i.get("sizes")=="512x512" for i in m.get("icons",[])):
    print("  ❌ manifest needs a 512x512 icon"); sys.exit(1)
print("  ✅ manifest.webmanifest valid (name, start_url, display, 512 icon)")
PY

# app.html must link the manifest and register the service worker
grep -q 'rel="manifest"' "$APP"        && echo "  ✅ app.html links the manifest"        || { echo "  ❌ app.html missing <link rel=manifest>"; fail=1; }
grep -q 'serviceWorker.register' "$APP" && echo "  ✅ app.html registers the service worker" || { echo "  ❌ app.html does not register sw.js"; fail=1; }
# privacy promise: on-device, no external script/fetch of user data
grep -qi 'this device' "$APP"          && echo "  ✅ app states data stays on-device"      || { echo "  ❌ app.html missing on-device privacy note"; fail=1; }
# no external scripts / CDNs in the app (would break the on-device guarantee)
if grep -qE '<script[^>]+src=' "$APP"; then echo "  ❌ app.html loads an external script (breaks on-device privacy)"; fail=1; else echo "  ✅ no external <script src> (on-device privacy intact)"; fi
# photo evidence (if present) must be on-device IndexedDB + carry the never-uploaded promise
if grep -q 'addPhoto' "$APP"; then
  grep -q 'indexedDB' "$APP"            && echo "  ✅ photos use on-device IndexedDB"        || { echo "  ❌ photo feature must use IndexedDB (on-device)"; fail=1; }
  grep -qi 'never uploaded' "$APP"      && echo "  ✅ photos carry 'never uploaded' notice"  || { echo "  ❌ photo feature missing 'never uploaded' notice"; fail=1; }
fi

# Demos (hub mini-apps) must be on-device + collect NO child identity
for d in "$DIR"/demos/*.html; do
  [ -e "$d" ] || continue
  nm=$(basename "$d")
  if grep -qiE 'this device|on your device|on-device' "$d"; then echo "  ✅ demo $nm states on-device"; else echo "  ❌ demo $nm missing on-device note"; fail=1; fi
  if grep -qiE 'name="(child_name|kid_name|child_first|child_fullname)"' "$d"; then echo "  ❌ demo $nm collects a child name"; fail=1; else echo "  ✅ demo $nm collects no child name"; fi
  if command -v node >/dev/null 2>&1; then
    python3 - "$d" > /tmp/_demojs.js <<'PY'
import re,sys
print("\n".join(re.findall(r'<script>(.*?)</script>', open(sys.argv[1]).read(), re.S)))
PY
    node --check /tmp/_demojs.js && echo "  ✅ demo $nm JS parses" || { echo "  ❌ demo $nm JS syntax error"; fail=1; }
  fi
done

# JS parses (only if node is available — CI has it; local may not)
if command -v node >/dev/null 2>&1; then
  node --check "$DIR/sw.js" && echo "  ✅ sw.js parses" || { echo "  ❌ sw.js syntax error"; fail=1; }
  python3 - "$APP" > /tmp/_appjs.js <<'PY'
import re,sys
html=open(sys.argv[1]).read()
print("\n".join(re.findall(r'<script>(.*?)</script>', html, re.S)))
PY
  node --check /tmp/_appjs.js && echo "  ✅ app.html inline JS parses" || { echo "  ❌ app.html inline JS syntax error"; fail=1; }
else
  echo "  ⚠️  node not found — skipped JS syntax check (CI runs it)."
fi

echo "----------------------------"
if [ "$fail" -ne 0 ]; then echo "::error::PWA smoke check failed."; echo ""; exit 1; fi
echo "🎉 Web app shell is installable & coherent."
echo ""
exit 0
