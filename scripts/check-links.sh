#!/usr/bin/env bash
# Check that every RELATIVE link and image in our Markdown resolves to a real file/dir.
# Catches broken cross-links and image embeds before they merge. Runs in CI and locally.
#
# Usage: ./scripts/check-links.sh
# Skips external URLs (http/https/mailto), pure #anchors, and reference-style placeholders.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

git ls-files '*.md' | python3 -c '
import os, re, sys

md_files = [l.strip() for l in sys.stdin if l.strip()]

# inline [text](target) and ![alt](target); also <img src="..."> / <a href="...">
INLINE = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
HTML   = re.compile(r"<(?:img|a)\b[^>]*?(?:src|href)\s*=\s*\"([^\"]+)\"")
# reference definitions:  [ref]: target
REFDEF = re.compile(r"^\s*\[[^\]]+\]:\s*(\S+)", re.M)

def targets(text):
    for m in INLINE.finditer(text):
        yield m.group(1)
    for m in HTML.finditer(text):
        yield m.group(1)
    for m in REFDEF.finditer(text):
        yield m.group(1)

def is_external(t):
    t = t.strip()
    return (not t
            or t.startswith("#")
            or t.startswith("http://") or t.startswith("https://")
            or t.startswith("mailto:") or t.startswith("tel:")
            or "://" in t)

broken = []
checked = 0
for md in md_files:
    try:
        text = open(md, encoding="utf-8").read()
    except Exception:
        continue
    base = os.path.dirname(md)
    for raw in targets(text):
        t = raw.strip()
        if is_external(t):
            continue
        # strip a trailing  "title"  and any #fragment
        t = t.split()[0]
        t = t.split("#", 1)[0]
        if not t:
            continue
        checked += 1
        resolved = os.path.normpath(os.path.join(base, t))
        if not os.path.exists(resolved):
            broken.append((md, raw.strip(), resolved))

if broken:
    for md, raw, resolved in broken:
        print(f"::error::broken link in {md} -> {raw} (resolved: {resolved})")
        print(f"  ✗ {md}: {raw}")
    print(f"\n✗ Link check FAILED: {len(broken)} broken / {checked} relative links checked.")
    sys.exit(1)

print(f"✓ Link check passed: {checked} relative links across {len(md_files)} files all resolve.")
'
