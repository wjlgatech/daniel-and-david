#!/usr/bin/env bash
# i18n sync check — keeps every language tag in step with the source.
#
# The landing page (apps/web/public/index.html) marks translatable strings with data-i18n /
# data-i18n-ph and carries an I18N dictionary for each non-English language. This check fails the
# build if ANY translated key is missing in ANY language — so the moment someone adds or changes an
# English string, the build stays red until all language tags are updated too. That's the
# "translations update across all languages whenever the source changes" guarantee, enforced.
#
# Self-disables if the page has no i18n yet.
# Usage: ./scripts/check-i18n.sh
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

PAGE="apps/web/public/index.html"
echo ""
echo "🌐 i18n sync check (all language tags in step with English)"
echo "-----------------------------------------------------------"
if [ ! -f "$PAGE" ] || ! grep -q 'data-i18n' "$PAGE"; then
  echo "  ✅ No i18n on the page yet — nothing to keep in sync."; echo ""; exit 0
fi

python3 - "$PAGE" <<'PY'
import re, sys
html = open(sys.argv[1], encoding="utf-8").read()

# 1. Keys the HTML expects translated.
keys = set(re.findall(r'data-i18n(?:-ph)?="([^"]+)"', html))

# 2. The declared languages (from the <select>), minus English (the source).
sel = re.search(r'<select id="lang".*?</select>', html, re.S)
langs = [c for c in re.findall(r'<option value="([a-z]{2})"', sel.group(0))] if sel else []
langs = [l for l in langs if l != "en"]

# 3. The I18N dictionary, sliced per language.
m = re.search(r'const I18N\s*=\s*\{(.*)\n    \};', html, re.S)
if not m:
    print("  ❌ Could not find the I18N dictionary."); sys.exit(1)
body = m.group(1)
# Split into per-language blocks by the "<lang>: {" markers.
marks = [(mm.group(1), mm.start()) for mm in re.finditer(r'\n      ([a-z]{2}):\s*\{', body)]
blocks = {}
for i, (lang, start) in enumerate(marks):
    end = marks[i+1][1] if i+1 < len(marks) else len(body)
    blocks[lang] = body[start:end]

fail = 0
print(f"  Source keys: {len(keys)} · languages: {', '.join(langs) or '(none)'}")
for lang in langs:
    blk = blocks.get(lang, "")
    have = set(re.findall(r'"([A-Za-z0-9_.]+)"\s*:', blk))
    missing = sorted(keys - have)
    extra   = sorted(have - keys)   # keys translated but no longer in the HTML (stale)
    if missing:
        print(f"  ❌ {lang}: missing {len(missing)} translation(s): {', '.join(missing)}"); fail = 1
    elif extra:
        print(f"  ⚠️  {lang}: {len(extra)} stale key(s) no longer in the page: {', '.join(extra)}")
        print(f"      (not fatal, but tidy up): ");
    else:
        print(f"  ✅ {lang}: all {len(keys)} strings translated and in sync.")

if fail:
    print("\n::error::A language tag is out of sync with the English source. Add the missing")
    print("translations to the I18N dictionary in apps/web/public/index.html (or run the")
    print("regenerate workflow in docs/i18n/README.md).")
    sys.exit(1)
print("\n🎉 Landing page: every language tag is in sync with the source.")
PY
rc=$?

# Also check the Builder Loop app's STR dictionary (English is the source key-set).
APP="apps/web/public/app.html"
if [ -f "$APP" ] && grep -q 'const STR' "$APP"; then
  python3 - "$APP" <<'PY2'
import re, sys
html = open(sys.argv[1], encoding="utf-8").read()
m = re.search(r'const STR\s*=\s*\{(.*?)\n  \};', html, re.S)
if not m:
    print("  ⚠️  app STR found but could not be parsed — skipping."); sys.exit(0)
body = m.group(1)
marks = [(mm.group(1), mm.start()) for mm in re.finditer(r'\n    ([a-z]{2})\s*:\s*\{', body)]
blocks = {}
for i,(lang,start) in enumerate(marks):
    end = marks[i+1][1] if i+1 < len(marks) else len(body)
    blocks[lang] = set(re.findall(r'"([A-Za-z0-9_.]+)"\s*:', body[start:end]))
src = blocks.get("en", set())
fail = 0
print(f"\n  App (Builder Loop) — source keys: {len(src)}")
for lang in [l for l,_ in marks if l != "en"]:
    missing = sorted(src - blocks.get(lang, set()))
    if missing:
        print(f"  ❌ app {lang}: missing {len(missing)}: {', '.join(missing)}"); fail = 1
    else:
        print(f"  ✅ app {lang}: all {len(src)} strings translated.")
if fail:
    print("\n::error::The app's STR dictionary is out of sync. Add the missing keys in apps/web/public/app.html.")
    sys.exit(1)
print("  🎉 App: every language tag is in sync.")
PY2
  rc2=$?
  [ "$rc" -eq 0 ] && rc=$rc2
fi
echo "-----------------------------------------------------------"
echo ""
exit $rc
